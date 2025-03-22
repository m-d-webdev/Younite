import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { _OnContainerClickOut } from '../../../components/Abbreviator'
import BtnClose from '../../../components/btnClose'
import L_loader from '../../../components/L_loader'
import { motion } from 'framer-motion'
import api from '../../../config/axios'
import { open_upload_pic, UpdateField } from '../../../slices/profileSlice'
import { Ten } from '../../../slices/ten_slice'
const EditInfo = ({ onCLose }) => {
    const info = useSelector(s => s.Profile.data);
    const [firstName, setRirstName] = useState(info.FirstName)
    const [lastName, setlastName] = useState(info.LastName);
    const UserDate = info.BirthDay?.split("-").map(r => Number(r));
    const [year, setYear] = useState(UserDate[0]);
    const [month, setMonth] = useState(UserDate[1]);
    const [day, setDay] = useState(UserDate[2]);
    const [IsSaving, seIsSaving] = useState(false);
    const [someThingsChanged, setsomeThingsChanged] = useState(false);
    const [fieldSaved, setFieldSaved] = useState({
        firstName: false,
        lastName: false,
        birthDay: false,
    })
    const dispatch = useDispatch()
    useEffect(() => {
        setsomeThingsChanged(
            firstName != info.FirstName ||
            lastName != info.LastName ||
            year != UserDate[0] ||
            month != UserDate[1] ||
            day != UserDate[2]
        )
    }, [firstName, lastName, year, month, day])
    const containerRef = useRef();

    let contOption = (ye, cou) => {
        let arr = [];
        if (ye) {
            for (var i = (new Date().getFullYear() - 120); i < new Date().getFullYear() - 12; i++) {
                arr.push(i)
            }


            return <>
                {
                    arr.map((o, i) => < option value={o} key={o} > {o}</option >)
                }
            </>
        }


        for (let i = 1; i < 32; i++) {
            arr.push(i);
        }


        return <>
            {
                arr.map((o, i) => i <= cou && < option value={o} key={o} > {o}</option >)
            }
        </>
    };



    const hanelSubmeChange = async () => {
        seIsSaving(true);
        if (firstName == "") {
            seIsSaving(false);
            return dispatch(Ten([false, "Please enter your last name! 😊"]))
        }
        if (lastName == "") {
            seIsSaving(false);
            return dispatch(Ten([false, "Please enter your last name! 😊"]))
        }
        if (firstName != info.FirstName) {
            await dispatch(UpdateField({ field: "FirstName", newVal: firstName })).then(res => setFieldSaved({ ...fieldSaved, firstName: true }))
        }
        if (lastName != info.LastName) {
            await dispatch(UpdateField({ field: "LastName", newVal: lastName })).then(res => setFieldSaved({ ...fieldSaved, lastName: true }))
        }
        if (year != UserDate[0] || month != UserDate[1] || day != UserDate[2]) {
            await dispatch(UpdateField({ field: "BirthDay", newVal: `${year}-${month}-${day}` })).then(res => setFieldSaved({ ...fieldSaved, birthDay: true }))
        }
        setsomeThingsChanged(false)
        seIsSaving(false);






    }

    return (
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, containerRef.current, () => onCLose())}
        >
            <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                exit={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                ref={containerRef} style={{ maxWidth: "500px" }} className="wmia p10 bg-l br10">
                <div className="wmia pb10 r-s-c psr">
                    <svg style={{ fill: "none" }} className='w20 h20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path> <path d="M13.5 6.5l4 4"></path> <path d="M16 19h6"></path> </svg>
                    <strong className='ml10'>Edit your information</strong>
                    <BtnClose style={{ top: 0, padding: "0" }} onClick={() => onCLose()} />
                </div>
                <button className='border  wmia p10  mt10 ' onClick={() => dispatch(open_upload_pic())}>
                    <p className='fw900 mr10'>change profile picture</p>
                    <svg className='' style={{ fill: "none", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M15 8h.01"></path> <path d="M11 20h-4a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v4"></path> <path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l3 3"></path> <path d="M14 14l1 -1c.31 -.298 .644 -.497 .987 -.596"></path> <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z"></path> </svg>
                </button>

                <div className="wmia r-b-c mt20">
                    <div className="LabelInpInfo m5">
                        {
                            fieldSaved.firstName &&
                            <svg className='w20 h20' style={{ right: "5px", strokeWidth: 2, fill: "none", position: "absolute", top: "-25px", stroke: "var(---)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path> <path d="M9 12l2 2l4 -4"></path> </svg>
                        }
                        <input className='fw900' value={firstName} onChange={e => setRirstName(e.target.value)} type="text" id='first-name' placeholder='' />
                        <label htmlFor="first-name fw900">First name</label>
                    </div>
                    <div className="LabelInpInfo m5">
                        {
                            fieldSaved.lastName &&
                            <svg className='w20 h20' style={{ right: "5px", strokeWidth: 2, fill: "none", position: "absolute", top: "-25px", stroke: "var(---)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path> <path d="M9 12l2 2l4 -4"></path> </svg>
                        }
                        <input className='fw900' value={lastName} onChange={e => setlastName(e.target.value)} type="text" id='last-name' placeholder='' />
                        <label htmlFor="last-name fw900">Last name</label>
                    </div>
                </div>
                <div className="r-s-c  psr mt20">

                    <svg version="1.1" viewBox="0 0 2048 2048" className="mr10" xmlns="http://www.w3.org/2000/svg">
                        <path transform="translate(373,32)"
                            d="m0 0h13l16 2 14 5 14 9 14 14 9 14 5 11 3 11 1 9 1 36v56l10-1h243v-62l2-36 3-13 8-15 9-12 10-10 14-9 11-5 13-3h32l16 4 11 6 15 12 11 14 9 17 4 15 1 7 1 42v28l-1 20h251l1-18 1-50 1-28 2-10 5-12 12-17 15-15 13-8 11-5 8-2 9-1h19l14 2 13 5 11 7 10 9 9 10 8 13 5 11 3 12 1 9v88h253v-87l1-11 7-20 10-16 14-14 15-10 12-5 8-2 12-1h12l16 2 15 5 11 7 10 9 9 10 8 13 5 12 3 16 1 16 1 76h69l25 1 20 3 15 4 14 7 12 8 10 9 8 7 11 14 8 13 8 15 6 15 5 16 3 17 1 15v1513l-2 34-5 25-5 15-8 16-7 12-8 11-11 12-5 5-10 9-10 6-10 5-21 6-31 3-40 1h-1511l-34-1-20-2-21-5-16-8-11-8-10-9-11-12-7-10-10-17-8-17-6-18-4-20-2-23v-1527l2-18 4-15 7-20 8-17 8-14 10-13 5-6 8-7 11-9 18-10 15-6 18-4 11-1h58l9 1v-35l1-53 2-15 6-16 7-11 11-13 10-9 15-9 17-5zm-3 65-7 2-2 14-1 15v213l2 17 3 6 9 2 11-1 8-4 3-5 1-7 1-29v-213l-3-6-5-3-7-1zm419 0-6 3-1 32-1 151v41l1 22 2 14 1 3 6 2h14l11-3 2-7 1-7 1-39v-189l-2-16-4-5-5-2zm425 0-7 2-1 1-1 9-1 28v217l3 7 3 3 3 1h17l7-3 3-7 1-7 1-22v-218l-3-7-5-3-5-1zm420 0-5 2-1 1-1 10-1 109v121l1 15 3 9 7 2h11l11-4 3-4 1-6 1-31v-184l-1-32-4-6-8-2zm-1354 165-44 1-17 2-13 4-8 5-10 9-9 13-6 13-4 16-1 6-1 16-1 119v89l2 5h1696l15-1 1-35v-172l-1-20-2-12-6-18-7-13-9-10-5-5-9-6-11-4-8-1h-93l-1 76-2 23-4 15-8 14-8 10-1 3h-2l-5 5-8 6-16 8-10 3-7 1h-26l-18-4-14-7-11-9-8-9-10-16-6-18-3-21v-80l-255-1v73l-2 28-2 9-8 17-9 12-1 3h-2l-4 5-10 7-13 6-13 4-16 2h-10l-15-2-13-4-11-6-10-8-10-11-8-13-6-16-3-16-1-21-1-69h-253l-1 3v82l-2 17-5 15-8 14-8 10-3 3v2l-4 2-10 7-19 8-9 2-10 1h-10l-16-2-16-5-10-6-10-8-7-8-7-11-7-15-4-16-1-7-1-31v-57h-248l-7 2v40l-1 48-3 19-5 12-6 10-8 10-8 8-13 8-12 5-15 3h-27l-17-4-14-7-10-8-9-10-7-11-4-8-5-16-3-20-1-80-4-1zm-114 360v1054l2 27 5 25 7 19 10 18 10 13 11 12 9 8 14 8 9 3 22 3 17 1h1177l73-1 10-4 8-7 13-18 12-23 9-24 8-31 5-24 3-23 2-31v-32l-2-26-4-28-6-27-9-30-2-6v-10l2-9 4-6 7-7 7-4h14l16 4 15 5 23 4h29l19-4 17-6 22-10 17-11 16-12 14-12 16-15 12-12 9-11 11-13 10-13 13-18 6-13 1-4 1-13 1-662-1-3-30-1zm1713 794-14 12-11 11-8 7-13 11-20 15-21 14-22 12-26 10-20 6-18 3-47 4-2 1 4 17 4 30 1 10v57l-5 50-4 25-8 31-6 20-11 27-4 10v2l7-1 11-4 35-17 17-10 12-8 12-9 13-11 11-9 15-15v-2h2l5-6v-2h2l9-11 9-10 12-17 10-15 12-21 17-34 14-37 10-35 6-25 5-28 7-48v-10zm1 247-7 10-9 15-8 11-10 14-10 13-13 17-11 13-10 10v2h-2l-4 4v2l-4 2-13 13-17 13-10 8-24 16-17 10-22 11-30 11-24 7-26 5-25 3-32 2-35 1h-1187l-54-1-37-2-18-3-12-4-14-7-16-11-13-8h-2v13l3 27 5 19 7 16 8 12 11 12 10 7 9 3 16 2h1580l17-2 10-4 11-8 9-9 10-15 5-16 3-16 2-28 1-190z" />
                        <path transform="translate(1138,897)"
                            d="m0 0h34l21 2 19 4 17 6 16 8 14 8 16 12 11 9 15 15 13 17 11 18 12 25 6 18 5 25 2 20v26l-3 29-5 24-6 17-5 11-8 16-10 14-8 10-11 12-12 12-17 13-14 9-21 10-15 5-23 5-65 10-16 4-14 6-16 10-9 7-16 16-11 17-8 17-6 20-4 21-2 18v30l3 1 28 1h247l20 1 10 2 7 4 4 4 3 8 1 4v18l-4 12-4 5-11 4-14 2h-329l-11-3-8-9-4-11-2-13-1-15v-51l1-20 3-22 5-18 9-22 8-16 11-18 9-12 8-10h2l2-4 8-7 10-9 21-14 21-11 25-9 24-5 46-5 22-5 16-6 17-10 12-9 5-4 5-6 5-5 8-11 10-19 5-14 4-22 1-12v-31l-3-22-4-14-5-12-8-15-8-11-11-12-13-10-11-7-17-8-21-6-14-2h-31l-18 4-21 8-16 10-14 12-8 8-10 13-8 13-7 19-5 18-2 13-3 26-2 14-4 10-7 6-10 3h-14l-13-4-5-4-7-14-2-10v-30l4-26 5-19 10-24 10-19 8-12 12-16 7-7 5-6 14-11 13-10 18-10 16-8 18-6 19-4z" />
                        <path transform="translate(830,897)"
                            d="m0 0h9l11 3 8 4 5 6 2 10 1 14 1 63v171l-1 314-2 36-2 10-3 4-11 3-6 1h-18l-12-3-5-4-4-11-1-7-1-21v-502l-14 7-16 10-16 9-16 7-12 3h-10l-8-7-11-17-3-9 2-10 7-8 7-7 10-7 19-12 40-25 28-17 13-6z" />
                        <path transform="translate(1879,1417)" d="m0 0" />
                    </svg>
                    <strong>Date of birth</strong>
                    {
                        fieldSaved.birthDay &&
                        <svg className='w20 ml20 h20' style={{ strokeWidth: 2, fill: "none", stroke: "var(---)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path> <path d="M9 12l2 2l4 -4"></path> </svg>
                    }
                </div>
                <div className="wmia r-b-c mb10 mt15">
                    <div className="LabelinpSelect   ">
                        <select value={day} onChange={e => setDay(e.target.value)} className="br5  " name="day" id="dayField">
                            {
                                contOption(undefined, 31)
                            }
                        </select>
                        <label className='fw900' htmlFor="dayField">Day</label>
                    </div>
                    <div className="LabelinpSelect p0   ">
                        <select value={month} onChange={e => setMonth(e.target.value)} className="br5  " name="month" id="monthField">
                            {
                                contOption(undefined, 12)
                            }
                        </select>
                        <label className='fw900' htmlFor="monthField">Month</label>
                    </div>

                    <div className="LabelinpSelect  p0   ">
                        <select value={year} onChange={e => setYear(e.target.value)} className="br5  " name="year" id="yearField">
                            {
                                contOption(true, undefined)
                            }
                        </select>
                        <label className='fw900' htmlFor="yearField">Year</label>
                    </div>

                </div>
                <div className="wmia mt20 r-e-c">
                    {
                        !(fieldSaved.birthDay == true || fieldSaved.lastName == true || fieldSaved.firstName == true) &&
                        <button onClick={() => onCLose()} className='border  mr10'>
                            <svg className='mr10' style={{ transform: "rotate(180deg)" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg>
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
                                <button disabled={!someThingsChanged} onClick={hanelSubmeChange} className='br  w100'> <svg style={{ fill: "none", stroke: "#fff", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path> <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M14 4l0 4l-6 0l0 -4"></path> </svg>  Save</button>
                            </>
                    }

                    {
                        (fieldSaved.birthDay == true || fieldSaved.lastName == true || fieldSaved.firstName == true) &&

                        <button onClick={onCLose} className=' ml20 bg-g'>
                            Done
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>
                        </button>
                    }
                </div>
            </motion.div>
        </div>
    )
}

export default EditInfo
