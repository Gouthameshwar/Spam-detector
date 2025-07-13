// Minimal Test - Basic Extension Check
console.log('🧪 Minimal Extension Test');

// Check if we're on Gmail
if (!window.location.href.includes('mail.google.com')) {
    console.log('❌ ERROR: You must be on Gmail (mail.google.com) for this extension to work');
    console.log('   Current URL:', window.location.href);
    console.log('   Please go to https://mail.google.com and try again');
    return;
}

console.log('✅ On Gmail - proceeding with tests');

// Check Chrome API
if (typeof chrome === 'undefined') {
    console.log('❌ ERROR: Chrome API not available');
    console.log('   This means the extension is not loaded');
    console.log('   Please check chrome://extensions/');
    return;
}

console.log('✅ Chrome API available');

// Check Chrome runtime
if (!chrome.runtime) {
    console.log('❌ ERROR: Chrome runtime not available');
    console.log('   Extension is not properly loaded');
    return;
}

console.log('✅ Chrome runtime available');

// Try to access storage
try {
    chrome.storage.sync.get(['test'], function(result) {
        console.log('✅ Chrome storage working');
    });
} catch (error) {
    console.log('❌ ERROR: Chrome storage not working:', error.message);
}

// Check for extension elements
const statusIndicator = document.getElementById('spam-detector-status');
if (statusIndicator) {
    console.log('✅ Extension status indicator found');
} else {
    console.log('❌ Extension status indicator not found');
    console.log('   This means the content script is not running');
}

// Check for any console messages from extension
console.log('\n📋 Next Steps:');
console.log('1. Go to chrome://extensions/');
console.log('2. Find "Gmail Spam Detector Pro"');
console.log('3. Make sure it shows "Enabled"');
console.log('4. If not enabled, click the toggle');
console.log('5. Click the refresh/reload button');
console.log('6. Go back to Gmail and refresh the page');
console.log('7. Run this test again');

console.log('\n🔍 If still not working:');
console.log('- Check the "Errors" button in chrome://extensions/');
console.log('- Look for any red error messages');
console.log('- Make sure you selected the correct folder when loading'); 