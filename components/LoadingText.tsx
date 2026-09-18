interface LoadingTextProps {
  resource?: string;
}

export default function LoadingText({ resource }: LoadingTextProps) {
  return (
    <div className="animate-pulse py-12 text-center text-xs text-muted-foreground">
      Loading {resource || "content"}...
    </div>
  );
}
