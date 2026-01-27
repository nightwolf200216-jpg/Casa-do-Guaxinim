# 📋 Guia de Início Rápido - RPG Character Vault

## 🎯 Para Começar em 3 Passos

### 1️⃣ Abrir o Site
- Abra o arquivo `index.html` no seu navegador preferido
- Ou hospede os arquivos em qualquer servidor web

### 2️⃣ Configurar Seu Perfil
1. Clique em **"Perfil"** no menu lateral
2. Digite seu nome de jogador
3. Adicione uma bio (opcional)
4. Liste seus sistemas favoritos
5. Clique em **"Salvar Perfil"**

### 3️⃣ Criar Sua Primeira Ficha
1. Clique em **"Criar Ficha"** no menu
2. Escolha uma opção:
   - **Ficha Personalizada** → Começar do zero
   - **Usar Template** → Usar D&D 5e, Pathfinder, etc.
   - **Importar Ficha** → Upload de PDF ou imagem

---

## 🎲 Funcionalidades Essenciais

### Criar Ficha Personalizada

1. Clique em **"Ficha Personalizada"**
2. Preencha as informações básicas:
   - **Nome do Personagem** (obrigatório)
   - **Sistema de RPG** (obrigatório)
   - **Classe/Arquétipo** (opcional)
   - **Nível/Posto** (opcional)

3. Adicione campos personalizados:
   - Escolha o tipo de campo (texto, número, checkbox, etc.)
   - Digite o nome do campo
   - Clique em **"Adicionar"**
   - Preencha o valor do campo

4. Organize os campos:
   - Use as setas ⬆️⬇️ para reordenar
   - Use 🗑️ para remover

5. Veja o preview em tempo real à direita

6. Clique em **"Salvar Ficha"** quando terminar

### Usar Templates

**Templates disponíveis:**

#### D&D 5e
- Raça, Classe, Nível
- 6 Atributos principais
- Pontos de Vida, CA, Iniciativa
- Perícias, Proficiências
- Magias, Equipamento
- História do personagem

#### Pathfinder 2e
- Ancestralidade, Herança
- Antecedente, Divindade
- Atributos e Perícias
- CA, HP, Movimentação
- Talentos e Habilidades

#### Call of Cthulhu
- Ocupação, Idade
- Características (FOR, CON, DES, etc.)
- Sanidade, Sorte, Magia
- Perícias e Equipamento

#### Genérico
- Template básico adaptável
- Use como base para qualquer sistema

### Gerenciar Fichas

**Dashboard:**
- Veja suas 4 fichas mais recentes
- Estatísticas gerais
- Acesso rápido

**Minhas Fichas:**
- Todas as fichas criadas
- Buscar por nome, classe ou sistema
- Filtrar por sistema de RPG
- Clique em uma ficha para visualizar

**Visualizar Ficha:**
- Ver todos os detalhes
- Editar ficha
- Exportar para PDF
- Adicionar anotações específicas

### Sistema de Anotações

**Tipos de anotações:**
- 📖 Diário de Sessão
- 📝 Anotação Geral
- ⚔️ Quest/Missão
- 👤 NPC
- 🗺️ Local

**Como criar:**
1. Clique em **"Anotações"** no menu
2. Clique em **"Nova Anotação"**
3. Preencha título e tipo
4. Escreva o conteúdo
5. Associe a um personagem (opcional)
6. Salve

### Rolador de Dados

**Formas de usar:**
- Clique no ícone 🎲 no topo
- Use o atalho **Ctrl+D** (Windows) ou **Cmd+D** (Mac)

**Dados disponíveis:**
- d4, d6, d8, d10, d12, d20, d100

**Recursos:**
- Histórico das últimas 20 rolagens
- Hora de cada rolagem
- Interface visual com animação

### Exportar para PDF

1. Abra uma ficha (clique nela)
2. Clique em **"Exportar PDF"**
3. O arquivo será baixado automaticamente
4. Nome do arquivo: `NomePersonagem_ficha.pdf`

**O PDF inclui:**
- Cabeçalho com nome e informações básicas
- Todos os campos personalizados
- Anotações da ficha
- Design profissional em tema dark fantasy

---

## 💡 Dicas Avançadas

### Campos Dinâmicos

**Tipos de campos e quando usar:**

| Tipo | Uso Ideal | Exemplo |
|------|-----------|---------|
| Texto | Nomes, descrições curtas | Raça: "Humano" |
| Número | Atributos, valores numéricos | Força: 18 |
| Textarea | Descrições longas | História do personagem |
| Checkbox | Sim/Não, ativo/inativo | Exausto: ☑ |
| Dice | Valores de rolagem | Dados de Vida: d8 |

### Organização de Fichas

**Dica 1: Nomeie por campanha**
- Exemplo: `[Campanha X] Nome do Personagem`

**Dica 2: Use o sistema completo**
- Exemplo: `D&D 5e - Curse of Strahd`

**Dica 3: Inclua o nível no nome**
- Exemplo: `Ragnar Nv.5 - Bárbaro`

### Backup e Segurança

**⚠️ IMPORTANTE:** Seus dados ficam apenas no navegador!

**Como fazer backup:**

1. **Método 1: Exportar JSON**
   - Abra a ficha
   - Use a função `exportCharacterAsJSON()`
   - Guarde o arquivo `.json`

2. **Método 2: Exportar PDF**
   - Mantenha cópias em PDF
   - Use como referência visual

3. **Método 3: Backup Manual**
   - Navegador → Ferramentas do Desenvolvedor (F12)
   - Console → Digite: `localStorage.getItem('characters')`
   - Copie e salve o texto

**Como restaurar:**
- Use a função `importCharacterFromJSON()`
- Carregue o arquivo `.json` salvo

### Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `Ctrl/Cmd + D` | Abrir rolador de dados |
| `Esc` | Fechar modais |

---

## 🐛 Solução de Problemas

### Problema: Meus dados sumiram
**Solução:**
- Verifique se está no mesmo navegador
- Não use modo anônimo/privado
- Não limpe dados do navegador
- **Sempre faça backups!**

### Problema: PDF não gera
**Solução:**
- Recarregue a página (F5)
- Tente outro navegador
- Verifique se jsPDF carregou (F12 → Console)

### Problema: Ficha não salva
**Solução:**
- Preencha campos obrigatórios (Nome e Sistema)
- Verifique espaço do localStorage (F12 → Application)
- Tente limpar fichas antigas

### Problema: Layout quebrado no mobile
**Solução:**
- Use navegadores atualizados
- Rotação de tela (portrait/landscape)
- Zoom padrão (100%)

---

## 🎨 Personalização

### Alterar Cores (Avançado)

Edite `css/style.css`, seção `:root`:

```css
:root {
    --accent-primary: #d4af37;  /* Dourado */
    --accent-secondary: #8b0000; /* Vermelho */
    --accent-highlight: #ff6b35; /* Laranja */
}
```

### Adicionar Novo Template

Edite `js/templates.js`, adicione em `CharacterTemplates`:

```javascript
'meu_sistema': {
    name: 'Meu Sistema',
    system: 'Nome do Sistema RPG',
    fields: [
        { name: 'Campo 1', type: 'text', value: '' },
        { name: 'Campo 2', type: 'number', value: 10 },
        // ... mais campos
    ]
}
```

---

## 📱 Mobile

O site é totalmente responsivo! No mobile:

- **Menu lateral:** Clique no ícone ☰ para abrir/fechar
- **Fichas:** Layout adaptado para tela vertical
- **Rolador:** Interface touch-friendly
- **PDFs:** Gerados normalmente

---

## 🎯 Casos de Uso

### Para Jogadores
- Mantenha todas as suas fichas organizadas
- Acesse rapidamente durante as sessões
- Anote eventos importantes
- Compartilhe PDFs com o mestre

### Para Mestres
- Crie fichas de NPCs importantes
- Mantenha registro de vilões
- Organize locais e encontros
- Use templates para criar rapidamente

### Para Designers de Sistemas
- Crie templates para seu sistema
- Exporte e compartilhe templates
- Teste diferentes estruturas de fichas

---

## 🤝 Suporte

**Encontrou um bug?**
- Verifique o console (F12)
- Anote a mensagem de erro
- Descreva os passos para reproduzir

**Sugestões de features?**
- Veja a seção "Próximas Funcionalidades" no README
- Descreva sua ideia detalhadamente

---

## 🎲 Boa Sorte nas Suas Aventuras!

Que suas rolagens sejam sempre 20! ⚔️🐉✨

---

**RPG Character Vault** - v1.0.0
