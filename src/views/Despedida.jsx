import React from 'react';
import './Despedida.css';

const Despedida = () => {
  return (
    <div className="despedida-container">
      <img src="/default-pet.png" alt="Pet Planner" className="despedida-logo" />
      <div className="mensaje-curatorial">
        <p className="linea uno">Gracias por utilizar <strong>Pet Planner</strong>.</p>
        <p className="linea dos">Podés volver cuando quieras.</p>
        <p className="linea tres">Tus datos siguen guardados en tu dispositivo.</p>
      </div>
    </div>
  );
};

export default Despedida;
