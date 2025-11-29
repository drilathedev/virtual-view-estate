import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4 py-16">
        <Card className="max-w-2xl w-full shadow-hard animate-fade-in">
          <CardContent className="pt-12 pb-12 text-center space-y-8">
            {/* 404 Illustration */}
            <div className="relative">
              <div className="text-9xl font-bold gradient-text">404</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center animate-pulse">
                <AlertCircle className="h-16 w-16 text-accent" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold">Page Not Found</h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved to a new location.
              </p>
              <p className="text-sm text-muted-foreground font-mono bg-muted px-4 py-2 rounded-lg inline-block">
                {location.pathname}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
                Go Back
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                  <Home className="h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Suggestions */}
            <div className="pt-8 border-t space-y-3">
              <p className="text-sm text-muted-foreground">Here are some helpful links:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Search className="h-4 w-4" />
                    Properties
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
