export const toPacienteDTO = (paciente) => ({
  id_paciente: paciente.id_paciente,
  foto_path: paciente.foto_path || null,
  obra_social: {
    id_obra_social: paciente.id_obra_social,
    nombre: paciente.obra_social,
    descripcion: paciente.descripcion_obra_social,
    porcentaje_descuento: parseFloat(paciente.porcentaje_descuento),
    es_particular: paciente.es_particular === 1,
  },
  usuario: {
    id_usuario: paciente.id_usuario,
    apellido: paciente.apellido,
    nombres: paciente.nombres,
    email: paciente.email,
  },
});
