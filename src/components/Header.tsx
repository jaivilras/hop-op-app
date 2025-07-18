import { useState } from "react";
import { Car, User, Search, Plus, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const Header = () => {
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const handleOpenLogin = () => {
    setAuthModalTab("login");
    setAuthModalOpen(true);
  };

  const handleOpenSignup = () => {
    setAuthModalTab("signup");
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-hero rounded-lg">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">HopOn</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/find-rides">
                  <Search className="w-4 h-4 mr-2" />
                  Find a Ride
                </Link>
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary" asChild>
                <Link to="/post-trip">
                  <Plus className="w-4 h-4 mr-2" />
                  Post a Trip
                </Link>
              </Button>
            </nav>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <span className="hidden sm:inline text-foreground">{user.name}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="flex items-center space-x-2 cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleOpenLogin}>
                  Log In
                </Button>
                <Button variant="hero" size="sm" onClick={handleOpenSignup}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultTab={authModalTab}
      />
    </>
  );
};

export default Header;
