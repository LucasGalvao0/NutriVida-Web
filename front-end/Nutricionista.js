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
        if (id === 'prontuario') { renderExames(); carregarExames(); }
        closeSidebar();
    }

    // ── PRONTUÁRIO ──
    function prontAba(btn, aba) {
        document.querySelectorAll('#sec-prontuario .filter-tabs .ftab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
        document.querySelectorAll('.pront-aba').forEach(el => el.style.display = 'none');
        document.getElementById('pront-aba-' + aba).style.display = '';
        if (aba === 'exames') { renderExames(); carregarExames(); }
        if (aba === 'paciente') prontPrevia();
    }

    // Monta o HTML da tela do paciente
    function montarConteudoPaciente() {
        const nome = document.getElementById('an-nome')?.value || 'Paciente';
        const nomeCurto = nome.split(' ')[0];
        const sit   = (document.getElementById('pac-situacao')?.value || '').trim();
        const passos = (document.getElementById('pac-passos')?.value || '').trim();
        const exames = (document.getElementById('pac-exames-resumo')?.value || '').trim();
        const now   = new Date().toLocaleDateString('pt-BR', {day:'2-digit',month:'long',year:'numeric'});

        let html = '';

        if (sit) {
            html += `<div class="tp-card">
                <div class="tp-card-titulo">💬 Um recado da sua nutricionista</div>
                <p class="tp-texto">${sit.replace(/\n/g,'<br>')}</p>
            </div>`;
        }

        if (exames) {
            html += `<div class="tp-card">
                <div class="tp-card-titulo">🔬 O que seus exames mostram</div>
                <p class="tp-texto">${exames.replace(/\n/g,'<br>')}</p>
            </div>`;
        }

        if (passos) {
            const linhas = passos.split('\n').map(l=>l.trim()).filter(l=>l);
            html += `<div class="tp-card"><div class="tp-card-titulo">📋 O que fazer agora</div>`;
            linhas.forEach((linha, i) => {
                const txt = linha.replace(/^[·\-\*]\s*/, '');
                if (txt) html += `<div class="tp-passo"><div class="tp-passo-num">${i+1}</div><p class="tp-texto" style="margin:0;font-size:0.9rem">${txt}</p></div>`;
            });
            html += `</div>`;
        }

        if (!html) {
            html = '<p style="color:#5a7a74;font-style:italic;text-align:center;padding:2.5rem 0">Preencha os campos ao lado para ver a prévia aqui...</p>';
        }

        return { html, nome, nomeCurto, now };
    }

    function prontPrevia() {
        const { html, nome, now } = montarConteudoPaciente();
        const pn = document.getElementById('prev-nome');
        const pd = document.getElementById('prev-data');
        const pc = document.getElementById('prev-corpo');
        if (pn) pn.textContent = nome;
        if (pd) pd.textContent = now;
        if (pc) pc.innerHTML = html;
        const badge = document.getElementById('ptab-badge');
        const temConteudo = html.includes('tp-card');
        if (badge) badge.style.display = temConteudo ? '' : 'none';
    }

    function abrirTelaPaciente() {
    // Salva os dados temporariamente no localStorage para a página de resumo ler
    const dados = {
        pac_situacao: document.getElementById('pac-situacao')?.value || '',
        pac_exames_resumo: document.getElementById('pac-exames-resumo')?.value || '',
        pac_passos: document.getElementById('pac-passos')?.value || '',
        nutricionista_nome: document.getElementById('nutriNome')?.textContent || 'Nutricionista',
        nutricionista_crn: document.getElementById('nutriCrn')?.textContent || '',
        atualizado_em: new Date().toISOString()
    };

    // Verifica se tem conteúdo
    if (!dados.pac_situacao && !dados.pac_exames_resumo && !dados.pac_passos) {
        toast('Preencha pelo menos um campo antes de visualizar!', 'error');
        return;
    }

    localStorage.setItem('previa_resumo', JSON.stringify(dados));
    window.open('resumoConsulta.html?previa=true', '_blank');
}

    function fecharTelaPaciente() {
        document.getElementById('tela-paciente').style.display = 'none';
        document.body.style.overflow = '';
    }

    function exportarAnamnese() {
        toast('Funcionalidade em desenvolvimento!');
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
            const grupo = el.closest('.semi-grid');
            if (grupo) {
                grupo.querySelectorAll('.semi-chip').forEach(c => c.classList.remove('on','on-warn','on-bad'));
            }
            el.classList.add('on');
            calcRisco();
        } else {
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
                const pts = sel.dataset.pts !== undefined
                    ? parseInt(sel.dataset.pts)
                    : (() => { const m = sel.textContent.match(/\((\d+)\s*pts?\)/); return m ? parseInt(m[1]) : 0; })();
                total += pts;
            }
        });
        const pontuacaoEl = risco.querySelector('.man-score');
        const classEl = risco.querySelector('.man-class');
        if (!pontuacaoEl || !classEl) return;
        pontuacaoEl.textContent = total + ' pts';
        let cls, cor, statusCls;
        if (total >= 12)     { cls = 'Sem Risco';      cor = 'var(--primary)'; statusCls = 'status s-ok'; }
        else if (total >= 8) { cls = 'Risco Moderado'; cor = 'var(--accent)';  statusCls = 'status s-warn'; }
        else                 { cls = 'Risco Alto';      cor = 'var(--red)';     statusCls = 'status s-alert'; }
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

    // ── PREGAS CUTÂNEAS ──
    function calcPregas() {
        const g = id => parseFloat(document.getElementById(id)?.value) || 0;
        const tri = g('pg-tri'), sub = g('pg-sub'), axi = g('pg-axi'),
              abd = g('pg-abd'), sil = g('pg-sil'), cox = g('pg-cox'),
              pei = g('pg-pei'), pan = g('pg-pan'), bic = g('pg-bic');
        const sexo  = document.getElementById('prega-sexo')?.value || 'F';
        const idade = parseFloat(document.getElementById('prega-idade')?.value) || 30;
        const proto = document.getElementById('prega-protocolo')?.value || 'guedes3';
        const soma = tri + sub + axi + abd + sil + cox + pei + pan + bic;
        let dc = 0, pctGordura = 0;
        if (proto === 'guedes3') {
            const s3 = tri + sil + abd;
            if (sexo === 'F') dc = 1.1470292 - 0.0009376*s3 + 0.0000030 * s3*s3 - 0.0001156*idade;
            else              dc = 1.1714836 - 0.0671966*Math.log10(s3) - 0.0002309*idade;
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'pollock3') {
            if (sexo === 'F') { const s3 = tri + sil + cox; dc = 1.0994921 - 0.0009929*s3 + 0.0000023*s3*s3 - 0.0001392*idade; }
            else              { const s3 = pei + abd + cox; dc = 1.1093800 - 0.0008267*s3 + 0.0000016*s3*s3 - 0.0002574*idade; }
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'pollock7') {
            const s7 = pei + axi + tri + sub + abd + sil + cox;
            if (sexo === 'F') dc = 1.0970 - 0.00046971*s7 + 0.00000056*s7*s7 - 0.00012828*idade;
            else              dc = 1.1120 - 0.00043499*s7 + 0.00000055*s7*s7 - 0.00028826*idade;
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'petroski') {
            const s4 = tri + sub + sil + pan;
            if (sexo === 'F') dc = 1.0324 - 0.00019077*s4 - 0.00000015*s4*s4 + 0.00000068*s4*idade - 0.0000011*s4*idade;
            else              dc = 1.0988 - 0.0004 * s4;
            pctGordura = ((4.95 / dc) - 4.50) * 100;
        } else if (proto === 'faulkner') {
            pctGordura = (tri + sub + sil + abd) * 0.153 + 5.783;
        }
        pctGordura = Math.max(0, Math.min(60, pctGordura));
        let cls, cor;
        if (sexo === 'F') {
            if      (pctGordura < 14) { cls = 'Baixo';       cor = 'var(--blue)'; }
            else if (pctGordura < 21) { cls = 'Adequado';     cor = 'var(--primary)'; }
            else if (pctGordura < 25) { cls = 'Acima Média';  cor = 'var(--accent)'; }
            else if (pctGordura < 32) { cls = 'Sobrepeso';    cor = 'var(--orange,#f97316)'; }
            else                      { cls = 'Obesidade';    cor = 'var(--red)'; }
        } else {
            if      (pctGordura < 6)  { cls = 'Baixo';       cor = 'var(--blue)'; }
            else if (pctGordura < 15) { cls = 'Adequado';     cor = 'var(--primary)'; }
            else if (pctGordura < 20) { cls = 'Acima Média';  cor = 'var(--accent)'; }
            else if (pctGordura < 25) { cls = 'Sobrepeso';    cor = 'var(--orange,#f97316)'; }
            else                      { cls = 'Obesidade';    cor = 'var(--red)'; }
        }
        const somaEl = document.getElementById('pg-soma');
        const pctEl  = document.getElementById('pg-pct');
        const clsEl  = document.getElementById('pg-cls');
        if (somaEl) somaEl.textContent = soma;
        if (pctEl)  { pctEl.textContent = pctGordura.toFixed(2).replace('.', ',') + '%'; pctEl.style.color = cor; }
        if (clsEl)  { clsEl.textContent = cls; clsEl.style.color = cor; }
    }

    // ── ALERTAS ──
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
        if (tabs[1]) tabs[1].innerHTML = '<span class="icon icon-alert"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span> Críticos (' + crit + ')';
        if (tabs[2]) tabs[2].innerHTML = '<span class="icon icon-warn"><svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span> Atenção (' + warn + ')';
        if (tabs[3]) tabs[3].innerHTML = '<span class="icon icon-blue"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span> Info (' + info + ')';
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
    let examesData = [];
    let exameEditandoId = null;

    function getStatus(ex) {
        const v = parseFloat(String(ex.valor).replace(',','.')),
              mn = parseFloat(ex.ref_min || ex.refMin),
              mx = parseFloat(ex.ref_max || ex.refMax);
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

    async function carregarExames() {
        const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));
        const select = document.getElementById("pront-pac-select");
        const usuarioId = select?.value;
        if (!usuarioId) { examesData = []; renderExames(); return; }
        try {
            const res = await fetch(`http://localhost:3000/exames/paciente/${usuarioId}/${usuario.id}`);
            examesData = await res.json();
            renderExames();
        } catch (err) { console.error(err); }
    }

    async function salvarExame() {
        const usuario = JSON.parse(localStorage.getItem("dadosUsuario"));
        const select = document.getElementById("pront-pac-select");
        const usuarioId = select?.value;
        if (!usuarioId) { toast("Selecione um paciente primeiro!", "error"); return; }
        const nome = document.getElementById("ef-nome").value.trim();
        const valor = document.getElementById("ef-valor").value.trim();
        if (!nome || !valor) { toast("Preencha nome e valor!", "error"); return; }
        const body = {
            usuario_id: usuarioId,
            nutricionista_id: usuario.id,
            nome, valor,
            unidade: document.getElementById("ef-unidade").value.trim(),
            ref_min: document.getElementById("ef-refmin").value.trim(),
            ref_max: document.getElementById("ef-refmax").value.trim(),
            categoria: document.getElementById("ef-cat").value,
            data: document.getElementById("ef-data").value,
            obs: ""
        };
        try {
            if (exameEditandoId) {
                await fetch(`http://localhost:3000/exames/${exameEditandoId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
                toast("Exame atualizado!");
            } else {
                await fetch(`http://localhost:3000/exames`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
                toast("Exame registrado!");
            }
            cancelarEditarExame();
            carregarExames();
        } catch (err) { toast("Erro ao salvar exame.", "error"); }
    }

    function editarExame(id) {
        const ex = examesData.find(e => e.id === id);
        if (!ex) return;
        exameEditandoId = id;
        document.getElementById("ef-nome").value = ex.nome;
        document.getElementById("ef-valor").value = ex.valor;
        document.getElementById("ef-unidade").value = ex.unidade || "";
        document.getElementById("ef-refmin").value = ex.ref_min || "";
        document.getElementById("ef-refmax").value = ex.ref_max || "";
        document.getElementById("ef-cat").value = ex.categoria || "bioquimica";
        document.getElementById("ef-data").value = ex.data?.split("T")[0] || "";
        document.getElementById("exame-form-title").innerHTML = `<span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span> Editar Exame`;
        document.getElementById("exame-cancel-btn").style.display = "inline-flex";
        document.getElementById("ef-nome").scrollIntoView({ behavior: "smooth" });
    }

    function cancelarEditarExame() {
        exameEditandoId = null;
        ["ef-nome","ef-valor","ef-unidade","ef-refmin","ef-refmax"].forEach(id => { const el = document.getElementById(id); if (el) el.value = ""; });
        document.getElementById("ef-cat").selectedIndex = 0;
        document.getElementById("exame-form-title").innerHTML = `<span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span> Registrar Resultado`;
        document.getElementById("exame-cancel-btn").style.display = "none";
    }

    async function excluirExame(id) {
        if (!confirm("Remover este exame?")) return;
        try {
            await fetch(`http://localhost:3000/exames/${id}`, { method: "DELETE" });
            toast("Exame removido!");
            carregarExames();
        } catch (err) { toast("Erro ao remover.", "error"); }
    }

    function renderExames() {
        const lista = document.getElementById("exames-lista");
        const alertasLista = document.getElementById("exames-alertas-lista");
        const alertasBox = document.getElementById("exames-alertas-box");
        if (!lista) return;

        const filtered = examesFiltro === "all" ? examesData : examesData.filter(ex => ex.categoria === examesFiltro);

        if (!filtered.length) {
            lista.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--text-muted)">Nenhum exame nesta categoria</div>`;
            if (alertasBox) alertasBox.style.display = "none";
            return;
        }

        lista.innerHTML = filtered.map(ex => {
            const st = getStatus(ex), si = statusIcon(st);
            const data = ex.data ? new Date(ex.data).toLocaleDateString("pt-BR") : "—";
            const criado = ex.criado_em ? new Date(ex.criado_em).toLocaleDateString("pt-BR") + " às " + new Date(ex.criado_em).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "—";
            const refStr = ex.ref_min && ex.ref_max ? `${ex.ref_min} – ${ex.ref_max}` : "—";
            return `<div class="exame-row" style="display:grid;grid-template-columns:2fr 0.9fr 0.9fr 0.6fr 0.7fr;align-items:center">
                <div>
                    <div class="ex-name">${ex.nome}</div>
                    <div class="ex-date">${data} · Criado: ${criado}</div>
                </div>
                <div style="text-align:right">
                    <div class="ex-val ${si.valClass}">${ex.valor} ${ex.unidade || ""}</div>
                    <div class="ex-ref">${refStr}</div>
                </div>
                <div style="text-align:right;font-size:0.75rem;color:var(--text-muted)">${ex.unidade || ""}</div>
                <div style="display:flex;justify-content:center"><div class="ex-flag ${si.flag}">${si.icon}</div></div>
                <div style="display:flex;justify-content:center;gap:0.3rem">
                    <button class="btn btn-ghost btn-sm" style="padding:0.3rem 0.6rem" onclick="editarExame(${ex.id})">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="btn btn-danger btn-sm" style="padding:0.3rem 0.6rem" onclick="excluirExame(${ex.id})">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                </div>
            </div>`;
        }).join("");

        const alertados = examesData.filter(ex => getStatus(ex) !== "ok");
        if (alertasLista) {
            alertasLista.innerHTML = alertados.length === 0
                ? `<div style="color:var(--primary);font-size:0.82rem">Todos os valores dentro do referencial</div>`
                : alertados.map(ex => {
                    const st = getStatus(ex), cls = st === "bad" ? "ac-crit" : "ac-warn";
                    const cor = st === "bad" ? "var(--red)" : "var(--accent)";
                    const icon = st === "bad" ? "crit" : "warn";
                    const v = parseFloat(String(ex.valor).replace(",", "."));
                    const mx = parseFloat(ex.ref_max);
                    const dir = v > mx ? "ALTO" : "BAIXO";
                    return `<div class="alert-card ${cls}" style="margin-bottom:0.5rem">
                        <div class="alert-icon">${icon}</div>
                        <div>
                            <div class="alert-title" style="color:${cor};font-size:0.82rem">${ex.nome} — ${dir}</div>
                            <div class="alert-desc" style="font-size:0.72rem">${ex.valor} ${ex.unidade || ""} (Ref: ${ex.ref_min}–${ex.ref_max})</div>
                        </div>
                    </div>`;
                }).join("");
            if (alertasBox) alertasBox.style.display = alertados.length ? "block" : "none";
        }
    }

    function filterExames(btn, cat) {
        examesFiltro = cat;
        document.querySelectorAll(".exame-cat-btn").forEach(b => b.className = "btn btn-ghost btn-sm exame-cat-btn");
        btn.className = "btn btn-primary btn-sm exame-cat-btn";
        renderExames();
    }

    // ── HISTÓRICO ──
    let historicoData = [];

    function agendaAba(btn, aba) {
        document.querySelectorAll('#sec-agenda .filter-tabs .ftab').forEach(t => t.classList.remove('on'));
        btn.classList.add('on');
        document.getElementById('agenda-aba-agenda').style.display    = aba === 'agenda'    ? '' : 'none';
        document.getElementById('agenda-aba-historico').style.display = aba === 'historico' ? '' : 'none';
        if (aba === 'historico') carregarHistorico();
    }

    function renderHistorico() {
        const filPac  = document.getElementById('hist-pac')?.value || '';
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
        renderExames();
        calcPregas();
    });