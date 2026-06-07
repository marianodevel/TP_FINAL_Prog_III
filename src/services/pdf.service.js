import PDFDocument from "pdfkit";

const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const formatMoneda = (valor) => {
  return `$${parseFloat(valor).toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const encabezadoReporte = (doc, titulo, subtitulo = null) => {
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("Clínica Médica", { align: "center" })
    .fontSize(14)
    .font("Helvetica")
    .text(titulo, { align: "center" });

  if (subtitulo) {
    doc.fontSize(11).text(subtitulo, { align: "center" });
  }

  doc
    .moveDown(0.5)
    .fontSize(9)
    .text(`Generado el: ${formatFecha(new Date())}`, { align: "right" })
    .moveDown(1);
};

const resumenTurnos = (doc, turnos) => {
  const totalTurnos = turnos.length;
  const atendidos = turnos.filter((t) => t.atentido === 1).length;
  const pendientes = totalTurnos - atendidos;
  const totalFacturado = turnos.reduce(
    (acc, t) => acc + parseFloat(t.valor_total || 0),
    0,
  );

  doc.fontSize(12).font("Helvetica-Bold").text("Resumen General").moveDown(0.3);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Total de turnos: ${totalTurnos}`)
    .text(`Atendidos: ${atendidos}`)
    .text(`Pendientes: ${pendientes}`)
    .text(`Total facturado: ${formatMoneda(totalFacturado)}`)
    .moveDown(1);

  return { totalTurnos, atendidos, pendientes, totalFacturado };
};

const tablaDetalle = (doc, turnos, columnas) => {
  const {
    colFecha = 40,
    colA = 160,
    colB = 300,
    colC = 400,
    colValor = 490,
    colEstado = 545,
    labelA = "Médico",
    labelB = "Paciente",
    labelC = "Obra Social",
  } = columnas;

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Detalle de Turnos")
    .moveDown(0.5);

  const dibujarEncabezado = () => {
    doc
      .fontSize(8)
      .font("Helvetica-Bold")
      .text("Fecha/Hora", colFecha, doc.y, { width: 110 })
      .text(labelA, colA, doc.y - doc.currentLineHeight(), { width: 135 })
      .text(labelB, colB, doc.y - doc.currentLineHeight(), { width: 95 })
      .text(labelC, colC, doc.y - doc.currentLineHeight(), { width: 85 })
      .text("Valor", colValor, doc.y - doc.currentLineHeight(), { width: 50 })
      .text("Estado", colEstado, doc.y - doc.currentLineHeight(), { width: 50 })
      .moveDown(0.3);

    doc
      .moveTo(colFecha, doc.y)
      .lineTo(580, doc.y)
      .strokeColor("#aaaaaa")
      .stroke()
      .moveDown(0.3);
  };

  dibujarEncabezado();

  doc.fontSize(7.5).font("Helvetica");

  turnos.forEach((turno, index) => {
    if (doc.y > 720) {
      doc.addPage();
      dibujarEncabezado();
    }

    const y = doc.y;
    const estado = turno.atentido === 1 ? "Atendido" : "Pendiente";

    const textoA = turno.medico_apellido
      ? `${turno.medico_apellido}, ${turno.medico_nombres}`
      : "-";
    const textoB = turno.paciente_apellido
      ? `${turno.paciente_apellido}, ${turno.paciente_nombres}`
      : "-";
    const textoC = turno.obra_social || "-";

    doc
      .text(formatFecha(turno.fecha_hora), colFecha, y, { width: 115 })
      .text(textoA, colA, y, { width: 135 })
      .text(textoB, colB, y, { width: 95 })
      .text(textoC, colC, y, { width: 85 })
      .text(formatMoneda(turno.valor_total), colValor, y, { width: 50 })
      .text(estado, colEstado, y, { width: 50 });

    doc.moveDown(0.6);

    if (index % 2 === 1) {
      doc
        .moveTo(colFecha, doc.y - 2)
        .lineTo(580, doc.y - 2)
        .strokeColor("#eeeeee")
        .stroke();
    }
  });

  doc
    .moveDown(2)
    .fontSize(8)
    .fillColor("#888888")
    .font("Helvetica")
    .text("Sistema de Gestión Médica — Programación III UNER", {
      align: "center",
    });
};

// ── Reporte general ───────────────────────────────────────────────────────────
export const generarPDFTurnos = (turnos, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=informe_turnos_${Date.now()}.pdf`,
  );

  doc.pipe(res);

  encabezadoReporte(doc, "Informe General de Turnos");

  const { totalFacturado } = resumenTurnos(doc, turnos);

  // Turnos por obra social
  const porObraSocial = turnos.reduce((acc, t) => {
    const nombre = t.obra_social || "Sin obra social";
    if (!acc[nombre]) acc[nombre] = 0;
    acc[nombre]++;
    return acc;
  }, {});

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Turnos por Obra Social")
    .moveDown(0.3);
  doc.fontSize(10).font("Helvetica");
  Object.entries(porObraSocial)
    .sort((a, b) => b[1] - a[1])
    .forEach(([nombre, cantidad]) => {
      doc.text(`• ${nombre}: ${cantidad} turno${cantidad !== 1 ? "s" : ""}`);
    });
  doc.moveDown(1);

  // Pacientes con más turnos
  const porPaciente = turnos.reduce((acc, t) => {
    const nombre = `${t.paciente_apellido}, ${t.paciente_nombres}`;
    if (!acc[nombre]) acc[nombre] = 0;
    acc[nombre]++;
    return acc;
  }, {});

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Pacientes con más turnos")
    .moveDown(0.3);
  doc.fontSize(10).font("Helvetica");
  Object.entries(porPaciente)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([nombre, cantidad]) => {
      doc.text(`• ${nombre}: ${cantidad} turno${cantidad !== 1 ? "s" : ""}`);
    });
  doc.moveDown(1);

  tablaDetalle(doc, turnos, {});

  doc.end();
};

// ── Reporte por médico ────────────────────────────────────────────────────────
export const generarPDFTurnosPorMedico = (turnos, medico, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=informe_turnos_medico_${medico.id_medico}_${Date.now()}.pdf`,
  );

  doc.pipe(res);

  encabezadoReporte(
    doc,
    "Informe de Turnos por Médico",
    `Dr/a. ${medico.apellido}, ${medico.nombres} — ${medico.especialidad}`,
  );

  resumenTurnos(doc, turnos);

  tablaDetalle(doc, turnos, {
    labelA: "Paciente",
    labelB: "Obra Social",
    labelC: "Especialidad",
    colA: 160,
    colB: 320,
    colC: 430,
  });

  doc.end();
};

// ── Reporte por paciente ──────────────────────────────────────────────────────
export const generarPDFTurnosPorPaciente = (turnos, paciente, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=informe_turnos_paciente_${paciente.id_paciente}_${Date.now()}.pdf`,
  );

  doc.pipe(res);

  encabezadoReporte(
    doc,
    "Informe de Turnos por Paciente",
    `${paciente.apellido}, ${paciente.nombres} — ${paciente.obra_social}`,
  );

  resumenTurnos(doc, turnos);

  tablaDetalle(doc, turnos, {
    labelA: "Médico",
    labelB: "Especialidad",
    labelC: "Obra Social",
    colA: 160,
    colB: 320,
    colC: 430,
  });

  doc.end();
};

// ── Reporte por obra social ───────────────────────────────────────────────────
export const generarPDFTurnosPorObraSocial = (turnos, obraSocial, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=informe_turnos_obra_social_${obraSocial.id_obra_social}_${Date.now()}.pdf`,
  );

  doc.pipe(res);

  encabezadoReporte(
    doc,
    "Informe de Turnos por Obra Social",
    `${obraSocial.nombre}`,
  );

  resumenTurnos(doc, turnos);

  tablaDetalle(doc, turnos, {});

  doc.end();
};

// ── Reporte por especialidad ──────────────────────────────────────────────────
export const generarPDFTurnosPorEspecialidad = (turnos, especialidad, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=informe_turnos_especialidad_${especialidad.id_especialidad}_${Date.now()}.pdf`,
  );

  doc.pipe(res);

  encabezadoReporte(
    doc,
    "Informe de Turnos por Especialidad",
    `${especialidad.nombre}`,
  );

  resumenTurnos(doc, turnos);

  tablaDetalle(doc, turnos, {});

  doc.end();
};
