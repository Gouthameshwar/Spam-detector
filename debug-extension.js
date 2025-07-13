// Gmail Spam Detector Pro - Debug Script
// Run this in the browser console on Gmail to test the extension

console.log('🔧 Gmail Spam Detector Pro - Debug Script Loaded');

// Test functions
window.testSpamDetector = {
  // Test email detection
  testEmailDetection: function() {
    console.log('🧪 Testing email detection...');
    
    const emailRows = document.querySelectorAll('[role="row"]');
    console.log(`Found ${emailRows.length} rows`);
    
    let emailCount = 0;
    emailRows.forEach((row, index) => {
      if (row.querySelector('[role="checkbox"]') && row.querySelector('[data-tooltip]')) {
        emailCount++;
        console.log(`Email ${emailCount}:`, {
          sender: row.querySelector('[data-tooltip]')?.textContent,
          subject: row.querySelector('[data-thread-perm-id]')?.textContent,
          processed: row.hasAttribute('data-spam-detected')
        });
      }
    });
    
    console.log(`Total emails found: ${emailCount}`);
  },

  // Test spam detection algorithm
  testSpamAlgorithm: function() {
    console.log('🧪 Testing spam detection algorithm...');
    
    const testEmails = [
      {
        sender: 'noreply@marketing.com',
        subject: '[SPONSORED] Limited Time Offer - Act Now!',
        snippet: 'Don\'t miss this exclusive deal! Click here for special discounts...'
      },
      {
        sender: 'john.doe@gmail.com',
        subject: 'Meeting Tomorrow',
        snippet: 'Hi, let\'s discuss the project updates in our meeting tomorrow.'
      },
      {
        sender: 'promotions@newsletter.com',
        subject: 'Special Offer - Free Trial Available!!!',
        snippet: 'Unsubscribe from this promotional email. Limited time offer...'
      }
    ];

    testEmails.forEach((email, index) => {
      const text = `${email.subject} ${email.snippet}`.toLowerCase();
      let score = 0;
      
      // Spam keywords
      const spamKeywords = ['sponsored', 'advertisement', 'promotion', 'offer', 'limited time', 'act now', 'click here', 'unsubscribe'];
      spamKeywords.forEach(keyword => {
        if (text.includes(keyword)) score += 2;
      });
      
      // Sponsored indicators
      const sponsoredIndicators = ['[ad]', '[sponsored]', '[promotion]'];
      sponsoredIndicators.forEach(indicator => {
        if (text.includes(indicator)) score += 3;
      });
      
      // Sender analysis
      if (email.sender.includes('noreply') || email.sender.includes('marketing')) {
        score += 4;
      }
      
      console.log(`Test Email ${index + 1}:`, {
        sender: email.sender,
        subject: email.subject,
        spamScore: score,
        isSpam: score >= 3
      });
    });
  },

  // Test unsubscribe detection
  testUnsubscribeDetection: function() {
    console.log('🧪 Testing unsubscribe detection...');
    
    const links = document.querySelectorAll('a[href*="unsubscribe"], a[href*="opt-out"], a[href*="remove"]');
    console.log(`Found ${links.length} potential unsubscribe links`);
    
    links.forEach((link, index) => {
      console.log(`Link ${index + 1}:`, {
        href: link.href,
        text: link.textContent,
        visible: link.offsetParent !== null
      });
    });
  },

  // Test extension status
  testExtensionStatus: function() {
    console.log('🧪 Testing extension status...');
    
    // Check if extension is loaded
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      console.log('✅ Chrome runtime available');
    } else {
      console.log('❌ Chrome runtime not available');
    }
    
    // Check for extension elements
    const statusIndicator = document.getElementById('spam-detector-status');
    if (statusIndicator) {
      console.log('✅ Extension status indicator found');
    } else {
      console.log('❌ Extension status indicator not found');
    }
    
    // Check for processed emails
    const processedEmails = document.querySelectorAll('[data-spam-detected]');
    console.log(`Found ${processedEmails.length} processed emails`);
  },

  // Test settings
  testSettings: function() {
    console.log('🧪 Testing settings...');
    
    chrome.storage.sync.get(['spamDetectorSettings'], function(result) {
      if (result.spamDetectorSettings) {
        console.log('✅ Settings found:', result.spamDetectorSettings);
      } else {
        console.log('❌ No settings found');
      }
    });
  },

  // Run all tests
  runAllTests: function() {
    console.log('🚀 Running all tests...');
    this.testEmailDetection();
    this.testSpamAlgorithm();
    this.testUnsubscribeDetection();
    this.testExtensionStatus();
    this.testSettings();
    console.log('✅ All tests completed');
  }
};

// Auto-run tests after a delay
setTimeout(() => {
  console.log('🔄 Auto-running tests in 3 seconds...');
  setTimeout(() => {
    window.testSpamDetector.runAllTests();
  }, 3000);
}, 1000);

console.log('💡 Use testSpamDetector.runAllTests() to run all tests');
console.log('💡 Use testSpamDetector.testEmailDetection() to test email detection');
console.log('💡 Use testSpamDetector.testSpamAlgorithm() to test spam algorithm');
console.log('💡 Use testSpamDetector.testUnsubscribeDetection() to test unsubscribe detection');
console.log('💡 Use testSpamDetector.testExtensionStatus() to test extension status');
console.log('💡 Use testSpamDetector.testSettings() to test settings'); 