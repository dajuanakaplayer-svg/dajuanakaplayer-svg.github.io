# Mac Miller "Faces" Theme Design System

## Aesthetic Reference
**Faces Mixtape (2014)** - Dark, introspective, moody, raw emotion
- Deep blacks and charcoals (night/shadow vibes)
- Dark purples and blues (melancholy, introspection)
- Muted sage/forest greens (subtle weed theme, not bright)
- Warm amber/orange accents (street lights, late night glow)
- Grainy textures, analog feel

## Color Palette

### Base Colors
- **Background**: `#0A0A0B` (near-black, slightly warm)
- **Surface**: `#151517` (dark charcoal cards)
- **Surface Elevated**: `#1C1C1F` (hover/focus states)

### Accent Colors
- **Primary (Sage Green)**: `#6B7F6A` - Muted, earthy weed tone
- **Secondary (Dark Purple)**: `#3D2F4A` - Faces cover purple
- **Tertiary (Amber)**: `#D4A574` - Warm street light glow
- **Destructive**: Keep existing red

### Text Colors
- **Foreground**: `#E8E6E3` - Warm off-white
- **Muted**: `#8B8985` - Medium gray
- **Subtle**: `#5A5856` - Dark gray

## Modern UI Principles

### Glassmorphism
```css
background: rgba(28, 28, 31, 0.7);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Shadows (Layered Depth)
```css
/* Subtle elevation */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

/* Medium elevation */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);

/* High elevation */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
```

### Border Radius
- Small elements: `6px`
- Cards: `12px`
- Buttons: `8px`
- Inputs: `8px`

### Spacing Scale
- Tight: `0.5rem` (8px)
- Normal: `1rem` (16px)
- Comfortable: `1.5rem` (24px)
- Spacious: `2rem` (32px)
- Extra: `3rem` (48px)

## Animations
- **Duration**: 200-300ms (snappy but smooth)
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)
- **Hover scale**: `scale(1.02)` (subtle lift)
- **Transitions**: `all 0.2s ease`

## Typography
- **Headers**: Keep Minecraft "Press Start 2P" pixelated font
- **Body**: Use clean sans-serif (Inter, system fonts)
- **Code/Coords**: Monospace

## Gradient Overlays
```css
/* Subtle depth gradient */
background: linear-gradient(135deg, #0A0A0B 0%, #151517 100%);

/* Purple mood gradient */
background: linear-gradient(135deg, #3D2F4A 0%, #1C1C1F 100%);

/* Sage green accent */
background: linear-gradient(135deg, #6B7F6A 0%, #4A5A49 100%);
```

## Key Differences from Previous Theme
- **Darker**: Near-black instead of Discord gray
- **Moodier**: Purple undertones, not bright blues
- **Warmer**: Amber glows, not cold whites
- **Subtle**: Muted sage greens, not lime
- **Depth**: Glassmorphism and layered shadows
- **Smooth**: Rounded corners, breathing room, micro-animations
