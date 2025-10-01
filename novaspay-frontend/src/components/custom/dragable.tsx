import React, { useState, useRef } from 'react';

interface DraggableProps {
  children: React.ReactNode;
  className?: string;
}

const Draggable: React.FC<DraggableProps> = ({ children, className }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const dragRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      className={`absolute cursor-move ${className || ''}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
