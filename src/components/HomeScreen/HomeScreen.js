import React from 'react';
import './HomeScreen.css';

export default function HomeScreen({ createCall, startHairCheck }) {
  const startDemo = () => {
    createCall().then((url) => {
      startHairCheck(url);
    });
  };

  return (
    <div className="home-screen">
      <img src="/images/logo_3778.svg" alt="logo" />
      <p>Clique no botão abaixo para entrar na chamada</p>
      <button onClick={startDemo} type="button">Entrar na sala</button>
      <p className="small">Selecione Permitir para usar sua câmera e microfone para esta chamada, se solicitado</p>
    </div>
  );
}
