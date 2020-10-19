import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'

const ActivityIndecator = (visable = false, style) => {
    const t = Loading.orderDetails;
    if (!visable) return null;
    return <LottieView
        style={{
            flex: 1,
        }}
        autoPlay
        loop
        source={t} />
}

export default ActivityIndecator
