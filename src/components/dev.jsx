import { motion } from 'framer-motion'
import React from 'react'
const Dev = React.forwardRef(
    (
        { children, initial, animate, exit, className,  style },
        ref
    ) => {
        if (!initial) {
            initial = {
                scale: 0.4,
                transformOrigin: "top center"
            }
        }
        if (!animate) {
            animate = {
                scale: 1,
                transition: { type: "spring", duration: .3 }
            }
        }
        if (!exit) {
            exit = {
                scale: 0,
                transition: { type: "spring", duration: .3 }

            }
        }

        return (
            <motion.div
                ref={ref}
                className={className}
                initial={initial}
                animate={animate}
                exit={exit}
                style={style}
            >
                {children}
            </motion.div>
        )
    })


export default Dev
