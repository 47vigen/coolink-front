import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// ** UI
import { Icon } from '../Tools'

// ** Template
import { RenderSection } from './Render'

// ** Utils
import classNames from '../../utils/classNames'

function Edit({ page, sections, onDragEnd, openEditModal }) {
  return (
    <div className="relative z-20">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} className="space-y-2 my-4" ref={provided.innerRef}>
              {sections.map((item, index) => (
                <Draggable key={item.id} draggableId={`draggable-${item.id}`} index={index}>
                  {(provided, { isDragging }) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} style={provided.draggableProps.style}>
                      <Item
                        item={item}
                        index={index}
                        slug={page.slug}
                        style={page.style}
                        onEdit={() => openEditModal(item)}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

const Item = React.memo(function Component({ index, slug, style, item, onEdit, dragHandleProps }) {
  return (
    <Menu as="div" className="relative text-start">
      <Menu.Button className="w-full">
        {({ open }) => (
          <div
            className={classNames(
              'z-30 w-full rounded-lg border-dashed border-line transition ease-in-out duration-300',
              style?.display?.direction === 'ltr' ? 'rounded-bl-none' : 'rounded-br-none',
              open ? 'bg-body bg-opacity-70 border' : ''
            )}
          >
            <div
              className={classNames(
                'transition ease-in-out duration-300',
                open ? classNames('transform -translate-y-3', style?.display?.direction === 'ltr' ? 'translate-x-3' : '-translate-x-3') : ''
              )}
              style={{ pointerEvents: 'none' }}
            >
              <RenderSection item={item} style={style} index={index} slug={slug} />
            </div>
          </div>
        )}
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            'absolute bg-body bg-opacity-70 rounded-b-lg -mt-1 z-[1000] start-0 w-max focus:outline-none',
            style?.display?.direction === 'ltr' ? ' origin-top-left' : ' origin-top-right'
          )}
        >
          {({ open }) => (
            <div className="flex rounded-b-lg mt-1 border border-t-0 border-dashed border-line text-lg">
              <Menu.Item as="button" className="pb-1 ps-3 pe-1 pt-0" onClick={onEdit}>
                <Icon name="edit" />
              </Menu.Item>
              <Menu.Item {...dragHandleProps}>
                <Icon name="interlining" className="pb-1 ps-3 pe-3 pt-0" />
              </Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
})

export default React.memo(Edit)
