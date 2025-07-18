import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostTripForm from "@/components/PostTripForm";

const PostTrip = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-card py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Share Your Journey
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're offering seats in your car or looking for a ride, 
              connect with your neighbors and make travel more affordable and social.
            </p>
          </div>
        </div>
      </section>

      {/* Trip Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PostTripForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PostTrip;