import React from 'react'
import { useFormikContext } from 'formik'
import { Icon, Input } from '@ui-kitten/components';

import AppTextInput from '../AppTextInputLogin'
import ErrorMessage from './ErrorMessage'
export default function AppFormField({ name, ...otherProps }) {
    const { handleChange, errors, setFieldTouched, touched } = useFormikContext();

    return (
        <>
            <Input
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
            />
            <ErrorMessage visible={touched[name]} error={errors[name] ? "تأكد من المعلومات" : ""} />
        </>
    )
}
