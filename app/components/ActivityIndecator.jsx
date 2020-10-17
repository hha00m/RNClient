import React from 'react'
import LottieView from 'lottie-react-native';

const ActivityIndecator = (visable = false, style) => {
    if (!visable) return null;
    return <LottieView
        style={[{ flex: 1 }, style]}
        autoPlay
        loop
        source={"../assets/lf20_99VKMQ.json"} />
}

export default ActivityIndecator
