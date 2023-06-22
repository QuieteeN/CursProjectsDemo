import React from "react";
import classes from './Header.module.css'
import MainLogo from "../../UI/MainLogo/MainLogo";
import MenuItemList from "../../UI/MenuItemList/MenuItemList";

const Header = (props) => {


    return(
        <header className={classes.header}>
            <div className="wrapper">
                <div className={classes.header_content} >

                    <div className={classes.left_section} >
                        <MainLogo />
                        <nav className={classes.header_menu}>
                            <MenuItemList isAuth={props.isAuth} setStatus={props.setActiveAuth}/>
                        </nav>

                    </div>

                    <div className={classes.right_section}>

                        <div className={classes.search}>
                            <input type="text" className={classes.search_input_box} placeholder="В разработке..." />
                            <button className={classes.search_options}><ion-icon name="options-outline"></ion-icon></button>
                            <button className={classes.search_button}><ion-icon name="search"></ion-icon></button>
                        </div>

                        <div className={classes.profile_pop_up_menu}>
                            <div className={classes.profile_image}>
                                {props.isAuth ? (
                                    <a href="/profile" className={classes.profile_link}><ion-icon name="person-circle-sharp"></ion-icon></a>
                                ):( 
                                    <span className={classes.profile_link} onClick={() => props.setActiveAuth(true)}><ion-icon name="person-circle-sharp"></ion-icon></span>
                                )}
                            </div>
                            <div className={classes.profile_menu_btn} onClick={(e) => {props.setActiveMenu(!props.activeMenu); e.stopPropagation()}}>
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </div>
                            <ul className={props.activeMenu ? classes.profile_menu + ' ' + classes.active : classes.profile_menu}>
                                <li className={classes.profile_menu_list}>
                                    {props.isAuth ? (
                                        <a href="/profile" className="profile_menu_link">Профиль</a>
                                    ):(
                                        <span className="profile_menu_link" onClick={() => props.setActiveAuth(true)}>Профиль</span>
                                    )}
                                </li>
                                <li className={classes.profile_menu_list}>
                                    {props.isAuth ? (
                                        <a href="/settings" className="profile_menu_link">Настройки</a>
                                    ):(
                                        <span className="profile_menu_link" onClick={() => props.setActiveAuth(true)}>Настройки</span>
                                    )}
                                </li>
                                <li className={classes.profile_menu_list}>
                                    {props.isAuth ? (
                                        <a href="./" className="profile_menu_link" onClick={() => props.logOut()}>Выйти</a>
                                    ):(
                                        <span className="profile_menu_link" onClick={() => props.setActiveAuth(true)}>Войти</span>
                                    )}
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header;