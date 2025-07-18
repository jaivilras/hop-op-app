import { MapPin, Clock, Euro, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TripCardProps {
  from: string;
  to: string;
  time: string;
  price: number;
  driver: {
    name: string;
    rating: number;
    avatar?: string;
  };
  availableSeats: number;
  type: "offering" | "looking";
}

const TripCard = ({ from, to, time, price, driver, availableSeats, type }: TripCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:transform hover:scale-[1.02]">
      {/* Trip Type Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          type === "offering" 
            ? "bg-primary-light text-primary" 
            : "bg-secondary-light text-secondary-foreground"
        }`}>
          {type === "offering" ? "Offering Ride" : "Looking for Ride"}
        </span>
        <div className="flex items-center space-x-1 text-primary">
          {price === 0 ? (
            <span className="font-bold text-lg bg-primary-light text-primary px-2 py-1 rounded-md">FREE</span>
          ) : (
            <>
              <Euro className="w-4 h-4" />
              <span className="font-bold text-lg">{price}</span>
            </>
          )}
        </div>
      </div>

      {/* Route */}
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="w-0.5 h-8 bg-border"></div>
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-foreground mb-2">{from}</div>
            <div className="font-medium text-foreground">{to}</div>
          </div>
        </div>
      </div>

      {/* Time and Seats */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center space-x-1">
          <User className="w-4 h-4" />
          <span>{availableSeats} seat{availableSeats !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Driver Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={driver.avatar} alt={driver.name} />
            <AvatarFallback className="bg-primary-light text-primary font-medium">
              {driver.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground">{driver.name}</div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-secondary text-secondary" />
              <span className="text-sm text-muted-foreground">{driver.rating}</span>
            </div>
          </div>
        </div>
        
        <Button variant="default" size="sm">
          {type === "offering" ? "Book Seat" : "Contact"}
        </Button>
      </div>
    </div>
  );
};

export default TripCard;