# 🛡️ Gmail Spam Detector Pro - Simple Installation Guide

## 🚀 **Quick Installation (5 Steps)**

### **Step 1: Open Chrome Extensions**
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar
3. Press Enter

### **Step 2: Enable Developer Mode**
1. Look for the **"Developer mode"** toggle in the top-right corner
2. **Turn it ON** (it should show a blue color)

### **Step 3: Load the Extension**
1. Click the **"Load unpacked"** button (it will appear after enabling Developer mode)
2. A file picker will open
3. **Navigate to your extension folder** (the folder containing `manifest.json`)
4. **Select the folder** (not individual files, but the whole folder)
5. Click **"Select Folder"**

### **Step 4: Verify Installation**
1. You should see **"Gmail Spam Detector Pro"** in the extensions list
2. Make sure it shows **"Enabled"** (toggle should be blue)
3. Look for the extension icon in your Chrome toolbar (top-right)

### **Step 5: Test the Extension**
1. Go to [Gmail](https://mail.google.com)
2. Sign in to your Gmail account
3. Look for a **green status indicator** in the top-left corner
4. Click the extension icon in the toolbar to open the popup

---

## 🔧 **Troubleshooting**

### **If Extension Doesn't Load:**
- Make sure you selected the **folder**, not individual files
- Check that `manifest.json` is in the folder you selected
- Try refreshing the extensions page

### **If No Icon Appears:**
- Click the puzzle piece icon in Chrome toolbar
- Look for "Gmail Spam Detector Pro"
- Click the pin icon to keep it visible

### **If No Status Indicator on Gmail:**
- Make sure you're on `mail.google.com`
- Try refreshing the page
- Check the browser console (F12) for error messages

---

## 🧪 **Testing the Extension**

### **Test 1: Basic Functionality**
1. Open Gmail
2. Press **F12** to open Developer Tools
3. Go to the **"Console"** tab
4. Look for messages starting with "🚀 Gmail Spam Detector Pro"
5. You should see: "✅ Gmail Spam Detector Pro ready"

### **Test 2: Spam Detection**
1. Find a promotional email in your inbox
2. Look for **red highlighting** or **"SPAM"** indicators
3. Check the console for detection logs

### **Test 3: Extension Popup**
1. Click the extension icon in the toolbar
2. The popup should open with tabs
3. Try changing settings and saving them

### **Test 4: Manual Unsubscribe**
1. Find an email with an unsubscribe link
2. The extension should detect it automatically
3. Look for notifications about unsubscribe links

---

## 📊 **Expected Results**

### **✅ Working Correctly:**
- Green status indicator on Gmail
- Extension icon in toolbar
- Popup opens when clicked
- Console shows initialization messages
- Spam emails get highlighted
- Settings save properly

### **❌ Not Working:**
- No status indicator
- No extension icon
- Popup doesn't open
- Console shows errors
- No email highlighting

---

## 🆘 **If Nothing Works**

### **Step 1: Check Files**
Make sure these files exist in your extension folder:
- ✅ `manifest.json`
- ✅ `content-script.js`
- ✅ `popup.html`
- ✅ `popup.js`
- ✅ `background-script.js`

### **Step 2: Check Console**
1. Open Gmail
2. Press F12
3. Go to Console tab
4. Look for any red error messages
5. Share the error messages if you see any

### **Step 3: Reload Extension**
1. Go to `chrome://extensions/`
2. Find "Gmail Spam Detector Pro"
3. Click the refresh/reload button
4. Try again

---

## 🎯 **Quick Test Commands**

Once on Gmail, open the console (F12) and run these commands:

```javascript
// Check if extension is loaded
typeof chrome !== 'undefined' && chrome.runtime

// Check for status indicator
document.getElementById('spam-detector-status')

// Check for processed emails
document.querySelectorAll('[data-spam-detected]').length

// Check settings
chrome.storage.sync.get(['spamDetectorSettings'])
```

---

## 📞 **Need Help?**

If you're still having issues:
1. **Check the console** for error messages
2. **Verify all files** are present
3. **Try reloading** the extension
4. **Make sure** you're on the correct Gmail URL

**The extension should work immediately after following these steps!** 🎉 