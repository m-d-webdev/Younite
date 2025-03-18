import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { serachForData } from '../slices/search';
import SerachByMicro from './SerachByMicro';

function SearchInput() {
    const { isSearching, oldSerachs, resultSearchData } = useSelector(s => s.searchSlice)
    const [term, setTerm] = useState("");
    const handelFilInp = (e) => {
        let t = e.target.value
        setTerm(t)
    }
    const nav = useNavigate()
    const dis = useDispatch();
    const handelSubForm = e => {
        e?.preventDefault();
        dis(serachForData(term));
        if (window.location.pathname != '/search') {
            nav('/search');
        }
    }
    const handelWordsReay = e => {
        setTerm(e)
        dis(serachForData(e));
        if (window.location.pathname != '/search') {
            nav('/search');
        }
    }



    return (
        <>
            <form onSubmit={handelSubForm} className="r-s-c " style={{ width: "30%" }}>
                <div className="r-s-c p5 pl20 bg-fourth br20 ml20 " style={{ width: "100%" }}>
                    <svg version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                        <path transform="translate(790)" d="m0 0 3 1 1 2 6-1v-2h115l4 2 3-1v2h2v-3h4l5 2 1 2h6v-4h44v1l-8 1-1 1h-10l-9-1-2 2-1 2 39 5 45 8 31 7 56 14 36 12 37 14 30 13 26 12 19 10 26 14 28 17 17 11 24 16 13 10 14 10 18 14 11 9 14 12 11 9v2l4 2 10 10 8 7 34 34 7 8 12 13 9 11 12 14 10 13 14 18 14 20 13 19 14 22 15 26 10 18 14 26 13 28 13 30 15 40 11 34 8 28 11 46 6 33 6 43 4 38 2 32 1 39-2 54-3 30-9 65-6 30-15 60-15 46-13 35-13 30-10 22-8 16-13 25-10 17-6 11-25 40-13 18-14 19-6 8-11 15-12 14-7 8-12 14-31 33-13 13-8 7-12 11-10 9-8 7-10 8-12 10-14 11-13 9-30 21-17 11-22 13-20 12-26 14-17 9-28 13-25 11-43 16-39 12-39 10-30 7-27 5-45 7-35 4-47 3h-63l-36-2-38-4-54-9-34-7-55-15-30-10-35-13-27-11-38-18-25-12-25-14-23-14-22-14-16-11-16-12-19-14-13-10-14-12-10-9-8-7-12-11-15-14-8-7v-2l-4-2-16-17-15-16-10-11-7-8-12-14-11-14-14-18-24-34-12-19-14-23-10-17-10-18-19-38-15-34-18-48-12-37-16-64-10-51-1-2-1-9-1-2-1-4-2-5-2-9-1-3v-203l1 2 2-1 17-85 7-29 9-34 13-40 16-42 13-28 11-24 8-16 13-24 12-20 8-13 11-18 6-9 12-17 14-19 13-17 13-16 9-11 9-10 12-13 7-9h2l2-4 15-16 11-11 11-9 5-5h2v-2l8-7 10-9 14-12 34-26 16-12 20-14 22-14 17-10 25-15 26-14 29-14 27-12 26-10 42-15 28-8 42-11 37-8 53-9 26-4 1-2h3zm162 1m-27 2 4 1zm-80 242-35 2-35 4-32 6-30 7-35 10-29 10-29 12-28 13-23 12-16 9-24 15-18 12-17 13-28 22-12 11-8 7-16 15-12 12-7 8-9 9-7 8-10 11-8 11-9 12-14 19-18 27-6 11-8 13-12 23-8 16-10 22-14 36-10 30-10 37-6 28-5 37-4 40-1 17v48l3 36 7 49 6 29 8 30 11 36 11 28 13 30 16 32 11 19 9 15 22 33 16 21 9 11 12 14 11 12 14 15 16 16 8 7 7 7 11 9 13 11 18 13 13 10 24 16 28 17 22 12 32 16 32 13 34 12 31 9 30 7 34 6 44 5 28 2h48l38-3 32-4 36-7 36-9 29-9 28-10 22-9 34-16 27-14 22-13 11-7 18-12 18-13 14-11 10-8 10-9 8-7 3-2v-2l4-2 13-12 22-22 7-8v-2h2l9-11 11-13 20-26 9-13 10-15 11-18 12-22 8-15 11-23 15-36 12-36 7-25 6-23 5-23 6-39 3-33 1-17v-58l-2-29-5-36-8-43-12-46-14-40-9-22-11-24-17-34-10-17-13-21-8-12-12-17-13-17-11-14-7-9h-2l-2-4-11-12-9-10-14-14-8-7-12-11-11-9-12-10-13-10-18-13-17-12-26-16-25-14-17-9-24-11-32-13-34-12-28-8-39-9-29-5-36-4-39-2zm-840 736 1 4z" />
                        <path transform="translate(1663,1491)" d="m0 0 6 2 7 6 7 8 19 19 2 1v2l4 2 22 22 8 7 56 56 8 7 32 32 8 7 40 40 6 5 5 6 3 2v2l4 2v2l4 2 34 34 6 5 5 6 8 7 45 45 7 8 9 10 13 18 11 20 4 10h2v70l-5 3-12 23-8 11-11 13-10 10-13 9-17 9-16 6-16 4-3 2h-19v-2h-11l-18-4-16-6-20-11-10-8-20-18-32-32-7-6-4-4v-2l-4-2-34-34-8-7-37-37-8-7-29-29-8-7v-2l-4-2v-2l-4-2-64-64-8-7-26-26-2-1v-2h-2v-2l-4-2v-2l-4-2-25-25-8-7-9-8v-2h-2l-3-4 1-4 15-11 7-7 10-8 14-12 8-7 8-8 8-7 45-45 7-8 9-9 8-10 10-11 7-8 10-13 4-5z" />
                        <path transform="translate(936)" d="m0 0h2v3l2 1h-6l2-1z" />
                        <path transform="translate(2047,1963)" d="m0 0h1v5l-3-1z" />
                        <path transform="translate(786)" d="m0 0 2 1z" />
                        <path transform="translate(774)" d="m0 0 2 1z" />
                        <path transform="translate(1885,2046)" d="m0 0" />
                        <path transform="translate(2044,1960)" d="m0 0" />
                        <path transform="translate(956,2)" d="m0 0" />
                        <path transform="translate(795,2)" d="m0 0" />
                        <path transform="translate(985)" d="m0 0" />
                        <path transform="translate(932)" d="m0 0" />
                        <path transform="translate(784)" d="m0 0" />
                    </svg>
                    <input value={term} onChange={handelFilInp} type="text" className='wmia ml10 p5 ' style={{ border: "none" }} placeholder='Search and connect with others...' />
                </div>
                <SerachByMicro onWordIsReady={e => handelWordsReay(e)} />
            </form>
        </>
    )
}

export default SearchInput
