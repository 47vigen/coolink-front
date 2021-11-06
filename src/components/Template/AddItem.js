import React from 'react'
import { Tab } from '@headlessui/react'

// ** UI
import { Modal, Icon } from '../Tools'

function AddItem({ isOpenAdd, closeAddModal, onAddItem }) {
  return (
    <Modal tabMode labels={['عمومی', 'اینستاگرام']} isOpen={isOpenAdd} closeModal={closeAddModal} className="md:max-w-md">
      <Tab.Panels>
        <Tab.Panel className="grid grid-cols-2 gap-4 p-4">
          <Item type="links" icon="link" label="لینک یا پیوند" onAddItem={onAddItem} />
          <Item type="text" icon="document" label="متن یا توضیح" onAddItem={onAddItem} />
          <Item type="contacts" icon="smartphone" label="اطلاعات تماس" onAddItem={onAddItem} />
          <Item type="services" icon="comment" label="شبکه‌های‌اجتماعی و سرویس‌ها" onAddItem={onAddItem} />
          <Item type="locations" icon="location-alt" label="مسیریابی" onAddItem={onAddItem} />
          <Item type="faq" icon="interrogation" label="پرسش های پرتکرار" onAddItem={onAddItem} />
        </Tab.Panel>
        <Tab.Panel className="grid grid-cols-2 gap-4 p-4">
          <Item type="igFeedsLink" icon="picture" label="لینک پست ها" onAddItem={onAddItem} />
          <Item type="igFeedsDownload" icon="download" label="دانلود پست ها" onAddItem={onAddItem} />
        </Tab.Panel>
      </Tab.Panels>
    </Modal>
  )
}

const Item = React.memo(function Component({ type, icon, label, onAddItem }) {
  return (
    <button
      className="flex flex-col items-center justify-center bg-body rounded-md py-4 hover:bg-body-hover transition ease-in-out duration-300 focus:outline-none"
      onClick={() => onAddItem(type)}
    >
      <Icon name={icon} className="text-lg" />
      <span className="mt-1">{label}</span>
    </button>
  )
})

export default React.memo(AddItem)
