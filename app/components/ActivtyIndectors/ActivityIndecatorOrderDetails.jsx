import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'

const ActivityIndecator = (visable = false, style) => {
    const t = Loading.orderDetails;
    if (!visable) return null;
    return <LottieView
        style={{
            marginTop: 20,
            width: 400,
            height: 400,
            alignSelf: "center"
        }}
        autoPlay
        loop
        source={t} />
}

export default ActivityIndecator
