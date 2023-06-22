import React from "react";
import classes from './LeftContainer.module.css'

import profile_image from '../../../../images/avatar.png'
import SpanButton from "../../../UI/SpanButton/SpanButton";

const LeftContainer = ({user}) => {

    return(
        <div className={classes.container}>
            <div className={classes.avatar}>
                <img src={profile_image} alt=""  className={classes.profile_image}/>
            </div>
            <h3 className={classes.login}>{user && user.name}</h3>
            <SpanButton>Настройки</SpanButton>
        </div>
    )

}

export default LeftContainer;