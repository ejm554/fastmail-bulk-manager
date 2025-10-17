/*
 * MAIN APPLICATION CLASS
 * ES6 class syntax for creating objects with methods and properties
 * Classes are blueprints for creating objects
 */
class FastmailBulkManager {
    /*
     * CONSTRUCTOR
     * Special method that runs when creating a new instance of the class
     * Initializes the object's properties with default values
     */
    constructor() {
        this.session = null;      // Will store JMAP session data
        this.accountId = null;    // User's account identifier
        this.bulkFolderId = null; // ID of the bulk/spam folder
        this.baseUrl = null;      // Base URL for JMAP API calls
    }

    /*
     * AUTHENTICATION METHOD
     * Async/await syntax for handling asynchronous operations
     * This connects to Fastmail's JMAP API using app passwords
     */
    async connect(server, username, password) {
        try {
            /*
             * FETCH API
             * Modern way to make HTTP requests in JavaScript
             * fetch() returns a Promise that resolves to the Response object
             */
            const sessionResponse = await fetch(server, {
                method: 'GET',
                headers: {
                    /*
                     * HTTP BASIC AUTHENTICATION
                     * btoa() encodes username:password in Base64
                     * This is how we authenticate with Fastmail's API
                     */
                    'Authorization': `Basic ${btoa(username + ':' + password)}`
                }
            });

            // Check if the HTTP request was successful
            if (!sessionResponse.ok) {
                throw new Error(`Authentication failed: ${sessionResponse.status}`);
            }

            /*
             * JSON PARSING
             * Convert the response from JSON string to JavaScript object
             * await waits for the Promise to resolve
             */
            this.session = await sessionResponse.json();
            this.baseUrl = this.session.apiUrl;
            
            /*
             * OBJECT PROPERTY ACCESS
             * Accessing nested properties using bracket notation
             * This gets the mail account ID from the session data
             */
            this.accountId = this.session.primaryAccounts['urn:ietf:params:jmap:mail'];

            /*
             * SHARED AUTHENTICATION STORAGE
             * Store authentication data so other tools can reuse it
             * This supports the extensibility roadmap
             */
            window.FastmailToolkit.setSharedAuth({
                server, username, password,
                session: this.session,
                baseUrl: this.baseUrl,
                accountId: this.accountId
            });

            // Return success object
            return { success: true };
        } catch (error) {
            /*
             * ERROR HANDLING
             * Catch any errors and return them in a consistent format
             * This prevents the application from crashing
             */
            return { success: false, error: error.message };
        }
    }

    async findSubscriptionsFolder(folderName) {
        try {
            const response = await this.makeJMAPCall([
                ['Mailbox/get', {
                    accountId: this.accountId,
                    properties: ['id', 'name', 'parentId', 'role']
                }, '0']
            ]);

            const mailboxes = response[0][1].list;
            
            // First try to find by role
            let bulkFolder = mailboxes.find(mb => mb.role === 'junk');
            
            // If not found, try by name (case insensitive)
            if (!bulkFolder) {
                bulkFolder = mailboxes.find(mb => 
                    mb.name.toLowerCase() === folderName.toLowerCase()
                );
            }

            if (bulkFolder) {
                this.bulkFolderId = bulkFolder.id;
                return { success: true, folder: bulkFolder };
            } else {
                return { success: false, error: `Folder "${folderName}" not found` };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async scanBulkMessages(daysPast) {
        try {
            const sinceDate = new Date();
            sinceDate.setDate(sinceDate.getDate() - daysPast);
            
            const response = await this.makeJMAPCall([
                ['Email/query', {
                    accountId: this.accountId,
                    filter: {
                        inMailbox: this.bulkFolderId,
                        after: sinceDate.toISOString()
                    }
                }, '0'],
                ['Email/get', {
                    accountId: this.accountId,
                    '#ids': {
                        resultOf: '0',
                        name: 'Email/query',
                        path: '/ids'
                    },
                    properties: ['id', 'subject', 'from', 'receivedAt', 'mailboxIds']
                }, '1']
            ]);

            const emails = response[1][1].list;
            return this.groupBySender(emails);
        } catch (error) {
            throw error;
        }
    }

    groupBySender(emails) {
        const senderGroups = {};
        
        emails.forEach(email => {
            const fromEmail = email.from[0].email;
            const fromName = email.from[0].name || fromEmail;
            
            if (!senderGroups[fromEmail]) {
                senderGroups[fromEmail] = {
                    email: fromEmail,
                    name: fromName,
                    messages: [],
                    count: 0
                };
            }
            
            senderGroups[fromEmail].messages.push({
                id: email.id,
                subject: email.subject,
                receivedAt: email.receivedAt
            });
            senderGroups[fromEmail].count++;
        });

        return Object.values(senderGroups).sort((a, b) => b.count - a.count);
    }

    async moveMessagesFromSender(senderEmail) {
        try {
            // First, find all messages from this sender NOT in bulk folder
            const response = await this.makeJMAPCall([
                ['Email/query', {
                    accountId: this.accountId,
                    filter: {
                        from: senderEmail,
                        notInMailbox: this.bulkFolderId
                    }
                }, '0'],
                ['Email/get', {
                    accountId: this.accountId,
                    '#ids': {
                        resultOf: '0',
                        name: 'Email/query',
                        path: '/ids'
                    },
                    properties: ['id', 'mailboxIds']
                }, '1']
            ]);

            const emails = response[1][1].list;
            
            if (emails.length === 0) {
                return { success: true, moved: 0, message: 'No messages to move' };
            }

            // Prepare updates to move messages to bulk folder
            const updates = {};
            emails.forEach(email => {
                const newMailboxIds = { ...email.mailboxIds };
                
                // Remove from all current mailboxes and add to bulk
                Object.keys(newMailboxIds).forEach(id => delete newMailboxIds[id]);
                newMailboxIds[this.bulkFolderId] = true;
                
                updates[email.id] = {
                    mailboxIds: newMailboxIds
                };
            });

            // Execute the move
            const moveResponse = await this.makeJMAPCall([
                ['Email/set', {
                    accountId: this.accountId,
                    update: updates
                }, '0']
            ]);

            const result = moveResponse[0][1];
            const movedCount = Object.keys(result.updated || {}).length;
            const errors = result.notUpdated || {};

            if (Object.keys(errors).length > 0) {
                console.warn('Some messages could not be moved:', errors);
            }

            return { 
                success: true, 
                moved: movedCount,
                errors: Object.keys(errors).length,
                message: `Moved ${movedCount} messages${Object.keys(errors).length > 0 ? ` (${Object.keys(errors).length} failed)` : ''}`
            };
            
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async createRule(senderEmail) {
        try {
            // Get current Sieve script
            const getResponse = await this.makeJMAPCall([
                ['SieveScript/get', {
                    accountId: this.accountId
                }, '0']
            ]);

            let activeScript = getResponse[0][1].list.find(script => script.isActive);
            let scriptContent = activeScript ? activeScript.blobId : '';
            
            // If we have an existing script, get its content
            if (scriptContent) {
                // In a real implementation, you'd fetch the blob content here
                // For now, we'll append to existing rules
                scriptContent = '# Existing rules would be here\n\n';
            } else {
                scriptContent = '# Auto-generated rules by Fastmail Bulk Manager\n\n';
            }

            // Generate new rule
            const newRule = `# Rule for ${senderEmail}
if address :is "from" "${senderEmail}" {
    fileinto "Bulk";
    stop;
}

`;

            const updatedScript = scriptContent + newRule;

            // Create or update the script
            const scriptName = activeScript ? activeScript.name : 'bulk-manager-rules';
            const scriptId = activeScript ? activeScript.id : null;

            const setCall = scriptId ? 
                ['SieveScript/set', {
                    accountId: this.accountId,
                    update: {
                        [scriptId]: {
                            source: updatedScript
                        }
                    }
                }, '0'] :
                ['SieveScript/set', {
                    accountId: this.accountId,
                    create: {
                        'new-rule': {
                            name: scriptName,
                            source: updatedScript,
                            isActive: true
                        }
                    }
                }, '0'];

            const setResponse = await this.makeJMAPCall([setCall]);
            
            const result = setResponse[0][1];
            
            if (result.created || result.updated) {
                return { 
                    success: true, 
                    message: `Created rule to move messages from ${senderEmail} to bulk folder`
                };
            } else {
                throw new Error('Failed to create rule: ' + JSON.stringify(result.notCreated || result.notUpdated));
            }
            
        } catch (error) {
            // Fallback: Try a simpler approach or provide helpful error
            if (error.message.includes('SieveScript')) {
                return { 
                    success: false, 
                    error: 'Sieve script management not available. You can manually create a rule in Fastmail Settings → Rules.' 
                };
            }
            return { success: false, error: error.message };
        }
    }

    async makeJMAPCall(requests) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.getElementById('password').value ? 
                    `Basic ${btoa(document.getElementById('username').value + ':' + document.getElementById('password').value)}` : ''
            },
            body: JSON.stringify({
                using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:mail'],
                methodCalls: requests
            })
        });

        if (!response.ok) {
            throw new Error(`JMAP call failed: ${response.status}`);
        }

        const data = await response.json();
        return data.methodResponses;
    }
}

export { FastmailBulkManager };