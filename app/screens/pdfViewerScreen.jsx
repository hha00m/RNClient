import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import WebView from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'
import ActivityIndecator from '../components/ActivtyIndectors/ActivityIndecatorLoading'

const pdfViewerScreen = () => {
    const route = useRoute();
    const [isLoading, setLoading] = useState(true);
    const PdfReader = ({ url: uri }) =>
        <WebView
            bounces={true}
            useWebKit={true}
            scrollEnabled={true}
            javaScriptEnabled={true}
            style={{ flex: 1 }} source={{ uri }} />


    return (
        <View style={styles.container}>
            {/* <PdfReader url={`http://docs.google.com/gview?embedded=true&url=https://albarqexpress.com/dash/invoice/${route.params.item.path}`} /> */}
            {isLoading && <ActivityIndecator />}
            <PDFReader
                onLoadEnd={() => setLoading(false)}
                onLoad={() => setLoading(true)}

                withScroll={true}

                source={{
                    uri: `https://albarqexpress.com/dash/invoice/${route.params.item.path}`,
                }}
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
