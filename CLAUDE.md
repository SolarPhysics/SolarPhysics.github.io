# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the Solar Physics Journal Club website for Kyung Hee University's School of Space Research. It's a static GitHub Pages site using vanilla HTML, CSS, and JavaScript with no build process.

## Development Commands

**Local Development:**
- Open `index.html` directly in a browser for testing
- Use any local HTTP server for development: `python -m http.server 8000` or `npx http-server`

**Deployment:**
- Direct push to main branch automatically deploys to GitHub Pages
- URL: https://solarphysics.github.io/

## Architecture & Key Components

### Core Structure
- **index.html** - Main landing page with sections for Intro, Schedule, and Members
- **participants.html** - Detailed member directory with hierarchical organization
- **meetings.js** - Central data store containing 68+ meeting records with presentation metadata
- **style.css** - Comprehensive styling with responsive design and animations

### Meeting Data Structure
The `meetings.js` file contains an array of meeting objects grouped by semester (2023-1st through 2025-1st). Each meeting has:
```javascript
{
  date: 'YYYY-MM-DD',
  presenter: 'Name',
  article: { title: 'Title', url: 'URL' },  // Single article
  // OR
  articles: [{ title: 'Title', url: 'URL' }],  // Multiple articles
  video: 'Zoom recording URL',
  ppt: 'Presentation URL' (optional)
}
```

### JavaScript Functionality
- Dynamic meeting display (upcoming/past)
- Automatic title case conversion preserving scientific acronyms (MHD, CME, EUV, etc.)
- Mobile navigation toggle
- Quarter-based meeting organization

### Performance Consideration
The 16MB `movingSun.gif` significantly impacts load time. Consider optimizing or replacing with a smaller alternative when modifying the header.

## Development Guidelines

### Adding New Meetings
Edit `meetings.js` and add new meeting objects to the appropriate semester array. The display automatically updates based on the current date.

### Modifying Participant Information
Edit `participants.html` directly. The structure follows a hierarchical organization (PhD → PhD Students → Master Students).

### Styling Changes
All styles are in `style.css`. The site uses:
- CSS Grid and Flexbox for layouts
- CSS custom properties for consistent theming
- Mobile-first responsive design with breakpoints at 768px

### Important Files to Preserve
- `.nojekyll` - Required for GitHub Pages to serve files correctly
- Logo/image assets - Used throughout the site for branding

## Common Tasks

### Update Meeting Schedule
1. Open `meetings.js`
2. Find the appropriate semester array
3. Add new meeting object following the existing format
4. Commit and push to deploy

### Add New Participant
1. Open `participants.html`
2. Locate the appropriate section (PhD/Master/etc.)
3. Add new table row following existing HTML structure
4. Update profile image if available (place in root directory)

### Optimize Performance
- Consider converting `movingSun.gif` to video format or smaller animated WebP
- Optimize PNG/JPEG assets using image compression tools
- Implement lazy loading for images if adding more content