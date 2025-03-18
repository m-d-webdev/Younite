import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

function ProfileHeader({ p }) {
    const navigate = useNavigate();
    return (
        <div className="wmia r-c-c">

            <div className='wmia r-p-c p10' style={{ maxWidth: "800px" }} >
                <Link className={`r-c-c hoverEff3 ${p == 1 ? "all_blue" : ""}`} to={'/Profile/personal_info'}>
                    <svg className='mr10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5"></path> <path d="M19 22v.01"></path> <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"></path> </svg>
                    personal information
                </Link>
                <Link className={`r-c-c hoverEff3 ${p == 2 ? "all_blue" : ""}`} to={'/Profile/shares'}>
                    <svg className='mr10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M19 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M5 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M7 12h3l3.5 6h3.5"></path> <path d="M17 6h-3.5l-3.5 6"></path> </svg>
                    Shares
                </Link>
            </div>
        </div>
    )
}

export default ProfileHeader
