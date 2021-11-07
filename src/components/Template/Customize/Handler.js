import React from 'react'

// Template
import { ChooseColor } from '../ChooseColor'

// ** UI
import { Button, Element, Listbox, Disclosure, RadioGroup, Switch, Icon } from '../../Tools'

// ** Utils
import classNames from '../../../utils/classNames'
import deepMerger from '../../../utils/deepMerger'

// ** Avatar and cover
export const COVER_ROUNDED = [
  {
    value: 'sm',
    content: (
      <div className="w-16 h-8 flex items-center justify-center border border-content">
        <Icon name="picture" />
      </div>
    )
  },
  {
    value: 'lg',
    content: (
      <div className="w-16 h-8 flex items-center justify-center border border-content rounded-b-lg">
        <Icon name="picture" />
      </div>
    )
  },
  {
    value: 'full',
    content: (
      <div className="w-16 h-8 flex items-center justify-center border border-content rounded-b-full">
        <Icon name="picture" />
      </div>
    )
  }
]

export const AVATAR_ROUNDED = [
  {
    value: 'sm',
    content: (
      <div className="w-8 h-8 flex items-center justify-center border border-content rounded-sm">
        <Icon name="picture" />
      </div>
    )
  },
  {
    value: 'md',
    content: (
      <div className="w-8 h-8 flex items-center justify-center border border-content rounded-md">
        <Icon name="picture" />
      </div>
    )
  },
  {
    value: 'lg',
    content: (
      <div className="w-8 h-8 flex items-center justify-center border border-content rounded-lg">
        <Icon name="picture" />
      </div>
    )
  },
  {
    value: 'xl',
    content: (
      <div className="w-8 h-8 flex items-center justify-center border border-content rounded-xl">
        <Icon name="picture" />
      </div>
    )
  },
  {
    value: 'full',
    content: (
      <div className="w-8 h-8 flex items-center justify-center border border-content rounded-full">
        <Icon name="picture" />
      </div>
    )
  }
]

export const AVATAR_POSITION = (rounded) => [
  {
    value: 'side',
    content: (
      <div className="flex items-center w-full space-s-2">
        <div className={classNames('w-8 h-8 flex items-center justify-center border border-content rounded-sm', `rounded-${rounded || 'lg'}`)}>
          <Icon name="picture" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-2/3 h-1.5 bg-content rounded-full" />
          <div className="w-full h-1.5 bg-content rounded-full" />
        </div>
      </div>
    )
  },
  {
    value: 'center',
    content: (
      <div className="flex flex-col items-center w-full">
        <div className={classNames('w-8 h-8 flex items-center justify-center border border-content rounded-sm mb-2', `rounded-${rounded || 'lg'}`)}>
          <Icon name="picture" />
        </div>
        <div className="w-2/3 h-1.5 bg-content rounded-full mb-1" />
        <div className="w-full h-1.5 bg-content rounded-full" />
      </div>
    )
  }
]

export const DIRECTIIONS = [
  {
    value: 'rtl',
    content: (
      <div dir="rtl" className="flex items-center w-full space-s-2">
        <div className="w-8 h-8 flex items-center justify-center border border-content rounded-lg">
          <Icon name="picture" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-2/3 h-1.5 bg-content rounded-full" />
          <div className="w-full h-1.5 bg-content rounded-full" />
        </div>
      </div>
    )
  },
  {
    value: 'ltr',
    content: (
      <div dir="ltr" className="flex items-center w-full space-s-2">
        <div className="w-8 h-8 flex items-center justify-center border border-content rounded-lg">
          <Icon name="picture" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="w-2/3 h-1.5 bg-content rounded-full" />
          <div className="w-full h-1.5 bg-content rounded-full" />
        </div>
      </div>
    )
  }
]

export const FONTS = [
  {
    value: 'dana',
    content: <div className="font-dana text-center">این فونت دانا است</div>
  },
  {
    value: 'peyda',
    content: <div className="font-peyda text-center">این فونت پیدا است</div>
  },
  {
    value: 'iransans',
    content: <div className="font-iransans text-center">این فونت ایران سنس است</div>
  }
]

// ** Default
export const DEFAULT_CUSTOMIZE = {
  type: 'default',
  rounded: 'lg',
  animate: null,
  color: 'primary',
  second: 'content',
  border: null,
  borderStyle: 'solid',
  direction: 'r',
  from: 'primary',
  to: 'primary',
  via: null
}

export const CUSTOMIZE_TYPE = [
  {
    label: 'پیشفرض کولینک',
    value: 'default'
  },
  {
    label: 'گرادینت',
    value: 'gradient'
  },
  {
    label: 'سفارشی',
    value: 'custom'
  }
]

export const ITEM_ANIMATE = [
  {
    value: null,
    content: <div className="w-8 h-8 bg-content rounded-lg animate-none" />
  },
  {
    value: 'ping',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-ping" />
  },
  {
    value: 'pulse',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-pulse" />
  },
  {
    value: 'bounce',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-bounce" />
  },
  {
    value: 'flash',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-flash" />
  },
  {
    value: 'rubberBand',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-rubberBand" />
  },
  {
    value: 'shakeX',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-shakeX" />
  },
  {
    value: 'shakeY',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-shakeY" />
  },
  {
    value: 'headShake',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-headShake" />
  },
  {
    value: 'swing',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-swing" />
  },
  {
    value: 'tada',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-tada" />
  },
  {
    value: 'wobble',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-wobble" />
  },
  {
    value: 'jello',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-jello" />
  },
  {
    value: 'heartBeat',
    content: <div className="w-8 h-8 bg-content rounded-lg animate-heartBeat" />
  }
]

export const ITEM_ARRANGEMENT = [
  {
    value: null,
    content: (
      <div className="grid grid-cols-1 gap-1 flex-1 my-4">
        <div className="h-1.5 bg-content rounded-full" />
      </div>
    )
  },
  {
    value: '2',
    content: (
      <div className="grid grid-cols-2 gap-1 flex-1 my-4">
        <div className="h-1.5 bg-content rounded-full" />
        <div className="h-1.5 bg-content rounded-full" />
      </div>
    )
  },
  {
    value: '4',
    content: (
      <div className="grid grid-cols-4 gap-1 flex-1 my-4">
        <div className="h-1.5 bg-content rounded-full" />
        <div className="h-1.5 bg-content rounded-full" />
        <div className="h-1.5 bg-content rounded-full" />
        <div className="h-1.5 bg-content rounded-full" />
      </div>
    )
  }
]

export const ITEM_ROUNDED = [
  {
    value: 'sm',
    content: <div className="w-8 h-8 flex items-center justify-center border border-content rounded-sm" />
  },
  {
    value: 'md',
    content: <div className="w-8 h-8 flex items-center justify-center border border-content rounded-md" />
  },
  {
    value: 'lg',
    content: <div className="w-8 h-8 flex items-center justify-center border border-content rounded-lg" />
  },
  {
    value: 'xl',
    content: <div className="w-8 h-8 flex items-center justify-center border border-content rounded-xl" />
  },
  {
    value: 'full',
    content: <div className="w-8 h-8 flex items-center justify-center border border-content rounded-full" />
  }
]

export const BORDER_STYLE = [
  {
    value: 'solid',
    content: <div className="w-8 h-8 me-4 rounded-te-lg border-2 border-solid border-content border-b-0 border-s-0" />
  },
  {
    value: 'dashed',
    content: <div className="w-8 h-8 me-4 rounded-te-lg border-2 border-dashed border-content border-b-0 border-s-0" />
  },
  {
    value: 'dotted',
    content: <div className="w-8 h-8 me-4 rounded-te-lg border-2 border-dotted border-content border-b-0 border-s-0" />
  },
  {
    value: 'double',
    content: <div className="w-8 h-8 me-4 rounded-te-lg border-2 border-double border-content border-b-0 border-s-0" />
  }
]

export const DEFAULT_CUSTOMIZE_OPTIONS = {
  values: {
    arrangement: null,
    customized: false,
    customize: [DEFAULT_CUSTOMIZE]
  },
  setFieldValue: () => {},
  toggle: true,
  arrangement: false,
  customizeProps: [
    {
      label: '',
      preView: true,
      type: { available: true, exclude: [] },
      color: { available: true, label: 'رنگ اصلی' },
      second: { available: true, label: 'رنگ متن' },
      rounded: { available: true, label: 'خمیدگی آیتم', exclude: [] },
      animate: { available: false, label: 'انیمیشن' },
      // custom
      border: { available: true, label: 'رنگ حاشیه' },
      borderStyle: { available: true, label: 'استایل حاشیه' },
      // gradient
      direction: { available: true },
      from: { available: true, label: 'رنگ شروع گرادینت' },
      to: { available: true, label: 'رنگ پایان گرادینت' },
      via: { available: true, label: 'رنگ ترکیبی گرادینت' }
    },
    {
      label: '',
      preView: false,
      type: { available: false, exclude: [] },
      color: { available: false, label: 'رنگ اصلی' },
      second: { available: false, label: 'رنگ متن' },
      rounded: { available: false, label: 'خمیدگی آیتم', exclude: [] },
      direction: { available: false },
      // custom
      border: { available: false, label: 'رنگ حاشیه' },
      borderStyle: { available: false, label: 'استایل حاشیه' },
      animate: { available: false, label: 'انیمیشن' },
      // gradient
      from: { available: true, label: 'رنگ شروع گرادینت' },
      to: { available: false, label: 'رنگ پایان گرادینت' },
      via: { available: false, label: 'رنگ ترکیبی گرادینت' }
    }
  ],
  defaultProps: [DEFAULT_CUSTOMIZE]
}

export const GRADIENT_DIRECTIONS = (value = 'r') => {
  const directions = [
    { value: 't', key: '-rotate-90' },
    { value: 'tr', key: '-rotate-45' },
    { value: 'r', key: '' },
    { value: 'br', key: 'rotate-45' },
    { value: 'b', key: 'rotate-90' },
    { value: 'bl', key: 'rotate-[135deg]' },
    { value: 'l', key: 'rotate-180' },
    { value: 'tl', key: 'rotate-[-135deg]' }
  ]

  const idx = directions.findIndex((direction) => direction.value === value)
  const nextIdx = idx + 1 === directions.length ? 0 : idx + 1
  return {
    idx,
    nextIdx,
    item: directions[idx],
    next: directions[nextIdx]
  }
}

export const CustomizeHandlare = (props = DEFAULT_CUSTOMIZE_OPTIONS) => {
  const { values, setFieldValue, defaultProps, ...other } = props
  const { arrangement, toggle, customizeProps } = deepMerger(DEFAULT_CUSTOMIZE_OPTIONS, other)

  return (
    <>
      {arrangement ? (
        <Disclosure label="چینش" className="arrangement">
          <RadioGroup
            options={ITEM_ARRANGEMENT}
            value={values?.arrangement || null}
            onChange={(value) => setFieldValue(`arrangement`, value, false)}
            className="p-3 py-3.5"
            wrapperClassName="grid grid-cols-3 gap-2"
          />
        </Disclosure>
      ) : null}
      {toggle ? (
        <Switch
          label="سفارشی سازی برای این آیتم فعال باشد؟"
          checked={values.customized}
          onChange={(toggle) => {
            setFieldValue('customized', toggle, false)
            if (toggle) {
              setFieldValue('customize', defaultProps, false)
            } else setFieldValue('customize', null, false)
          }}
        />
      ) : null}
      {(toggle && values.customized) || !toggle
        ? values.customize?.map((custom, idx) => (
            <Disclosure
              key={`customize-${idx}`}
              label={customizeProps[idx].label}
              isDisclosure={values.customize?.length > 1}
              className="space-y-4 border border-line p-4 rounded-lg"
            >
              {customizeProps[idx].preView ? (
                <Element hoverable={false} customize={custom} className="p-4 text-center relative">
                  نمونه آیتم
                  {custom?.type === 'gradient' && customizeProps[idx].direction.available ? (
                    <Button
                      type="ghost"
                      icon="arrow-small-right"
                      className="absolute top-2 start-2 text-sm !p-1 !min-h-0"
                      iconClassName={classNames('transform transition-transform', GRADIENT_DIRECTIONS(custom?.direction).item.key)}
                      onClick={() => setFieldValue(`customize.${idx}.direction`, GRADIENT_DIRECTIONS(custom?.direction).next.value)}
                    />
                  ) : null}
                </Element>
              ) : null}
              {customizeProps[idx].type.available ? (
                <Listbox
                  label="استایل آیتم"
                  options={CUSTOMIZE_TYPE.filter(({ value }) => !customizeProps[idx].type.exclude.includes(value))}
                  value={custom?.type || CUSTOMIZE_TYPE.filter(({ value }) => !customizeProps[idx].type.exclude.includes(value))[0].value}
                  onChange={(value) => setFieldValue(`customize.${idx}.type`, value, false)}
                />
              ) : null}
              {customizeProps[idx].color.available ? (
                <Disclosure label={customizeProps[idx].color.label}>
                  <ChooseColor
                    active={custom?.color}
                    colorFull={custom?.type === 'default'}
                    setActive={(color) => setFieldValue(`customize.${idx}.color`, color)}
                  />
                </Disclosure>
              ) : null}
              {custom?.type !== 'default' && customizeProps[idx].second.available ? (
                <Disclosure label={customizeProps[idx].second.label}>
                  <ChooseColor nullable active={custom?.second} setActive={(color) => setFieldValue(`customize.${idx}.second`, color)} />
                </Disclosure>
              ) : null}
              {custom?.type === 'gradient' ? (
                <>
                  {customizeProps[idx].from.available ? (
                    <Disclosure label={customizeProps[idx].from.label}>
                      <ChooseColor active={custom?.from} setActive={(color) => setFieldValue(`customize.${idx}.from`, color)} />
                    </Disclosure>
                  ) : null}
                  {customizeProps[idx].to.available ? (
                    <Disclosure label={customizeProps[idx].to.label}>
                      <ChooseColor active={custom?.to} setActive={(color) => setFieldValue(`customize.${idx}.to`, color)} />
                    </Disclosure>
                  ) : null}
                  {customizeProps[idx].via.available ? (
                    <Disclosure label={customizeProps[idx].via.label}>
                      <ChooseColor nullable active={custom?.via} setActive={(color) => setFieldValue(`customize.${idx}.via`, color)} />
                    </Disclosure>
                  ) : null}
                </>
              ) : null}
              {custom?.type === 'custom' ? (
                <>
                  {customizeProps[idx].border.available ? (
                    <Disclosure label={customizeProps[idx].border.label}>
                      <ChooseColor nullable active={custom?.border} setActive={(color) => setFieldValue(`customize.${idx}.border`, color)} />
                    </Disclosure>
                  ) : null}
                  {customizeProps[idx].borderStyle.available ? (
                    <Disclosure label={customizeProps[idx].borderStyle.label} className="border-style">
                      <RadioGroup
                        options={BORDER_STYLE}
                        value={custom?.borderStyle}
                        onChange={(value) => setFieldValue(`customize.${idx}.borderStyle`, value, false)}
                        className="!p-4"
                      />
                    </Disclosure>
                  ) : null}
                </>
              ) : null}
              {customizeProps[idx].rounded.available ? (
                <Disclosure label={customizeProps[idx].rounded.label} className="rounded-item">
                  <RadioGroup
                    options={ITEM_ROUNDED.filter(({ value }) => !customizeProps[idx].rounded.exclude.includes(value))}
                    value={custom?.rounded || ITEM_ROUNDED.filter(({ value }) => !customizeProps[idx].rounded.exclude.includes(value))[0].value}
                    onChange={(value) => setFieldValue(`customize.${idx}.rounded`, value, false)}
                    className="p-3 py-3.5"
                  />
                </Disclosure>
              ) : null}
              {customizeProps[idx].animate.available ? (
                <Disclosure label={customizeProps[idx].animate.label} className="animate">
                  <RadioGroup
                    options={ITEM_ANIMATE}
                    value={custom?.animate}
                    onChange={(value) => setFieldValue(`customize.${idx}.animate`, value, false)}
                    className="p-3 py-3.5"
                    wrapperClassName="grid grid-cols-4 gap-2"
                  />
                </Disclosure>
              ) : null}
            </Disclosure>
          ))
        : null}
    </>
  )
}

export const DefaultCustomize = React.memo(function Component({ values, setFieldValue }) {
  return (
    <>
      <Element hoverable={false} customize={values.customize} className="p-4 text-center relative">
        نمونه آیتم
        {values.customize?.type === 'gradient' ? (
          <Button
            type="ghost"
            icon="arrow-small-right"
            className="absolute top-2 start-2 text-sm !p-1 !min-h-0"
            iconClassName={classNames('transform transition-transform', GRADIENT_DIRECTIONS(values.customize?.direction).item.key)}
            onClick={() => setFieldValue('customize.direction', GRADIENT_DIRECTIONS(values.customize?.direction).next.value)}
          />
        ) : null}
      </Element>
      <Listbox
        label="استایل آیتم"
        options={CUSTOMIZE_TYPE}
        value={values.customize?.type || CUSTOMIZE_TYPE[0].value}
        onChange={(value) => setFieldValue('customize.type', value, false)}
      />
      <Disclosure label="رنگ اصلی">
        <ChooseColor
          active={values.customize?.color}
          colorFull={values.customize?.type === 'default'}
          setActive={(color) => setFieldValue('customize.color', color)}
        />
      </Disclosure>
      {values.customize?.type !== 'default' ? (
        <Disclosure label="رنگ متن">
          <ChooseColor nullable active={values.customize?.second} setActive={(color) => setFieldValue('customize.second', color)} />
        </Disclosure>
      ) : null}
      {values.customize?.type === 'gradient' ? (
        <>
          <Disclosure label="رنگ شروع گرادینت">
            <ChooseColor active={values.customize?.from} setActive={(color) => setFieldValue('customize.from', color)} />
          </Disclosure>
          <Disclosure label="رنگ پایان گرادینت">
            <ChooseColor active={values.customize?.to} setActive={(color) => setFieldValue('customize.to', color)} />
          </Disclosure>
          <Disclosure label="رنگ ترکیبی گرادینت">
            <ChooseColor nullable active={values.customize?.via} setActive={(color) => setFieldValue('customize.via', color)} />
          </Disclosure>
        </>
      ) : null}
      {values.customize?.type === 'custom' ? (
        <>
          <Disclosure label="رنگ حاشیه">
            <ChooseColor nullable active={values.customize?.border} setActive={(color) => setFieldValue('customize.border', color)} />
          </Disclosure>
          <Disclosure label="استایل حاشیه" className="border-style">
            <RadioGroup
              options={BORDER_STYLE}
              value={values.customize?.borderStyle}
              onChange={(value) => setFieldValue('customize.borderStyle', value, false)}
              className="!p-4"
            />
          </Disclosure>
        </>
      ) : null}
      <Disclosure label="خمیدگی آیتم" className="border-style">
        <RadioGroup
          options={ITEM_ROUNDED}
          value={values.customize?.rounded}
          onChange={(value) => setFieldValue('customize.rounded', value, false)}
          className="p-3 py-3.5"
        />
      </Disclosure>
    </>
  )
})

export default React.memo(CustomizeHandlare)
