export const toUsuarioDTO = (usuario) => ({
  id_usuario: usuario.id_usuario,
  apellido: usuario.apellido,
  nombres: usuario.nombres,
  email: usuario.email,
  rol: usuario.rol,
  foto_path: usuario.foto_path || null,
});
