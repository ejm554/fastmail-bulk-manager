/*
 * EXTENSIBILITY FOUNDATION
 * This creates a global object that can be shared between multiple tools
 * The || operator provides a default value if FastmailToolkit doesn't exist yet
 */
window.FastmailToolkit = window.FastmailToolkit || {
    version: '0.1.0',
    tools: {},                // Object to store multiple tool instances
    sharedAuth: null,         // Shared authentication data
    
    // Method to register new tools in the toolkit
    registerTool: function(name, tool) {
        this.tools[name] = tool;
    },
    
    // Method to get shared authentication data
    getSharedAuth: function() {
        return this.sharedAuth;
    },
    
    // Method to store authentication data for other tools to use
    setSharedAuth: function(auth) {
        this.sharedAuth = auth;
    }
};