import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  Sprout, 
  ScanLine, 
  TrendingUp,
  Users,
  Award,
  Shield
} from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import aiChatbotImage from "@/assets/ai-chatbot.jpg";
import cropRecommendationImage from "@/assets/crop-recommendation.jpg";
import diseaseDetectionImage from "@/assets/disease-detection.jpg";

const Home = () => {
  const features = [
    {
      title: "AI Chatbot Assistant",
      description: "Get instant answers about crops, soil, pests, diseases, and government schemes in multiple languages.",
      icon: MessageCircle,
      link: "/chatbot",
      image: aiChatbotImage,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Crop Recommendations",
      description: "Receive personalized crop suggestions based on your location, soil type, and season.",
      icon: Sprout,
      link: "/crop-recommendation",
      image: cropRecommendationImage,
      color: "from-farm-green to-farm-green-light"
    },
    {
      title: "Disease Detection",
      description: "Upload plant images to detect diseases and get treatment recommendations using AI.",
      icon: ScanLine,
      link: "/disease-detection",
      image: diseaseDetectionImage,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Market Prices",
      description: "Stay updated with live market prices for crops in your area and government schemes.",
      icon: TrendingUp,
      link: "/market-prices",
      image: null,
      color: "from-wheat-gold to-yellow-500"
    }
  ];

  const stats = [
    { label: "Farmers Helped", value: "10,000+", icon: Users },
    { label: "Diseases Detected", value: "500+", icon: ScanLine },
    { label: "Success Rate", value: "95%", icon: Award },
    { label: "Secure & Trusted", value: "100%", icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Empowering Farmers with{" "}
              <span className="text-wheat-gold">AI Technology</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
              Get instant farming advice, crop recommendations, disease detection, and market prices - all in one intelligent platform designed for modern agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/chatbot">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Chat with AI
                </Button>
              </Link>
              <Link to="/crop-recommendation">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Sprout className="mr-2 h-5 w-5" />
                  Get Crop Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-hero rounded-xl mb-4 shadow-farm">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Farming Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed farming decisions and increase your crop yield
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="group hover:shadow-farm transition-all duration-300 animate-fade-in border-0 shadow-card bg-gradient-card" style={{ animationDelay: `${index * 0.2}s` }}>
                {feature.image && (
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {feature.description}
                  </CardDescription>
                  <Link to={feature.link}>
                    <Button variant="farm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Thousands of Smart Farmers
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start using AI-powered farming assistance today and transform your agricultural practices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chatbot">
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with AI Now
              </Button>
            </Link>
            <Link to="/crop-recommendation">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Sprout className="mr-2 h-5 w-5" />
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;