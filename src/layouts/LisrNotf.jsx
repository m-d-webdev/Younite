import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { pop_notf } from '../slices/new_notifications';
import SinglNot from '../components/SinglNot';
import { useNavigate } from 'react-router-dom';
function LisrNotf() {
    const { notfsList } = useSelector(s => s.NewNotfReducer);
    const dispatch = useDispatch();

    return (
        <div className='cntNotfList '>
            {
                notfsList.map((e, i) => {
                    let NotfTimeOut = Math.floor(new Date() / 1000) - (Math.floor(new Date(e.notId) / 1000));
                    if (NotfTimeOut < 5) {
                        return <SinglNot i={i} t={NotfTimeOut} n={e} key={e.notId} />
                    }
                })
            }
        </div>
    )
}

export default LisrNotf
