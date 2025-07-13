// Test script for background script functionality
// Run this in the background script console (chrome://extensions/ -> your extension -> background page)

console.log('🧪 Testing Background Script Functionality...');

// Test 1: Check if background worker is initialized
function testBackgroundWorker() {
  console.log('📋 Background Worker Test:');
  
  if (typeof BackgroundServiceWorker !== 'undefined') {
    console.log('✅ BackgroundServiceWorker class available');
  } else {
    console.log('❌ BackgroundServiceWorker class not available');
  }
  
  if (typeof backgroundWorker !== 'undefined') {
    console.log('✅ Background worker instance available');
    console.log('- Analytics:', backgroundWorker.analytics);
    console.log('- Cache size:', backgroundWorker.cache.size);
    console.log('- Active tabs:', backgroundWorker.activeTabs.size);
  } else {
    console.log('❌ Background worker instance not available');
  }
}

// Test 2: Check Chrome APIs
function testChromeAPIs() {
  console.log('\n🔧 Chrome APIs Test:');
  
  const apis = [
    'runtime',
    'storage',
    'tabs',
    'scripting',
    'notifications'
  ];
  
  apis.forEach(api => {
    const available = typeof chrome !== 'undefined' && chrome[api];
    console.log(`${api}: ${available ? '✅ Available' : '❌ Not available'}`);
  });
}

// Test 3: Test message handling
function testMessageHandling() {
  console.log('\n📨 Message Handling Test:');
  
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    try {
      chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
        if (chrome.runtime.lastError) {
          console.log('❌ Message test failed:', chrome.runtime.lastError);
        } else {
          console.log('✅ Message test successful:', response);
        }
      });
    } catch (error) {
      console.error('❌ Message test error:', error);
    }
  } else {
    console.log('❌ Chrome runtime not available for message test');
  }
}

// Test 4: Test storage
function testStorage() {
  console.log('\n💾 Storage Test:');
  
  if (typeof chrome !== 'undefined' && chrome.storage) {
    try {
      chrome.storage.sync.get(['spamDetectorSettings'], (result) => {
        console.log('✅ Storage test successful:', result);
      });
    } catch (error) {
      console.error('❌ Storage test error:', error);
    }
  } else {
    console.log('❌ Chrome storage not available');
  }
}

// Test 5: Check service worker context
function testServiceWorkerContext() {
  console.log('\n🔧 Service Worker Context Test:');
  
  console.log('- Self object:', typeof self !== 'undefined');
  console.log('- Window object:', typeof window !== 'undefined');
  console.log('- GlobalThis object:', typeof globalThis !== 'undefined');
  console.log('- Service worker context:', typeof ServiceWorkerGlobalScope !== 'undefined');
  
  if (typeof self !== 'undefined') {
    console.log('- Service worker state:', self.state);
  }
}

// Test 6: Performance check
function testPerformance() {
  console.log('\n⚡ Performance Test:');
  
  if (typeof performance !== 'undefined') {
    console.log('- Performance object available');
    if (performance.memory) {
      console.log('- Memory usage:', {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      });
    } else {
      console.log('- Memory API not available');
    }
  } else {
    console.log('❌ Performance object not available');
  }
}

// Run all tests
function runAllTests() {
  console.log('🚀 Starting background script tests...');
  
  testServiceWorkerContext();
  testChromeAPIs();
  testBackgroundWorker();
  testMessageHandling();
  testStorage();
  testPerformance();
  
  console.log('🏁 Background script tests completed');
}

// Auto-run tests
if (typeof self !== 'undefined') {
  // We're in a service worker context
  setTimeout(runAllTests, 1000); // Wait a bit for initialization
} else {
  console.log('❌ Not in service worker context');
}

// Export for manual testing
if (typeof self !== 'undefined') {
  self.testBackground = runAllTests;
} 