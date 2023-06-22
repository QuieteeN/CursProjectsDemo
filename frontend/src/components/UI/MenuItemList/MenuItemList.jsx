import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import classes from "./MenuItemList.module.css"
import menuData from '../../../data/header-menu.json'

const MenuItemList = (props) => {

    let ulClasses = classes.menu;

    if (menuData.type === 'header-menu') {
        ulClasses += ' ' + classes.header_menu;
    }

    return(
        <ul className={ulClasses}>
            {Object.keys(menuData.names).map((key) => (
                <MenuItem type={menuData.type} name={key} key={key} source={menuData.names[key]} isAuth={props.isAuth} setStatus={props.setStatus}/>
            ))}
        </ul>
    )

}

export default MenuItemList;