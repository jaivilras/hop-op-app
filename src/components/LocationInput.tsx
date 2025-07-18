import { useState, useRef, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Common locations in Spain and Europe for autocomplete
const COMMON_LOCATIONS = [
  "Madrid, Spain",
  "Barcelona, Spain", 
  "Valencia, Spain",
  "Sevilla, Spain",
  "Bilbao, Spain",
  "Málaga, Spain",
  "Zaragoza, Spain",
  "Murcia, Spain",
  "Palma, Spain",
  "Las Palmas, Spain",
  "Granada, Spain",
  "Córdoba, Spain",
  "Toledo, Spain",
  "Salamanca, Spain",
  "Santiago de Compostela, Spain",
  "Paris, France",
  "Lyon, France",
  "Marseille, France",
  "Toulouse, France",
  "Nice, France",
  "Berlin, Germany",
  "Munich, Germany",
  "Hamburg, Germany",
  "Frankfurt, Germany",
  "Rome, Italy",
  "Milan, Italy",
  "Naples, Italy",
  "Florence, Italy",
  "Venice, Italy",
  "Lisbon, Portugal",
  "Porto, Portugal",
  "Amsterdam, Netherlands",
  "Brussels, Belgium",
  "Zurich, Switzerland",
  "Geneva, Switzerland",
  "Vienna, Austria",
  "Prague, Czech Republic",
  "London, UK",
  "Edinburgh, UK",
  "Dublin, Ireland"
];

interface LocationInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const LocationInput = ({ id, placeholder, value, onChange, className = "" }: LocationInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (value.length > 1) {
      const filtered = COMMON_LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow click events on suggestions
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    }, 100);
  };

  const clearInput = () => {
    onChange("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" onBlur={handleBlur}>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length > 1 && setShowSuggestions(suggestions.length > 0)}
          className={`pl-10 ${value ? 'pr-10' : ''} ${className}`}
          autoComplete="off"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-secondary"
            onClick={clearInput}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              ref={el => suggestionRefs.current[index] = el}
              type="button"
              className={`w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground text-sm border-b border-border last:border-b-0 flex items-center gap-3 ${
                index === activeSuggestion ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
