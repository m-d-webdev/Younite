import React, { useState } from 'react'
import L_loader from '../../../components/L_loader'
import { open_alert } from '../../../slices/alert_cmp'
import Texta from '../../../components/Texta'
import ReactDOM from 'react-dom'
import BtnClose from '../../../components/btnClose'
import { useDispatch, useSelector } from 'react-redux'
import { close_addLink } from '../../../slices/userSlice';
import { motion } from 'framer-motion'
import api from '../../../config/axios'
import { Ten } from '../../../slices/ten_slice'
import { AddLinkToProfile, UpdateLink } from '../../../slices/profileSlice'
function AddLink() {
    const dispatch = useDispatch();
    const { isEditingLink, SelectedLinkToEdit } = useSelector(s => s.User);

    if (isEditingLink) {
        // return
    }

    const [LinkDesc, setLinkDesc] = useState(SelectedLinkToEdit.description || "");
    const [ErrorLink, setErrorLink] = useState("");
    const [bodyLink, setBodyLink] = useState(SelectedLinkToEdit.url || "");
    const [IsSaving, setIsSaving] = useState(false);

    const pastFromClipboard = async () => {
        let text = await navigator.clipboard.readText();
        setBodyLink(text)
    }

    const hanelSubmetLnk = async (e) => {

        setIsSaving(true);

        if (!isEditingLink) {
            await dispatch(AddLinkToProfile({ LinkDesc, bodyLink }))
        }
        else {
            await dispatch(UpdateLink({ field: "links", newVal: { _id: SelectedLinkToEdit._id, url: bodyLink, description: LinkDesc } }))
        }
        setIsSaving(false);
    }

    const handelChangeUrl = e => {
        let url = e.target.value;
        if (!/^https:\/\/[a-z0-9-\.\/]/.test(url)) {
            setErrorLink(true);

        } else {

            setErrorLink(false);

        }
        setBodyLink(url)
    }

    return ReactDOM.createPortal(
        <div className='backendMer'>
            <motion.div
                style={{
                    maxWidth: "400px"
                }}
                initial={{
                    scale: 1.05,
                    opacity: 0
                }}
                exit={{
                    scale: 1.05,
                    opacity: 0
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                className="wmia p10 psr br10 bg-l">

                <BtnClose onClick={() => dispatch(close_addLink())} />
                <h1 className='fw900'>
                    <svg className='mr10 w20 h20' style={{ fill: "none", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 15l6 -6"></path> <path d="M11 6l.463 -.536a5 5 0 0 1 7.072 0a4.993 4.993 0 0 1 -.001 7.072"></path> <path d="M12.603 18.534a5.07 5.07 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> </svg>
                    {
                        !isEditingLink ?
                            <>
                                Add new link
                            </> :
                            <>
                                Update a link
                            </>
                    }
                </h1>
                <div className="wmia c-s-s mt20">
                    <label className='mb5 ' htmlFor="inpUrl">Paste the URL here</label>
                    <div className="wmia r-b-c">
                        <input type="url" id="inpUrl" value={bodyLink} onChange={handelChangeUrl} className={`wmia p10 border br5 ${ErrorLink ? "err_inp" : ""}`} placeholder='http://example.com' />
                        <button onClick={pastFromClipboard} className='border  ml5 c-c-c'>
                            <svg style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path> <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path> </svg>
                            <p style={{ fontSize: "10px" }}>Past</p>
                        </button>
                    </div>

                </div>
                <div className="wmia c-s-s mt15">
                    <label className='mb5' htmlFor='inpDesc'>You can add a description</label>
                    <Texta value={LinkDesc} className="border scrl_none" id="inpDesc" onChange={e => setLinkDesc(e.target.value)} placeholder={"This is my url to ..."} style={{ fontSize: "13px", maxHeight: "200px", padding: "5px" }} />
                </div>
                <div className="wmia mt20 r-e-c">
                    {
                        isEditingLink &&
                        <button onClick={() => dispatch(close_addLink())} className='border  mr10'>
                            <svg className='mr5' style={{ transform: "rotate(180deg)" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg>
                            Cancel
                        </button>
                    }

                    {
                        IsSaving ?
                            <div className="r-c-c">
                                <L_loader style={{ borderWidth: "2px" }} />
                                <p className='ml10'>saving</p>
                            </div>
                            :
                            <>
                                <button onClick={hanelSubmetLnk} className='br  w100'> <svg style={{ fill: "none", stroke: "#fff", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path> <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M14 4l0 4l-6 0l0 -4"></path> </svg>  Save</button>
                            </>
                    }

                </div>

            </motion.div>
        </div>,
        document.getElementById("portals")
    )
}

export default AddLink
