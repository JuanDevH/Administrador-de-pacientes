import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

	// Crear state para citas
	const [ cita, actualizarCita ] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: ''
	});

	const [ error, actualizarError ] = useState(false);

	// Funcion que se ejecuta cada que el usuario escribe en el input
	const actualizarState = e => {
		actualizarCita({
			...cita,
			[e.target.name] : e.target.value
		})
	}

	// Extraer los valores 
	const { mascota, propietario, fecha, hora, sintomas } = cita;

	// Cuando el usuario presiona agregar cita
	const submitCita = e => {
		e.preventDefault();

		// Validar form
		if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
			actualizarError(true);
			return;
		}

		// (Unva vez se pase la validacion) Eliminar el mensaje de error de "Todos los campos son obligatorios"
		actualizarError(false);

		// Asignar un ID
		cita.id = uuid();

		// Crear la cita
		crearCita(cita);

		// Reiniciar el form
		actualizarCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: ''
		})
	}

	return ( 
		<Fragment>
			<h2>Crear Cita</h2>

			{ error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

			<form
				onSubmit={submitCita}
			>
				<label htmlFor="mascota">Nombre mascota</label>
				<input 
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre de la mascota"
					onChange={actualizarState}
					value={mascota}
				/>

				<label htmlFor="propietario">Nombre del dueño</label>
				<input 
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre del dueño de la mascota"
					onChange={actualizarState}
					value={propietario}
				/>

				<label htmlFor="fecha">Fecha en la que se da de alta</label>
				<input 
					type="date"
					name="fecha"
					className="u-full-width"
					onChange={actualizarState}
					value={fecha}
				/>

				<label htmlFor="hora">Hora en la que se da de alta</label>
				<input 
					type="time"
					name="hora"
					className="u-full-width"
					onChange={actualizarState}
					value={hora}
				/>

				<label htmlFor="sintomas">Sintomas de la mascota</label>
				<textarea
					className="u-full-width"
					name="sintomas"
					onChange={actualizarState}
					value={sintomas}
				></textarea>

				<button
					type="submit"
					className="u-full-width button-primary"
				>Agregar cita</button>
			</form>
		</Fragment>
	
	);
}

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired
}

export default Formulario;