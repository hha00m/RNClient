import React from 'react'
import { useFormikContext } from 'formik'
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../../config/colors';
const SubmitButton = ({ title }) => {
    const { handleSubmit } = useFormikContext();
    return (
        // <AppButton title={title}
        //     onPress={handleSubmit} />
        <Button style={styles.button} icon="login" mode="contained" onPress={handleSubmit}>
            {title}
        </Button>
    )
}

export default SubmitButton;
const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: 220,
        fontFamily: "Tjw_blod",
        alignSelf: 'center',
        justifyContent: "center",
        marginBottom: 5,
        height: 54,
        width: 335,
        borderRadius: 0,
        backgroundColor: colors.vueColorButtom
    }
});