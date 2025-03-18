import { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { _OnContainerClickOut } from './Abbreviator';
export let ConfirmAction;
function Confimation() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isVisible, setisVisible] = useState(false);
    const [onConfirmClick, setonConfirmClick] = useState(() => () => { });

    const ConfirmRef = useRef()



    ConfirmAction = (t, b, cl) => {
        setisVisible(true);
        setTitle(t);
        setBody(b);
        setonConfirmClick(() => () => {
            setisVisible(false);

            cl();
        })
    }

    return ReactDOM.createPortal(
        <>
            <AnimatePresence>
                {
                    isVisible &&
                    <div className='backendMer'
                        onClick={e => _OnContainerClickOut(e, ConfirmRef.current, () => setisVisible(false))}
                    >
                        <motion.div
                            ref={ConfirmRef}
                            initial={{
                                opacity: 0,
                                scale: 1.05
                            }}
                            exit={{
                                opacity: 0,
                                scale: 1.05
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1
                            }}
                            style={{
                                minWidth: "250px"
                            }}
                            className=" p20 br10 bg-l c-c-s">
                            <h1 className='text-center fw900'>{title}</h1>
                            {
                                title != "" &&
                                <p className='text-center mt10 '>{body}</p>
                            }
                            <div className="r-e-c mt20">
                                <button onClick={() => setisVisible(false)} className='curP mr20 r-c-c'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w10 h10 mr5' height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                    Cancel
                                </button>

                                <button className='bg-d c-l w100 curP' onClick={onConfirmClick}>
                                    Sure
                                </button>
                            </div>
                        </motion.div>
                    </div>
                }
            </AnimatePresence>
        </>,
        document.getElementById("portals")
    )
}

export default Confimation
