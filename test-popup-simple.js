// Simple test script for popup functionality
// Run this in the popup console (right-click popup -> Inspect -> Console)

console.log('🧪 Simple Popup Test...');

// Test 1: Basic DOM check
console.log('Test 1: Basic DOM Elements');
const basicElements = ['dashboard', 'settings', 'analytics', 'logs'];
let foundElements = 0;

basicElements.forEach(id => {
  const element = document.getElementById(id);
  if (element) {
    console.log(`✅ ${id} found`);
    foundElements++;
  } else {
    console.log(`❌ ${id} NOT found`);
  }
});

console.log(`Found ${foundElements}/${basicElements.length} basic elements`);

// Test 2: Chrome runtime check
console.log('Test 2: Chrome Runtime');
if (typeof chrome !== 'undefined' && chrome.runtime) {
  console.log('✅ Chrome runtime available');
} else {
  console.log('❌ Chrome runtime NOT available');
}

// Test 3: Popup manager check
console.log('Test 3: Popup Manager');
if (window.popupManager) {
  console.log('✅ Popup manager found');
  console.log('Current tab:', window.popupManager.currentTab);
} else {
  console.log('❌ Popup manager NOT found');
}

// Test 4: Tab switching test
console.log('Test 4: Tab Switching');
const tabs = document.querySelectorAll('.tab');
console.log(`Found ${tabs.length} tabs`);

if (tabs.length > 0) {
  try {
    // Try to switch to settings tab
    const settingsTab = document.querySelector('[data-tab="settings"]');
    if (settingsTab) {
      settingsTab.click();
      console.log('✅ Tab switching works');
    } else {
      console.log('❌ Settings tab not found');
    }
  } catch (error) {
    console.error('❌ Tab switching failed:', error);
  }
}

// Test 5: Simple message test
console.log('Test 5: Message Test');
if (typeof chrome !== 'undefined' && chrome.runtime) {
  try {
    chrome.runtime.sendMessage({ action: 'test' }, (response) => {
      if (chrome.runtime.lastError) {
        console.log('⚠️ Message test failed (expected):', chrome.runtime.lastError.message);
      } else {
        console.log('✅ Message test successful:', response);
      }
    });
  } catch (error) {
    console.error('❌ Message test error:', error);
  }
}

// Test 6: Settings UI test
console.log('Test 6: Settings UI');
const sensitivitySlider = document.getElementById('sensitivity');
const sensitivityValue = document.getElementById('sensitivity-value');

if (sensitivitySlider && sensitivityValue) {
  console.log('✅ Sensitivity controls found');
  console.log('Current value:', sensitivityValue.textContent);
} else {
  console.log('❌ Sensitivity controls not found');
}

// Test 7: Toggle switches test
console.log('Test 7: Toggle Switches');
const toggles = document.querySelectorAll('.toggle-switch');
console.log(`Found ${toggles.length} toggle switches`);

if (toggles.length > 0) {
  console.log('✅ Toggle switches found');
} else {
  console.log('❌ No toggle switches found');
}

console.log('🧪 Simple popup test completed!'); 