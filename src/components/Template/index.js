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
import deepCleaner from '../../utils/deepCleaner'

// ** Graphql
import { useMutation } from '@apollo/client'
import { SHOW_PAGE_WITH_SECTIONS, SHOW_SECTIONS } from '../../graphql/queries'
import { DESTROY_SECTION, UPDATE_INSERT_MANY_SECTIONS, UPDATE_PAGE } from '../../graphql/mutations'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result.map((item, index) => ({ ...item, position: index }))
}

function Edit({ page: pageData, sections: sectionsData }) {
  const [page, setPage] = React.useState(pageData)
  const [updatePage] = useMutation(UPDATE_PAGE, {
    onCompleted: ({ updatePage }) => setPage(deepCleaner(updatePage)),
    update: async (cache, mutationResult) => {
      const data = mutationResult.data.updatePage
      const query = cache.readQuery({
        query: SHOW_PAGE_WITH_SECTIONS,
        variables: { page: pageData.slug }
      })
      cache.writeQuery({
        query: SHOW_PAGE_WITH_SECTIONS,
        variables: { slug: pageData.slug },
        data: { showPageWithSections: { ...query?.showPageWithSections, page: data } }
      })
    }
  })
  const [sections, setSections] = React.useState(sectionsData)
  const [updateInsertSections, { loading: updateInsertSectionsLoading }] = useMutation(UPDATE_INSERT_MANY_SECTIONS, {
    variables: {
      sections: sections.map(({ id, ...section }) => ({
        id,
        sectionInput: { ...section, ...deepCleaner({ items: section.items, customize: section.customize }, 'id'), page: pageData.id }
      }))
    },
    onCompleted: ({ updateInsertManySections }) => setSections(deepCleaner(updateInsertManySections)),
    update: (cache, mutationResult) => {
      const data = mutationResult.data.updateInsertManySections
      const query = cache.readQuery({
        query: SHOW_PAGE_WITH_SECTIONS,
        variables: { page: pageData.slug }
      })
      cache.writeQuery({
        query: SHOW_PAGE_WITH_SECTIONS,
        variables: { slug: pageData.slug },
        data: { showPageWithSections: { ...query?.showPageWithSections, sections: data } }
      })
      // cache.writeQuery({
      //   query: SHOW_SECTIONS,
      //   variables: { page: pageData.id },
      //   data: { showSection: data }
      // })
    }
  })
  const [destroySection] = useMutation(DESTROY_SECTION, {
    update: (cache, mutationResult) => {
      const data = mutationResult.data.destroySection
      // const querySections = cache.readQuery({
      //   query: SHOW_SECTIONS,
      //   variables: { page: pageData.id }
      // })
      // cache.writeQuery({
      //   query: SHOW_SECTIONS,
      //   variables: { page: pageData.id },
      //   data: { showSection: querySections.showSection?.filter((section) => section.id !== data.id) }
      // })
      const queryPage = cache.readQuery({
        query: SHOW_PAGE_WITH_SECTIONS,
        variables: { page: pageData.slug }
      })
      cache.writeQuery({
        query: SHOW_PAGE_WITH_SECTIONS,
        variables: { slug: pageData.slug },
        data: {
          showPageWithSections: {
            ...queryPage?.showPageWithSections,
            sections: queryPage?.showPageWithSections?.sections?.filter((section) => section.id !== data.id)
          }
        }
      })
    }
  })

  // ** Edit Info
  const [isOpenEditInfo, setIsOpenEditInfo] = React.useState(false)
  const closeEditInfoModal = React.useCallback(() => setIsOpenEditInfo(false), [setIsOpenEditInfo])
  const openEditInfoModal = React.useCallback(() => setIsOpenEditInfo(true), [setIsOpenEditInfo])
  const onEditInfo = React.useCallback(
    ({ id, ...pageInput }) => updatePage(deepCleaner({ variables: { id, pageInput: pageInput } }, '__typename')).then(() => setIsOpenEditInfo(false)),
    [updatePage, setIsOpenEditInfo]
  )

  // ** Edit Style
  const [isOpenEditStyle, setIsOpenEditStyle] = React.useState(false)
  const closeEditStyleModal = React.useCallback(() => setIsOpenEditStyle(false), [setIsOpenEditStyle])
  const openEditStyleModal = React.useCallback(() => setIsOpenEditStyle(true), [setIsOpenEditStyle])
  const onEditStyle = React.useCallback(
    async (values) => {
      const { id, ...pageIdless } = page
      await updatePage({ variables: { id: pageData.id, pageInput: { ...pageIdless, style: values } } })
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
      const defaultValue = () => {
        switch (type) {
          case 'igFeedsLink':
            return { items: [{ key: 'لینک پست ها', options: [{ key: 'icon', value: 'link' }] }] }

          case 'igFeedsDownload':
            return { items: [{ key: 'لینک پست ها', options: [{ key: 'icon', value: 'download' }] }] }

          default:
            return {}
        }
      }
      setSections((prev) => [
        ...prev,
        {
          type,
          id: uuid(),
          position: prev.length,
          ...defaultValue()
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
          console.log(error)
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
      className={classNames(
        'h-full p-4 rounded-2xl overflow-hidden',
        page.style?.background?.color ? `bg-${page.style.background.color} bg-cover bg-top` : ''
      )}
      style={{
        backgroundImage: page.style?.background?.url ? `url('${getImgSrc(page.style.background.url)}')` : null
      }}
    >
      <PageHeader page={page} onEdit={openEditInfoModal} />
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
      <div className="flex space-s-2">
        <Button
          bordered
          icon="eye"
          type="secondary"
          link={`/${pageData.slug}`}
          className="px-3 text-base option-btn bg-body bg-opacity-10 backdrop-filter backdrop-blur-md group"
        />
        <Button bordered className="flex-1 bg-body bg-opacity-10 backdrop-filter backdrop-blur-md" onClick={openAddModal}>
          ایجاد آپشن جدید
        </Button>
        <Button
          bordered
          icon="brush"
          type="secondary"
          onClick={openEditStyleModal}
          className="px-3 text-base option-btn bg-body bg-opacity-10 backdrop-filter backdrop-blur-md group"
        />
      </div>
      <Button className="w-full mt-2" onClick={() => updateInsertSections()} loading={updateInsertSectionsLoading}>
        ذخیره
      </Button>
      <EditStyle
        pk={page?.pk}
        style={page?.style}
        isOpenEditStyle={isOpenEditStyle}
        closeEditStyleModal={closeEditStyleModal}
        onEditStyle={onEditStyle}
      />
      <EditInfo page={page} isOpenEditInfo={isOpenEditInfo} closeEditInfoModal={closeEditInfoModal} onEditInfo={onEditInfo} />
      <AddItem isOpenAdd={isOpenAdd} closeAddModal={closeAddModal} onAddItem={onAddItem} />
      <EditItem
        page={page}
        isOpenEdit={isOpenEdit}
        closeEditModal={closeEditModal}
        onEditItem={onEditItem}
        currentEditItem={currentEditItem}
        onRemoveItem={onRemoveItem}
      />
    </div>
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
              <RenderSection item={item} customize={customize} index={index} slug={slug} notBlured={open} />
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
