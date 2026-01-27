// Main App Controller
// Initialize app state
const AppState = {
    currentUser: null,
    characters: [],
    notes: [],
    currentPage: 'dashboard',
    editingCharacterId: null
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadUserProfile();
    loadCharacters();
    loadNotes();
    updateDashboard();
    setupEventListeners();
});

// Initialize app
function initializeApp() {
    // Create default user if doesn't exist
    if (!localStorage.getItem('userProfile')) {
        const defaultUser = {
            name: 'Jogador',
            bio: '',
            favoriteSystems: '',
            memberSince: new Date().toISOString(),
            stats: {
                characters: 0,
                notes: 0,
                sessions: 0
            }
        };
        localStorage.setItem('userProfile', JSON.stringify(defaultUser));
    }
    
    // Initialize characters array if doesn't exist
    if (!localStorage.getItem('characters')) {
        localStorage.setItem('characters', JSON.stringify([]));
    }
    
    // Initialize notes array if doesn't exist
    if (!localStorage.getItem('notes')) {
        localStorage.setItem('notes', JSON.stringify([]));
    }
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            navigateTo(page);
        });
    });
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Dice roller button
    document.getElementById('rollDiceBtn').addEventListener('click', () => {
        openDiceRoller();
    });
    
    // Search characters
    const searchInput = document.getElementById('searchCharacters');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterCharacters(e.target.value);
        });
    }
    
    // Filter by system
    const filterSystem = document.getElementById('filterSystem');
    if (filterSystem) {
        filterSystem.addEventListener('change', (e) => {
            filterCharactersBySystem(e.target.value);
        });
    }
    
    // Real-time preview in character editor
    ['charName', 'charClass', 'charLevel', 'charSystem'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateCharacterPreview);
        }
    });
}

// Navigation
function navigateTo(page) {
    // Update sidebar active state
    document.querySelectorAll('.sidebar-menu li').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });
    
    // Update page visibility
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(page).classList.add('active');
    
    AppState.currentPage = page;
    
    // Refresh content based on page
    switch(page) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'my-characters':
            displayAllCharacters();
            break;
        case 'notes':
            displayNotes();
            break;
        case 'profile':
            displayProfile();
            break;
    }
}

// Load user profile
function loadUserProfile() {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    AppState.currentUser = profile;
    document.getElementById('userNameNav').textContent = profile.name || 'Jogador';
}

// Load characters from localStorage
function loadCharacters() {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    AppState.characters = characters;
}

// Load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    AppState.notes = notes;
}

// Save characters to localStorage
function saveCharactersToStorage() {
    localStorage.setItem('characters', JSON.stringify(AppState.characters));
    updateUserStats();
}

// Save notes to localStorage
function saveNotesToStorage() {
    localStorage.setItem('notes', JSON.stringify(AppState.notes));
    updateUserStats();
}

// Update user stats
function updateUserStats() {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    profile.stats.characters = AppState.characters.length;
    profile.stats.notes = AppState.notes.length;
    
    // Count unique systems
    const systems = new Set(AppState.characters.map(c => c.system));
    profile.stats.systems = systems.size;
    
    // Count sessions from notes
    const sessions = AppState.notes.filter(n => n.type === 'session').length;
    profile.stats.sessions = sessions;
    
    localStorage.setItem('userProfile', JSON.stringify(profile));
    AppState.currentUser = profile;
}

// Update dashboard
function updateDashboard() {
    const profile = AppState.currentUser;
    
    // Update stat cards
    document.getElementById('totalCharacters').textContent = AppState.characters.length;
    document.getElementById('totalNotes').textContent = AppState.notes.length;
    document.getElementById('totalSessions').textContent = 
        AppState.notes.filter(n => n.type === 'session').length;
    
    // Count unique systems
    const systems = new Set(AppState.characters.map(c => c.system));
    document.getElementById('totalSystems').textContent = systems.size;
    
    // Display recent characters
    displayRecentCharacters();
}

// Display recent characters
function displayRecentCharacters() {
    const container = document.getElementById('recentCharactersGrid');
    const recentChars = AppState.characters.slice(-4).reverse();
    
    if (recentChars.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>Nenhum personagem criado</h3>
                <p>Comece criando sua primeira ficha de personagem!</p>
                <button class="btn btn-primary" onclick="navigateTo('create-character')">
                    <i class="fas fa-plus"></i> Criar Primeira Ficha
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recentChars.map(char => createCharacterCard(char)).join('');
}

// Display all characters
function displayAllCharacters() {
    const container = document.getElementById('allCharactersGrid');
    
    if (AppState.characters.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>Nenhum personagem encontrado</h3>
                <p>Crie sua primeira ficha de personagem!</p>
                <button class="btn btn-primary" onclick="navigateTo('create-character')">
                    <i class="fas fa-plus"></i> Criar Ficha
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = AppState.characters.map(char => createCharacterCard(char)).join('');
}

// Create character card HTML
function createCharacterCard(char) {
    const customFieldsHTML = char.customFields?.slice(0, 4).map(field => {
        let value = field.value || '-';
        if (field.type === 'checkbox') {
            value = field.value ? 'Sim' : 'Não';
        }
        return `
            <div class="char-stat">
                <label>${field.name}</label>
                <value>${value}</value>
            </div>
        `;
    }).join('') || '';

    return `
        <div class="character-card" onclick="viewCharacter('${char.id}')">
            <div class="character-header" style="position:relative;">
                <h3>${char.name}</h3>
                <div class="character-meta">
                    <span><i class="fas fa-shield-alt"></i> ${char.class || 'N/A'}</span>
                    <span><i class="fas fa-star"></i> ${char.level || 'N/A'}</span>
                </div>
                <div class="character-actions">
                    <button class="btn-icon delete" onclick="event.stopPropagation(); deleteCharacter('${char.id}')" aria-label="Excluir ficha">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="character-body">
                <span class="character-system">${char.system}</span>
                <div class="character-stats">
                    ${customFieldsHTML}
                </div>
            </div>
        </div>
    `;
}

// Filter characters by search
function filterCharacters(query) {
    const filtered = AppState.characters.filter(char => 
        char.name.toLowerCase().includes(query.toLowerCase()) ||
        char.class?.toLowerCase().includes(query.toLowerCase()) ||
        char.system.toLowerCase().includes(query.toLowerCase())
    );
    
    const container = document.getElementById('allCharactersGrid');
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Nenhum personagem encontrado</h3>
                <p>Tente uma busca diferente</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(char => createCharacterCard(char)).join('');
}

// Filter characters by system
function filterCharactersBySystem(system) {
    if (!system) {
        displayAllCharacters();
        return;
    }
    
    const filtered = AppState.characters.filter(char => char.system === system);
    const container = document.getElementById('allCharactersGrid');
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-filter"></i>
                <h3>Nenhum personagem neste sistema</h3>
                <p>Não há personagens de ${system}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(char => createCharacterCard(char)).join('');
}

// Display profile
function displayProfile() {
    const profile = AppState.currentUser;
    
    document.getElementById('playerName').value = profile.name || '';
    document.getElementById('playerBio').value = profile.bio || '';
    document.getElementById('favoriteSystems').value = profile.favoriteSystems || '';
    
    document.getElementById('profileCharacters').textContent = profile.stats.characters || 0;
    document.getElementById('profileNotes').textContent = profile.stats.notes || 0;
    document.getElementById('profileSessions').textContent = profile.stats.sessions || 0;
    
    const memberDate = new Date(profile.memberSince);
    document.getElementById('memberSince').textContent = memberDate.toLocaleDateString('pt-BR');
}

// Save profile
function saveProfile() {
    const profile = AppState.currentUser;
    
    profile.name = document.getElementById('playerName').value || 'Jogador';
    profile.bio = document.getElementById('playerBio').value || '';
    profile.favoriteSystems = document.getElementById('favoriteSystems').value || '';
    
    localStorage.setItem('userProfile', JSON.stringify(profile));
    AppState.currentUser = profile;
    
    document.getElementById('userNameNav').textContent = profile.name;
    
    showNotification('Perfil salvo com sucesso!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2d5f2e' : '#5f2d2d'};
        color: #e8e6e3;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 2px solid ${type === 'success' ? '#d4af37' : '#ff6b35'};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
