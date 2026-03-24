const { banco: pool } = require('./database');

async function gerarAlertasNutricionista(nutricionistaId) {
  const alertas = [];

  // ── 1. IMC ALTO ──────────────────────────────────────
  const [pacientesIMC] = await pool.query(`
    SELECT 
      u.nome_usuario,
      p.peso,
      p.altura,
      ROUND(p.peso / (p.altura * p.altura), 1) AS imc
    FROM pacientes p
    JOIN usuarios u ON u.id = p.usuario_id
    WHERE p.nutricionista_id = ?
    AND p.peso IS NOT NULL
    AND p.altura IS NOT NULL
    AND (p.peso / (p.altura * p.altura)) >= 25
  `, [nutricionistaId]);

  pacientesIMC.forEach(p => {
    const tipo = p.imc >= 30 ? 'crit' : 'warn';
    const classe = p.imc >= 30 ? 'Obesidade Grau I' : 'Sobrepeso';
    alertas.push({
      tipo,
      titulo: `${p.paciente_nome || p.nome_usuario} — IMC Elevado`,
      descricao: `IMC ${p.imc} (${classe}). Recomendado acompanhamento nutricional intensivo.`,
      meta: 'Calculado automaticamente',
      acoes: tipo === 'crit' ? ['Agendar'] : ['Lembrar']
    });
  });

  // ── 2. CONSULTA ATRASADA (> 30 dias sem consulta realizada) ──
  const [atrasadas] = await pool.query(`
    SELECT 
      u.nome_usuario,
      MAX(a.data) AS ultima_consulta,
      DATEDIFF(CURDATE(), MAX(a.data)) AS dias_sem_consulta
    FROM agendamentos a
    JOIN usuarios u ON u.id = a.usuario_id
    JOIN consultorios c ON c.id = a.consultorio_id
    JOIN nutricionistas_consultorios nc ON nc.consultorio_id = c.id
    WHERE nc.nutricionista_id = ?
    AND a.status = 'realizada'
    GROUP BY a.usuario_id, u.nome_usuario
    HAVING dias_sem_consulta > 30
  `, [nutricionistaId]);

  atrasadas.forEach(p => {
    alertas.push({
      tipo: 'warn',
      titulo: `${p.nome_usuario} — Consulta Atrasada`,
      descricao: `Última consulta há ${p.dias_sem_consulta} dias. Recomendado reagendar.`,
      meta: `Última consulta: ${new Date(p.ultima_consulta).toLocaleDateString('pt-BR')}`,
      acoes: ['Reagendar']
    });
  });

  return alertas;
}

module.exports = { gerarAlertasNutricionista };