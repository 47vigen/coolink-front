import React from 'react'
import { DatePicker as JalaliDatePicker } from 'jalali-react-datepicker'
import debounce from '../../utils/debounce'
import { Button } from '.'
import classNames from '../../utils/classNames'

const datePickerTheme = {
  backColor: '#FFFFFF',
  // head
  headBackColor: '#FFFFFF',
  headTitleColor: '#787E8A',
  headTimeTitleColor: '#05C46B',
  headArrowColor: '#2D2D2D',
  headRangeBackColor: '#D6D6D6',
  headRangeColor: '#2D2D2D',

  // weekdays color
  weekDaysColor: '#787E8A',

  // days
  daysColor: '#2D2D2D',
  daysBackColor: '#FFFFFF',
  holidaysColor: '#E74C3C',
  holidaysBackColor: '#FFFFFF',
  daysRound: '50%',

  selectDayColor: '#FFF',
  selectDayBackColor: '#05C46B',

  // buttons
  submitBackColor: '#D6D6D6',
  submitHoverBackColor: '#D9D9D9',
  submitColor: '#2D2D2D',
  submitHoverColor: '#2D2D2D',
  cancelBackColor: '#FFF',
  cancelHoverBackColor: '#D6D6D6',
  cancelColor: '#2D2D2D',
  cancelHoverColor: '#2D2D2D',
  changeViewButtonBackColor: '#D6D6D6',
  changeViewButtonHoverBackColor: '#FFF',
  changeViewButtonColor: '#2D2D2D',
  changeViewButtonHoverColor: '#05C46B',
  // time
  timeBackColor: '#F1F1F1',
  timeNumberColor: '#2D2D2D',
  handBackColor: '#05C46B',
  handCircleColor: '#05C46B',
  selectedNumberColor: '#FFF'
}

function DatePicker({ className }) {
  const ref = React.useRef()
  const onClickParent = debounce(() => console.log(ref.current?.querySelector('.dp__input')?.attributes?.value?.value))

  return (
    <Button icon="calendar" className={classNames('max-w-[2rem] overflow-hidden', className)} iconClassName="absolute !m-0">
      <div ref={ref} onClick={onClickParent} className="h-full">
        <JalaliDatePicker theme={datePickerTheme} />
      </div>
    </Button>
  )
}

export default DatePicker
