import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { BringViewUserData } from '../slices/viewUser'

function List_Views({ views }) {
    const dispatch = useDispatch()
    if (views.length == 0) return <div className="wmia   c-c-c" style={{ height: "100%" }}> <h1 className='p10 bg-l'>No one has viewed this yet</h1> </div>
    return (
        <div className="wmia c-s-s scrl_none   p20" style={{ height: "100%", maxHeight: "100%", overflow: "auto" }}>
            {
                views.map((l, i) =>
                    <motion.div onClick={()=> dispatch(BringViewUserData(l._id))} animate={{ y: [-20, 0], opacity: [0, 1], transition: { delay: i * .05 } }} key={l._id} className="r-s-c curP wmia  br10 bg-l p10 mb20" style={{}}>
                        <img src={l.profile_img} className='w40 h40 imgCercle' alt="" />
                        <strong className='ml10'>{l.FirstName} {l.LastName}</strong>
                    </motion.div>
                )
            }
        </div>

    )
}

export default List_Views
