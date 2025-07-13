// Simple Test - Check if extension is loading
console.log('🔍 Simple Extension Test');

// Test 1: Check if we're on Gmail
console.log('1. Current URL:', window.location.href);
if (window.location.href.includes('mail.google.com')) {
    console.log('✅ On Gmail');
} else {
    console.log('❌ Not on Gmail - extension only works on Gmail');
}

// Test 2: Check if Chrome API is available
console.log('2. Chrome API available:', typeof chrome !== 'undefined');
console.log('3. Chrome runtime available:', typeof chrome !== 'undefined' && chrome.runtime);

// Test 3: Check if extension is injected
console.log('4. Looking for extension elements...');
const statusIndicator = document.getElementById('spam-detector-status');
console.log('   Status indicator found:', !!statusIndicator);

// Test 4: Check for any extension-related elements
const allElements = document.querySelectorAll('*');
let extensionElements = [];
allElements.forEach(el => {
    if (el.id && el.id.includes('spam')) {
        extensionElements.push(el.id);
    }
});
console.log('5. Extension elements found:', extensionElements);

// Test 5: Check console for extension messages
console.log('6. Extension should have logged initialization messages');
console.log('   Look for messages starting with "🚀 Gmail Spam Detector Pro"');

// Test 6: Check if content script is running
console.log('7. Content script should be running');
console.log('   If you see this message, the test script is working');

// Summary
console.log('\n📊 Summary:');
if (window.location.href.includes('mail.google.com')) {
    console.log('✅ On correct URL');
} else {
    console.log('❌ Wrong URL - go to mail.google.com');
}

if (typeof chrome !== 'undefined' && chrome.runtime) {
    console.log('✅ Chrome API available');
} else {
    console.log('❌ Chrome API not available - extension not loaded');
}

if (statusIndicator) {
    console.log('✅ Extension elements found');
} else {
    console.log('❌ Extension elements not found');
}

console.log('\n💡 If you see ❌ marks, the extension is not loading properly');
console.log('💡 Try reloading the extension in chrome://extensions/'); 