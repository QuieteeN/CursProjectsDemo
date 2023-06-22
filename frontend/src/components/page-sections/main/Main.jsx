import React from "react";
import classes from './Main.module.css'

const Main = (props) => {

    return(
        <main   className={classes.main}>
            <div className="wrapper">
                <div className={classes.main_content}>
                    {props.children}
                </div>
            </div>
        </main>
    )

}

export default Main;