interface AdPlaceholderProps {
  width?: string;
  height?: string;
  className?: string;
  text?: string;
}

export function AdPlaceholder({ 
  width = "100%", 
  height = "250px", 
  className = "",
  text = "Ad Space - Waiting for AdSense approval"
}: AdPlaceholderProps) {
  return (
    <div 
      className={`ad-placeholder ${className}`}
      style={{ 
        width, 
        height, 
        backgroundColor: 'rgba(248, 243, 230, 0.7)',
        border: '1px dashed #9e9176',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        margin: '1.5rem auto'
      }}
    >
      <p className="text-sm text-[#5d5345]">{text}</p>
    </div>
  );
} 