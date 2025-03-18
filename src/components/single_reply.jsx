import React from 'react'
import User_ from './user_name'
import { motion } from 'framer-motion'
function Single_reply({ r, i }) {
    return (
        <motion.div
            initial={{
                y: 30,
                opacity: 0
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.1
                }
            }}
            className='SingleReplay psr wmia pl20 mt20 c-s-s p10'>
            <svg className='iconeTurnRight' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M520-160v-304L320-664v90h-80v-226h226v80h-90l201 201q11 11 17 25.5t6 30.5v303h-80Z" /></svg>
            <User_ img_url={r.author.profile_img} name={`${r.author.FirstName} ${r.author.LastName}`} date={r.createAt} id={r.authorId} />
            <p className="bg-third p10 mt10 ml20">
                {r.content}
            </p>
        </motion.div>
    )
}

export default Single_reply
