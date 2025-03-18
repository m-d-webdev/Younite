import React, { useEffect, useRef, useState } from 'react'
import api from '../config/axios'

import Post from '../components/post';
import { useDispatch, useSelector } from 'react-redux';
import { getMorePosts, StartBringingPosts } from '../slices/sections/postsSlices.jsx';



function Home() {

    const { posts, isLoadingPosts } = useSelector(s => s.Posts || []);
    const dispatch = useDispatch();
    const lastElemRef = useRef()

    useEffect(() => {
        if (posts.length == 0) {
            dispatch(StartBringingPosts())
        }
    }, []);

    const observer = new IntersectionObserver(
        ([e]) => {
            if (e.isIntersecting) {
                if (!isLoadingPosts) {
                    dispatch(getMorePosts())
                }
            }
        }
        , { threshold: .5 }
    );

    useEffect(() => {

        if (lastElemRef.current) {
            observer.observe(lastElemRef.current);
        }

        return () => {
            if (lastElemRef.current) {
                observer.unobserve(lastElemRef.current);
            }
        }
    }, [posts]);


    return (
        <div className='wmia c-s-c'>

            {
                posts?.map((p, i) => {
                    if (i == posts.length - 1) {
                        return <Post ref={lastElemRef} key={p._id} postdata={p} />
                    }
                    return <Post key={p._id} postdata={p} />
                }
                )
            }
            {
                [0, 6, 4].map((e) =>
                    <div className="c-s-s mt50 wmia pl20" key={e} style={{ maxWidth: "800px" }}>
                        <div className="r-s-s wmia">
                            <div className="pre_elem w40 h40 imgCercle"></div>
                            <div className="c-s-s ml10">
                                <div className="w200 pre_elem p10 br20"></div>
                                <div className="w100 pre_elem p10 mt10 br10"></div>
                            </div>
                        </div>
                        <div className="mt20   h200 pre_elem br10 mr20" style={{ width: "100%" }}></div>
                    </div>
                )
            }
        </div>
    )
}

export default Home
