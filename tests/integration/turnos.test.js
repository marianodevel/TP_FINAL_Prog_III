import { describe, it, expect, afterAll, beforeAll } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import {
  tokenAdmin,
  tokenMedico,
  tokenPaciente,
} from "../helpers/token.helper.js";
import { limpiarTurnos, cerrarConexion } from "../helpers/db.helper.js";

beforeAll(async () => {
  await limpiarTurnos();
});

afterAll(async () => {
  await limpiarTurnos();
  await cerrarConexion();
});

describe("GET /api/v1/turnos/mis-turnos (médico)", () => {
  it("devuelve los turnos del médico autenticado", async () => {
    const res = await request(app)
      .get("/api/v1/turnos/mis-turnos")
      .set("Authorization", `Bearer ${tokenMedico()}`);

    expect(res.status).toBe(200);
    expect(res.body.estado).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("devuelve 403 con token de paciente", async () => {
    const res = await request(app)
      .get("/api/v1/turnos/mis-turnos")
      .set("Authorization", `Bearer ${tokenPaciente()}`);

    expect(res.status).toBe(403);
  });
});

describe("GET /api/v1/turnos/mis-reservas (paciente)", () => {
  it("devuelve las reservas del paciente autenticado", async () => {
    const res = await request(app)
      .get("/api/v1/turnos/mis-reservas")
      .set("Authorization", `Bearer ${tokenPaciente()}`);

    expect(res.status).toBe(200);
    expect(res.body.estado).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("devuelve 403 con token de médico", async () => {
    const res = await request(app)
      .get("/api/v1/turnos/mis-reservas")
      .set("Authorization", `Bearer ${tokenMedico()}`);

    expect(res.status).toBe(403);
  });
});

describe("POST /api/v1/turnos (admin)", () => {
  it("crea un turno correctamente", async () => {
    const res = await request(app)
      .post("/api/v1/turnos")
      .set("Authorization", `Bearer ${tokenAdmin()}`)
      .send({
        id_medico: 1,
        id_paciente: 1,
        id_obra_social: 1,
        fecha_hora: "2026-07-15T10:00:00",
      });

    expect(res.status).toBe(201);
    expect(res.body.estado).toBe(true);
    expect(res.body.data).toHaveProperty("valor_total");
  });

  it("devuelve 409 si el horario ya está ocupado", async () => {
    const res = await request(app)
      .post("/api/v1/turnos")
      .set("Authorization", `Bearer ${tokenAdmin()}`)
      .send({
        id_medico: 1,
        id_paciente: 1,
        id_obra_social: 1,
        fecha_hora: "2026-07-15T10:00:00",
      });

    expect(res.status).toBe(409);
  });

  it("devuelve 400 si faltan campos obligatorios", async () => {
    const res = await request(app)
      .post("/api/v1/turnos")
      .set("Authorization", `Bearer ${tokenAdmin()}`)
      .send({ id_medico: 1 });

    expect(res.status).toBe(400);
  });

  it("devuelve 403 con token de paciente", async () => {
    const res = await request(app)
      .post("/api/v1/turnos")
      .set("Authorization", `Bearer ${tokenPaciente()}`)
      .send({
        id_medico: 1,
        id_paciente: 1,
        id_obra_social: 1,
        fecha_hora: "2026-07-20T10:00:00",
      });

    expect(res.status).toBe(403);
  });
});

describe("POST /api/v1/turnos/reserva (paciente)", () => {
  it("crea una reserva con la obra social del paciente autenticado", async () => {
    const res = await request(app)
      .post("/api/v1/turnos/reserva")
      .set("Authorization", `Bearer ${tokenPaciente()}`)
      .send({
        id_medico: 1,
        fecha_hora: "2026-07-16T10:00:00",
      });

    expect(res.status).toBe(201);
    expect(res.body.estado).toBe(true);
    expect(res.body.data).toHaveProperty("valor_total");
  });

  it("devuelve 400 si falta fecha_hora", async () => {
    const res = await request(app)
      .post("/api/v1/turnos/reserva")
      .set("Authorization", `Bearer ${tokenPaciente()}`)
      .send({ id_medico: 1 });

    expect(res.status).toBe(400);
  });
});

describe("Respuesta DTO de turnos", () => {
  it("la respuesta usa atendido (boolean) en lugar de atentido", async () => {
    const res = await request(app)
      .get("/api/v1/turnos")
      .set("Authorization", `Bearer ${tokenAdmin()}`);

    expect(res.status).toBe(200);
    const turno = res.body.data[0];
    expect(turno).toHaveProperty("atendido");
    expect(turno).not.toHaveProperty("atentido");
    expect(typeof turno.atendido).toBe("boolean");
  });

  it("médico y paciente vienen como subobjetos", async () => {
    const res = await request(app)
      .get("/api/v1/turnos")
      .set("Authorization", `Bearer ${tokenAdmin()}`);

    const turno = res.body.data[0];
    expect(turno.medico).toHaveProperty("apellido");
    expect(turno.paciente).toHaveProperty("apellido");
    expect(turno).not.toHaveProperty("medico_apellido");
    expect(turno).not.toHaveProperty("paciente_apellido");
  });
});
