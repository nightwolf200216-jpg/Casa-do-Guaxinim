// Notes and Session Diary System

let currentEditingNote = null;

// Create new note
function createNewNote() {
    currentEditingNote = {
        id: generateId(),
        title: '',
        type: 'note',
        content: '',
        characterId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    openNoteModal();
}

// Open note modal
function openNoteModal() {
    const modal = document.getElementById('noteModal');
    modal.classList.add('active');
    
    // Populate character dropdown
    const charSelect = document.getElementById('noteCharacter');
    charSelect.innerHTML = '<option value="">Nenhuma</option>';
    
    AppState.characters.forEach(char => {
        const option = document.createElement('option');
        option.value = char.id;
        option.textContent = char.name;
        charSelect.appendChild(option);
    });
    
    // Set values if editing
    if (currentEditingNote) {
        document.getElementById('noteTitle').value = currentEditingNote.title || '';
        document.getElementById('noteType').value = currentEditingNote.type || 'note';
        document.getElementById('noteContent').value = currentEditingNote.content || '';
        charSelect.value = currentEditingNote.characterId || '';
    }
}

// Close note modal
function closeNoteModal() {
    const modal = document.getElementById('noteModal');
    modal.classList.remove('active');
    currentEditingNote = null;
}

// Save note
function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const type = document.getElementById('noteType').value;
    const content = document.getElementById('noteContent').value.trim();
    const characterId = document.getElementById('noteCharacter').value || null;
    
    if (!title) {
        showNotification('Título é obrigatório!', 'error');
        return;
    }
    
    if (!content) {
        showNotification('Conteúdo é obrigatório!', 'error');
        return;
    }
    
    currentEditingNote.title = title;
    currentEditingNote.type = type;
    currentEditingNote.content = content;
    currentEditingNote.characterId = characterId;
    currentEditingNote.updatedAt = new Date().toISOString();
    
    // Check if editing existing note
    const existingIndex = AppState.notes.findIndex(n => n.id === currentEditingNote.id);
    
    if (existingIndex >= 0) {
        AppState.notes[existingIndex] = currentEditingNote;
        showNotification('Anotação atualizada com sucesso!', 'success');
    } else {
        AppState.notes.push(currentEditingNote);
        showNotification('Anotação criada com sucesso!', 'success');
    }
    
    saveNotesToStorage();
    closeNoteModal();
    displayNotes();
}

// Display notes
function displayNotes() {
    const container = document.getElementById('notesContainer');
    
    if (AppState.notes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-scroll"></i>
                <h3>Nenhuma anotação criada</h3>
                <p>Comece a registrar suas aventuras!</p>
                <button class="btn btn-primary" onclick="createNewNote()">
                    <i class="fas fa-plus"></i> Criar Primeira Anotação
                </button>
            </div>
        `;
        return;
    }
    
    // Sort notes by date (newest first)
    const sortedNotes = [...AppState.notes].sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    
    container.innerHTML = sortedNotes.map(note => createNoteCard(note)).join('');
}

// Create note card HTML
function createNoteCard(note) {
    const date = new Date(note.updatedAt).toLocaleString('pt-BR');
    const characterName = note.characterId ? 
        AppState.characters.find(c => c.id === note.characterId)?.name || 'Personagem não encontrado' : 
        'Geral';
    
    const typeLabels = {
        'session': 'Diário de Sessão',
        'note': 'Anotação Geral',
        'quest': 'Quest/Missão',
        'npc': 'NPC',
        'location': 'Local'
    };
    
    const contentPreview = note.content.length > 200 ? 
        note.content.substring(0, 200) + '...' : 
        note.content;
    
    return `
        <div class="note-card">
            <div class="note-header">
                <h3>${note.title}</h3>
                <span class="note-type">${typeLabels[note.type] || note.type}</span>
            </div>
            <div class="note-content">
                ${contentPreview}
            </div>
            <div class="note-meta">
                <span><i class="fas fa-user"></i> ${characterName}</span>
                <span><i class="fas fa-clock"></i> ${date}</span>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <button class="btn btn-secondary btn-sm" onclick="viewNote('${note.id}')">
                    <i class="fas fa-eye"></i> Ver
                </button>
                <button class="btn btn-secondary btn-sm" onclick="editNote('${note.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-secondary btn-sm" onclick="deleteNote('${note.id}')">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `;
}

// View note
function viewNote(noteId) {
    const note = AppState.notes.find(n => n.id === noteId);
    if (!note) return;
    
    const characterName = note.characterId ? 
        AppState.characters.find(c => c.id === note.characterId)?.name || 'Personagem não encontrado' : 
        'Geral';
    
    const date = new Date(note.updatedAt).toLocaleString('pt-BR');
    
    const typeLabels = {
        'session': 'Diário de Sessão',
        'note': 'Anotação Geral',
        'quest': 'Quest/Missão',
        'npc': 'NPC',
        'location': 'Local'
    };
    
    // Create a temporary modal for viewing
    const viewModal = document.createElement('div');
    viewModal.className = 'modal active';
    viewModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-scroll"></i> ${note.title}</h2>
                <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 1rem;">
                    <span class="note-type">${typeLabels[note.type] || note.type}</span>
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">
                        <i class="fas fa-user"></i> ${characterName} • 
                        <i class="fas fa-clock"></i> ${date}
                    </p>
                </div>
                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; border-left: 3px solid var(--accent-primary); white-space: pre-wrap;">
                    ${note.content}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">Fechar</button>
                <button class="btn btn-primary" onclick="editNote('${note.id}'); this.closest('.modal').remove();">
                    <i class="fas fa-edit"></i> Editar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(viewModal);
}

// Edit note
function editNote(noteId) {
    const note = AppState.notes.find(n => n.id === noteId);
    if (!note) return;
    
    currentEditingNote = JSON.parse(JSON.stringify(note)); // Deep clone
    openNoteModal();
}

// Delete note
function deleteNote(noteId) {
    if (!confirm('Deseja realmente excluir esta anotação?')) return;
    
    AppState.notes = AppState.notes.filter(n => n.id !== noteId);
    saveNotesToStorage();
    
    showNotification('Anotação excluída com sucesso!', 'success');
    displayNotes();
}

// Get notes for character
function getNotesForCharacter(characterId) {
    return AppState.notes.filter(n => n.characterId === characterId);
}

// Get session notes
function getSessionNotes() {
    return AppState.notes.filter(n => n.type === 'session');
}

// Export notes as markdown
function exportNotesAsMarkdown() {
    if (AppState.notes.length === 0) {
        showNotification('Nenhuma anotação para exportar!', 'error');
        return;
    }
    
    let markdown = '# Minhas Anotações de RPG\n\n';
    
    // Sort by type and date
    const notesByType = {};
    AppState.notes.forEach(note => {
        if (!notesByType[note.type]) {
            notesByType[note.type] = [];
        }
        notesByType[note.type].push(note);
    });
    
    const typeLabels = {
        'session': 'Diários de Sessão',
        'note': 'Anotações Gerais',
        'quest': 'Quests e Missões',
        'npc': 'NPCs',
        'location': 'Locais'
    };
    
    Object.keys(notesByType).forEach(type => {
        markdown += `## ${typeLabels[type] || type}\n\n`;
        
        notesByType[type].forEach(note => {
            const date = new Date(note.updatedAt).toLocaleDateString('pt-BR');
            const characterName = note.characterId ? 
                AppState.characters.find(c => c.id === note.characterId)?.name || 'Desconhecido' : 
                'Geral';
            
            markdown += `### ${note.title}\n\n`;
            markdown += `**Personagem:** ${characterName} | **Data:** ${date}\n\n`;
            markdown += `${note.content}\n\n`;
            markdown += '---\n\n';
        });
    });
    
    // Create and download file
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anotacoes_rpg_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Anotações exportadas com sucesso!', 'success');
}

// Search notes
function searchNotes(query) {
    if (!query) {
        displayNotes();
        return;
    }
    
    const filtered = AppState.notes.filter(note => 
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    
    const container = document.getElementById('notesContainer');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Nenhuma anotação encontrada</h3>
                <p>Tente uma busca diferente</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(note => createNoteCard(note)).join('');
}
