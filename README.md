# Fastmail Bulk Manager

> [!CAUTION]
> This software is in active development.
> Changes may occur without warning, and documentation is not guaranteed to be up-to-date.
> Always test safely with a Fastmail trial account, or create backups if using an existing account.

## About

A web-based tool for efficiently managing subscription-based email in Fastmail. Begin by creating a Subscriptions folder. As you manually move new email messages from your Inbox to the Subscriptions folder, you can use the tool later to intelligently offer the option to move all older messages from specific senders and/or you can use it to create rules to move future messages.

**Cross-Device Integration**: Detects messages moved to Subscriptions from any device, regardless of whether you used the official Fastmail apps for iPhone or Android, the web interface, or any email client that connects to Fastmail via IMAP/JMAP.

## Quick Start

1. **Test safely**: Use a [Fastmail trial account](https://app.fastmail.com/signup/) or [create backups](BACKUP.md) of your existing account
2. Download the HTML file from this repository 
3. Open the file in any modern web browser
4. Generate an App Password in Fastmail (Settings → Privacy & Security → App Passwords)
5. Connect and start managing your Subscriptions email efficiently

## Key Features

- **Periodic Review Interface**: Scan Subscriptions folder and group recent messages by sender
- **Safety First**: All actions require explicit confirmation dialogs
- **Bulk Operations**: Select multiple senders for batch processing
- **Message Moving**: Move all Inbox messages from selected senders to Subscriptions folder
- **Auto-Rule Creation**: Generate Sieve filter rules for automatic future filtering
- **Universal Compatibility**: Works on any modern browser across all operating systems

## How It Works

1. **Mobile Workflow**: Use Fastmail's mobile apps to manually move unwanted emails throughout the day from Inbox to Subscriptions folder
2. **Desktop Review**: Run this tool periodically to batch-process all those senders
3. **Smart Actions**: Use tool to move any remaining messages in Inbox and/or create rules for future emails
4. **Cross-Platform**: Detects moves from any device or email client via direct JMAP connection

**Example Workflow**: Move emails on your phone during commutes, then run weekly cleanup sessions on your laptop to batch-process all those senders and create rules.

## Documentation

- **[📋 Backup & Recovery Guide](BACKUP.md)** - Essential reading before using alpha software
- **[🤝 Contributing Guide](CONTRIBUTING.md)** - How to help test and improve the tool
- **[🛣️ Project Roadmap](#roadmap)** - Planned features and future direction

## Roadmap

### Planned Features
- **Sample Message Viewer**: Preview emails from a sender before taking action
- **Smart Rule Cleanup**: Detect unsubscribe actions and offer to remove related auto-rules
- **Reverse Actions**: Detect when messages are removed from Subscriptions and offer corresponding actions
- **Message Search**: Find specific messages across senders and time periods
- **Rule Management Interface**: View, edit, and delete existing filter rules

### Long-term Vision
- **Open Source Community**: Move development to collaborative GitHub workflow ✅
- **Browser Extension API**: Enable hybrid browser extension integration
- **Fastmail Tool Suite**: Create complementary tools with shared design and authentication
- **Advanced Filtering**: More sophisticated rule creation and management

## Technical Details

- **Platform**: Works on any modern web browser across all operating systems
- **No Installation**: Single HTML file - just open and use
- **Security**: Direct JMAP connection to Fastmail, uses app passwords, no third-party servers
- **Extensibility**: Built with toolkit foundation for future complementary tools
- **Educational**: Extensively commented code for learning web development and email APIs

## Support & Community

- **🐛 Bug Reports**: [Create an Issue](../../issues) with reproduction steps
- **💡 Feature Requests**: [Start a Discussion](../../discussions) or create an Issue
- **🆘 Need Help**: Check our documentation or create an Issue
- **🧪 Safe Testing**: Use [Fastmail's 30-day free trial](https://app.fastmail.com/signup/) to test safely

## Status & Disclaimers

**Alpha Version 0.1.0** - This is early-stage software:
- Test safely with a Fastmail trial account, or create backups if using your existing account
- Test with non-critical emails first  
- Some features may not work with all account types
- Use at your own risk

**Not affiliated with Fastmail** - This is an independent community tool.

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

*Ready to reclaim control of your email? [Get started](BACKUP.md) with a backup, then dive in!*
