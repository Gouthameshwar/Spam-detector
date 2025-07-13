// Test script to verify extension functionality
// Run this in the Gmail console (F12 -> Console)

console.log('🧪 Testing Gmail Spam Detector Pro Extension...');

// Test 1: Check if extension is loaded
console.log('Test 1: Extension Loading');
if (typeof chrome !== 'undefined' && chrome.runtime) {
  console.log('✅ Chrome runtime available');
} else {
  console.log('❌ Chrome runtime NOT available - extension not loaded');
}

// Test 2: Check if detector instance exists
console.log('Test 2: Detector Instance');
if (window.gmailSpamDetector) {
  console.log('✅ Detector instance found');
  console.log('Settings:', window.gmailSpamDetector.settings);
  console.log('Performance:', window.gmailSpamDetector.performanceMetrics);
} else {
  console.log('❌ Detector instance NOT found');
}

// Test 3: Check for active indicator
console.log('Test 3: Active Indicator');
const indicator = document.querySelector('#spam-detector-indicator');
if (indicator) {
  console.log('✅ Active indicator found');
} else {
  console.log('❌ Active indicator NOT found');
}

// Test 4: Check for processed emails
console.log('Test 4: Email Processing');
const processedEmails = document.querySelectorAll('[data-spam-detected="true"]');
console.log(`Found ${processedEmails.length} processed emails`);

// Test 5: Test email detection
console.log('Test 5: Email Detection');
const emailRows = document.querySelectorAll('[role="row"]');
console.log(`Found ${emailRows.length} email rows`);

// Test 6: Manual scan test
console.log('Test 6: Manual Scan');
if (window.gmailSpamDetector) {
  try {
    const result = window.gmailSpamDetector.scanExistingEmails();
    console.log(`Manual scan processed ${result} emails`);
  } catch (error) {
    console.error('❌ Manual scan failed:', error);
  }
}

// Test 7: Settings test
console.log('Test 7: Settings Test');
if (window.gmailSpamDetector) {
  try {
    const oldSensitivity = window.gmailSpamDetector.settings.sensitivity;
    window.gmailSpamDetector.settings.sensitivity = 5;
    console.log('✅ Settings can be modified');
    window.gmailSpamDetector.settings.sensitivity = oldSensitivity;
  } catch (error) {
    console.error('❌ Settings test failed:', error);
  }
}

console.log('🧪 Extension test completed!'); 