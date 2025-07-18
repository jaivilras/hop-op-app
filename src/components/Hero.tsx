import { MapPin, Clock, Euro } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/5 opacity-30"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Share the Journey,{" "}
            <span className="text-secondary">Split the Cost</span>
          </h1>
          
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto animate-slide-up">
            Quick, local rides between neighbors. Perfect for daily commutes, shopping trips, 
            and spontaneous adventures. Safe, affordable, and community-driven.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up">
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="font-medium">Local Routes</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="font-medium">Quick Booking</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-foreground/90">
              <Euro className="w-5 h-5 text-secondary" />
              <span className="font-medium">0-50€ Your Price</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Button variant="cta" size="lg" className="text-lg px-8 py-4">
              Find a Ride Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20" asChild>
              <Link to="/post-trip">
                Offer Your Car
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;