<!-- Instruções concisas para agentes AI (Copilot / assistants) trabalharem neste repositório -->
# Guia rápido para agentes AI

Objetivo: permitir que um agente AI entenda rapidamente a arquitetura, convenções e pontos críticos deste projeto para editar, debugar e estender a aplicação de forma segura e produtiva.

**Arquitetura (big picture)**
- **Tipo:** Single‑page static web app (HTML/CSS/JS) com persistência via `localStorage`.
- **Entrada principal:** [index.html](../index.html) — carrega estilos e scripts na ordem esperada (importante manter a ordem de scripts).
- **Controlador global:** variável global `AppState` em `Js/app.js` mantém estado runtime (currentUser, characters, notes, currentPage).
- **Módulos JS:** scripts em `Js/` organizam responsabilidades: `app.js` (controller + navegação), `characters.js` (CRUD de fichas), `templates.js` (templates de sistema), `notes.js` (diário/anotações), `dice.js` (rolador), `pdf.js` (exportação usando jsPDF).

**Fluxos de dados e decisões importantes**
- Persistência: chaves `localStorage`: `userProfile`, `characters`, `notes`. Alterações no estado geralmente atualizam `AppState` e chamam `save*ToStorage()`.
- Modelos de dados: cada personagem tem `{ id, name, system, class, level, customFields[], notes, createdAt, updatedAt }`. `customFields` = array de `{ id, name, type, value }` (tipos: text, number, textarea, checkbox, dice).
- Export PDF: `Js/pdf.js` usa `window.jspdf` (jsPDF carregado via CDN no head de `index.html`) — mantenha este script antes de chamá‑lo se modificar carregamento.

**Conveniências e padrões do projeto**
- Código orientado a DOM e mutação direta de `AppState` (não há bundler, frameworks, nem módulos ES). Evite transformar em módulos sem ajustar `index.html`.
- Event handlers: mistura de `addEventListener` (em `app.js`) e `onclick` inline no HTML — preserve ambos ao alterar elementos existentes.
- Idioma: UI e strings estão em pt-BR.

**Como executar / depurar localmente**
- Não há build. Abra `index.html` no navegador ou sirva via um servidor HTTP simples (recomendado para evitar bloqueios de recursos/CDN):

```powershell
# Python (Windows)
py -m http.server 8000
# Ou, se usar Python direto:
python -m http.server 8000
# Em seguida, abra http://localhost:8000
```

- Verificações rápidas:
  - Console DevTools → erros JS (mensagens de `showNotification` auxiliam).  
  - `localStorage` no DevTools → chaves acima para inspecionar dados.  
  - PDF: confirmar que `https://cdnjs.cloudflare.com/ajax/libs/jspdf/...` carrega sem erros (network tab).

**Pontos frágeis / armadilhas conhecidas**
- `localStorage` tem cota: salvar arquivos binários grandes (ex.: base64 de PDFs/imagens em `characters.externalFile`) pode estourar o limite do navegador.
- Ordem de carregamento dos scripts em `index.html` é crítica — `app.js` define `AppState` e funções usadas por outros scripts.
- Mistura de nomes de diretório sensíveis a maiúsculas/minúsculas no repositório (ex.: `Css/` vs `css/`) não causa erro no Windows, mas pode causar problemas em servidores Linux/CI.

**Como estender / exemplos rápidos**
- Adicionar um novo template: editar `Js/templates.js` e inserir um novo objeto em `CharacterTemplates`. Exemplo:

```javascript
CharacterTemplates['meuSistema'] = {
  name: 'Meu Sistema',
  system: 'Meu Sistema v1',
  fields: [ { name: 'AtributoX', type: 'number', value: 0 } ]
};
```

- Adicionar comportamento ao salvar personagem: preferir usar `saveCharactersToStorage()` (em `Js/app.js`) em vez de manipular `localStorage` diretamente.

**Integrações externas**
- jsPDF (CDN) — exportação PDF: `Js/pdf.js` depende de `window.jspdf`.
- Font Awesome e Google Fonts são carregados via CDN no head.

**Testes e validação**
- Não existem testes automatizados. Validação manual típica:
  - criar/editar/excluir personagem e checar `localStorage`;
  - importar/exportar JSON e PDF;
  - verificar histórico de rolagens no `diceHistory`.

**Regras de contribuição rápida (para agentes)**
- Preserve comportamentos globais: não modularize nem renomeie `AppState` sem atualizar `index.html` e scripts que dependem dele.
- Mantenha strings pt-BR ao alterar UI.
- Ao adicionar novas dependências (CDN ou libs), atualize `index.html` e verifique carregamento via HTTP local.

Se quiser, aplico um rascunho de atualização de `index.html` para padronizar `css/` vs `Css/`, ou crio testes básicos. Feedback sobre trechos pouco claros? Diga qual parte você quer que eu detalhe.
