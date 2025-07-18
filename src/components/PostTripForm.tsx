import { useState } from "react";
import { Clock, Euro, Users, Car, UserSearch, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useTrips } from "@/contexts/TripContext";
import AuthModal from "@/components/AuthModal";
import LocationInput from "@/components/LocationInput";
import { toast } from "sonner";

const PostTripForm = () => {
  const { user } = useAuth();
  const { addTrip } = useTrips();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [tripType, setTripType] = useState<"offering" | "looking">("offering");
  const [price, setPrice] = useState([10]);
  const [seats, setSeats] = useState([2]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    notes: "",
    car: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    // Validate required fields
    if (!formData.from || !formData.to || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Create and save the trip
    const tripData = {
      ...formData,
      tripType,
      price: price[0],
      seats: tripType === "offering" ? seats[0] : 1,
      userId: user.id,
      userName: user.name
    };

    addTrip(tripData);
    toast.success(`${tripType === "offering" ? "Ride offer" : "Ride request"} posted successfully!`);
    
    // Reset form
    setFormData({ from: "", to: "", date: "", time: "", notes: "", car: "" });
    setPrice([10]);
    setSeats([2]);
  };

  if (!user) {
    return (
      <>
        <Card className="max-w-2xl mx-auto shadow-card">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Login Required</h3>
              <p className="text-muted-foreground max-w-md">
                You need to be logged in to post trips. Join our community to start sharing rides!
              </p>
            </div>
            <Button onClick={() => setAuthModalOpen(true)} variant="hero" size="lg">
              Sign Up or Log In
            </Button>
          </CardContent>
        </Card>
        
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          defaultTab="signup"
        />
      </>
    );
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Post Your Trip
          </CardTitle>
          <p className="text-muted-foreground">
            Connect with neighbors for your next journey
          </p>
        </CardHeader>
        
          <CardContent className="space-y-6">
            {/* Trip Type */}
            <div className="space-y-3">
              <Label className="text-base font-medium">I am...</Label>
              <RadioGroup 
                value={tripType} 
                onValueChange={(value) => setTripType(value as "offering" | "looking")}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offering" id="offering" />
                  <Label htmlFor="offering" className="flex items-center space-x-2 cursor-pointer">
                    <Car className="w-4 h-4 text-primary" />
                    <span>Offering a ride</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="looking" id="looking" />
                  <Label htmlFor="looking" className="flex items-center space-x-2 cursor-pointer">
                    <UserSearch className="w-4 h-4 text-secondary" />
                    <span>Looking for a ride</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Route Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <LocationInput
                  id="from"
                  placeholder="Starting location"
                  value={formData.from}
                  onChange={(value) => handleInputChange("from", value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <LocationInput
                  id="to"
                  placeholder="Destination"
                  value={formData.to}
                  onChange={(value) => handleInputChange("to", value)}
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date"
                  type="date" 
                  className="cursor-pointer"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="time"
                    type="time" 
                    className="pl-10 cursor-pointer"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">
                  Price per person
                </Label>
                <div className="flex items-center space-x-1 bg-primary-light px-3 py-1 rounded-lg">
                  <Euro className="w-4 h-4 text-primary" />
                  <span className="text-lg font-bold text-primary">{price[0]}</span>
                </div>
              </div>
              <div className="px-3">
                <Slider
                  value={price}
                  onValueChange={setPrice}
                  max={50}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Free</span>
                  <span>€50</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Set your price based on distance, fuel costs, and convenience. Free rides are welcome too!
              </p>
            </div>

            {/* Car Info (for offering rides) */}
            {tripType === "offering" && (
              <div className="space-y-2">
                <Label htmlFor="car">Car (optional)</Label>
                <div className="relative">
                  <Car className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="car"
                    placeholder="e.g., Toyota Corolla, Blue Honda Civic" 
                    className="pl-10"
                    value={formData.car}
                    onChange={(e) => handleInputChange("car", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Seats Available (for offering rides) */}
            {tripType === "offering" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    Available seats
                  </Label>
                  <div className="flex items-center space-x-1 bg-secondary-light px-3 py-1 rounded-lg">
                    <Users className="w-4 h-4 text-secondary-foreground" />
                    <span className="text-lg font-bold text-secondary-foreground">{seats[0]}</span>
                  </div>
                </div>
                <div className="px-3">
                  <Slider
                    value={seats}
                    onValueChange={setSeats}
                    max={4}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>1 seat</span>
                    <span>4 seats</span>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific meeting points, preferences, or additional information..."
                className="min-h-[80px]"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 text-base font-medium"
              variant={tripType === "offering" ? "default" : "cta"}
            >
              {tripType === "offering" ? "Post My Ride Offer" : "Post My Ride Request"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By posting, you agree to our community guidelines and safety standards.
            </p>
          </CardContent>
        </Card>
        
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          defaultTab="signup"
        />
      </>
    );
};

export default PostTripForm;
