import React from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/auth'

// ** UI
import Layout from '.'
import { Button } from '../Tools'
import MenuItem from '../Tools/MenuItem'

// ** Utils
import classNames from '../../utils/classNames'

function Dashboard({ className, children, hide }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  React.useEffect(() => {
    if (user.id && user.role !== 'ADMIN') {
      router.replace({
        pathname: '/dashboard'
      })
    }
  }, [user, loading, router])

  return (
    <Layout dashboard wrapperName="admin">
      <div className="flex items-stretch space-s-4 lg:space-s-8">
        <div
          className={classNames(
            'relative lg:flex-1 max-w-[16rem] transition-all duration-300',
            hide ? '-ms-14 pe-1 opacity-0 invisible lg:opacity-100 lg:visible lg:ms-0 lg:pe-0' : ''
          )}
        >
          <div className="flex flex-col sticky top-4 items-center lg:items-start space-y-5 text-2xl">
            <MenuItem pathname="/admin" label="پیشخوان" notInclude>
              {({ active }) => (
                <div
                  className={classNames('w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current', active ? 'text-primary' : '')}
                  dangerouslySetInnerHTML={{
                    __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="512" height="512"><path d="M399.211,256H298.667C275.103,256,256,236.897,256,213.333V112.512c0.059-19.89-9.134-38.678-24.875-50.837  c-14.916-11.812-34.474-16.022-52.928-11.392C52.767,81.419-23.674,208.342,7.463,333.773  c21.937,88.372,93.145,155.995,182.532,173.342c122.11,23.373,241.257-52.547,271.659-173.099  c4.647-18.478,0.445-38.066-11.371-53.013C437.984,265.29,419.165,256.076,399.211,256z"/><path d="M504.555,158.848c-4.87-18.102-12.123-35.477-21.568-51.669c-28.41-48.738-74.818-84.375-129.237-99.243  C350.165,6.969,342.144,6.4,342.144,6.4c-2.866,0.001-15.21,0-24.981,7.915c-14.361,11.301-16.619,24.149-16.832,25.152  c-0.745,3.146-1.132,6.367-1.152,9.6v100.267c0,35.346,28.654,64,64,64h100.672c13.356,0.038,25.927-6.303,33.835-17.067  c5.848-7.885,8.856-17.517,8.533-27.328C506.049,165.523,505.491,162.137,504.555,158.848z"/></svg>`
                  }}
                />
              )}
            </MenuItem>
            <MenuItem pathname="/admin/post" label="نوشته ها">
              {({ active }) => (
                <div
                  className={classNames('w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current', active ? 'text-primary' : '')}
                  dangerouslySetInnerHTML={{
                    __html: `<svg class="w-full h-auto" id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m14 7v-6.54a6.977 6.977 0 0 1 2.465 1.59l3.484 3.486a6.954 6.954 0 0 1 1.591 2.464h-6.54a1 1 0 0 1 -1-1zm8 3.485v8.515a5.006 5.006 0 0 1 -5 5h-10a5.006 5.006 0 0 1 -5-5v-14a5.006 5.006 0 0 1 5-5h4.515c.163 0 .324.013.485.024v6.976a3 3 0 0 0 3 3h6.976c.011.161.024.322.024.485zm-8 8.515a1 1 0 0 0 -1-1h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 1-1zm3-4a1 1 0 0 0 -1-1h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 1-1z"/></svg>`
                  }}
                />
              )}
            </MenuItem>
            <MenuItem pathname="/admin/comment" label="دیدگاه ها">
              {({ active }) => (
                <div
                  className={classNames('w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current', active ? 'text-primary' : '')}
                  dangerouslySetInnerHTML={{
                    __html: `<svg class="w-full h-auto" xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M19.675,2.758A11.936,11.936,0,0,0,10.474.1,12,12,0,0,0,12.018,24H19a5.006,5.006,0,0,0,5-5V11.309l0-.063A12.044,12.044,0,0,0,19.675,2.758ZM8,7h4a1,1,0,0,1,0,2H8A1,1,0,0,1,8,7Zm8,10H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Zm0-4H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Z"/></svg>`
                  }}
                />
              )}
            </MenuItem>
            <Button link="/admin/post/create" className="w-full rounded-lg font-bold !min-h-[2.5rem]">
              <div
                className="w-[1.375rem] self-center lg:me-2 lg:mb-1 fill-current"
                dangerouslySetInnerHTML={{
                  __html: `<svg class="w-full h-auto" id="Layer_1" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm4 13h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z"/></svg>`
                }}
              />
              <h6 className="hidden lg:!block">ایجاد نوشته</h6>
            </Button>
          </div>
        </div>
        <div className={classNames('flex-1', className)}>{typeof children === 'function' ? children({ user }) : children}</div>
      </div>
    </Layout>
  )
}

export default React.memo(Dashboard)
