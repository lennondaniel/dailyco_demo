import React from 'react';
import './HomeScreen.css';
import Speedometer from '../Speedometer/Speedometer';
import NetworkCheck from '../NetworkCheck/NetworkCheck';

export default function HomeScreen({ createCall, startHairCheck, onCheckSpeed, bandWidth }) {
  const startDemo = () => {
    createCall().then((url) => {
      startHairCheck(url);
    });    
  };
  
  return (
    <div className="home-screen">
      <img src="/images/logo_3778.svg" alt="logo" />
      <NetworkCheck onCheckSpeed={onCheckSpeed}/>
      <Speedometer bandWidth={bandWidth}></Speedometer>
      {
        bandWidth < 5 && bandWidth !== 0 ? 
      <>
        <button onClick={startDemo} type="button">Entrar na sala</button>
        <p className="small">Selecione Permitir para usar sua câmera e microfone para esta chamada, se solicitado</p>
      </>
      : <p>Carregando ...</p>
      }
      
   </div>
  );
}
