/*
 * UI FUNCTIONS
 * Functions for displaying senders, showing modals, and handling user interface
 */

function displaySenders(senders) {
    const container = document.getElementById('sendersContainer');
    
    if (senders.length === 0) {
        container.innerHTML = '<div class="status info">No messages found in bulk folder for the selected time period.</div>';
        return;
    }
    
    const html = senders.map(sender => `
        <div class="sender-card">
            <div class="sender-header">
                <div style="flex: 1;">
                    <input type="checkbox" id="sender_${sender.email}" class="sender-checkbox" onchange="updateBulkButtons()">
                    <label for="sender_${sender.email}" style="display: inline; margin-left: 10px;">
                        <span class="sender-email">${sender.name} (${sender.email})</span>
                    </label>
                    <div class="message-count">${sender.count} messages in bulk folder</div>
                </div>
            </div>
            
            <div class="message-preview">
                Recent subjects: ${sender.messages.slice(0, 3).map(m => m.subject).join(' • ')}
                ${sender.count > 3 ? ' • ...' : ''}
            </div>
            
            <div class="actions">
                <button class="action-button" onclick="showMoveConfirmation('${sender.email}', '${sender.name}')">
                    Move All From This Sender
                </button>
                <button class="action-button secondary" onclick="showRuleConfirmation('${sender.email}', '${sender.name}')">
                    Create Auto-Rule
                </button>
                <button class="action-button secondary" onclick="viewMessages('${sender.email}')">
                    View Messages
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Modal and confirmation handling
let pendingAction = null;

function showMoveConfirmation(senderEmail, senderName) {
    document.getElementById('modalTitle').textContent = 'Confirm Move Messages';
    document.getElementById('modalBody').innerHTML = `
        <p>Are you sure you want to move <strong>all messages</strong> from <strong>${senderName}</strong> to the bulk folder?</p>
        <div class="confirmation-details">
            <strong>Sender:</strong> ${senderEmail}<br>
            <strong>Action:</strong> Move all non-bulk messages from this sender to bulk folder
        </div>
        <p><em>This action cannot be easily undone.</em></p>
    `;
    
    pendingAction = { type: 'move', email: senderEmail, name: senderName };
    document.getElementById('confirmationModal').style.display = 'block';
}

function showRuleConfirmation(senderEmail, senderName) {
    document.getElementById('modalTitle').textContent = 'Confirm Create Rule';
    document.getElementById('modalBody').innerHTML = `
        <p>Create an automatic rule to move future messages from <strong>${senderName}</strong> to bulk?</p>
        <div class="confirmation-details">
            <strong>Sender:</strong> ${senderEmail}<br>
            <strong>Action:</strong> Create filter rule to automatically move future messages to bulk folder
        </div>
        <p><em>You can manage rules later in Fastmail's Settings.</em></p>
    `;
    
    pendingAction = { type: 'rule', email: senderEmail, name: senderName };
    document.getElementById('confirmationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
    pendingAction = null;
}

async function confirmAction() {
    if (!pendingAction) return;
    
    const confirmBtn = document.getElementById('confirmBtn');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = 'Processing...';
    confirmBtn.disabled = true;
    
    try {
        if (pendingAction.type === 'move') {
            await executeMove(pendingAction.email);
        } else if (pendingAction.type === 'rule') {
            await executeRule(pendingAction.email);
        } else if (pendingAction.type === 'bulk_move') {
            if (isPreviewMode) {
                showStatus(`Preview: Would move all messages from ${pendingAction.senders.length} selected senders to bulk folder`, 'info');
                return;
            }
            await executeBulkMove(pendingAction.senders);
        } else if (pendingAction.type === 'bulk_rule') {
            if (isPreviewMode) {
                showStatus(`Preview: Would create rules for ${pendingAction.senders.length} selected senders`, 'info');
                return;
            }
            await executeBulkRule(pendingAction.senders);
        }
    } finally {
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
        closeModal();
    }
}

function showStatus(message, type = 'info') {
    const statusDiv = document.createElement('div');
    statusDiv.className = `status ${type}`;
    statusDiv.textContent = message;
    
    const container = document.getElementById('results');
    container.insertBefore(statusDiv, container.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 5000);
}

// Bulk action handlers
function selectAllSenders() {
    document.querySelectorAll('.sender-checkbox').forEach(cb => cb.checked = true);
    updateBulkButtons();
}

function deselectAllSenders() {
    document.querySelectorAll('.sender-checkbox').forEach(cb => cb.checked = false);
    updateBulkButtons();
}

function updateBulkButtons() {
    const checkedCount = document.querySelectorAll('.sender-checkbox:checked').length;
    const moveBtn = document.getElementById('bulkMoveBtn');
    const ruleBtn = document.getElementById('bulkRuleBtn');
    
    moveBtn.disabled = checkedCount === 0;
    ruleBtn.disabled = checkedCount === 0;
    
    moveBtn.textContent = `Move Selected (${checkedCount})`;
    ruleBtn.textContent = `Create Rules for Selected (${checkedCount})`;
}

function bulkAction(actionType) {
    const checkedSenders = Array.from(document.querySelectorAll('.sender-checkbox:checked'))
        .map(cb => cb.id.replace('sender_', ''));
    
    if (checkedSenders.length === 0) return;
    
    const actionText = actionType === 'move' ? 'move all messages from' : 'create rules for';
    const title = actionType === 'move' ? 'Confirm Bulk Move' : 'Confirm Bulk Rule Creation';
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = `
        <p>Are you sure you want to ${actionText} <strong>${checkedSenders.length}</strong> selected senders?</p>
        <div class="confirmation-details">
            <strong>Selected senders:</strong><br>
            ${checkedSenders.slice(0, 5).join('<br>')}
            ${checkedSenders.length > 5 ? `<br>...and ${checkedSenders.length - 5} more` : ''}
        </div>
    `;
    
    pendingAction = { type: `bulk_${actionType}`, senders: checkedSenders };
    document.getElementById('confirmationModal').style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        closeModal();
    }
}

function viewMessages(senderEmail) {
    alert(`Would show detailed message list for ${senderEmail}`);
}