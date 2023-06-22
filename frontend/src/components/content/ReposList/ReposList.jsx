import React from "react";
import RepoItem from "../RepoItem/RepoItem";

const ReposList = (props) => {

    return(
        <section className="repos_list">
            {props.repos.map((output, id) => (
                <RepoItem output={output} key={id} />
            ))}
        </section>
    )

}

export default ReposList;