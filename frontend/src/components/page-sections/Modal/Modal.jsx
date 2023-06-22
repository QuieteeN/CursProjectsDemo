import React from "react";
import classes from './Modal.module.css'

const Modal = ({active, setActive, children}) => {

    return(
        <section className={active ? classes.body + ' ' + classes.active : classes.body} onClick={() => setActive(false)}>
            <div className={classes.container}>
                {children}
            </div>
        </section>
    )

}

export default Modal;