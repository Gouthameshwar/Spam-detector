// Test script for settings functionality
// Run this in the Gmail console (F12 -> Console)

console.log('🧪 Testing Settings Functionality...');

// Test 1: Check if extension is loaded
console.log('Test 1: Extension Loading');
if (window.gmailSpamDetector) {
  console.log('✅ Extension loaded');
  console.log('Current settings:', window.gmailSpamDetector.settings);
} else {
  console.log('❌ Extension not loaded');
}

// Test 2: Check if settings button exists
console.log('Test 2: Settings Button');
const settingsBtn = document.getElementById('spam-settings-btn');
if (settingsBtn) {
  console.log('✅ Settings button found');
  console.log('Button text:', settingsBtn.textContent);
} else {
  console.log('❌ Settings button not found');
}

// Test 3: Test settings modal
console.log('Test 3: Settings Modal');
if (window.gmailSpamDetector) {
  try {
    window.gmailSpamDetector.showSettings();
    console.log('✅ Settings modal opened');
    
    // Check if modal elements exist
    const modal = document.getElementById('spam-detector-modal');
    const autoDeleteCheckbox = document.getElementById('auto-delete');
    const sensitivitySlider = document.getElementById('sensitivity');
    const saveBtn = document.getElementById('save-settings-btn');
    
    if (modal) console.log('✅ Modal container found');
    if (autoDeleteCheckbox) console.log('✅ Auto-delete checkbox found');
    if (sensitivitySlider) console.log('✅ Sensitivity slider found');
    if (saveBtn) console.log('✅ Save button found');
    
    // Test sensitivity slider
    if (sensitivitySlider) {
      const oldValue = sensitivitySlider.value;
      sensitivitySlider.value = '5';
      sensitivitySlider.dispatchEvent(new Event('input'));
      console.log('✅ Sensitivity slider working');
      sensitivitySlider.value = oldValue; // Reset
    }
    
    // Close modal after testing
    setTimeout(() => {
      if (modal) modal.remove();
      console.log('✅ Modal closed');
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error testing settings modal:', error);
  }
}

// Test 4: Test settings saving
console.log('Test 4: Settings Saving');
if (window.gmailSpamDetector) {
  try {
    // Test saving settings
    const oldSettings = { ...window.gmailSpamDetector.settings };
    
    // Temporarily change a setting
    window.gmailSpamDetector.settings.autoDelete = !window.gmailSpamDetector.settings.autoDelete;
    
    // Save settings
    await window.gmailSpamDetector.saveSettings();
    console.log('✅ Settings saved successfully');
    
    // Restore original setting
    window.gmailSpamDetector.settings.autoDelete = oldSettings.autoDelete;
    await window.gmailSpamDetector.saveSettings();
    
  } catch (error) {
    console.error('❌ Error testing settings saving:', error);
  }
}

// Test 5: Test chrome storage
console.log('Test 5: Chrome Storage');
if (typeof chrome !== 'undefined' && chrome.storage) {
  try {
    const result = await chrome.storage.sync.get(['spamDetectorSettings']);
    if (result.spamDetectorSettings) {
      console.log('✅ Settings found in storage:', result.spamDetectorSettings);
    } else {
      console.log('⚠️ No settings found in storage');
    }
  } catch (error) {
    console.error('❌ Error accessing chrome storage:', error);
  }
} else {
  console.log('❌ Chrome storage not available');
}

// Test 6: Manual settings test
console.log('Test 6: Manual Settings Test');
console.log('To test manually:');
console.log('1. Click the blue "Spam Settings" button in the bottom right');
console.log('2. Change some settings in the modal');
console.log('3. Click "Save Settings"');
console.log('4. Check if you see a success notification');

console.log('🧪 Settings test completed!'); 