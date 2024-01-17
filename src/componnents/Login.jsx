import React, { useState } from "react";
import logo from '../logo.svg';
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
            toast.error('Veuillez renseigner tous les champs.', {theme: "colored"});
        } else if (userExists) {
            toast.info('L\'utilisateur existe déjà.', {theme: "colored"});
        } else {
            // Ajouter l'utilisateur s'il n'existe pas
            const user = { nom: fullName, motDePass: password,mail: email };
            tableUsers.push(user);
            toast.success('Utilisateur ajouté avec succès', {theme: "colored"});
            localStorage.setItem('tableUsers', JSON.stringify(tableUsers));
            console.log(tableUsers);
        }
        const reset = ()=>{
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
    const handlMailChange = (e)=>{
        setEmail(e.target.value)
    }

    return (
        <div>
            <ToastContainer position="top-center"></ToastContainer>
            <div className="divimg" style={{margin: 'auto'}}>
            <img src={logo} className="App-logo" alt="logo" />
            </div>
            <form onSubmit={connect}>
                <label>Nom:</label>
                <input type="text" placeholder="Nom" name="fullName" value={fullName} onChange={handleFullNameChange} />
                <label>Password:</label>
                <input type="password" placeholder="Mot de passe" name="password" value={password} onChange={handlePasswordChange} />
                <label>Email</label>
                <input type="email" placeholder="Mail" name="email" value={email} onChange={handlMailChange} />
                <input className="btnC" type="submit" value={'enregistrer'} />
            </form>
        </div>
    );
}

export default Login;
