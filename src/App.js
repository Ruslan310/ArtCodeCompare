import React, {useEffect, useState} from 'react';
import ArtCodePartner from "./components/ArtCodePartner";
import CheckArt from "./components/CheckArt";
import ProductsforCheck from "./components/ProductsforCheck";
import './style/art.css'
import './style/table.css'
import './style/reset.css'
import {useDispatch} from "react-redux";
import {fetchName} from "./redux/action";
import Loader from "./components/Loader";


const App = () => {

    const [isAuth, setAuth] = useState(false)
    const authCheck = async () => {
        let userToken = localStorage.getItem('currentUserToken');
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken,
            }
        }
        if (userToken) {
            let result = await fetch(`${process.env.REACT_APP_USER_API}/checkRight/${process.env.REACT_APP_ID}`, options)
                .then( res => {
                    if (res.status !== 200) return false
                    return res.json()
                } )
            if (!result) {
                localStorage.clear()
                window.location.href = 'https://tmc.lll.org.ua/'
                return null
            }
            setAuth(true)
        } else {
            localStorage.clear()
            window.location.href = 'https://tmc.lll.org.ua/'
        }
    }

    const dispatch = useDispatch()
    useEffect(() => {
        authCheck()
            .then(null)
        dispatch(fetchName())
    }, [])// eslint-disable-line

    if (isAuth) {
        return (
            <div>
                <div className='wrapper_block'>
                    <CheckArt/>
                    <ArtCodePartner/>
                </div>
                <ProductsforCheck/>
            </div>
        );
    } else {
        return (
            <div>
                <Loader />
            </div>
        )
    }
};

export default App;