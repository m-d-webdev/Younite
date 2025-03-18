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


    return (
        <div ref={ref} style={cntStyle} className={`r-s-s ${className}`}>
            <div className="r-s-s ">
                <img onClick={handelGetUserTOView} src={img_url} className='w40 h40 imgCercle ' alt="" />
                <span className="c-s-s ml10">
                    <strong style={{ cursor: "pointer" }} onClick={handelGetUserTOView} className={`${nameStyle} fw900`}>{name}</strong>
                    {
                        date &&
                        <p className={`fw900 mt5 ml10 ${dateStyle}`} style={{
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
                <Btn_follow user_id={id} className={` p0 ml10 ${btnFlClassName}`} />
            }
        </div>
    )
})

export default User_
