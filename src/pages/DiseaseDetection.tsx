import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Camera, 
  ScanLine,
  AlertTriangle,
  CheckCircle,
  Leaf,
  ShieldCheck,
  Eye
} from "lucide-react";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  description: string;
  symptoms: string[];
  treatments: string[];
  prevention: string[];
  organicTreatments: string[];
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: DetectionResult = {
        disease: 'Late Blight',
        confidence: 92,
        severity: 'Moderate',
        description: 'Late blight is a destructive disease that affects tomatoes and potatoes, caused by the fungus-like organism Phytophthora infestans.',
        symptoms: [
          'Dark brown to black lesions on leaves',
          'White fuzzy growth on leaf undersides',
          'Stem lesions that can girdle the plant',
          'Fruit rot with dark, sunken areas'
        ],
        treatments: [
          'Apply copper-based fungicides preventively',
          'Use systemic fungicides like mancozeb',
          'Remove and destroy infected plant parts',
          'Improve air circulation around plants'
        ],
        prevention: [
          'Choose resistant varieties when available',
          'Avoid overhead watering',
          'Ensure proper plant spacing',
          'Remove plant debris at season end',
          'Rotate crops annually'
        ],
        organicTreatments: [
          'Neem oil spray (2-3 times per week)',
          'Baking soda solution (1 tsp per liter)',
          'Milk spray (1:10 ratio with water)',
          'Copper soap fungicide'
        ]
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Mild': return <CheckCircle className="h-4 w-4" />;
      case 'Moderate': return <AlertTriangle className="h-4 w-4" />;
      case 'Severe': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Plant Disease Detection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload a photo of your plant to detect diseases and get treatment recommendations using AI-powered analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div>
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5" />
                  Upload Plant Image
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the affected plant parts for accurate detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {selectedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={selectedImage} 
                          alt="Selected plant" 
                          className="max-h-64 mx-auto rounded-lg object-cover"
                        />
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-lg font-medium">Click to upload image</p>
                          <p className="text-sm text-muted-foreground">
                            Supports JPG, PNG, WEBP (max 10MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Analysis Button */}
                  <Button
                    onClick={handleAnalyze}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full"
                    variant="farm"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing Image...
                      </div>
                    ) : (
                      <>
                        <ScanLine className="mr-2 h-5 w-5" />
                        Detect Disease
                      </>
                    )}
                  </Button>

                  {/* Tips */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center text-sm">
                      <Eye className="mr-1 h-4 w-4" />
                      Photo Tips for Better Results
                    </h4>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Take photos in good lighting conditions</li>
                      <li>• Focus on affected leaves or plant parts</li>
                      <li>• Ensure the image is clear and not blurry</li>
                      <li>• Include multiple affected areas if possible</li>
                      <li>• Avoid shadows and extreme angles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            {result ? (
              <div className="space-y-6 animate-fade-in">
                {/* Detection Result */}
                <Card className="bg-gradient-card shadow-farm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Leaf className="mr-2 h-5 w-5 text-farm-green" />
                        Detection Result
                      </CardTitle>
                      <Badge variant="secondary" className="bg-farm-green text-primary-foreground">
                        {result.confidence}% Confidence
                      </Badge>
                    </div>
                    <Progress value={result.confidence} className="w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-destructive">{result.disease}</h3>
                        <Badge className={getSeverityColor(result.severity)}>
                          {getSeverityIcon(result.severity)}
                          {result.severity}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{result.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Symptoms */}
                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Symptoms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Treatments */}
                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-700">
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      Recommended Treatments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-blue-600">Chemical Treatments</h4>
                        <ul className="space-y-1">
                          {result.treatments.map((treatment, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-sm">{treatment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm text-green-600">Organic Treatments</h4>
                        <ul className="space-y-1">
                          {result.organicTreatments.map((treatment, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-sm">{treatment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prevention */}
                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-700">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Prevention Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.prevention.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-gradient-card shadow-card h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <ScanLine className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Analyze Your Plant?</h3>
                  <p className="text-muted-foreground">
                    Upload a clear image of your plant to get instant disease detection and treatment recommendations.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;