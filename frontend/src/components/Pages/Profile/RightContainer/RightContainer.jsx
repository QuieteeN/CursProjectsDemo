import React from "react";
import classes from './RightContainer.module.css'
import ProfileContent from "../ProfileContent/ProfileContent";
import ProgContent from "../ProgContent/ProgContent";

const RightContainer = ({user}) => {

    return(
        <div className={classes.container}>
            <ProfileContent type="login" info={user && user.name}>Логин</ProfileContent>
            <ProfileContent type="email" info={user && user.mail}>Почта</ProfileContent>
            <ProfileContent type="password" info={user && user.password.length}>Пароль</ProfileContent>
            <ProgContent info={(user && user.loveProgrammingLanguages)}>Языки программирования</ProgContent>
        </div>
    )

}

export default RightContainer;