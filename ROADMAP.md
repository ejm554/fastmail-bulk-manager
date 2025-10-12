# Fastmail Subscriptions Manager - Project Roadmap

This document outlines the planned development direction for the Fastmail Subscriptions Manager project.

## Completed Features

### Preview/Dry Run Mode ✅
**Status**: Complete  
**Description**: Toggle to disable all changes and show detailed previews of what would happen - builds confidence for safe testing with real accounts.

### Open Source Community ✅
**Status**: Complete  
**Description**: Project published on GitHub with professional documentation, issue templates, and contribution guidelines.

## Near-term Priority

### Multi-Folder Support
**Status**: Planned  
**Context**: Tool currently works with one folder per session (e.g., "Subscriptions"). Future versions will enable processing multiple folders simultaneously.

**Planned capabilities:**
- Configure multiple folders to scan at once (e.g., "Subscriptions", "Newsletters", "Receipts")
- Display messages grouped by both sender AND folder
- Create rules targeting different destination folders
- Batch operations across multiple folders in one session

**Technical scope:**
- Configuration UI for multiple folder selection
- Folder-aware message display and grouping
- Flexible rule creation targeting different folders
- Enhanced batch operations supporting folder-specific actions

## Planned Features

### Sample Message Viewer
**Status**: Planned  
**Description**: Preview one or more sample emails from a sender before taking action on all messages from that sender.

### Smart Rule Cleanup
**Status**: Planned  
**Description**: Detect unsubscribe actions and offer to remove related auto-rules to keep email management tidy.

### Reverse Actions
**Status**: Planned  
**Description**: Detect when messages are removed from the Subscriptions folder and offer corresponding actions (move all messages from that sender back, modify rules, etc.).

### Unsubscribe Tracking
**Status**: Planned  
**Description**: Monitor unsubscribe requests made via Fastmail's built-in feature, detect messages arriving after unsubscribing, and offer to remove obsolete rules.

### Message Search
**Status**: Planned  
**Description**: Find specific messages across senders and time periods to help with email management decisions.

### Rule Management Interface
**Status**: Planned  
**Description**: View, edit, and delete existing filter rules directly within the tool.

## Long-term Vision

### Browser Extension API
**Status**: Planned  
**Description**: Simple API to enable hybrid browser extension integration for real-time email management prompts.

### Fastmail Tool Suite
**Status**: Planned  
**Description**: Create complementary tools with shared design and authentication that work together for comprehensive email management.

### Advanced Filtering
**Status**: Planned  
**Description**: More sophisticated rule creation and management beyond basic sender-based filtering.

### Statistics Dashboard
**Status**: Planned  
**Description**: Show trends of email organization patterns over time to help optimize workflow.

---

## Contributing to the Roadmap

Have ideas for new features or improvements? We welcome input!

- **Feature Requests**: Create a GitHub Issue with the `enhancement` label
- **Discussions**: Use GitHub Discussions for brainstorming and feedback
- **Voting**: Comment on existing issues to show support for features you'd like to see

## Development Priorities

Our current focus is on:
1. **Safety and Confidence**: Features that enable risk-free testing and exploration
2. **Flexibility**: Supporting diverse email organization workflows
3. **User Experience**: Making the tool intuitive and helpful
4. **Community Building**: Encouraging contributions and feedback
5. **Educational Value**: Maintaining our learning-focused codebase approach