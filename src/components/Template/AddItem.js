import React from 'react'

// ** UI
import { Modal, Icon } from '../Tools'

function AddItem({ isOpenAdd, closeAddModal, onAddItem }) {
  return (
    <Modal labels="افزودن آپشن" isOpen={isOpenAdd} closeModal={closeAddModal} className="max-w-sm">
      <div className="grid grid-cols-2 gap-4 p-4">
        <Item type="links" icon="link" label="لینک یا پیوند" onAddItem={onAddItem} />
        <Item type="text" icon="document" label="متن یا توضیح" onAddItem={onAddItem} />
        <Item type="contacts" icon="smartphone" label="اطلاعات تماس" onAddItem={onAddItem} />
        <Item type="services" icon="comment" label="شبکه‌های‌اجتماعی و سرویس‌ها" onAddItem={onAddItem} />
        <Item type="locations" icon="location-alt" label="مسیریابی" onAddItem={onAddItem} />
        <Item type="faq" icon="interrogation" label="پرسش های پرتکرار" onAddItem={onAddItem} />
        <Item type="igFeedsLink" icon="picture" label="لینک پست ها" onAddItem={onAddItem} />
        <Item type="igFeedsDownload" icon="download" label="دانلود پست ها" onAddItem={onAddItem} />
      </div>
    </Modal>
  )
}

const Item = React.memo(function Component({ type, icon, label, onAddItem }) {
  return (
    <button
      className="flex flex-col items-center bg-body rounded-md py-4 hover:bg-body-hover transition ease-in-out duration-300 focus:outline-none"
      onClick={() => onAddItem(type)}
    >
      <Icon name={icon} className="text-lg" />
      <span>{label}</span>
    </button>
  )
})

export default AddItem
