import pool from "../db/connection.js";
import fs from "fs";
import path from "path";
import UsuariosRepository from "../db/repositories/usuarios.repository.js";
import MedicosRepository from "../db/repositories/medicos.repository.js";
import PacientesRepository from "../db/repositories/pacientes.repository.js";

const usuariosRepo = new UsuariosRepository();
const medicosRepo = new MedicosRepository();
const pacientesRepo = new PacientesRepository();

export const registrarPaciente = async (data) => {
  const { documento, apellido, nombres, email, contrasenia, id_obra_social } =
    data;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const id_usuario = await usuariosRepo.create(
      { documento, apellido, nombres, email, contrasenia, rol: 2 },
      connection,
    );

    await pacientesRepo.create({ id_usuario, id_obra_social }, connection);

    await connection.commit();
    return id_usuario;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const registrarMedico = async (data) => {
  const {
    documento,
    apellido,
    nombres,
    email,
    contrasenia,
    id_especialidad,
    matricula,
    descripcion,
    valor_consulta,
  } = data;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const id_usuario = await usuariosRepo.create(
      { documento, apellido, nombres, email, contrasenia, rol: 1 },
      connection,
    );

    await medicosRepo.create(
      { id_usuario, id_especialidad, matricula, descripcion, valor_consulta },
      connection,
    );

    await connection.commit();
    return id_usuario;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const registrarAdmin = async (data) => {
  const { documento, apellido, nombres, email, contrasenia } = data;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const id_usuario = await usuariosRepo.create(
      { documento, apellido, nombres, email, contrasenia, rol: 3 },
      connection,
    );

    await connection.commit();
    return id_usuario;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const actualizarFoto = async (id_usuario, nuevoPath) => {
  // Eliminar foto anterior si existe
  const fotoAnterior = await usuariosRepo.getFotoPath(id_usuario);
  if (fotoAnterior) {
    const rutaAnterior = path.resolve(fotoAnterior);
    if (fs.existsSync(rutaAnterior)) {
      fs.unlinkSync(rutaAnterior);
    }
  }

  const affectedRows = await usuariosRepo.actualizarFoto(id_usuario, nuevoPath);
  if (affectedRows === 0) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  return nuevoPath;
};
