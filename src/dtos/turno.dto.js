export const toTurnoDTO = (turno) => ({
  id_turno_reserva: turno.id_turno_reserva,
  fecha_hora: turno.fecha_hora,
  valor_total: parseFloat(turno.valor_total),
  atendido: turno.atendido === 1,
  medico: {
    id_medico: turno.id_medico,
    apellido: turno.medico_apellido,
    nombres: turno.medico_nombres,
    especialidad: turno.especialidad,
  },
  paciente: {
    id_paciente: turno.id_paciente,
    apellido: turno.paciente_apellido,
    nombres: turno.paciente_nombres,
  },
  obra_social: turno.obra_social,
});
