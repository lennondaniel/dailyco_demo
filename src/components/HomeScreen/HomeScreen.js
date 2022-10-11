import React from 'react';
import './HomeScreen.css';
import Speedometer from '../Speedometer/Speedometer';

export default function HomeScreen({ createCall, startHairCheck, bandWidth }) {
  const startDemo = () => {
    createCall().then((url) => {
      startHairCheck(url);
    });    
  };
  
  return (
    <div className="home-screen">
      <img src="/images/logo_3778.svg" alt="logo" />
      <Speedometer bandWidth={bandWidth}></Speedometer>
      {
        bandWidth < 5 && bandWidth !== 0 ? 
      <>
        <button onClick={startDemo} type="button">Entrar na sala</button>
        <p className="small">Selecione Permitir para usar sua câmera e microfone para esta chamada, se solicitado</p>
      </>
      : <p>Conexão ruim. Tente novamente.</p>
      }
      
   </div>
  );
}
