import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import * as Yup from 'yup';

import { ErrorMessage, AppFormField, AppForm, SubmitButton } from '../components/forms'
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import Screen from '../components/Screen';
import colors from '../config/colors';
import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorLoading';

const validationSchema = Yup.object().shape({
    phone: Yup.string().required().min(11).max(11).label("رقم الهاتف"),
    password: Yup.string().required().min(4).label("كلمةالمرور")
});
export default function LoginPage() {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const handleSubmit = async ({ phone, password }) => {
        setIsLoading(true);
        const results = await authApi.login(phone, password);
        if (!results.ok) {
            setIsLoading(false);
            return setLoginFailed(true);
        }
        if (!results.data.token) {
            setIsLoading(false);
            return setLoginFailed(true);
        }
        setLoginFailed(false);
        setIsLoading(false);
        console.log("from inside of login page:", results)
        auth.logIn((results.data))
    }
    return (
        <Screen >
            {isLoading && <ActivityIndecator visible={isLoading} />}

            <AppForm
                initialValues={{ phone: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/logo/logo.png')} />
                    <Text style={styles.text}>أهلا وسهلا بكم </Text>
                </View>
                <View style={styles.formContainer}>
                    <ErrorMessage error="رقم الهاتف او كلمة المرور خطاْ" visible={loginFailed} />
                    <AppFormField
                        rightIcon='cellphone-iphone'
                        name="phone"
                        caption="رقم الموبايل"
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        autoCorrect={false}
                    />
                    <AppFormField
                        rightIcon='lock'
                        leftIcon='eye'
                        caption="كلمة المرور"
                        name="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="password"
                    />
                    <SubmitButton title="تسجيل دخول" />
                </View>
            </AppForm>

        </Screen>
    )
}

const styles = StyleSheet.create({
    logoContainer: {
        top: "5%",
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5
    },
    text: {
        fontSize: 20,
        paddingVertical: 5,
    },

    logo: {
        width: 100,
        height: 100,
    },

    formContainer: {
        backgroundColor: colors.white,
        width: "95%",
        height: 220,
        top: "10%",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})
