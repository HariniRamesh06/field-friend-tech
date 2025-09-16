import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin,
  RefreshCw,
  IndianRupee,
  Calendar,
  BarChart3,
  AlertCircle,
  Award
} from "lucide-react";

interface MarketPrice {
  crop: string;
  variety: string;
  market: string;
  price: number;
  unit: string;
  change: number;
  changePercent: number;
  lastUpdated: string;
  quality: 'FAQ' | 'Medium' | 'Good';
}

interface GovernmentScheme {
  name: string;
  description: string;
  eligibility: string;
  benefit: string;
  deadline: string;
  status: 'Active' | 'Coming Soon' | 'Expired';
}

const MarketPrices = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchCrop, setSearchCrop] = useState('');
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const states = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Karnataka', 'Gujarat', 'Rajasthan'];
  const districts = ['Mumbai', 'Pune', 'Nashik', 'Aurangabad', 'Nagpur'];

  useEffect(() => {
    // Load mock data
    loadMarketData();
    loadGovernmentSchemes();
  }, [selectedState, selectedDistrict]);

  const loadMarketData = () => {
    const mockPrices: MarketPrice[] = [
      {
        crop: 'Rice',
        variety: 'Basmati',
        market: 'Pune APMC',
        price: 4500,
        unit: 'per quintal',
        change: 150,
        changePercent: 3.4,
        lastUpdated: '2 hours ago',
        quality: 'Good'
      },
      {
        crop: 'Wheat',
        variety: 'Durum',
        market: 'Mumbai APMC',
        price: 2800,
        unit: 'per quintal',
        change: -50,
        changePercent: -1.8,
        lastUpdated: '1 hour ago',
        quality: 'Medium'
      },
      {
        crop: 'Tomato',
        variety: 'Hybrid',
        market: 'Nashik Market',
        price: 1200,
        unit: 'per quintal',
        change: 200,
        changePercent: 20.0,
        lastUpdated: '30 minutes ago',
        quality: 'Good'
      },
      {
        crop: 'Onion',
        variety: 'Red',
        market: 'Pune APMC',
        price: 800,
        unit: 'per quintal',
        change: -100,
        changePercent: -11.1,
        lastUpdated: '1 hour ago',
        quality: 'FAQ'
      },
      {
        crop: 'Cotton',
        variety: 'Medium Staple',
        market: 'Aurangabad Market',
        price: 6200,
        unit: 'per quintal',
        change: 100,
        changePercent: 1.6,
        lastUpdated: '3 hours ago',
        quality: 'Good'
      },
      {
        crop: 'Sugarcane',
        variety: 'Co-86032',
        market: 'Kolhapur Market',
        price: 3500,
        unit: 'per tonne',
        change: 0,
        changePercent: 0,
        lastUpdated: '4 hours ago',
        quality: 'Medium'
      }
    ];
    
    setMarketPrices(mockPrices);
  };

  const loadGovernmentSchemes = () => {
    const mockSchemes: GovernmentScheme[] = [
      {
        name: 'PM-KISAN',
        description: 'Direct income support to farmers',
        eligibility: 'All landholding farmers',
        benefit: '₹6,000 per year in 3 installments',
        deadline: 'Ongoing',
        status: 'Active'
      },
      {
        name: 'Crop Insurance Scheme',
        description: 'Insurance coverage for crop losses',
        eligibility: 'All farmers growing notified crops',
        benefit: 'Up to 90% premium subsidy',
        deadline: '31st March 2024',
        status: 'Active'
      },
      {
        name: 'Organic Farming Support',
        description: 'Financial assistance for organic farming',
        eligibility: 'Farmers adopting organic practices',
        benefit: '₹50,000 per hectare over 3 years',
        deadline: '15th April 2024',
        status: 'Coming Soon'
      },
      {
        name: 'Solar Pump Subsidy',
        description: 'Subsidized solar pumps for irrigation',
        eligibility: 'Farmers with irrigation needs',
        benefit: 'Up to 90% subsidy on solar pumps',
        deadline: '30th June 2024',
        status: 'Active'
      }
    ];
    
    setSchemes(mockSchemes);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadMarketData();
      setLastRefresh(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const filteredPrices = marketPrices.filter(price =>
    searchCrop === '' || price.crop.toLowerCase().includes(searchCrop.toLowerCase())
  );

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'FAQ': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSchemeStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Coming Soon': return 'bg-blue-100 text-blue-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Market Prices & Government Schemes
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with live market prices and discover government schemes available for farmers.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Market Filters
              </span>
              <Button
                onClick={handleRefresh}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Input
                  placeholder="Search crops..."
                  value={searchCrop}
                  onChange={(e) => setSearchCrop(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Last updated: {lastRefresh.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Market Prices */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Current Market Prices</h2>
            
            {filteredPrices.map((price, index) => (
              <Card key={`${price.crop}-${price.variety}`} className="bg-gradient-card shadow-card hover:shadow-farm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{price.crop}</h3>
                        <Badge variant="secondary">{price.variety}</Badge>
                        <Badge className={getQualityColor(price.quality)}>
                          {price.quality}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{price.market}</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <IndianRupee className="h-5 w-5 text-farm-green mr-1" />
                          <span className="text-2xl font-bold text-farm-green">
                            {price.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">
                            {price.unit}
                          </span>
                        </div>
                        
                        <div className={`flex items-center space-x-1 ${getChangeColor(price.change)}`}>
                          {getChangeIcon(price.change)}
                          <span className="font-medium">
                            {price.change > 0 ? '+' : ''}{price.change}
                          </span>
                          <span className="text-sm">
                            ({price.changePercent > 0 ? '+' : ''}{price.changePercent}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{price.lastUpdated}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Government Schemes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Government Schemes</h2>
            
            {schemes.map((scheme, index) => (
              <Card key={scheme.name} className="bg-gradient-card shadow-card animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Award className="mr-2 h-5 w-5 text-farm-green" />
                      {scheme.name}
                    </CardTitle>
                    <Badge className={getSchemeStatusColor(scheme.status)}>
                      {scheme.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {scheme.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Eligibility</p>
                      <p className="text-sm">{scheme.eligibility}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Benefit</p>
                      <p className="text-sm font-medium text-farm-green">{scheme.benefit}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                        <p className="text-sm">{scheme.deadline}</p>
                      </div>
                      {scheme.status === 'Active' && (
                        <Button size="sm" variant="farm">
                          Apply Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Market Alert */}
            <Card className="bg-gradient-accent shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-accent-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-accent-foreground mb-1">Market Alert</h4>
                    <p className="text-sm text-accent-foreground/90">
                      Tomato prices have increased by 20% due to seasonal demand. Consider harvesting if ready.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;