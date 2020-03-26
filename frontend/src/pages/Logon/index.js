import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import './styles.css';
import heroesImg from '../../assets/heroes.png'
import logoImg from "../../assets/logo.svg"
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Error when logging in, please try again');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">                
                <img src={logoImg} alt="Be the Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Inform your logon</h1>

                    <input placeholder="Your ID" value={id} onChange={e => setId(e.target.value)} />
                    <button type="submit" className="button">Entrar</button>

                    <Link className=".back-link" to="/register">
                        <FiLogIn size={16}  color="#e02041" />
                        I don't have an account
                    </Link>
                </form>
            
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>

        
    );
}