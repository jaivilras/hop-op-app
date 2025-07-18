import { useState, useEffect } from "react";
import { MapPin, Clock, Euro, Users, Car, Filter, Search, UserSearch } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useTrips, Trip } from "@/contexts/TripContext";
import AuthModal from "@/components/AuthModal";
import LocationInput from "@/components/LocationInput";
import { toast } from "sonner";

const FindRides = () => {
  const { user } = useAuth();
  const { trips, bookTrip, searchTrips } = useTrips();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"offering" | "looking">("offering");
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    from: "",
    to: "",
    date: ""
  });

  useEffect(() => {
    // Filter trips based on active tab and search filters
    const filtered = searchTrips({
      ...searchFilters,
      tripType: activeTab
    });
    setFilteredTrips(filtered);
  }, [searchTrips, searchFilters, activeTab, trips]);

  const handleBookRide = (rideId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    
    bookTrip(rideId, 1);
    toast.success("Ride booked successfully!");
  };

  const handleSearch = () => {
    const filtered = searchTrips({
      ...searchFilters,
      tripType: activeTab
    });
    setFilteredTrips(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-card py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Find Your Ride
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse available rides from trusted community members and book your next journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <LocationInput
                    id="search-from"
                    placeholder="Starting location"
                    value={searchFilters.from}
                    onChange={(value) => setSearchFilters({...searchFilters, from: value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <LocationInput
                    id="search-to"
                    placeholder="Destination"
                    value={searchFilters.to}
                    onChange={(value) => setSearchFilters({...searchFilters, to: value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    className="cursor-pointer"
                    value={searchFilters.date}
                    onChange={(e) => setSearchFilters({...searchFilters, date: e.target.value})}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trip Type Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "offering" | "looking")}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="offering" className="flex items-center gap-2">
                <Car className="w-4 h-4" />
                Ride Offers
              </TabsTrigger>
              <TabsTrigger value="looking" className="flex items-center gap-2">
                <UserSearch className="w-4 h-4" />
                Ride Requests
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Available Rides */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {activeTab === 'offering' ? 'Available Rides' : 'Ride Requests'}
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Route and Time */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">{trip.from}</span>
                        </div>
                        <div className="w-8 h-0.5 bg-border"></div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="font-medium">{trip.to}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(trip.date).toLocaleDateString()} at {trip.time}</span>
                        </div>
                        {trip.car && (
                          <div className="flex items-center gap-1">
                            <Car className="w-4 h-4" />
                            <span>{trip.car}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm font-medium text-foreground mb-2">
                        {trip.tripType === 'offering' ? 'Driver: ' : 'Passenger: '}{trip.userName}
                      </p>
                      
                      {trip.notes && (
                        <p className="text-sm text-muted-foreground">
                          {trip.notes}
                        </p>
                      )}
                    </div>

                    {/* Price and Seats */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-4">
                      <div className="text-center lg:text-right">
                        <div className="flex items-center gap-1 text-2xl font-bold text-primary mb-1">
                          <Euro className="w-5 h-5" />
                          {trip.price}
                        </div>
                        <p className="text-xs text-muted-foreground">per person</p>
                      </div>
                      
                      {trip.tripType === 'offering' && (
                        <div className="text-center lg:text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-4 h-4 text-secondary" />
                            <span className="font-medium">{trip.availableSeats}/{trip.seats}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {trip.availableSeats > 1 ? 'seats left' : 'seat left'}
                          </p>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => handleBookRide(trip.id)}
                        className="lg:w-full"
                        disabled={trip.tripType === 'offering' && trip.availableSeats === 0}
                      >
                        {trip.tripType === 'offering' 
                          ? (trip.availableSeats === 0 ? 'Full' : 'Book Ride')
                          : 'Contact'
                        }
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No rides found message */}
          {filteredTrips.length === 0 && (
            <div className="text-center py-12">
              {activeTab === 'offering' ? (
                <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              ) : (
                <UserSearch className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              )}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No {activeTab === 'offering' ? 'rides' : 'requests'} found
              </h3>
              <p className="text-muted-foreground">
                {activeTab === 'offering' 
                  ? 'Try adjusting your search criteria or check back later for new rides.'
                  : 'Try adjusting your search criteria or check back later for new ride requests.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab="login"
      />
    </div>
  );
};

export default FindRides;
