import { describe, it, expect, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import {
  tokenAdmin,
  tokenPaciente,
  tokenMedico,
} from "../helpers/token.helper.js";
import { cerrarConexion } from "../helpers/db.helper.js";

afterAll(async () => {
  await cerrarConexion();
});

describe("GET /api/v1/especialidades", () => {
  it("devuelve lista de especialidades con token admin", async () => {
    const res = await request(app)
      .get("/api/v1/especialidades")
      .set("Authorization", `Bearer ${tokenAdmin()}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("devuelve 401 sin token", async () => {
    const res = await request(app).get("/api/v1/especialidades");
    expect(res.status).toBe(401);
  });
});

describe("GET /api/v1/especialidades/:id", () => {
  it("devuelve la especialidad con id = 1", async () => {
    const res = await request(app)
      .get("/api/v1/especialidades/1")
      .set("Authorization", `Bearer ${tokenAdmin()}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id_especialidad", 1);
  });

  it("devuelve 404 para id inexistente", async () => {
    const res = await request(app)
      .get("/api/v1/especialidades/99999")
      .set("Authorization", `Bearer ${tokenAdmin()}`);

    expect(res.status).toBe(404);
  });
});

describe("POST /api/v1/especialidades", () => {
  it("crea especialidad con token admin", async () => {
    const res = await request(app)
      .post("/api/v1/especialidades")
      .set("Authorization", `Bearer ${tokenAdmin()}`)
      .send({ nombre: `DERMATOLOGÍA_TEST_${Date.now()}` });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("devuelve 403 con token de médico", async () => {
    const res = await request(app)
      .post("/api/v1/especialidades")
      .set("Authorization", `Bearer ${tokenMedico()}`)
      .send({ nombre: "DERMATOLOGÍA" });

    expect(res.status).toBe(403);
  });

  it("devuelve 403 con token de paciente", async () => {
    const res = await request(app)
      .post("/api/v1/especialidades")
      .set("Authorization", `Bearer ${tokenPaciente()}`)
      .send({ nombre: "DERMATOLOGÍA" });

    expect(res.status).toBe(403);
  });

  it("devuelve 400 si falta el nombre", async () => {
    const res = await request(app)
      .post("/api/v1/especialidades")
      .set("Authorization", `Bearer ${tokenAdmin()}`)
      .send({});

    expect(res.status).toBe(400);
  });

  it("devuelve 409 si el nombre ya existe", async () => {
    const res = await request(app)
      .post("/api/v1/especialidades")
      .set("Authorization", `Bearer ${tokenAdmin()}`)
      .send({ nombre: "PEDIATRÍA" });

    expect(res.status).toBe(409);
  });
});
