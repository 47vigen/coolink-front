import React from 'react'

// ** UI
import { Modal, Icon } from '../Tools'

function AddItem({ isOpenAdd, closeAddModal, onAddItem }) {
  return (
    <Modal label="افزودن آپشن" isOpen={isOpenAdd} closeModal={closeAddModal} className="max-w-sm">
      <div className="grid grid-cols-2 gap-4 p-4">
        <Item type="LINKS" icon="link" label="لینک یا پیوند" onAddItem={onAddItem} />
        <Item type="TEXT" icon="document" label="متن یا توضیح" onAddItem={onAddItem} />
        <Item type="CONTACTS" icon="smartphone" label="اطلاعات تماس" onAddItem={onAddItem} />
        <Item type="MESSANGERS" icon="comment" label="پیام‌رسان ها" onAddItem={onAddItem} />
        <Item type="LOCATIONS" icon="location-alt" label="مسیریابی" onAddItem={onAddItem} />
        <Item type="FAQ" icon="interrogation" label="پرسش های پرتکرار" onAddItem={onAddItem} />
        <Item type="IG_FEEDS_LINK" icon="picture" label="لینک پست ها" onAddItem={onAddItem} />
        <Item type="IG_FEEDS_DOWNLOAD" icon="download" label="دانلود پست ها" onAddItem={onAddItem} />
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
