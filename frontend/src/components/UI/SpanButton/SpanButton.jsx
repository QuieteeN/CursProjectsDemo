import React from "react";
import classes from "./SpanButton.module.css"

const SpanButton = ({children, props}) => {

    return(
        <span className={classes.btn} {...props} >{children}</span>
    )

}

export default SpanButton;