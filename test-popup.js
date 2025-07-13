// Test script for popup functionality
console.log('🧪 Testing popup functionality...');

// Test 1: Check if popup elements exist
function testPopupElements() {
  console.log('📋 Testing popup elements...');
  
  const elements = [
    'save-settings',
    'sensitivity',
    'sensitivity-value',
    'export-data',
    'clear-logs',
    'reset-settings',
    'clear-activity-log',
    'export-activity-data'
  ];
  
  const missingElements = [];
  
  elements.forEach(id => {
    const element = document.getElementById(id);
    if (!element) {
      missingElements.push(id);
    }
  });
  
  if (missingElements.length > 0) {
    console.error('❌ Missing elements:', missingElements);
  } else {
    console.log('✅ All popup elements found');
  }
}

// Test 2: Check Chrome runtime
function testChromeRuntime() {
  console.log('🔧 Testing Chrome runtime...');
  
  if (typeof chrome === 'undefined') {
    console.error('❌ Chrome runtime not available');
    return false;
  }
  
  if (!chrome.runtime) {
    console.error('❌ Chrome runtime API not available');
    return false;
  }
  
  console.log('✅ Chrome runtime available');
  return true;
}

// Test 3: Check event listeners
function testEventListeners() {
  console.log('🎯 Testing event listeners...');
  
  const testElement = document.getElementById('save-settings');
  if (testElement) {
    console.log('✅ Save settings button found');
    
    // Test if we can add an event listener
    try {
      testElement.addEventListener('test', () => {});
      console.log('✅ Event listeners working');
    } catch (error) {
      console.error('❌ Event listener error:', error);
    }
  } else {
    console.error('❌ Save settings button not found');
  }
}

// Test 4: Check DOM ready state
function testDOMReady() {
  console.log('📄 Testing DOM ready state...');
  
  if (document.readyState === 'loading') {
    console.log('⏳ DOM still loading...');
  } else {
    console.log('✅ DOM ready');
  }
}

// Run all tests
function runAllTests() {
  console.log('🚀 Starting popup tests...');
  
  testDOMReady();
  testChromeRuntime();
  testPopupElements();
  testEventListeners();
  
  console.log('🏁 Popup tests completed');
}

// Auto-run tests when script loads
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
  } else {
    runAllTests();
  }
}

// Export for manual testing
if (typeof window !== 'undefined') {
  window.testPopup = runAllTests;
} 