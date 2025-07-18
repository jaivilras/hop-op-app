# HopOn - Community Rideshare Platform

A modern, full-featured rideshare application built with React, TypeScript, and Tailwind CSS. HopOn connects community members for shared transportation, offering both ride-sharing and ride-requesting capabilities.



## ✨ Features

### 🔐 Authentication System
- **Secure Login/Signup** with form validation
- **Persistent sessions** using localStorage
- **Protected routes** requiring authentication
- **User profile management** with logout functionality

### 🚗 Trip Management
- **Dual-mode posting**: Offer rides OR request rides
- **Real-time trip storage** with persistent data
- **Smart search & filtering** by location, date, and trip type
- **Seat management** with booking functionality
- **Trip history** and user management

### 📍 Location Features
- **Smart autocomplete** for 40+ European cities
- **Keyboard navigation** support (arrow keys, enter, escape)
- **Real-time search filtering**
- **Location validation** and suggestions

### 🎨 Modern UI/UX
- **Responsive design** for all device sizes
- **Dark/Light theme** support
- **Smooth animations** and transitions
- **Accessible components** following WCAG guidelines

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hopon-rideshare.git
   cd hopon-rideshare
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 📱 Usage

### For Drivers (Offering Rides)
1. **Sign up/Login** to your account
2. **Navigate to "Post a Trip"**
3. **Select "Offering a ride"**
4. **Fill in trip details**:
   - Origin and destination (with autocomplete)
   - Date and time
   - Available seats (1-4)
   - Price per person (€0-50)
   - Car information (optional)
   - Additional notes
5. **Post your ride offer**

### For Passengers (Looking for Rides)
1. **Sign up/Login** to your account
2. **Visit "Find Rides"** or search from homepage
3. **Use search filters**:
   - Starting location
   - Destination
   - Travel date
4. **Browse available rides**
5. **Book a seat** in rides that match your needs

### For Ride Requests
1. **Navigate to "Post a Trip"**
2. **Select "Looking for a ride"**
3. **Fill in your travel details**
4. **Post your ride request**
5. **Wait for drivers to contact you**

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Form management

### State Management
- **React Context** - Authentication and trip management
- **localStorage** - Data persistence

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Radix UI)
│   ├── AuthModal.tsx   # Login/Signup modal
│   ├── Header.tsx      # Navigation header
│   ├── LocationInput.tsx # Smart location autocomplete
│   └── PostTripForm.tsx # Trip posting form
├── contexts/           # React context providers
│   ├── AuthContext.tsx # Authentication state
│   └── TripContext.tsx # Trip management state
├── pages/              # Route components
│   ├── Index.tsx       # Homepage
│   ├── FindRides.tsx   # Trip search and browse
│   └── PostTrip.tsx    # Trip posting page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Supported Locations

The app includes autocomplete for major cities across Europe:
- **Spain**: Madrid, Barcelona, Valencia, Sevilla, and more
- **France**: Paris, Lyon, Marseille, Nice, and more
- **Germany**: Berlin, Munich, Hamburg, Frankfurt
- **Italy**: Rome, Milan, Naples, Florence, Venice
- **UK**: London, Edinburgh
- **And many more European destinations**

## 🔧 Configuration

### Environment Variables
Currently, the app uses localStorage for data persistence. For production deployment, consider:
- Setting up a backend API
- Configuring a database
- Adding environment-specific configurations

### Customization
- **Colors**: Modify `tailwind.config.ts` for theme customization
- **Components**: UI components are in `src/components/ui/`
- **Routes**: Add new routes in `src/App.tsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- **Vercel** - Zero-config deployment
- **Netlify** - Easy continuous deployment
- **GitHub Pages** - Free static hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Happy ridesharing! 🚗💨**
