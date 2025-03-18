import React, { useMemo, useState } from 'react'
import User_ from './user_name'
import { motion, AnimatePresence } from "framer-motion"
import Interaction_cmnt from './intteraction_cmnt'
import { useDispatch } from 'react-redux'
import { BringReplies } from '../slices/media/replies'

function Comment_container({ comment, delay }) {
    const dispatch = useDispatch()

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{
                y: 0,
                opacity: 1,
                transition: {
                    delay
                }
            }}
            className='p10 wmia c-s-s r- cmnt_style '
        >
            <User_ className={''} img_url={comment.author.profile_img} id={comment.authorId} name={`${comment.author.FirstName} ${comment.author.LastName}`} date={comment.createAt} />
            <p className='ml20 bg-third p10 br20 mt10'>
                {comment.content}
            </p>
            {
                useMemo(() =>
                    <Interaction_cmnt ownerId={comment.authorId} likes_count={comment.likes} comment_id={comment._id} replies_count={comment.replies_count} onOpenReplies={() => dispatch(BringReplies(comment))} />
                    , [])
            }

        </motion.div>
    )
}

export default Comment_container
