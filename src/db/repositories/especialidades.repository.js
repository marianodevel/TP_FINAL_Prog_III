import pool from "../connection.js";

export default class EspecialidadesRepository {
    getAllEspecialidades = async () => {
        const [rows] = await pool.query(
            "SELECT * FROM especialidades WHERE activo = 1"
        );
        return rows;
    };

    getEspecialidadById = async (id) => {
        const [rows] = await pool.query(
            "SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1",
            [id]
        );
        return rows[0];
    };

    createEspecialidad = async (nombre) => {
        const [result] = await pool.query(
            "INSERT INTO especialidades (nombre) VALUES (?)",
            [nombre]
        );
        return result.insertId;
    };

    updateEspecialidad = async (id, nombre) => {
        const [result] = await pool.query(
            "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1",
            [nombre, id]
        );
        return result.affectedRows;
    };

    deleteEspecialidad = async (id) => {
        const [result] = await pool.query(
            "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?",
            [id]
        );
        return result.affectedRows;
    };
}