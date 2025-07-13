#!/bin/bash

# Gmail Spam Detector Extension Installation Script

echo "🛡️  Gmail Spam Detector Extension Setup"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Please run this script from the extension directory."
    exit 1
fi

echo "✅ Extension files found"

# Create icons directory if it doesn't exist
if [ ! -d "icons" ]; then
    echo "📁 Creating icons directory..."
    mkdir -p icons
fi

# Check for icon files
echo "🎨 Checking icon files..."
if [ ! -f "icons/icon16.png" ] || [ ! -f "icons/icon48.png" ] || [ ! -f "icons/icon128.png" ]; then
    echo "⚠️  Warning: Icon files are missing or are placeholders."
    echo "   You should create proper PNG icon files:"
    echo "   - icons/icon16.png (16x16 pixels)"
    echo "   - icons/icon48.png (48x48 pixels)"
    echo "   - icons/icon128.png (128x128 pixels)"
    echo ""
    echo "   For now, the extension will work without icons."
fi

# Check for required files
echo "📋 Checking required files..."
required_files=("manifest.json" "content-script.js" "background-script.js" "popup.html" "popup.js")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo ""
echo "🎉 Extension setup complete!"
echo ""
echo "📖 Installation Instructions:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode' (toggle in top right)"
echo "3. Click 'Load unpacked'"
echo "4. Select this directory"
echo "5. The extension should now appear in your extensions list"
echo ""
echo "🔧 Usage:"
echo "- Go to Gmail (mail.google.com)"
echo "- Click the extension icon to configure settings"
echo "- The extension will automatically detect spam emails"
echo ""
echo "📚 For more information, see README.md" 