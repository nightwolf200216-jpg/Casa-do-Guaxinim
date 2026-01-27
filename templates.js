// Character Templates System

const CharacterTemplates = {
    'dnd5e': {
        name: 'D&D 5e',
        system: 'Dungeons & Dragons 5ª Edição',
        fields: [
            { name: 'Raça', type: 'text', value: '' },
            { name: 'Antecedente', type: 'text', value: '' },
            { name: 'Alinhamento', type: 'text', value: '' },
            { name: 'Pontos de Vida', type: 'number', value: 10 },
            { name: 'Classe de Armadura', type: 'number', value: 10 },
            { name: 'Deslocamento', type: 'text', value: '30 pés' },
            { name: 'Força', type: 'number', value: 10 },
            { name: 'Destreza', type: 'number', value: 10 },
            { name: 'Constituição', type: 'number', value: 10 },
            { name: 'Inteligência', type: 'number', value: 10 },
            { name: 'Sabedoria', type: 'number', value: 10 },
            { name: 'Carisma', type: 'number', value: 10 },
            { name: 'Proficiência', type: 'number', value: 2 },
            { name: 'Iniciativa', type: 'number', value: 0 },
            { name: 'Percepção Passiva', type: 'number', value: 10 },
            { name: 'Dados de Vida', type: 'dice', value: 'd8' },
            { name: 'Perícias', type: 'textarea', value: '' },
            { name: 'Proficiências e Idiomas', type: 'textarea', value: '' },
            { name: 'Equipamento', type: 'textarea', value: '' },
            { name: 'Magias Conhecidas', type: 'textarea', value: '' },
            { name: 'Traços Raciais', type: 'textarea', value: '' },
            { name: 'Características de Classe', type: 'textarea', value: '' },
            { name: 'História', type: 'textarea', value: '' }
        ]
    },
    'pathfinder': {
        name: 'Pathfinder',
        system: 'Pathfinder 2e',
        fields: [
            { name: 'Ancestralidade', type: 'text', value: '' },
            { name: 'Herança', type: 'text', value: '' },
            { name: 'Antecedente', type: 'text', value: '' },
            { name: 'Divindade', type: 'text', value: '' },
            { name: 'Pontos de Vida', type: 'number', value: 10 },
            { name: 'Classe de Armadura', type: 'number', value: 10 },
            { name: 'Deslocamento', type: 'text', value: '25 pés' },
            { name: 'Força', type: 'number', value: 10 },
            { name: 'Destreza', type: 'number', value: 10 },
            { name: 'Constituição', type: 'number', value: 10 },
            { name: 'Inteligência', type: 'number', value: 10 },
            { name: 'Sabedoria', type: 'number', value: 10 },
            { name: 'Carisma', type: 'number', value: 10 },
            { name: 'Percepção', type: 'number', value: 0 },
            { name: 'CD de Classe', type: 'number', value: 10 },
            { name: 'Pontos de Heroísmo', type: 'number', value: 1 },
            { name: 'Tamanho', type: 'text', value: 'Médio' },
            { name: 'Perícias', type: 'textarea', value: '' },
            { name: 'Idiomas', type: 'textarea', value: '' },
            { name: 'Talentos', type: 'textarea', value: '' },
            { name: 'Habilidades Especiais', type: 'textarea', value: '' },
            { name: 'Equipamento', type: 'textarea', value: '' },
            { name: 'Magias', type: 'textarea', value: '' }
        ]
    },
    'cthulhu': {
        name: 'Call of Cthulhu',
        system: 'Call of Cthulhu 7th Edition',
        fields: [
            { name: 'Ocupação', type: 'text', value: '' },
            { name: 'Idade', type: 'number', value: 25 },
            { name: 'Sexo', type: 'text', value: '' },
            { name: 'Residência', type: 'text', value: '' },
            { name: 'Local de Nascimento', type: 'text', value: '' },
            { name: 'Pontos de Vida', type: 'number', value: 10 },
            { name: 'Pontos de Magia', type: 'number', value: 10 },
            { name: 'Sanidade', type: 'number', value: 50 },
            { name: 'Sorte', type: 'number', value: 50 },
            { name: 'FOR - Força', type: 'number', value: 50 },
            { name: 'CON - Constituição', type: 'number', value: 50 },
            { name: 'TAM - Tamanho', type: 'number', value: 50 },
            { name: 'DES - Destreza', type: 'number', value: 50 },
            { name: 'APA - Aparência', type: 'number', value: 50 },
            { name: 'INT - Inteligência', type: 'number', value: 50 },
            { name: 'POD - Poder', type: 'number', value: 50 },
            { name: 'EDU - Educação', type: 'number', value: 50 },
            { name: 'Taxa de Movimento', type: 'number', value: 8 },
            { name: 'Dano Adicional', type: 'text', value: '0' },
            { name: 'Corpo', type: 'number', value: 10 },
            { name: 'Perícias', type: 'textarea', value: '' },
            { name: 'Armas', type: 'textarea', value: '' },
            { name: 'Equipamento', type: 'textarea', value: '' },
            { name: 'Contatos', type: 'textarea', value: '' },
            { name: 'História Pessoal', type: 'textarea', value: '' },
            { name: 'Fobias e Manias', type: 'textarea', value: '' }
        ]
    },
    'generic': {
        name: 'Genérico',
        system: 'Sistema Genérico',
        fields: [
            { name: 'Arquétipo/Classe', type: 'text', value: '' },
            { name: 'Raça/Espécie', type: 'text', value: '' },
            { name: 'Pontos de Vida', type: 'number', value: 10 },
            { name: 'Pontos de Energia/Mana', type: 'number', value: 10 },
            { name: 'Atributo 1', type: 'number', value: 10 },
            { name: 'Atributo 2', type: 'number', value: 10 },
            { name: 'Atributo 3', type: 'number', value: 10 },
            { name: 'Atributo 4', type: 'number', value: 10 },
            { name: 'Ataque', type: 'number', value: 0 },
            { name: 'Defesa', type: 'number', value: 0 },
            { name: 'Perícias', type: 'textarea', value: '' },
            { name: 'Habilidades Especiais', type: 'textarea', value: '' },
            { name: 'Equipamento', type: 'textarea', value: '' },
            { name: 'Magias/Poderes', type: 'textarea', value: '' },
            { name: 'História', type: 'textarea', value: '' }
        ]
    }
};

// Use template
function useTemplate(templateId) {
    const template = CharacterTemplates[templateId];
    
    if (!template) {
        showNotification('Template não encontrado!', 'error');
        return;
    }
    
    currentEditingChar = {
        id: generateId(),
        name: '',
        system: template.system,
        class: '',
        level: '',
        customFields: template.fields.map(field => ({
            id: generateId(),
            name: field.name,
            type: field.type,
            value: field.value
        })),
        notes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    openCharacterEditor();
    showNotification(`Template ${template.name} carregado!`, 'success');
}

// Export template
function exportTemplate(character) {
    const template = {
        name: character.name + ' Template',
        system: character.system,
        fields: character.customFields.map(field => ({
            name: field.name,
            type: field.type,
            value: getDefaultValue(field.type)
        }))
    };
    
    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character.name}_template.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Template exportado com sucesso!', 'success');
}

// Import template
function importTemplate() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const template = JSON.parse(event.target.result);
                
                currentEditingChar = {
                    id: generateId(),
                    name: '',
                    system: template.system || 'Custom',
                    class: '',
                    level: '',
                    customFields: template.fields.map(field => ({
                        id: generateId(),
                        name: field.name,
                        type: field.type,
                        value: field.value || getDefaultValue(field.type)
                    })),
                    notes: '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                openCharacterEditor();
                showNotification('Template importado com sucesso!', 'success');
            } catch (error) {
                showNotification('Erro ao importar template. Verifique o arquivo.', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Get template suggestions based on system
function getTemplateSuggestions(system) {
    const systemLower = system.toLowerCase();
    
    if (systemLower.includes('d&d') || systemLower.includes('dungeons')) {
        return 'dnd5e';
    } else if (systemLower.includes('pathfinder')) {
        return 'pathfinder';
    } else if (systemLower.includes('cthulhu') || systemLower.includes('call of')) {
        return 'cthulhu';
    }
    
    return 'generic';
}

// Create template from existing character
function createTemplateFromCharacter(charId) {
    const character = AppState.characters.find(c => c.id === charId);
    if (!character) return;
    
    if (confirm(`Deseja criar um template baseado em ${character.name}?`)) {
        exportTemplate(character);
    }
}
