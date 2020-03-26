import React, { useState } from 'react';
import './styles.css';
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from 'react-router-dom';
import {FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {title, description, value};


        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            history.push('/profile');

        } catch (error) {
            alert('Error during operation, please try again')
        }

    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />
                    <h1>Register new case</h1>
                    <p>Please describe the case in details in order to find a hero to solve that matter.</p>
                    <Link className=".back-link" to="/profile">
                        <FiArrowLeft size={16}  color="#e02041" />
                        Back to Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Case title" value={title} onChange={e=> setTitle(e.target.value)}/>
                    <textarea placeholder="Description" value={description} onChange={e=> setDescription(e.target.value)}/>
                    <input placeholder="Amount" value={value} onChange={e=> setValue(e.target.value)}/>
                    <button className="button" type="submit">Register</button>
                </form>

            </div>

        </div>
    );
}