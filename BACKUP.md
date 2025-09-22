# Email Backup and Recovery Guide

**⚠️ Important: Always backup your emails before using alpha software!**

## Creating Email Backups

### Fastmail's Built-in Export Tool (Recommended)

1. Log into Fastmail web interface
2. Go to **Settings → Migration → Export tab**
3. Click **"New mail export"**
4. Select the folders and date range you want to backup
5. Click **Download** when the export completes
6. Mail will be downloaded in a .zip file containing .eml files
7. Repeat for each important folder (one folder at a time, 4GB limit per export)

### Alternative: Desktop Email Client

- Import your mail into a desktop client (Thunderbird, Apple Mail, Outlook) using [Fastmail's setup guides](https://www.fastmail.help/hc/en-us/articles/6414132167311-Fastmail-settings)
- Export data locally in your preferred format

### For Complete Peace of Mind

Export your most important folders before testing this tool:
- Inbox
- Sent items
- Important custom folders
- Any folders you frequently reference

## Recovering Emails if Something Goes Wrong

**Good news: Fastmail has excellent built-in recovery options!**

### Recent Deletions (within 7 days)

1. Go to **Settings → Restore data**
2. Click **"Restore deleted drafts and messages"**
3. Choose time range (10 minutes to 7 days back)
4. Fastmail will show you "how many items we've found to restore in that timespan"
5. Messages will be restored to their last location (usually the Trash)
6. A saved search for "Restored messages" appears at the bottom of your folders list

### From Your Downloaded Backups

- .eml files from Fastmail exports can be imported back using **Settings → Migration → Import**
- Desktop email clients can re-import previously exported data

### Recovery Limitations

- Fastmail keeps backups of deleted email for **one week only**. After that, it's gone forever
- Recovery time varies based on account size (minutes to hours)
- The restore process is automatic and user-friendly

## Safe Testing Strategy

### Option 1: Use a Trial Account (Recommended)
1. **Create Fastmail 30-day trial** (no credit card needed)
2. **Subscribe to newsletters/marketing emails** to populate inbox
3. **Move some to bulk folder** using mobile app or web interface
4. **Test the tool** to see if it detects the moves and can process remaining messages
5. **Rule creation will show limitation message** (trial accounts can't create Sieve rules)

### Option 2: Test with Real Account
1. **Create full backup first** using instructions above
2. **Test with non-critical senders** initially
3. **Verify backup worked** before proceeding with important emails

## Additional Resources

- [Fastmail's official backup guide](https://www.fastmail.help/hc/en-us/articles/360060590573-Download-all-your-data)
- [Fastmail's restoration guide](https://www.fastmail.help/hc/en-us/articles/1500000280381-How-to-restore-deleted-data)
- [Fastmail trial account information](https://www.fastmail.help/hc/en-us/articles/1500000277442-Trial-accounts)
