interface SidebarPlaceholderProps {
  position: 'left' | 'right';
  className?: string;
}

export function SidebarPlaceholder({ position, className = "" }: SidebarPlaceholderProps) {
  return (
    <div className={`ad-sidebar ad-sidebar-${position} ${className}`}>
      <p className="text-xs text-[#5d5345] mb-1 text-center">Advertisement</p>
      <div 
        style={{ 
          height: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #9e9176'
        }}
      >
        <p className="text-sm text-[#5d5345] text-center px-2">
          Ad Space<br />Waiting for<br />AdSense approval
        </p>
      </div>
    </div>
  );
} 