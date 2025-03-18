import React from 'react'
import Lottie from 'react-lottie'
import ANimateD from '../resources/Animation - 1740327353112.json'
const NoMicLottie = () => {
    return (
        <Lottie options={{
            animationData: ANimateD,
            loop: true,
            autoplay: true
        }}
        />
    )
}

export default NoMicLottie
