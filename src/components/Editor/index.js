import React from 'react'
import { v4 as uuid, validate as isUuid } from 'uuid'

// ** Graphql
import { useMutation } from '@apollo/client'
import { SHOW_PAGE_WITH_SECTIONS, SHOW_SECTIONS } from '../../graphql/queries'
import { DESTROY_SECTION, UPDATE_INSERT_MANY_SECTIONS, UPDATE_PAGE } from '../../graphql/mutations'

//** Template
import AddItem from '../Template/AddItem'
import EditInfo from '../Template/EditInfo'
import EditItem from '../Template/EditItem'
import EditStyle from '../Template/EditStyle'

// ** Utils
import deepCleaner from '../../utils/deepCleaner'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result.map((item, index) => ({ ...item, position: index }))
}

function Editor({ page: pageData, sections: sectionsData, children }) {
  const [page, setPage] = React.useState(pageData)
  const [isNeedSave, setIsNeedSave] = React.useState(false)
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
    onCompleted: ({ updateInsertManySections }) => {
      setSections(deepCleaner(updateInsertManySections))
      setIsNeedSave(false)
    },
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
    ({ id, ...pageInput }) => updatePage({ variables: { id, pageInput: pageInput } }).then(() => setIsOpenEditInfo(false)),
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
          case 'locations':
            return {
              items: [
                { key: 'lat', value: '' },
                { key: 'lng', value: '' },
                { key: 'label', value: 'باز کردن در نقشه', options: [{ key: 'icon', value: 'marker' }] }
              ]
            }

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
      setIsNeedSave(true)
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
      setIsNeedSave(true)
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
      setIsNeedSave(true)
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
    setIsNeedSave(true)
  }

  return (
    <>
      {children({
        page,
        sections,
        isNeedSave,
        save: updateInsertSections,
        loading: updateInsertSectionsLoading,
        onDragEnd,
        openEditInfoModal,
        openEditStyleModal,
        openAddModal,
        openEditModal,
        isOpenAdd,
        onAddItem,
        closeAddModal
      })}
      <AddItem isOpenAdd={isOpenAdd} closeAddModal={closeAddModal} onAddItem={onAddItem} />
      <EditStyle
        pk={page?.pk}
        style={page?.style}
        isOpenEditStyle={isOpenEditStyle}
        closeEditStyleModal={closeEditStyleModal}
        onEditStyle={onEditStyle}
      />
      <EditInfo page={page} isOpenEditInfo={isOpenEditInfo} closeEditInfoModal={closeEditInfoModal} onEditInfo={onEditInfo} />
      <EditItem
        page={page}
        isOpenEdit={isOpenEdit}
        closeEditModal={closeEditModal}
        onEditItem={onEditItem}
        currentEditItem={currentEditItem}
        onRemoveItem={onRemoveItem}
      />
    </>
  )
}

export default Editor
