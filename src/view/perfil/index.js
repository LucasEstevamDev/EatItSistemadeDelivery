import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './perfil.css';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PerfilCard from '../../components/perfil-card';

/* IMPORTAÇÃO FIREBASE */
import firebase from '../../config/firebase';

function Perfil({ props }) {
    const [pratos, setPratos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [carregando, setCarregando] = useState(1);
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    let listapratos = [];

    useEffect(() => {
        firebase.firestore().collection('cliente').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
            setCarregando(0);
            await resultado.docs.forEach(doc => {
                if (doc.data().nome.indexOf(pesquisa) >= 0) {
                    listapratos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
            setPratos(listapratos);
        });
    })

    return (
        <>
            <Navbar />
            <div className="row p-3">
                {pratos.map(item => <PerfilCard id={item.id} cep={item.cep} complemento={item.complemento} cpf={item.cpf} endereco={item.endereco} nome={item.nome} numero={item.numero} telefone={item.telefone} />)}
            </div>
            <Footer />
        </>
    )
}

export default Perfil;