export const toMedicoDTO = (medico) => ({
  id_medico: medico.id_medico,
  matricula: medico.matricula,
  descripcion: medico.descripcion || null,
  valor_consulta: parseFloat(medico.valor_consulta),
  foto_path: medico.foto_path || null,
  especialidad: {
    id_especialidad: medico.id_especialidad,
    nombre: medico.especialidad,
  },
  usuario: {
    id_usuario: medico.id_usuario,
    apellido: medico.apellido,
    nombres: medico.nombres,
    email: medico.email,
  },
});
