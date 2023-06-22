import React from "react";
import MainLogo from "../../UI/MainLogo/MainLogo";
import classes from './Footer.module.css'

const Footer = () => {

    return(
        <footer className={classes.footer}>
            <div className="wrapper">
                <div className={classes.content}>
                    <div className={classes.base_info}>
                        <MainLogo />
                        <span className="company_info"><a href="https://github.com/" className="company_link">© 2023 GitHub, Inc.</a></span>
                        <span className="develop_info"><a href="https://kpfu.ru/" className="develop_link">Kazan Federal University.</a></span>
                    </div>
                    <div className={classes.contact_info}>
                        <span className={classes.logo + ' ' + classes.fc}><ion-icon name="logo-facebook"></ion-icon></span>
                        <span className={classes.logo + ' ' + classes.vk}> <a href="https://vk.com/sh0xq" className="link"><ion-icon name="logo-vk"></ion-icon></a></span>
                        <span className={classes.logo + ' ' + classes.inst}><ion-icon name="logo-instagram"></ion-icon></span>
                        <span className={classes.logo + ' ' + classes.yt}><a href="https://www.youtube.com/channel/UCONoGbTB0cppgVkf9F-nJSQ" className="link"><ion-icon name="logo-youtube"></ion-icon></a></span>
                        <span className={classes.logo + ' ' + classes.twit}><ion-icon name="logo-twitter"></ion-icon></span>
                        <span className={classes.logo + ' ' + classes.twich}><ion-icon name="logo-twitch"></ion-icon></span>
                    </div>
                </div>
            </div>
        </footer>
    )

}

export default Footer;