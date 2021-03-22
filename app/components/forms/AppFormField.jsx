import React from 'react'
import { useFormikContext } from 'formik'

import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'


export default function AppFormField({ name, ...otherProps }) {
    const { handleChange, errors, setFieldTouched, touched } = useFormikContext();

    return (
        <>
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                {...otherProps} />
            <ErrorMessage visible={touched[name]} error={errors[name] ? "تأكد من المعلومات" : ""} />
        </>
    )
}
