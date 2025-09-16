import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Sprout, 
  ScanLine, 
  TrendingUp,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home", icon: null },
    { to: "/chatbot", label: "AI Assistant", icon: MessageCircle },
    { to: "/crop-recommendation", label: "Crop Guide", icon: Sprout },
    { to: "/disease-detection", label: "Disease Detection", icon: ScanLine },
    { to: "/market-prices", label: "Market Prices", icon: TrendingUp },
  ];

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-card shadow-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-farm group-hover:shadow-glow transition-all duration-300">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Farmer Assistant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={isActive(item.to) ? "farm" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.to} 
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActive(item.to) ? "farm" : "ghost"}
                    size="sm"
                    className="w-full justify-start flex items-center space-x-2"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;