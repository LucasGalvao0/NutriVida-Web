    // ── HELPERS ──
    function fmtDate(d) {
        return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'});
    }
    function setVal(id, val) {
        const el = document.getElementById(id);
        if (el) el.value = val !== undefined && val !== null ? val : '';
    }
    function setSelectVal(id, val) {
        const el = document.getElementById(id);
        if (!el) return;
        const opts = Array.from(el.options);
        const match = opts.find(o => o.value === val || o.text === val);
        if (match) el.value = match.value;
    }

    // ── SIDEBAR MOBILE ──
    function toggleSidebar() {
        const sb = document.querySelector('.sidebar');
        const hb = document.getElementById('hamburger');
        const ov = document.getElementById('sidebarOverlay');
        sb.classList.toggle('open');
        hb.classList.toggle('open');
        ov.classList.toggle('show');
    }
    function closeSidebar() {
        document.querySelector('.sidebar').classList.remove('open');
        document.getElementById('hamburger').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('show');
    }

    // ── NAV ──
    function goSection(id, el) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById('sec-' + id).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if (el) el.classList.add('active');
        if (id === 'prontuario') { loadAnamnese(anamnesePacAtual); renderExames(); }
        closeSidebar();
    }

    // ── PRONTUÁRIO ────────────────────────────────────────────────────

    function prontAba(btn, aba) {
        document.querySelectorAll('#sec-prontuario .filter-tabs .ftab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
        document.querySelectorAll('.pront-aba').forEach(el => el.style.display = 'none');
        document.getElementById('pront-aba-' + aba).style.display = '';
        if (aba === 'exames') renderExames();
        if (aba === 'paciente') { buildExamesCampos(); prontPrevia(); }
    }

    function prontTrocarPac(pac) {
        loadAnamnese(pac);
        // sincronizar select
        const sel = document.getElementById('pront-pac-select');
        if (sel) sel.value = pac;
        renderExames();
        buildExamesCampos();
        prontPrevia();
    }

    // Monta dinamicamente os campos de tradução de cada exame
    function buildExamesCampos() {
        const cont = document.getElementById('pac-exames-campos');
        if (!cont) return;
        if (examesData.length === 0) {
            cont.innerHTML = '<p style="color:var(--text-muted);font-size:0.82rem">Nenhum exame cadastrado ainda.</p>';
            return;
        }
        cont.innerHTML = examesData.map((ex, i) => {
            const st  = getStatus(ex);
            const cor = st === 'bad' ? '#f87171' : st === 'warn' ? '#fbbf24' : '#34d399';
            const lbl = st === 'bad' ? 'Alterado' : st === 'warn' ? 'Atenção' : 'Normal';
            const bg  = st === 'bad' ? 'rgba(239,68,68,0.06)' : st === 'warn' ? 'rgba(251,191,36,0.06)' : 'rgba(16,185,129,0.06)';
            const saved = (window._pacExTexts || {})[i] || '';
            return `<div style="margin-bottom:1rem;padding:0.9rem 1rem;border-radius:12px;border:1px solid ${cor}33;background:${bg}">
                <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.5rem">
                    <span style="font-weight:700;font-size:0.82rem;color:${cor}">${ex.nome}</span>
                    <span style="font-size:0.65rem;font-weight:700;color:${cor};background:${cor}22;padding:0.1rem 0.5rem;border-radius:6px">${lbl}</span>
                    <span style="font-size:0.68rem;color:var(--text-muted);margin-left:auto">${ex.valor} ${ex.unidade}</span>
                </div>
                <label class="f-label" style="font-size:0.68rem;margin-bottom:0.3rem">Como explicar ao paciente:</label>
                <textarea class="f-textarea" data-exidx="${i}" style="min-height:58px;font-size:0.82rem" oninput="salvarTexPac(this);prontPrevia()" placeholder="${st==='ok' ? 'Ex: Seu '+ex.nome.toLowerCase()+' está ótimo — dentro do esperado!' : 'Ex: Seu '+ex.nome.toLowerCase()+' está um pouquinho fora do ideal. Sem preocupação — vamos resolver juntos com ajustes simples na alimentação.'}">${saved}</textarea>
            </div>`;
        }).join('');
    }

    window._pacExTexts = {};
    function salvarTexPac(el) {
        window._pacExTexts[el.dataset.exidx] = el.value;
    }

    // Monta o HTML da tela do paciente (usado na prévia e no fullscreen)
    function montarConteudoPaciente() {
        const d     = anamneseDB[anamnesePacAtual] || {};
        const nome  = d.nome || 'Paciente';
        const nomeCurto = nome.split(' ')[0];
        const sit   = (document.getElementById('pac-situacao')?.value || '').trim();
        const aliTx = (document.getElementById('pac-habitos-ali')?.value || '').trim();
        const aguaTx= (document.getElementById('pac-habitos-agua')?.value || '').trim();
        const ativTx= (document.getElementById('pac-habitos-ativ')?.value || '').trim();
        const passos= (document.getElementById('pac-passos')?.value || '').trim();
        const enc   = (document.getElementById('pac-encoraja')?.value || '').trim();
        const now   = new Date().toLocaleDateString('pt-BR', {day:'2-digit',month:'long',year:'numeric'});

        let html = '';

        // situação geral
        if (sit) {
            html += `<div class="tp-card">
                <div class="tp-card-titulo">💬 Um recado da sua nutricionista</div>
                <p class="tp-texto">${sit.replace(/\n/g,'<br>')}</p>
            </div>`;
        }

        // exames
        const exComTexto = examesData.map((ex,i)=>({ex,tx:(window._pacExTexts||{})[i]||''})).filter(e=>e.tx);
        if (exComTexto.length > 0) {
            html += `<div class="tp-card"><div class="tp-card-titulo">🔬 O que seus exames mostram</div>`;
            exComTexto.forEach(({ex,tx}) => {
                const st  = getStatus(ex);
                const cor = st==='bad'?'#f87171':st==='warn'?'#fbbf24':'#34d399';
                const bg  = st==='bad'?'rgba(239,68,68,0.12)':st==='warn'?'rgba(251,191,36,0.12)':'rgba(16,185,129,0.12)';
                const lbl = st==='bad'?'Precisa de atenção':st==='warn'?'Fique de olho':'Está ótimo';
                html += `<div class="tp-exame-row">
                    <div class="tp-exame-icone" style="background:${bg};color:${cor}">${st==='ok'?'✓':st==='warn'?'~':'!'}</div>
                    <div style="flex:1">
                        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem">
                            <span style="font-weight:700;color:#e2f0ec;font-size:0.88rem">${ex.nome}</span>
                            <span style="font-size:0.65rem;font-weight:700;color:${cor};background:${bg};padding:0.1rem 0.5rem;border-radius:6px">${lbl}</span>
                        </div>
                        <p class="tp-texto" style="font-size:0.88rem">${tx.replace(/\n/g,'<br>')}</p>
                    </div>
                </div>`;
            });
            html += `</div>`;
        }

        // hábitos
        if (aliTx || aguaTx || ativTx) {
            html += `<div class="tp-card"><div class="tp-card-titulo">🥗 Seus hábitos e estilo de vida</div>`;
            if (aliTx) html += `<div style="margin-bottom:1rem"><div style="font-size:0.75rem;font-weight:700;color:#34d399;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.8px">Alimentação</div><p class="tp-texto">${aliTx.replace(/\n/g,'<br>')}</p></div>`;
            if (aguaTx) html += `<div style="margin-bottom:1rem"><div style="font-size:0.75rem;font-weight:700;color:#38bdf8;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.8px">💧 Hidratação</div><p class="tp-texto">${aguaTx.replace(/\n/g,'<br>')}</p></div>`;
            if (ativTx) html += `<div><div style="font-size:0.75rem;font-weight:700;color:#a78bfa;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.8px">🏃 Atividade e sono</div><p class="tp-texto">${ativTx.replace(/\n/g,'<br>')}</p></div>`;
            html += `</div>`;
        }

        // próximos passos
        if (passos) {
            const linhas = passos.split('\n').map(l=>l.trim()).filter(l=>l.replace(/^[·\-\*]\s*/,''));
            html += `<div class="tp-card"><div class="tp-card-titulo">📋 O que fazer agora</div>`;
            linhas.forEach((linha,i) => {
                const txt = linha.replace(/^[·\-\*]\s*/,'');
                if (txt) html += `<div class="tp-passo"><div class="tp-passo-num">${i+1}</div><p class="tp-texto" style="margin:0;font-size:0.9rem">${txt}</p></div>`;
            });
            html += `</div>`;
        }

        // encorajamento
        if (enc) {
            html += `<div class="tp-encoraja">${enc.replace(/\n/g,'<br>')}</div>`;
        }

        if (!html) {
            html = '<p style="color:#5a7a74;font-style:italic;text-align:center;padding:2.5rem 0">Preencha os campos ao lado para ver a prévia aqui...</p>';
        }

        return { html, nome, nomeCurto, now };
    }

    function prontPrevia() {
        const { html, nome, now } = montarConteudoPaciente();
        // atualizar mini-prévia
        const pn = document.getElementById('prev-nome');
        const pd = document.getElementById('prev-data');
        const pc = document.getElementById('prev-corpo');
        if (pn) pn.textContent = nome;
        if (pd) pd.textContent = now;
        if (pc) pc.innerHTML = html;
        // badge na aba
        const badge = document.getElementById('ptab-badge');
        const temConteudo = html.includes('tp-card') || html.includes('tp-encoraja');
        if (badge) badge.style.display = temConteudo ? '' : 'none';
    }

    function abrirTelaPaciente() {
        const { html, nome, nomeCurto, now } = montarConteudoPaciente();
        document.getElementById('tp-nome').textContent = nome;
        document.getElementById('tp-data').textContent = now;
        document.getElementById('tp-corpo').innerHTML = html ||
            '<p style="color:rgba(255,255,255,0.3);text-align:center;padding:3rem 0">Nenhum conteúdo ainda. Preencha a aba "Para o Paciente" primeiro.</p>';
        document.getElementById('tela-paciente').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function fecharTelaPaciente() {
        document.getElementById('tela-paciente').style.display = 'none';
        document.body.style.overflow = '';
    }



    function ftab(btn) {
        btn.closest('.filter-tabs').querySelectorAll('.ftab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
    }

    function toggleRef(header) {
        const body = header.nextElementSibling;
        const arrow = header.querySelector('span:last-child');
        if (body.style.display === 'none') { body.style.display = 'block'; arrow.textContent = '▲'; }
        else { body.style.display = 'none'; arrow.textContent = '▼'; }
    }

    function toggleChip(el) {
        const isRisco = el.closest('#proto-risco') !== null;
        if (isRisco) {
            // No risco: seleção exclusiva dentro do grupo (semi-grid)
            const grupo = el.closest('.semi-grid');
            if (grupo) {
                grupo.querySelectorAll('.semi-chip').forEach(c => c.classList.remove('on','on-warn','on-bad'));
            }
            el.classList.add('on');
            calcRisco();
        } else {
            // Semiologia: toggle multi-select com 3 estados
            if (el.classList.contains('on-bad')) {
                el.classList.remove('on-bad');
            } else if (el.classList.contains('on-warn')) {
                el.classList.remove('on-warn');
                el.classList.add('on-bad');
            } else if (el.classList.contains('on')) {
                el.classList.remove('on');
                el.classList.add('on-warn');
            } else {
                el.classList.add('on');
            }
        }
    }

    function calcRisco() {
        const risco = document.getElementById('proto-risco');
        if (!risco) return;

        let total = 0;
        risco.querySelectorAll('.semi-grid').forEach(grupo => {
            const sel = grupo.querySelector('.semi-chip.on');
            if (sel) {
                // data-pts definido no HTML; fallback: extrai do textContent
                const pts = sel.dataset.pts !== undefined
                    ? parseInt(sel.dataset.pts)
                    : (() => {
                        const m = sel.textContent.match(/\((\d+)\s*pts?\)/);
                        return m ? parseInt(m[1]) : 0;
                    })();
                total += pts;
            }
        });

        const pontuacaoEl = risco.querySelector('.man-score');
        const classEl     = risco.querySelector('.man-class');
        if (!pontuacaoEl || !classEl) return;

        pontuacaoEl.textContent = total + ' pts';

        let cls, cor, statusCls;
        if (total >= 12)     { cls = 'Sem Risco';       cor = 'var(--primary)'; statusCls = 'status s-ok';    }
        else if (total >= 8) { cls = 'Risco Moderado';  cor = 'var(--accent)';  statusCls = 'status s-warn';  }
        else                 { cls = 'Risco Alto';       cor = 'var(--red)';     statusCls = 'status s-alert'; }

        pontuacaoEl.style.color = cor;
        classEl.className = statusCls + ' man-class';
        classEl.textContent = cls;
    }

    function protoTab(btn, id) {
        document.querySelectorAll('.proto-tab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
        document.querySelectorAll('.proto-content').forEach(c => c.classList.remove('active'));
        document.getElementById('proto-' + id).classList.add('active');
        if (id === 'risco') calcRisco();
        if (id === 'imc') calcPregas();
    }

    function openPacDetail() {
        document.getElementById('pacDetail').classList.add('open');
        document.getElementById('overlay').classList.add('show');
    }
    function closePacDetail() {
        document.getElementById('pacDetail').classList.remove('open');
        document.getElementById('overlay').classList.remove('show');
    }

    function dtTab(btn, id) {
        document.querySelectorAll('.dt-tab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
        document.querySelectorAll('[id^="dt-"]').forEach(p => p.style.display = 'none');
        document.getElementById(id).style.display = 'block';
    }

    function toast(msg, type) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.className = 'toast' + (type === 'error' ? ' error' : '') + ' show';
        setTimeout(() => t.classList.remove('show'), 3200);
    }

    // ── NOTAS COM TIMESTAMP ──
    const notaMeta = {};
    function notaChanged(metaId) {
        if (!notaMeta[metaId]) notaMeta[metaId] = { created: new Date(), dirty: true };
        else notaMeta[metaId].dirty = true;
        const el = document.getElementById(metaId);
        if (el) {
            el.style.display = 'block';
            el.innerHTML = 'Criada: ' + fmtDate(notaMeta[metaId].created) + ' &nbsp;·&nbsp; <span style="color:var(--accent);font-weight:700">Não salva</span>';
        }
    }
    function salvarNota(metaId) {
        const now = new Date();
        if (!notaMeta[metaId]) notaMeta[metaId] = { created: now };
        notaMeta[metaId].edited = now; notaMeta[metaId].dirty = false;
        const el = document.getElementById(metaId);
        if (el) {
            el.style.display = 'block';
            el.innerHTML = 'Criada: ' + fmtDate(notaMeta[metaId].created) + ' &nbsp;·&nbsp; <strong style="color:var(--primary)">Editada: ' + fmtDate(now) + '</strong>';
        }
    }

    // ── IMC CALC ──
    function calcIMC() {
        const p = parseFloat(document.getElementById('an-peso') && document.getElementById('an-peso').value);
        const h = parseFloat(document.getElementById('an-altura') && document.getElementById('an-altura').value);
        const valEl = document.getElementById('an-imc-val');
        const clsEl = document.getElementById('an-imc-cls');
        if (!valEl || !clsEl) return;
        if (!p || !h || h <= 0) { valEl.textContent = '—'; clsEl.textContent = '—'; return; }
        const imc = p / (h * h);
        valEl.textContent = imc.toFixed(1).replace('.', ',');
        let cls, color;
        if (imc < 18.5) { cls = 'Baixo Peso'; color = 'var(--blue)'; }
        else if (imc < 25) { cls = 'Peso Normal'; color = 'var(--primary)'; }
        else if (imc < 30) { cls = 'Sobrepeso'; color = 'var(--accent)'; }
        else if (imc < 35) { cls = 'Obesidade Grau I'; color = 'var(--orange)'; }
        else if (imc < 40) { cls = 'Obesidade Grau II'; color = 'var(--red)'; }
        else { cls = 'Obesidade Grau III'; color = 'var(--red)'; }
        clsEl.textContent = cls; clsEl.style.color = color; valEl.style.color = color;
    }

    // ── ANAMNESE DATA ──
    const anamneseDB = {
        ana: { nome:'Ana Paula Ferreira', nasc:'1993-08-14', sexo:'Feminino', civil:'Casado(a)', escolaridade:'Superior', profissao:'Professora', tel:'(16) 99999-0001', motivo:'Paciente busca emagrecimento saudável e sustentável, relata dificuldade em manter dieta por longos períodos.', doencas:'', medicamentos:'', suplementos:'Vitamina D, Ômega-3', alergias:'Intolerância à lactose', cirurgias:'', refeicoes:'4-5', apetite:'Normal', mastigacao:'Normal', gosta:'Frango, saladas, frutas tropicais, iogurte.', naogosta:'Brócolis, fígado. Evita alimentos com lactose.', agua:'1.5', alcool:'Ocasionalmente', foracasa:'Sim, 2-3x por semana (almoço no trabalho)', atividade:'Sim', freq:'2-3x/semana', tipoativ:'Caminhada 30 min + musculação leve', sono:'7', qualidadesono:'Regular', estresse:'Moderado', obs:'Paciente relata episódios de compulsão alimentar nos finais de semana, principalmente a noite. Recomendado acompanhamento com psicólogo.', peso:'63', altura:'1.64', pesousal:'68', pesometa:'58', objetivo:'Emagrecimento', prazo:'6 meses', plano:'Premium', obsnutri:'Paciente com boa motivação. Recomendo início gradual com foco em reeducação alimentar e hidratação.', ultimaEdicao:'20/02/2026' },
        lucas: { nome:'Lucas Mendes', nasc:'2002-03-15', sexo:'Masculino', civil:'Solteiro(a)', escolaridade:'Superior', profissao:'Estudante de Educação Física', tel:'(16) 99999-0005', motivo:'Primeiro atendimento. Atleta amador de atletismo buscando otimização da performance e composição corporal.', doencas:'', medicamentos:'', suplementos:'Whey Protein, Creatina', alergias:'', cirurgias:'', refeicoes:'6+', apetite:'Aumentado', mastigacao:'Rápida', gosta:'Carnes, ovos, batata-doce, frutas.', naogosta:'Vegetais folhosos.', agua:'3', alcool:'Não', foracasa:'Raramente. Come em casa ou leva marmita.', atividade:'Sim', freq:'Diariamente', tipoativ:'Atletismo + musculação 6x por semana', sono:'8', qualidadesono:'Boa', estresse:'Baixo', obs:'Novo paciente, atleta. Avaliar necessidade calórica aumentada e periodização nutricional.', peso:'72', altura:'1.78', pesousal:'72', pesometa:'70', objetivo:'Performance Esportiva', prazo:'3 meses', plano:'Intermediário', obsnutri:'Agendar retorno em 30 dias. Solicitar hemograma completo.', ultimaEdicao:null },
        renata: { nome:'Renata Oliveira', nasc:'1987-11-22', sexo:'Feminino', civil:'Casado(a)', escolaridade:'Ensino Médio', profissao:'Auxiliar Administrativo', tel:'(16) 99999-0002', motivo:'Paciente com obesidade Grau I, histórico de glicose elevada. Encaminhada pelo médico para reeducação alimentar urgente.', doencas:'Diabetes tipo 2', medicamentos:'Metformina 500mg', suplementos:'', alergias:'', cirurgias:'Cesárea (2015)', refeicoes:'3', apetite:'Aumentado', mastigacao:'Rápida', gosta:'Massas, frituras, doces.', naogosta:'Verduras em geral.', agua:'0.8', alcool:'Não', foracasa:'Sim, almoça fora todos os dias.', atividade:'Não', freq:'1x/semana', tipoativ:'', sono:'5', qualidadesono:'Ruim', estresse:'Alto', obs:'ALERTA: Glicose em 118 mg/dL. Necessário controle rigoroso de carboidratos simples e açúcar. Paciente com dificuldade de adesão — requer acompanhamento intensivo.', peso:'92', altura:'1.72', pesousal:'85', pesometa:'70', objetivo:'Emagrecimento', prazo:'12 meses', plano:'Premium', obsnutri:'Caso de alta complexidade. Coordenar com médico endocrinologista. Metas: reduzir 1kg/mês e normalizar glicemia.', ultimaEdicao:'24/02/2026' },
        marcos: { nome:'Marcos Silva', nasc:'1997-07-08', sexo:'Masculino', civil:'Solteiro(a)', escolaridade:'Superior', profissao:'Designer Gráfico', tel:'(16) 99999-0003', motivo:'Emagrecimento e melhora da disposição. Relata sedentarismo e alimentação irregular devido à rotina de trabalho.', doencas:'', medicamentos:'', suplementos:'Cafeína pré-treino', alergias:'', cirurgias:'', refeicoes:'2', apetite:'Normal', mastigacao:'Normal', gosta:'Fast food, hambúrguer, pizza.', naogosta:'Peixes, frutos do mar.', agua:'1.2', alcool:'Ocasionalmente', foracasa:'Sim, quase todos os dias — pede delivery.', atividade:'Sim', freq:'1x/semana', tipoativ:'Musculação (irregular)', sono:'6', qualidadesono:'Regular', estresse:'Alto', obs:'Paciente sem registros no cardápio há 3 dias. Requer contato imediato. Dificuldade de aderência documentada.', peso:'88', altura:'1.80', pesousal:'82', pesometa:'78', objetivo:'Emagrecimento', prazo:'6 meses', plano:'Intermediário', obsnutri:'Foco em praticidade — montar opções de refeições rápidas e saudáveis. Aumentar hidratação.', ultimaEdicao:'18/02/2026' }
    };

    let anamnesePacAtual = 'ana';

    function loadAnamnese(pac) {
        anamnesePacAtual = pac;
        const d = anamneseDB[pac];
        if (!d) return;
        setVal('an-nome', d.nome); setVal('an-nasc', d.nasc);
        setSelectVal('an-sexo', d.sexo); setSelectVal('an-civil', d.civil);
        setSelectVal('an-escolaridade', d.escolaridade);
        setVal('an-profissao', d.profissao); setVal('an-tel', d.tel);
        setVal('an-motivo', d.motivo); setSelectVal('an-doencas', d.doencas);
        setVal('an-medicamentos', d.medicamentos); setVal('an-suplementos', d.suplementos);
        setVal('an-alergias', d.alergias); setVal('an-cirurgias', d.cirurgias);
        setSelectVal('an-refeicoes', d.refeicoes); setSelectVal('an-apetite', d.apetite);
        setSelectVal('an-mastigacao', d.mastigacao);
        setVal('an-gosta', d.gosta); setVal('an-naogosta', d.naogosta);
        setVal('an-agua', d.agua); setSelectVal('an-alcool', d.alcool);
        setVal('an-foracasa', d.foracasa); setSelectVal('an-atividade', d.atividade);
        setSelectVal('an-freq', d.freq); setVal('an-tipoativ', d.tipoativ);
        setVal('an-sono', d.sono); setSelectVal('an-qualidadesono', d.qualidadesono);
        setSelectVal('an-estresse', d.estresse); setVal('nota-anamnese', d.obs);
        setVal('an-peso', d.peso); setVal('an-altura', d.altura);
        setVal('an-pesousal', d.pesousal); setVal('an-pesometa', d.pesometa);
        setSelectVal('an-objetivo', d.objetivo); setSelectVal('an-prazo', d.prazo);
        setSelectVal('an-plano', d.plano); setVal('an-obsnutri', d.obsnutri);
        calcIMC();
        const sub = document.getElementById('anamnese-sub');
        if (sub) sub.textContent = d.nome + (d.ultimaEdicao ? ' · Última edição: ' + d.ultimaEdicao : ' · Novo paciente — sem registros anteriores');
        const metaEl = document.getElementById('nota-anamnese-meta');
        if (metaEl) {
            metaEl.innerHTML = d.ultimaEdicao
                ? 'Última edição registrada: ' + d.ultimaEdicao
                : '<span style="color:var(--blue)">Novo paciente — nenhuma edição anterior</span>';
            metaEl.style.display = 'block';
        }
    }

    function salvarAnamnese() {
        const pac = anamnesePacAtual;
        const d = anamneseDB[pac];
        if (d) {
            // Coleta todos os campos editáveis
            const fields = ['nome','nasc','profissao','tel','motivo','medicamentos',
                'suplementos','alergias','cirurgias','gosta','naogosta','agua',
                'foracasa','tipoativ','sono','peso','altura','pesousal','pesometa','obsnutri'];
            const selects = ['sexo','civil','escolaridade','doencas','refeicoes',
                'apetite','mastigacao','alcool','atividade','freq',
                'qualidadesono','estresse','objetivo','prazo','plano'];
            fields.forEach(k => {
                const el = document.getElementById('an-' + k);
                if (el) d[k] = el.value;
            });
            selects.forEach(k => {
                const el = document.getElementById('an-' + k);
                if (el) d[k] = el.options[el.selectedIndex]?.text || el.value;
            });
            d.obs = document.getElementById('nota-anamnese')?.value || '';
            d.ultimaEdicao = new Date().toLocaleDateString('pt-BR');
        }
        salvarNota('nota-anamnese-meta');
        const sub = document.getElementById('anamnese-sub');
        if (sub && d) sub.textContent = d.nome + ' · Última edição: ' + d.ultimaEdicao;
        toast('Anamnese salva com sucesso!');
    }

    function exportarAnamnese() {
        const pac = anamnesePacAtual;
        // Primeiro salva os dados atuais
        salvarAnamnese();
        const d = anamneseDB[pac];
        if (!d) return;

        const now = new Date().toLocaleDateString('pt-BR');
        const imc = d.peso && d.altura
            ? (parseFloat(d.peso) / (parseFloat(d.altura) ** 2)).toFixed(1)
            : '—';

        const printHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Anamnese — ${d.nome}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #1a2e29; padding: 24px; max-width: 900px; margin: auto; }
  h1 { font-size: 20px; color: #059669; margin-bottom: 4px; }
  .sub { color: #64748b; font-size: 12px; margin-bottom: 20px; }
  .section { margin-bottom: 18px; }
  .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: #059669; border-bottom: 1px solid #d1fae5; padding-bottom: 4px; margin-bottom: 10px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
  .grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  .field label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 700; }
  .field p { font-size: 13px; color: #1a2e29; margin-top: 1px; min-height: 16px; }
  .imc-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 16px; display: inline-flex; gap: 30px; margin-top: 8px; }
  .imc-box span { font-size: 11px; color: #64748b; }
  .imc-box strong { font-size: 18px; color: #059669; display: block; }
  .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; color: #94a3b8; font-size: 11px; }
  .obs { background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px; padding: 10px; font-size: 12px; line-height: 1.5; }
  @media print { body { padding: 10px; } }
</style>
</head>
<body>
<h1>Ficha de Anamnese Nutricional</h1>
<div class="sub">NutriVida · Dra. Camila Rocha (CRN-3 · 12345) · Gerado em ${now}</div>

<div class="section">
  <div class="section-title">Dados Pessoais</div>
  <div class="grid">
    <div class="field"><label>Nome</label><p>${d.nome}</p></div>
    <div class="field"><label>Nascimento</label><p>${d.nasc ? d.nasc.split('-').reverse().join('/') : '—'}</p></div>
    <div class="field"><label>Sexo</label><p>${d.sexo}</p></div>
    <div class="field"><label>Estado Civil</label><p>${d.civil}</p></div>
    <div class="field"><label>Escolaridade</label><p>${d.escolaridade}</p></div>
    <div class="field"><label>Profissão</label><p>${d.profissao}</p></div>
    <div class="field"><label>Telefone</label><p>${d.tel}</p></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Queixa Principal & Histórico</div>
  <div class="field" style="margin-bottom:8px"><label>Motivo da Consulta</label><p>${d.motivo}</p></div>
  <div class="grid">
    <div class="field"><label>Histórico de Doenças</label><p>${d.doencas || 'Nenhuma'}</p></div>
    <div class="field"><label>Medicamentos</label><p>${d.medicamentos || '—'}</p></div>
    <div class="field"><label>Suplementos</label><p>${d.suplementos || '—'}</p></div>
    <div class="field"><label>Alergias / Intolerâncias</label><p>${d.alergias || '—'}</p></div>
  </div>
  ${d.cirurgias ? `<div class="field" style="margin-top:6px"><label>Cirurgias</label><p>${d.cirurgias}</p></div>` : ''}
</div>

<div class="section">
  <div class="section-title">Hábitos Alimentares</div>
  <div class="grid grid-3">
    <div class="field"><label>Refeições/dia</label><p>${d.refeicoes}</p></div>
    <div class="field"><label>Apetite</label><p>${d.apetite}</p></div>
    <div class="field"><label>Mastigação</label><p>${d.mastigacao}</p></div>
    <div class="field"><label>Água (L/dia)</label><p>${d.agua}</p></div>
    <div class="field"><label>Álcool</label><p>${d.alcool}</p></div>
    <div class="field"><label>Come fora de casa</label><p>${d.foracasa}</p></div>
  </div>
  <div class="field" style="margin-top:6px"><label>Alimentos preferidos</label><p>${d.gosta}</p></div>
  <div class="field" style="margin-top:6px"><label>Restrições alimentares</label><p>${d.naogosta}</p></div>
</div>

<div class="section">
  <div class="section-title">Atividade Física & Sono</div>
  <div class="grid">
    <div class="field"><label>Pratica atividade</label><p>${d.atividade}</p></div>
    <div class="field"><label>Frequência</label><p>${d.freq}</p></div>
    <div class="field"><label>Tipo</label><p>${d.tipoativ || '—'}</p></div>
    <div class="field"><label>Horas de sono</label><p>${d.sono}h/noite</p></div>
    <div class="field"><label>Qualidade do sono</label><p>${d.qualidadesono}</p></div>
    <div class="field"><label>Nível de estresse</label><p>${d.estresse}</p></div>
  </div>
</div>

<div class="section">
  <div class="section-title">Dados Antropométricos</div>
  <div class="grid">
    <div class="field"><label>Peso Atual</label><p>${d.peso} kg</p></div>
    <div class="field"><label>Altura</label><p>${d.altura} m</p></div>
    <div class="field"><label>Peso Usual</label><p>${d.pesousal} kg</p></div>
    <div class="field"><label>Peso Meta</label><p>${d.pesometa} kg</p></div>
  </div>
  <div class="imc-box">
    <div><span>IMC</span><strong>${imc}</strong></div>
    <div><span>Objetivo</span><strong style="font-size:14px">${d.objetivo}</strong></div>
    <div><span>Plano</span><strong style="font-size:14px">${d.plano}</strong></div>
  </div>
</div>

${d.obs ? `<div class="section">
  <div class="section-title">Observações do Nutricionista</div>
  <div class="obs">${d.obs.replace(/\n/g, '<br>')}</div>
</div>` : ''}

${d.obsnutri ? `<div class="section">
  <div class="section-title">Conduta & Orientações</div>
  <div class="obs">${d.obsnutri.replace(/\n/g, '<br>')}</div>
</div>` : ''}

<div class="footer">
  <span>NutriVida · Sistema de Gestão Nutricional</span>
  <span>Última edição: ${d.ultimaEdicao || now}</span>
</div>
</body>
</html>`;

        const blob = new Blob([printHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'anamnese-' + d.nome.toLowerCase().replace(/\s+/g,'-') + '-' + now.replace(/\//g,'-') + '.html';
        a.click();
        URL.revokeObjectURL(url);
        toast('Anamnese exportada!');
    }

    // ── PREGAS CUTÂNEAS ──────────────────────────────────────────────
    function calcPregas() {
        const g = id => parseFloat(document.getElementById(id)?.value) || 0;
        const tri = g('pg-tri'), sub = g('pg-sub'), axi = g('pg-axi'),
              abd = g('pg-abd'), sil = g('pg-sil'), cox = g('pg-cox'),
              pei = g('pg-pei'), pan = g('pg-pan'), bic = g('pg-bic');
        const sexo  = document.getElementById('prega-sexo')?.value || 'F';
        const idade = parseFloat(document.getElementById('prega-idade')?.value) || 30;
        const proto = document.getElementById('prega-protocolo')?.value || 'guedes3';

        const soma = tri + sub + axi + abd + sil + cox + pei + pan + bic;

        let dc = 0; // densidade corporal
        let pctGordura = 0;

        if (proto === 'guedes3') {
            // GUEDES (1985) — 3 pregas: tricipital + suprailíaca + abdominal
            const s3 = tri + sil + abd;
            if (sexo === 'F') dc = 1.1470292 - 0.0009376*s3 + 0.0000030 * s3*s3 - 0.0001156*idade;
            else              dc = 1.1714836 - 0.0671966*Math.log10(s3) - 0.0002309*idade;
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'pollock3') {
            // POLLOCK 3 pregas: peitoral + abdominal + coxa (H) / tricipital + suprailíaca + coxa (F)
            if (sexo === 'F') {
                const s3 = tri + sil + cox;
                dc = 1.0994921 - 0.0009929*s3 + 0.0000023*s3*s3 - 0.0001392*idade;
            } else {
                const s3 = pei + abd + cox;
                dc = 1.1093800 - 0.0008267*s3 + 0.0000016*s3*s3 - 0.0002574*idade;
            }
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'pollock7') {
            // POLLOCK 7 pregas: peito + mid-axillar + tricipital + subescapular + abdominal + suprailíaca + coxa
            const s7 = pei + axi + tri + sub + abd + sil + cox;
            if (sexo === 'F') dc = 1.0970 - 0.00046971*s7 + 0.00000056*s7*s7 - 0.00012828*idade;
            else              dc = 1.1120 - 0.00043499*s7 + 0.00000055*s7*s7 - 0.00028826*idade;
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'petroski') {
            // PETROSKI (1995) — 4 pregas: tricipital + subescapular + suprailíaca + panturrilha
            const s4 = tri + sub + sil + pan;
            if (sexo === 'F') dc = 1.0324 - 0.00019077*s4 - 0.00000015*s4*s4 + 0.00000068*s4*idade - 0.0000011*s4*idade;
            else              dc = 1.0988 - 0.0004 * s4;
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'faulkner') {
            // FAULKNER (1968) — 4 pregas: tricipital + subescapular + suprailíaca + abdominal
            pctGordura = (tri + sub + sil + abd) * 0.153 + 5.783;
        }

        pctGordura = Math.max(0, Math.min(60, pctGordura));

        // Classificação por sexo (Lohman 1992)
        let cls, cor;
        if (sexo === 'F') {
            if      (pctGordura < 14)  { cls = 'Baixo';        cor = 'var(--blue)'; }
            else if (pctGordura < 21)  { cls = 'Adequado';      cor = 'var(--primary)'; }
            else if (pctGordura < 25)  { cls = 'Acima Média';   cor = 'var(--accent)'; }
            else if (pctGordura < 32)  { cls = 'Sobrepeso';     cor = 'var(--orange,#f97316)'; }
            else                       { cls = 'Obesidade';     cor = 'var(--red)'; }
        } else {
            if      (pctGordura < 6)   { cls = 'Baixo';        cor = 'var(--blue)'; }
            else if (pctGordura < 15)  { cls = 'Adequado';      cor = 'var(--primary)'; }
            else if (pctGordura < 20)  { cls = 'Acima Média';   cor = 'var(--accent)'; }
            else if (pctGordura < 25)  { cls = 'Sobrepeso';     cor = 'var(--orange,#f97316)'; }
            else                       { cls = 'Obesidade';     cor = 'var(--red)'; }
        }

        const somaEl = document.getElementById('pg-soma');
        const pctEl  = document.getElementById('pg-pct');
        const clsEl  = document.getElementById('pg-cls');
        if (somaEl) somaEl.textContent = soma;
        if (pctEl)  { pctEl.textContent = pctGordura.toFixed(2).replace('.', ',') + '%'; pctEl.style.color = cor; }
        if (clsEl)  { clsEl.textContent = cls; clsEl.style.color = cor; }
    }
    let alertaFiltroAtivo = 'all';
    function filterAlertas(btn, cat) {
        alertaFiltroAtivo = cat;
        btn.closest('.filter-tabs').querySelectorAll('.ftab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
        _applyAlertaFilter(cat);
    }
    function filterAlertasById(cat) {
        alertaFiltroAtivo = cat;
        document.querySelectorAll('#sec-alertas .ftab').forEach(t => {
            const oc = t.getAttribute('onclick') || '';
            t.classList.toggle('on', oc.includes("'" + cat + "'"));
        });
        _applyAlertaFilter(cat);
    }
    function _applyAlertaFilter(cat) {
        const items = document.querySelectorAll('.alerta-item');
        let visible = 0;
        items.forEach(item => {
            const show = cat === 'all'
                || (cat === 'crit' && item.classList.contains('alerta-crit'))
                || (cat === 'warn' && item.classList.contains('alerta-warn'))
                || (cat === 'info' && item.classList.contains('alerta-info'));
            item.style.display = show ? 'flex' : 'none';
            if (show) visible++;
        });
        const vazio = document.getElementById('alertas-vazio');
        if (vazio) vazio.style.display = visible === 0 ? 'block' : 'none';
    }
    function resolverAlerta(btn) {
        const card = btn.closest('.alert-card');
        card.style.transition = 'opacity 0.4s, transform 0.4s';
        card.style.opacity = '0'; card.style.transform = 'translateX(30px)';
        setTimeout(() => { card.remove(); _recountAlertas(); toast('Alerta resolvido!'); }, 400);
    }
    function _recountAlertas() {
        const crit = document.querySelectorAll('.alerta-crit').length;
        const warn = document.querySelectorAll('.alerta-warn').length;
        const info = document.querySelectorAll('.alerta-info').length;
        const total = crit + warn + info;
        const tabs = document.querySelectorAll('#sec-alertas .ftab');
        if (tabs[0]) tabs[0].textContent = 'Todos (' + total + ')';
        if (tabs[1]) tabs[1].innerHTML = '<span class=\"icon icon-alert\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg></span> Cr&#237;ticos (' + crit + ')';
        if (tabs[2]) tabs[2].innerHTML = '<span class=\"icon icon-warn\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"/></svg></span> Aten&#231;&#227;o (' + warn + ')';
        if (tabs[3]) tabs[3].innerHTML = '<span class=\"icon icon-blue\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/></svg></span> Info (' + info + ')';
        const bc = document.getElementById('badge-crit'); if (bc) bc.textContent = crit;
        const bw = document.getElementById('badge-warn'); if (bw) bw.textContent = warn;
        const bi = document.getElementById('badge-info'); if (bi) bi.textContent = info;
        _applyAlertaFilter(alertaFiltroAtivo);
    }

    // ── PACIENTES FILTER ──
    function filterPacientes(btn, cat) {
        btn.closest('.filter-tabs').querySelectorAll('.ftab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
        document.querySelectorAll('.pac-row').forEach(row => {
            const f = row.getAttribute('data-filter') || '';
            const show = cat === 'all'
                || (cat === 'premium' && f.includes('premium'))
                || (cat === 'intermediario' && f.includes('intermediario'))
                || (cat === 'basico' && f.includes('basico'))
                || (cat === 'alerta' && (f.includes('alerta') || f.includes('warn')));
            row.style.display = show ? 'grid' : 'none';
        });
    }

    // ── EXAMES ──
    let examesFiltro = 'bioquimica';
    let examesData = [
        { nome:'Glicose em Jejum', valor:'100', unidade:'mg/dL', refMin:'70', refMax:'99', cat:'bioquimica', data:'2019-08-11', obs:'Limítrofe - monitorar.', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'HbA1c', valor:'5,4', unidade:'%', refMin:'0', refMax:'5.7', cat:'bioquimica', data:'2019-08-11', obs:'', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'Insulina de Jejum', valor:'18', unidade:'µUI/mL', refMin:'2.6', refMax:'24.9', cat:'bioquimica', data:'2019-08-11', obs:'', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'Creatinina', valor:'0,9', unidade:'mg/dL', refMin:'0.7', refMax:'1.2', cat:'bioquimica', data:'2019-08-11', obs:'', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'Ácido Úrico', valor:'7,2', unidade:'mg/dL', refMin:'2.4', refMax:'6.0', cat:'bioquimica', data:'2019-08-11', obs:'Valor elevado. Orientar redução de purinas.', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'Vitamina D (25-OH)', valor:'22', unidade:'ng/mL', refMin:'30', refMax:'100', cat:'bioquimica', data:'2019-08-11', obs:'Insuficiência. Suplementar.', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'Ferro Sérico', valor:'88', unidade:'µg/dL', refMin:'60', refMax:'170', cat:'bioquimica', data:'2019-08-11', obs:'', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'TSH', valor:'2,1', unidade:'mUI/L', refMin:'0.4', refMax:'4.0', cat:'hormonal', data:'2019-08-11', obs:'', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'Hemoglobina', valor:'13,8', unidade:'g/dL', refMin:'12', refMax:'16', cat:'hemograma', data:'2019-08-11', obs:'', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
        { nome:'Colesterol Total', valor:'198', unidade:'mg/dL', refMin:'0', refMax:'200', cat:'lipidios', data:'2019-08-11', obs:'', criado:new Date('2019-08-11T10:00'), editado:new Date('2019-08-11T10:00') },
    ];

    function getStatus(ex) {
        const v = parseFloat(ex.valor.replace(',','.')), mn = parseFloat(ex.refMin), mx = parseFloat(ex.refMax);
        if (isNaN(v)||isNaN(mn)||isNaN(mx)) return 'ok';
        if (v < mn || v > mx) return 'bad';
        const m = (mx-mn)*0.15;
        if (v < mn+m || v > mx-m) return 'warn';
        return 'ok';
    }
    function statusIcon(s) {
        return s==='bad'?{flag:'ef-bad',icon:'!',valClass:'ev-bad'}:s==='warn'?{flag:'ef-warn',icon:'~',valClass:'ev-warn'}:{flag:'ef-ok',icon:'ok',valClass:'ev-ok'};
    }
    function fmtDataBR(d) {
        if (!d) return '—'; const [y,m,day]=d.split('-'); return day+'/'+m+'/'+y;
    }
    function renderExames() {
        const lista = document.getElementById('exames-lista');
        const alertasLista = document.getElementById('exames-alertas-lista');
        if (!lista) return;
        const filtered = examesData.filter(ex => examesFiltro==='all' || ex.cat===examesFiltro);
        lista.innerHTML = filtered.length===0 ? '<div style="text-align:center;padding:2rem;color:var(--text-muted)">Nenhum exame nesta categoria</div>' : filtered.map(ex => {
            const ri = examesData.indexOf(ex), st = getStatus(ex), si = statusIcon(st);
            const refStr = (ex.refMin==='0'&&ex.refMax==='0') ? '—' : ex.refMin.replace('.',',')+' – '+ex.refMax.replace('.',',');
            const metaStr = ex.editado.getTime()===ex.criado.getTime() ? 'Criado: '+fmtDate(ex.criado) : 'Editado: '+fmtDate(ex.editado);
            return '<div class="exame-row" style="grid-template-columns:2fr 0.9fr 0.9fr 0.6fr 0.7fr;display:grid;align-items:center"><div><div class="ex-name">'+ex.nome+'</div><div class="ex-date">'+fmtDataBR(ex.data)+' &nbsp;·&nbsp; <span style="color:var(--text-muted);font-size:0.65rem">'+metaStr+'</span></div>'+(ex.obs?'<div style="font-size:0.68rem;color:var(--text-muted);font-style:italic">'+ex.obs+'</div>':'')+'</div><div style="text-align:right"><div class="ex-val '+si.valClass+'">'+ex.valor+' '+ex.unidade+'</div><div class="ex-ref">'+refStr+'</div></div><div style="text-align:right;font-size:0.75rem;color:var(--text-muted)">'+ex.unidade+'</div><div style="display:flex;justify-content:center"><div class="ex-flag '+si.flag+'">'+si.icon+'</div></div><div style="display:flex;justify-content:center;gap:0.3rem"><button class="btn btn-ghost btn-sm" style="padding:0.3rem 0.6rem" onclick="editarExame('+ri+')" aria-label="Editar"><span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span></button><button class="btn btn-danger btn-sm" style="padding:0.3rem 0.6rem" onclick="excluirExame('+ri+')" aria-label="Excluir"><span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg></span></button></div></div>';
        }).join('');
        const alertados = examesData.filter(ex => getStatus(ex)!=='ok');
        if (alertasLista) alertasLista.innerHTML = alertados.length===0 ? '<div style="color:var(--primary);font-size:0.82rem">Todos os valores dentro do referencial</div>' : alertados.map(ex => {
            const st=getStatus(ex), cls=st==='bad'?'ac-crit':'ac-warn', cor=st==='bad'?'var(--red)':'var(--accent)', icon=st==='bad'?'crit':'warn', v=parseFloat(ex.valor.replace(',','.')), mx=parseFloat(ex.refMax), dir=v>mx?'ALTO':'BAIXO';
            return '<div class="alert-card '+cls+'" style="margin-bottom:0.5rem"><div class="alert-icon" style="font-size:1rem">'+icon+'</div><div><div class="alert-title" style="color:'+cor+';font-size:0.82rem">'+ex.nome+' — '+dir+'</div><div class="alert-desc" style="font-size:0.72rem">'+ex.valor+' '+ex.unidade+' (Ref: '+ex.refMin+'–'+ex.refMax+')</div></div></div>';
        }).join('');
    }
    function filterExames(btn, cat) {
        examesFiltro = cat;
        document.querySelectorAll('.exame-cat-btn').forEach(b => b.className='btn btn-ghost btn-sm exame-cat-btn');
        btn.className='btn btn-primary btn-sm exame-cat-btn';
        renderExames();
    }
    function openExameModal() {
        document.getElementById('exame-edit-idx').value='';
        ['ef-nome','ef-valor','ef-unidade','ef-refmin','ef-refmax','ef-obs'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
        document.getElementById('ef-data').value=new Date().toISOString().split('T')[0];
        document.getElementById('exame-form-title').innerHTML='<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span> Registrar Resultado';
        document.getElementById('exame-form-meta').style.display='none';
        document.getElementById('exame-cancel-btn').style.display='none';
        document.getElementById('ef-nome').focus();
    }
    function editarExame(idx) {
        const ex=examesData[idx];
        document.getElementById('exame-edit-idx').value=idx;
        document.getElementById('ef-nome').value=ex.nome;
        document.getElementById('ef-valor').value=ex.valor;
        document.getElementById('ef-unidade').value=ex.unidade;
        document.getElementById('ef-refmin').value=ex.refMin;
        document.getElementById('ef-refmax').value=ex.refMax;
        document.getElementById('ef-cat').value=ex.cat;
        document.getElementById('ef-data').value=ex.data;
        document.getElementById('ef-obs').value=ex.obs;
        document.getElementById('exame-form-title').innerHTML='<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span> Editar Exame';
        const meta=document.getElementById('exame-form-meta');
        meta.style.display='block';
        meta.innerHTML='Criado: '+fmtDate(ex.criado)+' &nbsp;·&nbsp; Editado: '+fmtDate(ex.editado);
        document.getElementById('exame-cancel-btn').style.display='inline-flex';
        document.getElementById('ef-nome').scrollIntoView({behavior:'smooth',block:'center'});
        document.getElementById('ef-nome').focus();
    }
    function cancelarEditarExame() {
        document.getElementById('exame-edit-idx').value='';
        document.getElementById('exame-form-title').innerHTML='<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span> Registrar Resultado';
        document.getElementById('exame-form-meta').style.display='none';
        document.getElementById('exame-cancel-btn').style.display='none';
        ['ef-nome','ef-valor','ef-unidade','ef-refmin','ef-refmax','ef-obs'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    }
    function salvarExame() {
        const nome=document.getElementById('ef-nome').value.trim();
        if (!nome) { toast('Informe o nome do exame','error'); return; }
        const idx=document.getElementById('exame-edit-idx').value, now=new Date();
        const obj={nome, valor:document.getElementById('ef-valor').value.trim(), unidade:document.getElementById('ef-unidade').value.trim(), refMin:document.getElementById('ef-refmin').value.trim(), refMax:document.getElementById('ef-refmax').value.trim(), cat:document.getElementById('ef-cat').value, data:document.getElementById('ef-data').value, obs:document.getElementById('ef-obs').value.trim()};
        if (idx!=='') { obj.criado=examesData[parseInt(idx)].criado; obj.editado=now; examesData[parseInt(idx)]=obj; toast('Exame atualizado!'); }
        else { obj.criado=now; obj.editado=now; examesData.push(obj); toast('Exame registrado!'); }
        const meta=document.getElementById('exame-form-meta');
        meta.style.display='block';
        meta.innerHTML='Criado: '+fmtDate(obj.criado)+' &nbsp;·&nbsp; <strong style="color:var(--primary)">Editado: '+fmtDate(obj.editado)+'</strong>';
        cancelarEditarExame(); renderExames();
    }
    function excluirExame(idx) {
        if (!confirm('Remover este exame?')) return;
        examesData.splice(idx,1); renderExames(); toast('Exame removido!');
    }

    let historicoData = [];

function agendaAba(btn, aba) {
    document.querySelectorAll('#sec-agenda .filter-tabs .ftab').forEach(t => t.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('agenda-aba-agenda').style.display    = aba === 'agenda'    ? '' : 'none';
    document.getElementById('agenda-aba-historico').style.display = aba === 'historico' ? '' : 'none';
    if (aba === 'historico') carregarHistorico();
}

function renderHistorico() {
    const filPac  = document.getElementById('hist-pac').value;
    const filTipo = document.getElementById('hist-tipo').value;
    const filMes  = document.getElementById('hist-mes').value;
    const mesesMap = { 'Fevereiro':'02/2026', 'Janeiro':'01/2026', 'Dezembro':'12/2025' };

    const filtrado = historicoData.filter(c => {
        if (filPac  && c.pac  !== filPac)  return false;
        if (filTipo && c.tipo !== filTipo) return false;
        if (filMes  && !c.data.includes(mesesMap[filMes])) return false;
        return true;
    });

    document.getElementById('hist-count').textContent = filtrado.length + ' consulta' + (filtrado.length !== 1 ? 's' : '');

    const lista = document.getElementById('hist-lista');
    if (!filtrado.length) {
        lista.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted)">Nenhuma consulta encontrada</div>';
        return;
    }

    lista.innerHTML = filtrado.map(c => {
        const stClass = c.status === 'realizada' ? 's-ok' : c.status === 'faltou' ? 's-alert' : 's-warn';
        const stLabel = c.status === 'realizada' ? 'Realizada' : c.status === 'faltou' ? 'Faltou' : 'Cancelada';
        return `<div class="agenda-item" style="display:grid;grid-template-columns:100px 1fr 160px 110px 90px;gap:0.5rem;align-items:center;cursor:default">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.78rem;color:var(--primary);font-weight:700;line-height:1.4">
                ${c.data}<br><span style="color:var(--text-muted);font-weight:400">${c.hora}</span>
            </div>
            <div>
                <div style="display:flex;align-items:center;gap:0.5rem">
                    <div class="ag-dot" style="background:${c.dot};flex-shrink:0"></div>
                    <div class="ag-name">${c.pac}</div>
                </div>
                <div class="ag-type">${c.desc}</div>
            </div>
            <div style="font-size:0.82rem;color:var(--text-dim)">${c.tipo}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);font-family:'JetBrains Mono',monospace">${c.dur}</div>
            <div style="text-align:center"><span class="status ${stClass}">${stLabel}</span></div>
        </div>`;
    }).join('');
}

    // ── INIT ──
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelectorAll('.prog-fill[data-w]').forEach(bar => {
                bar.style.width = bar.getAttribute('data-w');
            });
        }, 500);
        loadAnamnese('ana');
        renderExames();
        calcPregas();
    });
