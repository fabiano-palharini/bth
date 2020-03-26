import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi'
import './styles.css';
import logoImg from "../../assets/logo.svg"
import api from '../../services/api';

export default function Profile() {
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    //the values on [] are values monitored. if we had 'ongName' in there, every time that variable changes then the function would be run
    //if [] is empty, the function will run only once
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Error during the operation, please try again')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Welcome {ongName}</span>

                <Link className="button" to="/incidents/new">Register a new case</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>
        
            <h1>Cases</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Case: </strong>
                        <p>{incident.title}</p>

                        <strong>Description: </strong>
                        <p>{incident.description}</p>

                        <strong>Value:</strong>
                        <p>{Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id) }>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
            
        </div>
    )
}