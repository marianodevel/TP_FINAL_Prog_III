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

export const generarPDFTurnos = (turnos, res) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  // Headers HTTP para descarga
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=informe_turnos_${Date.now()}.pdf`,
  );

  doc.pipe(res);

  // ── Encabezado ──────────────────────────────────────────
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("Clínica Médica", { align: "center" })
    .fontSize(14)
    .font("Helvetica")
    .text("Informe de Turnos", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(9)
    .text(`Generado el: ${formatFecha(new Date())}`, { align: "right" })
    .moveDown(1);

  // ── Resumen ──────────────────────────────────────────────
  const totalTurnos = turnos.length;
  const atendidos = turnos.filter((t) => t.atentido === 1).length;
  const pendientes = totalTurnos - atendidos;
  const totalFacturado = turnos.reduce(
    (acc, t) => acc + parseFloat(t.valor_total || 0),
    0,
  );

  // Agrupar por obra social
  const porObraSocial = turnos.reduce((acc, t) => {
    const nombre = t.obra_social || "Sin obra social";
    if (!acc[nombre]) acc[nombre] = 0;
    acc[nombre]++;
    return acc;
  }, {});

  // Agrupar por paciente
  const porPaciente = turnos.reduce((acc, t) => {
    const nombre = `${t.paciente_apellido}, ${t.paciente_nombres}`;
    if (!acc[nombre]) acc[nombre] = 0;
    acc[nombre]++;
    return acc;
  }, {});

  doc.fontSize(12).font("Helvetica-Bold").text("Resumen General").moveDown(0.3);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text(`Total de turnos: ${totalTurnos}`)
    .text(`Atendidos: ${atendidos}`)
    .text(`Pendientes: ${pendientes}`)
    .text(`Total facturado: ${formatMoneda(totalFacturado)}`)
    .moveDown(1);

  // ── Turnos por obra social ───────────────────────────────
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

  // ── Pacientes con más turnos ─────────────────────────────
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

  // ── Detalle de turnos ────────────────────────────────────
  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text("Detalle de Turnos")
    .moveDown(0.5);

  // Encabezado de tabla
  const colFecha = 40;
  const colMedico = 160;
  const colPaciente = 300;
  const colObra = 400;
  const colValor = 490;
  const colEstado = 545;

  const dibujarEncabezadoTabla = () => {
    doc
      .fontSize(8)
      .font("Helvetica-Bold")
      .text("Fecha/Hora", colFecha, doc.y, { width: 110 })
      .text("Médico", colMedico, doc.y - doc.currentLineHeight(), {
        width: 135,
      })
      .text("Paciente", colPaciente, doc.y - doc.currentLineHeight(), {
        width: 95,
      })
      .text("Obra Social", colObra, doc.y - doc.currentLineHeight(), {
        width: 85,
      })
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

  dibujarEncabezadoTabla();

  // Filas de la tabla
  doc.fontSize(7.5).font("Helvetica");

  turnos.forEach((turno, index) => {
    // Nueva página si no hay espacio
    if (doc.y > 720) {
      doc.addPage();
      dibujarEncabezadoTabla();
    }

    const y = doc.y;
    const estado = turno.atentido === 1 ? "Atendido" : "Pendiente";

    doc
      .text(formatFecha(turno.fecha_hora), colFecha, y, { width: 115 })
      .text(`${turno.medico_apellido}, ${turno.medico_nombres}`, colMedico, y, {
        width: 135,
      })
      .text(
        `${turno.paciente_apellido}, ${turno.paciente_nombres}`,
        colPaciente,
        y,
        { width: 95 },
      )
      .text(turno.obra_social || "-", colObra, y, { width: 85 })
      .text(formatMoneda(turno.valor_total), colValor, y, { width: 50 })
      .text(estado, colEstado, y, { width: 50 });

    doc.moveDown(0.6);

    // Línea separadora cada 2 filas
    if (index % 2 === 1) {
      doc
        .moveTo(colFecha, doc.y - 2)
        .lineTo(580, doc.y - 2)
        .strokeColor("#eeeeee")
        .stroke();
    }
  });

  // ── Pie de página ────────────────────────────────────────
  doc
    .moveDown(2)
    .fontSize(8)
    .fillColor("#888888")
    .font("Helvetica")
    .text("Sistema de Gestión Médica — Programación III UNER", {
      align: "center",
    });

  doc.end();
};
