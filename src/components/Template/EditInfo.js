import React from 'react'
import { Form, Formik } from 'formik'

// ** UI
import { Icon, Modal, Button, Avatar, Field, Upload } from '../Tools'

// ** Validations
import * as Yup from 'yup'
const validationSchema = Yup.object().shape({
  profilePic: Yup.string(),
  title: Yup.string().required('نام/عنوان الزامی است!'),
  subTitle: Yup.string()
})

function EditInfo({ page, isOpenEditInfo, closeEditInfoModal, onEditInfo }) {
  return (
    <Modal label="ویرایش مشخصات" isOpen={isOpenEditInfo} closeModal={closeEditInfoModal} className="max-w-sm">
      <Formik initialValues={{ profilePic: '', title: '', subTitle: '', ...page }} validationSchema={validationSchema} onSubmit={onEditInfo}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="p-4">
            <Upload.Single
              pk={values.pk}
              onChange={(url) => setFieldValue('profilePic', url, false)}
              className="w-20 h-20 mx-auto rounded-lg overflow-hidden"
            >
              <Avatar url={values.profilePic} className="w-20 h-20 rounded-lg mx-auto mb-2" />
              <Icon name="plus" className="absolute bottom-0 left-0 bg-body text-sm leading-4 p-1 rounded-md transition duration-300" />
            </Upload.Single>
            <Field name="title" label="نام/عنوان" placeholder="لطفا نام/عنوان خود را وارد کنید ..." />
            <Field name="subTitle" label="زیر عنوان" placeholder="لطفا زیر عنوان خود را وارد کنید ..." />
            <Button className="w-full" loading={isSubmitting} htmlType="submit">
              ذخیره
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default EditInfo
