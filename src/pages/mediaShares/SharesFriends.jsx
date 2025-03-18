import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterFriendsWitchShare, GetSharedMedia } from '../../slices/SahrePosSlice'
import L_loader from '../../components/L_loader'
import OpenSharesFriend from '../../components/OpenSharesFriend'
import SignleSharedMedia from './SignleSharedMedia'
import Show_sharedPosts from './show_sharedPosts'
import { AnimatePresence } from 'framer-motion'
import User_ from '../../components/user_name'

function SharesFriends() {
  const { isLoadingSharesFromFriendsObject, SharesFromFriendsObject, isGettingShares, choosedFriend } = useSelector(s => s.SharePostReducer)
  const [choosedFriendDATA, setchoosedFriendDATA] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    if (Object.values(SharesFromFriendsObject).length == 0) {
      dispatch(FilterFriendsWitchShare());
    }
  }, []);

  const containerRef = useRef(null);
  useEffect(() => {
    setchoosedFriendDATA(SharesFromFriendsObject[choosedFriend]?.friendData)
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth"
    })
  }, [isGettingShares]);
  return (
    <div className=' p10 wmia hmia  bg-third  r-s-s' style={{}}>

      <div className="c-s-s  bg-l p5  hmia " style={{ width: "20%" }}>
        <div className="r-s-c p10  wmia " >
          <svg className='f-no w40 h40 mr10 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4.876 13.61a4 4 0 1 0 6.124 3.39h6"></path> <path d="M15.066 20.502a4 4 0 1 0 1.934 -7.502c-.706 0 -1.424 .179 -2 .5l-3 -5.5"></path> <path d="M16 8a4 4 0 1 0 -8 0c0 1.506 .77 2.818 2 3.5l-3 5.5"></path> </svg>
          <h1 className='f-18 fw900'>
            participating friends
          </h1>
        </div>
        {
          isLoadingSharesFromFriendsObject ?
            <div className="wmia h200 c-c-c">
              <L_loader />
              <p className='mt10 fw900'> Just a moment </p>
            </div>
            :
            <div className='wmia  c-s-s  scrl_none' style={{ maxHeight: "100%", overflow: "auto" }}>
              {
                Object.keys(SharesFromFriendsObject).sort((a, b) => new Date(SharesFromFriendsObject[b].lastShare.sentAt) - new Date(SharesFromFriendsObject[a].lastShare.sentAt)).map(f => <OpenSharesFriend lastShare={SharesFromFriendsObject[f].lastShare} friendData={SharesFromFriendsObject[f].friendData} key={f} />)
              }
            </div>
        }
      </div>
      <div className="c-s-c hmia" style={{ width: "80%" }}>

        {
          choosedFriend == null &&
          <div className="wmia c-c-c hmia">
            <img src="/media/5537739_2876880-removebg-preview.png" alt="" />
            <h1 className="fw900 fs20 text-center">
              Here you can review all the media that you or your friends send you.
            </h1>
          </div>
        }
        {

          choosedFriendDATA != null &&
          <div className='wmia ml15 r-s-c bg-l p10 br10 '>
            <User_ id={choosedFriendDATA._id} img_url={choosedFriendDATA.profile_img} name={choosedFriendDATA.FirstName + " " + choosedFriendDATA.LastName} />
          </div>
        }
        <div className='wmia scrl_none p10' ref={containerRef} style={{ maxHeight: "100%", overflow: "auto" }}>
          {
            isGettingShares ?
              <div className="wmia c-c-c mt20">
                <L_loader />
                <p className="mt10 fw900 op-7">Just a moment</p>
              </div>
              :
              <>
                {
                  choosedFriend != null &&
                  <div >
                    {SharesFromFriendsObject[choosedFriend].media.map(m => <SignleSharedMedia m={m} key={m._id} />)}
                  </div>

                }
              </>
          }



        </div>

      </div>
    </div>
  )
}

export default SharesFriends
