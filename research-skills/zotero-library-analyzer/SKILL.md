---
name: zotero-library-analyzer
description: "Connects to a user's Zotero library via the Web API to read their entire research collection, metadata, abstracts, notes, collections, and full-text PDFs, then produces two deliverables: (1) a comprehensive .md reference file organized thematically that a future Claude instance can read to become a domain expert, and (2) an annotated bibliography (.docx) of the most research-relevant sources. Use this skill whenever the user mentions Zotero, asks to analyze or summarize their research library, wants to create an annotated bibliography from their references, asks for a literature review or state-of-the-field summary, wants to export or synthesize their academic sources, or asks Claude to 'learn' or 'become an expert in' a research area based on their collected sources. Also trigger when the user mentions research libraries, reference managers, bibliographies, or literature databases in the context of producing a synthesized output."
---

# Zotero Library Analyzer

This skill connects to a user’s Zotero cloud library, reads everything in it (metadata, abstracts, notes, PDFs, and collection structure), and produces two outputs:

1. A .md reference file, a thematically organized knowledge base designed for a future Claude to read and become a domain expert in the user’s research area.
2. An annotated bibliography (.docx), a polished Word document covering the sources most directly relevant to the user’s own research, with annotations synthesized from all available data.

## Prerequisites

The user needs a Zotero User ID and API key with read access. If they don’t have one, walk them through it using the instructions in `references/zotero_api_setup.md`, read that file and relay the steps conversationally. Don’t just dump the file contents at them.

## Workflow

### Step 0: Determine Input Method

The skill supports two input methods:

Option A, Zotero Web API (preferred when network access to api.zotero.org is available): Ask the user for their Zotero User ID and API key, then use the fetch script. This pulls everything automatically.

Option B, Uploaded export file (fallback for sandboxed environments like claude.ai, or when the user prefers): Ask the user to export their library from the Zotero desktop app as CSL JSON (File → Export Library → CSL JSON, with "Include Notes" checked). They upload the `.json` file. Optionally, they can also zip and upload their `storage/` folder for PDF full texts.

When using Option B, skip Steps 1–2 and read the uploaded JSON directly. CSL JSON contains metadata, abstracts, and notes for each item. The file will be at `/mnt/user-data/uploads/`, read it with Python’s `json.load()`. Items are a flat list of objects with keys like `title`, `author`, `abstract`, `note`, `container-title`, `DOI`, `issued` (with `date-parts`), etc.

### Step 1: Authenticate and Fetch the Library (API only)

Ask the user for their Zotero User ID and API key. Then run the fetch script:

```bash
pip install pyzotero requests --break-system-packages
python scripts/fetch_zotero.py --user-id <USER_ID> --api-key <API_KEY> --output-dir /home/claude/zotero-data
```

This script:
- Fetches all items with full metadata (title, authors, year, abstract, tags, item type)
- Fetches all collections and maps items to their collection paths
- Downloads all notes attached to items
- Downloads all PDF attachments to `zotero-data/pdfs/`
- Saves a consolidated `library.json` with everything indexed by item key

The script handles pagination automatically (Zotero API returns 100 items per page). For a medium-sized library (100–500 items), this takes 1–5 minutes depending on PDF count.

### Step 2: Extract Text from PDFs

After fetching, extract text from all downloaded PDFs:

```bash
# Install pdftotext if needed
apt-get update && apt-get install -y poppler-utils 2>/dev/null

# Extract text from all PDFs
python scripts/fetch_zotero.py --extract-pdfs --pdf-dir /home/claude/zotero-data/pdfs --output-dir /home/claude/zotero-data
```

This produces `zotero-data/pdf_texts/` with one .txt file per PDF. The script handles encoding issues and malformed PDFs gracefully.

### Step 3: Read and Synthesize the Library

Read `zotero-data/library.json` to get an overview of the library. Then:

1. Scan collection structure to understand how the user has organized their research.
2. Read every abstract and note, these are in the JSON and don’t require file reads.
3. Read PDF full texts selectively, prioritize items that appear research-relevant based on keyword matching (see below). For large PDFs, read the introduction, methods overview, results summary, and conclusion rather than the entire text.
4. Build a mental model of the research landscape represented by the library.

### Step 4: Auto-detect Research-Relevant Sources

Use keyword and topic matching to identify sources most directly related to the user’s research. The relevance detection should be adaptive, look at what’s actually in the library and identify clusters of related work. However, as a starting framework, these keyword families are strong signals of direct relevance:

Core research areas:
- Sociophonetics, phonetic variation, phonological variation
- Persona construction, identity performance, indexicality
- /s/ variation, /s/ aspiration, /s/ deletion, lenition, fricative variation
- Sevillian Spanish, Andalusian Spanish, Peninsular Spanish
- LGBTQ+ linguistics, lavender linguistics, queer linguistics, sexual identity and language
- Prosody, intonation, F0, pitch, ToBI, autosegmental-metrical phonology

Methodological keywords:
- Praat, acoustic analysis, formant analysis, spectral analysis
- Mixed-effects models, GAMMs, sociolinguistic interviews
- Vowel space, F1/F2, duration, VOT

Broader relevant areas:
- Third-wave sociolinguistics, style-shifting, enregisterment
- Matched guise, perception studies, language attitudes
- Spanish sociolinguistics, variationist sociolinguistics

Classify each item as:
- Directly relevant, matches multiple core keywords or is clearly about the user’s specific research topics
- Contextually relevant, provides theoretical framework, methodological background, or adjacent findings
- Peripheral, in the library but not closely related to the user’s core research

### Step 5: Generate the .md Reference File

Create a comprehensive Markdown file that would allow a future Claude to become an expert in the user’s research domain. The structure should emerge from what’s actually in the library, but here’s the general approach:

Opening section:
- Brief characterization of the research domain and its boundaries
- How many sources are in the library, what time period they cover, which journals/venues appear most

Thematic sections (determine these from the data, examples of sections that might emerge):
- Theoretical foundations (e.g., third-wave sociolinguistics, indexicality, persona theory)
- Phonetic/phonological variation in Spanish (e.g., /s/ variation, vowel systems, prosodic patterns)
- Identity and language (e.g., sexual identity, gender, regional identity)
- Methodological approaches (e.g., acoustic analysis techniques, statistical modeling, experimental design)
- Geographic focus areas (e.g., Seville/Andalusia, other Spanish-speaking regions)

For each thematic section, include:
- Key authors and their contributions
- Central findings and how they build on each other
- Methodological innovations
- Debates or open questions in the area
- How sources connect to each other (citation chains, intellectual lineages)

Closing section:
- Gaps or underrepresented areas in the library
- Emerging trends visible in recent publications
- Potential research directions suggested by the collection

The tone should be expert-to-expert, write as if briefing a knowledgeable colleague, not explaining basics. Use precise terminology. This file is a tool, not a textbook.

Include a full bibliography at the end in a consistent citation format (author-date).

### Step 6: Generate the Annotated Bibliography (.docx)

Create a Word document covering all directly relevant and contextually relevant sources. Use the docx skill’s approach (read `/mnt/skills/public/docx/SKILL.md` for formatting instructions).

Document structure:
- Title: "Annotated Bibliography: [Research Domain]"
- Brief introduction explaining the scope and organization
- Sources grouped by thematic cluster (not just alphabetical)
- Within each cluster, sources ordered chronologically to show development of ideas
- Full bibliography in a consistent format at the end

For each annotation, synthesize from all available data:
- Core argument or finding (from abstract + PDF text)
- Methodology used (from PDF text)
- How it connects to the user’s research specifically
- Key quotes or data points worth noting (from PDF text + notes)
- The user’s own notes on the source (from Zotero notes), clearly attributed

Each annotation should be 150–300 words, substantial enough to be useful as a reference, concise enough to be scannable.

Formatting:
- Professional academic formatting
- Heading styles for thematic sections
- Hanging indent for bibliographic entries
- The user’s Zotero notes rendered in italics to distinguish them from synthesized content

### Step 7: Present the Results

Save both files:
- The .md reference file to `/mnt/user-data/outputs/`
- The .docx annotated bibliography to `/mnt/user-data/outputs/`

Present them to the user using `present_files`. Give a brief summary of what was found, how many sources total, how many classified as directly relevant, what thematic clusters emerged, and any interesting patterns or gaps noticed.

## Important Notes

- API key security: Never log or display the user’s API key after they provide it. Use it only for the API calls.
- PDF reading limits: For very long PDFs (>50 pages), focus on the abstract, introduction, methodology overview, key results, and conclusion. Don’t try to read every page.
- Graceful degradation: If PDFs aren’t available for some items, the skill still works, it just uses metadata, abstracts, and notes for those items. Note which items lacked full text in the output.
- The .md file is the primary deliverable in terms of lasting value, it should be thorough enough that reading it alone gives a deep understanding of the research landscape. Take the time to make it excellent.
- Collection structure is a signal: How the user organized their Zotero collections reveals how they think about their research. Use this as a clue for thematic organization.
