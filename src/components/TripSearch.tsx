import { useState } from "react";
import { Search, MapPin, Calendar, Users, Euro, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import TripCard from "./TripCard";

const TripSearch = () => {
  const [date, setDate] = useState<Date>();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);

  // Sample data with varied pricing
  const trips = [
    {
      from: "Downtown",
      to: "University Campus",
      time: "Today, 8:30 AM",
      price: 6,
      driver: {
        name: "Sarah Chen",
        rating: 4.8,
        avatar: undefined
      },
      availableSeats: 2,
      type: "offering" as const
    },
    {
      from: "Mall District",
      to: "Business Park",
      time: "Today, 5:15 PM",
      price: 0,
      driver: {
        name: "Miguel Rodriguez",
        rating: 4.9,
        avatar: undefined
      },
      availableSeats: 1,
      type: "looking" as const
    },
    {
      from: "Airport",
      to: "City Center",
      time: "Tomorrow, 2:00 PM",
      price: 25,
      driver: {
        name: "Emma Wilson",
        rating: 4.7,
        avatar: undefined
      },
      availableSeats: 3,
      type: "offering" as const
    },
    {
      from: "Suburb North",
      to: "Train Station",
      time: "Today, 7:00 AM",
      price: 12,
      driver: {
        name: "Alex Kumar",
        rating: 4.6,
        avatar: undefined
      },
      availableSeats: 1,
      type: "offering" as const
    },
    {
      from: "Shopping Center",
      to: "Old Town",
      time: "Today, 3:30 PM",
      price: 4,
      driver: {
        name: "Lisa Wang",
        rating: 5.0,
        avatar: undefined
      },
      availableSeats: 2,
      type: "looking" as const
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect <span className="text-primary">Ride</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join your neighbors on their daily journeys. Search by location, time, or create your own trip.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="From where?" 
                  className="pl-10 h-12 border-0 bg-muted focus:bg-background"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="To where?" 
                  className="pl-10 h-12 border-0 bg-muted focus:bg-background"
                />
              </div>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 border-0 bg-muted hover:bg-background justify-start text-left font-normal pl-10",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="absolute left-3 w-4 h-4" />
                      {date ? format(date, "MMM dd, yyyy") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button className="h-12 text-base font-medium">
                <Search className="w-4 h-4 mr-2" />
                Search Rides
              </Button>
            </div>
            
            {/* Advanced Filters Toggle */}
            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-muted-foreground hover:text-primary"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Price Range</Label>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Euro className="w-3 h-3" />
                        <span>{priceRange[0]} - {priceRange[1]}</span>
                      </div>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={50}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Free</span>
                      <span>€50</span>
                    </div>
                  </div>

                  {/* Available Seats */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Minimum Available Seats</Label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4].map((seatCount) => (
                        <Button 
                          key={seatCount}
                          variant="outline" 
                          size="sm"
                          className="flex-1"
                        >
                          {seatCount}+ seat{seatCount > 1 ? 's' : ''}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="cta" className="flex items-center space-x-2" asChild>
            <Link to="/post-trip">
              <Users className="w-4 h-4" />
              <span>I'm Looking for a Ride</span>
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2" asChild>
            <Link to="/post-trip">
              <MapPin className="w-4 h-4" />
              <span>I'm Offering Seats</span>
            </Link>
          </Button>
        </div>

        {/* Sample Trips */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Available Trips Near You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <TripCard key={index} {...trip} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Trips
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TripSearch;