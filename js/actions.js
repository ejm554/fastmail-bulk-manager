/*
 * ACTION EXECUTION FUNCTIONS
 * These functions handle the actual execution of user actions
 * (moving messages, creating rules) with preview mode support
 */

async function executeMove(senderEmail) {
    try {
        if (isPreviewMode) {
            showStatus(`Preview: Would move all messages from ${senderEmail} to bulk folder`, 'info');
            return;
        }
        const result = await manager.moveMessagesFromSender(senderEmail);
        if (result.success) {
            const message = result.message || `Moved ${result.moved} messages from ${senderEmail} to bulk folder`;
            showStatus(message, result.errors > 0 ? 'warning' : 'success');
            
            // Refresh the display
            const daysPast = parseInt(document.getElementById('daysPast').value);
            await scanMessages(daysPast);
        } else {
            showStatus(`Error: ${result.error}`, 'error');
        }
    } catch (error) {
        showStatus(`Error: ${error.message}`, 'error');
    }
}

async function executeRule(senderEmail) {
    try {
        if (isPreviewMode) {
            showStatus(`Preview: Would create rule to automatically move messages from ${senderEmail} to bulk`, 'info');
            return;
        }
        const result = await manager.createRule(senderEmail);
        if (result.success) {
            const message = result.message || `Created rule to automatically move messages from ${senderEmail} to bulk`;
            showStatus(message, 'success');
        } else {
            showStatus(`Error: ${result.error}`, 'error');
        }
    } catch (error) {
        showStatus(`Error: ${error.message}`, 'error');
    }
}

async function executeBulkMove(senderEmails) {
    const results = [];
    let totalMoved = 0;
    let totalErrors = 0;

    for (const senderEmail of senderEmails) {
        try {
            const result = await manager.moveMessagesFromSender(senderEmail);
            results.push({ sender: senderEmail, result });
            if (result.success) {
                totalMoved += result.moved || 0;
                totalErrors += result.errors || 0;
            }
        } catch (error) {
            results.push({ sender: senderEmail, result: { success: false, error: error.message } });
            totalErrors++;
        }
    }

    const successCount = results.filter(r => r.result.success).length;
    showStatus(`Bulk move completed: ${successCount}/${senderEmails.length} senders processed, ${totalMoved} messages moved${totalErrors > 0 ? ` (${totalErrors} errors)` : ''}`, 
              successCount === senderEmails.length ?