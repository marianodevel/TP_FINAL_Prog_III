import { describe, it, expect } from "@jest/globals";
import { toMedicoDTO } from "../../../src/dtos/medico.dto.js";

describe("toMedicoDTO", () => {
  const medicoRaw = {
    id_medico: 1,
    matricula: 1000,
    descripcion: "Médico pediatra",
    valor_consulta: "5000.00",
    foto_path: null,
    id_especialidad: 1,
    especialidad: "PEDIATRÍA",
    id_usuario: 1,
    apellido: "Lopez",
    nombres: "Marcelo",
    email: "lopmar@correo.com",
  };

  it("convierte valor_consulta string a float", () => {
    const dto = toMedicoDTO(medicoRaw);
    expect(typeof dto.valor_consulta).toBe("number");
    expect(dto.valor_consulta).toBe(5000.0);
  });

  it("agrupa especialidad en subobjeto", () => {
    const dto = toMedicoDTO(medicoRaw);
    expect(dto.especialidad).toEqual({
      id_especialidad: 1,
      nombre: "PEDIATRÍA",
    });
  });

  it("agrupa usuario en subobjeto", () => {
    const dto = toMedicoDTO(medicoRaw);
    expect(dto.usuario).toEqual({
      id_usuario: 1,
      apellido: "Lopez",
      nombres: "Marcelo",
      email: "lopmar@correo.com",
    });
  });

  it("foto_path null se mantiene como null", () => {
    const dto = toMedicoDTO({ ...medicoRaw, foto_path: null });
    expect(dto.foto_path).toBeNull();
  });

  it("descripcion null se mantiene como null", () => {
    const dto = toMedicoDTO({ ...medicoRaw, descripcion: null });
    expect(dto.descripcion).toBeNull();
  });

  it("no expone campos planos del JOIN", () => {
    const dto = toMedicoDTO(medicoRaw);
    expect(dto).not.toHaveProperty("apellido");
    expect(dto).not.toHaveProperty("nombres");
    expect(dto).not.toHaveProperty("email");
    expect(dto).not.toHaveProperty("id_especialidad");
  });
});
