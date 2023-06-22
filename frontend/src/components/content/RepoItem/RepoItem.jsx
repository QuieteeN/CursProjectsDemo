import React from "react";
import classes from './RepoItem.module.css'

const RepoItem = (props) => {

    return(
        <div className={classes.repo_container} key={props.id}>
            <div className={classes.repo_header}>
                <div className={classes.icon}><ion-icon name="albums-outline"></ion-icon></div>
                <h3 className={classes.repo_title}><a href={"https://github.com/" + props.output.full_name} className="repo_link">{props.output.full_name}</a></h3>
            </div>
            <div className={classes.repo_description}>
                <p className={classes.content}>
                    {props.output.description}
                </p>
            </div>
            <div className={classes.repo_footer}>
                {props.output.programmingLanguage ? (<span className={classes.code_lang}>
                    <span className={classes.circle} style={{ backgroundColor: props.output.programmingLanguage.color }}></span>
                    {props.output.programmingLanguage.name}
                </span>): (<span></span>)}
                <span className={classes.stargazers}>
                    <a href={"https://github.com/" + props.output.full_name + '/stargazers'} className={classes.link}>
                        <span className={classes.star}>
                            <ion-icon name="star-outline"></ion-icon>
                        </span>
                        {props.output.stargazers}
                    </a>
                </span>
                <span className={classes.forks}>
                    <a href={"https://github.com/" + props.output.full_name + '/forks'} className={classes.link}>
                        <span className={classes.git_network}>
                            <ion-icon name="git-network-outline"></ion-icon>
                        </span>
                        {props.output.forks}
                    </a>
                </span>
                <span className={classes.contributors}><a href={"https://github.com/" + props.output.full_name + '/graphs/contributors'} className={classes.link}>Contributors</a></span>
            </div>
        </div>
    )

}

export default RepoItem;