import * as React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-4 p-8 rounded-lg bg-card shadow-lg animate-in zoom-in-95 duration-300">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">
          Buscando habitaciones perfectas para ti...
        </p>
      </div>
    </div>
  );
}
