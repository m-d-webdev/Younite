import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ten } from '../slices/ten_slice'
import { useDispatch } from 'react-redux'
import { _onClickOut } from './Abbreviator'
import Texta from './Texta'

let audioChunks = [];

let scriptProcessor, analyser, microphone, audioContext, recognition;

const SerachByMicro = ({ onWordIsReady }) => {


    const dispatch = useDispatch()

    const [isWantToRecord, setWantToRecord] = useState(false)


    const containerSercRef = useRef()

    const RecorderContainer = () => {
        const [volumeSpeaking, setvolumeSpeaking] = useState(0)
        const [isRecording, setRecording] = useState(false);
        const [foundWords, setWordRecoed] = useState('')
        const [isError, setError] = useState('')
        const [chunksWords, steChanksWord] = useState('')
        const btnStopRecordingBtn = useRef()
        useEffect(() => {
            if (containerSercRef.current) {
                _onClickOut(containerSercRef.current, () => {
                    recognition?.stop();
                    setWantToRecord(false)
                })
            }

            StartRecording();

            return () => {
                stopRecording()
                audioChunks = [];
            }
        }, [])



        const handelDone = () => {
            onWordIsReady(foundWords);
            stopRecording()
            setWantToRecord(false)
        }


        const StartRecording = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                dispatch(Ten([false, " Failed to recorde your voice , check premissions"]))
                return;
            }

            setRecording(true)

            navigator.mediaDevices.getUserMedia({ audio: true }).then(strem => {
                Setstream(strem);
                recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

                recognition.onresult = e => {
                    // let trans = e.results[0][0].transcript;
                    let trans = Array.from(e.results)
                        .map(re => re[0])
                        .map(re => re.transcript)
                        .join("");
                    steChanksWord(` -> ${trans}`)

                    if (e.results[0].isFinal) {
                        setWordRecoed(cur => `${cur} ${trans}`)
                        steChanksWord("")

                    }
                }
                recognition.interimResults = true
                recognition.onend = () => {
                    if (btnStopRecordingBtn.current) {
                        recognition?.start();
                    }
                }
                recognition.onstart = () => { }
                recognition.start();
            }).catch(er => {
                setError(true)
            })


        }
        const Setstream = (e) => {

            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(e);
            scriptProcessor = audioContext.createScriptProcessor(256, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 512;

            microphone.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            scriptProcessor.onaudioprocess = () => {
                let dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);

                let volume = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

                setvolumeSpeaking(volume)

            };

            // stop all thnks 

        }

        const stopRecording = () => {
            if (recognition) { recognition.stop() }

            if (scriptProcessor) {
                scriptProcessor.disconnect();
            }
            if (analyser) {
                analyser.disconnect();
            }
            if (microphone) {
                microphone.disconnect();
            }
            if (audioContext) {
                audioContext.close()
            }
            setRecording(false);

        }


        return (
            <motion.div
                style={{
                    position: "absolute",
                    top: '40px',
                    right: "0",
                    zIndex: 5,
                    filter: "drop-shadow(0 -5px 8px var(--filter-color))"
                }}
                ref={containerSercRef}

                className="bg-l p10 br15 c-s-s w400  "
                initial={{
                    scale: 0,
                    opacity: 0,
                    transformOrigin: "top right"
                }}
                exit={{
                    scale: 0,
                    opacity: 0,
                    transformOrigin: "top right"
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    transformOrigin: "top right"
                }}
            >
                {
                    isError ?
                        <div className='wmia c-c-c h200'>
                            <svg className='f-no w60 h60 ' style={{ stroke: "red" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M3 3l18 18"></path> <path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1"></path> <path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85"></path> <path d="M8 21l8 0"></path> <path d="M12 17l0 4"></path> </svg>
                            <p className='text-center mt20 op-8 fs15 w'>
                                We can't access your microphone. Please check your permissions to start transcribing your voice.
                            </p>
                        </div>
                        :
                        <>
                            <div className="wmia r-b-c">
                                <h1 className='fw900 op-7'>
                                    speech-to-text
                                </h1>

                            </div>
                            <div className="wmia h100 r-c-c">
                                <span className="bg-d mr5 br20" style={{
                                    width: "15px",
                                    minHeight: "20px",
                                    maxHeight: "80px",
                                    transition: "height .4s",
                                    height: `${volumeSpeaking * Math.random() * 1}px `

                                }}></span>
                                <span className="bg-d mr5 br20" style={{
                                    width: "15px",
                                    minHeight: "20px",
                                    maxHeight: "80px",
                                    transition: "height .4s",
                                    height: `${volumeSpeaking * Math.random() * 2.5}px `

                                }}></span>
                                <span className="bg-d mr5 br20" style={{
                                    width: "15px",
                                    minHeight: "20px",
                                    maxHeight: "80px",
                                    transition: "height .4s",
                                    height: `${volumeSpeaking * Math.random() * 5}px `

                                }}></span>
                                <span className="bg-d mr5 br20" style={{
                                    width: "15px",
                                    minHeight: "20px",
                                    maxHeight: "90px",
                                    transition: "height .4s",
                                    height: `${volumeSpeaking * Math.random() * 7.5}px `

                                }}>
                                </span>
                                <span className="bg-d mr5 br20" style={{
                                    width: "15px",
                                    minHeight: "20px",
                                    maxHeight: "80px",
                                    transition: "height .4s",
                                    height: `${volumeSpeaking * Math.random() * 5}px `

                                }}></span>
                                <span className="bg-d mr5 br20 " style={{
                                    width: "15px",
                                    minHeight: "20px",
                                    maxHeight: "80px",
                                    transition: "height .4s",
                                    height: `${volumeSpeaking * Math.random() * 2.5}px `

                                }}></span>
                                <span className="bg-d  br20 " style={{
                                    width: "15px",
                                    minHeight: "20px",
                                    maxHeight: "80px",
                                    transition: "height .4s",
                                    height: `${volumeSpeaking * Math.random() * 1}px `

                                }}></span>
                            </div>

                            <Texta onChange={e => setWordRecoed(e.target.value)} style={{ border: "none" }} className={"fw900  mt20 mb20 p10"} placeholder={"Start speaking ..."} value={`${foundWords}${chunksWords}`} />
                            <div className="wmia mt20 r-b-c">

                                {
                                    isRecording ?
                                        <button className='bg-r ' ref={btnStopRecordingBtn} type='button' onClick={stopRecording}>
                                            Stop
                                            <svg className='ml10' style={{ fill: "#fff", stroke: "#fff" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path> <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path> </svg>
                                        </button>
                                        :
                                        <button type='button' className='bg-- c-rl' onClick={StartRecording}>
                                            continu
                                            <svg xmlns="http://www.w3.org/2000/svg" className='ml10' style={{ fill: "#fff", stroke: "#fff" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 4v16l13 -8z"></path> </svg>
                                        </button>
                                }

                                {
                                    foundWords != "" &&
                                    <button onClick={handelDone} type='button' className='ml20 r-c-c fw900 bl' >
                                        Proceed
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                                    </button>
                                }

                            </div>

                        </>
                }

            </motion.div >
        )
    }
    return (
        <div className='r-s-c psr'>
            <span
                style={isWantToRecord ? {
                    backgroundColor: "var(--bg-secondary)"
                } : {}}
                onClick={() => setWantToRecord(true)} className="p10 psr imgCercle ml15 bg-fourth c-c-c">
                <svg
                    style={isWantToRecord ? {
                        fill: "var(--bg-primary)",
                    } : {}}
                    version="1.1" viewBox="0 0 2048 2048" className='w20 h20' xmlns="http://www.w3.org/2000/svg">
                    <path transform="translate(936)" d="m0 0h138l3 3h5l1-3h32l-1 4h-12l-4 2 41 11 31 11 17 7 16 8 27 15 17 11 14 10 17 14 11 9 13 12 14 14 9 11 11 13 11 15 8 12 9 15 10 18 8 16 10 23 10 28 7 27 5 26 3 26 2 36v582l-2 35-3 29-5 27-8 29-11 32-11 24-15 28-9 15-10 14-10 13-11 14-9 11-21 21-8 7-13 11-10 8-10 7-18 12-21 12-23 12-27 11-24 8-28 8-20 4-21 3-34 3h-34l-43-4-23-4-28-8-35-12-33-16-20-11-19-12-11-8-14-11-13-11-8-7-16-15-9-10-11-13-14-17-13-18-12-20-12-22-10-21-9-24-10-31-5-21-4-26-3-34-2-43-1-76v-105l1-357 1-33 4-43 3-18 7-30 8-26 11-28 9-19 12-22 13-22 6-8 8-11 10-13 13-16 16-17 14-13 26-20 17-12 19-12 29-16 22-10 19-7 26-8 28-7-2-3-9-2zm39 1m-5 1m-11 1m-6 1v1h5v-1zm131 0v1h5v-1zm-79 120-29 3-20 4-26 8-22 9-25 13-13 9-11 8-16 13-13 12-11 12-12 15-12 18-11 18-12 25-9 25-6 24-4 25-2 22-1 36v542l2 40 4 28 5 20 9 27 12 25 10 18 11 16 11 14 12 14 11 11 11 9 10 8 17 12 22 13 23 11 16 6 25 7 30 5 28 2h18l22-2 23-4 28-8 19-7 23-11 17-10 17-12 14-11 13-11 12-12 18-22 14-21 9-16 10-21 9-29 6-26 3-25 1-14 1-36v-524l-1-45-3-32-5-25-12-36-12-25-13-22-12-17-9-11-11-12-11-11-14-11-16-12-24-14-25-12-25-9-23-6-27-4-12-1z" />
                    <path transform="translate(344,918)" d="m0 0h19l11 3 10 4 9 7 9 9 6 10 5 15 4 27 10 86 4 25 7 28 13 43 11 31 8 19 16 32 16 29 15 26 9 13 10 13 12 14 8 10 12 14 11 14 15 16 2 4 4 2 14 13 11 9 13 11 14 11 12 10 13 10 14 9 26 15 26 14 14 8 16 8 22 10 36 12 45 14 22 6 33 5 70 7 15 1h20l49-5 51-6 20-4 40-12 38-12 25-9 27-13 22-12 30-16 13-8 16-10 28-22 11-9 13-11 10-8 10-9 8-7 14-14 7-8 9-10 36-44 9-12 13-20 9-16 12-22 14-27 12-25 9-26 7-21 13-44 4-17 3-14 4-33 4-38 6-49 4-16 6-12 9-10 9-7 14-7 7-2h20l12 3 15 8 10 9 7 8 7 14 2 8 1 10-1 28-4 38-7 55-5 29-6 24-15 53-10 32-12 29-14 29-10 20-10 19-8 15-12 21-12 17-13 17-7 9-14 19-14 17-8 10-11 13-15 16-8 7-9 9-8 7-11 10-11 9-17 16-17 14-18 13-18 11-20 13-17 10-13 8-24 14-17 8-15 7-29 11-23 9-17 6-30 10-24 6-46 9-55 10-12 3h-3l1 6-1 210h261l20 1 14 3 15 8 9 9 7 10 6 12 3 12v16l-6 16-6 10-7 9-15 10-11 8h-709l-2-4-5-5-14-11-7-8-6-10-5-15v-16l3-11 5-12 6-9 7-8 11-7 13-6 5-1 14-1h177l92 1v-217l-12-2-75-14-37-7-21-6-47-17-26-10-27-11-16-7-22-12-16-10-23-14-24-15-11-7-18-13-17-14-8-7-10-9-8-7-14-13-8-7-9-9-8-7-14-14-7-8-9-10-11-14-12-15-12-16-14-18-12-17-10-15-15-27-8-15-25-50-9-21-8-21-19-63-11-44-5-31-6-48-4-44v-31l5-14 8-13 7-7 13-9 11-5z" />
                    <path transform="translate(1385,2044)" d="m0 0 2 2-1 2h-7l3-2h3z" />
                    <path transform="translate(1080)" d="m0 0h2l-1 3z" />
                    <path transform="translate(1376,2047)" d="m0 0 2 1z" />
                    <path transform="translate(659,2047)" d="m0 0 2 1z" />
                </svg>
            </span>
            <AnimatePresence>
                {
                    isWantToRecord &&
                    <RecorderContainer />

                }
            </AnimatePresence>
        </div>
    )
}

export default SerachByMicro
