/*
 * ES MODULE IMPORTS
 * main.js is the entry point that ties everything together
 * It imports the classes and functions it needs from other modules
 * This creates a clear dependency tree: main.js depends on these other files
 */
import { FastmailBulkManager } from './fastmail-api.js';
import { displaySenders } from './ui.js';

/*
 * INITIALIZATION AND FORM HANDLING
 * This file initializes the app and handles the configuration form
 */

// Initialize the manager and register with toolkit
const manager = new FastmailBulkManager();
let isPreviewMode = false;
window.FastmailToolkit.registerTool('bulkManager', manager);

// Handle form submission
document.getElementById('configForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const server = document.getElementById('server').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const subscriptionsFolder = document.getElementById('subscriptionsFolder').value;
    const daysPast = parseInt(document.getElementById('daysPast').value);
    isPreviewMode = document.getElementById('previewMode').checked;
    
    const statusDiv = document.getElementById('connectionStatus');
    statusDiv.innerHTML = '<div class="status info">Connecting...</div>';
    
    try {
        // Connect to JMAP
        const connectResult = await manager.connect(server, username, password);
        if (!connectResult.success) {
            throw new Error(connectResult.error);
        }
        
        // Find subscriptions folder
        const folderResult = await manager.findSubscriptionsFolder(subscriptionsFolder);
        if (!folderResult.success) {
            throw new Error(folderResult.error);
        }
        
        statusDiv.innerHTML = '<div class="status success">Connected successfully!</div>';
        
        // Show results section and scan messages
        document.getElementById('results').classList.remove('hidden');
        await scanMessages(daysPast);
        
    } catch (error) {
        statusDiv.innerHTML = `<div class="status error">Error: ${error.message}</div>`;
    }
});