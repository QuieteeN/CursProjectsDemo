import React from "react";
import classes from './MenuItem.module.css'

const MenuItem = (props) => {

    let visible = false;

    let liClass = '';

    if (props.type === 'header-menu'){
        liClass += ' ' + classes.header_menu_item
    }

    if (props.name === 'Главная' || props.isAuth){
        visible = true;
    }

    return(
        <li className={liClass}>
            {visible ? (
                <a href={props.source} className={classes.nav_menu_link}>{props.name}</a>
            ): (
                <span className={classes.nav_menu_link} onClick={() => props.setStatus(true) } >{props.name}</span>
            )}    
        </li>
    )

}

export default MenuItem;