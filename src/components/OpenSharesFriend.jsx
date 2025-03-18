import React from 'react'
import { TimeAgo, CorrectTime } from './Abbreviator'
import { GetSharedMedia } from '../slices/SahrePosSlice';
import { useDispatch } from 'react-redux';

function OpenSharesFriend({ friendData, lastShare }) {
    const Term = `
    ${lastShare.type.substring(0, lastShare.type.length - 1)} from 
    ${lastShare.author.FirstName} ${lastShare.author.LastName}
    `;
    const dispatch = useDispatch();




    return (
        <div onClick={() => dispatch(GetSharedMedia(friendData._id))}  className='wmia  mb20 curP p5 r-s-c'>
            <img  src={friendData.profile_img} style={{ minWidth: "40px" }} alt="" className="imgCercle w40 h40" />
            <div style={{ width: "65%" }} className="ml10 c-s-s">
                <h1
                    style={{
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                    className="fw900 op-7 wmia fs-16">{friendData.FirstName} {friendData.LastName}</h1>
                <span
                    style={{
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                    className="wmia mt10 r-s-c fw900 ">
                    {
                        lastShare.fromMe ?
                            <svg className='f-no op-7 mr5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 7l10 10"></path> <path d="M16 7l-9 0l0 9"></path> </svg>
                            :
                            <svg className='f-no op-7 mr5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 7l10 10"></path> <path d="M17 8l0 9l-9 0"></path> </svg>
                    }
                    {Term}
                </span>
            </div>
            <div className="c-c-c">
                <span className="fw900 fs-15">
                    {
                        CorrectTime(lastShare.sentAt)
                    }

                </span>
            </div>
        </div>
    )
}

export default OpenSharesFriend
