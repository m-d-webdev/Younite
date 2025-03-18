import { useSelector } from "react-redux"
import { Loader_element } from "../slices/loader"
import { Upload_prof_pic } from "../slices/profileSlice"
import { AnimatePresence } from "framer-motion"
import { Alert_bell } from "../slices/alert_cmp"
import { Zoomer } from "../slices/zoomer"
import { Comments_page } from "../slices/comments"
import { Replies_page } from "../slices/media/replies"
function Portals() {

    const { cmps_params } = useSelector(s => s.Profile)
    const { is_vsbl } = useSelector(s => s.Alert_Not)
    const { zoomer_vsbl } = useSelector(s => s.Zoomer)
    const Comments_page_vsblt = useSelector(s => s.Comments.is_visible)
    const Replies_visibility = useSelector(s => s.Replies.is_visible)
    
    return (
        <>
            <Loader_element />
            <AnimatePresence>
                {
                    Comments_page_vsblt &&
                    <Comments_page />
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    cmps_params.Upload_prof_pic_vsbl &&
                    <Upload_prof_pic />
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    is_vsbl &&
                    <Alert_bell />
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    zoomer_vsbl &&
                    <Zoomer />
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    Replies_visibility &&
                    <Replies_page />
                }
            </AnimatePresence >
           
        </>

    )
}

export default Portals
