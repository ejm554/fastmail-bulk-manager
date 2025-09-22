# Contributing to Fastmail Bulk Manager

**We welcome early adopters and contributors!** This project is in active alpha development.

## Educational Codebase Philosophy

This project maintains **extensive educational comments** throughout the code to help developers of all skill levels learn web development, JavaScript, and email APIs. When contributing:

- ✅ **Preserve existing educational comments** when making changes
- ✅ **Update comments when functionality changes** to keep them accurate
- 💡 **Optionally add explanatory comments** for new code (welcomed but not required!)
- 💡 **Improve existing explanations** if you spot unclear or outdated information

**All contributions are welcome regardless of commenting style.** Clear code and detailed pull request descriptions help the community understand changes just as well as inline comments. Some contributors excel at writing educational comments, others at writing clean code - both are equally valuable!

If you modify code where existing comments no longer apply, please update them to stay accurate, but don't feel pressured to write extensive new explanations if that's not your strength.

## How to Help

### Testing (Most Needed!)
- **Safe testing approach**: Fastmail offers 30-day free trials with no credit card required - create a trial account, subscribe to newsletters/marketing emails to populate it, then test the tool safely without risking real data
- **Test with real account**: Create backups first using our [backup guide](BACKUP.md)
- **Report bugs** via GitHub Issues with detailed reproduction steps

### Development
- **Submit pull requests** for bug fixes or enhancements
- **Request features** that would improve your email management workflow
- **Improve documentation** and setup instructions
- **Enhance educational value** by clarifying or expanding code explanations

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/[username]/fastmail-bulk-manager.git
   cd fastmail-bulk-manager
   ```

2. **No build process required** - it's a single HTML file
3. **Test against your Fastmail account** (backup first!)
4. **Submit PRs for any improvements**

## Testing Areas for Contributors

### Account Types & Configurations
- Personal vs Business Fastmail accounts
- Different folder structures (custom bulk folder names)
- Accounts with existing Sieve rules
- Accounts with nested folder hierarchies

### Message Volume Testing
- Mailboxes with 100+ messages in bulk folder
- Senders with 50+ messages across folders
- Accounts with thousands of total messages
- Very recent accounts with minimal message history

### Sieve Rule Scenarios
- Accounts with no existing rules (clean slate)
- Accounts with complex existing rule sets
- Accounts using Fastmail's built-in spam filtering
- Testing rule conflicts and overlaps

### Edge Cases
- Messages with unusual sender formats (no-reply addresses, system emails)
- Bulk folders with mixed message types (newsletters, actual spam, etc.)
- Messages moved to bulk very recently (within minutes)
- Different date ranges (1 day vs 30 days)

### Browser Compatibility & OS Support
- **Desktop**: Chrome, Firefox, Safari, Edge (Windows, macOS, Linux)
- **Mobile**: Safari (iOS), Chrome/Firefox (Android)
- **No installation required** - runs in any modern browser
- **Cross-platform** - works identically across all operating systems

## Reporting Issues

When reporting bugs, please include:
- Your browser and version
- Fastmail account type (personal/business/trial)
- Folder structure details
- Steps to reproduce the issue
- Any console errors (F12 → Console tab)
- Screenshots (remove personal information)

## Pull Request Guidelines

1. **Test your changes** thoroughly
2. **Update relevant comments** if functionality changes
3. **Include clear PR description** explaining what and why
4. **Add educational comments for new code** (optional but appreciated)
5. **Ensure cross-browser compatibility**

## Known Issues

- Sieve rule creation may not work with all Fastmail account types
- Large mailboxes (>10,000 messages) may cause performance issues  
- Some folder configurations might not be detected correctly
- Error messages could be more user-friendly

## Code Style

- **Vanilla JavaScript** - no frameworks
- **Educational comments** for complex logic
- **Error handling** for all async operations
- **User confirmation** for destructive actions
- **Responsive design** for all screen sizes

## Getting Help

- **Tool issues**: Create a GitHub Issue with details
- **Fastmail account issues**: Contact Fastmail support
- **Feature discussions**: Open a GitHub Discussion or Issue

**⚠️ Alpha Disclaimer**: Use this tool at your own risk. The authors are not responsible for any data loss or account issues that may result from using this early-stage software.
