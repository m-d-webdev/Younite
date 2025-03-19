import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { checkTheme } from './settings';
import Routes from './layouts/routes';
import { Router, RouterProvider, useLocation, useNavigate, useParams } from 'react-router-dom';
import { get_user_personal_data } from './slices/userSlice';
import { has_access } from './config/middelwares';
import { Ten_cmp } from "./slices/ten_slice"
import Portals from './layouts/portals';
import { AnimatePresence } from 'framer-motion'
import { ImgsSlider_page } from "./slices/ImgsSlider"
import { ShowMoments, ShowuserMoments } from './slices/Moments_sideBare';
import View_user_cmp from './components/view_user_cmp';
import Report_friend from './components/report_friend';
import Show_followers from './components/show_followers';
import Show_followings from './components/show_followings';
import Show_Freind_posts from './components/show_friend_posts';
import Show_Freind_reels from './components/show_friend_reels.jsx';
import Show_Freind_blogs from './components/show_friend_blogs.jsx';
import { BringNotifications } from './slices/NotificationSlice.js';
import { Bringchats_ref, Message_Tracker, SyncMessages } from './slices/chatSlice.js';
import { connectTOSocket } from './config/socket.js';
import IsUserTyping_cmp from './components/isUserTyping.jsx';
import LisrNotf from './layouts/LisrNotf.jsx';

import Check_notification from "./pages/check_notification"
import Confimation from './components/Confimation.jsx';
import AddLink from './pages/user/profile/addLink.jsx';
import ScrollReelsCmp from './pages/scrollReels.jsx';
import ShareArticle from './pages/mediaShares/ShareArticle.jsx'
import Show_sharedPosts from './pages/mediaShares/show_sharedPosts.jsx';
import { setSidesOpen, setWinSize } from './slices/WnidowSize.js';


function App() {
  const dispatch = useDispatch();
  const Ten_vsblt = useSelector(s => s.Ten.is_visible)
  const ImgsSLiderVsblity = useSelector(s => s.ImgsSlider.is_visible)
  const { ShowMomentVSBL, ShowuserMomentsVSBL } = useSelector(s => s.Moments)
  const { isViewUserVisible } = useSelector(s => s.ViewUser)
  const { isReportOpen } = useSelector(s => s.Report)
  const { showFollowers, showFollowings, showPosts, showReels, showBlogs } = useSelector(s => s.ViewUser);
  const { isSyncingMessages, isAllSaved } = useSelector(s => s.ChatReducer)
  const { isAddLinkCmpVsbl } = useSelector(s => s.User)
  const CheckNotVSBL = useSelector(s => s.CheckNotReducer.isVisible)
  const isScrollReelVisible = useSelector(s => s.ScrollReels.isVisible)
  const sharePostsVisible = useSelector(s => s.SharePostReducer.isVisible)
  const { isShowingsPost } = useSelector(s => s.SharePostReducer);

  let InterSayincong;


  const Prepare_App_Env = useMemo(() => {
    return async () => {
      dispatch(checkTheme());
      if (has_access()) {
        let user = await dispatch(get_user_personal_data());
        await dispatch(Bringchats_ref())
        await connectTOSocket(user.payload._id, user.payload.following)
        dispatch(Message_Tracker());
        await dispatch(BringNotifications());

        // InterSayincong = setInterval(() => {
        //   if (!isSyncingMessages && !isAllSaved) {
        //     dispatch(SyncMessages());
        //   }
        // }, 5000)

      }
    }
  })


  useEffect(() => {
    Prepare_App_Env();
    window.onresize = e => {
      dispatch(setWinSize(window.innerWidth < 800))

    }
    return () => {
      clearInterval(InterSayincong)
    }
  }, [])






  return (
    <>

      <>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

    
      </>

      <RouterProvider router={Routes} />

      <Portals />
      <AnimatePresence >
        {
          Ten_vsblt &&
          <Ten_cmp />
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          isViewUserVisible &&
          <View_user_cmp />
        }
      </AnimatePresence>

      {
        ImgsSLiderVsblity &&
        <ImgsSlider_page />
      }
      {
        ShowMomentVSBL &&
        <ShowMoments />
      }
      {
        ShowuserMomentsVSBL &&
        <ShowuserMoments />
      }
      <AnimatePresence>
        {
          isReportOpen &&
          <Report_friend />
        }
        {
          showFollowers.isVisible &&
          <Show_followers />
        }
        {
          showFollowings.isVisible &&
          <Show_followings />
        }
        {
          showPosts.isVisible &&
          <Show_Freind_posts />
        }
        {
          showReels.isVisible &&
          <Show_Freind_reels />
        }
        {
          showBlogs.isVisible &&
          <Show_Freind_blogs />
        }
      </AnimatePresence>


      {
        useMemo(() => <LisrNotf />, [])
      }

      <IsUserTyping_cmp />


      <AnimatePresence >
        {
          useMemo(() => {
            return (
              <>
                {
                  CheckNotVSBL &&
                  <Check_notification />
                }
              </>
            )
          }

            , [CheckNotVSBL])
        }
      </AnimatePresence>
      <Confimation />
      <AnimatePresence>
        {isAddLinkCmpVsbl &&
          <AddLink />
        }
        {isScrollReelVisible &&
          <ScrollReelsCmp />
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          sharePostsVisible &&
          <ShareArticle />
        }
      </AnimatePresence>

      <AnimatePresence>

        {isShowingsPost &&
          <Show_sharedPosts />
        }
      </AnimatePresence>
    </>
  )
}

export default App
