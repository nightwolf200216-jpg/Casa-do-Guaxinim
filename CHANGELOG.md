# 📋 Changelog - RPG Character Vault

Todas as mudanças notáveis do projeto serão documentadas neste arquivo.

---

## [1.0.0] - 2026-01-27

### 🎉 Lançamento Inicial

#### ✨ Funcionalidades Implementadas

**Sistema de Fichas**
- ✅ Criação de fichas personalizadas do zero
- ✅ Editor visual com campos dinâmicos
- ✅ Suporte para qualquer sistema de RPG
- ✅ 5 tipos de campos: texto, número, textarea, checkbox, dice
- ✅ Reordenação de campos (drag-like com setas)
- ✅ Preview em tempo real
- ✅ Validação de dados
- ✅ Sistema de IDs únicos

**Templates de Sistemas**
- ✅ D&D 5ª Edição (completo com atributos, perícias, magias)
- ✅ Pathfinder 2e (ancestralidade, heranças, talentos)
- ✅ Call of Cthulhu 7th Ed (sanidade, ocupações)
- ✅ Template Genérico (adaptável)
- ✅ Sistema de exportação de templates
- ✅ Sistema de importação de templates

**Gerenciamento de Fichas**
- ✅ Dashboard com estatísticas
- ✅ Visualização em grid responsivo
- ✅ Busca por nome, classe ou sistema
- ✅ Filtro por sistema de RPG
- ✅ Visualização detalhada de fichas
- ✅ Edição de fichas existentes
- ✅ Sistema de anotações por ficha
- ✅ Histórico de criação/atualização

**Exportação e Importação**
- ✅ Exportação para PDF com design profissional
- ✅ Exportação individual em JSON (backup)
- ✅ Importação de fichas JSON
- ✅ Upload de fichas externas (PDF/imagem)
- ✅ Exportação em lote (todos os personagens)

**Sistema de Anotações**
- ✅ 5 tipos de anotações: Sessão, Geral, Quest, NPC, Local
- ✅ Vinculação com personagens
- ✅ Editor de texto longo
- ✅ Visualização organizada
- ✅ Busca em anotações
- ✅ Exportação em Markdown
- ✅ Timestamps automáticos

**Rolador de Dados**
- ✅ Suporte para d4, d6, d8, d10, d12, d20, d100
- ✅ Interface visual animada
- ✅ Histórico das últimas 20 rolagens
- ✅ Atalho de teclado (Ctrl/Cmd + D)
- ✅ Timestamp em cada rolagem
- ✅ Modal dedicado

**Sistema de Perfil**
- ✅ Perfil de jogador personalizável
- ✅ Nome, bio, sistemas favoritos
- ✅ Estatísticas automáticas
- ✅ Data de cadastro
- ✅ Contador de personagens, anotações, sessões

**Interface e Design**
- ✅ Tema dark fantasy (inspirado em D&D Beyond/Roll20)
- ✅ Paleta de cores medieval (dourado, vermelho, escuro)
- ✅ Design responsivo (desktop e mobile)
- ✅ Sidebar colapsável
- ✅ Modais para edição
- ✅ Animações suaves (fade, bounce, slide)
- ✅ Font Awesome icons
- ✅ Google Fonts (Cinzel + Roboto)
- ✅ Scrollbar personalizada

**Armazenamento**
- ✅ LocalStorage para persistência
- ✅ Estrutura JSON organizada
- ✅ Sistema de IDs únicos (timestamp + random)
- ✅ Timestamps automáticos (created/updated)

#### 📁 Arquivos do Projeto

```
rpg-character-vault/
├── index.html              # Página principal (21KB)
├── README.md               # Documentação completa (8KB)
├── GUIA_RAPIDO.md         # Guia de início rápido (7KB)
├── EXEMPLOS.md            # Exemplos práticos (9KB)
├── CHANGELOG.md           # Este arquivo
├── css/
│   └── style.css          # Estilos completos (21KB)
└── js/
    ├── app.js             # Controlador principal (13KB)
    ├── characters.js      # Gerenciamento de fichas (14KB)
    ├── templates.js       # Sistema de templates (10KB)
    ├── notes.js           # Sistema de anotações (11KB)
    ├── dice.js           # Rolador de dados (6KB)
    └── pdf.js            # Exportação PDF (12KB)
```

**Total: ~132KB de código**

#### 🎨 Design System

**Cores:**
- Background Dark: `#0a0e17`
- Background Secondary: `#151922`
- Card Background: `#1a1f2e`
- Accent Gold: `#d4af37`
- Accent Red: `#8b0000`
- Accent Orange: `#ff6b35`
- Text Primary: `#e8e6e3`

**Tipografia:**
- Display: Cinzel (títulos, headers)
- Body: Roboto (texto geral)

**Componentes:**
- Cards com bordas e sombras
- Botões com hover effects
- Inputs com focus states
- Modais com backdrop blur
- Grades responsivas

#### 🔧 Tecnologias

- HTML5 (semântico)
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+ (Classes, Arrow Functions, Async/Await)
- jsPDF 2.5.1 (geração de PDF)
- Font Awesome 6.4.0 (ícones)
- Google Fonts (tipografia)
- LocalStorage API (persistência)

#### 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+
- ✅ Mobile (iOS 14+, Android 10+)

#### 🐛 Bugs Conhecidos

Nenhum bug conhecido no lançamento.

#### ⚠️ Limitações Conhecidas

1. **LocalStorage:** Dados ficam apenas no navegador local
2. **Tamanho:** Limite de ~10MB no localStorage
3. **Backup:** Usuário deve fazer backup manual
4. **Offline:** Funciona offline, mas CDNs precisam ser carregados primeiro
5. **PDF:** Limitado pelas capacidades do jsPDF

---

## 🔮 Próximas Versões

### [1.1.0] - Planejado

**Melhorias de Dados:**
- [ ] Rolagem com vantagem/desvantagem
- [ ] Fórmulas de dados (2d20+5)
- [ ] Salvamento automático
- [ ] Confirmação antes de sair

**Interface:**
- [ ] Tema claro (light mode)
- [ ] Temas adicionais (cyberpunk, medieval, moderno)
- [ ] Arrastar e soltar campos (drag & drop real)
- [ ] Tutorial interativo

**Funcionalidades:**
- [ ] Calculadora de modificadores
- [ ] Sistema de iniciativa
- [ ] Timer de sessão
- [ ] Contadores personalizados

### [1.2.0] - Futuro

**Colaboração:**
- [ ] Compartilhamento de fichas via link
- [ ] Códigos de importação
- [ ] Modo mestre (visualizar fichas dos jogadores)

**Avançado:**
- [ ] Backup em nuvem (Google Drive)
- [ ] Sincronização entre dispositivos
- [ ] Modo campanha
- [ ] Integração com APIs (D&D Beyond)

---

## 📝 Notas de Desenvolvimento

### Arquitetura

**Padrão:** Modular com separação de responsabilidades

**app.js:** Core da aplicação
- Estado global (AppState)
- Navegação
- LocalStorage
- Notificações

**characters.js:** CRUD de personagens
- Criação e edição
- Campos dinâmicos
- Upload de arquivos

**templates.js:** Sistema de templates
- Templates pré-definidos
- Import/Export de templates

**notes.js:** Sistema de anotações
- CRUD de notas
- Vinculação com personagens
- Exportação Markdown

**dice.js:** Rolador de dados
- Lógica de rolagem
- Histórico
- Animações

**pdf.js:** Geração de PDF
- jsPDF integration
- Formatação de fichas
- Backup JSON

### Decisões de Design

1. **LocalStorage vs IndexedDB:** LocalStorage escolhido pela simplicidade
2. **Vanilla JS vs Framework:** Vanilla para manter leve e sem dependências
3. **CSS vs Tailwind:** CSS customizado para controle total do design
4. **Modal vs Páginas:** Modais para melhor UX e menos recarregamentos

### Performance

- Sem carregamento de imagens pesadas
- CSS e JS minificáveis
- LocalStorage com JSON parse/stringify eficiente
- Animações com CSS (hardware accelerated)

---

## 👥 Contribuidores

- Desenvolvedor Principal: AI Assistant
- Design: Inspirado em D&D Beyond, Roll20
- Ícones: Font Awesome
- Fontes: Google Fonts

---

## 📄 Licença

MIT License - Livre para uso, modificação e distribuição

---

**RPG Character Vault v1.0.0** - "Que suas rolagens sejam sempre 20!" 🎲⚔️
