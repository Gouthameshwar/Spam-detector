#!/bin/bash

# Prepare Gmail Spam Detector Extension for Chrome Web Store Publishing

echo "🚀 Preparing Gmail Spam Detector Extension for Publishing"
echo "========================================================"

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Please run this script from the extension directory."
    exit 1
fi

# Create a clean directory for publishing
echo "📁 Creating clean build directory..."
rm -rf publish/
mkdir -p publish

# Copy essential files
echo "📋 Copying essential files..."
cp manifest.json publish/
cp content-script.js publish/
cp background-script.js publish/
cp popup.html publish/
cp popup.js publish/
cp package.json publish/
cp README.md publish/

# Copy icons if they exist
if [ -d "icons" ]; then
    echo "🎨 Copying icons..."
    cp -r icons publish/
else
    echo "⚠️  Warning: icons directory not found. You'll need to create icons before publishing."
    mkdir -p publish/icons
fi

# Create a simple icon placeholder if none exist
if [ ! -f "publish/icons/icon16.png" ] || [ ! -f "publish/icons/icon48.png" ] || [ ! -f "publish/icons/icon128.png" ]; then
    echo "⚠️  Creating placeholder icons..."
    echo "# Placeholder for icon16.png" > publish/icons/icon16.png
    echo "# Placeholder for icon48.png" > publish/icons/icon48.png
    echo "# Placeholder for icon128.png" > publish/icons/icon128.png
    echo "   You MUST replace these with actual PNG icons before publishing!"
fi

# Create ZIP file
echo "📦 Creating ZIP file..."
cd publish
zip -r ../gmail-spam-detector-v1.0.0.zip . -x "*.DS_Store" "*.git*"
cd ..

# Check ZIP file
if [ -f "gmail-spam-detector-v1.0.0.zip" ]; then
    echo "✅ ZIP file created successfully!"
    echo "📊 File size: $(du -h gmail-spam-detector-v1.0.0.zip | cut -f1)"
else
    echo "❌ Error creating ZIP file"
    exit 1
fi

# Validate manifest
echo "🔍 Validating manifest.json..."
if python3 -m json.tool publish/manifest.json > /dev/null 2>&1; then
    echo "✅ manifest.json is valid JSON"
else
    echo "❌ Error: manifest.json is not valid JSON"
    exit 1
fi

# Check required files
echo "📋 Checking required files..."
required_files=("manifest.json" "content-script.js" "background-script.js" "popup.html" "popup.js")

for file in "${required_files[@]}"; do
    if [ -f "publish/$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "🎉 Extension prepared for publishing!"
echo ""
echo "📋 Next Steps:"
echo "1. Create proper icons (16x16, 48x48, 128x128 PNG files)"
echo "2. Replace placeholder icons in publish/icons/"
echo "3. Test the extension locally (load unpacked from publish/ folder)"
echo "4. Take screenshots of the extension in action"
echo "5. Upload gmail-spam-detector-v1.0.0.zip to Chrome Web Store"
echo ""
echo "📁 Files ready for publishing:"
echo "   - gmail-spam-detector-v1.0.0.zip (main package)"
echo "   - publish/ (clean directory for testing)"
echo "   - privacy-policy.html (for store listing)"
echo ""
echo "🔗 Chrome Web Store Developer Dashboard:"
echo "   https://chrome.google.com/webstore/devconsole"
echo ""
echo "📝 Store Listing Requirements:"
echo "   - Extension name: 'Gmail Spam & Sponsored Email Detector'"
echo "   - Category: Productivity or Utilities"
echo "   - Privacy policy URL (host privacy-policy.html somewhere)"
echo "   - Screenshots (3-5 images showing features)"
echo "   - Detailed description (see publish-checklist.md)" 