import React from 'react'
import { Disclosure, Transition } from '@headlessui/react'

// ** UI
import { Element, Icon } from '../Tools'
import { SimpleLink } from '../Tools/Link'
import { EmojiOrIcon } from '../Tools/EmojiPicker'

// ** Utils
import classNames from '../../utils/classNames'
import onDeepLink from '../../utils/onDeepLink'

// ** Configs
import { brands } from '../../config'

import { textCustomize } from './Customize'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('../Tools/Map'), {
  ssr: false
})

function Render({ page: { slug, style }, sections, sendStatistic = async () => null }) {
  return (
    <div className="parts my-4 space-y-2">
      {sections.map((section, index) => (
        <RenderSection key={section.id || index} slug={slug} index={index} item={section} style={style} sendStatistic={sendStatistic} />
      ))}
    </div>
  )
}

export const RenderSection = React.memo(function Component({ index, item, style, slug, sendStatistic }) {
  return (
    <section className={classNames(`part-${index + 1} grid-cols-${item.arrangement || '1'}`, 'grid gap-2')}>
      {item.title ? (
        <h3 className={classNames('text-center text-base pt-2 col-span-full', `text-${style?.titles?.color || 'content'}`)}>{item.title}</h3>
      ) : null}
      <RenderInsideOfSection
        key={item.id}
        item={item}
        slug={slug}
        customize={style?.customize}
        sendStatistic={(id) => sendStatistic('click', item.id, id)}
      />
    </section>
  )
})

const RenderInsideOfSection = React.memo(function Component({ item: { type, ...data }, customize, slug, sendStatistic }) {
  const custom = React.useCallback((idx) => (data.customized ? data.customize[idx] || {} : {}), [data.customized, data.customize])

  if (!data.items?.length) return null

  switch (type) {
    case 'links':
      return data.items?.map(({ id, key, value, ...item }, index) => (
        <LinkItem
          key={id}
          url={value}
          options={item?.options}
          arrangement={data.arrangement}
          sendStatistic={() => sendStatistic(id)}
          customize={{ ...customize, ...custom(0) }}
        >
          {key}
        </LinkItem>
      ))

    case 'text':
      return (
        <Element as="p" customize={{ ...textCustomize(customize), ...custom(0) }} className="text p-2 leading-6">
          {data.items[0]?.value}
        </Element>
      )

    case 'contacts':
      return data.items?.map(({ id, type, key, value, ...item }, index) => {
        const url = () => {
          switch (type) {
            case 'mobile':
              return `tel:${value}`
            case 'phone':
              return `tel:${value}`
            case 'email':
              return `mailto:${value}`
            case 'fax':
              return `fax:${value}`

            default:
              return value
          }
        }
        return (
          <LinkItem
            key={id}
            url={url()}
            options={item?.options}
            arrangement={data.arrangement}
            sendStatistic={() => sendStatistic(id)}
            customize={{ ...customize, ...custom(0) }}
          >
            {key}
          </LinkItem>
        )
      })

    case 'services':
      return data.items?.map(({ id, type, key, value, ...item }, index) => {
        const brandStyle = item.options[1].value == 1 ? { type: 'gradient', second: 'white', ...brands[type] } : {}

        return (
          <LinkItem
            key={id}
            url={value}
            options={item?.options}
            arrangement={data.arrangement}
            {...onDeepLink(type, value)}
            sendStatistic={() => sendStatistic(id)}
            customize={{ ...customize, ...custom(0), ...brandStyle }}
          >
            {key}
          </LinkItem>
        )
      })

    case 'locations':
      return (
        <>
          <Map
            zoom={18}
            key={data.items[0]?.value + data.items[1]?.value}
            position={[data.items[0]?.value, data.items[1]?.value]}
            className={classNames('min-h-[12rem]', `rounded-${customize.rounded || 'lg'}`)}
          />
          <LinkItem
            customize={{ ...customize, ...custom(0) }}
            url={`https://www.google.com/maps/@${data.items[0]?.value},${data.items[1]?.value},18z`}
            deep-link={`comgooglemapsurl://www.google.com/maps/@${data.items[0]?.value},${data.items[1]?.value},18z`}
            deep-link-ad={`intent://www.google.com/maps/@${data.items[0]?.value},${data.items[1]?.value},18z#Intent;package=com.google.android.apps.maps;scheme=https;end`}
            options={data.items[2]?.options}
          >
            {data.items[2]?.value}
          </LinkItem>
        </>
      )

    case 'faq':
      return data.items?.map(({ id, key, value }) => (
        <Disclosure key={id}>
          {({ open }) => (
            <>
              <Disclosure.Button
                as={Element}
                tag="button"
                customize={{ ...customize, ...custom(0) }}
                className="flex w-full justify-between items-center py-2 px-4"
              >
                {key}
                <Icon
                  name="angle-small-left"
                  className={classNames('text-base transform transition-transform duration-300', open ? '-rotate-90' : '')}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                className="origin-top"
                enter="transition duration-75 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel as={Element} customize={{ ...textCustomize(customize), ...custom(1) }} className="origin-top text p-2 leading-6">
                  {value}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))

    case 'igFeedsLink':
      return (
        <LinkItem
          noHttp
          url={`/${slug}/feeds-link`}
          options={data.items[0]?.options}
          customize={{ ...customize, ...custom(0) }}
          sendStatistic={() => sendStatistic(data.items[0].id)}
        >
          {data.items[0]?.key}
        </LinkItem>
      )

    case 'igFeedsDownload':
      return (
        <LinkItem
          noHttp
          url={`/${slug}/feeds-download`}
          options={data.items[0]?.options}
          customize={{ ...customize, ...custom(0) }}
          sendStatistic={() => sendStatistic(data.items[0].id)}
        >
          {data.items[0]?.key}
        </LinkItem>
      )

    default:
      return null
  }
})

const LinkItem = React.memo(function Component({
  url,
  noHttp,
  children,
  customize,
  className,
  emojiOrIcon,
  arrangement,
  options = [],
  sendStatistic,
  onClick: onDefualtClick,
  ...props
}) {
  const emojiIcon = React.useMemo(
    () => (emojiOrIcon ? emojiOrIcon : options && ['icon', 'emoji'].includes(options[0]?.key) ? options[0] : null),
    [emojiOrIcon, options]
  )
  const quadrupleArrangement = React.useMemo(() => arrangement == 4, [arrangement])
  const href = React.useMemo(() => (!url.includes('http') && !noHttp ? `http://${url} ` : url).trim(), [url, noHttp])
  const onClick = React.useCallback(
    async (e) => {
      if (!noHttp) e.preventDefault()
      if (sendStatistic) sendStatistic()
      if (onDefualtClick) {
        onDefualtClick(e)
      } else if (!noHttp && typeof window !== 'undefined') {
        window.location = href
      }
    },
    [href, noHttp, onDefualtClick, sendStatistic]
  )

  return (
    <Element
      tag={SimpleLink}
      customize={customize}
      href={href}
      className={classNames('flex items-center py-2 px-4', quadrupleArrangement ? 'justify-center' : '', className)}
      onClick={onClick}
      {...props}
    >
      {emojiIcon ? (
        <span className={classNames('emoji-or-icon flex items-center', quadrupleArrangement ? '' : 'me-2')}>
          <EmojiOrIcon
            type={emojiIcon?.key}
            name={emojiIcon?.value}
            size={quadrupleArrangement ? 24 : 20}
            className={classNames('flex items-center justify-center', quadrupleArrangement ? 'text-lg' : 'text-base')}
          />
        </span>
      ) : null}
      {quadrupleArrangement ? null : children}
    </Element>
  )
})

export default React.memo(Render)
