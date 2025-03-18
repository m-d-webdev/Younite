import React, { useEffect, useRef } from 'react'
import Blog from '../layouts/blog'
import { useDispatch, useSelector } from 'react-redux'
import { getMoreBlogs, StartBringingBlogs } from '../slices/sections/blogsSlice';
function Blogs() {
    const { blogs, isLoadingBlogs } = useSelector(s => s.Blogs);
    const dispatch = useDispatch();

    const LastBlogRef = useRef();
    const observer = new IntersectionObserver(
        ([e]) => {
            if (e.isIntersecting) {
                if (!isLoadingBlogs) {
                    dispatch(getMoreBlogs())
                    observer.unobserve(LastBlogRef.current)
                }
            }
        }, { threshold: .5 }
    )

    useEffect(() => {
        dispatch(StartBringingBlogs())


    }, [])

    useEffect(() => {
        if (LastBlogRef.current) {
            console.log('elem rendred');

            observer.observe(LastBlogRef.current)
        }

        return () => {
            LastBlogRef.current && observer.unobserve(LastBlogRef.current)
        }
    }, [blogs])



    return (
        <div className='wmia c-s-c'>

            {
                blogs.map((b, i) => {
                    if (i == blogs.length - 1) {
                        return <Blog ref={LastBlogRef} blog={b} key={b._id} />
                    }
                    return <Blog blog={b} key={b._id} />
                }
                )
            }
            {
                [0, 6].map((e) =>
                    <div style={{ maxWidth: "1000px" }} key={e} className="c-s-s mb50 wmia pl20">
                        <div className="mb20 mt50 ml10 wmia h600 pre_elem br10 mr20" ></div>
                        <div className="r-s-s">
                            <div className="pre_elem w40 h40 imgCercle"></div>
                            <div className="c-s-s ml10">
                                <div className="w200 pre_elem p10 br20"></div>
                                <div className="w100 pre_elem p10 mt10 br10"></div>
                            </div>
                        </div>


                    </div>
                )
            }
        </div>
    )
}

export default Blogs
