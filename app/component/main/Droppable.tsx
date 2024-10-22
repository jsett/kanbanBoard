import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div ref={setNodeRef} className='w-full h-full'>
      {props.children}
    </div>
  );
}