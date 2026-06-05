import { describe, it, expect, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import { cerrarConexion } from "../helpers/db.helper.js";

afterAll(async () => {
  await cerrarConexion();
});

describe("POST /api/v1/auth/login", () => {
  it("devuelve token con credenciales válidas de admin", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "ferben@correo.com", contrasenia: "ferben" });

    expect(res.status).toBe(200);
    expect(res.body.estado).toBe(true);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.usuario).toHaveProperty("rol", 3);
    expect(res.body.data.usuario).not.toHaveProperty("contrasenia");
  });

  it("devuelve token con credenciales válidas de médico", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "lopmar@correo.com", contrasenia: "lopmar" });

    expect(res.status).toBe(200);
    expect(res.body.data.usuario).toHaveProperty("rol", 1);
  });

  it("devuelve token con credenciales válidas de paciente", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "lopjac@correo.com", contrasenia: "lopjac" });

    expect(res.status).toBe(200);
    expect(res.body.data.usuario).toHaveProperty("rol", 2);
  });

  it("devuelve 401 con contraseña incorrecta", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "ferben@correo.com", contrasenia: "incorrecta" });

    expect(res.status).toBe(401);
    expect(res.body.estado).toBe(false);
  });

  it("devuelve 401 con email inexistente", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "noexiste@correo.com", contrasenia: "algo" });

    expect(res.status).toBe(401);
  });

  it("devuelve 400 si falta el email", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ contrasenia: "ferben" });

    expect(res.status).toBe(400);
  });

  it("devuelve 400 si el email no es válido", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "no-es-un-email", contrasenia: "ferben" });

    expect(res.status).toBe(400);
  });
});
