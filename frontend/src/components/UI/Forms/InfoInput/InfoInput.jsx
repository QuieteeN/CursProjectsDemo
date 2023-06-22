import React, { useState } from "react";
import classes from './InfoInput.module.css'

const InfoInput = (props) => {

    const [hiddenPassword, setHiddenPassword] = useState(true)
    let isPass = false;

    if(props.name === 'password'){
        isPass = true
    }
    else {
        isPass = false
    }

    return(
        <div className={classes.container}>
            {isPass ? (
                    <span className={classes.content}>
                        {hiddenPassword ? (
                            <span className={classes.content}>
                                <input type="password" {...props} className={classes.input} />
                                <span className={classes.eye + ' ' + classes.open} onClick={() => setHiddenPassword(!hiddenPassword)}>
                                    <ion-icon name="eye-outline"></ion-icon>
                                </span>
                            </span>
                        ):(
                            <span className={classes.content}>
                                <input type="text" {...props} className={classes.input} />
                                <span className={classes.eye + ' ' + classes.close} onClick={() => setHiddenPassword(!hiddenPassword)}>
                                    <ion-icon name="eye-off-outline"></ion-icon>
                                </span>
                            </span> 
                        )}
                    </span>
            ) : (
                <span className={classes.content}>
                    <input type="text" {...props} className={classes.input}/>
                </span>
            )}
        </div>
    )

}

export default InfoInput;