import Layout from '../layouts/layout';
import Cookies from 'js-cookie';
import {  useSearchParams } from 'react-router-dom';
import Api from './axios'
export const Check_token = () => {
    const token = Cookies.get("Access_token");
    if (token == undefined) {
        const [params] = useSearchParams();
        let access_token = params.get('_access_token');
            
        if (access_token) {
            Api.get("/token_authenticate", {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }).then(res => {
                Cookies.set('Access_token', access_token)
                window.location.href = "/"
            }).catch(error => {                
                window.location.href = "http://localhost:5000/login"
            })
        } else {
            window.location.href = "http://localhost:5000/login"
        }

    } else {
        return <Layout />
    }
}

export const has_access = () => Cookies.get("Access_token") != undefined



