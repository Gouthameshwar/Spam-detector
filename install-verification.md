# Gmail Spam Detector Pro - Installation Verification Guide

## Step 1: Check Extension Status

1. Open Chrome and go to `chrome://extensions/`
2. Look for "Gmail Spam & Sponsored Email Detector Pro"
3. Check if it's enabled (toggle should be ON)
4. Check if there are any error messages

## Step 2: Verify Extension Files

Make sure these files exist in your extension folder:
- ✅ `manifest.json`
- ✅ `content-script.js`
- ✅ `background-script.js`
- ✅ `popup.html`
- ✅ `popup.js`

## Step 3: Check Permissions

In `chrome://extensions/`, click on your extension and verify:
- ✅ Storage permission
- ✅ Active tab permission
- ✅ Scripting permission
- ✅ Host permissions for `https://mail.google.com/*`

## Step 4: Test Extension Loading

1. Go to Gmail (https://mail.google.com)
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run this test script:

```javascript
// Copy and paste this into the console
console.log('🧪 Testing Extension...');
console.log('Chrome runtime:', typeof chrome !== 'undefined' && chrome.runtime);
console.log('Detector instance:', window.gmailSpamDetector);
console.log('Active indicator:', document.querySelector('#spam-detector-indicator'));
```

## Step 5: Expected Results

✅ **Good Results:**
- Chrome runtime: true
- Detector instance: [object Object]
- Active indicator: [element]

❌ **Bad Results:**
- Chrome runtime: false
- Detector instance: undefined
- Active indicator: null

## Step 6: Troubleshooting

### If Extension Not Loading:

1. **Reload Extension:**
   - Go to `chrome://extensions/`
   - Click the refresh icon on your extension
   - Reload Gmail page

2. **Check for Errors:**
   - In `chrome://extensions/`, click "Errors" button
   - Look for any error messages
   - Fix any issues found

3. **Clear Browser Cache:**
   - Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Clear browsing data
   - Reload Gmail

4. **Disable Other Extensions:**
   - Temporarily disable other extensions
   - Test if the issue persists
   - Re-enable one by one to find conflicts

### If Extension Loads But Doesn't Work:

1. **Check Console Errors:**
   - Open Developer Tools (F12)
   - Look for red error messages
   - Share any errors you see

2. **Test Manual Functions:**
   - Run the test script from Step 4
   - Check if any functions work

3. **Verify Gmail Structure:**
   - Gmail may have changed its HTML structure
   - The extension might need selector updates

## Step 7: Manual Test Script

Run this comprehensive test in the Gmail console:

```javascript
// Copy the contents of test-extension.js and paste here
```

## Step 8: Report Results

Please share:
1. Extension status from `chrome://extensions/`
2. Any error messages you see
3. Results from the test script
4. Whether the active indicator appears
5. Whether emails are being processed

## Common Issues & Solutions

### Issue: "Chrome runtime not available"
**Solution:** Extension not properly installed or enabled

### Issue: "Detector instance not found"
**Solution:** Content script not injected properly

### Issue: "No emails processed"
**Solution:** Gmail structure may have changed, need selector updates

### Issue: "Settings not saving"
**Solution:** Storage permissions not granted

## Next Steps

If the extension still doesn't work after following these steps:

1. Share the exact error messages you see
2. Share the results from the test script
3. Check if you're using the latest version of Chrome
4. Try installing the extension in a fresh Chrome profile

## Support

If you continue to have issues, please provide:
- Chrome version
- Extension version
- Exact error messages
- Test script results
- Screenshots of any error dialogs 