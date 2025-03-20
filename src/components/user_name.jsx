import React from 'react'
import Btn_follow from './btn_follow'
import { useDispatch, useSelector } from 'react-redux'
import { TimeAgo } from './Abbreviator'
import { BringViewUserData } from '../slices/viewUser'
import { useNavigate } from 'react-router-dom'

const User_ = React.forwardRef(({ id, img_url, name, date, className, nameStyle, dateStyle, btnFlClassName, cntStyle = {} }, ref) => {
    
    const { _id } = useSelector(s => s.User)
    const dispatch = useDispatch();
    const handelGetUserTOView = () => {
        if (_id != id) {
            dispatch(BringViewUserData(id))
        }
    }

    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);

    return (
        <div ref={ref} style={cntStyle} className={`r-s-s ${className} max-w-full`}>
            <div className="r-s-s">
                <img onClick={handelGetUserTOView} src={img_url} className={`${isWorkinOnPhone ? " w30 h30 " : "w40 h40 min-w-10"}  imgCercle `} alt="" />
                <span className="c-s-s  ml10">
                    <strong style={{ cursor: "pointer" }} onClick={handelGetUserTOView} className={`${nameStyle}   w-full max-w-56 truncate opacity-70  hover:opacity-100`}>{name}</strong>
                    {
                        date &&
                        <p className={`fw900  ml5 ${dateStyle}`} style={{
                            opacity: .6,
                            fontSize: "11px"
                        }}>
                            {TimeAgo(date)}
                        </p>
                    }
                </span>
            </div>

            {
                _id != id &&
                <Btn_follow user_id={id} className={` opacity-70  hover:opacity-100 p0 ml10 ${btnFlClassName}`} />
            }
        </div>
    )
})

export default User_
