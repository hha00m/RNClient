import { useRoute } from '@react-navigation/native';
import React from 'react'
import WebView from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

const pdfViewerScreen = () => {
    const route = useRoute();
    const PdfReader = ({ url: uri }) =>
        <WebView
            bounces={true}
            useWebKit={true}
            scrollEnabled={true}
            javaScriptEnabled={true}
            style={{ flex: 1 }} source={{ uri }} />


    return (
        <View style={styles.container}>
            <PdfReader url={`http://docs.google.com/gview?embedded=true&url=https://albarqexpress.com/dash/invoice/${route.params.item.path}`}
            />
        </View>

    )
}

export default pdfViewerScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
