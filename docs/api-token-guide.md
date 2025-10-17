# FASTMAIL API TOKEN ACQUISITION GUIDE

## For Tool Users

### What You Need

A Fastmail API token to authenticate the Subscriptions Manager tool.

### How to Get Your API Token

1. **Log into Fastmail**
   - Go to <https://www.fastmail.com>
   - Sign in to your account

2. **Navigate to API Tokens**
   - Click Settings (gear icon in top right)
   - Go to: Privacy & Security → API tokens
   - Or direct link: <https://app.fastmail.com/settings/security/tokens>

3. **Create New Token**
   - Click "New API token" button
   - Give it a descriptive name (e.g., "Subscriptions Manager")

4. **Select Required Scopes**
   You must enable these three scopes:
   - ✅ **JMAP Core** - Required for basic JMAP operations
   - ✅ **JMAP Mail** - Required to read and move messages
   - ✅ **JMAP Submission** - Required for email filtering rules

5. **Copy the Token**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately
   - Format will be: `fmu1-{uuid}-{hash}`
   - You cannot view it again after closing the dialog

6. **Use in the Tool**
   - Paste the token into the "API Token" field
   - The tool will authenticate using Bearer token authentication

### Token Security

- **Keep it secret**: API tokens grant full access to your account within their scope
- **Don't share**: Never share tokens in screenshots, logs, or public forums
- **Revoke if compromised**: You can revoke tokens anytime in Settings → API tokens
- **Create separate tokens**: Use different tokens for different tools for easier management

### Token Format Example

```text
fmu1-12345678-90ab-cdef-1234-567890abcdef-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### Troubleshooting

**Error: "Invalid Authorization header, not bearer"**

- Ensure you're using an API token, not an app password
- API tokens are different from app passwords
- Generate a new API token if needed

**Error: "Authentication failed: 401"**

- Check that all three scopes are enabled
- Verify the token was copied correctly (no extra spaces)
- Ensure the token hasn't been revoked

**Token not working**

- Regenerate the token in Fastmail settings
- Make sure you selected all three required scopes
- Try logging out and back into Fastmail, then create a new token

## For Developers

### Technical Details

**Endpoint**: `https://api.fastmail.com/jmap/session`

**Authentication Method**: Bearer token (HTTP Authorization header)

**Required Headers**:

```javascript
{
    'Authorization': `Bearer ${apiToken}`
}
```

**Token Scopes Required**:

- `urn:ietf:params:jmap:core` - JMAP Core capabilities
- `urn:ietf:params:jmap:mail` - Mail reading and manipulation
- `urn:ietf:params:jmap:submission` - Email submission (for filter rules)

**Why Bearer Tokens?**

Fastmail's CORS-enabled JMAP endpoint (`api.fastmail.com`) requires Bearer token authentication, not Basic authentication. This is because:

1. Basic auth requires username/password which gets stripped by CORS preflight
2. Bearer tokens are more secure for browser-based applications
3. Tokens can be scoped and revoked individually

**Migration from App Passwords**

If you previously used app passwords with Basic auth:

- Old endpoint: `https://jmap.fastmail.com/.well-known/jmap`
- New endpoint: `https://api.fastmail.com/jmap/session`
- Old method: `Basic ${btoa(username + ':' + password)}`
- New method: `Bearer ${apiToken}`

### Security Best Practices

1. **Never log tokens**: Don't include tokens in console.log or error messages
2. **Store securely**: If persisting, use encrypted localStorage or secure key storage
3. **Minimal scopes**: Only request the scopes your application needs
4. **Token rotation**: Consider prompting users to regenerate tokens periodically
5. **Revocation**: Provide clear instructions for users to revoke tokens

### Testing Your Implementation

```javascript
// Test connection
const response = await fetch('https://api.fastmail.com/jmap/session', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiToken}`
    }
});

if (response.ok) {
    const session = await response.json();
    console.log('Connected:', session.accounts);
} else {
    console.error('Auth failed:', response.status);
}
```

### Common Issues

**CORS Errors**

- Always use `api.fastmail.com`, not `jmap.fastmail.com`
- The latter redirects and doesn't support CORS properly

**401 Unauthorized**

- Verify Bearer format (not Basic)
- Check token scopes include all three required capabilities
- Ensure token hasn't been revoked

**Missing Capabilities**

- Session response includes `capabilities` object
- Verify your token has the scopes you need
- Re-create token with correct scopes if needed

## Additional Resources

- Fastmail Developer Documentation: <https://www.fastmail.com/dev/>
- JMAP Specification: <https://jmap.io/>
- API Token Management: <https://app.fastmail.com/settings/security/tokens>

---

**Document Created**: 2025-10-17  
**Purpose**: Phase 1, Part 2 completion - Authentication migration documentation  
**Conversation**: "Fastmail Toolkit (Part 3)" (ID: b946c48c-f049-421c-8d97-12b526b517f1)