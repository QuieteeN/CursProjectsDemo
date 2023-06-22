import React from "react";
import classes from './FormButton.module.css'

const FormButton = ({name, ...props}) => {

    return(
        <button className={ props.type === 'submit' ? classes.btn + ' ' + classes.auth : classes.btn} {...props}>{name}</button>
    )

}

export default FormButton;