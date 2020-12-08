import React from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import Tab from './tab/tab';

import './tabs.css';

export default function Tabs(props) {
  return (
    <div>
      <DragDropContext onDragEnd={props.onDragEnd}>
        <Droppable droppableId="droppableId-1" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="tabs" ref={props.forwardedRef}>
                {props.tabsState.map(({id}, index) => (
                  <Draggable key={id} draggableId={id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Tab
                          key={id}
                          index={index}
                          num={id}
                          hideDeleteIcon={props.tabsState.length === 1}
                          highlightTab={props.currentTabId === id}
                          onDelete={() => props.onRemove(id)}
                          onSelect={() => props.onSelect(id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
