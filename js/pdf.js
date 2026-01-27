// PDF Export System using jsPDF

// Export character to PDF
async function exportToPDF(charId) {
    const character = AppState.characters.find(c => c.id === charId);
    if (!character) {
        showNotification('Personagem não encontrado!', 'error');
        return;
    }
    
    try {
        // Access jsPDF from the global scope
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Page dimensions
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        let yPos = margin;
        
        // Color palette
        const goldColor = [212, 175, 55];
        const darkRed = [139, 0, 0];
        const textColor = [232, 230, 227];
        const bgDark = [26, 31, 46];
        
        // Background
        doc.setFillColor(...bgDark);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Header border
        doc.setDrawColor(...goldColor);
        doc.setLineWidth(2);
        doc.rect(margin, margin, pageWidth - (margin * 2), 35, 'S');
        
        // Title
        doc.setFontSize(24);
        doc.setTextColor(...goldColor);
        doc.text(character.name, pageWidth / 2, yPos + 12, { align: 'center' });
        
        // Subtitle
        doc.setFontSize(12);
        doc.setTextColor(...textColor);
        const subtitle = `${character.class || 'N/A'} • ${character.level || 'N/A'} • ${character.system}`;
        doc.text(subtitle, pageWidth / 2, yPos + 20, { align: 'center' });
        
        // Date
        doc.setFontSize(9);
        doc.setTextColor(150, 150, 150);
        const date = new Date().toLocaleDateString('pt-BR');
        doc.text(`Gerado em: ${date}`, pageWidth / 2, yPos + 28, { align: 'center' });
        
        yPos += 45;
        
        // Custom fields
        if (character.customFields && character.customFields.length > 0) {
            doc.setFontSize(16);
            doc.setTextColor(...goldColor);
            doc.text('Atributos e Características', margin, yPos);
            yPos += 8;
            
            // Draw separator line
            doc.setDrawColor(...goldColor);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setTextColor(...textColor);
            
            character.customFields.forEach((field, index) => {
                // Check if we need a new page
                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    doc.setFillColor(...bgDark);
                    doc.rect(0, 0, pageWidth, pageHeight, 'F');
                    yPos = margin;
                }
                
                let displayValue = field.value;
                if (field.type === 'checkbox') {
                    displayValue = field.value ? 'Sim' : 'Não';
                } else if (!displayValue && displayValue !== 0) {
                    displayValue = '-';
                }
                
                // Field background
                doc.setFillColor(21, 25, 34);
                doc.roundedRect(margin, yPos - 5, pageWidth - (margin * 2), 12, 2, 2, 'F');
                
                // Field name (bold)
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...goldColor);
                doc.text(`${field.name}:`, margin + 3, yPos + 2);
                
                // Field value
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(...textColor);
                
                // Handle long text
                if (field.type === 'textarea' && displayValue.length > 50) {
                    const lines = doc.splitTextToSize(displayValue, pageWidth - margin * 2 - 6);
                    doc.text(lines[0].substring(0, 47) + '...', margin + 60, yPos + 2);
                } else {
                    doc.text(String(displayValue), margin + 60, yPos + 2);
                }
                
                yPos += 14;
            });
        }
        
        // Notes section
        if (character.notes && character.notes.trim()) {
            yPos += 5;
            
            // Check if we need a new page
            if (yPos > pageHeight - 50) {
                doc.addPage();
                doc.setFillColor(...bgDark);
                doc.rect(0, 0, pageWidth, pageHeight, 'F');
                yPos = margin;
            }
            
            doc.setFontSize(16);
            doc.setTextColor(...goldColor);
            doc.text('Anotações', margin, yPos);
            yPos += 8;
            
            doc.setDrawColor(...goldColor);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos, pageWidth - margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setTextColor(...textColor);
            
            const notesLines = doc.splitTextToSize(character.notes, pageWidth - (margin * 2));
            notesLines.forEach(line => {
                if (yPos > pageHeight - 20) {
                    doc.addPage();
                    doc.setFillColor(...bgDark);
                    doc.rect(0, 0, pageWidth, pageHeight, 'F');
                    yPos = margin;
                }
                doc.text(line, margin, yPos);
                yPos += 6;
            });
        }
        
        // Footer on each page
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
                `RPG Character Vault - Página ${i} de ${pageCount}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
        }
        
        // Save PDF
        const fileName = `${character.name.replace(/[^a-z0-9]/gi, '_')}_ficha.pdf`;
        doc.save(fileName);
        
        showNotification('PDF exportado com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showNotification('Erro ao gerar PDF. Verifique o console.', 'error');
    }
}

// Export all characters to PDF
async function exportAllCharactersToPDF() {
    if (AppState.characters.length === 0) {
        showNotification('Nenhum personagem para exportar!', 'error');
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        
        const goldColor = [212, 175, 55];
        const textColor = [232, 230, 227];
        const bgDark = [26, 31, 46];
        
        let isFirstPage = true;
        
        for (const character of AppState.characters) {
            if (!isFirstPage) {
                doc.addPage();
            }
            isFirstPage = false;
            
            let yPos = margin;
            
            // Background
            doc.setFillColor(...bgDark);
            doc.rect(0, 0, pageWidth, pageHeight, 'F');
            
            // Header
            doc.setDrawColor(...goldColor);
            doc.setLineWidth(2);
            doc.rect(margin, margin, pageWidth - (margin * 2), 35, 'S');
            
            doc.setFontSize(20);
            doc.setTextColor(...goldColor);
            doc.text(character.name, pageWidth / 2, yPos + 12, { align: 'center' });
            
            doc.setFontSize(11);
            doc.setTextColor(...textColor);
            const subtitle = `${character.class || 'N/A'} • ${character.level || 'N/A'} • ${character.system}`;
            doc.text(subtitle, pageWidth / 2, yPos + 22, { align: 'center' });
            
            yPos += 45;
            
            // Fields summary
            doc.setFontSize(10);
            if (character.customFields) {
                const fieldsToShow = character.customFields.slice(0, 15);
                fieldsToShow.forEach(field => {
                    if (yPos > pageHeight - 30) return;
                    
                    let displayValue = field.value;
                    if (field.type === 'checkbox') {
                        displayValue = field.value ? 'Sim' : 'Não';
                    } else if (!displayValue && displayValue !== 0) {
                        displayValue = '-';
                    }
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...goldColor);
                    doc.text(`${field.name}:`, margin, yPos);
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(...textColor);
                    doc.text(String(displayValue).substring(0, 30), margin + 50, yPos);
                    
                    yPos += 7;
                });
            }
        }
        
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
                `RPG Character Vault - Todos os Personagens - Página ${i} de ${pageCount}`,
                pageWidth / 2,
                pageHeight - 10,
                { align: 'center' }
            );
        }
        
        doc.save('todos_personagens.pdf');
        showNotification('Todos os personagens exportados!', 'success');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showNotification('Erro ao gerar PDF. Verifique o console.', 'error');
    }
}

// Export character as JSON (backup)
function exportCharacterAsJSON(charId) {
    const character = AppState.characters.find(c => c.id === charId);
    if (!character) {
        showNotification('Personagem não encontrado!', 'error');
        return;
    }
    
    const dataStr = JSON.stringify(character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character.name.replace(/[^a-z0-9]/gi, '_')}_backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Backup JSON criado com sucesso!', 'success');
}

// Import character from JSON
function importCharacterFromJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const character = JSON.parse(event.target.result);
                
                // Generate new ID to avoid conflicts
                character.id = generateId();
                character.createdAt = new Date().toISOString();
                character.updatedAt = new Date().toISOString();
                
                AppState.characters.push(character);
                saveCharactersToStorage();
                
                showNotification(`Personagem "${character.name}" importado com sucesso!`, 'success');
                
                if (AppState.currentPage === 'my-characters') {
                    displayAllCharacters();
                } else {
                    navigateTo('my-characters');
                }
            } catch (error) {
                console.error('Erro ao importar:', error);
                showNotification('Erro ao importar personagem. Verifique o arquivo JSON.', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}
