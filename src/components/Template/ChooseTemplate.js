import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** UI
import { Button, Icon, Link, Tab, Tabs } from '../Tools'
import TemplateItem from './TemplateItem'

// ** Graphql
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_PAGE } from '../../graphql/mutations'
import { SHOW_PAGE_WITH_SECTIONS_BY_SLUG, SHOW_TEMPLATES } from '../../graphql/queries'

// ** Utils
import deepMerger from '../../utils/deepMerger'
import deepCleaner from '../../utils/deepCleaner'
import { getSimilarColor } from '../../utils/getColors'

function ChooseTemplate({ page: { slug, id, ...page }, dominantColor }) {
  const router = useRouter()
  const { data: templates } = useQuery(SHOW_TEMPLATES, { fetchPolicy: 'cache-and-network' })
  const [updatePage] = useMutation(UPDATE_PAGE, {
    update: async (cache, mutationResult) => {
      const data = mutationResult.data.updatePage
      const query = await cache.readQuery({
        query: SHOW_PAGE_WITH_SECTIONS_BY_SLUG,
        variables: { slug }
      })
      cache.writeQuery({
        query: SHOW_PAGE_WITH_SECTIONS_BY_SLUG,
        variables: { slug },
        data: { showPageWithSectionsBySlug: { ...query?.showPageWithSectionsBySlug, page: data } }
      })
    }
  })

  const defaultTemplates = React.useMemo(() => {
    const colors =
      Object.values(dominantColor)
        .filter((color) => color)
        .map((color) => getSimilarColor(color).class) || []
    return Array.from(new Set(colors))?.map((color) => deepMerger(page, { style: { customize: { type: 'default', color } } }))
  }, [dominantColor, page])

  const onSelect = React.useCallback(
    ({ style, avatar }) =>
      async () => {
        toast.loading('در حال تنظیم قالب ...', { id: 'template' })
        const pageInput = deepCleaner(deepMerger({ slug, ...page }, { style, avatar: { ...avatar, url: page?.avatar?.url } }))
        await updatePage({ variables: { id, pageInput } })
        toast.success('کولینک شما آمادس!', { id: 'template' })
        router.push(`/dashboard/edit/${slug}`)
      },
    [id, page, router, slug, updatePage]
  )

  return (
    <Tabs
      labels={[
        <>
          <Icon name="link" className="px-2 md:ps-0" />
          <span className="hidden md:!inline-block">پیشنهاد کولینک</span>
        </>,
        <>
          <Icon name="flame" className="px-2 md:ps-0" />
          <span className="hidden md:!inline-block">ترند کاربران</span>
        </>,
        <>
          <Icon name="clock" className="px-2 md:ps-0" />
          <span className="hidden md:!inline-block">اخرین بروز شده ها</span>
        </>
      ]}
      extera={<Button link={`/dashboard/edit/${slug}`}>خودتان بسازید؟</Button>}
    >
      <Tab className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultTemplates.map((template, idx) => (
          <TemplateItem key={`template-${idx}`} {...template} onSelect={onSelect(template)} />
        ))}
      </Tab>
      <Tab className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.showTrendTemplates?.map(({ id, ...template }) => (
          <TemplateItem key={id} {...template} onSelect={onSelect(template)} />
        ))}
      </Tab>
      <Tab className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.showLastTemplates?.map(({ id, ...template }) => (
          <TemplateItem key={id} {...template} onSelect={onSelect(template)} />
        ))}
      </Tab>
    </Tabs>
  )
}

export default React.memo(ChooseTemplate)
