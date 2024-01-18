import React, { useState } from "react";
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    if (!localStorage.getItem('tableUsers')) {
        localStorage.setItem('tableUsers', JSON.stringify([]));
    }

    const tableUsers = JSON.parse(localStorage.getItem('tableUsers'));

    const connect = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log(formData.get('fullName'));
        // Vous pouvez accéder aux valeurs comme ceci :
        const fullName = formData.get('fullName');
        console.log(fullName);
        const password = formData.get('password');
        const email = formData.get('email');
        // Vérifier si l'utilisateur existe dans le localStorage
        const userExists = tableUsers.some(user => user.nom === fullName && user.motDePass === password);
        // ============ commentaire gestion des erreurs ==================
        if (fullName === '' || password === '' || email === '') {
            toast.error('Veuillez renseigner tous les champs.', { theme: "colored" });
        } else if (userExists) {
            toast.info('L\'utilisateur existe déjà.', { theme: "colored" });
        } else {
            // Ajouter l'utilisateur s'il n'existe pas
            const user = { nom: fullName, motDePass: password, mail: email };
            tableUsers.push(user);
            toast.success('Utilisateur ajouté avec succès', { theme: "colored" });
            localStorage.setItem('tableUsers', JSON.stringify(tableUsers));
            console.log(tableUsers);
        }
        const reset = () => {
            setFullName('');
            setPassword('');
            setEmail('');
        }
        reset();
        // Vous pouvez maintenant utiliser ces valeurs comme bon vous semble, par exemple, les comparer avec votre tableau d'utilisateurs.
    }
    // =================================================================
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handlMailChange = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className="container">
            <ToastContainer position="top-center"></ToastContainer>
            <div className="divimg" style={{ margin: 'auto' }}>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <form onSubmit={connect} >

                    <label for="fullName" class="form-label">Nom:</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nom" name="fullName" value={fullName} onChange={handleFullNameChange} />
                    <label for="fullName" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Mail" name="email" value={email} onChange={handlMailChange} />
                    <label for="fullName" class="form-label">Password:</label>
                    <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Mot de passe" name="password" value={password} onChange={handlePasswordChange} />
                    <input type="submit" class="form-control" id="exampleFormControlInput1" value={'Enregistrer'} className="mt-3 w-100 btnC btn text-white fw-bold fs-5"/>


            </form>
        </div>
    );
}

export default Login;
