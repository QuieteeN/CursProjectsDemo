import React, { Fragment } from "react";
import classes from './ProfileContent.module.css'

const ProfileContent = ({type, children, info}) => {

    const components = [];

    if(type === 'password'){
        for (let i = 0; i < info; i++) {
            components.push(<Fragment key={i}>*</Fragment>);
            }
    }

    return(
        <Fragment>
            {type === 'password' ? (
                <>
                    <p className={classes.label}>{children}</p>
                    <p className={classes.info}>{components}</p>
                </>
            ):
            (
                <>
                    <p className={classes.label}>{children}</p>
                    <p className={classes.info}>{info}</p>
                </>
            )}
        </Fragment>
    )

}

export default ProfileContent;