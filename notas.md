*Notas sobre la Clase Práctica - 07/04/2026*

*presentación del tfi y sus lineamientos*

*link https://www.youtube.com/watch?v=PDHBWaqt\_kg*



*Registro de turnos* (min 25:30)

**Sobre la tabla turnos\_reservas:** 

Para registrar turnos se necesita de la tabla médicos y la tabla pacientes, por eso en la tabla turnos\_reservas están los atributos de id\_medico y id\_paciente.



**Sobre la tabla médicos** (25:45):

*campo foto\_path:* la idea es que este la ubicación del archivo de la imagen, del avatar del medico (no se carga un JPG o Un PNG  directamente), el archivo PNG, JPG en la imagen la vamos a subir al servidor y la idea es que foto\_path guarde el nombre del archivo para que cuando se vea la consulta se busque ese archivo.

26:55

para la tabla médicos hay una tabla relacional entre médicos y obra sociales

1 medico puede atender a muchas obras sociales



**sobre la tabla pacientes** (min 26:49) 

tiene un id\_usuario y un id\_obra\_social

el paciente va a tener solo 1 obra social



**sobre la tabla medicos\_obras\_sociales** (min 27:10)

relación n a m entre médicos  y obras\_sociales



**sobre la tabla especialidades:**

1 medico solo puede tener 1 especialidad



**sobre la tabla usuarios** (min 28:11):

en esta tala se centraliza la información que podría ser común a ambos para no tener que ponerla en cada tabla, esos campos son documento, apellido, nombres, email, contrasenia

*rol* es un tinyInt que busca indicar que tipo de usuario 0 = medico, 1= paciente, 2 = administrador

*activo* = indica si el usuario esta activo o no en la aplicación.

min 44:40

la relación usuarios-médicos, usuarios-pacientes es de 1 a 1, ya que un usuario puede ser o 1 medico o un paciente pero no ambos a la vez. 





**sobre el calculo del valor de la consulta:** (min 29:34) 

se puede hacer un trigger o hacerlo desde el back.

los triggers gralmente se usan para tema de pagos y cancelaciones, auditoria y control.

se debería hacer desde el back



**sobre v\_medicos y v\_pacientes:** (min 32:38)

son vistas de datos que vamos a usar recurrentemente, por ej la lista de pacientes (es un select que tiene joins)



(min 34:30)

No esta en la idea crear un usuario, pero la idea del campo rol en la tabla usuarios es justamente que simule que rol tiene y por lo tanto habilitarlo a ciertas tareas.

el script es algo que se da de catedra y en ella ya hay algunos datos cargados para cada tabla.



min (36:30)

**Puede haber un caso en que no sean médicos ni pacientes?**

si el administrador

no esta en el alcance del tfi el registro de pacientes pero si pude ser una tarea funcional



**Sobre el rol administrador:**

min 49:50

administrador no llega a ser una tabla porque no tiene atributos propios es por esa razón que se apunta a una tabla usuarios con el campo de rol.

min 52:00

en su lista de requsiitos funcionales:

Asociar médicos con obras sociales no es directa, se debe ver la tabla medicos\_obras\_sociales

ej para un id\_medico un id\_obrasocial la relación es m a n.

Asociar pacientes con obras sociales si es directa

Registrar un turno para un paciente, médico y fecha (mediante la tabla turnos\_reservas)

Obtener estadísticas de atenciones = según los datos que haya en la tabla turnos\_reservas buscar la información estadística (min 52:00) por ej especialidades con mas turnos, médicos con mas turnos, turnos de tal fecha (se vera unos ej en clase pero otras estadísticas podrán ser planteadas pero se deberán resolver por nuestra cuenta).



**RESTRICCIONES Y REGLAS DE NEGOCIO:**



min 53

**sobre los procedimientos almacenados**

se usaran procedimientos almacenados, algo que se crea en la bbdd y que se ejecute y procese en la bbdd y que desde el backend llame a ese procedimiento almacenado y devuelva esa información, para no hacer una instrucción sql y poner esa carga de trabajo a la bbdd

min 55:00

si deseamos hacer nuestros propios procedimientos almacenados para hacer ciertas estadísticas deben incluirse en el script de bbdd, pero el profe entregara algunos para cietas estadisticas



**sobre el valor de la consulta**

la  tabla obra social tiene un atibuto porcentaje\_descuento, la tabla médicos tiene el atributo valor\_consulta

a obras\_sociales.porcentaje\_descuento debe llegar un decimal (por ej si el descuento es del 20% el valor debe ser 0.2)

la idea es que obras\_sociales.porcentaje\_descuento \* medicos.valor\_consulta nos de un valor que luego sea restado a médicos.valor\_consulta para dar el valor\_total





**1:12:00**

**sobre los tipos de datos:**

los tipos de datos que estarán en la bbdd son uicamente los presentados en las tablas sin embargo se espera que el resultado de la app también genere además de los tipos de datos algo como un pdf.



1:17:42

**sobre los extras que se deben entregar**

hay una lista de ejemplos según el que elijamos ese extra puede hacer que terminemos modificando el script de la bbdd para agregar esa funcionalidad



&#x20;

