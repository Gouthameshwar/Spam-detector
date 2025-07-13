// Updated test script for popup functionality
// Run this in the popup console (right-click popup -> Inspect -> Console)

console.log('🧪 Testing Fixed Popup Functionality...');

// Test 1: Check if popup manager is loaded
console.log('Test 1: Popup Manager Loading');
if (window.popupManager) {
  console.log('✅ Popup manager found');
  console.log('Settings:', window.popupManager.settings);
  console.log('Analytics:', window.popupManager.analytics);
} else {
  console.log('❌ Popup manager NOT found');
}

// Test 2: Check DOM elements that should exist
console.log('Test 2: Required DOM Elements');
const requiredElements = [
  'emails-processed',
  'spam-detected', 
  'unsubscribes',
  'organizations',
  'processing-speed',
  'cache-hit-rate',
  'memory-usage',
  'sensitivity',
  'sensitivity-value',
  'dashboard',
  'settings',
  'analytics',
  'logs'
];

let missingElements = [];
requiredElements.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    console.log(`✅ ${id} found`);
  } else {
    console.log(`❌ ${id} NOT found`);
    missingElements.push(id);
  }
});

if (missingElements.length > 0) {
  console.log(`⚠️ Missing elements: ${missingElements.join(', ')}`);
} else {
  console.log('✅ All required elements found');
}

// Test 3: Check tabs
console.log('Test 3: Tab Navigation');
const tabs = document.querySelectorAll('.tab');
console.log(`Found ${tabs.length} tabs:`);
tabs.forEach(tab => {
  console.log(`- ${tab.textContent} (${tab.dataset.tab})`);
});

// Test 4: Check tab content
console.log('Test 4: Tab Content');
const tabContents = document.querySelectorAll('.tab-content');
console.log(`Found ${tabContents.length} tab contents:`);
tabContents.forEach(content => {
  console.log(`- ${content.id}`);
});

// Test 5: Test chrome.runtime
console.log('Test 5: Chrome Runtime');
if (typeof chrome !== 'undefined' && chrome.runtime) {
  console.log('✅ Chrome runtime available');
  
  // Test message sending
  try {
    chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
      if (chrome.runtime.lastError) {
        console.log('❌ Message sending failed:', chrome.runtime.lastError);
      } else {
        console.log('✅ Message sending successful:', response);
      }
    });
  } catch (error) {
    console.error('❌ Error sending message:', error);
  }
} else {
  console.log('❌ Chrome runtime NOT available');
}

// Test 6: Test statistics loading
console.log('Test 6: Statistics Loading');
if (window.popupManager) {
  try {
    window.popupManager.loadStatistics();
    console.log('✅ Statistics loading successful');
  } catch (error) {
    console.error('❌ Statistics loading failed:', error);
  }
}

// Test 7: Test performance metrics loading
console.log('Test 7: Performance Metrics Loading');
if (window.popupManager) {
  try {
    window.popupManager.loadPerformanceMetrics();
    console.log('✅ Performance metrics loading successful');
  } catch (error) {
    console.error('❌ Performance metrics loading failed:', error);
  }
}

// Test 8: Test tab switching
console.log('Test 8: Tab Switching');
if (window.popupManager) {
  try {
    window.popupManager.switchTab('settings');
    console.log('✅ Tab switching successful');
    window.popupManager.switchTab('dashboard'); // Switch back
  } catch (error) {
    console.error('❌ Tab switching failed:', error);
  }
}

console.log('🧪 Fixed popup test completed!'); 