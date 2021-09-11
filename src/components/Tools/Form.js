import React from 'react'
import Icon from './Icon'
import { Field as FormikField } from 'formik'
import classNames from '../../utils/classNames'
// import Http from '../../services/Http'
// import Config from '../../utils/Config'
// import { AuthContext } from '../../providers/Auth'

const Field = ({
  name,
  label,
  type,
  textarea,
  placeholder,
  className,
  borderless,
  roundless,
  children,
  errorless,
  wrapperClassName,
  required,
  disabled,
  focused,
  row,
  suffix
}) => {
  const ref = React.useRef()
  const classes = React.useMemo(
    () =>
      classNames(
        borderless ? '' : 'border',
        roundless ? 'rounded' : 'rounded-md',
        'min-h-[2rem] border-line transition ease-in-out duration-200 focus:border-primary focus:outline-none w-full px-2 fa',
        'disabled:bg-secondary disabled:bg-opacity-10 disabled:text-secondary disabled:cursor-not-allowed',
        className
      ),
    [borderless, className, roundless]
  )

  React.useEffect(() => {
    focused ? ref.current?.focus() : ref.current?.blur()
  }, [ref.current, focused])

  return (
    <FormikField name={name}>
      {({ field, meta: { error } }) =>
        errorless ? (
          <div className={classNames('feild relative', wrapperClassName)}>
            {textarea ? (
              <textarea ref={ref} className={classes} placeholder={placeholder} required={required} disabled={disabled} rows={row} {...field} />
            ) : (
              <input ref={ref} type={type} className={classes} placeholder={placeholder} required={required} {...field} />
            )}
            {children}
          </div>
        ) : (
          <div className={classNames('feild', wrapperClassName)}>
            {required ? <span className="text-danger ml-1">*</span> : null}
            {label ? <label className="mb-1 inline-block">{label}</label> : null}
            <span className="font-normal text-xs text-secondary mr-1">{suffix}</span>
            <div className="relative">
              {textarea ? (
                <textarea ref={ref} className={classes} placeholder={placeholder} required={required} disabled={disabled} rows={row} {...field} />
              ) : (
                <input ref={ref} type={type} className={classes} placeholder={placeholder} required={required} disabled={disabled} {...field} />
              )}
              {children}
            </div>
            <div
              className={classNames(
                'flex items-center text-danger text-xs overflow-hidden transition-all duration-200 ease-in-out',
                error ? 'mt-1 h-3.5' : 'h-0'
              )}
            >
              <Icon name="exclamation" className="ml-1" />
              {error ? <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">{error}</span> : null}
            </div>
          </div>
        )
      }
    </FormikField>
  )
}

const SingleUpload = ({ name, children, onChange, className }) => {
  const [loading, setLoading] = React.useState(false)
  const { checkForbbiden } = React.useContext(AuthContext)

  const url = React.useMemo(() => {
    const { baseUrl, uploadProfile } = Config.services.upload
    switch (name) {
      case 'profile':
        return `${baseUrl}${uploadProfile}`

      default:
        return null
    }
  }, [name])

  const upload = React.useCallback(
    async (file) => {
      try {
        setLoading(true)

        const data = new FormData()
        data.append(name, file)
        const response = await Http.post(url, data)
        onChange && (await onChange(response.data?.create?.fileName))

        setLoading(false)
      } catch (err) {
        return checkForbbiden(err, async () => await upload(file))
      }
    },
    [name, url, setLoading, checkForbbiden, onChange]
  )

  return (
    <div className={classNames('relative', className)}>
      {children}
      <input
        type="file"
        name="upload"
        accept="image/*"
        className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
        onChange={({ target }) => {
          upload(target.files[0])
        }}
      />
      {loading ? (
        <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-primary bg-opacity-10 backdrop-filter backdrop-blur-sm">
          <Icon name="spinner" className="animate-spin text-base text-white" />
        </div>
      ) : null}
    </div>
  )
}

const Upload = { Single: SingleUpload }
export { Field, Upload }