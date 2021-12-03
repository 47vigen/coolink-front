import React from 'react'
import Fuse from 'fuse.js'
import { Emoji } from 'emoji-mart'
import { Form, Formik } from 'formik'
import { Tab } from '@headlessui/react'
import { AutoSizer, Grid } from 'react-virtualized'

// ** Data
import styles from './Icon/icon.module.css'
import emojis from 'emoji-mart/data/apple.json'

// ** UI
import { Field, Icon } from '.'

// ** Utils
import classNames from '../../utils/classNames'
import debounce from '../../utils/debounce'

const ITEM_SIZE = 6

const ICONS = {
  brands: Object.keys(styles).filter((key) => key.includes('brand-')),
  common: Object.keys(styles).filter((key) => !key.includes('brand-') && key !== 'base')
}
const SKINS = ['bg-[#ffc93a]', 'bg-[#fadcbc]', 'bg-[#e0bb95]', 'bg-[#bf8f68]', 'bg-[#9b643d]', 'bg-[#594539]']

const TabUnderLine = React.memo(function Component({ children }) {
  return (
    <Tab
      type="button"
      className={({ selected }) =>
        classNames(
          'px-2 flex items-center',
          selected
            ? 'font-bold text-primary relative after:block after:absolute after:start-2 after:end-2 after:-bottom-2 after:h-0.5 after:bg-primary after:rounded-t-full'
            : ''
        )
      }
    >
      {({ selected }) => (typeof children === 'function' ? children({ selected }) : children)}
    </Tab>
  )
})

export const EmojiSelector = React.memo(function Component({ onSelect }) {
  const [skin, setSkin] = React.useState(1)
  const [searched, setSearched] = React.useState([])

  const fuse = React.useMemo(() => {
    const all = []
    all.push(
      ...Object.keys(emojis.emojis).map((emoji) => ({
        type: 'emoji',
        name: emoji,
        keyWords: [...(emojis.emojis[emoji]?.j || emojis.emojis[emoji]?.a?.split(' ')), ...emoji.split('_')]
      }))
    )

    all.push(
      ...Object.keys(styles).map((icon) => {
        if (icon === 'base') return null
        return {
          type: 'icon',
          name: icon,
          keyWords: icon.split('-')
        }
      })
    )
    return new Fuse(all, {
      keys: ['keyWords'],
      minMatchCharLength: 3,
      threshold: 0.2
    })
  }, [])
  const onSearch = React.useMemo(() => debounce((title) => setSearched(fuse.search(title?.toLowerCase() || '') || []), 500), [fuse])

  if (typeof document !== 'undefined') {
    return (
      <Tab.Group as="div" dir="rtl" className="bg-white border border-t-0 border-line rounded-b-lg px-4 py-2 -mt-4">
        <Tab.List className="flex self-stretch -mx-2 pb-2 mb-4 border-b border-line overflow-x-auto hide-scrollbar">
          <TabUnderLine>
            <Icon name="search" className="text-lg" />
          </TabUnderLine>
          <TabUnderLine>آیکون</TabUnderLine>
          <TabUnderLine>
            {({ selected }) => (
              <>
                شکلک
                <div
                  className={classNames(
                    'border-line rounded-full transition-all overflow-hidden py-1',
                    selected ? 'w-[8rem] p-1 border ms-2' : 'w-0 p-0 ms-0'
                  )}
                >
                  <div className="flex space-s-1 min-w-[8rem]">
                    {SKINS.map((skinType, idx) => (
                      <button
                        key={skinType}
                        type="button"
                        className={classNames(
                          skinType,
                          'flex w-4 h-4 rounded-full',
                          skin === idx + 1
                            ? 'items-center justify-center relative after:block after:absolute after:w-1.5 after:h-1.5 after:bg-content after:rounded-full'
                            : ''
                        )}
                        onClick={() => setSkin(idx + 1)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabUnderLine>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="w-full">
            <Formik initialValues={{ title: '' }} onSubmit={(v) => onSearch(v.title)}>
              {() => (
                <Form className="w-full" onChange={(e) => onSearch(e.target?.value)}>
                  <Field name="title" placeholder="جستجو کنید ..." className="focus:text-content" errorless />
                  <div className="grid grid-cols-6 gap-1 pe-2 -ms-2 my-2 max-h-48 smooth-scrollbar overflow-y-auto overflow-x-hidden">
                    {searched.map(({ item: { type, name } }, idx) => (
                      <button
                        type="button"
                        key={`${type}-${name}`}
                        className="transition hover:bg-line p-1 rounded-full w-14 h-14"
                        onClick={() => onSelect({ type, name })}
                      >
                        <EmojiOrIcon size={32} type={type} name={name} className={classNames('text-2xl')} />
                      </button>
                    ))}
                  </div>
                </Form>
              )}
            </Formik>
          </Tab.Panel>
          <Tab.Panel>
            <Tab.Group as="div">
              <Tab.List className="flex self-stretch -mx-2 pb-2 mb-4 border-b border-line overflow-x-auto hide-scrollbar">
                {Object.keys(ICONS).map((category) => (
                  <TabUnderLine key={category}>
                    <EmojiOrIcon size={20} type="icon" name={ICONS[category][0]} />
                  </TabUnderLine>
                ))}
              </Tab.List>
              <Tab.Panels>
                {Object.keys(ICONS).map((category) => (
                  <Tab.Panel key={category}>
                    <div className={classNames(category, 'min-h-[12rem] -mx-2')}>
                      <AutoSizer>
                        {({ height, width }) => (
                          <Grid
                            rowCount={Math.ceil(ICONS[category].length / ITEM_SIZE)}
                            columnCount={ITEM_SIZE}
                            height={height}
                            rowHeight={width / (ITEM_SIZE + 0.5)}
                            columnWidth={width / (ITEM_SIZE + 0.5)}
                            className="smooth-scrollbar"
                            cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                              const index = rowIndex * ITEM_SIZE + columnIndex
                              const icon = ICONS[category][index]
                              return icon ? (
                                <button
                                  key={key}
                                  type="button"
                                  className="transition hover:bg-line p-1 rounded-full w-9 h-9"
                                  onClick={() => onSelect({ type: 'icon', name: icon })}
                                  style={style}
                                >
                                  <EmojiOrIcon type="icon" name={icon} className="text-2xl" />
                                </button>
                              ) : null
                            }}
                            width={width}
                          />
                        )}
                      </AutoSizer>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </Tab.Panel>
          <Tab.Panel>
            <Tab.Group as="div">
              <Tab.List className="flex self-stretch -mx-2 pb-2 mb-4 border-b border-line overflow-x-auto hide-scrollbar">
                {emojis.categories.map((category) => (
                  <TabUnderLine key={category.name}>
                    <EmojiOrIcon size={20} type="emoji" name={category.emojis[0]} className="pt-1" />
                  </TabUnderLine>
                ))}
              </Tab.List>
              <Tab.Panels>
                {emojis.categories.map((category) => (
                  <Tab.Panel key={category.name}>
                    <div className={classNames(category.name, 'min-h-[12rem] -mx-2')}>
                      <AutoSizer>
                        {({ height, width }) => (
                          <Grid
                            rowCount={Math.ceil(category.emojis.length / ITEM_SIZE)}
                            columnCount={ITEM_SIZE}
                            height={height}
                            rowHeight={width / (ITEM_SIZE + 0.5)}
                            columnWidth={width / (ITEM_SIZE + 0.5)}
                            className="smooth-scrollbar"
                            cellRenderer={({ columnIndex, rowIndex, key, style }) => {
                              const index = rowIndex * ITEM_SIZE + columnIndex
                              const emoji = category.emojis[index]
                              return emoji ? (
                                <button
                                  key={key}
                                  type="button"
                                  className="transition hover:bg-line p-1 rounded-full w-9 h-9"
                                  onClick={() => onSelect({ type: 'emoji', name: `${emoji}|${skin}` })}
                                  style={style}
                                >
                                  <EmojiOrIcon size={32} type="emoji" name={`${emoji}|${skin}`} />
                                </button>
                              ) : null
                            }}
                            width={width}
                          />
                        )}
                      </AutoSizer>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    )
  }

  return null
})

export const EmojiOrIcon = React.memo(function Component({ type, name, size = 20, className, ...props }) {
  switch (type) {
    case 'emoji':
      return (
        <i className={('max-w-min max-h-[min-content]', classNames(name.split('|')[0], className))} {...props}>
          <Emoji sheetSize={32} size={size} set="apple" emoji={name.split('|')[0]} skin={Number(name.split('|')[1]) || 1} />
        </i>
      )
    case 'icon':
      return (
        <Icon
          name={name}
          className={className}
          style={{
            width: size,
            height: size
          }}
          {...props}
        />
      )

    default:
      return null
  }
})
