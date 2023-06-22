import React, { Fragment } from "react";
import classes from './ProgContent.module.css';

const ProgContent = ({info, children}) => {


    return(
        <Fragment>
            <p className={classes.label}>{children}</p>
            <p className={classes.info}>
                {info ? (
                    <>
                        {info.map((output, id) => (
                            <span className={classes.code_lang} key={id}>
                                <span className={classes.circle} style={{ backgroundColor: output.color }}></span>
                                {output.name}
                            </span>
                        ))}
                    </>
                ):(
                    <>
                        
                    </>
                )}  
            </p>
        </Fragment>
    )

}

export default ProgContent;