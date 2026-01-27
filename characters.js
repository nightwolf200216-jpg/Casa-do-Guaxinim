// Character Management System

let currentEditingChar = null;
let currentViewingCharId = null;
let customFieldsCounter = 0;

// Start creating a custom character
function startCustomCharacter() {
    currentEditingChar = {
        id: generateId(),
        name: '',
        system: '',
        class: '',
        level: '',
        customFields: [],
        notes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    openCharacterEditor();
}

// Open character editor modal
function openCharacterEditor() {
    const modal = document.getElementById('characterEditorModal');
    modal.classList.add('active');
    
    // Reset form
    document.getElementById('charName').value = currentEditingChar.name || '';
    document.getElementById('charSystem').value = currentEditingChar.system || '';
    document.getElementById('charClass').value = currentEditingChar.class || '';
    document.getElementById('charLevel').value = currentEditingChar.level || '';
    
    // Load custom fields
    document.getElementById('customFieldsList').innerHTML = '';
    if (currentEditingChar.customFields) {
        currentEditingChar.customFields.forEach((field, index) => {
            addCustomFieldToUI(field, index);
        });
    }
    
    updateCharacterPreview();
}

// Close character editor
function closeCharacterEditor() {
    const modal = document.getElementById('characterEditorModal');
    modal.classList.remove('active');
    currentEditingChar = null;
    customFieldsCounter = 0;
}

// Add custom field
function addCustomField() {
    const fieldType = document.getElementById('fieldType').value;
    const fieldName = document.getElementById('fieldName').value.trim();
    
    if (!fieldName) {
        showNotification('Digite o nome do campo!', 'error');
        return;
    }
    
    const field = {
        id: generateId(),
        name: fieldName,
        type: fieldType,
        value: getDefaultValue(fieldType)
    };
    
    currentEditingChar.customFields.push(field);
    addCustomFieldToUI(field, currentEditingChar.customFields.length - 1);
    
    // Clear input
    document.getElementById('fieldName').value = '';
    
    updateCharacterPreview();
}

// Get default value for field type
function getDefaultValue(type) {
    switch(type) {
        case 'number':
            return 0;
        case 'checkbox':
            return false;
        case 'dice':
            return 'd20';
        default:
            return '';
    }
}

// Add custom field to UI
function addCustomFieldToUI(field, index) {
    const container = document.getElementById('customFieldsList');
    
    const fieldElement = document.createElement('div');
    fieldElement.className = 'custom-field-item';
    fieldElement.dataset.index = index;
    
    let inputHTML = '';
    switch(field.type) {
        case 'text':
            inputHTML = `<input type="text" value="${field.value}" onchange="updateFieldValue(${index}, this.value)" class="form-control" placeholder="Digite o valor">`;
            break;
        case 'number':
            inputHTML = `<input type="number" value="${field.value}" onchange="updateFieldValue(${index}, this.value)" class="form-control" placeholder="0">`;
            break;
        case 'textarea':
            inputHTML = `<textarea onchange="updateFieldValue(${index}, this.value)" class="form-control" placeholder="Digite o texto">${field.value}</textarea>`;
            break;
        case 'checkbox':
            inputHTML = `<input type="checkbox" ${field.value ? 'checked' : ''} onchange="updateFieldValue(${index}, this.checked)" style="width: auto;">`;
            break;
        case 'dice':
            inputHTML = `
                <select onchange="updateFieldValue(${index}, this.value)" class="form-control">
                    <option value="d4" ${field.value === 'd4' ? 'selected' : ''}>d4</option>
                    <option value="d6" ${field.value === 'd6' ? 'selected' : ''}>d6</option>
                    <option value="d8" ${field.value === 'd8' ? 'selected' : ''}>d8</option>
                    <option value="d10" ${field.value === 'd10' ? 'selected' : ''}>d10</option>
                    <option value="d12" ${field.value === 'd12' ? 'selected' : ''}>d12</option>
                    <option value="d20" ${field.value === 'd20' ? 'selected' : ''}>d20</option>
                    <option value="d100" ${field.value === 'd100' ? 'selected' : ''}>d100</option>
                </select>
            `;
            break;
    }
    
    fieldElement.innerHTML = `
        <div class="field-info">
            <span class="field-type-badge">${field.type}</span>
            <strong>${field.name}</strong>
            <div style="margin-top: 0.5rem;">
                ${inputHTML}
            </div>
        </div>
        <div class="field-actions">
            <button class="btn-icon" onclick="moveFieldUp(${index})" title="Mover para cima">
                <i class="fas fa-arrow-up"></i>
            </button>
            <button class="btn-icon" onclick="moveFieldDown(${index})" title="Mover para baixo">
                <i class="fas fa-arrow-down"></i>
            </button>
            <button class="btn-icon delete" onclick="deleteField(${index})" title="Remover">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    container.appendChild(fieldElement);
}

// Update field value
function updateFieldValue(index, value) {
    currentEditingChar.customFields[index].value = value;
    updateCharacterPreview();
}

// Move field up
function moveFieldUp(index) {
    if (index === 0) return;
    
    const temp = currentEditingChar.customFields[index];
    currentEditingChar.customFields[index] = currentEditingChar.customFields[index - 1];
    currentEditingChar.customFields[index - 1] = temp;
    
    refreshCustomFieldsList();
    updateCharacterPreview();
}

// Move field down
function moveFieldDown(index) {
    if (index === currentEditingChar.customFields.length - 1) return;
    
    const temp = currentEditingChar.customFields[index];
    currentEditingChar.customFields[index] = currentEditingChar.customFields[index + 1];
    currentEditingChar.customFields[index + 1] = temp;
    
    refreshCustomFieldsList();
    updateCharacterPreview();
}

// Delete field
function deleteField(index) {
    if (!confirm('Deseja realmente remover este campo?')) return;
    
    currentEditingChar.customFields.splice(index, 1);
    refreshCustomFieldsList();
    updateCharacterPreview();
}

// Refresh custom fields list
function refreshCustomFieldsList() {
    document.getElementById('customFieldsList').innerHTML = '';
    currentEditingChar.customFields.forEach((field, index) => {
        addCustomFieldToUI(field, index);
    });
}

// Update character preview
function updateCharacterPreview() {
    const name = document.getElementById('charName').value || 'Nome do Personagem';
    const charClass = document.getElementById('charClass').value || 'Classe';
    const level = document.getElementById('charLevel').value || 'Nível';
    const system = document.getElementById('charSystem').value || 'Sistema';
    
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewClass').textContent = charClass;
    document.getElementById('previewLevel').textContent = level;
    document.getElementById('previewSystem').textContent = system;
    
    // Update fields preview
    const fieldsContainer = document.getElementById('previewFields');
    if (currentEditingChar.customFields && currentEditingChar.customFields.length > 0) {
        fieldsContainer.innerHTML = currentEditingChar.customFields.map(field => {
            let displayValue = field.value;
            if (field.type === 'checkbox') {
                displayValue = field.value ? 'Sim' : 'Não';
            } else if (!displayValue) {
                displayValue = '-';
            }
            
            return `
                <div class="preview-field">
                    <label>${field.name}</label>
                    <div class="value">${displayValue}</div>
                </div>
            `;
        }).join('');
    } else {
        fieldsContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Nenhum campo personalizado adicionado</p>';
    }
}

// Save character
function saveCharacter() {
    const name = document.getElementById('charName').value.trim();
    const system = document.getElementById('charSystem').value.trim();
    
    if (!name) {
        showNotification('Nome do personagem é obrigatório!', 'error');
        return;
    }
    
    if (!system) {
        showNotification('Sistema de RPG é obrigatório!', 'error');
        return;
    }
    
    currentEditingChar.name = name;
    currentEditingChar.system = system;
    currentEditingChar.class = document.getElementById('charClass').value.trim();
    currentEditingChar.level = document.getElementById('charLevel').value.trim();
    currentEditingChar.updatedAt = new Date().toISOString();
    
    // Check if editing existing character
    const existingIndex = AppState.characters.findIndex(c => c.id === currentEditingChar.id);
    
    if (existingIndex >= 0) {
        AppState.characters[existingIndex] = currentEditingChar;
        showNotification('Ficha atualizada com sucesso!', 'success');
    } else {
        AppState.characters.push(currentEditingChar);
        showNotification('Ficha criada com sucesso!', 'success');
    }
    
    saveCharactersToStorage();
    closeCharacterEditor();
    
    // Navigate to my characters page
    navigateTo('my-characters');
}

// View character
function viewCharacter(charId) {
    const character = AppState.characters.find(c => c.id === charId);
    if (!character) return;
    
    currentViewingCharId = charId;
    
    const modal = document.getElementById('characterViewModal');
    modal.classList.add('active');
    
    document.getElementById('viewCharName').textContent = character.name;
    
    // Build character view HTML
    let fieldsHTML = `
        <div class="preview-basic-info">
            <h2>${character.name}</h2>
            <div class="preview-meta">
                <span>${character.class || 'N/A'}</span> • 
                <span>${character.level || 'N/A'}</span> • 
                <span>${character.system}</span>
            </div>
        </div>
        <div class="preview-fields">
    `;
    
    if (character.customFields && character.customFields.length > 0) {
        character.customFields.forEach(field => {
            let displayValue = field.value;
            if (field.type === 'checkbox') {
                displayValue = field.value ? 'Sim' : 'Não';
            } else if (!displayValue && displayValue !== 0) {
                displayValue = '-';
            }
            
            fieldsHTML += `
                <div class="preview-field">
                    <label>${field.name}</label>
                    <div class="value">${displayValue}</div>
                </div>
            `;
        });
    } else {
        fieldsHTML += '<p style="color: var(--text-muted); text-align: center;">Nenhum campo personalizado</p>';
    }
    
    fieldsHTML += '</div>';
    
    document.getElementById('characterViewContent').innerHTML = fieldsHTML;
    
    // Load character notes
    document.getElementById('characterNotes').value = character.notes || '';
}

// Close character view
function closeCharacterView() {
    const modal = document.getElementById('characterViewModal');
    modal.classList.remove('active');
    currentViewingCharId = null;
}

// Edit character
function editCharacter(charId) {
    const character = AppState.characters.find(c => c.id === charId);
    if (!character) return;
    
    currentEditingChar = JSON.parse(JSON.stringify(character)); // Deep clone
    closeCharacterView();
    openCharacterEditor();
}

// Save character notes
function saveCharacterNotes() {
    const character = AppState.characters.find(c => c.id === currentViewingCharId);
    if (!character) return;
    
    character.notes = document.getElementById('characterNotes').value;
    character.updatedAt = new Date().toISOString();
    
    saveCharactersToStorage();
    showNotification('Anotações salvas com sucesso!', 'success');
}

// Delete character
function deleteCharacter(charId) {
    if (!confirm('Deseja realmente excluir esta ficha? Esta ação não pode ser desfeita!')) return;
    
    AppState.characters = AppState.characters.filter(c => c.id !== charId);
    saveCharactersToStorage();
    
    closeCharacterView();
    showNotification('Ficha excluída com sucesso!', 'success');
    
    if (AppState.currentPage === 'my-characters') {
        displayAllCharacters();
    } else {
        updateDashboard();
    }
}

// Upload external sheet
function uploadExternalSheet() {
    document.getElementById('fileUploadInput').click();
}

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const character = {
            id: generateId(),
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
            system: 'Importado',
            class: '',
            level: '',
            customFields: [{
                id: generateId(),
                name: 'Arquivo Importado',
                type: 'text',
                value: file.name
            }],
            externalFile: {
                type: file.type,
                data: e.target.result,
                name: file.name
            },
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        AppState.characters.push(character);
        saveCharactersToStorage();
        
        showNotification('Ficha importada com sucesso!', 'success');
        navigateTo('my-characters');
    };
    
    if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
        reader.readAsDataURL(file);
    } else {
        showNotification('Formato de arquivo não suportado. Use imagens ou PDF.', 'error');
    }
    
    // Reset input
    event.target.value = '';
}
