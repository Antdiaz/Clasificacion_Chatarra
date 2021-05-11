import React from 'react';

function Warning({poppesaje,setpoppesaje,pesajeparcial,setpesajeparcial}) {

    const handlepoppesaje = () => {
    setpoppesaje(!poppesaje)
    }

    const handlecancel = () => {
      setpesajeparcial(0)
      setpoppesaje(!poppesaje)
      }
  return (
    <div className="Warning">
      <div className="warning-container">
        <span className="warning-close" style={{cursor:"pointer"}} onClick={handlepoppesaje}>X</span>
        <div>Pesaje parcial pendiente - ¿ Desea cancelar la Operación ?&nbsp; &nbsp; <span style={{cursor:"pointer"}} onClick={handlecancel}>SI</span>&nbsp; &nbsp; &nbsp;<span style={{cursor:"pointer"}} onClick={handlepoppesaje}>NO</span></div>
      </div>
    </div>
  );
}

export default Warning;
