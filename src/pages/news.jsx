import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, distance } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { StartBringingNews } from '../slices/sections/news'
import A_new from '../components/a_new';
function News() {
    const dispatch = useDispatch();
    const { news, isLoadingNews } = useSelector(s => s.News)
    useEffect(() => {
        dispatch(StartBringingNews())
    }, [])

    return (
        <div className='wmia c-s-c' style={{ maxWidth: "800px" }}>
            {
                isLoadingNews &&
                <></>
            }
            {
                !isLoadingNews &&
                <>
                    <div className="wmia c-s-c">

                        {
                            news.map(n =>
                              n.content != "[Removed]" &&  <A_new the_new={n} key={Math.random() * 43} />
                            )
                        }

                    </div>


                </>
            }
        </div>
    )
}

export default News
