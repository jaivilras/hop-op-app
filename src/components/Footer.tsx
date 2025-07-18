import { Car, Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">HopOn</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              The friendly, local ride-sharing platform that connects neighbors 
              for quick, affordable microtrips. Building community one shared journey at a time.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-background/60 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Find a Ride</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Offer a Ride</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">
            © 2024 HopOn. All rights reserved. Built with ❤️ for local communities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;