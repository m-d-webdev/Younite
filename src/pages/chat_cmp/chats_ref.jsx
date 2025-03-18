import { useState } from 'react'
import Chat_ref from './chat_ref'
import { useDispatch, useSelector } from 'react-redux'
import L_loader from '../../components/L_loader'
import Chat_imgs from './chat_Img';
import EmptyLottie from '../../components/emptyLottie';
function Chats_refs() {
    const { isLoadingRefs, chats_refs, focused_data } = useSelector(s => s.ChatReducer);
    const dispatch = useDispatch();
    const { contacts, requestsContact } = useSelector(s => s.User)
    const [isOpenLis, setisOpenLis] = useState(true)
    const [SenserTop, setSenserTop] = useState(0)

    return (
        <div
            className="c-s-s  mr10 bg-l hmia" style={{ width: "20%", maxWidth: isOpenLis ? "250px" : "50px" }} >
            {
                isOpenLis &&
                <>
                    <span onClick={() => setisOpenLis(false)} className="r-s-c hoverEff1 wmia mt5 p10 br10">
                        <svg className="w20 h20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ minWidth: "20px", fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M13 5h8"></path> <path d="M13 9h5"></path> <path d="M13 15h8"></path> <path d="M13 19h5"></path> <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path> <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path> </svg>
                        <h1 className="fw900 ml10 " style={{ fontSize: "18px", whiteSpace: "nowrap" }}>
                            Chat List
                        </h1>
                    </span>
                    <div style={{ width: "100%", height: "100%", maxHeight: "100%", overflow: "auto" }} className=' pl10 scrl_none  psr c-s-s '>
                        {
                            (contacts.length == 0 && requestsContact.length == 0) &&
                            <div className="c-c-c wmia h300 p10">
                                <h1 className='text-center'>You haven't added any contacts yet</h1>
                                <EmptyLottie />
                                <button className='wmia p10 bl curP mt20'>
                                    Find contacts
                                </button>

                            </div>
                        }

                        {
                            isLoadingRefs &&
                            <div className="wmia h300 c-c-c">
                                <L_loader />
                            </div>
                        }
                        {
                            (contacts.length > 0 || requestsContact.length > 0) &&focused_data != null&&
                            <div className="Senser wmia bg-third br10" style={{
                                position: "absolute",
                                top: `${(SenserTop * 81)}px`,
                                padding: "1px",
                                left: "0",
                                borderLeft: "solid 1px var(--bg-secondary)",
                                borderRight: "solid 1px var(--bg-secondary)",
                                transition: ".2s",
                                zIndex: "1",
                                height: "81px"
                            }}></div>
                        }


                        {
                            chats_refs.map((c, i) => {

                                // if (c._id == focused_data?._id) {
                                //     setSenserTop(i);
                                // }

                                return <Chat_ref setSenserTop={setSenserTop} chat={c} key={c._id} i={i} />
                            })
                        }
                    </div>

                </>
            }
            {!isOpenLis &&
                <>

                    <span onClick={() => setisOpenLis(true)} className="r-s-c hoverEff1 wmia mt5 p10 br10">
                        <svg className="w20 h20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M13 5h8"></path> <path d="M13 9h5"></path> <path d="M13 15h8"></path> <path d="M13 19h5"></path> <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path> <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path> </svg>
                    </span>
                    <div style={{ width: "100%", height: "100%", maxHeight: "100%", overflow: "auto" }} className='pt10  scrl_none  c-s-s '>

                        {
                            (contacts.length == 0 && requestsContact.length == 0) &&
                            <div className="c-c-c wmia-h300">
                                <EmptyLottie />
                            </div>
                        }

                        {
                            isLoadingRefs &&
                            <div className="wmia h300 c-c-c">
                                <L_loader />
                            </div>
                        }

                        {
                            chats_refs.map((c, i) => <Chat_imgs chat={c} key={c._id} i={i} />)
                        }
                    </div>
                </>
            }
        </div>

    )
}

export default Chats_refs
