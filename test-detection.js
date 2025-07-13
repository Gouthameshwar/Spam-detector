// Test script for Gmail Spam Detector
console.log('🧪 Testing Gmail Spam Detector Algorithm');

// Sample test emails
const testEmails = [
  {
    sender: 'noreply@marketing.com',
    subject: '[SPONSORED] Limited Time Offer - Act Now!',
    snippet: 'Don\'t miss this exclusive deal! Click here for special discounts...',
    expectedScore: 8,
    description: 'High spam score - sponsored content with urgent language'
  },
  {
    sender: 'promotions@newsletter.com',
    subject: 'Special Offer - Free Trial Available!!!',
    snippet: 'Unsubscribe from this promotional email. Limited time offer...',
    expectedScore: 6,
    description: 'Medium spam score - promotional content with exclamation marks'
  },
  {
    sender: 'john.doe@company.com',
    subject: 'Meeting Tomorrow',
    snippet: 'Hi, let\'s discuss the project updates in our meeting tomorrow.',
    expectedScore: 0,
    description: 'Low spam score - legitimate business email'
  },
  {
    sender: 'newsletter@spam.com',
    subject: '🔥 HOT DEAL - 50% OFF EVERYTHING!!!',
    snippet: 'Sponsored content: Amazing deals you can\'t miss! Act now!',
    expectedScore: 10,
    description: 'Very high spam score - sponsored content with excessive punctuation'
  }
];

// Spam detection algorithm (copied from content-script.js)
function calculateSpamScore(emailData) {
  let score = 0;
  const text = `${emailData.subject} ${emailData.snippet}`.toLowerCase();

  // Spam keywords
  const spamKeywords = [
    'sponsored', 'advertisement', 'promotion', 'offer',
    'limited time', 'act now', 'click here', 'unsubscribe',
    'special offer', 'discount', 'sale', 'free trial',
    'exclusive deal', 'limited offer', 'urgent', 'last chance'
  ];

  // Sponsored indicators
  const sponsoredIndicators = [
    '[ad]', '[sponsored]', '[promotion]', '[advertisement]',
    'sponsored content', 'paid partnership', 'advertisement',
    'promoted post', 'sponsored post'
  ];

  // Check for spam keywords
  spamKeywords.forEach(keyword => {
    if (text.includes(keyword)) {
      score += 2;
    }
  });

  // Check for sponsored indicators
  sponsoredIndicators.forEach(indicator => {
    if (text.includes(indicator)) {
      score += 3;
    }
  });

  // Check sender patterns
  if (isKnownSpamSender(emailData.sender)) {
    score += 4;
  }

  // Check for excessive punctuation (spam indicator)
  const exclamationCount = (emailData.subject.match(/!/g) || []).length;
  if (exclamationCount > 2) {
    score += 1;
  }

  return score;
}

function isKnownSpamSender(sender) {
  const spamDomains = [
    'noreply', 'donotreply', 'no-reply', 'marketing',
    'newsletter', 'promotions', 'offers', 'deals'
  ];

  return spamDomains.some(domain => 
    sender.toLowerCase().includes(domain)
  );
}

// Run tests
console.log('\n📊 Running Spam Detection Tests...\n');

testEmails.forEach((email, index) => {
  const actualScore = calculateSpamScore(email);
  const isSpam = actualScore >= 3; // Default sensitivity
  const status = isSpam ? '🚨 SPAM' : '✅ LEGITIMATE';
  
  console.log(`Test ${index + 1}: ${status}`);
  console.log(`From: ${email.sender}`);
  console.log(`Subject: ${email.subject}`);
  console.log(`Score: ${actualScore} (Expected: ${email.expectedScore})`);
  console.log(`Description: ${email.description}`);
  console.log('---');
});

console.log('\n✅ Test completed!');
console.log('If all tests show expected results, the detection algorithm is working correctly.'); 