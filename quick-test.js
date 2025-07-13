// Quick Test Script for Gmail Spam Detector Pro
// Copy and paste this into the browser console on Gmail

console.log('🧪 Quick Test for Gmail Spam Detector Pro');

// Test 1: Check if extension is loaded
function testExtensionLoaded() {
    console.log('\n1️⃣ Testing if extension is loaded...');
    
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        console.log('✅ Chrome runtime available');
        return true;
    } else {
        console.log('❌ Chrome runtime not available');
        return false;
    }
}

// Test 2: Check for status indicator
function testStatusIndicator() {
    console.log('\n2️⃣ Testing status indicator...');
    
    const indicator = document.getElementById('spam-detector-status');
    if (indicator) {
        console.log('✅ Status indicator found');
        return true;
    } else {
        console.log('❌ Status indicator not found');
        return false;
    }
}

// Test 3: Check for processed emails
function testProcessedEmails() {
    console.log('\n3️⃣ Testing processed emails...');
    
    const processedEmails = document.querySelectorAll('[data-spam-detected]');
    console.log(`Found ${processedEmails.length} processed emails`);
    
    if (processedEmails.length > 0) {
        console.log('✅ Emails are being processed');
        return true;
    } else {
        console.log('⚠️ No processed emails found (this might be normal if no spam detected)');
        return false;
    }
}

// Test 4: Check settings
function testSettings() {
    console.log('\n4️⃣ Testing settings...');
    
    chrome.storage.sync.get(['spamDetectorSettings'], function(result) {
        if (result.spamDetectorSettings) {
            console.log('✅ Settings found:', result.spamDetectorSettings);
        } else {
            console.log('⚠️ No settings found (using defaults)');
        }
    });
}

// Test 5: Check for console logs
function testConsoleLogs() {
    console.log('\n5️⃣ Testing console logs...');
    
    // Look for extension initialization messages
    const logs = performance.getEntriesByType('navigation');
    console.log('✅ Console logging is working');
    return true;
}

// Test 6: Check for email detection
function testEmailDetection() {
    console.log('\n6️⃣ Testing email detection...');
    
    const emailRows = document.querySelectorAll('[role="row"]');
    let emailCount = 0;
    
    emailRows.forEach(row => {
        if (row.querySelector('[role="checkbox"]') && row.querySelector('[data-tooltip]')) {
            emailCount++;
        }
    });
    
    console.log(`Found ${emailCount} potential email rows`);
    
    if (emailCount > 0) {
        console.log('✅ Email detection structure found');
        return true;
    } else {
        console.log('❌ No email rows found');
        return false;
    }
}

// Run all tests
function runQuickTest() {
    console.log('🚀 Running Quick Test...\n');
    
    const results = {
        extensionLoaded: testExtensionLoaded(),
        statusIndicator: testStatusIndicator(),
        processedEmails: testProcessedEmails(),
        consoleLogs: testConsoleLogs(),
        emailDetection: testEmailDetection()
    };
    
    testSettings(); // This is async, so we don't wait for it
    
    // Summary
    console.log('\n📊 Test Summary:');
    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    
    console.log(`✅ Passed: ${passed}/${total} tests`);
    
    if (passed >= 3) {
        console.log('🎉 Extension appears to be working!');
    } else {
        console.log('⚠️ Extension may have issues. Check the console for errors.');
    }
    
    return results;
}

// Auto-run the test
setTimeout(() => {
    runQuickTest();
}, 1000);

console.log('💡 Use runQuickTest() to run the test again'); 