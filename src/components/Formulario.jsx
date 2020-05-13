import React, {useState, Fragment} from 'react';

import uuid from 'uuid/dist/v4';

import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //CREAR STATE DE CITAS
    const [cita, setCita] = useState({
        mascota : '',
        propietario : '',
        fecha : '',
        hora : '',
        sintomas : ''
    });

    const [error, setError] = useState(false)

    //FUNCION QUE SE EJECUTA CADA VEZ QUE CAMBIA EL INPUT
    const handleChange = e => {

        setCita({
            ...cita,
            [e.target.name] : e.target.value
        })

    }

    //EXTRAER LOS VALORES
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //CUANDO EL USUARIO HAGA CLICK, AGREGAR CITA
    const handleSubmit = e => {
        e.preventDefault();
        
        console.log(mascota);
        //VALIDAR
        if( mascota.trim() === '' || 
            propietario.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim() === ''){

            setError(true);
            
            return;
        }

        //ELIMINAR EL MENSAJE PREVIO
        setError(false);

        //ASIGNAR ID
        cita.id = uuid();
        console.log(cita);

        //CREAR LA CITA
        crearCita(cita);

        //REINICIAR EL FORM
        setCita({
            mascota : '',
            propietario : '',
            fecha : '',
            hora : '',
            sintomas : ''
        })
    }

    return (  
        <Fragment>

            { error ? <p className="alerta-error">Todos los campos son obligaotrios</p> : null}

            <h2>Crear cita</h2>
            <form
                onSubmit={handleSubmit}
            >
                <label>Nombre Mascota</label>
                <input 
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre del dueño de la mascota'
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={handleChange}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea 
                    name="sintomas" 
                    className='u-full-width'
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>
                <button
                    type='submit'
                    className='u-full-width button-primary'
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}
 
export default Formulario;