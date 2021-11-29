import * as Yup from 'yup'
import { contacts, services, animate, borderStyle, direction, rounded, type, types } from '.'

export const customize = Yup.object().shape({
  type: Yup.string().oneOf(type),
  rounded: Yup.string().oneOf(rounded).nullable(),
  animate: Yup.string().oneOf(animate).nullable(),
  color: Yup.string()
    .matches(/[a-z]+-[1-9]0{1,2}/g)
    .nullable(),
  second: Yup.string()
    .matches(/[a-z]+-[1-9]0{1,2}/g)
    .nullable(),
  border: Yup.string()
    .matches(/[a-z]+-[1-9]0{1,2}/g)
    .nullable(),
  borderStyle: Yup.string().oneOf(borderStyle).nullable(),
  direction: Yup.string().oneOf(direction).nullable(),
  from: Yup.string()
    .matches(/[a-z]+-[1-9]0{1,2}/g)
    .nullable(),
  to: Yup.string()
    .matches(/[a-z]+-[1-9]0{1,2}/g)
    .nullable(),
  via: Yup.string()
    .matches(/[a-z]+-[1-9]0{1,2}/g)
    .nullable()
})

export const options = Yup.array().of(
  Yup.object().shape({
    key: Yup.string().nullable(),
    value: Yup.string().nullable()
  })
)

export const style = Yup.object().shape({
  customize,
  display: Yup.object().shape({
    font: Yup.string().oneOf(['dana', 'peyda', 'iransans']).nullable(),
    direction: Yup.string().oneOf(['rtl', 'ltr']).nullable()
  }),
  titles: Yup.object().shape({
    color: Yup.string()
      .matches(/[a-z]+-[1-9]0{1,2}/g)
      .nullable()
  }),
  background: Yup.object().shape({
    url: Yup.string().nullable(),
    color: Yup.string()
      .matches(/[a-z]+-[1-9]0{1,2}/g)
      .nullable()
  }),
  cover: Yup.object().shape({
    url: Yup.string().nullable(),
    customize
  })
})

export const page = Yup.object().shape({
  pk: Yup.string()
    .required()
    .matches(/[1-9]+/g),
  slug: Yup.string()
    .required()
    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/g),
  title: Yup.string().required('لطفا عنوان صفحه خود را وارد کنید!'),
  subTitle: Yup.string().nullable(),
  avatar: Yup.object().shape({
    url: Yup.string().nullable(),
    position: Yup.string().oneOf(['side', 'center']),
    customize
  }),
  style
})

export const section = Yup.object().shape({
  type: Yup.string().oneOf(types).nullable(),
  position: Yup.number().nullable(),
  title: Yup.string().nullable(),
  items: Yup.array()
    .min(1)
    .when('type', {
      is: 'links',
      then: Yup.array().of(
        Yup.object().shape({
          type: Yup.string().nullable(),
          key: Yup.string().required('لطفا عنوان لینک را وارد کنید'),
          value: Yup.string()
            .required('لطفا آدرس لینک را وارد کنید')
            .matches(
              /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
              'آدرس لینک وارد شده صحیح نمی‌باشد'
            ),
          options
        })
      ),
      otherwise: Yup.array().when('type', {
        is: 'text',
        then: Yup.array().of(
          Yup.object().shape({
            type: Yup.string().nullable(),
            key: Yup.string().nullable(),
            value: Yup.string().required('لطفا متن خود را وارد کنید'),
            options
          })
        ),
        otherwise: Yup.array().when('type', {
          is: 'contacts',
          then: Yup.array().of(
            Yup.object().shape({
              type: Yup.string()
                .required('لطفا راه ارتباطی خود را انتخاب کنید')
                .oneOf(contacts.map((contact) => contact.value)),
              key: Yup.string().required('لطفا عنوان راه ارتباطی خود را وارد کنید'),
              value: Yup.string().when('type', {
                is: 'mobile',
                then: Yup.string()
                  .required('لطفا شماره همراه خود را وارد کنید')
                  .matches(/^(09)\d{9}$/g, 'شماره همراه وارد شده صحیح نمی‌باشد'),
                otherwise: Yup.string().when('type', {
                  is: 'phone',
                  then: Yup.string()
                    .required('لطفا شماره تلفن ثابت خود را وارد کنید')
                    .matches(/^0\d{2,3}\d{8}$/g, 'شماره تلفن ثابت وارد شده صحیح نمی‌باشد'),
                  otherwise: Yup.string().when('type', {
                    is: 'email',
                    then: Yup.string().required('لطفا ایمیل خود را وارد کنید').email('ایمیل وارد شده صحیح نمی‌باشد'),
                    otherwise: Yup.string().when('type', {
                      is: 'fax',
                      then: Yup.string().required('لطفا فکس خود را وارد کنید'),
                      otherwise: Yup.string()
                    })
                  })
                })
              }),
              options
            })
          ),
          otherwise: Yup.array().when('type', {
            is: 'services',
            then: Yup.array().of(
              Yup.object().shape({
                type: Yup.string()
                  .required('لطفا سرویس خود را انتخاب کنید')
                  .oneOf(services.map((service) => service.value)),
                key: Yup.string().required('لطفا عنوان سرویس خود را وارد کنید'),
                value: Yup.string().when('type', {
                  is: 'instagram',
                  then: Yup.string()
                    .required('لطفا آیدی اینستاگرام خود را وارد کنید')
                    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/g, 'آیدی اینستاگرام وارد شده صحیح نمی‌باشد'),
                  otherwise: Yup.string().when('type', {
                    is: 'telegram',
                    then: Yup.string()
                      .required('لطفا آیدی یا لینک تلگرام خود را وارد کنید')
                      .matches(/((http(s)?:\/\/)?t\.me\/)?(joinchat\/)?[a-zA-Z0-9\-_]{5,32}$/g, 'آیدی یا لینک تلگرام وارد شده صحیح نمی‌باشد'),
                    otherwise: Yup.string().when('type', {
                      is: 'twitter',
                      then: Yup.string()
                        .required('لطفا آیدی توییتر خود را وارد کنید')
                        .matches(/^[a-zA-Z0-9_]{1,15}$/g, 'آیدی توییتر وارد شده صحیح نمی‌باشد'),
                      otherwise: Yup.string().when('type', {
                        is: 'youtube',
                        then: Yup.string()
                          .required('لطفا لینک یوتیوب خود را وارد کنید')
                          .matches(
                            /(?:(http(?:s?):\/\/)?)(?:(www\.)?)youtube\.com\/(watch|channel\/|c\/)(\?v=|)([\w\-\_]*)$/g,
                            'لینک یوتیوب وارد شده صحیح نمی‌باشد'
                          ),
                        otherwise: Yup.string().when('type', {
                          is: 'tiktok',
                          then: Yup.string()
                            .required('لطفا آیدی تیک‌تاک خود را وارد کنید')
                            .matches(/@?(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,24}$/g, 'آیدی تیک‌تاک وارد شده صحیح نمی‌باشد'),
                          otherwise: Yup.string().when('type', {
                            is: 'whatsapp',
                            then: Yup.string()
                              .required('لطفا شماره واتساپ خود را وارد کنید')
                              .matches(/^(09)\d{9}$/g, 'شماره واتساپ وارد شده صحیح نمی‌باشد'),
                            otherwise: Yup.string()
                              .required('لطفا آدرس لینک را وارد کنید')
                              .matches(
                                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                                'آدرس لینک وارد شده صحیح نمی‌باشد'
                              )
                          })
                        })
                      })
                    })
                  })
                }),
                options
              })
            ),
            otherwise: Yup.array().when('type', {
              is: 'locations',
              then: Yup.array().of(
                Yup.object().shape({
                  type: Yup.string().nullable(),
                  key: Yup.string().oneOf(['lat', 'lng', 'label']).required(),
                  value: Yup.string().when('key', {
                    is: 'label',
                    then: Yup.string().required('عنوان آدرس را وارد کنید'),
                    otherwise: Yup.string().required()
                  }),
                  options
                })
              ),
              otherwise: Yup.array().when('type', {
                is: 'faq',
                then: Yup.array().of(
                  Yup.object().shape({
                    type: Yup.string().nullable(),
                    key: Yup.string().required('لطفا پرسسش خود را وارد کنید'),
                    value: Yup.string().required('لطفا متن پاسخ خود را وارد کنید'),
                    options
                  })
                ),
                otherwise: Yup.array().when('type', {
                  is: 'feeds',
                  then: Yup.array().of(
                    Yup.object().shape({
                      type: Yup.string().nullable(),
                      key: Yup.string().required('لطفا عنوان خود را وارد کنید'),
                      value: Yup.string().nullable(),
                      options
                    })
                  ),
                  otherwise: Yup.array().of(
                    Yup.object().shape({
                      type: Yup.string().nullable(),
                      key: Yup.string().nullable(),
                      value: Yup.string().nullable(),
                      options
                    })
                  )
                })
              })
            })
          })
        })
      })
    }),
  arrangement: Yup.string().nullable(),
  customized: Yup.boolean().default(false),
  customize: Yup.array().of(customize).nullable()
})
