import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'

const ActivityIndecator = (visable = false) => {
    const t = Loading.squers;
    if (!visable) return null;
    return <LottieView
        style={{
            width: "80%",
            alignSelf: "center"
        }}
        autoPlay
        loop
        source={t} />
}

export default ActivityIndecator
