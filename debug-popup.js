// Debug script for popup issues
// Run this in the popup console (right-click popup -> Inspect -> Console)

console.log('🔍 Popup Debug Script Starting...');

// Test 1: Environment Check
console.log('\n📋 Environment Check:');
console.log('- Window object:', typeof window !== 'undefined');
console.log('- Document object:', typeof document !== 'undefined');
console.log('- Chrome runtime:', typeof chrome !== 'undefined');
console.log('- Chrome runtime API:', typeof chrome?.runtime !== 'undefined');
console.log('- DOM ready state:', document.readyState);

// Test 2: Script Loading Check
console.log('\n📜 Script Loading Check:');
const scripts = document.querySelectorAll('script');
console.log(`Found ${scripts.length} script tags:`);
scripts.forEach((script, index) => {
  console.log(`- Script ${index + 1}:`, script.src || 'inline script');
});

// Test 3: Popup Manager Check
console.log('\n🎯 Popup Manager Check:');
console.log('- PopupManagerPro class:', typeof PopupManagerPro);
console.log('- Window popupManager:', typeof window.popupManager);
if (window.popupManager) {
  console.log('- Popup manager settings:', window.popupManager.settings);
  console.log('- Popup manager analytics:', window.popupManager.analytics);
} else {
  console.log('❌ Popup manager not found on window object');
}

// Test 4: DOM Elements Check
console.log('\n🏷️ DOM Elements Check:');
const requiredElements = [
  'save-settings',
  'export-data',
  'clear-logs',
  'reset-settings',
  'clear-activity-log',
  'export-activity-data'
];

const foundElements = [];
const missingElements = [];

requiredElements.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    foundElements.push(id);
  } else {
    missingElements.push(id);
  }
});

console.log(`✅ Found elements (${foundElements.length}):`, foundElements);
console.log(`❌ Missing elements (${missingElements.length}):`, missingElements);

// Test 5: Tab Navigation Check
console.log('\n📑 Tab Navigation Check:');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

console.log(`Found ${tabs.length} tab buttons:`);
tabs.forEach(tab => {
  console.log(`- ${tab.textContent.trim()} (${tab.dataset.tab})`);
});

console.log(`Found ${tabContents.length} tab contents:`);
tabContents.forEach(content => {
  console.log(`- ${content.id}`);
});

// Test 6: Chrome Runtime Test
console.log('\n🔧 Chrome Runtime Test:');
if (typeof chrome !== 'undefined' && chrome.runtime) {
  try {
    chrome.runtime.sendMessage({ action: 'test' }, (response) => {
      if (chrome.runtime.lastError) {
        console.log('❌ Chrome runtime message failed:', chrome.runtime.lastError);
      } else {
        console.log('✅ Chrome runtime message successful:', response);
      }
    });
  } catch (error) {
    console.error('❌ Chrome runtime error:', error);
  }
} else {
  console.log('❌ Chrome runtime not available');
}

// Test 7: Manual Popup Manager Creation
console.log('\n🔨 Manual Popup Manager Test:');
try {
  if (typeof PopupManagerPro !== 'undefined') {
    console.log('✅ PopupManagerPro class available');
    const testManager = new PopupManagerPro();
    console.log('✅ Manual popup manager creation successful');
    console.log('- Test manager settings:', testManager.settings);
  } else {
    console.log('❌ PopupManagerPro class not available');
  }
} catch (error) {
  console.error('❌ Manual popup manager creation failed:', error);
}

// Test 8: Event Listener Test
console.log('\n🎯 Event Listener Test:');
const testButton = document.getElementById('save-settings');
if (testButton) {
  try {
    testButton.addEventListener('test', () => console.log('✅ Event listener test successful'));
    console.log('✅ Event listeners working');
  } catch (error) {
    console.error('❌ Event listener test failed:', error);
  }
} else {
  console.log('❌ No test button found for event listener test');
}

console.log('\n🏁 Popup debug script completed!');

// Export functions for manual testing
window.debugPopup = {
  testEnvironment: () => {
    console.log('Environment:', {
      window: typeof window,
      document: typeof document,
      chrome: typeof chrome,
      runtime: typeof chrome?.runtime
    });
  },
  
  testElements: () => {
    const elements = ['save-settings', 'export-activity-data'];
    elements.forEach(id => {
      const el = document.getElementById(id);
      console.log(`${id}: ${el ? 'Found' : 'Missing'}`);
    });
  },
  
  testPopupManager: () => {
    console.log('Popup manager:', window.popupManager);
    if (window.popupManager) {
      console.log('Settings:', window.popupManager.settings);
    }
  },
  
  createPopupManager: () => {
    if (typeof PopupManagerPro !== 'undefined') {
      window.testPopupManager = new PopupManagerPro();
      console.log('Test popup manager created:', window.testPopupManager);
    } else {
      console.log('PopupManagerPro class not available');
    }
  }
}; 