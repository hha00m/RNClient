import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'

const ActivityIndecator = (visable = false, style) => {
    const t = Loading.chatLoading;
    if (!visable) return null;
    return <LottieView
        style={{
            width: "98%",
            height: 210,
            alignSelf: "center",
        }}
        autoPlay
        loop
        source={t} />
}

export default ActivityIndecator
