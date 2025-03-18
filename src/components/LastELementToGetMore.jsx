import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetLastsELements } from '../slices/GetLastsElements';
import L_loader from './L_loader';

const LastELementToGetMore = ({ children, endPoint, ids, targetData, otherParams = {} }) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    const observer = new IntersectionObserver(
        async ([e]) => {
            if (e.isIntersecting) {
                if (!isLoading) {
                    observer.unobserve(lastElemeRef.current);
                    setLoading(true)
                    await dispatch(GetLastsELements({ endPoint, targetData, ids, otherParams }))
                    setLoading(false)
                }
            }
        }, { threshold: 1 }
    );
    const lastElemeRef = useRef();


    useEffect(() => {

        if (lastElemeRef.current) {
            observer.observe(lastElemeRef.current);
        }

        return () => {
            if (lastElemeRef.current) {
                observer.unobserve(lastElemeRef.current);
            }
        }
    }, [])
    return (
        <>

            {children}
            {
                isLoading &&
                <div className="wmia h100 r-c-c">
                    <L_loader />
                </div>
            }
            <div
                ref={lastElemeRef}
                className="w100 op0">
            </div>
        </>
    )
}

export default LastELementToGetMore
