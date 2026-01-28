// Dice Roller System

let diceHistory = [];

// Open dice roller
function openDiceRoller() {
    const modal = document.getElementById('diceRollerModal');
    if (!modal) return;
    modal.classList.add('active');
    displayDiceHistory();
}

// Close dice roller
function closeDiceRoller() {
    const modal = document.getElementById('diceRollerModal');
    if (!modal) return;
    modal.classList.remove('active');
}
// Roll dice
function rollDice(sides) {
    const resultDiv = document.getElementById('diceResult');
    if (!resultDiv) return;

    const result = Math.floor(Math.random() * sides) + 1;

    resultDiv.innerHTML = `<p class="dice-rolling">🎲</p>`;

    setTimeout(() => {
        resultDiv.innerHTML = `
            <p style="animation: bounceIn 0.5s ease;">${result}</p>
            <p style="font-size: 1rem; margin-top: 0.5rem; color: var(--text-secondary);">
                d${sides}
            </p>
        `;

        diceHistory.unshift({
            dice: `d${sides}`,
            result,
            timestamp: new Date().toLocaleTimeString('pt-BR')
        });

        diceHistory = diceHistory.slice(0, 20);
        displayDiceHistory();
        playDiceSound();
    }, 300);
}

// Display dice history
function displayDiceHistory() {
    const historyList = document.getElementById('diceHistoryList');
    if (!historyList) return;
    if (diceHistory.length === 0) {
        historyList.innerHTML = '<li style="text-align: center; color: var(--text-muted);">Nenhuma rolagem ainda</li>';
        return;
    }
    
    historyList.innerHTML = diceHistory.map(roll => `
        <li>
            <span>${roll.dice}: <strong style="color: var(--accent-primary);">${roll.result}</strong></span>
            <span style="color: var(--text-muted); font-size: 0.85rem;">${roll.timestamp}</span>
        </li>
    `).join('');
}

// Roll multiple dice
function rollMultipleDice(count, sides, modifier = 0) {
    const results = [];
    let total = 0;
    
    for (let i = 0; i < count; i++) {
        const result = Math.floor(Math.random() * sides) + 1;
        results.push(result);
        total += result;
    }
    
    total += modifier;
    
    return {
        results: results,
        total: total,
        modifier: modifier,
        formula: `${count}d${sides}${modifier !== 0 ? (modifier > 0 ? '+' + modifier : modifier) : ''}`
    };
}

// Advanced dice roller (with formula parsing)
function rollFormula(formula) {
    // Parse formula like "2d20+5" or "3d6-2"
    const match = formula.match(/(\d+)d(\d+)([+-]\d+)?/i);
    
    if (!match) {
        showNotification('Fórmula inválida! Use formato como "2d20+5"', 'error');
        return null;
    }
    
    const count = parseInt(match[1]);
    const sides = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;
    
    return rollMultipleDice(count, sides, modifier);
}

// Roll with advantage (D&D 5e)
function rollWithAdvantage(sides = 20) {
    const roll1 = Math.floor(Math.random() * sides) + 1;
    const roll2 = Math.floor(Math.random() * sides) + 1;
    const result = Math.max(roll1, roll2);
    
 const resultDiv = document.getElementById('diceResult');
if (!resultDiv) return;
    resultDiv.innerHTML = `
        <p style="animation: bounceIn 0.5s ease;">${result}</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-secondary);">
            Vantagem d${sides}<br>
            <span style="font-size: 0.8rem; color: var(--text-muted);">
                (Rolagens: ${roll1}, ${roll2})
            </span>
        </p>
    `;
    
    diceHistory.unshift({
        dice: `Vantagem d${sides}`,
        result: `${result} (${roll1}, ${roll2})`,
        timestamp: new Date().toLocaleTimeString('pt-BR')
    });
    
    displayDiceHistory();
}

// Roll with disadvantage (D&D 5e)
function rollWithDisadvantage(sides = 20) {
    const roll1 = Math.floor(Math.random() * sides) + 1;
    const roll2 = Math.floor(Math.random() * sides) + 1;
    const result = Math.min(roll1, roll2);
    
    const resultDiv = document.getElementById('diceResult');
    resultDiv.innerHTML = `
        <p style="animation: bounceIn 0.5s ease;">${result}</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem; color: var(--text-secondary);">
            Desvantagem d${sides}<br>
            <span style="font-size: 0.8rem; color: var(--text-muted);">
                (Rolagens: ${roll1}, ${roll2})
            </span>
        </p>
    `;
    
    diceHistory.unshift({
        dice: `Desvantagem d${sides}`,
        result: `${result} (${roll1}, ${roll2})`,
        timestamp: new Date().toLocaleTimeString('pt-BR')
    });
    
    displayDiceHistory();
}

// Clear dice history
function clearDiceHistory() {
    if (confirm('Deseja limpar o histórico de rolagens?')) {
        diceHistory = [];
        displayDiceHistory();
        showNotification('Histórico limpo!', 'success');
    }
}

// Play dice sound (optional - silent for now)
function playDiceSound() {
    // Optional: Add sound effect here
    // For now, just visual feedback
}

// Add bounce animation
const diceStyle = document.createElement('style');
diceStyle.textContent = `
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .dice-rolling {
        animation: spin 0.3s linear infinite;
        font-size: 3rem;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(diceStyle);

// Initialize dice roller on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard shortcut for dice roller (Ctrl/Cmd + D)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D'
) {
            e.preventDefault();
            openDiceRoller();
        }
    });
});
