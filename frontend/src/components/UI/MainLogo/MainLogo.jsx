import React from "react";
import classes from './MainLogo.module.css'

const MainLogo = () => {

    return(
        <div className={classes.logo}>
            <a href="#" className={classes.logoLink}><ion-icon name="logo-github"></ion-icon></a>
        </div>
    )

}

export default MainLogo;