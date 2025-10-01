# Favicon Setup Guide

## Step 1: Download Your Logo
1. Go to your Imgur link: https://imgur.com/cNbgF4I
2. Right-click on the image and save it to your computer
3. Save it as a high-resolution PNG file (preferably 512x512px or larger)

## Step 2: Generate Favicon Files
Use one of these online favicon generators:
- **Recommended**: https://realfavicongenerator.net/
- Alternative: https://favicon.io/
- Alternative: https://www.favicon-generator.org/

### Upload your logo and generate these files:
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png`
- `favicon-32x32.png` 
- `favicon-48x48.png`
- `favicon.svg` (if your logo works well as SVG)
- `apple-touch-icon.png` (180x180)
- `apple-touch-icon-152x152.png`
- `apple-touch-icon-120x120.png`
- `apple-touch-icon-76x76.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `mstile-150x150.png`

## Step 3: Upload Files
Place all generated favicon files in the `public/` folder of your project.

## Step 4: Verify Implementation
The HTML head section is already configured with the proper favicon links. Once you upload the files, they should work automatically.

## Step 5: Test
After uploading the files and redeploying:
1. Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
2. Check favicon appears in browser tab
3. Test on mobile devices
4. Verify home screen shortcuts work

## Troubleshooting
If favicon still doesn't show:
1. Make sure file names match exactly (case-sensitive)
2. Clear browser cache completely
3. Try hard refresh (Ctrl+F5)
4. Check browser developer tools for 404 errors on favicon files
5. Wait for DNS propagation (up to 24 hours for some changes)

## Quick Test
You can test if your favicon files are accessible by visiting:
- https://purpleguardadvisory.co.uk/favicon.ico
- https://purpleguardadvisory.co.uk/favicon-32x32.png

If these return 404 errors, the files aren't uploaded correctly.