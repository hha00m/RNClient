import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'

const ActivityIndecator = (visable = false, style) => {
    // chatLoading
    const t = Loading.loadingList;
    if (!visable) return null;
    return <LottieView
        style={{
            flex: 1,
            alignSelf: "center"
        }}
        autoPlay
        loop
        source={t} />
}

export default ActivityIndecator
