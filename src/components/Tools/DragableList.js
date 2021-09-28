import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const onDragEnd = (list, setItems) => (result) => {
  // dropped outside the list
  if (!result.destination) {
    return
  }
  const items = reorder(list, result.source.index, result.destination.index)
  setItems(items)
}

function DragableList({ children, list, onChange }) {
  const [isDrag, setIsDrag] = React.useState(false)
  const [isOpenDisclosure, setIsOpenDisclosure] = React.useState([])

  const onOpenDisclosure = React.useCallback(
    (idx, open) => {
      if (isOpenDisclosure[idx] !== open) {
        let current = isOpenDisclosure
        current[idx] = open
        setIsOpenDisclosure([...current])
      }
    },
    [isOpenDisclosure]
  )

  const canDrag = React.useMemo(() => list?.length > 1 && !isOpenDisclosure.find((item) => item === true), [list?.length, isOpenDisclosure])

  React.useEffect(() => {
    let current = Array(list?.length || 0).fill(false)
    current.map((item, idx) => {
      if (isOpenDisclosure[idx] !== undefined) {
        item = isOpenDisclosure[idx]
      }
    })
    if (isOpenDisclosure.length !== current.length) setIsOpenDisclosure([...current])
  }, [list, isOpenDisclosure])

  return (
    <div className="-mt-4 relative">
      <DragDropContext
        onDragEnd={onDragEnd(list, (list) => {
          onChange(list)
          setIsDrag(false)
        })}
        onBeforeCapture={() => setIsDrag(true)}
      >
        <Droppable droppableId="droppableItem">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} className={isDrag ? 'mb-[3.25rem]' : ''} ref={provided.innerRef}>
              {list?.map((item, idx) => {
                return (
                  <div key={item?.id || idx} className="relative">
                    <Draggable index={idx} key={item?.id || idx} draggableId={`draggableItem-${item?.id || idx}`} isDragDisabled={!canDrag}>
                      {(provided, { isDragging }) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            position: isDragging ? 'absolute' : '',
                            top: -8,
                            left: 0
                          }}
                        >
                          <div className="clean h-4" />
                          {children({
                            idx,
                            item,
                            canDrag,
                            dragHandleProps: provided.dragHandleProps,
                            onOpenDisclosure: (open) => onOpenDisclosure(idx, open)
                          })}
                        </div>
                      )}
                    </Draggable>
                  </div>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default React.memo(DragableList)
