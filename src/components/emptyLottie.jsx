import React from 'react'
import Lottie from 'react-lottie'
import animateData from '../resources/Animation - 1738839301737.json'
function EmptyLottie({ h = 100 }) {
    return (
        <div className='r-c-c'>
            <Lottie options={{
                loop: true,
                animationData: animateData,
                autoplay: true
            }} height={h} />
        </div>
    )
}

export default EmptyLottie
