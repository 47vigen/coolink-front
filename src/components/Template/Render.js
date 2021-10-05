import React from 'react'
import { Disclosure } from '@headlessui/react'

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

function Render({ page: { slug, style }, sections }) {
  return (
    <div className="parts my-4 space-y-2">
      {sections.map((section, index) => (
        <RenderSection key={index} index={index} item={section} customize={style?.customize} slug={slug} />
      ))}
    </div>
  )
}

export const RenderSection = React.memo(function Component({ index, item, customize, slug }) {
  return (
    <section className={classNames(`part-${index + 1} grid-cols-${item.arrangement || '1'}`, 'grid gap-2')}>
      {item.title ? <h3 className="text-center text-base pt-2 col-span-full">{item.title}</h3> : null}
      <RenderInsideOfSection key={item.id} item={item} customize={customize} slug={slug} />
    </section>
  )
})

const RenderInsideOfSection = React.memo(function Component({ item: { type, ...data }, customize, slug }) {
  const custom = React.useCallback((idx) => (data.customized ? data.customize[idx] || {} : {}), [data.customized, data.customize])

  if (!data.items?.length) return null
  switch (type) {
    case 'links':
      return data.items?.map(({ id, key, value, ...item }, index) => (
        <LinkItem key={id} url={value} customize={{ ...customize, ...custom(0) }} options={item?.options} arrangement={data.arrangement}>
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
          <LinkItem key={id} url={url()} customize={{ ...customize, ...custom(0) }} options={item?.options} arrangement={data.arrangement}>
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
              <Disclosure.Panel as={Element} customize={{ ...textCustomize(customize), ...custom(1) }} className="text p-2 leading-6">
                {value}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))

    case 'igFeedsLink':
      return (
        <LinkItem url={`/${slug}/feeds-link`} noHttp customize={{ ...customize, ...custom(0) }} options={data.items[0]?.options}>
          {data.items[0]?.key}
        </LinkItem>
      )

    case 'igFeedsDownload':
      return (
        <LinkItem url={`/${slug}/feeds-download`} noHttp customize={{ ...customize, ...custom(0) }} options={data.items[0]?.options}>
          {data.items[0]?.key}
        </LinkItem>
      )

    default:
      return null
  }
})

const LinkItem = React.memo(function Component({ children, customize, url, noHttp, emojiOrIcon, options = [], className, arrangement, ...props }) {
  const emojiIcon = React.useMemo(
    () => (emojiOrIcon ? emojiOrIcon : options && ['icon', 'emoji'].includes(options[0]?.key) ? options[0] : null),
    [emojiOrIcon, options]
  )
  const quadrupleArrangement = React.useMemo(() => arrangement == 4, [arrangement])
  return (
    <Element
      tag={SimpleLink}
      customize={customize}
      href={!url.includes('http') && !noHttp ? `http://${url} ` : url}
      className={classNames('flex items-center py-2 px-4', quadrupleArrangement ? 'justify-center' : '', className)}
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
