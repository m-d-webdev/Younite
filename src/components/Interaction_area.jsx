import { useEffect, useState } from 'react'
import { GetShortNum } from './Abbreviator'
import api from '../config/axios'
import { useDispatch, useSelector } from 'react-redux'
import { add_like_in_local, dislike_in_local } from '../slices/userSlice'
import { BringComments } from '../slices/comments'
import { open_shareWithFriends } from '../slices/SahrePosSlice'
const Interaction_area = ({ onLike, interaction, ownerId, itemId, collection, className, svg_className = "r-s-c mr20" }) => {
    const { likes } = useSelector(s => s.User)
    const [PostLiked, setPostLiked] = useState(likes.some(e => e.itemId == itemId && e.collection_ref == collection));
    const [numLikes, setnumLikes] = useState(interaction.likes);
    const [is_sendingLikeReq, setis_sendingLikeReq] = useState(false)
    const dispatch = useDispatch();
    const Send_like = async (e) => {
        if (is_sendingLikeReq) return
        e.target.disabled = true;
        if (onLike) {
            onLike()
        }
        setis_sendingLikeReq(true)
        setPostLiked(true);
        const res = await api.post("/interaction/add_like", {
            collection_ref: collection,
            itemId, ownerId
        });
        setnumLikes(numLikes + 1)
        dispatch(add_like_in_local({
            collection_ref: res.data.collection_ref,
            itemId: res.data.itemId,
            like_at: res.data.like_at,
            _id: res.data._id
        }))
        e.target.disabled = false
        setis_sendingLikeReq(false)
    }

    const Des_like = async (e) => {
        if (is_sendingLikeReq) return;
        e.target.disabled = true
        setis_sendingLikeReq(true)
        setPostLiked(false);
        const res = await api.post("/interaction/dislike", { _id: likes.filter(e => e.itemId == itemId && e.collection_ref == collection)[0]._id });
        setnumLikes(numLikes - 1)
        dispatch(dislike_in_local(likes.filter(e => e.itemId == itemId && e.collection_ref == collection)[0]._id))
        e.target.disabled = false
        setis_sendingLikeReq(false)
    }

    useEffect(() => {
        setPostLiked(likes.some(e => e.itemId == itemId && e.collection_ref == collection))
    }, [likes])

    // ------------

    const handelOpenComments = () => {
        dispatch(BringComments({
            ownerId,
            articleId: itemId,
            collection_ref: collection
        }))
    }


    return (
        <div className={className}>

            {
                PostLiked ?
                    <span onClick={Des_like} className={svg_className} >
                        <svg version="1.1" style={{ cursor: "pointer" }} viewBox="0 0 2048 2048" className=' likeActive animate__animated  ' xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(615,303)" d="m0 0 31 1 34 3 27 4 30 7 29 9 24 9 27 12 16 8 24 13 23 15 20 14 14 11 13 11 10 9 8 7 15 14 26 26 9 11 11 11 11 14 7 7 5-5 11-13 7-8 11-13 13-14 7-8 10-10 8-7 14-13 8-7 16-13 20-15 33-22 15-9 22-12 29-13 24-9 33-10 36-8 32-4 27-2 35-1 33 2 35 4 26 5 30 8 32 11 25 11 19 9 23 13 16 10 16 11 18 13 12 10 11 9 16 15 13 13 7 8 10 11 10 13 13 17 7 10 12 19 12 21 8 15 14 31 10 26 11 36 6 24 6 33 4 29 2 22v56l-3 34-8 43-8 34-12 36-9 24-9 21-16 34-14 27-14 24-9 15-12 19-8 12-10 14-13 18-14 20-12 15-18 22-12 14-8 10-12 14-11 12-7 8-9 10-7 7-7 8-23 23-7 8-4 2v2h-2v2h-2l-2 4-17 16-11 11h-2v2l-8 7-16 15-8 7-7 7-7 6h-2v2l-8 7-14 12-10 9-11 9-13 11-22 18-12 10-10 8-8 7-26 20-16 12-13 10-14 11-18 13-17 12-34 25-13 9-14 10-17 12-34 23-12 8-20 13-21 13-27 14-21 8-27 7-19 3-14 1h-28l-23-3-21-5-17-6-20-9-27-16-69-46-18-13-17-12-18-13-12-9-17-12-18-13-19-14-14-11-18-14-16-13-13-10-17-14-14-11-16-13-14-11-10-9-11-9-12-11-11-9-13-12-11-9-7-7-8-7-7-7-8-7-7-7-8-7-17-17-6-5-7-8-27-27-7-8-9-9-7-8-13-14-9-11-10-11-9-11-13-15-11-13-11-14-10-13-13-18-11-15-12-17-10-15-13-21-9-15-11-19-12-23-8-16-14-30-10-26-9-25-12-42-6-27-4-25-2-16-2-33v-36l2-27 4-30 7-37 8-31 12-36 8-20 11-24 8-16 13-22 10-16 7-10 10-14 9-12 8-10 12-13 4-5 6-5 7-8 17-16 15-13 13-10 17-12 23-15 26-15 27-13 26-10 24-8 27-7 30-6 36-4z" fill="#FD6261" />
                        </svg>
                        <p className={svg_className != "r-s-c mr20" ? "mt10" : `ml10`}>{GetShortNum(numLikes)}</p>
                    </span>
                    :
                    <span onClick={Send_like} className={svg_className}>
                        <svg version="1.1" style={{ cursor: "pointer" }} viewBox="0 0 2048 2048" className=' h0' xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(600,303)" d="m0 0h34l39 3 30 4 27 6 25 7 31 11 27 12 16 8 23 12 21 13 19 13 19 14 13 11 11 9 5 4v2l4 2 8 8 8 7 23 23 9 11 12 13 10 13 8 9h3l8-10 9-10 7-8 11-13 11-12 1-2h2v-2h2v-2h2l2-4 16-15h2v-2l11-9 13-12 13-10 17-13 20-14 16-10 17-10 29-15 31-13 33-11 27-7 25-5 33-4 30-2h35l37 3 31 4 27 6 25 7 28 10 26 11 22 11 21 12 22 14 18 13 16 12 13 11 13 12 25 25 7 8 11 13 10 13 12 17 12 19 13 23 8 16 11 23 12 31 10 32 6 24 6 31 5 35 3 39v28l-3 41-5 29-6 31-8 30-13 38-12 30-14 29-9 19-12 22-14 24-12 19-10 16-12 17-11 15-11 16-8 11-16 20-11 13-9 11-10 13h-2l-2 4-11 13-7 8-4 5h-2l-2 4-7 8h-2l-2 4-8 8-7 8-22 22-7 8-5 4-7 8-17 16-11 11-8 7-8 8-8 7-16 15-13 12-11 9-10 9-11 9-14 12-16 13-15 13-16 13-8 7-11 8-14 11-26 20-10 8-20 15-13 9-14 10-16 12-20 14-17 12-18 13-17 12-15 10-19 13-17 11-22 14-22 12-15 7-20 7-22 6-22 3-24 1-30-2-25-5-13-4-17-7-19-10-21-12-10-7-51-34-20-14-17-12-18-13-8-6-36-26-17-13-19-14-18-14-16-13-28-22-16-13-14-11-17-14-14-12-11-9-14-12-10-9-8-7-14-12-7-7-8-7-10-9-15-14-17-16-37-37v-2h-2l-7-8-10-10v-2h-2l-7-8-12-13-9-11-11-12-8-10-24-28-22-28-14-19-13-18-14-20-13-20-13-21-15-26-10-19-11-21-13-29-11-28-9-25-12-42-7-33-4-29-2-27-1-24v-13l2-35 4-29 7-39 8-31 14-41 11-26 11-23 12-22 14-23 9-13 13-18 13-16 9-10 14-15 12-12 8-7 11-10 11-9 16-12 21-14 18-11 16-9 17-9 31-13 22-8 28-8 32-7 28-4zm0 101-27 2-33 5-28 7-28 10-21 9-25 13-19 12-18 13-14 11-20 18-18 18-7 8-11 14-12 17-10 16-8 13-15 30-12 31-9 29-7 28-3 16-4 31-1 16v38l2 28 6 36 7 27 9 29 9 24 10 23 16 33 15 27 10 16 11 18 7 10 8 12 10 14 24 32 11 14 14 17 9 11 11 12 9 11 36 39 7 7 7 8 48 48 8 7 8 8 8 7 15 14 8 7 14 12 11 10 8 7 17 14 14 12 10 8 16 13 17 13 12 10 13 10 16 13 14 11 12 9 18 13 17 13 34 24 19 14 13 9 24 16 16 11 36 24 14 9 19 10 18 6 17 3h19l20-3 18-6 17-8 40-26 15-10 19-13 23-16 18-13 14-10 19-14 14-10 19-14 16-12 17-13 18-14 16-13 14-11 17-14 10-8 16-13 10-8 14-12 13-11 11-10 11-9 17-16 10-9 12-11 16-15 7-6v-2l4-2 37-37 7-8 8-8 7-8 7-7 7-8 12-13 9-11 11-13 9-11 14-16 20-26 14-19 11-16 7-10 7-11 13-21 12-20 14-27 7-14 10-22 12-31 7-21 9-33 5-27 3-26 1-14v-46l-3-29-6-34-6-24-10-33-13-31-14-28-9-15-14-21-10-13-11-13-12-13-12-12-8-7-16-13-14-10-15-10-19-11-19-10-37-15-25-8-25-6-20-3-24-2-21-1h-23l-34 3-28 5-23 6-29 10-25 11-22 11-21 13-18 12-13 10-11 9-24 22-6 5-5 6-13 13-9 11-9 10-6 8-8 10-14 19-22 33-8 11-4 5-8 7-16 9-6 3-1-3-5-1v2l-11-3-12-6-10-8-7-8-11-16-16-24-13-18-13-16-9-11-12-14-14-15-10-10-8-7-12-11-28-21-18-12-17-10-18-10-17-8-24-10-31-10-26-6-19-3-24-2-19-1z" />
                        </svg>
                        <p className={svg_className != "r-s-c mr20" ? "mt10" : `ml10`}>{GetShortNum(numLikes)} </p>
                    </span>
            }

            <span onClick={handelOpenComments}
                className={svg_className}>
                <svg version="1.1" viewBox="0 0 2048 2048" className='  w0 h0' xmlns="http://www.w3.org/2000/svg">
                    <path transform="translate(913)" d="m0 0h217v2l4-1 6 4 39 6 58 11 72 17 39 12 35 12 38 15 34 15 25 12 16 8 16 9 11 6 23 13 19 12 16 10 15 10 34 24 10 8 20 15 14 12 9 7 10 9 11 9 16 15 8 7 40 40 7 8 10 11 7 8 11 12 11 14 9 10 12 16 13 17 24 34 13 20 14 23 10 16 14 25 14 27 15 30 14 32 16 41 10 28 10 32 10 35 10 40 9 42 9 52 3 19v5h2v6l1 4 1 3h1v231l-2-2-2-13h-1l-1 5h-2l-2 16-9 51-11 49-11 42-12 40-7 21-17 43-11 27-13 28-17 34-12 22-8 14-26 42-8 13-4 8-1 6 4 14 10 26 11 28 10 22 7 16 7 14 11 23 30 60 10 19 18 35 9 16 10 18 7 14 10 19 6 16 3 17-2 15-4 12-10 14-9 11-9 7-12 6-13 3h-24l-23-7-15-7-24-12-19-10-39-20-17-9-23-11-26-13-28-13-30-14-36-15-38-14-25-9-10-3-10 4-15 10-35 21-16 9-18 10-29 15-19 9-32 14-24 10-21 8-29 10-39 12-35 9-34 8-52 11-54 9-21 3v2h-189l-1-2-50-9-73-14-50-12-28-8-38-12-27-10-27-11-34-15-32-15-16-8-22-12-24-14-28-17-19-12-10-7-14-10-18-13-13-10-9-7-13-10-13-11-11-9-12-11-8-7-16-15-6-5v-2l-4-2-20-20v-2h-2l-7-8-8-8-7-8-8-8-7-8-12-14-9-11-11-13-20-26-13-18-11-16-14-21-10-16-12-20-12-21-12-22-14-27-18-39-11-27-10-26-15-43-10-34-11-44-10-47-6-33v-6l-2-1-1-9-1-3v-2h-2l-2-10-1-1-1-8v-231l3 1 14-75 8-39 8-34 11-37 11-35 11-30 15-37 18-40 19-38 7-12 6-12 11-18 13-22 7-10 7-11 10-15 9-13 7-9 8-11 12-16 11-14 13-16 13-15 7-7 7-8 9-10 11-12 41-41 8-7 12-11 8-7 15-13 10-8 18-14 16-12 19-14 33-22 17-11 20-12 26-15 26-14 26-13 15-7 24-11 27-11 29-11 40-13 40-11 54-13 48-9 47-8 7-1zm95 141-34 1-47 4-37 5-41 7-27 6-50 13-36 12-25 9-30 12-29 13-19 9-19 10-26 14-26 16-15 10-12 7-11 8-18 13-9 7-12 9-13 10-10 8-14 12-6 5v2l-4 2-13 12-12 11-29 29-7 8-11 12-7 8-10 11-9 11-11 14-14 19-12 16-11 16-9 14-10 16-17 28-10 19-8 15-22 46-12 29-10 26-14 41-12 44-9 38-7 43-6 46-3 32-1 20v73l2 33 5 41 9 56 6 30 15 56 12 36 11 30 11 26 15 33 18 36 12 22 17 28 13 20 17 25 21 28 13 16 9 11 12 14 36 39 17 17 8 7 15 14 10 9 11 9 13 11 13 10 16 12 36 26 36 22 15 9 25 14 34 17 28 13 29 12 46 17 33 10 30 8 42 9 43 7 29 4 46 4 35 2h46l43-3 46-5 39-6 39-8 40-10 40-12 44-16 29-12 29-13 34-17 23-13 17-10 19-12 21-13 24-14 15-7 13-3h30l28 4 21 5 19 6 31 11 38 15 30 13 8 4 12 4 7 4 3-1-8-19-8-16-8-17-12-28-15-40-11-35-6-29-3-24 4-20 6-15 6-12 14-22 7-10 14-22 16-27 13-24 10-19 10-21 16-36 17-46 13-41 11-42 7-31 7-41 6-45 3-31 1-20v-67l-3-49-6-51-6-36-7-34-14-54-16-49-18-46-13-29-20-40-13-23-17-29-13-20-13-19-12-17-13-17-16-20-13-15-12-13-7-8-12-13-11-12-17-17-8-7-12-11-8-7-10-9-11-9-15-12-13-10-19-14-23-16-19-12-20-12-22-13-28-15-39-19-38-16-30-11-19-7-33-10-60-15-33-6-57-8-33-3-19-1-36-1zm1033 1e3 1 2zm-1 5m-2035 1 1 2z" />
                    <path transform="translate(880,2045)" d="m0 0h7l5 2v1h-11z" />
                    <path transform="translate(1151)" d="m0 0h16l-3 2h-9z" />
                    <path transform="translate(2047,879)" d="m0 0h1v12l-2-4v-7z" />
                    <path transform="translate(902)" d="m0 0h2l1 3-5 1z" />
                    <path transform="translate(2047,898)" d="m0 0" />
                    <path transform="translate(1135)" d="m0 0h2l-1 2z" />
                    <path transform="translate(1790,1791)" d="m0 0" />
                    <path transform="translate(2047,906)" d="m0 0" />
                    <path transform="translate(2047,902)" d="m0 0" />
                    <path transform="translate(2047,895)" d="m0 0" />
                    <path transform="translate(1131)" d="m0 0 2 1z" />
                    <path transform="translate(1788,1793)" d="m0 0" />
                    <path transform="translate(1779,1780)" d="m0 0" />
                    <path transform="translate(2047,1163)" d="m0 0" />
                    <path transform="translate(4,1158)" d="m0 0" />
                    <path transform="translate(1,1147)" d="m0 0" />
                    <path transform="translate(2,907)" d="m0 0" />
                    <path transform="translate(2047,892)" d="m0 0" />
                    <path transform="translate(1170)" d="m0 0" />
                    <path transform="translate(1148)" d="m0 0" />
                </svg>
                <p className={svg_className != "r-s-c mr20" ? "mt10" : `ml10`}>{GetShortNum(interaction.comments)}  </p>
            </span>
            <span className={svg_className} onClick={() => dispatch(open_shareWithFriends({ contentId: itemId, type: collection }))}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" /></svg>            </span>
        </div>

    )
}

export default Interaction_area
