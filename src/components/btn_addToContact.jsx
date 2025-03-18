import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import L_loader from './L_loader';
import api from '../config/axios';
import { Ten } from '.././slices/ten_slice'
import { AddToContactLocal, AddTocontcatThunk, deleteFromContactLocal, identificat_user } from '../slices/userSlice';
import { getSocket } from '../config/socket';
import { add_message } from '../slices/chatSlice';

function Btn_addToContact({ contactId, className }) {
    const [isAddingToContactWork, setAddingToCOntact] = useState(false);
    const { contacts, requestsContact, _id } = useSelector(s => s.User);
    const socket = getSocket();
    const dispatch = useDispatch();
    const HandelSendAddTocontcat = async (e) => {
        e.preventDefault();
        setAddingToCOntact(true);
        await dispatch(AddTocontcatThunk(contactId))
        setAddingToCOntact(false);
    }

    const HandelSendAddTocontcatRequest = async (e) => {
        e.preventDefault();
        setAddingToCOntact(true);
        api.post('/user/SayHello', { contactId }).then(async res => {
            await dispatch(AddToContactLocal(contactId));
            const createAt = new Date().toISOString();

            let messageFormat = {
                senderId: _id,
                recieverId: contactId,
                type: "text",
                savedInDb: false,
                message: "Hi 👋",
                _id: `${createAt}${_id}`,
                createAt,
            };

            setAddingToCOntact(false);

            const newUserReq = await identificat_user(contactId);
            const payl = { ...messageFormat, me: _id, newRequest: true, newUser: { ...newUserReq.data } };
            dispatch(add_message(payl));
            socket.emit("new-massage", { ...messageFormat });
            dispatch(Ten([, "Request sent successfully!"]));
        }).catch((error) => {
            setAddingToCOntact(false)
            dispatch(Ten([false, "Failed to send request!"]))
        })
    }
    return (
        <>
            {
                requestsContact.includes(contactId) ?
                    <button onClick={HandelSendAddTocontcat} className={`curP border   ${className}`} >
                        {
                            isAddingToContactWork ?
                                <L_loader />
                                :
                                <>
                                    <p>Ratify</p>
                                    <svg className='ml10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                                </>
                        }
                    </button > :
                    <>
                        {
                            !contacts.includes(contactId) &&
                            <button onClick={HandelSendAddTocontcatRequest} className={`curP border   ${className}`} >
                                {
                                    isAddingToContactWork ?
                                        <L_loader />
                                        :
                                        <>
                                            <svg version="1.1" viewBox="0 0 2048 2048" className='mr10' xmlns="http://www.w3.org/2000/svg">
                                                <path transform="translate(898)" d="m0 0h84v3l10 3 19 7 21 10 18 12 14 12 9 9 11 14 10 14 8 14 8 19 5 17 3 22 1 18 1 574 2 33 6-12 5-18 8-36 11-39 9-32 7-23 9-31 16-56 15-52 8-28 9-32 7-24 9-31 10-36 15-53 7-22 9-25 7-16 10-17 12-16 9-11h2v-2h2v-2h2v-2h2v-2l17-13 11-7 17-9 25-9 25-5 8-1h29l22 3 19 5 15 6 16 8 18 12 11 9 17 17 13 17 9 15 8 16 6 15 6 24 2 16v25l-4 25-7 31-12 44-8 30-10 36-7 27-13 49-12 44-9 34-8 30-17 63-13 49-17 63-9 34-24 90-10 37-12 45-10 38-8 33-3 21-1 28v128l3 13 4 6 10 7 5 2 11 2 6-1 6-3 13-11 9-10 18-22 11-12 7-9 9-10 8-10 11-13 7-8 13-16 12-14 8-10 9-10 9-11 8-9 7-8 4-6h2l2-4 9-10 1-2h2l2-4 18-18 8-7 10-8 16-12 21-14 22-12 29-14 35-12 28-7 23-4 26-3 14-1h20l22 2 20 4 19 7 17 10 9 7 10 9 9 9 12 16 12 21 10 23 2 5h2v75l-1 2-3-1 2-2 1-4h-2l-2 6-13 26-14 19-12 14-11 13-16 17-12 13-7 8-8 8-7 8-18 18-1 2h-2v2h-2l-2 4-16 16-7 8-9 9-7 8-12 12-7 8-21 21-1 2h-2l-2 4-13 13-7 8-9 9-7 8-12 12-7 8-14 14-1 2h-2v2h-2l-2 4-13 13-7 8-9 9-7 8-12 12-7 8-31 33-12 13-10 10-7 8-14 14-1 2h-2v2h-2v2h-2v2h-2l-2 4-16 16-7 8-11 12-7 8-7 6-7 8-18 18-1 2h-2v2h-2v2h-2l-2 4-14 14-7 8-8 9h-2l-2 4-9 9-5 6h-2l-2 4-16 16-1 2h-2l-2 4-16 16-7 8-12 12-7 8-27 27-8 7-13 12-22 18-13 10-15 11-19 12-15 9-21 12-23 12-16 8-36 15-36 12-37 11-38 9-27 5v2h-2v2h-259l2-2-33-7-40-10-29-8-38-13-26-11-29-14-20-11-17-10-12-8-17-12-16-12-16-13-14-12-14-14-8-10-6-12v-8l4-9 9-11 8-6 4-2h11l14 7 14 11 11 9 16 13 19 14 30 20 15 9 24 13 27 13 28 11 28 9 32 8 34 6 38 4 35 2 43 1h32l40-1 47-3 33-4 31-5 26-6 33-10 32-12 29-13 30-15 18-11 21-13 17-12 16-12 13-11 11-9 16-15 8-8 8-7 16-17 14-14 1-2h2l2-4 14-14 7-8 8-8 7-8 11-11 7-8 19-19 7-8 13-13 6-7 5-5 4-5h2l2-4 4-2 2-4 9-9 7-8 17-17 7-8 11-11 7-8 9-9 1-2h2v-2h2v-2h2v-2h2l2-4 11-11 7-8 13-13 1-2h2l2-4 18-18 7-8 8-8 1-2h2l2-4 9-9 7-8 7-7 1-2h2v-2h2l2-4 13-13 7-8 9-9 7-8 11-11 7-8 20-20 7-8 12-12 7-8 9-9 7-8 11-11 7-8 20-20 7-8 13-13 6-7h2l2-4 9-9 5-6h2l2-4 6-7 15-15 5-6h2l2-4 9-9 9-11 8-9 11-16 8-19 2-9v-18l-4-17-8-16-7-11-5-5v-2l-4-2-10-7-13-6-10-3-18-2h-24l-27 3-27 6-25 7-15 6-24 11-23 13-17 12-11 9-10 9-8 7-4 2v2l-13 13-9 11-10 11-9 11-9 10-1 2h-2l-2 4-11 13-13 15-9 11-16 20-11 13-14 17-12 13-7 8-11 13-10 11-7 8-10 10-8 7-11 7-22 7-11 2h-17l-18-4-13-4-15-8-9-7-10-9-8-10-8-16-4-10-3-14-1-8-1-22v-76l1-63 1-17 5-27 11-41 9-36 6-21 10-39 6-21 10-39 7-25 9-34 13-49 8-28 11-43 8-29 8-30 10-38 12-44 17-64 12-44 13-49 7-25 13-50 5-27 2-25-3-17-5-16-9-17-10-13-13-13-13-9-16-8-13-4-11-2-11-1h-13l-18 2-16 4-16 8-11 8-13 13-1 2h-2l-2 4-9 14-6 12-8 21-9 30-12 43-7 24-10 34-22 78-13 44-10 36-10 35-11 36-9 34-9 31-34 119-10 34-12 42-15 53-10 34-12 39-7 20-6 10-5 3-4 1h-18l-12-3-9-6-4-8-1-4-1-23-1-47-1-800-2-14-5-15-9-17-10-13-11-11-16-11-14-7-19-6-11-2-21-1-17 2-13 4-19 9-14 11-8 7-13 17-6 10-8 20-3 16-1 8-1 28-1 804-1 12-3 5-14 7-13 4-4 1h-7l-10-6-6-7-7-19-12-41-19-70-10-38-15-56-16-61-12-44-11-40-9-35-15-55-10-37-19-71-14-52-20-77-10-30-8-16-7-11-9-11-10-9-11-7-15-8-16-5-12-2h-32l-16 3-18 8-14 9-12 11-12 13-12 22-5 15-3 17-1 12 2 21 5 24 10 37 13 48 18 67 20 75 9 33 16 60 23 86 19 70 12 44 17 65 13 48 9 34 8 28 3 15v13l-4 8-7 6-14 7-7 2h-8l-8-4-5-5-8-10-11-18-8-13-14-24-15-26-28-48-12-21-15-26-14-25-14-24-14-25-14-24-15-26-14-24-15-26-16-28-13-23-13-22-16-24-9-11-6-7-13-9-12-6-13-4-7-1h-30l-19 4-14 6-14 10-5 5h-2l-2 4-8 9-9 17-5 15-3 15v16l4 16 6 16 12 25 15 27 10 17 9 15 15 26 16 28 8 13 6 11 14 24 10 17 15 27 10 17 14 24 15 26 8 14 13 24 10 19 9 17 15 33 12 29 16 45 14 50 7 29 7 37 5 33 4 39 3 47 2 43 4 43 6 39 5 25 5 24v9l-5 9-5 4-13 5-9 2h-13l-8-6-4-5-6-14-5-15-7-31-5-32-3-33-6-92-4-43-4-32-7-36-7-31-12-43-8-24-13-34-14-32-14-29-12-23-13-23-10-18-14-24-15-26-14-24-16-28-15-26-14-24-16-28-15-26-13-22-16-28-12-23-8-16-12-25-2-2v-78l2-1 11-23 12-22 14-19 8-8 7-8 17-13 17-10 23-9 22-5 17-2h17l26 3 21 6 18 8 11 6 14 10 10 9 13 13 14 19 10 15 9 15 15 26 24 42 11 19 13 23 14 25 9 16 11 18 10 17 8 11-1-8-12-40-7-28-9-31-14-53-18-65-11-43-15-56-17-64-10-38-11-39-7-36-1-8v-31l4-20 10-30 8-16 9-15 8-11 9-11 7-7 8-7 13-10 19-11 15-7 19-6 25-5 10-1h25l18 2 22 5 19 7 21 11 12 8 11 9 19 19 10 14 8 13 8 17 6 15 10 30 9 35 35 133 8 29 8 31 9 32 12 44 13 52 15 58 6 18 3 6 1-568 2-28 4-20 6-16 7-16 8-14 13-18 14-15 13-12 17-12 15-9 20-9 10-4zm-469 854m371 1192v1h5v-1z" />
                                                <path transform="translate(1274,1312)" d="m0 0h15l8 4 5 5 4 5 4 9 1 4v14l-4 8-5 5-9 6-9 3-31 6-46 12-40 15-29 14-19 10-17 11-17 12-11 8-14 11-11 10-8 7-12 11-8 8-7 8-11 12-9 11-13 17-10 15-12 19-13 24-12 25-13 33-8 24-6 27-7 44-4 32-3 28-4 10-6 7-8 4-4 1h-14l-10-4-9-8-5-10-1-5v-43l3-31 5-31 11-43 9-27 13-33 17-35 10-18 10-16 12-18 20-28 9-11 12-14 11-12 28-28 11-9 13-11 13-10 18-13 21-13 21-12 23-12 22-10 23-9 25-8 37-10 21-4z" />
                                                <path transform="translate(405,1722)" d="m0 0h7l10 4 10 9 6 7 6 10 4 12v9l-5 10-6 7-13 10-7 3-8-3-12-9-9-10-8-13-5-11-2-9 5-8 12-12 11-5z" />
                                                <path transform="translate(988)" d="m0 0h9l-1 2-7 2z" />
                                                <path transform="translate(760,2045)" d="m0 0 8 2v1h-9z" />
                                                <path transform="translate(2046,1184)" d="m0 0h2v5l-3-1z" />
                                                <path transform="translate(999)" d="m0 0 4 1z" />
                                                <path transform="translate(1079,2047)" d="m0 0 3 1z" />
                                                <path transform="translate(2044,1182)" d="m0 0" />
                                                <path transform="translate(1076,2047)" d="m0 0 2 1z" />
                                                <path transform="translate(1061,2047)" d="m0 0 2 1z" />
                                                <path transform="translate(790,2045)" d="m0 0" />
                                                <path transform="translate(2047,1088)" d="m0 0" />
                                            </svg>
                                            <p>Say Hello!</p>
                                        </>
                                }
                            </button >
                        }

                    </>
            }

        </>
    )
}

export default Btn_addToContact
