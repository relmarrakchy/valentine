# 💌 Valentine's Day Gift App

A beautiful, interactive Valentine's Day gift experience built with Next.js. Send personalized messages to your loved ones or friends with elegant animations, romantic quotes, and heartfelt letters.

## ✨ Features

### Two Variants
- **💕 Love Version** (`/`) - Romantic Valentine's Day experience with rose-themed design
- **🤝 Friend Version** (`/mate`) - "Broentine's Day" for friends and brothers with amber-themed design

### Interactive Elements
- **Opening Envelope Animation** - Tap to open a beautifully animated envelope with wax seal
- **Scroll-Triggered Quotes** - Smooth Locomotive Scroll integration with pinned quote animations
- **Handwritten Letter** - Elegant letter on lined paper with margin, personalized with recipient's name
- **Interactive Question** - Playful "Will you be my Valentine?" with growing Yes button and shrinking No button
- **Scroll Protection** - Cute modal prevents scrolling past the letter without opening it first
- **Floating Hearts** - Subtle particle effects throughout the experience

### Personalization
- Add `?name=YourName` to URL to personalize the experience
- Examples:
  - `http://localhost:3000?name=Sarah` - Romantic version
  - `http://localhost:3000/mate?name=Alex` - Friend version

## 🎨 Design Features

- **Typography**: 
  - Playfair Display for elegant serif headings
  - Dancing Script for handwritten letter content
  - Geist Sans/Mono for UI elements

- **Animations**:
  - Framer Motion for smooth transitions and interactions
  - Locomotive Scroll for buttery-smooth scrolling effects
  - Spring physics for natural button interactions

- **Responsive**: Works beautifully on mobile and desktop

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router with Turbopack)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.18
- **Animations**: Framer Motion 12.34.0
- **Smooth Scrolling**: Locomotive Scroll 5.0.1
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Romantic Valentine's page
│   ├── mate/page.tsx         # Friend/brother version
│   ├── layout.tsx            # Root layout with fonts
│   ├── globals.css           # Global styles
│   └── locomotive-scroll.css # Scroll library styles
├── components/
│   ├── LoveEnvelope.tsx      # Initial opening envelope intro
│   ├── LetterEnvelope.tsx    # Handwritten letter component
│   ├── ScrollQuotes.tsx      # Pinned scroll quotes section
│   ├── ValentineButton.tsx   # Interactive Yes/No buttons
│   ├── ScrollModal.tsx       # Letter reminder modal
│   ├── FloatingHearts.tsx    # Particle effect background
│   └── HeartSVG.tsx          # Animated heart icon
```

## 🎯 Usage

1. **Share the link** with your Valentine or friend
2. **Personalize** by adding `?name=TheirName` to the URL
3. **Choose the version**:
   - Main page (`/`) for romantic relationships
   - Mate page (`/mate`) for friendships
4. **Let them experience** the animations and read your message

## 🎨 Customization

### Change Letter Content
Edit the `letterBody` and `closing` text in [LetterEnvelope.tsx](src/components/LetterEnvelope.tsx)

### Change Quotes
Update the `quotes` array in [page.tsx](src/app/page.tsx) or [mate/page.tsx](src/app/mate/page.tsx)

### Adjust Colors
Modify Tailwind theme colors in [globals.css](src/app/globals.css)

## 📝 License

This project is open source and available for personal use.

## 💝 Made with Love

Created as a heartfelt Valentine's Day gift using modern web technologies.
