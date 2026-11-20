# Zotero API Setup Instructions

## What You Need

To use this skill, you need two things from Zotero:
1. Your User ID (a number)
2. An API key (a string of letters and numbers)

Both are free and take about 2 minutes to set up.

## Step-by-Step

### 1. Find Your User ID

1. Go to [https://www.zotero.org/settings/keys](https://www.zotero.org/settings/keys)
2. Log in with your Zotero account (same one you use to sync your library)
3. Your User ID is displayed at the top of the page, right under "Your userID for use in API calls is XXXXXXX"
4. Copy that number, you’ll need it in a moment

### 2. Create an API Key

1. On the same page ([https://www.zotero.org/settings/keys](https://www.zotero.org/settings/keys)), click "Create new private key"
2. Give it a description like "Claude Library Analyzer" (this is just for your reference)
3. Under Personal Library, check:
   - ✅ Allow library access
   - ✅ Allow read access to files (this lets us download your PDFs)
4. Under Default Group Permissions, you can leave it as "None" unless you want to include group library items too
5. Click Save Key
6. Copy the API key immediately, Zotero only shows it once. If you lose it, you’ll need to create a new one.

### 3. Provide to Claude

When prompted, give Claude:
- Your User ID (the number)
- Your API key (the long string)

Claude will use these only for the current session to read your library. The key is never stored or logged.

## Troubleshooting

- "403 Forbidden" errors: Your API key might not have read access to files. Go back to [https://www.zotero.org/settings/keys](https://www.zotero.org/settings/keys), click on your key, and make sure "Allow read access to files" is checked.
- Missing items: Make sure your Zotero desktop client has synced recently (click the green sync arrow in Zotero). The API reads from the cloud copy of your library.
- No PDFs downloading: PDFs must be stored in Zotero’s cloud storage (synced via "Sync attachment files" in Zotero preferences). If you use linked files or ZotFile with external storage, the PDFs won’t be accessible via the API. You can alternatively export PDFs manually and provide them.
- API rate limiting: The Zotero API allows up to ~20 requests per second. The fetch script includes polite delays, but if you hit rate limits, just wait a minute and re-run.

## Security Notes

- You can revoke the API key at any time from [https://www.zotero.org/settings/keys](https://www.zotero.org/settings/keys)
- The key only grants read access, it cannot modify or delete anything in your library
- Consider revoking the key after the analysis is complete if you don’t plan to re-run it
