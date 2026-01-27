# 🎲 RPG Character Vault

![RPG Character Vault](https://img.shields.io/badge/RPG-Character%20Vault-gold?style=for-the-badge&logo=dungeons-and-dragons)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**RPG Character Vault** é uma plataforma completa para gerenciamento de fichas de personagens de RPG, com design inspirado em D&D Beyond e Roll20. Crie, gerencie e exporte suas fichas de personagem para qualquer sistema de RPG!

## ⚔️ Funcionalidades Principais

### 📝 Sistema de Fichas Totalmente Personalizável
- **Criação de fichas do zero** - Editor visual com campos totalmente customizáveis
- **Suporte universal** - Funciona com qualquer sistema de RPG (D&D, Pathfinder, Call of Cthulhu, sistemas indie, etc.)
- **Campos dinâmicos** - Adicione, remova e reordene campos à vontade
- **Tipos de campos variados**:
  - Texto simples
  - Números
  - Texto longo (textarea)
  - Checkboxes
  - Dados (d4, d6, d8, d10, d12, d20, d100)
- **Preview em tempo real** - Veja como sua ficha fica enquanto edita

### 📚 Templates de Sistemas Populares
Templates pré-configurados para começar rapidamente:
- **D&D 5e** - Dungeons & Dragons 5ª Edição completo
- **Pathfinder 2e** - Sistema Pathfinder com todas as características
- **Call of Cthulhu** - Sistema de horror lovecraftiano
- **Genérico** - Template básico adaptável

### 📤 Exportação e Importação
- **Exportar para PDF** - Fichas formatadas profissionalmente em PDF
- **Backup JSON** - Exportar/importar personagens em formato JSON
- **Upload de fichas externas** - Importe PDFs ou imagens de fichas existentes
- **Templates personalizados** - Crie e compartilhe seus próprios templates

### 📖 Sistema de Anotações e Diário
- **Anotações organizadas** por tipo:
  - Diário de Sessão
  - Anotações Gerais
  - Quests/Missões
  - NPCs
  - Locais
- **Vinculação com personagens** - Associe anotações a fichas específicas
- **Exportação em Markdown** - Exporte todas as anotações organizadas

### 🎲 Rolador de Dados Integrado
- **Rolagem rápida** - d4, d6, d8, d10, d12, d20, d100
- **Histórico de rolagens** - Últimas 20 rolagens registradas
- **Atalho de teclado** - Ctrl/Cmd + D para abrir o rolador
- **Suporte futuro** - Vantagem/Desvantagem (D&D 5e)

### 👤 Sistema de Perfil
- **Dashboard personalizado** - Estatísticas e visão geral
- **Perfil do jogador** - Nome, bio, sistemas favoritos
- **Estatísticas automáticas**:
  - Total de personagens
  - Anotações criadas
  - Sessões registradas
  - Sistemas utilizados

### 🎨 Design Imersivo
- **Tema dark fantasy** - Inspirado em D&D Beyond e Roll20
- **Paleta medieval** - Dourado, vermelho sangue e tons escuros
- **Responsivo** - Funciona perfeitamente em desktop e mobile
- **Animações suaves** - Transições e efeitos visuais elegantes
- **Ícones temáticos** - Font Awesome com ícones de RPG

## 🚀 Como Usar

### 1. Acessar o Site
Abra o `index.html` no seu navegador preferido.

### 2. Criar uma Ficha
1. Clique em **"Criar Ficha"** no menu lateral
2. Escolha uma das opções:
   - **Ficha Personalizada** - Comece do zero
   - **Usar Template** - Use um template pré-configurado
   - **Importar Ficha** - Faça upload de uma ficha existente

### 3. Editor de Fichas
No editor você pode:
- Preencher informações básicas (Nome, Sistema, Classe, Nível)
- Adicionar campos personalizados
- Escolher tipos de campos (texto, número, checkbox, etc.)
- Reordenar campos (setas para cima/baixo)
- Ver preview em tempo real
- Salvar quando estiver pronto

### 4. Gerenciar Fichas
- **Dashboard** - Veja suas fichas recentes
- **Minhas Fichas** - Visualize todas as fichas
- **Buscar** - Encontre fichas por nome, classe ou sistema
- **Filtrar** - Filtre por sistema de RPG
- **Visualizar** - Clique em uma ficha para ver detalhes
- **Editar** - Modifique fichas existentes
- **Exportar PDF** - Gere PDFs profissionais
- **Anotações** - Adicione notas a cada ficha

### 5. Anotações e Diário
1. Clique em **"Anotações"** no menu
2. Clique em **"Nova Anotação"**
3. Preencha:
   - Título
   - Tipo (Sessão, Quest, NPC, etc.)
   - Conteúdo
   - Vincular a um personagem (opcional)
4. Salve e organize suas aventuras!

### 6. Rolador de Dados
- Clique no ícone de dado no topo
- Ou use **Ctrl/Cmd + D**
- Escolha o tipo de dado e role!

## 🗂️ Estrutura do Projeto

```
rpg-character-vault/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos completos do site
├── js/
│   ├── app.js             # Controlador principal da aplicação
│   ├── characters.js      # Sistema de gerenciamento de personagens
│   ├── templates.js       # Templates de sistemas de RPG
│   ├── notes.js           # Sistema de anotações e diário
│   ├── dice.js            # Rolador de dados
│   └── pdf.js             # Exportação em PDF
└── README.md              # Este arquivo
```

## 💾 Armazenamento de Dados

Todos os dados são armazenados localmente no navegador usando **localStorage**:

- `userProfile` - Perfil do jogador
- `characters` - Array com todas as fichas
- `notes` - Array com todas as anotações

**Importante:** Os dados são salvos apenas no navegador atual. Para fazer backup:
1. Exporte suas fichas em JSON
2. Use a funcionalidade de exportação de templates
3. Faça cópias regulares dos seus PDFs

## 🎯 Próximas Funcionalidades

### Em Desenvolvimento
- [ ] Rolagem com vantagem/desvantagem (D&D 5e)
- [ ] Fórmulas de dados complexas (2d20+5, etc.)
- [ ] Temas adicionais (Light mode, outros temas fantasy)
- [ ] Compartilhamento de fichas via link/código

### Planejado
- [ ] Modo campanha - Gerencie múltiplos personagens de uma campanha
- [ ] Sistema de iniciativa/combate
- [ ] Calculadora de modificadores automática
- [ ] Integração com APIs de sistemas (D&D Beyond API)
- [ ] Backup em nuvem (Google Drive, Dropbox)
- [ ] Modo colaborativo - Compartilhe fichas com o mestre

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo e animações
- **JavaScript (ES6+)** - Lógica da aplicação
- **jsPDF** - Geração de PDFs
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Cinzel, Roboto)
- **LocalStorage API** - Persistência de dados

## 📱 Compatibilidade

- ✅ Chrome/Edge (Recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile (iOS/Android)

## 🎨 Paleta de Cores

```css
--bg-dark: #0a0e17          /* Fundo principal */
--bg-secondary: #151922     /* Fundo secundário */
--bg-card: #1a1f2e          /* Cards */
--accent-primary: #d4af37   /* Dourado */
--accent-secondary: #8b0000 /* Vermelho sangue */
--accent-highlight: #ff6b35 /* Laranja */
--text-primary: #e8e6e3     /* Texto principal */
--text-secondary: #a8a6a3   /* Texto secundário */
```

## 💡 Dicas de Uso

1. **Organize por sistema** - Use o filtro de sistemas para encontrar personagens rapidamente
2. **Use templates** - Economize tempo começando com templates pré-configurados
3. **Faça backup regularmente** - Exporte suas fichas em JSON periodicamente
4. **Anotações detalhadas** - Use o diário de sessões para registrar suas aventuras
5. **Personalize campos** - Crie campos específicos para seu estilo de jogo
6. **Atalho de dados** - Use Ctrl+D para abrir o rolador rapidamente

## 🐛 Resolução de Problemas

### Meus dados sumiram!
- Verifique se você está usando o mesmo navegador
- Não limpe os dados do navegador/localStorage
- Faça backups regulares em JSON

### O PDF não está sendo gerado
- Verifique se o jsPDF foi carregado corretamente
- Tente em outro navegador
- Verifique o console do navegador (F12)

### A ficha não está salvando
- Preencha os campos obrigatórios (Nome e Sistema)
- Verifique se há espaço no localStorage
- Tente recarregar a página

## 📜 Licença

Este projeto é de código aberto sob a licença MIT. Você pode usar, modificar e distribuir livremente.

## 🤝 Contribuições

Contribuições são bem-vindas! Ideias para melhorias:
- Novos templates de sistemas
- Melhorias de interface
- Novas funcionalidades
- Correção de bugs
- Traduções para outros idiomas

## 👨‍💻 Autor

Desenvolvido com ❤️ por jogadores de RPG, para jogadores de RPG.

## 🎲 Que suas rolagens sejam sempre 20!

---

**RPG Character Vault** - Seu cofre pessoal de aventuras épicas! ⚔️🐉✨
