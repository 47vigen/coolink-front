import React from 'react'
import { uuid, isUuid } from 'uuidv4'
import { Menu, Transition } from '@headlessui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// ** UI
import { Button, Icon } from '../Tools'
import PageHeader from '../Layout/Header/PageHeader'

// ** Template
import AddItem from './AddItem'
import EditItem from './EditItem'
import EditStyle from './EditStyle'
import EditInfo from './EditInfo'
import { RenderSection } from './Render'

// ** Utils
import classNames from '../../utils/classNames'
import { getImgSrc } from '../../utils/getImgSrc'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { SHOW_SECTIONS } from '../../graphql/queries'
import { DESTROY_SECTION, UPDATE_INSERT_MANY_SECTIONS, UPDATE_PAGE } from '../../graphql/mutations'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result.map((item, index) => ({ ...item, position: index }))
}

function Edit({ page: pageData }) {
  const [page, setPage] = React.useState(pageData)
  const [updatePage] = useMutation(UPDATE_PAGE, { onCompleted: ({ updatePage }) => setPage(updatePage) })
  const [sections, setSections] = React.useState([])
  const { loading: showSectionsLoading } = useQuery(SHOW_SECTIONS, {
    fetchPolicy: 'no-cache',
    variables: { page: pageData.id },
    onCompleted: ({ showSection }) => setSections(showSection)
  })
  const [updateInsertSections, { loading: updateInsertSectionsLoading }] = useMutation(UPDATE_INSERT_MANY_SECTIONS, {
    variables: { sections: sections.map(({ id, ...section }) => ({ id, sectionInput: { ...section, page: pageData.id } })) },
    onCompleted: ({ updateInsertManySections }) => setSections(updateInsertManySections)
  })
  const [destroySection] = useMutation(DESTROY_SECTION)

  // ** Edit Info
  const [isOpenEditInfo, setIsOpenEditInfo] = React.useState(false)
  const closeEditInfoModal = React.useCallback(() => setIsOpenEditInfo(false), [setIsOpenEditInfo])
  const openEditInfoModal = React.useCallback(() => setIsOpenEditInfo(true), [setIsOpenEditInfo])
  const onEditInfo = React.useCallback(
    ({ id, ...pageInput }) => updatePage({ variables: { id, pageInput } }).then(() => setIsOpenEditInfo(false)),
    [updatePage, setIsOpenEditInfo]
  )

  // ** Edit Style
  const [isOpenEditStyle, setIsOpenEditStyle] = React.useState(false)
  const closeEditStyleModal = React.useCallback(() => setIsOpenEditStyle(false), [setIsOpenEditStyle])
  const openEditStyleModal = React.useCallback(() => setIsOpenEditStyle(true), [setIsOpenEditStyle])
  const onEditStyle = React.useCallback(
    async (values) => {
      const { id, ...pageIdless } = page
      await updatePage({ variables: { id: pageData.id, pageInput: { ...pageIdless, customize: values } } })
      setIsOpenEditStyle(false)
    },
    [updatePage, pageData, page, setIsOpenEditStyle]
  )

  // ** Add Item
  const [isOpenAdd, setIsOpenAdd] = React.useState(false)
  const [newItemAdded, setNewItemAdded] = React.useState(false)
  const closeAddModal = React.useCallback(() => setIsOpenAdd(false), [setIsOpenAdd])
  const openAddModal = React.useCallback(() => setIsOpenAdd(true), [setIsOpenAdd])
  const onAddItem = React.useCallback(
    (type) => {
      setSections((prev) => [
        ...prev,
        {
          type,
          id: uuid(),
          position: prev.length
        }
      ])
      setIsOpenAdd(false)
      setNewItemAdded(true)
    },
    [setSections, setIsOpenAdd, setNewItemAdded]
  )

  // ** Edit Item
  const [isOpenEdit, setIsOpenEdit] = React.useState(false)
  const [currentEditItem, setCurrentEditItem] = React.useState({})
  const closeEditModal = React.useCallback(
    (unCheck) => {
      setIsOpenEdit(false)
      if (!unCheck && newItemAdded) {
        setSections((prev) => {
          const sections = [...prev]
          return sections.splice(0, sections.length - 1)
        })
      }
      setNewItemAdded(false)
    },
    [newItemAdded, setIsOpenEdit, setSections, setNewItemAdded]
  )
  const openEditModal = React.useCallback(
    (item) => {
      setIsOpenEdit(true)
      setCurrentEditItem(item)
    },
    [setIsOpenEdit, setCurrentEditItem]
  )
  const onEditItem = React.useCallback(
    (values) => {
      let currentSections = sections
      let index = currentSections.findIndex((item) => item.id === values.id)
      currentSections[index] = values
      setSections(currentSections)
      closeEditModal(true)
    },
    [sections, setSections, closeEditModal]
  )
  const onRemoveItem = React.useCallback(
    async (id) => {
      if (!isUuid(id)) {
        try {
          await destroySection({ variables: { id } })
        } catch (error) {
          return null
        }
      }
      setIsOpenEdit(false)
      setSections((prev) => prev.filter((item) => item.id !== id))
      setNewItemAdded(false)
    },
    [destroySection, setIsOpenEdit, setSections, setNewItemAdded]
  )

  React.useEffect(() => {
    if (newItemAdded) {
      setTimeout(() => {
        openEditModal(sections[sections.length - 1])
      }, 500)
    }
  }, [sections, newItemAdded, openEditModal])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const items = reorder(sections, result.source.index, result.destination.index)
    setSections(items)
  }

  return (
    <div
      className="h-full pt-11 pb-4 px-4 rounded-2xl"
      style={{
        backgroundImage: page.customize?.backgroundImage ? `url('${getImgSrc(page.customize.backgroundImage)}')` : null
      }}
    >
      <PageHeader page={page} onEdit={openEditInfoModal} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} className="space-y-4 my-4" ref={provided.innerRef}>
              {sections.map((item, index) => (
                <Draggable key={item.id} draggableId={`draggable-${item.id}`} index={index}>
                  {(provided, { isDragging }) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={provided.draggableProps.style}>
                      <Item
                        item={item}
                        color={page.customize?.color || 'primary'}
                        index={index}
                        slug={page.slug}
                        onEdit={() => openEditModal(item)}
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
      <div className="flex space-s-2">
        <Button bordered className="flex-1" onClick={openAddModal}>
          ایجاد آپشن جدید
        </Button>
        <Button type="secondary" bordered className="px-3" onClick={openEditStyleModal}>
          <Icon name="brush" className="text-base option-btn" />
        </Button>
      </div>
      <Button className="w-full mt-4" onClick={() => updateInsertSections()} loading={updateInsertSectionsLoading || showSectionsLoading}>
        ذخیره
      </Button>
      <EditStyle
        pk={page?.pk}
        customize={page?.customize}
        isOpenEditStyle={isOpenEditStyle}
        closeEditStyleModal={closeEditStyleModal}
        onEditStyle={onEditStyle}
      />
      <EditInfo page={page} isOpenEditInfo={isOpenEditInfo} closeEditInfoModal={closeEditInfoModal} onEditInfo={onEditInfo} />
      <AddItem isOpenAdd={isOpenAdd} closeAddModal={closeAddModal} onAddItem={onAddItem} />
      <EditItem
        isOpenEdit={isOpenEdit}
        closeEditModal={closeEditModal}
        onEditItem={onEditItem}
        currentEditItem={currentEditItem}
        onRemoveItem={onRemoveItem}
      />
    </div>
  )
}

const Item = React.memo(function Component({ index, slug, color, item, onEdit }) {
  return (
    <Menu as="div" className="relative text-right">
      <Menu.Button className="w-full">
        {({ open }) => (
          <div
            className={classNames(
              'z-30 w-full rounded-lg rounded-br-none border-dashed border-line transition ease-in-out duration-300',
              open ? 'bg-body border' : ''
            )}
          >
            <div
              className={classNames('transition ease-in-out duration-300', open ? 'transform -translate-y-3 -translate-x-3' : '')}
              style={{ pointerEvents: 'none' }}
            >
              <RenderSection item={item} color={color} index={index} slug={slug} notBlured={open} />
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
        <Menu.Items className="absolute bg-body rounded-b-lg -mt-1 z-40 right-0 w-max origin-top-right focus:outline-none">
          {({ open }) => (
            <div className="flex rounded-b-lg mt-1 border border-t-0 border-dashed border-line text-lg">
              <Menu.Item as="button" className="pb-1 pr-3 pl-1 pt-0" onClick={onEdit}>
                <Icon name="edit" />
              </Menu.Item>
              <Menu.Item>
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
