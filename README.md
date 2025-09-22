# Fastmail Bulk Manager

⚠️ **ALPHA SOFTWARE** - Test safely with a Fastmail trial account, or create backups if using your existing account.

A web-based tool for efficiently managing bulk email in Fastmail. Review messages you've moved to your bulk folder and take batch actions like moving all messages from specific senders or creating automatic filter rules.

**Cross-Device Integration**: Detects messages moved to bulk from any device - whether you used the Fastmail iPhone app, Android app, web interface, or any email client.

## Quick Start

1. **Test safely**: Use a [Fastmail trial account](https://app.fastmail.com/signup/) or [create backups](BACKUP.md) of your existing account
2. Download `fastmail-bulk-manager.html` from this repository
3. Open the file in any modern web browser
4. Generate an App Password in Fastmail (Settings → Privacy & Security → App Passwords)
5. Connect and start managing your bulk email efficiently

## Key Features

- **Periodic Review Interface**: Scan bulk folder and group recent messages by sender
- **Safety First**: All actions require explicit confirmation dialogs
- **Bulk Operations**: Select multiple senders for batch processing
- **Message Moving**: Move all non-bulk messages from selected senders to bulk folder
- **Auto-Rule Creation**: Generate Sieve filter rules for automatic future filtering
- **Universal Compatibility**: Works on any modern browser across all operating systems

## How It Works

1. **Mobile Workflow**: Use Fastmail's mobile apps to quickly bulk unwanted emails throughout the day
2. **Desktop Review**: Run this tool periodically to batch-process all those senders
3. **Smart Actions**: Move remaining messages and/or create auto-rules for future emails
4. **Cross-Platform**: Detects bulk moves from any device via direct JMAP connection

**Example Workflow**: Bulk emails on your phone during commutes, then run weekly cleanup sessions on your laptop to batch-process all those senders and create auto-rules.

## Documentation

- **[📋 Backup & Recovery Guide](BACKUP.md)** - Essential reading before using alpha software
- **[🤝 Contributing Guide](CONTRIBUTING.md)** - How to help test and improve the tool
- **[🛣️ Project Roadmap](#roadmap)** - Planned features and future direction

## Roadmap

### Planned Features
- **Sample Message Viewer**: Preview emails from a sender before taking action
- **Smart Rule Cleanup**: Detect unsubscribe actions and offer to remove related auto-rules
- **Reverse Actions**: Detect when messages are removed from Bulk and offer corresponding actions
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
