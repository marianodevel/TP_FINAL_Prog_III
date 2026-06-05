import pool from "../connection.js";

export default class UsuariosRepository {
  getByEmailYContrasenia = async (email, contrasenia) => {
    const [rows] = await pool.query(
      `SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo
       FROM usuarios
       WHERE email = ? AND contrasenia = SHA2(?, 256) AND activo = 1`,
      [email, contrasenia],
    );
    return rows[0];
  };

  getById = async (id) => {
    const [rows] = await pool.query(
      `SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo
       FROM usuarios
       WHERE id_usuario = ? AND activo = 1`,
      [id],
    );
    return rows[0];
  };

  create = async (data, connection = null) => {
    const db = connection || pool;
    const {
      documento,
      apellido,
      nombres,
      email,
      contrasenia,
      foto_path = "",
      rol,
    } = data;
    const [result] = await db.query(
      `INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol)
       VALUES (?, SHA2(?, 256), ?, ?, ?, ?, ?)`,
      [documento, contrasenia, apellido, nombres, email, foto_path, rol],
    );
    return result.insertId;
  };

  actualizarFoto = async (id_usuario, foto_path) => {
    const [result] = await pool.query(
      `UPDATE usuarios SET foto_path = ? WHERE id_usuario = ? AND activo = 1`,
      [foto_path, id_usuario],
    );
    return result.affectedRows;
  };

  getFotoPath = async (id_usuario) => {
    const [rows] = await pool.query(
      `SELECT foto_path FROM usuarios WHERE id_usuario = ? AND activo = 1`,
      [id_usuario],
    );
    return rows[0]?.foto_path || null;
  };
}
