import React, { useMemo, useState, useEffect, useRef } from 'react'
import api from "../../config/axios"
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import BTN_CLOSE from '../../components/btnClose'
import Texta from '../../components/Texta'
import { Ten } from "../../slices/ten_slice"
import { open_alert } from '../../slices/alert_cmp'
import L_loader from '../../components/L_loader'
export default function Moment_create() {
  const [isCreatTexVSBL, setisCreatTexVSBL] = useState(false)
  const [isCreatImageMomentVSBL, setisCreatImageMomentVSBL] = useState(false)
  const [isCreatVedioMomentVSBL, setisCreatVedioMomentVSBL] = useState(false)

  const dispatch = useDispatch()

  const TextMoment = useMemo(() => {
    return () => {
      const st1 = {
        border: "solid 1px var(--border-color)",
        backgroundColor: "var(--bg-primary)"
      }
      const FontsFamillys = [
        '"Inter", serif',
        '"Playwrite VN", serif',
        '"Macondo", serif',
        '"Anton", serif',
        '"Dancing Script", serif',
        ' "Sixtyfour Convergence", serif'
      ]
      const [content, setcontent] = useState('');
      const [textFontSize, settextFontSize] = useState(15);
      const [textFontFamilly, settextFontFamilly] = useState(FontsFamillys[0]);
      const [textColor, settextColor] = useState('var(--bg-secondary)');
      const [shooedStyle, setshooedStyle] = useState(st1)
      const [CustomColor, setCustomColor] = useState('');
      const [isSendingPst, setSendingMom] = useState(false)
      const handelChangeColor = e => {
        setCustomColor(c => e.target.value)
        setshooedStyle({ backgroundColor: CustomColor })
        settextColor(getTextColor(CustomColor))
      }
      const getTextColor = (bgColor) => {
        const r = parseInt(bgColor.substr(1, 2), 16);
        const g = parseInt(bgColor.substr(3, 2), 16);
        const b = parseInt(bgColor.substr(5, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#ffffff';
      };

      const InptRef = useRef(null)
      
      useEffect(() => {
        InptRef.current.style.height = "auto"
        InptRef.current.style.height = `${InptRef.current.scrollHeight}px`
        console.log('test');

      }, [textFontSize, textFontFamilly])

      const handelSubmitMoment = async () => {
        if (!isSendingPst) {
          setSendingMom(true)
          await api.post('/user/create_moment', {
            type: "text",
            content,
            style: `color=${textColor}?fontSize=${textFontSize}px?fontFamily=${textFontFamilly}?backgroundColor=${shooedStyle.backgroundColor}`
          }).then(res => {
            setSendingMom(false)
            dispatch(open_alert([, "Moment has been sucessfully submited "]))
            setisCreatTexVSBL(false)
          }).catch(er => {
            dispatch(open_alert([false, "Failed to save the moment => " + er.message]))
            setSendingMom(false)
          })
        }

      }

      return ReactDOM.createPortal(
        <div className="backendMer">
          <motion.div
            animate={{
              scale: [1.2, 1],
              opacity: [0, 1]
            }}
            exit={{
              scale: [1, 1.2],
              opacity: [1, 0]
            }}
            className='wmia scrl_none c-s-s psr br20 bg-l p20'
            style={{
              maxWidth: "600px",
              maxHeight: "100%",
              overflow: "auto"
            }}
          >
            <BTN_CLOSE onClick={() => setisCreatTexVSBL(false)} />
            <h1 className=' br10 r-s-c  mb10 border p10' style={{ width: "95%" }}>
              <svg className='w30 mr20 h30 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z" /></svg>
              Craft Your Moment in Words
            </h1>
            <div className="cntTexa mt20 mb20 c-c-c br20 wmia" style={{ minHeight: "500px", ...shooedStyle }} >
              <Texta ref={InptRef} className={'text-center scrl_none r-c-c '} onChange={e => setcontent(e.target.value)} placeholder={"write your moment "} style={{ width: "90%", border: "none", color: textColor, fontFamily: textFontFamilly, fontSize: `${textFontSize}px` }} />
            </div>
            <div className="t10 r-p-c wmia bg-third p10">
              <div className='c-c-c'
                onClick={() => { setshooedStyle(st1); settextColor("black") }}
              >
                <motion.span animate={{ y: [60, 0], opacity: [0, 1], transition: { delay: .3 } }} className=" imgCercle w40 h40" style={{ backgroundColor: "#fff", filter: "drop-shadow( 0 0 10px var(--filter-color))" }}></motion.span>
                <p className='mt10'>Normal</p>
              </div>
              <div className='c-c-c'
                onClick={() => { setshooedStyle({ backgroundColor: "#000" }); settextColor("#fff") }}
              >
                <motion.span animate={{ y: [60, 0], opacity: [0, 1], transition: { delay: .5 } }} className="imgCercle w40 h40" style={{ backgroundColor: "#000", filter: "drop-shadow( 0 0 10px var(--filter-color))" }}></motion.span>
                <p className='mt10'>Darck</p>
              </div>
              <div className='c-c-c'
                onClick={() => { setshooedStyle({ backgroundColor: "var(--bg-blue)" }); settextColor("#fff") }}
              >
                <motion.span animate={{ y: [60, 0], opacity: [0, 1], transition: { delay: .8 } }} className="bg-b imgCercle w40 h40" style={{ filter: "drop-shadow( 0 0 10px var(--filter-color))" }}></motion.span>
                <p className='mt10'>Blue</p>
              </div>
              <div className='c-c-c'
                onClick={() => { setshooedStyle({ backgroundColor: "var(---)" }); settextColor("black") }}
              >
                <motion.span animate={{ y: [60, 0], opacity: [0, 1], transition: { delay: 1.1 } }} className="bg-g imgCercle w40 h40" style={{ filter: "drop-shadow( 0 0 10px var(--filter-color))" }}></motion.span>
                <p className='mt10'>Green</p>
              </div>
              <div className='c-c-c psr'>
                <input type="color" name="" value={CustomColor} onChange={handelChangeColor} style={{ opacity: "0", position: "absolute", width: "0" }} id="inoustolor" />

                <motion.label animate={{ y: [60, 0], opacity: [0, 1], transition: { delay: 1.3 } }} htmlFor='inoustolor' className={`imgCercle w40 h40 ${CustomColor == "" ? "bg-gradient" : ""}`} style={{ filter: "drop-shadow( 0 0 10px var(--filter-color))", backgroundColor: CustomColor }}></motion.label>
                <p className='mt10'>Custom</p>
              </div>
            </div>
            <div className="mt20 wmia r-p-c">
              <div className="r-s-c wkhmsin mr20">

                <svg className='w20 h20' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M248-240h104v-13h-51l53-147h134l50 147h-48v13h222v-13h-31L509-720h-55L280-253h-32v13Zm112-175 64-178 59 178H360ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0 0v-640 640Z" /></svg>
                <select onChange={e => settextFontFamilly(e.target.value)} name="" className='c-rd ml20 wmia' id="" style={{ fontFamily: textFontFamilly }}>
                  {
                    FontsFamillys.map(f =>
                      <option value={f} key={f} style={{ fontFamily: f }}>{f.replace(/["]/g, "")}</option>
                    )
                  }
                </select>
              </div>
              <div className="r-s-c wkhmsin ml20">
                <svg className='w20 h20' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M560-160v-520H360v-120h520v120H680v520H560Zm-360 0v-320H80v-120h360v120H320v320H200Z" /></svg>
                <select onChange={e => settextFontSize(e.target.value)} name="" className='c-rd ml20 wmia' id="" >
                  <option value='15'>Size</option>
                  {
                    [10, 13, 15, 17, 20, 22, 25, 30].map(f =>
                      <option value={f} key={f} >{f}</option>
                    )
                  }
                </select>
              </div>

            </div>
            <div className="wmia   mt20 r-e-c">

              <AnimatePresence>
                {
                  content != "" &&
                  <motion.button
                    animate={{
                      opacity: [0, 1],
                      y: [100, 0]
                    }}
                    exit={{
                      opacity: [1, 0],
                      y: [0, 100]
                    }}
                    className='wmia bg-rev-l d p10 br10 border'
                    onClick={handelSubmitMoment}
                  >

                    {
                      isSendingPst ?
                        <L_loader />
                        : <>
                          Share
                          <svg className='ml10' version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(1978)" d="m0 0h48l5 10 6 7 10 7 1 1v43h-3l-4 9-8 24-9 29-15 46-12 38-15 47-18 57-15 47-16 50-11 35-10 31-11 34-16 50-35 110-16 51-15 47-16 50-14 44-14 43-5 17-10 31-17 53-13 41-12 38-16 51-10 31-17 53-12 37-5 17-9 27-11 35-21 66-12 38-16 50-14 45-9 27-8 25-10 32-12 37-9 29-20 63-11 35-17 54-9 28-8 25-9 29-16 50-8 23-10 23-7 12-7 6-6 9v1h-33l-8-6-8-8-11-16-8-15-13-29-10-22-9-21-18-41-12-29-6-13-11-26-18-41-11-26-13-30-18-42-17-39-15-35-26-60-18-42-14-32-9-21-13-30-12-28-14-32-10-23-15-35-26-60-23-54-13-31-12-28-9-20-4-6-5-4-24-9-21-8-33-13-47-18-41-16-50-19-117-45-36-14-29-11-78-30-36-14-50-19-41-16-50-19-112-43-44-17-29-11-49-19-20-9-10-6-12-11-7-6h-1v-35l9-10 12-10 16-8 15-6 45-16 40-14 24-8 41-14 47-16 34-12 36-12 106-36 26-9 38-13 105-36 121-41 23-8 82-28 144-49 74-25 31-11 27-9 79-27 342-116 28-10 36-12 85-29 43-15 36-12 70-24 36-12 62-21 43-15 16-6 5-2zm-148 150-44 15-36 12-52 17-25 9-72 24-64 22-36 12-47 16-217 74-21 7-41 14-36 12-19 7-36 12-64 22-36 12-105 36-65 22-29 10-27 9-41 14-191 65-20 7-82 28-36 12-31 11-30 10-41 14-46 16-28 9-29 8-6 4 3 2 18 8 27 11 36 14 29 11 39 15 41 16 34 13 229 88 104 40 24 9 28 11 27 10 36 14 22 9 20 7 32 13 17 6 19 8 5 1 1-3 3-1 5-6v-2h2l21-21 7-8 650-650 6-7 8-7 4-5 8-7 113-113 8-7 7-7 8-7 15-15v-2zm68 61-27 27v2l-3 1-5 5-11 12-8 8-5 6-3 2v2l-4 2-29 29-6 5-7 8-7 6-7 8-705 705-8 7-4 4v2h-2l-7 8-10 9-2 1v2h-2l-5 5-2 4 6 10 8 19 15 34 15 36 20 46 24 56 39 90 30 70 11 25 13 30 11 26 39 90 15 35 13 30 16 37 14 33 13 30 11 25 13 31 10 29 4 6 4 1 4-7 15-45 12-39 14-44 12-36 21-66 16-50 17-54 10-32 10-30 11-35 20-63 22-69 18-57 22-69 16-50 13-41 15-47 18-57 17-53 14-45 10-31 14-44 10-31 17-54 8-25 13-40 8-26 10-31 19-59 30-95 14-44 16-51 20-62 14-45 6-16 2-10v-5z" />
                            <path transform="translate(663,1336)" d="m0 0h8l13 4 10 6 8 8 6 12 3 10v10l-8 16-8 11-9 11h-2v2h-2v2h-2l-2 4-33 33-6 7-8 7-9 10-3 3h-2v2h-2l-2 4-10 10h-2l-2 4-28 28h-2v2h-2l-2 4-14 14h-2l-2 4-8 8-5 4-7 8-4 2v2l-6 5-6 7-8 7-8 9-8 7-8 9-8 7-8 9-8 7-9 10-6 5-1 2h-2l-2 4-8 8h-2v2h-2v2h-2l-2 4-8 8h-2v2h-2l-2 4-10 10h-2v2h-2l-2 4-296 296-11 9-8 6-14 10-4 4v1h-32l2-6-11-12-8-7-5-4h-2v-29h2l2-5 12-16 9-10 7-8 24-24 7-8 4-4h2l2-4 552-552 14-11 11-7 10-4z" />
                            <path transform="translate(352,1157)" d="m0 0h7l12 5 14 9 7 7 5 8 2 7 1 12-3 10-8 14-10 12-7 8-275 275-8 7-11 10-11 7-18 8-4 1h-7l-10-4-10-7v-2l-3-1-7-8-8-9v-26l13-17 8-10 30-30 3-4h2l2-4 6-5 7-8 7-7h2l2-4 220-220h2l2-4h2l2-4 8-7 10-8 16-8z" />
                            <path transform="translate(842,1648)" d="m0 0 14 2 12 6 8 6 8 13 6 11-1 10-5 12-8 14-10 11-7 8-77 77-5 6-8 7-8 9-8 7-8 9-8 7-8 9-7 6-7 8-5 4-7 8-83 83-3 1v2l-7 6-7 8-5 4-5 5-8 9-11 9-8 7-14 10-5 4h-2v2h-26v-3l-5-5-13-12-6-8-5-10-1-7 8-21 7-11 12-14 80-80 6-7 8-7 3-4h2l2-4 11-10 7-8 9-8 1-2h2l2-4 11-10 1-2h2l2-4 11-10 1-2h2l2-4 11-10 7-8 9-8 7-8 9-8 7-8 9-8 7-8 8-7 7-8 19-19 7-6 5-6 8-7 11-10 15-10 7-3z" />
                            <path transform="translate(2045,75)" d="m0 0h3v9h-2v-4h-3z" />
                            <path transform="translate(1357,2045)" d="m0 0 7 2v1h-8z" />
                            <path transform="translate(0,2045)" d="m0 0 3 3h-3z" />
                            <path transform="translate(8,2031)" d="m0 0 3 2-1 2z" />
                            <path transform="translate(547,2046)" d="m0 0 1 2-2-1z" />
                            <path transform="translate(6,2030)" d="m0 0 2 1z" />
                            <path transform="translate(1399,2046)" d="m0 0" />
                            <path transform="translate(1359,2044)" d="m0 0" />
                            <path transform="translate(13,2037)" d="m0 0" />
                            <path transform="translate(12,2036)" d="m0 0" />
                            <path transform="translate(11,2035)" d="m0 0" />
                            <path transform="translate(12,2031)" d="m0 0" />
                            <path transform="translate(10,2029)" d="m0 0" />
                            <path transform="translate(11,2028)" d="m0 0" />
                            <path transform="translate(2,2019)" d="m0 0" />
                            <path transform="translate(1,730)" d="m0 0" />
                            <path transform="translate(0,691)" d="m0 0" />
                            <path transform="translate(1975)" d="m0 0" />
                          </svg>
                        </>
                    }
                  </motion.button>
                }
              </AnimatePresence>
            </div >
          </motion.div>
        </div>
        , document.getElementById("portals")
      )
    }

  }, [])

  const ImageMoment = useMemo(() =>
    () => {
      const [imgFIle, setimgFIle] = useState(null)
      const [description, setdescription] = useState('')

      const [isSendingPst, setSendingMom] = useState(false)

      const handelGetImgFromInp = e => {
        if (e.target.files.length == 0) return;
        setimgFIle(e.target.files[0])
      }


      function handelDrage(e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
      }

      const handelDrapImg = e => {
        e.preventDefault();
        let file = e.dataTransfer.files[0]
        if (file.type.split("/")[0] == "image") {
          setimgFIle(file)
        } else {
          // ----------------

        }

      }


      const handelSubmitMoment = async () => {
        if (!isSendingPst) {
          const formD = new FormData();
          formD.append("content", description)
          formD.append("type", "image")
          formD.append("file", imgFIle)
          setSendingMom(true)
          await api.post('/user/create_moment', formD).then(res => {
            setSendingMom(false)
            setisCreatImageMomentVSBL(false)
            dispatch(open_alert([, "Moment has been sucessfully submited "]))
          }).catch(er => {
            console.log(er.message);
            dispatch(open_alert([false, "Failed to save the moment => " + er.message]))
            setSendingMom(false)

          })
        }
      }





      return ReactDOM.createPortal(
        <div className="backendMer">
          <motion.div
            animate={{
              scale: [1.2, 1],
              opacity: [0, 1]
            }}
            exit={{
              scale: [1, 1.2],
              opacity: [1, 0]
            }}
            className='wmia scrl_none c-s-s psr br20 bg-l p20'
            style={{
              maxWidth: "700px",
              maxHeight: "100%",
              overflow: "auto"
            }}
          >
            <BTN_CLOSE onClick={() => setisCreatImageMomentVSBL(false)} />
            <h1 className=' br10 mr50 r-s-c  mb10 border p10' style={{ width: "95%" }}>
              <svg className='w30 mr10 h30 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" /></svg>
              Capture Your Moment in an Image
            </h1>
            <>
              {
                !imgFIle &&
                <>
                  <motion.div animate={{ scale: [.5, 1], opacity: [0, 1] }} onDragOver={handelDrage} onDrop={handelDrapImg} className="wmia h300 mt20 mb20 r-c-c bg-fourth br10">
                    <svg version="1.1" viewBox="0 0 2048 2048" className='w20 h20 mr10' xmlns="http://www.w3.org/2000/svg">
                      <path transform="translate(1123,53)" d="m0 0h40l21 2 24 5 21 7 33 16 19 12 17 13 14 12 12 11 10 10 8 7 51 51v2l3 1 5 6 7 6 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 5 6 7 6 5 6 8 7 65 65v2h2l7 8 13 13 7 8 11 13 13 15 9 11 11 13 13 16 12 16 10 14 13 21 12 22 14 26 19 37 10 25 14 43 10 34 6 19 7 32 4 27 3 26 1 3h3v2l2 1v5h-5v7l3 1 1 10 1 4v100l-1 6 1 4v41l-2-1-1-14-1-1v-5h-2l-2 6-6 37-6 27-11 37-9 30-12 36-11 24-11 21-6 12-11 20-7 14-14 24-7 11-10 13-6 8-10 12-7 9-12 15-9 11-11 13-9 10-8 10h-2l-2 4-7 8h-2l-2 4-161 161-8 7-8 8-11 9-12 11-11 9-14 12-13 10-22 16-15 10-15 9-18 10-29 15-21 10-29 11-31 10-28 8-26 6-38 6-38 4-47 3-32 1h-471l-44-2-34-3-37-6-32-8-36-12-19-7-22-10-19-10-23-13-14-9-17-12-16-13-11-9-15-13-7-7-7-6v-2l-3-1-7-8-12-13-9-11-11-13-14-19-13-20-12-21-17-33-10-23-12-36-7-24-6-27-4-30-4-42-2-38v-166l-6-9-32-32v-2l-3-1-17-17v-2l-4-2-8-8v-2l-4-2v-2l-4-2-8-8v-2l-4-2-56-56v-2h-2l-7-8-10-10-7-8-9-10-10-13-11-15-11-19-9-20-10-28-3-7-3-6v-99l2 3 4-9 9-27 11-24 11-20 9-13 12-16h2l2-4 16-16 11-9 14-10 10-7 15-9 17-8 37-13 13-4 1-5-13-29-9-21-5-14-5-19-3-29-1-12v-28l5-25 7-25 7-21 6-13 7-13 9-13 11-15 10-13 11-12 12-11 11-8 13-10 20-12 19-9 27-9 22-6 18-2h44l22 2 24 6 21 8 7 3 8 2 6 2 3-17 6-20 8-24 13-27 13-19 10-14 7-9 8-10 13-13 16-12 16-11 22-12 16-7 18-6 24-6 22-3 22-1 33 2 23 4 24 7 21 8 25 13 14 10 14 11 4 4 5-1 3-5 5-16 10-26 5-12 12-20 16-22 7-9 11-12 11-11 14-11 15-10 21-12 18-8 27-9 18-4zm18 108-16 1-23 5-19 8-16 10-13 11-10 10-11 15-7 12-6 15-5 18-3 18v21l5 25 5 15 7 14 14 20 11 14 4 5h2l2 4 11 12 10 14 5 11 2 7v13l-3 11-7 11-1 3h-2l-5 5-9 8-12 6-12 3-9-1-12-4-11-7-10-8-11-10-8-7-56-56-4-5-4-4h-2l-2-4h-2l-2-4h-2l-2-4h-2l-2-4-44-44-8-7-13-11-18-12-10-6-21-9-18-4-8-1h-28l-18 3-16 5-16 8-16 11-12 11-7 7-9 12-9 16-4 8-7 25-3 18v18l3 19 5 18 5 12 10 16 9 12 8 10 9 10 10 10 6 7h2l1 3 8 7 4 5 8 7 102 102 11 14 6 11 4 12v13l-5 14-7 11-1 3h-2l-5 5-7 6-12 5-10 2h-8l-10-2-16-8-10-8-10-9-7-7h-2v-2h-2v-2l-4-4h-2l-2-4-8-8h-2l-2-4-12-12h-2l-2-4-12-12h-2l-2-4-153-153-22-18-15-10-19-10-19-6-18-3-16-1-21 2-19 5-21 10-16 11-10 8-8 8-9 12-9 15-7 15-5 17-4 25v16l3 19 6 20 7 12 6 11 8 12 12 14 9 10 213 213 7 8 13 17 6 13 2 8v8l-4 13-7 11-11 12-9 7-9 4-14 3-16-4-13-7-11-10-8-7-105-105-8-7-15-13-19-13-17-9-15-5-22-4-7-1h-20l-25 4-18 6-15 8-15 11-10 9-13 16-7 11-9 17-6 20-4 24v13l3 20 5 17 11 23 10 15 13 16 15 16 338 338h2l2 4h2l2 4h2l2 4 21 21 9 11 10 15 4 11 1 5v7l-4 13-9 14-11 12-7 5-14 4h-17l-12-4-11-6-15-13-102-102-8-6h-4l1 44v29l2 31 4 34 6 29 11 37 8 21 12 26 12 22 9 14 8 11 10 13 12 14 7 8 9 10 12 11 11 9 14 12 19 13 13 8 21 12 27 13 25 9 29 9 31 6 36 4 33 2 55 1h367l76-1 40-2 46-4 28-4 24-6 45-14 27-11 37-19 27-16 15-10 16-12 14-11 15-13 13-11 14-13 8-7 168-168v-2l4-2 9-11 9-10 7-8 9-11 8-9 11-14 8-10 10-13 12-19 9-16 6-10 6-11 22-44 9-23 9-28 12-41 6-26 5-30 3-29 3-43v-32l-5-52-5-38-6-27-10-35-15-47-16-35-12-23-13-23-9-16-14-21-7-9-11-14-11-13-9-11-11-13-8-10-10-11-7-8-23-23-6-7-6-5-2-3h-2l-2-4h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4-8-7-354-354-6-7-8-7-4-5-6-5-6-7h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4-15-14-7-7-11-9-10-8-14-9-10-6-17-7-17-4-13-2zm-1139 871m2040 41m0 2 1 3zm2 0m0 16v5h1v-5zm2 13m-2 99m-1 4m-2 16m0 2 1 2z" />
                      <path transform="translate(2047,1058)" d="m0 0h1v7l-2-4z" />
                      <path transform="translate(2047,1066)" d="m0 0v3l-2-2z" />
                      <path transform="translate(2045,1082)" d="m0 0v3z" />
                      <path transform="translate(2047,1254)" d="m0 0" />
                      <path transform="translate(2047,1055)" d="m0 0" />
                      <path transform="translate(2047,1044)" d="m0 0" />
                      <path transform="translate(352,1446)" d="m0 0" />
                      <path transform="translate(2047,1083)" d="m0 0" />
                      <path transform="translate(2047,1071)" d="m0 0" />
                      <path transform="translate(2047,1049)" d="m0 0" />
                      <path transform="translate(2047,1041)" d="m0 0" />
                      <path transform="translate(4,1041)" d="m0 0" />
                      <path transform="translate(2047,1037)" d="m0 0" />
                      <path transform="translate(0,929)" d="m0 0" />
                    </svg>
                    <strong style={{ fontSize: "16px" }}>
                      Drag and drop image here...
                    </strong>
                  </motion.div>
                  <input onChange={handelGetImgFromInp} accept='image/*' type="file" style={{ display: "none" }} id='inpImgMome' />
                  <motion.label animate={{ scale: [.7, 1], y: [50, 0], opacity: [0, 1] }} htmlFor='inpImgMome' className='wmia cr p10'>
                    <svg version="1.1" viewBox="0 0 2048 2048" className='w20 h20' xmlns="http://www.w3.org/2000/svg">
                      <path transform="translate(1034,215)" d="m0 0h30l38 2 37 4 42 8 30 8 36 12 20 8 28 12 33 17 25 15 27 18 19 14 16 13 11 9 10 9 8 7 32 32 7 8 11 13 13 17 11 15 14 21 12 19 10 18 16 32 9 20 11 29 8 24 10 37 7 35 5 35 2 18 2 35 26 2 34 4 29 5 27 7 29 10 24 10 25 12 21 12 17 11 12 8 21 16 14 12 13 12 18 18 9 11 9 10 9 12 12 17 11 18 10 17 14 28 16 39 6 18 10 37 6 25h2v120l-4 1 3 2 1 7v16h-2l1-7h-5l-2 6-10 38-7 20-6 16-8 19-8 15-8 16-6 10-10 17-11 16-7 9-8 10-11 13-11 12-6 7h-2l-1 3-8 7-14 13-11 9-18 14-19 13-24 14-23 12-23 10-25 9-30 9-28 6-26 4-31 3-50 2-261 1h-60l-22-2-7-3-7-5-8-10-8-16-1-11 2-9 4-8 8-11 8-8 7-4 4-1 367-2 33-2 29-4 29-6 30-10 24-10 19-10 22-13 19-13 16-13 11-9 11-11h2l2-4 10-10 1-2h2l2-4 9-11 10-13 10-15 10-17 14-29 7-18 8-26 5-21 4-23 2-20v-53l-2-21-5-27-6-25-12-33-8-18-10-20-14-23-13-18-9-11-10-11v-2h-2l-7-8-7-7-8-7-16-13-18-13-19-12-16-9-27-13-30-11-23-6-22-4-24-3-33-2h-47l-9-2-9-6-8-9-5-7-3-10-1-66-4-40-5-33-8-34-7-25-13-35-14-30-8-16-12-21-11-17-14-20-9-12-9-11-11-13-28-28-8-7-13-11-10-8-18-13-13-9-21-13-21-12-28-14-34-14-37-12-25-6-43-7-30-3-17-1h-28l-29 2-34 4-30 6-28 7-38 13-26 11-19 9-22 12-16 10-15 10-14 10-16 12-14 12-8 7-7 6-16 16-7 8-7 7-8 10-10 11-8 11-8 10-7 11-10 16-16 29-8 17-7 15-10 24-7 21-8 29-7 30-5 22-5 15-9 13-9 6-9 3-17 1h-49l-32 2-30 4-24 5-27 8-22 8-17 7-16 8-24 13-9 6-17 12-11 8-10 8-15 13-13 12-12 12-9 11-4 5h-2l-2 4-11 15-7 10-7 11-9 14-12 23-8 16-9 23-10 30-6 22-4 21-4 34-1 20v26l2 26 4 29 5 24 8 27 8 24 13 29 8 16 11 19 15 22 9 12 11 14 10 11 7 8 14 14 8 7 14 12 12 9 14 10 17 11 25 14 27 13 26 10 30 9 25 5 33 4 41 3 59 1h234l53 1 10 3 10 6 7 7 6 10 3 12v9l-2 10-5 10-6 7-8 6-8 4-8 2-14 1h-328l-46-2-19-2-35-6-39-9-29-10-21-8-29-13-20-10-20-12-11-7-16-11-17-13-30-26-29-29-7-8-10-11-13-17-11-15-17-26-12-21-10-19-12-27-8-21-9-27-11-42-1-8-2-1-2-11-2-2v-144l2 1 13-52 11-36 10-26 11-24 8-16 12-22 8-13 7-10 7-11 24-32 14-15 9-10 21-21 8-7 14-12 14-11 19-13 10-7 20-12 22-12 25-12 27-11 27-9 31-8 22-5 37-5 28-2 20-1 10-2 6-29 8-26 9-26 9-22 7-16 7-15 10-18 6-12 8-13 10-16 8-12 10-14 9-12 11-13 8-10 5-6h2l2-4 14-15 4-5h2v-2h2v-2l8-7 8-8 8-7 10-9 25-20 17-12 15-10 19-12 27-15 28-14 26-11 19-7 31-10 27-7 23-5 39-6 32-3zm1009 1063 1 2z" />
                      <path transform="translate(1033,1119)" d="m0 0h16l16 4 16 8 11 8 14 11 15 14 8 7 15 13 36 33 10 9 8 7 11 10 8 7 15 13 9 9 8 7 10 13 4 8 1 4v15l-4 11-7 9-7 7-12 9-8 2h-8l-13-4-12-7-16-13-15-13-14-12-11-9-17-16-11-10-8-7-10-9-4-3v44l-1 67v417l-2 20-5 9-11 11-14 9-5 1-14-1-14-5-11-8-7-10-4-9-1-8-1-19v-509l-1-6-9 6-10 9-15 13-8 7-13 12-14 11-14 13-14 11-12 9-12 7-8 2h-10l-11-5-6-4-10-10-8-15-4-11 3-12 9-14 8-10 8-7 12-11 8-7 10-9 8-7 12-11 8-7 16-15 15-14 10-9 8-7 12-11 11-9 16-13 15-10 14-7zm-35 135m-1 1m1 1 1 3z" />
                      <path transform="translate(1019,421)" d="m0 0h40l10 3 10 6 7 8 6 12 2 11v10l-3 9-6 10-5 6-10 6-13 4-52 6-26 6-36 12-31 15-15 10-17 12-11 9-15 14-8 8-9 11-7 8-16 24-12 22-11 25-9 27-9 35-7 16-6 9-7 6-11 4-4 1h-15l-10-3-10-6-8-8-6-10-2-7-1-12 4-29 7-27 11-31 11-25 11-21 6-10 7-11 13-19 8-10 12-14 15-16 14-14 14-11 10-9 19-13 18-11 16-9 23-11 23-9 27-8 27-6 27-4z" />
                      <path transform="translate(2047,1123)" d="m0 0h1v5h-3v-3h2z" />
                      <path transform="translate(2041,1291)" d="m0 0" />
                      <path transform="translate(0,1081)" d="m0 0" />
                    </svg >
                    Pick from device
                  </motion.label>
                </>
              }


            </>
            <>
              {
                imgFIle &&
                <div className="c-c-c wmia" >

                  <div className="wmia r-p-s p10 br20" style={{ border: "solid 1px var(--border-color)" }}>
                    <div className="wkhmsin c-s-s p10 mt20">
                      <Texta value={description} onChange={e => { setdescription(e.target.value) }} placeholder={"Add description "} className={'wmia'} style={{ border: "none" }} />
                    </div>
                    <div className="wkhmsin c-c-c">
                      <motion.img animate={{ scale: [.7, 1] }} className="wmia  br10" src={URL.createObjectURL(imgFIle)} style={{ maxHeight: "500px", minHeight: "300px", objectFit: "cover", objectPosition: "top" }} alt="" />
                      <motion.button animate={{ scale: [.7, 1], y: [20, 0], opacity: [0, 1] }} onClick={() => setimgFIle(null)} className='wmia mt10 p10 cr '>
                        <svg version="1.1" viewBox="0 0 2048 2048" className='w20 h20' xmlns="http://www.w3.org/2000/svg">
                          <path transform="translate(1034,215)" d="m0 0h30l38 2 37 4 42 8 30 8 36 12 20 8 28 12 33 17 25 15 27 18 19 14 16 13 11 9 10 9 8 7 32 32 7 8 11 13 13 17 11 15 14 21 12 19 10 18 16 32 9 20 11 29 8 24 10 37 7 35 5 35 2 18 2 35 26 2 34 4 29 5 27 7 29 10 24 10 25 12 21 12 17 11 12 8 21 16 14 12 13 12 18 18 9 11 9 10 9 12 12 17 11 18 10 17 14 28 16 39 6 18 10 37 6 25h2v120l-4 1 3 2 1 7v16h-2l1-7h-5l-2 6-10 38-7 20-6 16-8 19-8 15-8 16-6 10-10 17-11 16-7 9-8 10-11 13-11 12-6 7h-2l-1 3-8 7-14 13-11 9-18 14-19 13-24 14-23 12-23 10-25 9-30 9-28 6-26 4-31 3-50 2-261 1h-60l-22-2-7-3-7-5-8-10-8-16-1-11 2-9 4-8 8-11 8-8 7-4 4-1 367-2 33-2 29-4 29-6 30-10 24-10 19-10 22-13 19-13 16-13 11-9 11-11h2l2-4 10-10 1-2h2l2-4 9-11 10-13 10-15 10-17 14-29 7-18 8-26 5-21 4-23 2-20v-53l-2-21-5-27-6-25-12-33-8-18-10-20-14-23-13-18-9-11-10-11v-2h-2l-7-8-7-7-8-7-16-13-18-13-19-12-16-9-27-13-30-11-23-6-22-4-24-3-33-2h-47l-9-2-9-6-8-9-5-7-3-10-1-66-4-40-5-33-8-34-7-25-13-35-14-30-8-16-12-21-11-17-14-20-9-12-9-11-11-13-28-28-8-7-13-11-10-8-18-13-13-9-21-13-21-12-28-14-34-14-37-12-25-6-43-7-30-3-17-1h-28l-29 2-34 4-30 6-28 7-38 13-26 11-19 9-22 12-16 10-15 10-14 10-16 12-14 12-8 7-7 6-16 16-7 8-7 7-8 10-10 11-8 11-8 10-7 11-10 16-16 29-8 17-7 15-10 24-7 21-8 29-7 30-5 22-5 15-9 13-9 6-9 3-17 1h-49l-32 2-30 4-24 5-27 8-22 8-17 7-16 8-24 13-9 6-17 12-11 8-10 8-15 13-13 12-12 12-9 11-4 5h-2l-2 4-11 15-7 10-7 11-9 14-12 23-8 16-9 23-10 30-6 22-4 21-4 34-1 20v26l2 26 4 29 5 24 8 27 8 24 13 29 8 16 11 19 15 22 9 12 11 14 10 11 7 8 14 14 8 7 14 12 12 9 14 10 17 11 25 14 27 13 26 10 30 9 25 5 33 4 41 3 59 1h234l53 1 10 3 10 6 7 7 6 10 3 12v9l-2 10-5 10-6 7-8 6-8 4-8 2-14 1h-328l-46-2-19-2-35-6-39-9-29-10-21-8-29-13-20-10-20-12-11-7-16-11-17-13-30-26-29-29-7-8-10-11-13-17-11-15-17-26-12-21-10-19-12-27-8-21-9-27-11-42-1-8-2-1-2-11-2-2v-144l2 1 13-52 11-36 10-26 11-24 8-16 12-22 8-13 7-10 7-11 24-32 14-15 9-10 21-21 8-7 14-12 14-11 19-13 10-7 20-12 22-12 25-12 27-11 27-9 31-8 22-5 37-5 28-2 20-1 10-2 6-29 8-26 9-26 9-22 7-16 7-15 10-18 6-12 8-13 10-16 8-12 10-14 9-12 11-13 8-10 5-6h2l2-4 14-15 4-5h2v-2h2v-2l8-7 8-8 8-7 10-9 25-20 17-12 15-10 19-12 27-15 28-14 26-11 19-7 31-10 27-7 23-5 39-6 32-3zm1009 1063 1 2z" />
                          <path transform="translate(1033,1119)" d="m0 0h16l16 4 16 8 11 8 14 11 15 14 8 7 15 13 36 33 10 9 8 7 11 10 8 7 15 13 9 9 8 7 10 13 4 8 1 4v15l-4 11-7 9-7 7-12 9-8 2h-8l-13-4-12-7-16-13-15-13-14-12-11-9-17-16-11-10-8-7-10-9-4-3v44l-1 67v417l-2 20-5 9-11 11-14 9-5 1-14-1-14-5-11-8-7-10-4-9-1-8-1-19v-509l-1-6-9 6-10 9-15 13-8 7-13 12-14 11-14 13-14 11-12 9-12 7-8 2h-10l-11-5-6-4-10-10-8-15-4-11 3-12 9-14 8-10 8-7 12-11 8-7 10-9 8-7 12-11 8-7 16-15 15-14 10-9 8-7 12-11 11-9 16-13 15-10 14-7zm-35 135m-1 1m1 1 1 3z" />
                          <path transform="translate(1019,421)" d="m0 0h40l10 3 10 6 7 8 6 12 2 11v10l-3 9-6 10-5 6-10 6-13 4-52 6-26 6-36 12-31 15-15 10-17 12-11 9-15 14-8 8-9 11-7 8-16 24-12 22-11 25-9 27-9 35-7 16-6 9-7 6-11 4-4 1h-15l-10-3-10-6-8-8-6-10-2-7-1-12 4-29 7-27 11-31 11-25 11-21 6-10 7-11 13-19 8-10 12-14 15-16 14-14 14-11 10-9 19-13 18-11 16-9 23-11 23-9 27-8 27-6 27-4z" />
                          <path transform="translate(2047,1123)" d="m0 0h1v5h-3v-3h2z" />
                          <path transform="translate(2041,1291)" d="m0 0" />
                          <path transform="translate(0,1081)" d="m0 0" />
                        </svg >
                        Pick a different photo
                      </motion.button>
                    </div>
                  </div>

                  <div className="wmia r-e-c  mt20">
                    <motion.button
                      animate={{
                        opacity: [0, 1],
                        y: [100, 0]
                      }}
                      exit={{
                        opacity: [1, 0],
                        y: [0, 100]
                      }}
                      className='border   bg-rev-l  br10 p10 wmia'
                      onClick={handelSubmitMoment}
                    >
                      {
                        isSendingPst ?
                          <L_loader />
                          :
                          <>


                            Share
                            <svg className='ml10' version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                              <path transform="translate(1978)" d="m0 0h48l5 10 6 7 10 7 1 1v43h-3l-4 9-8 24-9 29-15 46-12 38-15 47-18 57-15 47-16 50-11 35-10 31-11 34-16 50-35 110-16 51-15 47-16 50-14 44-14 43-5 17-10 31-17 53-13 41-12 38-16 51-10 31-17 53-12 37-5 17-9 27-11 35-21 66-12 38-16 50-14 45-9 27-8 25-10 32-12 37-9 29-20 63-11 35-17 54-9 28-8 25-9 29-16 50-8 23-10 23-7 12-7 6-6 9v1h-33l-8-6-8-8-11-16-8-15-13-29-10-22-9-21-18-41-12-29-6-13-11-26-18-41-11-26-13-30-18-42-17-39-15-35-26-60-18-42-14-32-9-21-13-30-12-28-14-32-10-23-15-35-26-60-23-54-13-31-12-28-9-20-4-6-5-4-24-9-21-8-33-13-47-18-41-16-50-19-117-45-36-14-29-11-78-30-36-14-50-19-41-16-50-19-112-43-44-17-29-11-49-19-20-9-10-6-12-11-7-6h-1v-35l9-10 12-10 16-8 15-6 45-16 40-14 24-8 41-14 47-16 34-12 36-12 106-36 26-9 38-13 105-36 121-41 23-8 82-28 144-49 74-25 31-11 27-9 79-27 342-116 28-10 36-12 85-29 43-15 36-12 70-24 36-12 62-21 43-15 16-6 5-2zm-148 150-44 15-36 12-52 17-25 9-72 24-64 22-36 12-47 16-217 74-21 7-41 14-36 12-19 7-36 12-64 22-36 12-105 36-65 22-29 10-27 9-41 14-191 65-20 7-82 28-36 12-31 11-30 10-41 14-46 16-28 9-29 8-6 4 3 2 18 8 27 11 36 14 29 11 39 15 41 16 34 13 229 88 104 40 24 9 28 11 27 10 36 14 22 9 20 7 32 13 17 6 19 8 5 1 1-3 3-1 5-6v-2h2l21-21 7-8 650-650 6-7 8-7 4-5 8-7 113-113 8-7 7-7 8-7 15-15v-2zm68 61-27 27v2l-3 1-5 5-11 12-8 8-5 6-3 2v2l-4 2-29 29-6 5-7 8-7 6-7 8-705 705-8 7-4 4v2h-2l-7 8-10 9-2 1v2h-2l-5 5-2 4 6 10 8 19 15 34 15 36 20 46 24 56 39 90 30 70 11 25 13 30 11 26 39 90 15 35 13 30 16 37 14 33 13 30 11 25 13 31 10 29 4 6 4 1 4-7 15-45 12-39 14-44 12-36 21-66 16-50 17-54 10-32 10-30 11-35 20-63 22-69 18-57 22-69 16-50 13-41 15-47 18-57 17-53 14-45 10-31 14-44 10-31 17-54 8-25 13-40 8-26 10-31 19-59 30-95 14-44 16-51 20-62 14-45 6-16 2-10v-5z" />
                              <path transform="translate(663,1336)" d="m0 0h8l13 4 10 6 8 8 6 12 3 10v10l-8 16-8 11-9 11h-2v2h-2v2h-2l-2 4-33 33-6 7-8 7-9 10-3 3h-2v2h-2l-2 4-10 10h-2l-2 4-28 28h-2v2h-2l-2 4-14 14h-2l-2 4-8 8-5 4-7 8-4 2v2l-6 5-6 7-8 7-8 9-8 7-8 9-8 7-8 9-8 7-9 10-6 5-1 2h-2l-2 4-8 8h-2v2h-2v2h-2l-2 4-8 8h-2v2h-2l-2 4-10 10h-2v2h-2l-2 4-296 296-11 9-8 6-14 10-4 4v1h-32l2-6-11-12-8-7-5-4h-2v-29h2l2-5 12-16 9-10 7-8 24-24 7-8 4-4h2l2-4 552-552 14-11 11-7 10-4z" />
                              <path transform="translate(352,1157)" d="m0 0h7l12 5 14 9 7 7 5 8 2 7 1 12-3 10-8 14-10 12-7 8-275 275-8 7-11 10-11 7-18 8-4 1h-7l-10-4-10-7v-2l-3-1-7-8-8-9v-26l13-17 8-10 30-30 3-4h2l2-4 6-5 7-8 7-7h2l2-4 220-220h2l2-4h2l2-4 8-7 10-8 16-8z" />
                              <path transform="translate(842,1648)" d="m0 0 14 2 12 6 8 6 8 13 6 11-1 10-5 12-8 14-10 11-7 8-77 77-5 6-8 7-8 9-8 7-8 9-8 7-8 9-7 6-7 8-5 4-7 8-83 83-3 1v2l-7 6-7 8-5 4-5 5-8 9-11 9-8 7-14 10-5 4h-2v2h-26v-3l-5-5-13-12-6-8-5-10-1-7 8-21 7-11 12-14 80-80 6-7 8-7 3-4h2l2-4 11-10 7-8 9-8 1-2h2l2-4 11-10 1-2h2l2-4 11-10 1-2h2l2-4 11-10 7-8 9-8 7-8 9-8 7-8 9-8 7-8 8-7 7-8 19-19 7-6 5-6 8-7 11-10 15-10 7-3z" />
                              <path transform="translate(2045,75)" d="m0 0h3v9h-2v-4h-3z" />
                              <path transform="translate(1357,2045)" d="m0 0 7 2v1h-8z" />
                              <path transform="translate(0,2045)" d="m0 0 3 3h-3z" />
                              <path transform="translate(8,2031)" d="m0 0 3 2-1 2z" />
                              <path transform="translate(547,2046)" d="m0 0 1 2-2-1z" />
                              <path transform="translate(6,2030)" d="m0 0 2 1z" />
                              <path transform="translate(1399,2046)" d="m0 0" />
                              <path transform="translate(1359,2044)" d="m0 0" />
                              <path transform="translate(13,2037)" d="m0 0" />
                              <path transform="translate(12,2036)" d="m0 0" />
                              <path transform="translate(11,2035)" d="m0 0" />
                              <path transform="translate(12,2031)" d="m0 0" />
                              <path transform="translate(10,2029)" d="m0 0" />
                              <path transform="translate(11,2028)" d="m0 0" />
                              <path transform="translate(2,2019)" d="m0 0" />
                              <path transform="translate(1,730)" d="m0 0" />
                              <path transform="translate(0,691)" d="m0 0" />
                              <path transform="translate(1975)" d="m0 0" />
                            </svg>
                          </>
                      }
                    </motion.button>
                  </div>
                </div>

              }
            </>

          </motion.div>
        </div>
        , document.getElementById("portals")
      )
    }

    , [])

  const VideoMoment = useMemo(() =>
    () => {
      const [VideoFIle, setVideoFIle] = useState(null)
      const [description, setdescription] = useState('')
      const [isSendingPst, setSendingMom] = useState(false)
      const handelGetImgFromInp = e => {
        if (e.target.files.length == 0) return;
        if (e.target.files[0].size > 8728640) return dispatch(Ten([false, "A moment video should be less than 8 MB ,We are sorry !"]))
        setVideoFIle(e.target.files[0])
      }

      function handelDrage(e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = "copy"
      }

      const handelDrapImg = e => {
        e.preventDefault();
        let file = e.dataTransfer.files[0]
        console.log(file);

        if (file.type.split("/")[0] == "video") {
          if (file.size > 10728640) return dispatch(Ten([false, "A moment video should be less than 8 MB ,We are sorry !"]))
          setVideoFIle(file)
        } else {
          // ----------------
        }

      }





      const handelSubmitMoment = async () => {
        if (!isSendingPst) {
          const formD = new FormData();
          formD.append("content", description)
          formD.append("type", "video")
          formD.append("file", VideoFIle)
          setSendingMom(true)
          await api.post('/user/create_moment', formD).then(res => {
            setSendingMom(false);
            setisCreatVedioMomentVSBL(false)
            dispatch(open_alert([, "Moment has been sucessfully submited "]))

          }).catch(er => {
            console.log(er.message);
            dispatch(open_alert([false, "Failed to save the moment => " + er.message]))
            setSendingMom(false)

          })
        }
      }

      return ReactDOM.createPortal(
        <div className="backendMer">
          <motion.div
            animate={{
              scale: [1.2, 1],
              opacity: [0, 1]
            }}
            exit={{
              scale: [1, 1.2],
              opacity: [1, 0]
            }}
            className='wmia scrl_none c-s-s psr br20 bg-l p20'
            style={{
              maxWidth: "700px",
              maxHeight: "100%",
              overflow: "auto"
            }}
          >
            <BTN_CLOSE onClick={() => setisCreatVedioMomentVSBL(false)} />
            <h1 className=' br10 mr50  r-s-c mb10 border p10' style={{ width: "95%" }}>
              <svg className='w30 mr10 h30 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" /></svg>
              Make a Video Moment
            </h1>
            <>
              {
                !VideoFIle &&
                <>
                  <motion.div animate={{ scale: [.5, 1], opacity: [0, 1] }} onDragOver={handelDrage} onDrop={handelDrapImg} className="wmia h300 mt20 mb20 r-c-c bg-fourth br10">
                    <svg version="1.1" viewBox="0 0 2048 2048" className='w20 h20 mr10' xmlns="http://www.w3.org/2000/svg">
                      <path transform="translate(1123,53)" d="m0 0h40l21 2 24 5 21 7 33 16 19 12 17 13 14 12 12 11 10 10 8 7 51 51v2l3 1 5 6 7 6 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 5 6 7 6 5 6 8 7 65 65v2h2l7 8 13 13 7 8 11 13 13 15 9 11 11 13 13 16 12 16 10 14 13 21 12 22 14 26 19 37 10 25 14 43 10 34 6 19 7 32 4 27 3 26 1 3h3v2l2 1v5h-5v7l3 1 1 10 1 4v100l-1 6 1 4v41l-2-1-1-14-1-1v-5h-2l-2 6-6 37-6 27-11 37-9 30-12 36-11 24-11 21-6 12-11 20-7 14-14 24-7 11-10 13-6 8-10 12-7 9-12 15-9 11-11 13-9 10-8 10h-2l-2 4-7 8h-2l-2 4-161 161-8 7-8 8-11 9-12 11-11 9-14 12-13 10-22 16-15 10-15 9-18 10-29 15-21 10-29 11-31 10-28 8-26 6-38 6-38 4-47 3-32 1h-471l-44-2-34-3-37-6-32-8-36-12-19-7-22-10-19-10-23-13-14-9-17-12-16-13-11-9-15-13-7-7-7-6v-2l-3-1-7-8-12-13-9-11-11-13-14-19-13-20-12-21-17-33-10-23-12-36-7-24-6-27-4-30-4-42-2-38v-166l-6-9-32-32v-2l-3-1-17-17v-2l-4-2-8-8v-2l-4-2v-2l-4-2-8-8v-2l-4-2-56-56v-2h-2l-7-8-10-10-7-8-9-10-10-13-11-15-11-19-9-20-10-28-3-7-3-6v-99l2 3 4-9 9-27 11-24 11-20 9-13 12-16h2l2-4 16-16 11-9 14-10 10-7 15-9 17-8 37-13 13-4 1-5-13-29-9-21-5-14-5-19-3-29-1-12v-28l5-25 7-25 7-21 6-13 7-13 9-13 11-15 10-13 11-12 12-11 11-8 13-10 20-12 19-9 27-9 22-6 18-2h44l22 2 24 6 21 8 7 3 8 2 6 2 3-17 6-20 8-24 13-27 13-19 10-14 7-9 8-10 13-13 16-12 16-11 22-12 16-7 18-6 24-6 22-3 22-1 33 2 23 4 24 7 21 8 25 13 14 10 14 11 4 4 5-1 3-5 5-16 10-26 5-12 12-20 16-22 7-9 11-12 11-11 14-11 15-10 21-12 18-8 27-9 18-4zm18 108-16 1-23 5-19 8-16 10-13 11-10 10-11 15-7 12-6 15-5 18-3 18v21l5 25 5 15 7 14 14 20 11 14 4 5h2l2 4 11 12 10 14 5 11 2 7v13l-3 11-7 11-1 3h-2l-5 5-9 8-12 6-12 3-9-1-12-4-11-7-10-8-11-10-8-7-56-56-4-5-4-4h-2l-2-4h-2l-2-4h-2l-2-4h-2l-2-4-44-44-8-7-13-11-18-12-10-6-21-9-18-4-8-1h-28l-18 3-16 5-16 8-16 11-12 11-7 7-9 12-9 16-4 8-7 25-3 18v18l3 19 5 18 5 12 10 16 9 12 8 10 9 10 10 10 6 7h2l1 3 8 7 4 5 8 7 102 102 11 14 6 11 4 12v13l-5 14-7 11-1 3h-2l-5 5-7 6-12 5-10 2h-8l-10-2-16-8-10-8-10-9-7-7h-2v-2h-2v-2l-4-4h-2l-2-4-8-8h-2l-2-4-12-12h-2l-2-4-12-12h-2l-2-4-153-153-22-18-15-10-19-10-19-6-18-3-16-1-21 2-19 5-21 10-16 11-10 8-8 8-9 12-9 15-7 15-5 17-4 25v16l3 19 6 20 7 12 6 11 8 12 12 14 9 10 213 213 7 8 13 17 6 13 2 8v8l-4 13-7 11-11 12-9 7-9 4-14 3-16-4-13-7-11-10-8-7-105-105-8-7-15-13-19-13-17-9-15-5-22-4-7-1h-20l-25 4-18 6-15 8-15 11-10 9-13 16-7 11-9 17-6 20-4 24v13l3 20 5 17 11 23 10 15 13 16 15 16 338 338h2l2 4h2l2 4h2l2 4 21 21 9 11 10 15 4 11 1 5v7l-4 13-9 14-11 12-7 5-14 4h-17l-12-4-11-6-15-13-102-102-8-6h-4l1 44v29l2 31 4 34 6 29 11 37 8 21 12 26 12 22 9 14 8 11 10 13 12 14 7 8 9 10 12 11 11 9 14 12 19 13 13 8 21 12 27 13 25 9 29 9 31 6 36 4 33 2 55 1h367l76-1 40-2 46-4 28-4 24-6 45-14 27-11 37-19 27-16 15-10 16-12 14-11 15-13 13-11 14-13 8-7 168-168v-2l4-2 9-11 9-10 7-8 9-11 8-9 11-14 8-10 10-13 12-19 9-16 6-10 6-11 22-44 9-23 9-28 12-41 6-26 5-30 3-29 3-43v-32l-5-52-5-38-6-27-10-35-15-47-16-35-12-23-13-23-9-16-14-21-7-9-11-14-11-13-9-11-11-13-8-10-10-11-7-8-23-23-6-7-6-5-2-3h-2l-2-4h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4-8-7-354-354-6-7-8-7-4-5-6-5-6-7h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4-15-14-7-7-11-9-10-8-14-9-10-6-17-7-17-4-13-2zm-1139 871m2040 41m0 2 1 3zm2 0m0 16v5h1v-5zm2 13m-2 99m-1 4m-2 16m0 2 1 2z" />
                      <path transform="translate(2047,1058)" d="m0 0h1v7l-2-4z" />
                      <path transform="translate(2047,1066)" d="m0 0v3l-2-2z" />
                      <path transform="translate(2045,1082)" d="m0 0v3z" />
                      <path transform="translate(2047,1254)" d="m0 0" />
                      <path transform="translate(2047,1055)" d="m0 0" />
                      <path transform="translate(2047,1044)" d="m0 0" />
                      <path transform="translate(352,1446)" d="m0 0" />
                      <path transform="translate(2047,1083)" d="m0 0" />
                      <path transform="translate(2047,1071)" d="m0 0" />
                      <path transform="translate(2047,1049)" d="m0 0" />
                      <path transform="translate(2047,1041)" d="m0 0" />
                      <path transform="translate(4,1041)" d="m0 0" />
                      <path transform="translate(2047,1037)" d="m0 0" />
                      <path transform="translate(0,929)" d="m0 0" />
                    </svg>
                    <strong style={{ fontSize: "16px" }}>
                      Drag and drop video here...
                    </strong>
                  </motion.div>
                  <input onChange={handelGetImgFromInp} accept='video/*' type="file" style={{ display: "none" }} id='inpImgMome' />
                  <motion.label animate={{ scale: [.7, 1], y: [50, 0], opacity: [0, 1] }} htmlFor='inpImgMome' className='wmia cr p10'>
                    <svg version="1.1" viewBox="0 0 2048 2048" className='w20 h20' xmlns="http://www.w3.org/2000/svg">
                      <path transform="translate(1034,215)" d="m0 0h30l38 2 37 4 42 8 30 8 36 12 20 8 28 12 33 17 25 15 27 18 19 14 16 13 11 9 10 9 8 7 32 32 7 8 11 13 13 17 11 15 14 21 12 19 10 18 16 32 9 20 11 29 8 24 10 37 7 35 5 35 2 18 2 35 26 2 34 4 29 5 27 7 29 10 24 10 25 12 21 12 17 11 12 8 21 16 14 12 13 12 18 18 9 11 9 10 9 12 12 17 11 18 10 17 14 28 16 39 6 18 10 37 6 25h2v120l-4 1 3 2 1 7v16h-2l1-7h-5l-2 6-10 38-7 20-6 16-8 19-8 15-8 16-6 10-10 17-11 16-7 9-8 10-11 13-11 12-6 7h-2l-1 3-8 7-14 13-11 9-18 14-19 13-24 14-23 12-23 10-25 9-30 9-28 6-26 4-31 3-50 2-261 1h-60l-22-2-7-3-7-5-8-10-8-16-1-11 2-9 4-8 8-11 8-8 7-4 4-1 367-2 33-2 29-4 29-6 30-10 24-10 19-10 22-13 19-13 16-13 11-9 11-11h2l2-4 10-10 1-2h2l2-4 9-11 10-13 10-15 10-17 14-29 7-18 8-26 5-21 4-23 2-20v-53l-2-21-5-27-6-25-12-33-8-18-10-20-14-23-13-18-9-11-10-11v-2h-2l-7-8-7-7-8-7-16-13-18-13-19-12-16-9-27-13-30-11-23-6-22-4-24-3-33-2h-47l-9-2-9-6-8-9-5-7-3-10-1-66-4-40-5-33-8-34-7-25-13-35-14-30-8-16-12-21-11-17-14-20-9-12-9-11-11-13-28-28-8-7-13-11-10-8-18-13-13-9-21-13-21-12-28-14-34-14-37-12-25-6-43-7-30-3-17-1h-28l-29 2-34 4-30 6-28 7-38 13-26 11-19 9-22 12-16 10-15 10-14 10-16 12-14 12-8 7-7 6-16 16-7 8-7 7-8 10-10 11-8 11-8 10-7 11-10 16-16 29-8 17-7 15-10 24-7 21-8 29-7 30-5 22-5 15-9 13-9 6-9 3-17 1h-49l-32 2-30 4-24 5-27 8-22 8-17 7-16 8-24 13-9 6-17 12-11 8-10 8-15 13-13 12-12 12-9 11-4 5h-2l-2 4-11 15-7 10-7 11-9 14-12 23-8 16-9 23-10 30-6 22-4 21-4 34-1 20v26l2 26 4 29 5 24 8 27 8 24 13 29 8 16 11 19 15 22 9 12 11 14 10 11 7 8 14 14 8 7 14 12 12 9 14 10 17 11 25 14 27 13 26 10 30 9 25 5 33 4 41 3 59 1h234l53 1 10 3 10 6 7 7 6 10 3 12v9l-2 10-5 10-6 7-8 6-8 4-8 2-14 1h-328l-46-2-19-2-35-6-39-9-29-10-21-8-29-13-20-10-20-12-11-7-16-11-17-13-30-26-29-29-7-8-10-11-13-17-11-15-17-26-12-21-10-19-12-27-8-21-9-27-11-42-1-8-2-1-2-11-2-2v-144l2 1 13-52 11-36 10-26 11-24 8-16 12-22 8-13 7-10 7-11 24-32 14-15 9-10 21-21 8-7 14-12 14-11 19-13 10-7 20-12 22-12 25-12 27-11 27-9 31-8 22-5 37-5 28-2 20-1 10-2 6-29 8-26 9-26 9-22 7-16 7-15 10-18 6-12 8-13 10-16 8-12 10-14 9-12 11-13 8-10 5-6h2l2-4 14-15 4-5h2v-2h2v-2l8-7 8-8 8-7 10-9 25-20 17-12 15-10 19-12 27-15 28-14 26-11 19-7 31-10 27-7 23-5 39-6 32-3zm1009 1063 1 2z" />
                      <path transform="translate(1033,1119)" d="m0 0h16l16 4 16 8 11 8 14 11 15 14 8 7 15 13 36 33 10 9 8 7 11 10 8 7 15 13 9 9 8 7 10 13 4 8 1 4v15l-4 11-7 9-7 7-12 9-8 2h-8l-13-4-12-7-16-13-15-13-14-12-11-9-17-16-11-10-8-7-10-9-4-3v44l-1 67v417l-2 20-5 9-11 11-14 9-5 1-14-1-14-5-11-8-7-10-4-9-1-8-1-19v-509l-1-6-9 6-10 9-15 13-8 7-13 12-14 11-14 13-14 11-12 9-12 7-8 2h-10l-11-5-6-4-10-10-8-15-4-11 3-12 9-14 8-10 8-7 12-11 8-7 10-9 8-7 12-11 8-7 16-15 15-14 10-9 8-7 12-11 11-9 16-13 15-10 14-7zm-35 135m-1 1m1 1 1 3z" />
                      <path transform="translate(1019,421)" d="m0 0h40l10 3 10 6 7 8 6 12 2 11v10l-3 9-6 10-5 6-10 6-13 4-52 6-26 6-36 12-31 15-15 10-17 12-11 9-15 14-8 8-9 11-7 8-16 24-12 22-11 25-9 27-9 35-7 16-6 9-7 6-11 4-4 1h-15l-10-3-10-6-8-8-6-10-2-7-1-12 4-29 7-27 11-31 11-25 11-21 6-10 7-11 13-19 8-10 12-14 15-16 14-14 14-11 10-9 19-13 18-11 16-9 23-11 23-9 27-8 27-6 27-4z" />
                      <path transform="translate(2047,1123)" d="m0 0h1v5h-3v-3h2z" />
                      <path transform="translate(2041,1291)" d="m0 0" />
                      <path transform="translate(0,1081)" d="m0 0" />
                    </svg >
                    Pick from device
                  </motion.label>
                </>
              }


            </>
            <>
              {
                VideoFIle &&
                <div className="c-c-c wmia" >

                  <div className="wmia r-p-s p10 br20" style={{ border: "solid 1px var(--border-color)" }}>
                    <div className="wkhmsin c-s-s p10 mt20">
                      <Texta value={description} onChange={e => { setdescription(e.target.value) }} placeholder={"Add description "} className={'wmia'} style={{ border: "none" }} />
                    </div>
                    <div className="wkhmsin c-c-c">
                      <motion.video animate={{ scale: [.7, 1] }} autoPlay loop className="wmia  br10" src={URL.createObjectURL(VideoFIle)} style={{ maxHeight: "500px", minHeight: "300px", objectFit: "cover", objectPosition: "top" }} alt="" />
                      <motion.button animate={{ scale: [.7, 1], y: [20, 0], opacity: [0, 1] }} onClick={() => setimgFIle(null)} className='wmia mt10 p10 cr '>
                        <svg version="1.1" viewBox="0 0 2048 2048" className='w20 h20' xmlns="http://www.w3.org/2000/svg">
                          <path transform="translate(1034,215)" d="m0 0h30l38 2 37 4 42 8 30 8 36 12 20 8 28 12 33 17 25 15 27 18 19 14 16 13 11 9 10 9 8 7 32 32 7 8 11 13 13 17 11 15 14 21 12 19 10 18 16 32 9 20 11 29 8 24 10 37 7 35 5 35 2 18 2 35 26 2 34 4 29 5 27 7 29 10 24 10 25 12 21 12 17 11 12 8 21 16 14 12 13 12 18 18 9 11 9 10 9 12 12 17 11 18 10 17 14 28 16 39 6 18 10 37 6 25h2v120l-4 1 3 2 1 7v16h-2l1-7h-5l-2 6-10 38-7 20-6 16-8 19-8 15-8 16-6 10-10 17-11 16-7 9-8 10-11 13-11 12-6 7h-2l-1 3-8 7-14 13-11 9-18 14-19 13-24 14-23 12-23 10-25 9-30 9-28 6-26 4-31 3-50 2-261 1h-60l-22-2-7-3-7-5-8-10-8-16-1-11 2-9 4-8 8-11 8-8 7-4 4-1 367-2 33-2 29-4 29-6 30-10 24-10 19-10 22-13 19-13 16-13 11-9 11-11h2l2-4 10-10 1-2h2l2-4 9-11 10-13 10-15 10-17 14-29 7-18 8-26 5-21 4-23 2-20v-53l-2-21-5-27-6-25-12-33-8-18-10-20-14-23-13-18-9-11-10-11v-2h-2l-7-8-7-7-8-7-16-13-18-13-19-12-16-9-27-13-30-11-23-6-22-4-24-3-33-2h-47l-9-2-9-6-8-9-5-7-3-10-1-66-4-40-5-33-8-34-7-25-13-35-14-30-8-16-12-21-11-17-14-20-9-12-9-11-11-13-28-28-8-7-13-11-10-8-18-13-13-9-21-13-21-12-28-14-34-14-37-12-25-6-43-7-30-3-17-1h-28l-29 2-34 4-30 6-28 7-38 13-26 11-19 9-22 12-16 10-15 10-14 10-16 12-14 12-8 7-7 6-16 16-7 8-7 7-8 10-10 11-8 11-8 10-7 11-10 16-16 29-8 17-7 15-10 24-7 21-8 29-7 30-5 22-5 15-9 13-9 6-9 3-17 1h-49l-32 2-30 4-24 5-27 8-22 8-17 7-16 8-24 13-9 6-17 12-11 8-10 8-15 13-13 12-12 12-9 11-4 5h-2l-2 4-11 15-7 10-7 11-9 14-12 23-8 16-9 23-10 30-6 22-4 21-4 34-1 20v26l2 26 4 29 5 24 8 27 8 24 13 29 8 16 11 19 15 22 9 12 11 14 10 11 7 8 14 14 8 7 14 12 12 9 14 10 17 11 25 14 27 13 26 10 30 9 25 5 33 4 41 3 59 1h234l53 1 10 3 10 6 7 7 6 10 3 12v9l-2 10-5 10-6 7-8 6-8 4-8 2-14 1h-328l-46-2-19-2-35-6-39-9-29-10-21-8-29-13-20-10-20-12-11-7-16-11-17-13-30-26-29-29-7-8-10-11-13-17-11-15-17-26-12-21-10-19-12-27-8-21-9-27-11-42-1-8-2-1-2-11-2-2v-144l2 1 13-52 11-36 10-26 11-24 8-16 12-22 8-13 7-10 7-11 24-32 14-15 9-10 21-21 8-7 14-12 14-11 19-13 10-7 20-12 22-12 25-12 27-11 27-9 31-8 22-5 37-5 28-2 20-1 10-2 6-29 8-26 9-26 9-22 7-16 7-15 10-18 6-12 8-13 10-16 8-12 10-14 9-12 11-13 8-10 5-6h2l2-4 14-15 4-5h2v-2h2v-2l8-7 8-8 8-7 10-9 25-20 17-12 15-10 19-12 27-15 28-14 26-11 19-7 31-10 27-7 23-5 39-6 32-3zm1009 1063 1 2z" />
                          <path transform="translate(1033,1119)" d="m0 0h16l16 4 16 8 11 8 14 11 15 14 8 7 15 13 36 33 10 9 8 7 11 10 8 7 15 13 9 9 8 7 10 13 4 8 1 4v15l-4 11-7 9-7 7-12 9-8 2h-8l-13-4-12-7-16-13-15-13-14-12-11-9-17-16-11-10-8-7-10-9-4-3v44l-1 67v417l-2 20-5 9-11 11-14 9-5 1-14-1-14-5-11-8-7-10-4-9-1-8-1-19v-509l-1-6-9 6-10 9-15 13-8 7-13 12-14 11-14 13-14 11-12 9-12 7-8 2h-10l-11-5-6-4-10-10-8-15-4-11 3-12 9-14 8-10 8-7 12-11 8-7 10-9 8-7 12-11 8-7 16-15 15-14 10-9 8-7 12-11 11-9 16-13 15-10 14-7zm-35 135m-1 1m1 1 1 3z" />
                          <path transform="translate(1019,421)" d="m0 0h40l10 3 10 6 7 8 6 12 2 11v10l-3 9-6 10-5 6-10 6-13 4-52 6-26 6-36 12-31 15-15 10-17 12-11 9-15 14-8 8-9 11-7 8-16 24-12 22-11 25-9 27-9 35-7 16-6 9-7 6-11 4-4 1h-15l-10-3-10-6-8-8-6-10-2-7-1-12 4-29 7-27 11-31 11-25 11-21 6-10 7-11 13-19 8-10 12-14 15-16 14-14 14-11 10-9 19-13 18-11 16-9 23-11 23-9 27-8 27-6 27-4z" />
                          <path transform="translate(2047,1123)" d="m0 0h1v5h-3v-3h2z" />
                          <path transform="translate(2041,1291)" d="m0 0" />
                          <path transform="translate(0,1081)" d="m0 0" />
                        </svg >
                        Pick a different video
                      </motion.button>
                    </div>
                  </div>

                  <div className="wmia r-e-c  mt20">
                    <motion.button
                      animate={{
                        opacity: [0, 1],
                        y: [100, 0]
                      }}
                      exit={{
                        opacity: [1, 0],
                        y: [0, 100]
                      }}
                      className='border   bg-rev-l  br10 p10 wmia'
                      onClick={handelSubmitMoment}
                    >
                      {
                        isSendingPst ?
                          <L_loader />
                          :
                          <>

                            Share
                            <svg className='ml10' version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                              <path transform="translate(1978)" d="m0 0h48l5 10 6 7 10 7 1 1v43h-3l-4 9-8 24-9 29-15 46-12 38-15 47-18 57-15 47-16 50-11 35-10 31-11 34-16 50-35 110-16 51-15 47-16 50-14 44-14 43-5 17-10 31-17 53-13 41-12 38-16 51-10 31-17 53-12 37-5 17-9 27-11 35-21 66-12 38-16 50-14 45-9 27-8 25-10 32-12 37-9 29-20 63-11 35-17 54-9 28-8 25-9 29-16 50-8 23-10 23-7 12-7 6-6 9v1h-33l-8-6-8-8-11-16-8-15-13-29-10-22-9-21-18-41-12-29-6-13-11-26-18-41-11-26-13-30-18-42-17-39-15-35-26-60-18-42-14-32-9-21-13-30-12-28-14-32-10-23-15-35-26-60-23-54-13-31-12-28-9-20-4-6-5-4-24-9-21-8-33-13-47-18-41-16-50-19-117-45-36-14-29-11-78-30-36-14-50-19-41-16-50-19-112-43-44-17-29-11-49-19-20-9-10-6-12-11-7-6h-1v-35l9-10 12-10 16-8 15-6 45-16 40-14 24-8 41-14 47-16 34-12 36-12 106-36 26-9 38-13 105-36 121-41 23-8 82-28 144-49 74-25 31-11 27-9 79-27 342-116 28-10 36-12 85-29 43-15 36-12 70-24 36-12 62-21 43-15 16-6 5-2zm-148 150-44 15-36 12-52 17-25 9-72 24-64 22-36 12-47 16-217 74-21 7-41 14-36 12-19 7-36 12-64 22-36 12-105 36-65 22-29 10-27 9-41 14-191 65-20 7-82 28-36 12-31 11-30 10-41 14-46 16-28 9-29 8-6 4 3 2 18 8 27 11 36 14 29 11 39 15 41 16 34 13 229 88 104 40 24 9 28 11 27 10 36 14 22 9 20 7 32 13 17 6 19 8 5 1 1-3 3-1 5-6v-2h2l21-21 7-8 650-650 6-7 8-7 4-5 8-7 113-113 8-7 7-7 8-7 15-15v-2zm68 61-27 27v2l-3 1-5 5-11 12-8 8-5 6-3 2v2l-4 2-29 29-6 5-7 8-7 6-7 8-705 705-8 7-4 4v2h-2l-7 8-10 9-2 1v2h-2l-5 5-2 4 6 10 8 19 15 34 15 36 20 46 24 56 39 90 30 70 11 25 13 30 11 26 39 90 15 35 13 30 16 37 14 33 13 30 11 25 13 31 10 29 4 6 4 1 4-7 15-45 12-39 14-44 12-36 21-66 16-50 17-54 10-32 10-30 11-35 20-63 22-69 18-57 22-69 16-50 13-41 15-47 18-57 17-53 14-45 10-31 14-44 10-31 17-54 8-25 13-40 8-26 10-31 19-59 30-95 14-44 16-51 20-62 14-45 6-16 2-10v-5z" />
                              <path transform="translate(663,1336)" d="m0 0h8l13 4 10 6 8 8 6 12 3 10v10l-8 16-8 11-9 11h-2v2h-2v2h-2l-2 4-33 33-6 7-8 7-9 10-3 3h-2v2h-2l-2 4-10 10h-2l-2 4-28 28h-2v2h-2l-2 4-14 14h-2l-2 4-8 8-5 4-7 8-4 2v2l-6 5-6 7-8 7-8 9-8 7-8 9-8 7-8 9-8 7-9 10-6 5-1 2h-2l-2 4-8 8h-2v2h-2v2h-2l-2 4-8 8h-2v2h-2l-2 4-10 10h-2v2h-2l-2 4-296 296-11 9-8 6-14 10-4 4v1h-32l2-6-11-12-8-7-5-4h-2v-29h2l2-5 12-16 9-10 7-8 24-24 7-8 4-4h2l2-4 552-552 14-11 11-7 10-4z" />
                              <path transform="translate(352,1157)" d="m0 0h7l12 5 14 9 7 7 5 8 2 7 1 12-3 10-8 14-10 12-7 8-275 275-8 7-11 10-11 7-18 8-4 1h-7l-10-4-10-7v-2l-3-1-7-8-8-9v-26l13-17 8-10 30-30 3-4h2l2-4 6-5 7-8 7-7h2l2-4 220-220h2l2-4h2l2-4 8-7 10-8 16-8z" />
                              <path transform="translate(842,1648)" d="m0 0 14 2 12 6 8 6 8 13 6 11-1 10-5 12-8 14-10 11-7 8-77 77-5 6-8 7-8 9-8 7-8 9-8 7-8 9-7 6-7 8-5 4-7 8-83 83-3 1v2l-7 6-7 8-5 4-5 5-8 9-11 9-8 7-14 10-5 4h-2v2h-26v-3l-5-5-13-12-6-8-5-10-1-7 8-21 7-11 12-14 80-80 6-7 8-7 3-4h2l2-4 11-10 7-8 9-8 1-2h2l2-4 11-10 1-2h2l2-4 11-10 1-2h2l2-4 11-10 7-8 9-8 7-8 9-8 7-8 9-8 7-8 8-7 7-8 19-19 7-6 5-6 8-7 11-10 15-10 7-3z" />
                              <path transform="translate(2045,75)" d="m0 0h3v9h-2v-4h-3z" />
                              <path transform="translate(1357,2045)" d="m0 0 7 2v1h-8z" />
                              <path transform="translate(0,2045)" d="m0 0 3 3h-3z" />
                              <path transform="translate(8,2031)" d="m0 0 3 2-1 2z" />
                              <path transform="translate(547,2046)" d="m0 0 1 2-2-1z" />
                              <path transform="translate(6,2030)" d="m0 0 2 1z" />
                              <path transform="translate(1399,2046)" d="m0 0" />
                              <path transform="translate(1359,2044)" d="m0 0" />
                              <path transform="translate(13,2037)" d="m0 0" />
                              <path transform="translate(12,2036)" d="m0 0" />
                              <path transform="translate(11,2035)" d="m0 0" />
                              <path transform="translate(12,2031)" d="m0 0" />
                              <path transform="translate(10,2029)" d="m0 0" />
                              <path transform="translate(11,2028)" d="m0 0" />
                              <path transform="translate(2,2019)" d="m0 0" />
                              <path transform="translate(1,730)" d="m0 0" />
                              <path transform="translate(0,691)" d="m0 0" />
                              <path transform="translate(1975)" d="m0 0" />
                            </svg>
                          </>
                      }
                    </motion.button>
                  </div>
                </div>

              }
            </>

          </motion.div>
        </div>
        , document.getElementById("portals")
      )
    }

    , [])

  return (
    <div className='wmia c-c-c p20'>
      <div className="wmia r-p-c">

        <motion.div
          className='mb20 c-c-c text-center'

          animate={{
            opacity: [0, 1],

          }}
        ><motion.h1
          style={{ fontSize: "22px" }}
          className='fw900 mt5'
          animate={{
            y: [30, 0],
            opacity: [0, 1],
            transition: {
              delay: .6,
              duration: .8,
              type: "spring"
            }
          }}
        >Unleash Your Creativity </motion.h1 ><motion.h1
          style={{ fontSize: "22px" }}
          className='fw900 mt5'
          animate={{
            y: [30, 0],
            opacity: [0, 1],
            transition: {
              delay: 1.2,
              duration: .8,
              type: "spring"
            }
          }}
        > Share Your Moments</motion.h1 > <motion.h1
          style={{ fontSize: "22px" }}
          className='fw900 mt5'
          animate={{
            y: [30, 0],
            opacity: [0, 1],
            transition: {
              delay: 1.8,
              duration: .8,
              type: "spring"
            }
          }}
        >Tell Your Story</motion.h1>
        </motion.div>
        <motion.img
          animate={{
            scale: [.8, 1],
            y: [100, 0],
            opacity: [0, 1],
            transition: {
              delay: .2
            }
          }}
          src="/media/11375601_4735240-removebg-preview.png" alt="" />

      </div>
      <div className="c-c-c mt20 wmia" style={{ maxWidth: "500px" }}>
        <motion.button
          style={{
            cursor: "pointer"
          }}
          animate={{
            scale: [.8, 1],
            y: [100, 0],
            opacity: [0, 1],
            transition: {
              delay: .4,
              type: "spring"
            }
          }}
          onClick={() => setisCreatTexVSBL(true)}
          className='  bg-fourth wmia p15 br10'>
          <svg className='w30 mr20 h30 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-160v-520H80v-120h520v120H400v520H280Zm360 0v-320H520v-120h360v120H760v320H640Z" /></svg>
          Craft Your Moment in Words
        </motion.button>
        <motion.button
          style={{
            cursor: "pointer"
          }}
          animate={{
            scale: [.8, 1],
            y: [100, 0],
            opacity: [0, 1],
            transition: {
              delay: .6,
              type: "spring"

            }
          }}

          onClick={() => setisCreatImageMomentVSBL(true)}

          className=' bg-fourth  mt20 wmia p15 br10'
        >

          <svg className='w30 mr20 h30 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" /></svg>
          Capture Your Moment in an Image
        </motion.button>
        <motion.button
          style={{
            cursor: "pointer"
          }}
          animate={{
            scale: [.8, 1],
            y: [100, 0],
            opacity: [0, 1],
            transition: {
              delay: .8,
              type: "spring"
            },
          }}

          onClick={() => setisCreatVedioMomentVSBL(true)}
          className=' bg-fourth  mt20 wmia p15 br10'>
          <svg className='w30 mr20 h30 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z" /></svg>
          Make a Video Moment
        </motion.button>
      </div>

      <AnimatePresence>
        {
          isCreatTexVSBL &&
          <TextMoment />
        }
        {
          isCreatImageMomentVSBL &&
          <ImageMoment />
        }
        {
          isCreatVedioMomentVSBL &&
          <VideoMoment />
        }
      </AnimatePresence>



    </div>
  )
}
