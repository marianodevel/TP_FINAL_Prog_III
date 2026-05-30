import { describe, it, expect } from "@jest/globals";
import { toTurnoDTO } from "../../../src/dtos/turno.dto.js";

describe("toTurnoDTO", () => {
  const turnoRaw = {
    id_turno_reserva: 1,
    fecha_hora: "2026-06-10T14:00:00",
    valor_total: "4500.00",
    atentido: 0,
    id_medico: 1,
    medico_apellido: "Lopez",
    medico_nombres: "Marcelo",
    especialidad: "PEDIATRÍA",
    id_paciente: 1,
    paciente_apellido: "Garcia",
    paciente_nombres: "Laura",
    obra_social: "Jerárquicos",
  };

  it("corrige el typo atentido → atendido", () => {
    const dto = toTurnoDTO(turnoRaw);
    expect(dto).not.toHaveProperty("atentido");
    expect(dto).toHaveProperty("atendido");
  });

  it("convierte atentido = 0 a atendido = false", () => {
    const dto = toTurnoDTO({ ...turnoRaw, atentido: 0 });
    expect(dto.atendido).toBe(false);
  });

  it("convierte atentido = 1 a atendido = true", () => {
    const dto = toTurnoDTO({ ...turnoRaw, atentido: 1 });
    expect(dto.atendido).toBe(true);
  });

  it("convierte valor_total string a float", () => {
    const dto = toTurnoDTO(turnoRaw);
    expect(typeof dto.valor_total).toBe("number");
    expect(dto.valor_total).toBe(4500.0);
  });

  it("agrupa médico en subobjeto", () => {
    const dto = toTurnoDTO(turnoRaw);
    expect(dto.medico).toEqual({
      id_medico: 1,
      apellido: "Lopez",
      nombres: "Marcelo",
      especialidad: "PEDIATRÍA",
    });
  });

  it("agrupa paciente en subobjeto", () => {
    const dto = toTurnoDTO(turnoRaw);
    expect(dto.paciente).toEqual({
      id_paciente: 1,
      apellido: "Garcia",
      nombres: "Laura",
    });
  });

  it("no expone campos internos de la BD", () => {
    const dto = toTurnoDTO(turnoRaw);
    expect(dto).not.toHaveProperty("medico_apellido");
    expect(dto).not.toHaveProperty("medico_nombres");
    expect(dto).not.toHaveProperty("paciente_apellido");
    expect(dto).not.toHaveProperty("paciente_nombres");
  });
});
