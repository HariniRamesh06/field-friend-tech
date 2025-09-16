import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Sprout, 
  Calendar,
  Thermometer,
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface CropRecommendation {
  name: string;
  suitability: number;
  expectedYield: string;
  growthPeriod: string;
  waterRequirement: string;
  pestRisk: 'Low' | 'Medium' | 'High';
  marketDemand: 'Low' | 'Medium' | 'High';
  benefits: string[];
  tips: string[];
}

const CropRecommendation = () => {
  const [location, setLocation] = useState('');
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);

  const soilTypes = [
    'Alluvial Soil',
    'Black Soil (Regur)',
    'Red Soil',
    'Laterite Soil',
    'Desert Soil',
    'Mountain Soil',
    'Saline Soil'
  ];

  const seasons = [
    'Kharif (Monsoon)',
    'Rabi (Winter)',
    'Zaid (Summer)'
  ];

  const handleGetRecommendations = async () => {
    if (!location || !soilType || !season) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations: CropRecommendation[] = [
        {
          name: 'Rice',
          suitability: 95,
          expectedYield: '4-6 tons/hectare',
          growthPeriod: '120-150 days',
          waterRequirement: 'High (1500-2000mm)',
          pestRisk: 'Medium',
          marketDemand: 'High',
          benefits: ['High market demand', 'Good price stability', 'Government support available'],
          tips: ['Use disease-resistant varieties', 'Maintain proper water levels', 'Apply organic manure']
        },
        {
          name: 'Wheat',
          suitability: 88,
          expectedYield: '3-4 tons/hectare',
          growthPeriod: '120-130 days',
          waterRequirement: 'Medium (400-500mm)',
          pestRisk: 'Low',
          marketDemand: 'High',
          benefits: ['Low pest incidence', 'Good storage life', 'Multiple varieties available'],
          tips: ['Sow at right time', 'Use certified seeds', 'Apply balanced fertilizers']
        },
        {
          name: 'Maize',
          suitability: 82,
          expectedYield: '5-7 tons/hectare',
          growthPeriod: '90-120 days',
          waterRequirement: 'Medium (500-800mm)',
          pestRisk: 'Medium',
          marketDemand: 'Medium',
          benefits: ['Short growth period', 'Multiple uses', 'Good fodder value'],
          tips: ['Ensure proper drainage', 'Control fall armyworm', 'Harvest at right moisture']
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Crop Recommendation System
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get AI-powered crop recommendations based on your location, soil type, and season for optimal yield and profitability.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-card shadow-card sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sprout className="mr-2 h-5 w-5" />
                  Crop Analysis
                </CardTitle>
                <CardDescription>
                  Enter your farming details to get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    Location/District
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter your district/city"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Thermometer className="mr-1 h-4 w-4" />
                    Soil Type
                  </Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil} value={soil}>
                          {soil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Season
                  </Label>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGetRecommendations}
                  disabled={!location || !soilType || !season || isLoading}
                  className="w-full"
                  variant="farm"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-2">
            {recommendations.length === 0 ? (
              <Card className="bg-gradient-card shadow-card h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Sprout className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Find Your Perfect Crops?</h3>
                  <p className="text-muted-foreground">
                    Fill in your location, soil type, and season to get personalized crop recommendations.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">
                  Recommended Crops for {season} in {location}
                </h2>
                
                {recommendations.map((crop, index) => (
                  <Card key={crop.name} className="bg-gradient-card shadow-farm hover:shadow-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center text-xl">
                          <Sprout className="mr-2 h-5 w-5 text-farm-green" />
                          {crop.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">Suitability</span>
                          <Badge variant="secondary" className="bg-farm-green text-primary-foreground">
                            {crop.suitability}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={crop.suitability} className="w-full" />
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Key Metrics */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Expected Yield</span>
                            <span className="font-medium">{crop.expectedYield}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Growth Period</span>
                            <span className="font-medium">{crop.growthPeriod}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground flex items-center">
                              <Droplets className="mr-1 h-3 w-3" />
                              Water Need
                            </span>
                            <span className="font-medium">{crop.waterRequirement}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Pest Risk</span>
                            <Badge className={getRiskColor(crop.pestRisk)}>
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              {crop.pestRisk}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Market Demand</span>
                            <Badge className={getDemandColor(crop.marketDemand)}>
                              <TrendingUp className="mr-1 h-3 w-3" />
                              {crop.marketDemand}
                            </Badge>
                          </div>
                        </div>

                        {/* Benefits & Tips */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center text-green-700">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Key Benefits
                            </h4>
                            <ul className="text-sm space-y-1">
                              {crop.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-1 h-1 bg-farm-green rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center text-blue-700">
                              <Sprout className="mr-1 h-4 w-4" />
                              Growing Tips
                            </h4>
                            <ul className="text-sm space-y-1">
                              {crop.tips.map((tip, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-1 h-1 bg-sky-blue rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;