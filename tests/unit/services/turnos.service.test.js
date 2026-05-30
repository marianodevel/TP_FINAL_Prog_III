import { describe, it, expect, jest, beforeEach } from "@jest/globals";

// Mock de los repositories
jest.unstable_mockModule(
  "../../../src/db/repositories/turnos.repository.js",
  () => ({
    default: jest.fn().mockImplementation(() => ({
      getById: jest.fn(),
      getAll: jest.fn(),
      getByMedico: jest.fn(),
      getByPaciente: jest.fn(),
      existeTurno: jest.fn(),
      getDatosParaCalculo: jest.fn(),
      create: jest.fn(),
      marcarAtendido: jest.fn(),
      softDelete: jest.fn(),
    })),
  }),
);

jest.unstable_mockModule(
  "../../../src/db/repositories/medicos.repository.js",
  () => ({
    default: jest.fn().mockImplementation(() => ({
      getById: jest.fn(),
    })),
  }),
);

jest.unstable_mockModule(
  "../../../src/db/repositories/pacientes.repository.js",
  () => ({
    default: jest.fn().mockImplementation(() => ({
      getById: jest.fn(),
    })),
  }),
);

jest.unstable_mockModule("../../../src/db/connection.js", () => ({
  default: {
    getConnection: jest.fn().mockResolvedValue({
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      query: jest.fn(),
    }),
  },
}));

describe("turnos.service — calcularValorTotal", () => {
  it("aplica descuento cuando es_particular = 0", async () => {
    const { createTurno } =
      await import("../../../src/services/turnos.service.js");
    const TurnosRepository = (
      await import("../../../src/db/repositories/turnos.repository.js")
    ).default;
    const MedicosRepository = (
      await import("../../../src/db/repositories/medicos.repository.js")
    ).default;
    const PacientesRepository = (
      await import("../../../src/db/repositories/pacientes.repository.js")
    ).default;

    const turnosInstance = TurnosRepository.mock.results[0].value;
    const medicosInstance = MedicosRepository.mock.results[0].value;
    const pacientesInstance = PacientesRepository.mock.results[0].value;

    medicosInstance.getById.mockResolvedValue({ id_medico: 1 });
    pacientesInstance.getById.mockResolvedValue({ id_paciente: 1 });
    turnosInstance.existeTurno.mockResolvedValue(false);
    turnosInstance.getDatosParaCalculo.mockResolvedValue({
      valor_consulta: 5000,
      porcentaje_descuento: 10,
      es_particular: 0,
    });
    turnosInstance.create.mockResolvedValue(99);

    const result = await createTurno({
      id_medico: 1,
      id_paciente: 1,
      id_obra_social: 1,
      fecha_hora: "2026-06-15T10:00:00",
    });

    // 5000 - (10% de 5000) = 4500
    expect(result.valor_total).toBe(4500);
  });

  it("no aplica descuento cuando es_particular = 1", async () => {
    const { createTurno } =
      await import("../../../src/services/turnos.service.js");
    const TurnosRepository = (
      await import("../../../src/db/repositories/turnos.repository.js")
    ).default;

    const turnosInstance = TurnosRepository.mock.results[0].value;
    turnosInstance.getDatosParaCalculo.mockResolvedValue({
      valor_consulta: 5000,
      porcentaje_descuento: 10,
      es_particular: 1,
    });
    turnosInstance.create.mockResolvedValue(100);

    const result = await createTurno({
      id_medico: 1,
      id_paciente: 1,
      id_obra_social: 1,
      fecha_hora: "2026-06-15T11:00:00",
    });

    expect(result.valor_total).toBe(5000);
  });

  it("lanza error 409 si el médico ya tiene turno en ese horario", async () => {
    const { createTurno } =
      await import("../../../src/services/turnos.service.js");
    const TurnosRepository = (
      await import("../../../src/db/repositories/turnos.repository.js")
    ).default;

    const turnosInstance = TurnosRepository.mock.results[0].value;
    turnosInstance.existeTurno.mockResolvedValue(true);

    await expect(
      createTurno({
        id_medico: 1,
        id_paciente: 1,
        id_obra_social: 1,
        fecha_hora: "2026-06-15T10:00:00",
      }),
    ).rejects.toMatchObject({ status: 409 });
  });
});
