import React, { useEffect, useState } from "react";

import Main from "../../page-sections/main/Main";
import ReposList from "../../content/ReposList/ReposList";
import axios from "axios";

const Home = () => {

    const [repos, setRepos] = useState([]);
    
    useEffect(() => {
        let data;
        axios.get('http://127.0.0.1:8000/repositories/')
        .then( res => {
            data = res.data;
            setRepos(data);
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    return(
        <Main>
            <ReposList repos={repos} />
        </Main>
    )

}

export default Home;