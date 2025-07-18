import { Search, MessageCircle, Star, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Find or Post",
      description: "Search for rides going your way or post your own trip with available seats."
    },
    {
      icon: MessageCircle,
      title: "Connect Safely",
      description: "Chat with verified users, check ratings, and confirm your spot."
    },
    {
      icon: Star,
      title: "Travel Together",
      description: "Meet up at the agreed location and enjoy a shared, affordable journey."
    },
    {
      icon: Shield,
      title: "Rate & Review",
      description: "Build trust in our community by rating your experience."
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How <span className="text-primary">HopOn</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting from A to B with HopOn is simple, safe, and social. 
            Join thousands of neighbors sharing their daily journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-primary-light rounded-full group-hover:shadow-glow transition-all duration-300"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-primary rounded-full group-hover:bg-primary/90 transition-colors">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;