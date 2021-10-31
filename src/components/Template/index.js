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
    <>
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
                        customize={page.style?.customize}
                        index={index}
                        slug={page.slug}
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
    </>
  )
}

const Item = React.memo(function Component({ index, slug, customize, item, onEdit, dragHandleProps }) {
  return (
    <Menu as="div" className="relative text-right">
      <Menu.Button className="w-full">
        {({ open }) => (
          <div
            className={classNames(
              'z-30 w-full rounded-lg rounded-br-none border-dashed border-line transition ease-in-out duration-300',
              open ? 'bg-body bg-opacity-70 border' : ''
            )}
          >
            <div
              className={classNames('transition ease-in-out duration-300', open ? 'transform -translate-y-3 -translate-x-3' : '')}
              style={{ pointerEvents: 'none' }}
            >
              <RenderSection item={item} customize={customize} index={index} slug={slug} />
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
        <Menu.Items className="absolute bg-body bg-opacity-70 rounded-b-lg -mt-1 z-[1000] right-0 w-max origin-top-right focus:outline-none">
          {({ open }) => (
            <div className="flex rounded-b-lg mt-1 border border-t-0 border-dashed border-line text-lg">
              <Menu.Item as="button" className="pb-1 pr-3 pl-1 pt-0" onClick={onEdit}>
                <Icon name="edit" />
              </Menu.Item>
              <Menu.Item {...dragHandleProps}>
                <Icon name="interlining" className="pb-1 pr-3 pl-3 pt-0" />
              </Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
})

export default React.memo(Edit)
