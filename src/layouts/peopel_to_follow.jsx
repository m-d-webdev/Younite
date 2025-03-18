import React, { useEffect, useState } from 'react'
import L_loader from '../components/L_loader';
import api from '../config/axios';
import Btn_follow from '../components/btn_follow';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import { BringViewUserData } from '../slices/viewUser';
function Peopel_to_follow() {
    const [isLoadingPeopleWantToFOllo, setisLoadingPeopleWantToFOllo] = useState(true)
    const [peopleF, setpeopleF] = useState([])
    const { following } = useSelector(s => s.User);
    const dispatch = useDispatch()
    const PeoplerToFOllow = async () => {
        const resP = await api.get('/users/to_follow');
        setisLoadingPeopleWantToFOllo(false);
        setpeopleF(resP.data.users)
    }


    useEffect(() => {
        PeoplerToFOllow()
    }, [following])

    return (
        <>
            {
                peopleF.length > 0 &&

                <div className='wmia bg-l mt20 p10 br10 '>
                    <div className="r-b-c">
                        <p>People you might like to follow</p>
                    </div>
                    {
                        isLoadingPeopleWantToFOllo ?
                            <div className="wmia h100 c-c-c">
                                <L_loader />
                            </div>
                            :
                            <>
                                <div className="wmia c-s-s mt10 scrl_none" style={{ maxHeight: "300px", overflow: "auto" }}>
                                    {
                                        peopleF.map(p => {
                                            if (!following.includes(p._id)) {
                                                return (
                                                    <motion.div animate={{ y: [-50, 0], opacity: [0, 1] }} key={p._id} className="wmia r-b-c p10 hoverEff1 br10">
                                                        <div onClick={() => dispatch(BringViewUserData(p._id))} className="r-s-c">
                                                            <img style={{ minWidth: "40px", minHeight: "40px" }} src={p.profile_img} alt="" className="w40 h40 imgCercle" />
                                                            <strong className='ml10'> {p.FirstName} {p.LastName}</strong>
                                                        </div>
                                                        <Btn_follow user_id={p._id} className={'bg-rev-l c-b'} />
                                                    </motion.div>
                                                )
                                            }
                                        }
                                        )
                                    }
                                </div>
                            </>
                    }
                </div>
            }

        </>

    )
}

export default Peopel_to_follow
