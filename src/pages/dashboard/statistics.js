import React from 'react'
import parser from 'ua-parser-js'
import moment from 'jalali-moment'
import dynamic from 'next/dynamic'
import Seo from '../../components/Tools/Seo'
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

// ** UI
import Dashboard from '../../components/Layout/Dashboard'
import { Listbox, Avatar, Button, Icon, Loader } from '../../components/Tools'
import styles from '../../components/Tools/Icon/icon.module.css'

// ** Graphql
import { useLazyQuery, useQuery } from '@apollo/client'
import { SHOW_MY_PAGES, SHOW_STATISTICS_AND_SECTIONS_BY_PAGE } from '../../graphql/queries'
import topest from '../../utils/topest'
import { getPalette } from '../../utils/getColors'
import classNames from '../../utils/classNames'

function brandChart(brand) {
  switch (brand) {
    // case 'Android':
    //   return {
    //     color: '',
    //     second: ''
    //   }

    default:
      return getPalette(false, true)[Math.floor(Math.random() * getPalette(false, true).length)].class
  }
}

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
  const views = React.useMemo(() => statistics.filter((statistic) => statistic.event === 'view') || [], [statistics])
  const clicks = React.useMemo(() => statistics.filter((statistic) => statistic.event === 'click') || [], [statistics])
  const CTR = React.useMemo(() => Math.ceil((clicks.length / views.length) * 100), [clicks, views])
  const chart = React.useMemo(() => {
    const dates = Object.fromEntries(
      Array(7)
        .fill('data')
        .map((_, idx) => {
          const d = new Date()
          d.setDate(d.getDate() - idx)
          return [moment(d).format('jYY-jMM-jDD'), 0]
        })
    )

    const viewsData = { ...dates }
    views.map((item) => {
      const key = moment(item.createdAt - 100721).format('jYY-jMM-jDD')
      if (key) Object.assign(viewsData, { [key]: (viewsData[key] || 0) + 1 })
    })
    const clicksData = { ...dates }
    clicks.map((item) => {
      const key = moment(item.createdAt - 100721).format('jYY-jMM-jDD')
      if (key) Object.assign(clicksData, { [key]: (clicksData[key] || 0) + 1 })
    })
    return { dates, views: viewsData, clicks: clicksData }
  }, [clicks, views])
  const series = React.useMemo(
    () => [
      {
        name: 'Views',
        data: Object.values(chart.views).reverse(),
        color: '#3B82F6'
      },
      {
        name: 'Clicks',
        data: Object.values(chart.clicks).reverse(),
        color: '#10B981'
      }
    ],
    [chart.clicks, chart.views]
  )
  const options = React.useMemo(
    () => ({
      chart: {
        height: 350,
        type: 'area',
        toolbar: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: Object.keys(chart.dates).reverse()
      }
    }),
    [chart.dates]
  )

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
              {views.length}
            </div>
            <div className="relative py-2 px-4 bg-gradient-to-r from-green-700 to-green-500 rounded-md text-white font-bold flex flex-col lg:flex-row items-center lg:items-baseline justify-between text-3xl">
              <div className="text-lg">
                کلیک‌ها
                <div className="absolute text-5xl opacity-10 -end-1 -bottom-3">Clicks</div>
              </div>
              {clicks.length}
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
          <div className="bg-white rounded-md" id="chart">
            <Chart options={options} series={series} type="area" height={350} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Topest
              label="ارجاع دهنده ها"
              topest={topest(views, 'referrer').map(({ key, value }) => {
                const hostName = key !== 'others' ? new URL(key).hostname.split('.') : [key, '']
                return { key: hostName[hostName.length - 2] || hostName[0], value }
              })}
            />
            <Topest label="سیستم عامل ها" topest={topest(views, 'agent.os.name')} />
            <Topest label="مرورگر ها" topest={topest(views, 'agent.browser.name')} />
          </div>
        </div>
      </Loader>
    </Dashboard>
  )
}

function Topest({ topest = [], label }) {
  return (
    <div className="bg-white rounded-lg p-4 grid grid-cols-2 lg:grid-cols-3 gap-2">
      <div className="mb-2 col-span-full flex flex-col justify-center">
        <h3 className="font-bold">{label}</h3>
        <p>کولینک یک سرویس رایگان با برای کسب و کار ها و اشخاص است.</p>
      </div>
      {topest.map(({ key, value }) => {
        const color = brandChart(key)
        return (
          <div
            key={key}
            className={classNames(
              'relative overflow-hidden flex justify-between items-center text-lg p-2 font-bold rounded-md border',
              `border-${color} text-${color}`
            )}
          >
            {styles[`brand-${key?.toLowerCase()}`] ? (
              <Icon name={`brand-${key.toLowerCase()}`} />
            ) : (
              <span className="truncate capitalize" dir="ltr">
                {key}
              </span>
            )}
            <div className="ms-4">{value}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Statistics
