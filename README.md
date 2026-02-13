# YoekiJets - Private Aviation Website

A luxury private aviation website built with Next.js 14, TypeScript, Tailwind CSS, and GSAP animations. This project replicates the sophisticated design and smooth animations of premium aviation websites.

## 🚀 Features

- **Preloader Animation**: Animated splash screen with brand introduction
- **Hero Section**: Airplane window zoom effect with cloud animations
- **About Section**: Scroll-triggered character-by-character text reveal
- **Fleet Section**: Animated airplane taking off and landing with scroll control
- **Advantages Section**: Interactive accordion with image switching
- **Global Section**: Interactive rotating globe with cursor-controlled movement
- **Booking System**: Full-featured flight booking form with validation and API integration
- **Smooth Animations**: GSAP-powered scroll-triggered animations throughout
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

## 📋 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Development**: ESLint, PostCSS, Autoprefixer

## 🛠️ Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd yoekijets
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
yoekijets/
├── app/
│   ├── api/
│   │   └── bookings/
│   │       └── route.ts          # Mock API endpoint
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── components/
│   ├── PreLoader.tsx             # Initial loading animation
│   ├── Navigation.tsx            # Top navigation bar
│   ├── hero/
│   │   └── HeroSection.tsx       # Hero with window zoom
│   ├── about/
│   │   └── AboutSection.tsx      # About with text reveal
│   ├── fleet/
│   │   └── FleetSection.tsx      # Fleet with plane animation
│   ├── advantages/
│   │   └── AdvantagesSection.tsx # Accordion section
│   ├── global/
│   │   └── GlobalSection.tsx     # Globe section
│   └── booking/
│       ├── BookingButton.tsx     # Floating CTA button
│       └── BookingModal.tsx      # Booking form modal
├── hooks/
│   └── useBookingForm.ts         # Booking form logic
├── public/
│   └── images/                   # Image assets (placeholder)
└── [config files]
```

## 🎨 Customization

### Replace Placeholder Assets

The project uses SVG placeholders for images. Replace them with your actual assets:

1. **Hero Background**: Add cloud images to `/public/images/clouds/`
2. **Airplane Images**: Add aircraft photos to `/public/images/fleet/`
3. **Advantage Images**: Add feature images to `/public/images/advantages/`
4. **Globe**: Replace the SVG globe with a 3D model or high-quality image

### Update Contact Information

Update the contact details in:
- `components/Navigation.tsx`
- `components/global/GlobalSection.tsx`

### Modify Colors

Update the color scheme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#1a1a1a',  // Your primary color
      secondary: '#f5f5f5', // Your secondary color
    },
  },
}
```

## 🔧 API Integration

### Current Setup (Mock API)

The booking form currently uses a mock API at `/api/bookings/route.ts` that simulates successful submissions.

### Production Setup

To integrate with a real backend:

1. **Update the API endpoint** in `hooks/useBookingForm.ts`:
   ```typescript
   const response = await axios.post('https://your-api.com/bookings', data)
   ```

2. **Add authentication** if required:
   ```typescript
   const response = await axios.post('/api/bookings', data, {
     headers: {
       'Authorization': `Bearer ${token}`,
     },
   })
   ```

3. **Handle different response structures** based on your backend.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

### Other Platforms

Build the production version:
```bash
npm run build
npm start
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance Optimization

- **Image Optimization**: Use Next.js Image component for better performance
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Sections load as user scrolls
- **Animation Performance**: GSAP uses GPU acceleration

## 🎯 Animation Details

### Hero Section
- Zoom into airplane window (controlled by scroll)
- Cloud background movement
- Logo transforms to navbar

### About Section
- Character-by-character text reveal
- Staggered card animations
- Opacity transitions

### Fleet Section
- Airplane takeoff animation
- Landing sequence
- Transform to schematic view

### Advantages Section
- Smooth accordion transitions
- Image fade in/out
- Hover effects

### Global Section
- Infinite globe rotation
- Cursor-controlled tilt
- Vertical location scroll
- Card slide-up animation

## 🐛 Troubleshooting

### GSAP Plugin Issues
If you encounter GSAP plugin errors:
```bash
npm install gsap@latest
```

### Build Errors
Clear the cache and rebuild:
```bash
rm -rf .next
npm run build
```

### TypeScript Errors
Regenerate types:
```bash
npm run dev
```

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

This is a portfolio/assignment project. Feel free to fork and customize for your own use.

## 📞 Support

For questions or issues with the codebase, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Built with ❤️ using Next.js, TypeScript, and GSAP**