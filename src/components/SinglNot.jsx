import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pop_notf } from '../slices/new_notifications';
import { AnimatePresence, motion } from 'framer-motion'
import { OpenContact } from '../slices/chatSlice';
import { Ten } from '../slices/ten_slice';
import { useNavigate } from 'react-router-dom';
import { GotToChat } from '../layouts/header';
export default function SinglNot({ n, t, i}) {
    const [IsStileVisible, setIsStileVisible] = useState(true)
    const dispatch = useDispatch();
    const { chats_refs } = useSelector(s => s.ChatReducer)
    let { userName, img } = n
    console.log(n);
    
    if (n.isMessage) {
        let User = chats_refs.find(u => u._id == n.senderId);
        if (!User) return;
        userName = `${User.FirstName} ${User.LastName}`;
        img = User.profile_img;
    }
    let timeOutTODispt = setTimeout(() => {
        setIsStileVisible(false);
    }, (5 - t) * 1000);

    const handelClickNot =()=>{
        if(n.isMessage){
            dispatch(OpenContact(n.senderId)).unwrap().then(()=>{
             GotToChat()
            }).catch(er =>{
                console.log(er);
                
                dispatch(Ten([false ,"Faile to open chat"]))
            })
        }
    }

    return (
        <>
            <AnimatePresence>

                {
                    IsStileVisible &&
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        exit={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                         
                        className=" mb10 p5 curP bg-d r-b-c  psr c-l br10">
                        <div  className="r-s-s wmia ">
                            <img onClick={handelClickNot} src={img} alt="" className='w40 h40 imgCercle' style={{ minWidth: "40px" }} />
                            <div onClick={handelClickNot} className="c-s-s hmia wmia ml10">
                                {
                                    userName &&
                                    <h1 className='fw900 overText c-l' style={{ fontSize: "15px", opacity: ".7", maxWidth: "70%" }}>{userName} kas asdj asdsjd </h1>
                                }

                                <span className='c-l ml5 overText mt5 '
                                    style={{
                                        maxWidth: "80%",
                                    }}
                                >
                                    {
                                        n.message
                                    }
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsStileVisible(false)} className='btnClose' style={{ top: "0" }} >
                            <svg className='f-l' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                        </button>

                    </motion.div>

                }
            </AnimatePresence>

        </>)
}




