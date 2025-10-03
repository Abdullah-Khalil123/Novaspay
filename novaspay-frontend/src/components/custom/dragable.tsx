import { X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface DraggableProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  Open?: (value: any | null) => void;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  className,
  Open,
  title,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);

  // Start in center of screen
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (dragRef.current) {
      const { offsetWidth, offsetHeight } = dragRef.current;
      const centerX = window.innerWidth / 2 - offsetWidth / 2;
      const centerY = window.innerHeight / 2 - offsetHeight / 2;
      setPosition({ x: centerX, y: centerY });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark background overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => Open?.(null)}
      />

      {/* Draggable Box */}
      <div
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className={`absolute rounded-md shadow-lg p-4 min-w-[300px] ${
          className || ''
        }`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {title && (
          <div className="flex justify-between pb-3 mb-3 text-lg font-semibold cursor-move border-b border-gray-300">
            {title}
            <button
              className="cursor-pointer text-gray-600 hover:text-black"
              onClick={() => Open?.(null)}
            >
              <X />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Draggable;
