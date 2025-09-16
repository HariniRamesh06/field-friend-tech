import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  MessageCircle, 
  Bot,
  User,
  Languages,
  Lightbulb
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language?: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI farming assistant. I can help you with crops, soil, pests, diseases, weather, fertilizers, and government schemes. How can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);

  const languages = ['English', 'Hindi', 'Tamil', 'Malayalam'];
  
  const quickQuestions = [
    "What crops are best for summer season?",
    "How to identify pest attacks on tomatoes?",
    "Government schemes for farmers 2024",
    "Best fertilizers for rice cultivation",
    "How to improve soil health naturally?",
    "Weather-resistant crop varieties"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call in production)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        language: selectedLanguage,
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    // This is a placeholder response generator
    // In production, this would be replaced with actual AI API calls
    const responses = [
      "Based on your location and current season, I recommend focusing on drought-resistant crops like millets and pulses. These crops require less water and have good market demand.",
      "For pest management, I suggest implementing integrated pest management (IPM) practices. Use neem-based organic pesticides and encourage beneficial insects in your field.",
      "There are several government schemes available for farmers including PM-KISAN, crop insurance schemes, and subsidies for organic farming. Would you like specific details about any of these?",
      "The best fertilizers depend on your soil type and crop. I recommend getting a soil test done first. Generally, a balanced NPK fertilizer works well for most crops.",
      "To improve soil health naturally, practice crop rotation, add organic compost, use green manures, and avoid excessive chemical inputs. Cover cropping is also very effective."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            AI Farming Assistant
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get expert farming advice powered by AI. Ask questions about crops, diseases, weather, fertilizers, and more in your preferred language.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Language Selection */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Languages className="mr-2 h-5 w-5" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang}
                      variant={selectedLanguage === lang ? "farm" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang)}
                      className="text-xs"
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="h-auto p-2 text-left text-xs w-full justify-start"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col bg-gradient-card shadow-farm">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat with AI Assistant
                  <Badge variant="secondary" className="ml-auto">
                    {selectedLanguage}
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${
                            message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              message.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            {message.type === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-2">
                          <div className="p-2 rounded-full bg-muted">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-muted p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-farm-green rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-farm-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-farm-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input */}
              <div className="border-t border-border p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder={`Type your farming question in ${selectedLanguage}...`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    variant="farm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;