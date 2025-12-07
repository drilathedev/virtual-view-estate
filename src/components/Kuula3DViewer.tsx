interface Kuula3DViewerProps {
  kuulaId: string;
  title?: string;
}

export function Kuula3DViewer({ kuulaId, title }: Kuula3DViewerProps) {
  if (!kuulaId) {
    return (
      <div className="w-full bg-muted rounded-lg flex items-center justify-center h-96">
        <p className="text-muted-foreground">No 3D tour available</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-border shadow-sm relative">
      <iframe
        src={`https://kuula.co/share/${kuulaId}?logo=-1&info=0&fs=0&vr=0&thumbs=-1&keys=0`}
        style={{
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0px 1px 1px rgba(0,0,0,0.3)',
        }}
        allow="fullscreen; accelerometer; autoplay; camera *; gyroscope; magnetometer; midi; payment *; usb *; xr-spatial-tracking *"
        allowFullScreen
        width="100%"
        height="600"
        title={title || '3D Tour'}
      />
    </div>
  );
}
