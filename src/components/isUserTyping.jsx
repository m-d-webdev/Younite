import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from 'react-redux';
function IsUserTyping_cmp() {
  const { chats_refs } = useSelector(s => s.ChatReducer)
  const [UserTyping, setIsUserTyping] = useState(chats_refs.find(e => e.isTyping == true))
  useEffect(() => {
    setIsUserTyping(chats_refs.find(e => e.isTyping))
  }, [chats_refs])
  return (
    <div className="wmia r-e-c"
      style={{
        position: "fixed",
        bottom: "20px",
        zIndex: "2",
        opacity: .8,
        paddingRight: "50px"
      }}
    >
      <AnimatePresence>
        {
          UserTyping &&
          <motion.span
            style={{

            }}
            initial={{
              y: 100,
              opacity: 0
            }}
            exit={{
              y: 100,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            className='p5 r-s-c br5 pl10 pr10 bg-d c-l'
          >
            <p className='fw900 mr5 c-l'> {
              UserTyping.FirstName
            }</p>
            is writing to you...
          </motion.span>
        }
      </AnimatePresence>
    </div>
  )
}

export default IsUserTyping_cmp
