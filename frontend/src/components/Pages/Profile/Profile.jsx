import React, { Fragment, useEffect, useState } from "react";
import Main from "../../page-sections/main/Main";
import axios from "axios";
import RightContainer from "./RightContainer/RightContainer";
import classes from './Profile.module.css'
import LeftContainer from "./LeftContainer/LeftContainer";

const Profile = () => {

    const [user, setUser] = useState();

    useEffect(() => {
        let data;
        let user;
        const login = localStorage.getItem('login')
        axios.get('http://127.0.0.1:8000/users/')
        .then( res => {
            data = res.data;
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                console.log(e)
                if(e.name === login){
                    user = e;
                    break;
                }
            }
            setUser(user)
        })
        .catch(err => {
            console.log(err)
        })
    }, []);


    return(
        <Main>
            <div className={classes.content}>
                <LeftContainer user={user}/>
                <RightContainer user={user} />
            </div>
            {console.log(user)}
        </Main>
    )

}

export default Profile;