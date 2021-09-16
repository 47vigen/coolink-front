import React from 'react'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'

// ** UI
import { Icon } from '../Tools'

// ** Utils
import classNames from '../../utils/classNames'

function Render({
  page: {
    slug,
    customize: { color }
  },
  sections
}) {
  return (
    <div className="parts my-4 space-y-4">
      {sections.map((section, index) => (
        <RenderSection key={index} index={index} item={section} color={color} slug={slug} />
      ))}
    </div>
  )
}

export const RenderSection = React.memo(function Component({ index, item, color, slug, notBlured }) {
  return (
    <section className={`part-${index + 1}`}>
      {item.title ? <h3 className="text-center text-base mb-2 pt-2">{item.title}</h3> : null}
      <RenderInsideOfSection key={item.id} item={item} color={color} slug={slug} notBlured={notBlured} />
    </section>
  )
})

const RenderInsideOfSection = React.memo(function Component({ item: { type, ...data }, color, slug, notBlured }) {
  switch (type) {
    case 'LINKS':
      return (
        <div className="links space-y-2">
          {data.links?.map(({ url, title }, index) => (
            <LinkItem notBlured={notBlured} key={index} url={url} color={color} icon="redo">
              {title}
            </LinkItem>
          ))}
        </div>
      )

    case 'TEXT':
      return (
        <p
          className={`text bg-body bg-opacity-5 ${
            notBlured ? '' : 'backdrop-filter backdrop-blur-md'
          } p-2 leading-6 border border-opacity-10 border-${color} rounded-lg`}
        >
          {data.text}
        </p>
      )

    case 'CONTACTS':
      return (
        <div className="contact space-y-2">
          {data.contacts?.mobile ? (
            <LinkItem notBlured={notBlured} url={`tel:${data.contacts.mobile}`} color={color} icon="smartphone" noHttp>
              شماره همراه
            </LinkItem>
          ) : null}
          {data.contacts?.phone ? (
            <LinkItem notBlured={notBlured} url={`tel:${data.contacts.phone}`} color={color} icon="building" noHttp>
              شماره تلفن‌ثابت
            </LinkItem>
          ) : null}
          {data.contacts?.email ? (
            <LinkItem notBlured={notBlured} url={`mailto:${data.contacts.email}`} color={color} icon="envelope" noHttp>
              ایمیل
            </LinkItem>
          ) : null}
          {data.contacts?.fax ? (
            <LinkItem notBlured={notBlured} url={`fax:${data.contacts.fax}`} color={color} icon="print" noHttp>
              فکس
            </LinkItem>
          ) : null}
        </div>
      )

    case 'MESSANGERS':
      return (
        <div className="contact space-y-2">
          {data.messengers?.telegram ? (
            <LinkItem notBlured={notBlured} url={`https://t.me/${data.messenger.telegram}`} color={color} icon="smartphone">
              تلگرام
            </LinkItem>
          ) : null}
          {data.messengers?.whatsapp ? (
            <LinkItem notBlured={notBlured} url={`https://wa.me/${data.messenger.whatsapp}`} color={color} icon="building">
              واتساپ
            </LinkItem>
          ) : null}
          {data.messengers?.twitter ? (
            <LinkItem notBlured={notBlured} url={`https://twitter.com/${data.messenger.twitter}`} color={color} icon="envelope">
              توییتر
            </LinkItem>
          ) : null}
          {data.messengers?.youtube ? (
            <LinkItem notBlured={notBlured} url={data.messengers.youtube} color={color} icon="print">
              یوتیوب
            </LinkItem>
          ) : null}
          {data.messengers?.linkedin ? (
            <LinkItem notBlured={notBlured} url={data.messengers.linkedin} color={color} icon="print">
              لینکدین
            </LinkItem>
          ) : null}
        </div>
      )

    case 'LOCATIONS':
      return (
        <div className="links space-y-2">
          {data.locations?.map(({ url, title }, index) => (
            <LinkItem notBlured={notBlured} key={index} url={url} color={color} icon="location">
              {title}
            </LinkItem>
          ))}
        </div>
      )

    case 'FAQ':
      return (
        <div className="faq space-y-2">
          {data.faq?.map(({ question, answer }, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex w-full justify-between items-center transition duration-300 hover:opacity-70 bg-${color} bg-opacity-5 text-${color} rounded-lg py-2 px-4 ${
                      notBlured ? '' : 'backdrop-filter backdrop-blur-md'
                    }`}
                  >
                    {question}
                    <Icon
                      name="angle-small-left"
                      className={classNames(`text-${color} text-base transition-all duration-300`, open ? 'transform -rotate-90' : '')}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`text bg-body bg-opacity-5 ${
                      notBlured ? '' : 'backdrop-filter backdrop-blur-md'
                    } p-2 leading-6 border border-opacity-10 border-${color} rounded-lg`}
                  >
                    {answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      )

    case 'IG_FEEDS_LINK':
      return (
        <LinkItem notBlured={notBlured} url={`/${slug}/feeds-link`} noHttp color={color} icon="link">
          لینک پست ها
          <Icon name="angle-small-left" className="flex-1 text-left text-base mr-2" />
        </LinkItem>
      )

    case 'IG_FEEDS_DOWNLOAD':
      return (
        <LinkItem notBlured={notBlured} url={`/${slug}/feeds-download`} noHttp color={color} icon="download">
          دانلود پست ها
          <Icon name="angle-small-left" className="flex-1 text-left text-base mr-2" />
        </LinkItem>
      )

    default:
      return null
  }
})

const LinkItem = React.memo(function Component({ children, color, url, noHttp, icon, className, notBlured }) {
  return (
    <Link href={!url.includes('http') && !noHttp ? `http://${url} ` : url}>
      <a
        className={classNames(
          `flex items-center transition duration-300 hover:opacity-70 bg-${color} bg-opacity-5 text-${color} rounded-lg py-2 px-4`,
          notBlured ? '' : 'backdrop-filter backdrop-blur-md',
          className
        )}
      >
        {icon ? <Icon name={icon} className="text-base ml-2" /> : null}
        {children}
      </a>
    </Link>
  )
})

export default React.memo(Render)
