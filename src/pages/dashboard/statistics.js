import React from 'react'
import parser from 'ua-parser-js'
import Seo from '../../components/Tools/Seo'

// ** UI
import Dashboard from '../../components/Layout/Dashboard'
import { Listbox, Avatar, Button, Icon, Loader } from '../../components/Tools'

// ** Graphql
import { useLazyQuery, useQuery } from '@apollo/client'
import { SHOW_MY_PAGES, SHOW_STATISTICS_AND_SECTIONS_BY_PAGE } from '../../graphql/queries'

function Statistics(props) {
  const { data: pages, loading: pagesLoading } = useQuery(SHOW_MY_PAGES)
  const [selected, setSelected] = React.useState('')
  const [run, { data, loading }] = useLazyQuery(SHOW_STATISTICS_AND_SECTIONS_BY_PAGE, { fetchPolicy: 'cache-and-network' })

  React.useEffect(() => {
    if (pages?.showMyPages) {
      setSelected(pages.showMyPages[0])
      run({ variables: { page: pages.showMyPages[0]?.id } })
    }
  }, [pages, run])

  const renderPage = React.useCallback(
    ({ option: { id, title, subTitle, avatar }, selected }) => (
      <div className="space-y-2 text-start" key={id}>
        <div className="flex items-center">
          <Avatar fullName={title} url={avatar?.url} className="min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] me-2" />
          <div className="flex flex-col flex-1">
            <h5 className="truncate">{title}</h5>
            <span className="block truncate text-secondary">{subTitle}</span>
          </div>
        </div>
      </div>
    ),
    []
  )
  const onSelect = React.useCallback(
    (id) => {
      const selected = pages?.showMyPages?.find((page) => id === page.id)
      setSelected(selected)
      run({ variables: { page: selected.id } })
    },
    [pages?.showMyPages, run]
  )

  const statistics = React.useMemo(
    () =>
      data?.showStatisticsByPage?.map(({ agent, ...statistic }) => {
        const parsedAgent = agent ? parser(agent) : null
        return { ...statistic, agent: parsedAgent }
      }) || [],
    [data?.showStatisticsByPage]
  )
  const views = React.useMemo(() => statistics.filter((statistic) => statistic.event === 'view')?.length, [statistics])
  const clicks = React.useMemo(() => statistics.filter((statistic) => statistic.event === 'click')?.length, [statistics])
  const CTR = React.useMemo(() => Math.ceil((clicks / views) * 100), [clicks, views])

  //   console.log(statistics)

  return (
    <Dashboard className="flex-1">
      <Seo title="آمار" />
      <Loader loading={pagesLoading || loading}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold">مشاهده آمار</h3>
              <p>کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است.</p>
            </div>
            <Listbox
              valueProp="id"
              onChange={onSelect}
              value={selected?.id}
              renderLabel={renderPage}
              renderSelected={renderPage}
              selectedClassName="!text-content"
              options={pages?.showMyPages || []}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative py-2 px-4 bg-gradient-to-r from-blue-700 to-blue-500 rounded-md text-white font-bold flex flex-col lg:flex-row items-center lg:items-baseline justify-between text-3xl">
              <div className="text-lg">
                بازدید‌ها
                <div className="absolute text-5xl opacity-10 -end-1 -bottom-3">Views</div>
              </div>
              {views}
            </div>
            <div className="relative py-2 px-4 bg-gradient-to-r from-pink-700 to-pink-500 rounded-md text-white font-bold flex flex-col lg:flex-row items-center lg:items-baseline justify-between text-3xl">
              <div className="text-lg">
                کلیک‌ها
                <div className="absolute text-5xl opacity-10 -end-1 -bottom-3">Clicks</div>
              </div>
              {clicks}
            </div>
            <div className="relative py-2 px-4 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-md text-white font-bold flex flex-col lg:flex-row items-center lg:items-baseline justify-between text-3xl">
              <div className="text-lg">
                نرخ تبدیل
                <div className="absolute text-5xl opacity-10 -end-1 -bottom-3">CTR</div>
              </div>
              <div>
                {CTR}
                <span className="font-normal text-base">%</span>
              </div>
            </div>
          </div>
        </div>
      </Loader>
    </Dashboard>
  )
}

export default Statistics
