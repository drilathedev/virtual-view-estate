import { useState, useEffect } from 'react';
import { AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface Kuula3DViewerProps {
  kuulaId: string;
  title?: string;
  fallbackImage?: string;
  fallbackGallery?: string[];
  onFallback?: () => void;
}

export function Kuula3DViewer({ kuulaId, title, fallbackImage, fallbackGallery, onFallback }: Kuula3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Reset states when kuulaId changes
    setIsLoading(true);
    setHasError(false);
    setShowFallback(false);

    // Set a timeout to detect if iframe doesn't load
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Check if Kuula is accessible
    const checkKuulaAccess = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        await fetch(`https://kuula.co/share/${kuulaId}`, {
          method: 'HEAD',
          signal: controller.signal,
          mode: 'no-cors' // This won't give us detailed info but will detect blocking
        });
        
        clearTimeout(timeoutId);
      } catch (error) {
        console.warn('Kuula might be blocked or unavailable:', error);
        setHasError(true);
      }
    };

    checkKuulaAccess();

    return () => clearTimeout(loadTimeout);
  }, [kuulaId]);

  const handleUseFallback = () => {
    setShowFallback(true);
    onFallback?.();
  };

  if (!kuulaId) {
    return (
      <div className="w-full bg-muted rounded-lg flex items-center justify-center h-96">
        <p className="text-muted-foreground">Nuk ka tur 3D të disponueshëm</p>
      </div>
    );
  }

  if (showFallback && fallbackImage) {
    return (
      <div className="w-full h-full relative">
        <img
          src={fallbackImage}
          alt={title || 'Property'}
          className="w-full h-full object-cover"
        />
        {fallbackGallery && fallbackGallery.length > 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {fallbackGallery.length} foto të disponueshme
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Po ngarkohet turi 3D...</p>
          </div>
        </div>
      )}

      {/* Error Warning */}
      {hasError && !showFallback && (
        <div className="absolute top-4 left-4 right-4 z-20">
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-sm text-yellow-800">
              Turi 3D mund të mos funksionojë në disa vende për shkak të kufizimeve gjeografike.
              {fallbackImage && (
                <>
                  {' '}
                  <Button
                    variant="link"
                    className="h-auto p-0 text-yellow-900 underline font-semibold"
                    onClick={handleUseFallback}
                  >
                    Shiko fotot në vend të kësaj
                  </Button>
                </>
              )}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={`https://kuula.co/share/${kuulaId}?logo=-1&info=1&fs=1&vr=1&sd=1&thumbs=2&alpha=1&keys=1&chromeless=0&autopalt=1&littleplanet=0&autoload=1`}
        style={{
          border: 'none',
          borderRadius: '0px',
          width: '100%',
          height: '100%',
        }}
        allow="fullscreen; accelerometer; autoplay; camera *; gyroscope; magnetometer; midi; payment *; usb *; xr-spatial-tracking *"
        allowFullScreen
        width="100%"
        height="100%"
        loading="eager"
        title={title || '3D Tour'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* Fallback Button Overlay */}
      {!isLoading && hasError && fallbackImage && !showFallback && (
        <div className="absolute bottom-4 right-4 z-20">
          <Button
            onClick={handleUseFallback}
            className="bg-accent hover:bg-accent/90 text-white shadow-lg"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Shiko Fotot
          </Button>
        </div>
      )}
    </div>
  );
}
