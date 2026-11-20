#!/usr/bin/env python3
"""
Fetch an entire Zotero library via the Web API.

Usage:
    # Fetch library (metadata, notes, PDFs):
    python fetch_zotero.py --user-id USER_ID --api-key API_KEY --output-dir ./zotero-data

    # Extract text from downloaded PDFs:
    python fetch_zotero.py --extract-pdfs --pdf-dir ./zotero-data/pdfs --output-dir ./zotero-data
"""

import argparse
import json
import os
import subprocess
import sys
import time

def fetch_library(user_id, api_key, output_dir):
    """Fetch all items, collections, and attachments from a Zotero library."""
    try:
        from pyzotero import zotero
    except ImportError:
        print("Installing pyzotero...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pyzotero", "--break-system-packages", "-q"])
        from pyzotero import zotero

    zot = zotero.Zotero(user_id, 'user', api_key)

    # Create output directories
    os.makedirs(output_dir, exist_ok=True)
    pdf_dir = os.path.join(output_dir, "pdfs")
    os.makedirs(pdf_dir, exist_ok=True)

    print("=" * 60)
    print("ZOTERO LIBRARY FETCH")
    print("=" * 60)

    # --- Fetch collections ---
    print("\n[1/4] Fetching collections...")
    collections = zot.everything(zot.collections())
    collection_map = {}
    for c in collections:
        cdata = c.get("data", {})
        collection_map[c["key"]] = {
            "key": c["key"],
            "name": cdata.get("name", ""),
            "parentCollection": cdata.get("parentCollection", False),
        }

    # Build full path for each collection
    def get_collection_path(key):
        if key not in collection_map:
            return ""
        c = collection_map[key]
        if not c["parentCollection"]:
            return c["name"]
        parent_path = get_collection_path(c["parentCollection"])
        return f"{parent_path} / {c['name']}" if parent_path else c["name"]

    for key in collection_map:
        collection_map[key]["full_path"] = get_collection_path(key)

    print(f"  Found {len(collections)} collections")

    # --- Fetch all items ---
    print("\n[2/4] Fetching all items (this may take a moment)...")
    all_items = zot.everything(zot.items())
    print(f"  Found {len(all_items)} total items (including attachments/notes)")

    # Separate top-level items from attachments and notes
    top_items = {}
    child_notes = {}  # parent_key -> [notes]
    child_attachments = {}  # parent_key -> [attachments]

    for item in all_items:
        data = item.get("data", {})
        item_type = data.get("itemType", "")

        if item_type == "note":
            parent = data.get("parentItem", "")
            if parent:
                child_notes.setdefault(parent, []).append({
                    "key": item["key"],
                    "note_html": data.get("note", ""),
                    "tags": [t.get("tag", "") for t in data.get("tags", [])],
                })
        elif item_type == "attachment":
            parent = data.get("parentItem", "")
            if parent:
                child_attachments.setdefault(parent, []).append({
                    "key": item["key"],
                    "title": data.get("title", ""),
                    "contentType": data.get("contentType", ""),
                    "filename": data.get("filename", ""),
                    "linkMode": data.get("linkMode", ""),
                })
        elif item_type not in ("annotation",):
            # Top-level bibliographic item
            creators = []
            for cr in data.get("creators", []):
                name_parts = []
                if cr.get("lastName"):
                    name_parts.append(cr["lastName"])
                if cr.get("firstName"):
                    name_parts.append(cr["firstName"])
                creators.append({
                    "type": cr.get("creatorType", "author"),
                    "lastName": cr.get("lastName", ""),
                    "firstName": cr.get("firstName", ""),
                    "name": cr.get("name", ""),  # for single-field names
                    "display": ", ".join(name_parts) if name_parts else cr.get("name", ""),
                })

            item_collections = data.get("collections", [])
            collection_paths = [
                collection_map[ck]["full_path"]
                for ck in item_collections
                if ck in collection_map
            ]

            top_items[item["key"]] = {
                "key": item["key"],
                "itemType": item_type,
                "title": data.get("title", ""),
                "creators": creators,
                "year": data.get("date", ""),
                "abstractNote": data.get("abstractNote", ""),
                "publicationTitle": data.get("publicationTitle", ""),
                "volume": data.get("volume", ""),
                "issue": data.get("issue", ""),
                "pages": data.get("pages", ""),
                "DOI": data.get("DOI", ""),
                "url": data.get("url", ""),
                "language": data.get("language", ""),
                "tags": [t.get("tag", "") for t in data.get("tags", [])],
                "collections": collection_paths,
                "notes": [],
                "attachments": [],
                "pdf_filename": None,
            }

    # Attach notes and attachments to their parent items
    for key, item in top_items.items():
        item["notes"] = child_notes.get(key, [])
        item["attachments"] = child_attachments.get(key, [])

    print(f"  Found {len(top_items)} bibliographic items")
    print(f"  Found {sum(len(v) for v in child_notes.values())} notes")
    print(f"  Found {sum(len(v) for v in child_attachments.values())} attachments")

    # --- Download PDFs ---
    print("\n[3/4] Downloading PDF attachments...")
    pdf_count = 0
    pdf_errors = 0

    for key, item in top_items.items():
        for att in item["attachments"]:
            if att.get("contentType") == "application/pdf" and att.get("linkMode") in ("imported_file", "imported_url"):
                filename = att.get("filename", f"{att['key']}.pdf")
                safe_filename = "".join(c if c.isalnum() or c in ".-_ " else "_" for c in filename)
                filepath = os.path.join(pdf_dir, safe_filename)

                try:
                    # Use pyzotero's dump method
                    zot.dump(att["key"], filepath)
                    item["pdf_filename"] = safe_filename
                    pdf_count += 1
                    if pdf_count % 10 == 0:
                        print(f"  Downloaded {pdf_count} PDFs...")
                    # Be polite to the API
                    time.sleep(0.2)
                except Exception as e:
                    pdf_errors += 1
                    print(f"  Warning: Could not download PDF for '{item['title'][:50]}': {e}")
                break  # Only grab first PDF per item

    print(f"  Downloaded {pdf_count} PDFs ({pdf_errors} errors)")

    # --- Save consolidated library ---
    print("\n[4/4] Saving library data...")
    library_data = {
        "metadata": {
            "user_id": user_id,
            "fetch_date": time.strftime("%Y-%m-%d %H:%M:%S"),
            "total_items": len(top_items),
            "total_collections": len(collections),
            "total_pdfs_downloaded": pdf_count,
        },
        "collections": {k: {
            "name": v["name"],
            "full_path": v["full_path"],
            "parentCollection": v["parentCollection"],
        } for k, v in collection_map.items()},
        "items": top_items,
    }

    library_path = os.path.join(output_dir, "library.json")
    with open(library_path, "w", encoding="utf-8") as f:
        json.dump(library_data, f, indent=2, ensure_ascii=False)

    print(f"\n  Saved to {library_path}")
    print(f"\n{'=' * 60}")
    print("FETCH COMPLETE")
    print(f"  Items: {len(top_items)}")
    print(f"  Collections: {len(collections)}")
    print(f"  PDFs: {pdf_count}")
    print(f"  Output: {output_dir}")
    print(f"{'=' * 60}")

    return library_data


def extract_pdfs(pdf_dir, output_dir):
    """Extract text from all PDFs in a directory using pdftotext."""
    text_dir = os.path.join(output_dir, "pdf_texts")
    os.makedirs(text_dir, exist_ok=True)

    pdf_files = [f for f in os.listdir(pdf_dir) if f.lower().endswith(".pdf")]
    print(f"\nExtracting text from {len(pdf_files)} PDFs...")

    success = 0
    errors = 0

    for filename in pdf_files:
        pdf_path = os.path.join(pdf_dir, filename)
        txt_filename = os.path.splitext(filename)[0] + ".txt"
        txt_path = os.path.join(text_dir, txt_filename)

        try:
            result = subprocess.run(
                ["pdftotext", "-enc", "UTF-8", pdf_path, txt_path],
                capture_output=True, text=True, timeout=30
            )
            if result.returncode == 0 and os.path.exists(txt_path):
                # Check if we got any text
                size = os.path.getsize(txt_path)
                if size > 100:
                    success += 1
                else:
                    errors += 1
                    print(f"  Warning: Minimal text extracted from {filename} ({size} bytes)")
            else:
                errors += 1
                print(f"  Warning: pdftotext failed for {filename}: {result.stderr.strip()}")
        except subprocess.TimeoutExpired:
            errors += 1
            print(f"  Warning: Timeout extracting {filename}")
        except Exception as e:
            errors += 1
            print(f"  Warning: Error extracting {filename}: {e}")

    print(f"\nExtraction complete: {success} successful, {errors} errors")
    print(f"Text files saved to: {text_dir}")


def main():
    parser = argparse.ArgumentParser(description="Fetch a Zotero library via the Web API")
    parser.add_argument("--user-id", help="Zotero user ID")
    parser.add_argument("--api-key", help="Zotero API key")
    parser.add_argument("--output-dir", required=True, help="Directory to save output")
    parser.add_argument("--extract-pdfs", action="store_true", help="Extract text from PDFs instead of fetching")
    parser.add_argument("--pdf-dir", help="Directory containing PDFs (for --extract-pdfs)")

    args = parser.parse_args()

    if args.extract_pdfs:
        pdf_dir = args.pdf_dir or os.path.join(args.output_dir, "pdfs")
        extract_pdfs(pdf_dir, args.output_dir)
    else:
        if not args.user_id or not args.api_key:
            parser.error("--user-id and --api-key are required for fetching")
        fetch_library(args.user_id, args.api_key, args.output_dir)


if __name__ == "__main__":
    main()
