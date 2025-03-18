import { createBrowserRouter } from 'react-router-dom';
// Pages here   
import Login from '../pages/Login';
import Home from '../pages/home';
import Create_Post from '../pages/create/post_create';
import { Check_token } from '../config/middelwares'
import Reel_create from '../pages/create/reel';
import Reels from '../pages/reels';
import Create_Blog from '../pages/create/blogs';
import Blogs from '../pages/blogs';
import News from '../pages/news';
import Moment_create from '../pages/create/moment';
import Chat_page from '../pages/chat';
import Personal_info from '../pages/user/profile/personal_info';
import Profile_Shares from '../pages/user/profile/shares';
import ResultSearch from '../pages/ResultSearch';
import SharesFriends from '../pages/mediaShares/SharesFriends';


const routes = createBrowserRouter(
    [
        {
            element: <Check_token />,

            children: [
                {
                    path: "/",
                    element: <Home />
                },

                {
                    path: "/News",
                    element: <News />
                },

                {
                    path: "/Reels",
                    element: <Reels />
                },
                {
                    path: "/search",
                    element: <ResultSearch />
                },
                {
                    path: "/Shares",
                    element: <SharesFriends />
                },

                {
                    path: "/Create/moment",
                    element: <Moment_create />
                },

                {
                    path: "/Create/post",
                    element: <Create_Post />
                },

                {
                    path: "/Create/reel",
                    element: <Reel_create />
                },

                {
                    path: "/Create/blog",
                    element: <Create_Blog />
                },

                {
                    path: "/Profile/personal_info",
                    element: <Personal_info />
                },
                {
                    path: "/Profile/shares",
                    element: <Profile_Shares />
                },
               
                {
                    path: "/Search",
                    element: <Login />
                },
                {
                    path: "/Saved",
                    element: <Login />
                },
                {
                    path: "/Friends",
                    element: <Login />
                },
                {
                    path: "/Settings",
                    element: <Login />
                },
                {
                    path: "/Blogs",
                    element: <Blogs />
                },
                {
                    path: "/chat",
                    element: <Chat_page />
                }
            ]
        }
    ]
)

export default routes;