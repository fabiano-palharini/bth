import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from "../../assets/logo.svg"
import {FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');
    const history = useHistory();
    

    async function handleRegister(e){
        e.preventDefault();

        const data = {name, email, whatsapp, city, uf}; 
        
        try {
            const response = await api.post('ongs', data);

            alert(`Your access Id is:  ${response.data.id}`)

            history.push('/');
            
        } catch (error) {
            alert('Error during the operation, please try again.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />
                    <h1>Register</h1>
                    <p>Please register yourself, join the platform and help people to find the cases related to your ONG.</p>
                    <Link className=".back-link" to="/">
                        <FiArrowLeft size={16}  color="#e02041" />
                        Login
                    </Link>
                </section>

                <form onSubmit={handleRegister} >
                    <input placeholder="ONG name" value={name} onChange={ e=> setName(e.target.value) } />
                    <input type="email" placeholder="Email" value={email} onChange={ e=> setEmail(e.target.value) } />
                    <input placeholder="WhatsApp"  value={whatsapp} onChange={ e=> setWhatsapp(e.target.value) } />
                    <div className="input-group">
                        <input placeholder="City"  value={city} onChange={ e=> setCity(e.target.value) } />
                        <input placeholder="UF"  value={uf} onChange={ e=> setUF(e.target.value) } style={ { width: 80} }/>
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>

            </div>

        </div>
    );
}

