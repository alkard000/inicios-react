import React, {useState, useEffect, Fragment} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //CITAS EN LOCALSTORAGE
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales){
    citasIniciales = [];
  }

  //ARREGLO DE LAS CITAS]
  const [citas, setCitas] = useState(citasIniciales);

  //USE EFFECT APRA REALIZAR OPERACIONES CUANDO EL STATE CAMBIA
  useEffect( () => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas])

  //FUNCION QUE TOME LAS CITAS ACUTALES Y AGREGUE LA NUEVA
  const crearCita = cita => {
    setCitas([
      ...citas,
      cita
    ])
  }

  //FUNCION QUE ELIMINAR UNA CITA POR SU ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    setCitas(nuevasCitas);
  }

  //MENSAJE CONDICIONAL
  const tituloCondicional = citas.length === 0 ? 'No hay citas' : 'Administra Tus citas';

  return (
    <Fragment>
      <h1>Administracion de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{tituloCondicional}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita = {cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
