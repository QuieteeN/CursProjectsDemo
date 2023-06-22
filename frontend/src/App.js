import './App.css';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './components/page-sections/header/Header';
import Footer from './components/page-sections/footer/Footer';
import Modal from './components/page-sections/Modal/Modal';
import AuthForm from './components/UI/Forms/AuthForm/AuthForm';
import RegForm from './components/UI/Forms/AuthForm/RegForm';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import Personal from './components/Pages/Personal/Personal';
import Settings from './components/Pages/Settings/Settings';

function App() {

    const [programmingLang, setProgrammingLang] = useState([])

    const isAuth = localStorage.getItem('isRegistered') === 'true';

    const [status, setStatus] = useState(false)
    const [statusReg, setStatusReg] = useState(false)
    const [activeMenu, setActiveMenu] = useState(false);
    
    useEffect(() => {

        axios.get('http://127.0.0.1:8000/programming-languages/')
        .then(res => {
            let data = res.data;
            setProgrammingLang(data);
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    const logOut = () => {
        localStorage.removeItem('isRegistered');
        localStorage.removeItem('login');
    }

    return(
        <div onClick={() => {setActiveMenu(false)}}>
            <Header setActiveAuth={setStatus} activeMenu={activeMenu} setActiveMenu={setActiveMenu} isAuth={isAuth} logOut={logOut}/>
            <Router>
                <Routes>
                    <Route path='' element={<Home/>}/>
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/personal' element={<Personal />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </Router>
            <Footer />
            <Modal active={status} setActive={setStatus} >
                <AuthForm setActive={setStatusReg} setNotActive={setStatus}/>
            </Modal>
            <Modal active={statusReg} setActive={setStatusReg}>
                <RegForm setActive={setStatus} setNotActive={setStatusReg} programmingLang={programmingLang}/>
            </Modal>
        </div>
    )

}

export default App;
