import React, { useEffect, useState } from "react";

import Main from "../../page-sections/main/Main";
import ReposList from "../../content/ReposList/ReposList";
import axios from "axios";

const Personal = () => {

    const [repos, setRepos] = useState([]);
    const [loveLangs, setLoveLangs] = useState([])
    
    useEffect(() => {
        let data;
        let user;
        const login = localStorage.getItem('login')
        axios.get('http://127.0.0.1:8000/users/')
        .then( res => {
            data = res.data;
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                console.log(e)
                if(e.name === login){
                    user = e;
                    break;
                }
            }
            setLoveLangs(user.loveProgrammingLanguages);
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    useEffect(() => {
        let data;
        let currentData = [];
        axios.get('http://127.0.0.1:8000/repositories/')
        .then( res => {
            data = res.data;
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                for (let j = 0; j < loveLangs.length; j++) {
                    const el = loveLangs[j];
                    if (e.programmingLanguage && e.programmingLanguage.name === el.name && !currentData.includes(e))
                        currentData.push(e)
                    console.log(e)
                }
            }
            setRepos(currentData);
        })
        .catch(err => {
            console.log(err)
        })
    }, [loveLangs])

    return(
        <Main>
            <ReposList repos={repos} />
        </Main>
    )

}

export default Personal;