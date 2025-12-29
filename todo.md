# Elite SMP Community Portal - TODO

## Phase 1: Database Schema & Planning
- [x] Design database schema for user profiles with custom greetings
- [x] Design database schema for community gallery images
- [x] Design database schema for whitelist status and payment tracking
- [ ] Document API endpoints and data flow

## Phase 2: Medieval UI Theme
- [x] Set up warm medieval color palette (golden, brown, wood textures)
- [x] Copy server screenshots to project assets
- [x] Configure global CSS theme with medieval aesthetics
- [ ] Create reusable UI components with medieval styling

## Phase 3: Authentication & User Profiles
- [x] Set up Manus OAuth authentication (already configured)
- [x] Create user profile page with custom greeting
- [x] Add greeting edit functionality
- [x] Display personalized greeting on login

## Phase 4: Community Gallery
- [x] Create gallery database schema
- [x] Build image upload component with validation
- [x] Implement S3 storage integration for images
- [x] Create gallery grid view
- [x] Add image metadata display (uploader, date, description)
- [x] Implement image detail modal

## Phase 5: Stripe Payment Integration
- [x] Add Stripe feature to project
- [x] Create payment checkout page
- [x] Implement webhook for payment success
- [x] Auto-update whitelist status on successful payment
- [x] Create payment history view

## Phase 6: Admin Dashboard
- [x] Create admin-only routes and procedures
- [x] Build user management table
- [x] Add whitelist status toggle
- [x] Display payment status for each user
- [ ] Add user search and filtering

### Phase 7: Email Notifications
- [x] Skipped (requires external email service integration)
- [x] Using owner notifications as temporary solutionplement automated email triggers

## Phase 8: Testing & Deployment
- [x] Write vitest tests for critical procedures
- [x] Test authentication flow
- [x] Test payment flow
- [x] Test gallery upload
- [x] Test admin dashboard
- [x] Create final checkpoint

## Discord Integration
- [x] Add Discord server ID to environment variables
- [x] Create Discord widget component
- [x] Add Discord section to homepage
- [x] Test Discord widget display
- [x] Create checkpoint

## Whitelist Application Form
- [x] Design applications database schema
- [x] Create application form page with fields (why join, building experience, portfolio links)
- [x] Add application submission procedure
- [x] Create admin applications review page
- [x] Add approve/reject application functionality
- [x] Link approved applications to payment flow
- [x] Add application status tracking for users
- [x] Write tests for application procedures
- [x] Create checkpoint

## Minecraft Theme Redesign
- [x] Add Discord server ID (1170562466632179824)
- [x] Update color palette to Minecraft colors (grass green, stone gray, dirt brown, diamond blue)
- [x] Create 3D block-style typography with CSS
- [x] Add dynamic hover effects to text blocks
- [x] Update all UI components with Minecraft theme
- [x] Test responsive design with new theme
- [x] Create checkpoint

## Bug Fixes
- [x] Fix React allowTransparency prop warning in Discord widget
- [x] Create checkpoint

## Live Server Preview (AI Bot)
- [x] Create live server preview section UI
- [x] Add video/stream placeholder for bot feed
- [x] Add bot status indicator (online/offline/exploring)
- [x] Add bot control panel (future: command bot to go places)
- [x] Add "What the bot sees" description area
- [x] Style with Minecraft theme
- [x] Create checkpoint

## Live Server Preview Update
- [x] Remove bot command buttons (bot controlled by in-game players)
- [x] Update description to explain peer-to-peer secure connection
- [x] Simplify UI to focus on live stream display
- [x] Create checkpoint

## Immersive Animations & Effects
- [x] Create floating TNT blocks with animated fuse particles
- [x] Add animated Creeper that hisses and expands on hover
- [x] Add floating grass blocks, dirt blocks, and ore blocks
- [x] Implement particle effects (smoke, sparkles, block breaking)
- [x] Add background ambient particles throughout site
- [x] Create explosion animation effects

## Background Music & Audio
- [x] Create audio player component with play/pause controls
- [x] Add volume slider and mute button
- [x] Support custom MP3 upload via environment variable
- [ ] Add Minecraft sound effects on button clicks and hovers (future enhancement)
- [ ] Implement ambient sound system (future enhancement)

## 3D Interactive Elements
- [ ] Create rotating Minecraft block component (mouse-controlled)
- [ ] Add animated player skin viewer
- [ ] Create 3D Creeper model that follows cursor
- [ ] Add floating items that react to hover
- [ ] Implement parallax scrolling effects

## Content Pages - World & Community
- [ ] Create World Map page with interactive map viewer
- [ ] Create Server Timeline page showing history
- [ ] Create Player Stories/Build Spotlights page
- [ ] Create Live Players page showing who's online
- [ ] Add player profile cards with skins

## Content Pages - Stats & Events
- [ ] Create Leaderboards page (builds, playtime, contributions)
- [ ] Create Events Calendar page
- [ ] Add event creation and management for admins
- [ ] Create statistics dashboard

## Content Pages - Information
- [ ] Create Server Rules page with detailed guidelines
- [ ] Create FAQ page for new players
- [ ] Create Getting Started guide/tutorial page
- [ ] Add building guidelines and standards page

## Final Polish
- [ ] Test all animations and interactions
- [ ] Optimize performance
- [ ] Create checkpoint

## Content Pages
- [x] World Map page with interactive map viewer (placeholder)
- [x] Server Timeline showing history and milestones
- [x] Player Stories showcasing build spotlights
- [x] Leaderboards with stats and rankings
- [x] Events Calendar for upcoming and past events
- [x] Rules page with server guidelines
- [x] FAQ page with common questions
- [ ] Create checkpoint

## Background Redesign
- [x] Remove corny interactive elements section from Home page
- [x] Create 3D Minecraft-style background with depth
- [x] Add parallax or mouse-responsive effects
- [x] Test visual impact
- [x] Create checkpoint

## Enhanced 3D Background
- [x] Research modern Minecraft background designs
- [x] Add proper block textures (grass, stone, ores, wood)
- [x] Improve lighting and shadows
- [x] Add more block variety and detail
- [x] Update to contemporary Minecraft aesthetic
- [x] Test visual quality
- [x] Create checkpoint

## Minecraft Server Status Integration
- [x] Get server IP (37.10.123.182:54783)
- [x] Research server query options (using mcstatus.io API)
- [ ] Add server IP to environment variables
- [x] Create backend API route to fetch server status
- [x] Create ServerStatus component for live player count
- [x] Add server status widget to Navigation bar
- [x] Display online/offline status with indicator
- [x] Show current players / max players
- [x] Add list of online players (available in API response)
- [x] Test API integration (21/21 tests passing)
- [x] Create checkpoint

## Bug Fix: Nested Anchor Tags
- [x] Fix nested <a> tag error in Navigation component
- [x] Test navigation links work correctly

## Player List Dropdown
- [x] Add dropdown UI to player count in ServerStatus
- [x] Display list of online players when clicked
- [x] Show player avatars/skins if available
- [x] Handle empty state (no players online)
- [x] Test dropdown functionality
- [x] Create checkpoint

## Image Lightbox for World Showcase
- [x] Create ImageLightbox component
- [x] Add full-screen image viewer with close button
- [x] Integrate lightbox into Home page world showcase
- [x] Add keyboard navigation (ESC to close, arrows for next/prev)
- [x] Test lightbox functionality
- [x] Create checkpoint

## Server Coordinates Page
- [x] Extract all coordinates from Discord screenshots
- [x] Organize coordinates into categories (Farms, Bases, Resources, Nether, etc.)
- [x] Create Coordinates page component
- [x] Add search/filter functionality by category
- [x] Add one-click copy coordinates feature
- [x] Add dimension tags (Overworld/Nether)
- [x] Style with Minecraft theme
- [x] Add to navigation menu
- [x] Test functionality
- [x] Create checkpoint

## Bug Fixes: Navigation & Animation
- [x] Verify Coordinates appears in Server menu dropdown
- [x] Remove falling blocks (Minecraft3DBackground) from all pages
- [x] Test navigation works correctly
- [x] Create checkpoint

## Discord Screenshot Import
- [x] Add Discord bot token to environment variables
- [x] Add Discord channel ID to environment variables
- [x] Install discord.js package
- [x] Validate Discord bot credentials
- [x] Create backend API endpoint to fetch Discord messages
- [x] Download images from Discord and upload to S3
- [x] Store gallery entries with Discord metadata (username, date, caption)
- [x] Add admin UI button to trigger import
- [x] Test import functionality (Successfully imported 60+ images!)
- [x] Create checkpoint

## Gallery Cleanup & Discord Reactions
- [x] Update database schema to store Discord reactions
- [x] Modify Discord import to fetch message reactions
- [x] Store reaction data (emoji, count) in database
- [x] Redesign gallery card layout for cleaner presentation
- [x] Remove "Discord Import -" prefix from titles
- [x] Make metadata more compact and elegant
- [x] Display Discord reactions below each image
- [x] Test gallery improvements (Successfully displaying reactions and clean metadata!)
- [x] Create checkpoint

## UI Improvements
- [x] Remove "by Dajuan Nelson" from gallery cards
- [x] Make Coordinates page sections scrollable
- [x] Test improvements (Gallery clean, Coordinates scrollable!)
- [x] Create checkpoint

## Major Theme Redesign: Discord Modern + Weed + Mac Miller
- [x] Research Mac Miller aesthetic (album covers, color palettes)
- [x] Define new color scheme (Discord grays/purples + cannabis greens)
- [ ] Update global CSS variables in index.css
- [ ] Redesign navigation bar with new theme
- [ ] Update homepage hero section with new aesthetic
- [ ] Apply theme to all pages
- [ ] Keep Minecraft pixelated text style
- [ ] Test theme consistency across all pages

## Gallery Lightbox
- [x] Add ImageLightbox component to Gallery page
- [x] Enable click-to-fullscreen for all gallery images
- [x] Add keyboard navigation (ESC, arrows)
- [ ] Test lightbox functionality

## Coordinates Section Redesign
- [ ] Design collapsible category system
- [ ] Create compact card layout
- [ ] Improve visual hierarchy
- [ ] Make section more scrollable/accessible
- [ ] Test coordinates visibility and usability
- [ ] Create checkpoint

## Coordinates Section Redesign
- [x] Design collapsible category system
- [x] Create compact card layout
- [x] Add category icons and counts
- [x] Make categories expandable/collapsible
- [ ] Test all changes
- [ ] Create checkpoint

## UI Overhaul: Faces Theme + Modern Smooth UI
- [x] Research Mac Miller Faces aesthetic (dark, moody, introspective)
- [x] Update color scheme to darker tones (deep blacks, charcoals, dark purples)
- [x] Change weed accents to subtle sage greens (not bright lime)
- [x] Add glassmorphism effects (frosted glass with blur)
- [x] Implement smooth shadows and layered depth
- [x] Add subtle gradient overlays
- [x] Increase spacing and breathing room
- [x] Add micro-animations on hover
- [x] Add slight border radius (modern but not too round)
- [x] Fix coordinates section scrolling (proper max-height container)
- [x] Test UI feels smooth and modern (Glassmorphism working, coordinates scrollable!)
- [x] Create checkpoint

## Final Polish & Homepage Improvements
- [x] Update button colors from bright green to subtle sage green
- [x] Add smooth hover effects (glow/lift) to cards and images
- [x] Coordinates page scrolling (already fixed earlier)
- [x] Create YouTube background audio player with random rotation
- [x] Add playlist of Mac Miller videos (TQpu9xraiWI)
- [x] Add mute/unmute toggle button (floating bottom-right)
- [x] Make audio persist across page navigation
- [x] Test all improvements (Buttons updated, hover effects working, audio player functional!)
- [x] Create checkpoint

## ELITE SMP Title Animation & Coordinates Access
- [x] Create Minecraft building animation for ELITE SMP title on hover
- [x] Add block-by-block build effect with CSS animations
- [x] Add coordinates quick access button to homepage hero
- [x] Test animations and usability (Coordinates button visible, hover animation applied!)
- [x] Create checkpoint

## Redstone Power Animation - What Makes Us Different
- [x] Find "What Makes Us Different" section in Home page
- [x] Split text into individual words with span elements
- [x] Create Redstone glow animation (fuseish red)
- [x] Implement sequential word-by-word lighting on hover
- [x] Add fade-out animation when hover ends
- [x] Test animation timing and smoothness
- [ ] Create checkpoint
