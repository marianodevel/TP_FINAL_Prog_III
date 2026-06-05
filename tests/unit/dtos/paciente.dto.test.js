import { describe, it, expect } from "@jest/globals";
import { toPacienteDTO } from "../../../src/dtos/paciente.dto.js";

describe("toPacienteDTO", () => {
  const pacienteRaw = {
    id_paciente: 1,
    foto_path: null,
    id_obra_social: 1,
    obra_social: "Jerárquicos",
    descripcion_obra_social: "Obra social jerárquicos",
    porcentaje_descuento: "10.00",
    es_particular: 0,
    id_usuario: 5,
    apellido: "Lopez",
    nombres: "Jacinto",
    email: "lopjac@correo.com",
  };

  it("convierte es_particular = 0 a false", () => {
    const dto = toPacienteDTO(pacienteRaw);
    expect(dto.obra_social.es_particular).toBe(false);
  });

  it("convierte es_particular = 1 a true", () => {
    const dto = toPacienteDTO({ ...pacienteRaw, es_particular: 1 });
    expect(dto.obra_social.es_particular).toBe(true);
  });

  it("convierte porcentaje_descuento string a float", () => {
    const dto = toPacienteDTO(pacienteRaw);
    expect(typeof dto.obra_social.porcentaje_descuento).toBe("number");
    expect(dto.obra_social.porcentaje_descuento).toBe(10.0);
  });

  it("agrupa obra social en subobjeto", () => {
    const dto = toPacienteDTO(pacienteRaw);
    expect(dto.obra_social).toHaveProperty("id_obra_social");
    expect(dto.obra_social).toHaveProperty("nombre");
    expect(dto.obra_social).toHaveProperty("descripcion");
  });

  it("agrupa usuario en subobjeto", () => {
    const dto = toPacienteDTO(pacienteRaw);
    expect(dto.usuario).toEqual({
      id_usuario: 5,
      apellido: "Lopez",
      nombres: "Jacinto",
      email: "lopjac@correo.com",
    });
  });

  it("no expone campos planos del JOIN", () => {
    const dto = toPacienteDTO(pacienteRaw);
    expect(dto).not.toHaveProperty("apellido");
    expect(dto).not.toHaveProperty("nombres");
    expect(dto).not.toHaveProperty("email");
    expect(dto).not.toHaveProperty("id_obra_social");
  });
});
