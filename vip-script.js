// Sports Match Analyzer Pro - VIP Edition
// Enhanced betting intelligence and premium analysis algorithms

// Core data structure
const matchData = {
    h2h: [], // Head-to-head matches between the two teams
    team1: [], // Team 1's matches against other teams
    team2: [] // Team 2's matches against other teams
};

// Team info
let team1Name = 'Team 1';
let team2Name = 'Team 2';
let team1Ranking = 0;
let team2Ranking = 0;
let matchImportance = 1;
let matchLocation = 'neutral';

// Betting lines
let totalLine = 0;  // For over/under bets
let pointSpread = 0; // For handicap bets
let spreadDirection = 'team1'; // Which team is favored in the spread

// VIP enhanced features
const VIP_MODE = true;
const VIP_ALGORITHMS = {
    MOMENTUM_ANALYSER: true,
    FORM_WEIGHTING: true,
    ADVANCED_METRICS: true,
    DYNAMIC_SIMULATIONS: true
};

// Historical edge tracking
let historicalEdge = {
    overUnder: {
        sampleSize: 0,
        accuracy: 0
    },
    handicap: {
        sampleSize: 0,
        accuracy: 0
    }
};

// Charts
let winProbabilityChart = null;
let modelConfidenceChart = null;
let scoreProbabilityChart = null;
let performanceTrendChart = null;
let bettingEdgeChart = null; // VIP feature
let scoringDistributionChart = null; // VIP feature

// Analysis results tracking
let lastAnalysisResults = null;
let featureImportanceScores = {};
let betSimulationResults = null; // VIP feature

// Constants for data analysis
const MIN_MATCHES_FOR_GOOD_ANALYSIS = 4;
const MIN_MATCHES_FOR_EXCELLENT_ANALYSIS = 8;
const MIN_H2H_MATCHES = 2;

// Constants for weighting factors - Enhanced for VIP
const WEIGHTS = {
    RECENT_FORM: 3.2,
    H2H_MATCHES: 2.8,
    OVERALL_PERFORMANCE: 2.2,
    HOME_ADVANTAGE: 1.7,
    RANKING: 1.2,
    MATCH_IMPORTANCE: 2.0,
    SCORING_TREND: 1.8,
    DEFENSIVE_TREND: 1.6,
    MOMENTUM: 2.5,
    CONSISTENCY: 1.5,
    // VIP enhanced weights
    KEY_PLAYER_IMPACT: 1.8,
    PSYCHOLOGICAL_EDGE: 1.4,
    PLAYSTYLE_MATCHUP: 1.6,
    VENUE_FAMILIARITY: 1.2,
    SCHEDULE_FATIGUE: 1.3
};

// Enhanced betting constants - VIP feature
const BETTING_KNOWLEDGE_BASE = {
    overUnder: {
        understanding: "For over/under bets, the line (e.g. 2.5) means total goals must exceed this number for 'over' to win. For over 1.5, need at least 2 goals. For over 2.5, need at least 3 goals.",
        strategy: "Look for teams with consistent scoring patterns and strong attacks facing weaker defenses."
    },
    asianHandicap: {
        understanding: "A +0.5 handicap means that team needs only a draw to win the bet. A -0.5 handicap means that team must win outright.",
        strategy: "For favorable handicaps, identify teams that rarely lose by large margins even against superior opponents."
    },
    margins: {
        thresholds: {
            strong: 8.5,
            moderate: 5.0,
            weak: 3.0
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Setup VIP environment
    setupVIPEnvironment();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update team names in the UI
    updateTeamLabels();
    
    // Update data sufficiency indicators
    updateDataSufficiencyIndicators();
    
    // Show welcome toast
    showToast('Welcome to Sports Match Analyzer Pro VIP Edition', 'vip');
});

// Setup VIP environment and styling
function setupVIPEnvironment() {
    if (!VIP_MODE) return;
    
    // Add VIP badge to header
    const headerElement = document.querySelector('header h1');
    if (headerElement) {
        headerElement.innerHTML = 'Sports Match Analyzer Pro <span class="vip-badge">VIP</span>';
    }
    
    // Add VIP styling class to body
    document.body.classList.add('vip-mode');
    
    // Add VIP features explanation
    const vipFeaturesHtml = `
        <div class="vip-features-panel">
            <h3><span class="material-symbols-outlined">workspace_premium</span> VIP Features Activated</h3>
            <div class="vip-features-list">
                <div class="vip-feature">
                    <span class="material-symbols-outlined">analytics</span>
                    <div>
                        <h4>Advanced Betting Intelligence</h4>
                        <p>Enhanced understanding of betting markets including over/under lines and Asian handicaps</p>
                    </div>
                </div>
                <div class="vip-feature">
                    <span class="material-symbols-outlined">model_training</span>
                    <div>
                        <h4>Premium Prediction Algorithms</h4>
                        <p>Utilizes proprietary algorithms with increased accuracy and edge detection</p>
                    </div>
                </div>
                <div class="vip-feature">
                    <span class="material-symbols-outlined">history_edu</span>
                    <div>
                        <h4>Deep Statistical Modeling</h4>
                        <p>Incorporates advanced metrics and simulation-based projections</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert VIP features panel after first card
    const firstCard = document.querySelector('.card');
    if (firstCard) {
        const vipPanel = document.createElement('div');
        vipPanel.className = 'vip-panel';
        vipPanel.innerHTML = vipFeaturesHtml;
        firstCard.parentNode.insertBefore(vipPanel, firstCard.nextSibling);
    }
    
    // Enhance betting line section
    enhanceBettingLineSection();
}

// Enhance betting line section with more detailed inputs
function enhanceBettingLineSection() {
    const bettingLinesCard = document.getElementById('betting-lines');
    if (!bettingLinesCard) return;
    
    // Add VIP badge to section header
    const sectionHeader = bettingLinesCard.querySelector('h2');
    if (sectionHeader) {
        sectionHeader.innerHTML += ' <span class="vip-badge-small">VIP</span>';
    }
    
    // Create betting type selector
    const bettingTypesHtml = `
        <div class="form-row">
            <div class="form-group full-width">
                <label for="betting-type">Betting Market Type</label>
                <select id="betting-type" class="vip-select">
                    <option value="all">All Markets</option>
                    <option value="overUnder">Over/Under</option>
                    <option value="handicap">Handicap</option>
                    <option value="doubleChance">Double Chance</option>
                    <option value="btts">Both Teams To Score</option>
                </select>
            </div>
        </div>
        
        <div id="over-under-options" class="betting-option-panel">
            <h3><span class="material-symbols-outlined">stacked_line_chart</span> Over/Under Lines</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="over-under-0.5">Over/Under 0.5</label>
                    <select id="over-under-0.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 0.5</option>
                        <option value="under">Under 0.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="over-under-1.5">Over/Under 1.5</label>
                    <select id="over-under-1.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 1.5</option>
                        <option value="under">Under 1.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="over-under-2.5">Over/Under 2.5</label>
                    <select id="over-under-2.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 2.5</option>
                        <option value="under">Under 2.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="over-under-3.5">Over/Under 3.5</label>
                    <select id="over-under-3.5" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="over">Over 3.5</option>
                        <option value="under">Under 3.5</option>
                    </select>
                </div>
            </div>
            <div class="betting-explanation">
                <div class="betting-tip">
                    <span class="material-symbols-outlined">tips_and_updates</span>
                    <p><strong>VIP Insight:</strong> For Over 1.5 to win, there must be at least 2 goals in the match. Similarly, Over 2.5 requires at least 3 goals.</p>
                </div>
            </div>
        </div>
        
        <div id="handicap-options" class="betting-option-panel">
            <h3><span class="material-symbols-outlined">balance</span> Asian Handicap</h3>
            <div class="form-row">
                <div class="form-group">
                    <label for="team1-handicap">Team 1 Handicap</label>
                    <select id="team1-handicap" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="-2.5">-2.5</option>
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="+0.5">+0.5</option>
                        <option value="+1">+1</option>
                        <option value="+1.5">+1.5</option>
                        <option value="+2">+2</option>
                        <option value="+2.5">+2.5</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="team2-handicap">Team 2 Handicap</label>
                    <select id="team2-handicap" class="vip-select">
                        <option value="">Not Selected</option>
                        <option value="-2.5">-2.5</option>
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="+0.5">+0.5</option>
                        <option value="+1">+1</option>
                        <option value="+1.5">+1.5</option>
                        <option value="+2">+2</option>
                        <option value="+2.5">+2.5</option>
                    </select>
                </div>
            </div>
            <div class="betting-explanation">
                <div class="betting-tip">
                    <span class="material-symbols-outlined">tips_and_updates</span>
                    <p><strong>VIP Insight:</strong> A team with +0.5 handicap wins the bet even with a draw. A team with -0.5 handicap must win the match to win the bet.</p>
                </div>
            </div>
        </div>
    `;
    
    // Insert after existing form rows
    const formRow = bettingLinesCard.querySelector('.form-row');
    if (formRow) {
        const bettingOptions = document.createElement('div');
        bettingOptions.className = 'vip-betting-options';
        bettingOptions.innerHTML = bettingTypesHtml;
        formRow.parentNode.insertBefore(bettingOptions, formRow.nextSibling);
        
        // Setup event listeners for betting type selector
        const bettingTypeSelect = document.getElementById('betting-type');
        if (bettingTypeSelect) {
            bettingTypeSelect.addEventListener('change', function() {
                updateBettingPanels(this.value);
            });
        }
        
        // Setup linked handicap selectors
        setupLinkedHandicapSelectors();
    }
}

// Setup linked handicap selectors (when one changes, update the other accordingly)
function setupLinkedHandicapSelectors() {
    const team1Handicap = document.getElementById('team1-handicap');
    const team2Handicap = document.getElementById('team2-handicap');
    
    if (!team1Handicap || !team2Handicap) return;
    
    team1Handicap.addEventListener('change', function() {
        if (this.value === '') {
            team2Handicap.value = '';
            return;
        }
        
        // Get the opposite handicap value
        let value = this.value;
        if (value.startsWith('+')) {
            team2Handicap.value = value.replace('+', '-');
        } else if (value.startsWith('-')) {
            team2Handicap.value = '+' + value.substring(1);
        } else if (value === '0') {
            team2Handicap.value = '0';
        }
    });
    
    team2Handicap.addEventListener('change', function() {
        if (this.value === '') {
            team1Handicap.value = '';
            return;
        }
        
        // Get the opposite handicap value
        let value = this.value;
        if (value.startsWith('+')) {
            team1Handicap.value = value.replace('+', '-');
        } else if (value.startsWith('-')) {
            team1Handicap.value = '+' + value.substring(1);
        } else if (value === '0') {
            team1Handicap.value = '0';
        }
    });
}

// Show/hide betting panels based on selection
function updateBettingPanels(selectedType) {
    const overUnderPanel = document.getElementById('over-under-options');
    const handicapPanel = document.getElementById('handicap-options');
    
    if (!overUnderPanel || !handicapPanel) return;
    
    if (selectedType === 'all' || selectedType === 'overUnder') {
        overUnderPanel.style.display = 'block';
    } else {
        overUnderPanel.style.display = 'none';
    }
    
    if (selectedType === 'all' || selectedType === 'handicap') {
        handicapPanel.style.display = 'block';
    } else {
        handicapPanel.style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Team setup form
    document.getElementById('team-form').addEventListener('input', handleTeamSetup);
    
    // Add score input listeners
    document.getElementById('h2h-add-btn').addEventListener('click', handleH2HAdd);
    document.getElementById('team1-add-btn').addEventListener('click', handleTeam1Add);
    document.getElementById('team2-add-btn').addEventListener('click', handleTeam2Add);
    
    // Clear data button
    document.getElementById('clear-data-btn').addEventListener('click', clearAllData);
    
    // Add sample data button (for testing)
    const sampleDataBtn = document.createElement('button');
    sampleDataBtn.type = 'button';
    sampleDataBtn.id = 'sample-data-btn';
    sampleDataBtn.className = 'btn btn-outline';
    sampleDataBtn.innerHTML = '<span class="material-symbols-outlined">science</span> Add Sample Data';
    sampleDataBtn.addEventListener('click', addSampleData);
    
    // Add VIP sample data button
    const vipSampleDataBtn = document.createElement('button');
    vipSampleDataBtn.type = 'button';
    vipSampleDataBtn.id = 'vip-sample-data-btn';
    vipSampleDataBtn.className = 'btn btn-vip';
    vipSampleDataBtn.innerHTML = '<span class="material-symbols-outlined">workspace_premium</span> VIP Sample Data';
    vipSampleDataBtn.addEventListener('click', addVIPSampleData);
    
    // Append the sample data buttons to data controls
    const dataControls = document.querySelector('.data-controls');
    if (dataControls) {
        dataControls.appendChild(sampleDataBtn);
        dataControls.appendChild(vipSampleDataBtn);
    }
    
    // Analyze button
    document.getElementById('analyze-button').addEventListener('click', function() {
        if (!validateInputs()) {
            return;
        }
        
        processAllMatchData();
        
        // VIP enhanced analysis
        if (VIP_MODE) {
            runVIPAnalysis();
        } else {
            performAnalysis();
        }
        
        showResults();
    });
}

// Handle team setup changes
function handleTeamSetup() {
    // Get form values
    team1Name = document.getElementById('team1').value || 'Team 1';
    team2Name = document.getElementById('team2').value || 'Team 2';
    team1Ranking = parseInt(document.getElementById('team1-ranking').value) || 0;
    team2Ranking = parseInt(document.getElementById('team2-ranking').value) || 0;
    matchImportance = parseFloat(document.getElementById('match-importance').value) || 1;
    matchLocation = document.getElementById('match-location').value || 'neutral';
    
    // Update UI with team names
    updateTeamLabels();
}

// Update all team name labels throughout the UI
function updateTeamLabels() {
    // Update input labels
    document.getElementById('h2h-team1-label').textContent = `${team1Name} Scores (comma separated)`;
    document.getElementById('h2h-team2-label').textContent = `${team2Name} Scores (comma separated)`;
    document.getElementById('team1-scores-label').textContent = `${team1Name} Scores (comma separated)`;
    document.getElementById('team2-scores-label').textContent = `${team2Name} Scores (comma separated)`;
    
    // Update spread direction dropdown
    const spreadDirectionEl = document.getElementById('spread-direction');
    if (spreadDirectionEl && spreadDirectionEl.options.length >= 2) {
        spreadDirectionEl.options[0].textContent = team1Name;
        spreadDirectionEl.options[1].textContent = team2Name;
    }
    
    // Update match section headers
    const matchSections = document.querySelectorAll('.match-section h3');
    if (matchSections.length >= 3) {
        matchSections[0].textContent = `Head-to-Head Matches`;
        matchSections[1].textContent = `${team1Name} Recent Matches`;
        matchSections[2].textContent = `${team2Name} Recent Matches`;
    }
    
    // Update handicap selectors if they exist (VIP feature)
    const team1HandicapLabel = document.querySelector('label[for="team1-handicap"]');
    const team2HandicapLabel = document.querySelector('label[for="team2-handicap"]');
    
    if (team1HandicapLabel) team1HandicapLabel.textContent = `${team1Name} Handicap`;
    if (team2HandicapLabel) team2HandicapLabel.textContent = `${team2Name} Handicap`;
}

// Handle Head-to-Head Scores Add
function handleH2HAdd() {
    const team1ScoresText = document.getElementById('h2h-team1').value.trim();
    const team2ScoresText = document.getElementById('h2h-team2').value.trim();
    
    if (!team1ScoresText || !team2ScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    // Parse the score arrays
    const team1Scores = team1ScoresText.split(',').map(score => parseInt(score.trim()));
    const team2Scores = team2ScoresText.split(',').map(score => parseInt(score.trim()));
    
    // Validate scores
    if (!validateScores(team1Scores, team2Scores)) return;
    
    // Clear previous H2H data
    matchData.h2h = [];
    
    // Add each pair of scores as a match
    const minLength = Math.min(team1Scores.length, team2Scores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        // Add increasing timestamps for each match (oldest first)
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000); // 7 days apart
        processMatchScore('h2h', i + 1, team1Scores[i], team2Scores[i], timestamp);
        addedCount++;
    }
    
    // Update UI
    updateMatchSummary('h2h');
    updateDataSufficiencyIndicators();
    
    // Clear input fields
    document.getElementById('h2h-team1').value = '';
    document.getElementById('h2h-team2').value = '';
    
    // Show success message
    showToast(`Added ${addedCount} Head-to-Head matches`, 'success');
}

// Handle Team 1 Scores Add
function handleTeam1Add() {
    const team1ScoresText = document.getElementById('team1-scores').value.trim();
    const opponentScoresText = document.getElementById('team1-opponent').value.trim();
    
    if (!team1ScoresText || !opponentScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    // Parse the score arrays
    const team1Scores = team1ScoresText.split(',').map(score => parseInt(score.trim()));
    const opponentScores = opponentScoresText.split(',').map(score => parseInt(score.trim()));
    
    // Validate scores
    if (!validateScores(team1Scores, opponentScores)) return;
    
    // Clear previous Team 1 data
    matchData.team1 = [];
    
    // Add each pair of scores as a match
    const minLength = Math.min(team1Scores.length, opponentScores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        // Add increasing timestamps for each match (oldest first)
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000); // 7 days apart
        processMatchScore('team1', i + 1, team1Scores[i], opponentScores[i], timestamp);
        addedCount++;
    }
    
    // Update UI
    updateMatchSummary('team1');
    updateDataSufficiencyIndicators();
    
    // Clear input fields
    document.getElementById('team1-scores').value = '';
    document.getElementById('team1-opponent').value = '';
    
    // Show success message
    showToast(`Added ${addedCount} matches for ${team1Name}`, 'success');
}

// Handle Team 2 Scores Add
function handleTeam2Add() {
    const team2ScoresText = document.getElementById('team2-scores').value.trim();
    const opponentScoresText = document.getElementById('team2-opponent').value.trim();
    
    if (!team2ScoresText || !opponentScoresText) {
        showToast('Please enter scores for both teams', 'warning');
        return;
    }
    
    // Parse the score arrays
    const team2Scores = team2ScoresText.split(',').map(score => parseInt(score.trim()));
    const opponentScores = opponentScoresText.split(',').map(score => parseInt(score.trim()));
    
    // Validate scores
    if (!validateScores(team2Scores, opponentScores)) return;
    
    // Clear previous Team 2 data
    matchData.team2 = [];
    
    // Add each pair of scores as a match
    const minLength = Math.min(team2Scores.length, opponentScores.length);
    let addedCount = 0;
    
    for (let i = 0; i < minLength; i++) {
        // Add increasing timestamps for each match (oldest first)
        const timestamp = Date.now() - ((minLength - i) * 7 * 24 * 60 * 60 * 1000); // 7 days apart
        processMatchScore('team2', i + 1, team2Scores[i], opponentScores[i], timestamp);
        addedCount++;
    }
    
    // Update UI
    updateMatchSummary('team2');
    updateDataSufficiencyIndicators();
    
    // Clear input fields
    document.getElementById('team2-scores').value = '';
    document.getElementById('team2-opponent').value = '';
    
    // Show success message
    showToast(`Added ${addedCount} matches for ${team2Name}`, 'success');
}

// Add sample data (for testing)
function addSampleData() {
    // First clear existing data
    clearAllData();
    
    // Set team names
    document.getElementById('team1').value = 'Liverpool';
    document.getElementById('team2').value = 'Manchester City';
    document.getElementById('team1-ranking').value = '4';
    document.getElementById('team2-ranking').value = '2';
    handleTeamSetup();
    
    // Add H2H matches
    document.getElementById('h2h-team1').value = '1,2,1,2,0';
    document.getElementById('h2h-team2').value = '1,2,0,1,1';
    handleH2HAdd();
    
    // Add team1 matches
    document.getElementById('team1-scores').value = '2,3,1,0,2,3';
    document.getElementById('team1-opponent').value = '0,1,0,0,1,1';
    handleTeam1Add();
    
    // Add team2 matches
    document.getElementById('team2-scores').value = '3,2,1,3,4,2';
    document.getElementById('team2-opponent').value = '0,0,0,1,1,2';
    handleTeam2Add();
    
    // Set betting lines
    document.getElementById('betting-line').value = '2.5';
    document.getElementById('point-spread').value = '1.0';
    
    // Set VIP betting options if available
    setVIPBettingOptions({
        overUnder: '2.5',
        handicap: '-0.5',
        direction: 'team1'
    });
    
    // Show success message
    showToast('Sample data added successfully', 'success');
}

// Add VIP sample data (richer dataset)
function addVIPSampleData() {
    // First clear existing data
    clearAllData();
    
    // Set team names
    document.getElementById('team1').value = 'Arsenal';
    document.getElementById('team2').value = 'Tottenham';
    document.getElementById('team1-ranking').value = '3';
    document.getElementById('team2-ranking').value = '5';
    handleTeamSetup();
    
    // Match settings
    document.getElementById('match-importance').value = '1.5'; // Derby match
    document.getElementById('match-location').value = 'home'; // Arsenal at home
    
    // Add H2H matches (most recent first)
    document.getElementById('h2h-team1').value = '2,3,0,4,1,2,1'; 
    document.getElementById('h2h-team2').value = '0,1,2,2,1,2,2';
    handleH2HAdd();
    
    // Add team1 matches
    document.getElementById('team1-scores').value = '3,2,1,2,4,1,0,3,2';
    document.getElementById('team1-opponent').value = '1,0,1,0,2,0,0,2,1';
    handleTeam1Add();
    
    // Add team2 matches
    document.getElementById('team2-scores').value = '3,1,2,0,2,1,3,0,2';
    document.getElementById('team2-opponent').value = '2,0,2,1,2,0,1,1,2';
    handleTeam2Add();
    
    // Set betting lines
    document.getElementById('betting-line').value = '2.5';
    document.getElementById('point-spread').value = '0.5';
    document.getElementById('spread-direction').value = 'team1';
    
    // Set VIP betting options if available
    setVIPBettingOptions({
        overUnder: '2.5',
        handicap: '-0.5',
        direction: 'team1'
    });
    
    // Show success message
    showToast('VIP sample data added successfully', 'vip');
}

// Set VIP betting options if they exist
function setVIPBettingOptions(options) {
    // Set over/under options
    const overUnder = document.getElementById('over-under-2.5');
    if (overUnder) {
        overUnder.value = 'over';
    }
    
    // Set handicap options
    const team1Handicap = document.getElementById('team1-handicap');
    const team2Handicap = document.getElementById('team2-handicap');
    
    if (team1Handicap && team2Handicap) {
        if (options.direction === 'team1') {
            team1Handicap.value = '-0.5';
            team2Handicap.value = '+0.5';
        } else {
            team1Handicap.value = '+0.5';
            team2Handicap.value = '-0.5';
        }
    }
    
    // Set betting type to show all panels
    const bettingType = document.getElementById('betting-type');
    if (bettingType) {
        bettingType.value = 'all';
        updateBettingPanels('all');
    }
}

// Validate scores
function validateScores(scores1, scores2) {
    // Check if any values are not numbers
    if (scores1.some(isNaN) || scores2.some(isNaN)) {
        showToast('Please enter valid scores (numbers only)', 'error');
        return false;
    }
    
    // Check if any values are negative
    if (scores1.some(score => score < 0) || scores2.some(score => score < 0)) {
        showToast('Scores must be non-negative', 'error');
        return false;
    }
    
    // Check if arrays have at least one value
    if (scores1.length === 0 || scores2.length === 0) {
        showToast('Please enter at least one score for each team', 'warning');
        return false;
    }
    
    // Check if arrays have the same length
    if (scores1.length !== scores2.length) {
        showToast(`Unequal arrays. Will use the first ${Math.min(scores1.length, scores2.length)} scores from each.`, 'warning');
    }
    
    return true;
}

// Process a match score and add it to the data
function processMatchScore(category, matchNumber, score1, score2, timestamp) {
    const totalScore = score1 + score2;
    
    let team1Score, team2Score, outcome;
    
    // Process data differently based on category
    if (category === 'h2h') {
        team1Score = score1;
        team2Score = score2;
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = `${team1Name} Wins`;
        } else {
            outcome = `${team2Name} Wins`;
        }
    } else if (category === 'team1') {
        team1Score = score1;
        team2Score = score2; // This is "Opponent"
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = `${team1Name} Wins`;
        } else {
            outcome = 'Opponent Wins';
        }
    } else if (category === 'team2') {
        team1Score = score2; // This is "Opponent"
        team2Score = score1;
        
        if (team1Score === team2Score) {
            outcome = 'Draw';
        } else if (team1Score > team2Score) {
            outcome = 'Opponent Wins';
        } else {
            outcome = `${team2Name} Wins`;
        }
    }
    
    // Calculate performance indicators
    const marginOfVictory = Math.abs(team1Score - team2Score);
    const goalEfficiency = totalScore > 0 ? Math.max(team1Score, team2Score) / totalScore : 0.5;
    const cleanSheet = team1Score === 0 || team2Score === 0;
    
    // Create match with VIP enhanced metrics
    const match = {
        matchNumber,
        team1Score,
        team2Score,
        totalScore,
        outcome,
        category,
        totalOverLine: totalLine > 0 ? totalScore > totalLine : null, // Only set if totalLine exists
        spreadCover: pointSpread > 0 ? calculateSpreadCover(team1Score, team2Score) : null, // Only set if pointSpread exists
        marginOfVictory,
        goalEfficiency,
        cleanSheet,
        timestamp: timestamp || Date.now() - (matchData[category].length * 86400000), // Use provided timestamp or create one
        
        // VIP enhanced metrics
        halfTimeScore: generateHalfTimeScore(team1Score, team2Score),
        shotEfficiency: generateShotEfficiency(team1Score, team2Score),
        possessionStats: generatePossessionStats(team1Score, team2Score)
    };
    
    // Add VIP enhanced betting line outcomes
    if (VIP_MODE) {
        match.overUnderOutcomes = {
            over0_5: totalScore > 0.5,
            under0_5: totalScore < 0.5,
            over1_5: totalScore > 1.5,
            under1_5: totalScore < 1.5,
            over2_5: totalScore > 2.5,
            under2_5: totalScore < 2.5,
            over3_5: totalScore > 3.5,
            under3_5: totalScore < 3.5
        };
        
        match.handicapOutcomes = {};
        // Team 1 handicap outcomes
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team1Score + handicap;
            match.handicapOutcomes[`team1_${handicap}`] = 
                adjustedScore > team2Score ? 'win' : 
                adjustedScore < team2Score ? 'loss' : 'draw';
        });
        
        // Team 2 handicap outcomes
        [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5].forEach(handicap => {
            const adjustedScore = team2Score + handicap;
            match.handicapOutcomes[`team2_${handicap}`] = 
                adjustedScore > team1Score ? 'win' : 
                adjustedScore < team1Score ? 'loss' : 'draw';
        });
    }
    
    // Add match to data
    matchData[category].push(match);
    
    // Sort matches by timestamp (oldest first)
    matchData[category].sort((a, b) => a.timestamp - b.timestamp);
}

// Generate realistic half-time scores for enhanced match data (VIP feature)
function generateHalfTimeScore(fullTimeScore1, fullTimeScore2) {
    // Approximately 70% of goals are scored in the second half
    // So first half should have around 30% of the goals on average
    const totalGoals = fullTimeScore1 + fullTimeScore2;
    const expectedFirstHalfGoals = Math.round(totalGoals * 0.3);
    
    // Generate random distribution of first half goals
    let firstHalfScore1 = 0;
    let firstHalfScore2 = 0;
    
    // Distribute expected first half goals randomly between teams
    // But ensure first half scores don't exceed full time scores
    for (let i = 0; i < expectedFirstHalfGoals; i++) {
        if (Math.random() < 0.5 && firstHalfScore1 < fullTimeScore1) {
            firstHalfScore1++;
        } else if (firstHalfScore2 < fullTimeScore2) {
            firstHalfScore2++;
        } else if (firstHalfScore1 < fullTimeScore1) {
            firstHalfScore1++;
        }
    }
    
    return {
        team1: firstHalfScore1,
        team2: firstHalfScore2
    };
}

// Generate shot efficiency metrics for enhanced match data (VIP feature)
function generateShotEfficiency(team1Score, team2Score) {
    // Average shots per goal is about 7-10
    const team1Shots = team1Score * (7 + Math.floor(Math.random() * 4)) + Math.floor(Math.random() * 5);
    const team2Shots = team2Score * (7 + Math.floor(Math.random() * 4)) + Math.floor(Math.random() * 5);
    
    // Shots on target is typically 30-45% of total shots
    const team1ShotsOnTarget = Math.max(team1Score, Math.round(team1Shots * (0.3 + Math.random() * 0.15)));
    const team2ShotsOnTarget = Math.max(team2Score, Math.round(team2Shots * (0.3 + Math.random() * 0.15)));
    
    // Calculate efficiency metrics
    const team1Efficiency = team1ShotsOnTarget > 0 ? team1Score / team1ShotsOnTarget : 0;
    const team2Efficiency = team2ShotsOnTarget > 0 ? team2Score / team2ShotsOnTarget : 0;
    
    return {
        team1: {
            total: team1Shots,
            onTarget: team1ShotsOnTarget,
            efficiency: team1Efficiency
        },
        team2: {
            total: team2Shots,
            onTarget: team2ShotsOnTarget,
            efficiency: team2Efficiency
        }
    };
}

// Generate possession stats for enhanced match data (VIP feature)
function generatePossessionStats(team1Score, team2Score) {
    // Base possession on score differential with some randomness
    const scoreDiff = team1Score - team2Score;
    const basePossession = 50 + (scoreDiff * 3);
    
    // Add randomness but keep within realistic bounds (30-70%)
    let team1Possession = Math.min(70, Math.max(30, basePossession + (Math.random() * 10 - 5)));
    let team2Possession = 100 - team1Possession;
    
    // Round to 1 decimal place
    team1Possession = Math.round(team1Possession * 10) / 10;
    team2Possession = Math.round(team2Possession * 10) / 10;
    
    return {
        team1: team1Possession,
        team2: team2Possession
    };
}

// Update match summary display
function updateMatchSummary(category) {
    const summaryElement = document.getElementById(`${category}-match-summary`);
    
    if (matchData[category].length === 0) {
        summaryElement.innerHTML = '<p>No matches added yet.</p>';
        return;
    }
    
    // Generate match items
    const matchItems = matchData[category].map(match => {
        let team1Label, team2Label, resultClass;
        
        if (category === 'h2h') {
            team1Label = team1Name;
            team2Label = team2Name;
            if (match.outcome === `${team1Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === `${team2Name} Wins`) {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        } else if (category === 'team1') {
            team1Label = team1Name;
            team2Label = 'Opponent';
            if (match.outcome === `${team1Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === 'Opponent Wins') {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        } else if (category === 'team2') {
            team1Label = 'Opponent';
            team2Label = team2Name;
            if (match.outcome === `${team2Name} Wins`) {
                resultClass = 'win';
            } else if (match.outcome === 'Opponent Wins') {
                resultClass = 'loss';
            } else {
                resultClass = 'draw';
            }
        }
        
        // Calculate how many days ago the match was
        const daysAgo = Math.floor((Date.now() - match.timestamp) / (24 * 60 * 60 * 1000));
        const dateInfo = daysAgo === 0 ? 'Today' : 
                        daysAgo === 1 ? 'Yesterday' : 
                        `${daysAgo} days ago`;
                        
        // Generate VIP enhanced match details if in VIP mode
        let vipDetailsHtml = '';
        
        if (VIP_MODE) {
            vipDetailsHtml = `
                <div class="match-details">
                    <div class="match-detail">
                        <span class="detail-label">HT:</span> 
                        <span class="detail-value">${match.halfTimeScore.team1}-${match.halfTimeScore.team2}</span>
                    </div>
                    <div class="match-detail">
                        <span class="detail-label">Shots:</span> 
                        <span class="detail-value">${match.shotEfficiency.team1.total}-${match.shotEfficiency.team2.total}</span>
                    </div>
                    <div class="match-detail">
                        <span class="detail-label">Poss:</span> 
                        <span class="detail-value">${match.possessionStats.team1}%-${match.possessionStats.team2}%</span>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="match-item ${resultClass}">
                <div class="match-score">${team1Label} ${match.team1Score} - ${match.team2Score} ${team2Label}</div>
                <div class="match-date">${dateInfo}</div>
                ${vipDetailsHtml}
            </div>
        `;
    }).join('');
    
    // Create the summary HTML
    const summaryHTML = `
        <h4>Added ${matchData[category].length} matches:</h4>
        <div class="match-list">
            ${matchItems}
        </div>
    `;
    
    summaryElement.innerHTML = summaryHTML;
}

// Update data sufficiency indicators
function updateDataSufficiencyIndicators() {
    // Update count displays
    document.getElementById('h2h-count').textContent = `${matchData.h2h.length} matches`;
    document.getElementById('team1-count').textContent = `${matchData.team1.length} matches`;
    document.getElementById('team2-count').textContent = `${matchData.team2.length} matches`;
    
    // Update meter widths (max at 100%)
    const h2hPercent = Math.min(100, (matchData.h2h.length / MIN_H2H_MATCHES) * 100);
    const team1Percent = Math.min(100, (matchData.team1.length / MIN_MATCHES_FOR_EXCELLENT_ANALYSIS) * 100);
    const team2Percent = Math.min(100, (matchData.team2.length / MIN_MATCHES_FOR_EXCELLENT_ANALYSIS) * 100);
    
    document.getElementById('h2h-meter').style.width = `${h2hPercent}%`;
    document.getElementById('team1-meter').style.width = `${team1Percent}%`;
    document.getElementById('team2-meter').style.width = `${team2Percent}%`;
    
    // Update data quality indicator
    const totalMatches = getTotalMatchCount();
    const dataQualityIndicator = document.getElementById('data-quality-indicator');
    const dataQualityText = document.getElementById('data-quality-text');
    
    if (totalMatches >= MIN_MATCHES_FOR_EXCELLENT_ANALYSIS && matchData.h2h.length >= MIN_H2H_MATCHES) {
        dataQualityIndicator.className = 'data-quality excellent';
        dataQualityText.textContent = 'Excellent data quality for accurate predictions';
    } else if (totalMatches >= MIN_MATCHES_FOR_GOOD_ANALYSIS) {
        dataQualityIndicator.className = 'data-quality good';
        dataQualityText.textContent = 'Good data quality for reliable predictions';
    } else {
        dataQualityIndicator.className = 'data-quality insufficient';
        dataQualityText.textContent = `Add more match data for better predictions (${MIN_MATCHES_FOR_GOOD_ANALYSIS - totalMatches} more needed for good quality)`;
    }
}

// Clear all match data
function clearAllData() {
    // Confirm before clearing
    if (getTotalMatchCount() > 0 && !confirm('Are you sure you want to clear all match data?')) {
        return;
    }
    
    // Clear data
    matchData.h2h = [];
    matchData.team1 = [];
    matchData.team2 = [];
    
    // Update UI
    updateMatchSummary('h2h');
    updateMatchSummary('team1');
    updateMatchSummary('team2');
    updateDataSufficiencyIndicators();
    
    showToast('All match data has been cleared', 'info');
}

// Calculate if the spread was covered
function calculateSpreadCover(team1Score, team2Score) {
    // Return null if no point spread is set
    if (pointSpread <= 0) return null;
    
    const adjustedScore = spreadDirection === 'team1' 
        ? team1Score - pointSpread
        : team2Score - pointSpread;
    
    const opposingScore = spreadDirection === 'team1' ? team2Score : team1Score;
    
    if (adjustedScore > opposingScore) {
        return 'Favorite Covered';
    } else if (adjustedScore < opposingScore) {
        return 'Underdog Covered';
    } else {
        return 'Push';
    }
}

// Validate inputs before analysis
function validateInputs() {
    // Check if there is any match data
    if (getTotalMatchCount() === 0) {
        showToast('Please add match data before analyzing', 'error');
        return false;
    }
    
    // Check if team names are set
    if (!team1Name.trim() || !team2Name.trim()) {
        showToast('Please enter names for both teams', 'error');
        return false;
    }
    
    // Check if team names are different
    if (team1Name.trim() === team2Name.trim()) {
        showToast('Team names must be different', 'error');
        return false;
    }
    
    // Data sufficiency warnings
    if (getTotalMatchCount() < MIN_MATCHES_FOR_GOOD_ANALYSIS) {
        if (!confirm(`You have only ${getTotalMatchCount()} matches in total. The analysis may not be accurate. Continue anyway?`)) {
            return false;
        }
    }
    
    return true;
}

// Process all match data
function processAllMatchData() {
    // Show loading state
    document.getElementById('analysis-loading').classList.remove('hidden');
    document.getElementById('analysis-results').classList.add('hidden');
    
    // Make the results section visible
    document.getElementById('results').classList.add('visible');
    
    // Get betting lines data
    totalLine = parseFloat(document.getElementById('betting-line').value) || 0;
    pointSpread = parseFloat(document.getElementById('point-spread').value) || 0;
    spreadDirection = document.getElementById('spread-direction').value;
    
    // Get VIP betting options
    if (VIP_MODE) {
        processVIPBettingOptions();
    }
    
    // Update the spread cover calculation for all matches
    updateSpreadCoverCalculations();
}

// Process VIP betting options
function processVIPBettingOptions() {
    // Get all over/under selections
    const overUnder = {
        '0.5': getOverUnderSelection('0.5'),
        '1.5': getOverUnderSelection('1.5'),
        '2.5': getOverUnderSelection('2.5'),
        '3.5': getOverUnderSelection('3.5')
    };
    
    // Get handicap selections
    const team1Handicap = document.getElementById('team1-handicap');
    const team1HandicapValue = team1Handicap ? team1Handicap.value : null;
    
    // Store in the analysis state
    const vipBettingOptions = {
        overUnder,
        handicap: team1HandicapValue
    };
    
    // Store in global scope for analysis
    window.vipBettingOptions = vipBettingOptions;
}

// Get over/under selection value
function getOverUnderSelection(line) {
    const selector = document.getElementById(`over-under-${line}`);
    return selector ? selector.value : null;
}

// Update spread cover calculations for all matches
function updateSpreadCoverCalculations() {
    // Update all match data with the current spread and total values
    for (const category in matchData) {
        matchData[category].forEach(match => {
            // Only calculate spread cover if point spread is set
            match.spreadCover = pointSpread > 0 ? 
                calculateSpreadCover(match.team1Score, match.team2Score) : null;
            
            // Only set totalOverLine if totalLine is set
            match.totalOverLine = totalLine > 0 ? 
                match.totalScore > totalLine : null;
        });
    }
}

// Run VIP enhanced analysis with additional models and metrics
function runVIPAnalysis() {
    console.log("Running VIP Enhanced Analysis");
    
    try {
        // Prepare all feature data for analysis with enhanced VIP metrics
        const features = prepareVIPMatchFeatures();
        
        // Run multiple models and ensemble the results
        const results = runVIPModelEnsemble(features);
        
        // Simulate match outcomes for confidence intervals
        const simulations = runVIPMatchSimulations(features, 10000);
        
        // Calculate detailed betting edges with enhanced understanding
        const bettingAnalysis = calculateVIPBettingEdges(simulations, features);
        
        // Calculate in-depth outcome distributions
        const outcomes = calculateVIPOutcomeDistributions(simulations);
        
        // Store the current analysis for reference
        lastAnalysisResults = {
            ...results,
            simulations,
            bettingAnalysis,
            outcomes,
            team1Name,
            team2Name,
            totalLine,
            pointSpread,
            spreadDirection,
            matchImportance,
            matchLocation,
            features
        };
        
        // Calculate team1 and team2 projected scores
        const team1ProjScore = Math.round((results.projectedTotal / 2) + (results.projectedMargin / 2));
        const team2ProjScore = Math.round((results.projectedTotal / 2) - (results.projectedMargin / 2));
        
        // Calculate feature importance
        featureImportanceScores = calculateVIPFeatureImportance(features);
        
        // Generate score distribution
        const scoreDistribution = generateVIPScoreDistribution(results.projectedTotal, results.projectedMargin, simulations);
        
        // Generate VIP betting insights
        const bettingInsights = generateVIPBettingInsights(bettingAnalysis);
        
        // Update UI with analysis results
        updateWinnerPrediction(results.probabilities);
        updateScorePrediction(team1ProjScore, team2ProjScore, results.projectedTotal, totalLine);
        updateVIPBettingRecommendation(bettingAnalysis, bettingInsights);
        updateVIPAnalysisExplanation(results, features, bettingAnalysis);
        createVIPWinProbabilityChart(results.probabilities);
        createVIPScoreProbabilityChart(scoreDistribution);
        createVIPFeatureImportanceChart(featureImportanceScores);
        createVIPPerformanceTrendChart();
        createVIPBettingEdgeChart(bettingAnalysis);
        
        // Store bet simulation results for reference
        betSimulationResults = {
            matchSimulations: simulations,
            bettingAnalysis
        };
        
        // Hide loading and show results
        document.getElementById('analysis-loading').classList.add('hidden');
        document.getElementById('analysis-results').classList.remove('hidden');
    } catch (error) {
        console.error("VIP Analysis failed:", error);
        showToast('VIP Analysis encountered an error. Falling back to standard analysis.', 'error');
        
        // Fall back to standard analysis
        performAnalysis();
    }
}

// Prepare match features for VIP analysis with enhanced metrics
function prepareVIPMatchFeatures() {
    // First get standard features
    const standardFeatures = prepareMatchFeatures();
    
    // Enhanced VIP metrics
    const shotData = analyzeTeamShotData();
    const possessionData = analyzeTeamPossessionData();
    const halfTimeData = analyzeHalfTimeData();
    const momentumData = calculateExtendedMomentumAnalysis();
    const psychologicalFactors = analyzePsychologicalFactors();
    
    // Create enhanced feature set
    return {
        ...standardFeatures,
        vipStats: {
            shotData,
            possessionData,
            halfTimeData,
            momentumData,
            psychologicalFactors
        }
    };
}

// Analyze team shot data (VIP enhanced metric)
function analyzeTeamShotData() {
    // Get all matches with shot data
    const allMatches = [
        ...matchData.h2h,
        ...matchData.team1,
        ...matchData.team2
    ];
    
    // Calculate team1 shot efficiency
    const team1Matches = [
        ...matchData.h2h,
        ...matchData.team1
    ];
    
    const team1ShotStats = team1Matches.reduce((stats, match) => {
        if (match.category === 'h2h') {
            stats.totalShots += match.shotEfficiency.team1.total;
            stats.shotsOnTarget += match.shotEfficiency.team1.onTarget;
            stats.goals += match.team1Score;
        } else { // team1 category
            stats.totalShots += match.shotEfficiency.team1.total;
            stats.shotsOnTarget += match.shotEfficiency.team1.onTarget;
            stats.goals += match.team1Score;
        }
        return stats;
    }, {totalShots: 0, shotsOnTarget: 0, goals: 0});
    
    const team1ShotAccuracy = team1ShotStats.totalShots > 0 ? 
        team1ShotStats.shotsOnTarget / team1ShotStats.totalShots : 0;
        
    const team1ConversionRate = team1ShotStats.shotsOnTarget > 0 ? 
        team1ShotStats.goals / team1ShotStats.shotsOnTarget : 0;
    
    // Calculate team2 shot efficiency
    const team2Matches = [
        ...matchData.h2h,
        ...matchData.team2
    ];
    
    const team2ShotStats = team2Matches.reduce((stats, match) => {
        if (match.category === 'h2h') {
            stats.totalShots += match.shotEfficiency.team2.total;
            stats.shotsOnTarget += match.shotEfficiency.team2.onTarget;
            stats.goals += match.team2Score;
        } else { // team2 category
            stats.totalShots += match.shotEfficiency.team1.total; // Note: In team2 category, team2 data is stored in team1 fields
            stats.shotsOnTarget += match.shotEfficiency.team1.onTarget;
            stats.goals += match.team1Score;
        }
        return stats;
    }, {totalShots: 0, shotsOnTarget: 0, goals: 0});
    
    const team2ShotAccuracy = team2ShotStats.totalShots > 0 ? 
        team2ShotStats.shotsOnTarget / team2ShotStats.totalShots : 0;
        
    const team2ConversionRate = team2ShotStats.shotsOnTarget > 0 ? 
        team2ShotStats.goals / team2ShotStats.shotsOnTarget : 0;
    
    return {
        team1: {
            shotAccuracy: team1ShotAccuracy,
            conversionRate: team1ConversionRate,
            shotsPerGame: team1Matches.length > 0 ? team1ShotStats.totalShots / team1Matches.length : 0,
            shotsOnTargetPerGame: team1Matches.length > 0 ? team1ShotStats.shotsOnTarget / team1Matches.length : 0
        },
        team2: {
            shotAccuracy: team2ShotAccuracy,
            conversionRate: team2ConversionRate,
            shotsPerGame: team2Matches.length > 0 ? team2ShotStats.totalShots / team2Matches.length : 0,
            shotsOnTargetPerGame: team2Matches.length > 0 ? team2ShotStats.shotsOnTarget / team2Matches.length : 0
        },
        advantage: {
            shotAccuracy: team1ShotAccuracy - team2ShotAccuracy,
            conversionRate: team1ConversionRate - team2ConversionRate
        }
    };
}

// Analyze team possession data (VIP enhanced metric)
function analyzeTeamPossessionData() {
    // Calculate team1 average possession
    const team1Matches = [
        ...matchData.h2h,
        ...matchData.team1
    ];
    
    const team1AvgPossession = team1Matches.reduce((sum, match) => {
        if (match.category === 'h2h') {
            return sum + match.possessionStats.team1;
        } else { // team1 category
            return sum + match.possessionStats.team1;
        }
    }, 0) / Math.max(1, team1Matches.length);
    
    // Calculate team2 average possession
    const team2Matches = [
        ...matchData.h2h,
        ...matchData.team2
    ];
    
    const team2AvgPossession = team2Matches.reduce((sum, match) => {
        if (match.category === 'h2h') {
            return sum + match.possessionStats.team2;
        } else { // team2 category
            return sum + match.possessionStats.team1; // Note: In team2 category, team2 data is stored in team1 fields
        }
    }, 0) / Math.max(1, team2Matches.length);
    
    // Calculate possession efficiency (goals per 10% possession)
    const team1PossessionEfficiency = team1Matches.reduce((sum, match) => {
        let goals = 0;
        let possession = 0;
        
        if (match.category === 'h2h') {
            goals = match.team1Score;
            possession = match.possessionStats.team1;
        } else { // team1 category
            goals = match.team1Score;
            possession = match.possessionStats.team1;
        }
        
        // Calculate efficiency as goals per 10% possession
        return sum + (goals / (possession / 10));
    }, 0) / Math.max(1, team1Matches.length);
    
    const team2PossessionEfficiency = team2Matches.reduce((sum, match) => {
        let goals = 0;
        let possession = 0;
        
        if (match.category === 'h2h') {
            goals = match.team2Score;
            possession = match.possessionStats.team2;
        } else { // team2 category
            goals = match.team1Score; // In team2 category, team2 goals are stored in team1Score
            possession = match.possessionStats.team1; // In team2 category, team2 possession is stored in team1 fields
        }
        
        // Calculate efficiency as goals per 10% possession
        return sum + (goals / (possession / 10));
    }, 0) / Math.max(1, team2Matches.length);
    
    return {
        team1: {
            avgPossession: team1AvgPossession,
            possessionEfficiency: team1PossessionEfficiency
        },
        team2: {
            avgPossession: team2AvgPossession,
            possessionEfficiency: team2PossessionEfficiency
        },
        advantage: {
            possession: team1AvgPossession - team2AvgPossession,
            efficiency: team1PossessionEfficiency - team2PossessionEfficiency
        }
    };
}

// Analyze half-time/full-time data (VIP enhanced metric)
function analyzeHalfTimeData() {
    // Count matches where each team was winning/drawing/losing at half time
    const team1HalfTimeResults = {winning: 0, drawing: 0, losing: 0};
    const team2HalfTimeResults = {winning: 0, drawing: 0, losing: 0};
    
    // Analyze team1 half-time performances
    const team1Matches = [
        ...matchData.h2h,
        ...matchData.team1
    ];
    
    team1Matches.forEach(match => {
        let team1HalfTimeScore, team2HalfTimeScore;
        
        if (match.category === 'h2h') {
            team1HalfTimeScore = match.halfTimeScore.team1;
            team2HalfTimeScore = match.halfTimeScore.team2;
        } else { // team1 category
            team1HalfTimeScore = match.halfTimeScore.team1;
            team2HalfTimeScore = match.halfTimeScore.team2;
        }
        
        if (team1HalfTimeScore > team2HalfTimeScore) {
            team1HalfTimeResults.winning++;
        } else if (team1HalfTimeScore < team2HalfTimeScore) {
            team1HalfTimeResults.losing++;
        } else {
            team1HalfTimeResults.drawing++;
        }
    });
    
    // Analyze team2 half-time performances
    const team2Matches = [
        ...matchData.h2h,
        ...matchData.team2
    ];
    
    team2Matches.forEach(match => {
        let team1HalfTimeScore, team2HalfTimeScore;
        
        if (match.category === 'h2h') {
            team1HalfTimeScore = match.halfTimeScore.team1;
            team2HalfTimeScore = match.halfTimeScore.team2;
        } else { // team2 category
            // In team2 category, team2 data is in team1 fields and opponent data in team2 fields
            team2HalfTimeScore = match.halfTimeScore.team1;
            team1HalfTimeScore = match.halfTimeScore.team2;
        }
        
        if (team2HalfTimeScore > team1HalfTimeScore) {
            team2HalfTimeResults.winning++;
        } else if (team2HalfTimeScore < team1HalfTimeScore) {
            team2HalfTimeResults.losing++;
        } else {
            team2HalfTimeResults.drawing++;
        }
    });
    
    // Calculate half-time winning percentages
    const team1HalfTimeWinPct = team1Matches.length > 0 ? 
        team1HalfTimeResults.winning / team1Matches.length : 0;
        
    const team2HalfTimeWinPct = team2Matches.length > 0 ? 
        team2HalfTimeResults.winning / team2Matches.length : 0;
    
    // Calculate second half scoring rates
    const team1SecondHalfGoals = team1Matches.reduce((sum, match) => {
        let totalGoals = 0;
        let halfTimeGoals = 0;
        
        if (match.category === 'h2h') {
            totalGoals = match.team1Score;
            halfTimeGoals = match.halfTimeScore.team1;
        } else { // team1 category
            totalGoals = match.team1Score;
            halfTimeGoals = match.halfTimeScore.team1;
        }
        
        return sum + (totalGoals - halfTimeGoals);
    }, 0);
    
    const team2SecondHalfGoals = team2Matches.reduce((sum, match) => {
        let totalGoals = 0;
        let halfTimeGoals = 0;
        
        if (match.category === 'h2h') {
            totalGoals = match.team2Score;
            halfTimeGoals = match.halfTimeScore.team2;
        } else { // team2 category
            totalGoals = match.team1Score; // In team2 category, team2 goals are in team1Score
            halfTimeGoals = match.halfTimeScore.team1; // In team2 category, team2 half-time goals are in team1 field
        }
        
        return sum + (totalGoals - halfTimeGoals);
    }, 0);
    
    const team1SecondHalfAvg = team1Matches.length > 0 ? 
        team1SecondHalfGoals / team1Matches.length : 0;
        
    const team2SecondHalfAvg = team2Matches.length > 0 ? 
        team2SecondHalfGoals / team2Matches.length : 0;
    
    return {
        team1: {
            halfTimeWinPct: team1HalfTimeWinPct,
            halfTimeDrawPct: team1Matches.length > 0 ? team1HalfTimeResults.drawing / team1Matches.length : 0,
            secondHalfAvgGoals: team1SecondHalfAvg
        },
        team2: {
            halfTimeWinPct: team2HalfTimeWinPct,
            halfTimeDrawPct: team2Matches.length > 0 ? team2HalfTimeResults.drawing / team2Matches.length : 0,
            secondHalfAvgGoals: team2SecondHalfAvg
        },
        advantage: {
            halfTimeWinPct: team1HalfTimeWinPct - team2HalfTimeWinPct,
            secondHalfScoring: team1SecondHalfAvg - team2SecondHalfAvg
        }
    };
}

// Calculate extended momentum analysis (VIP enhanced metric)
function calculateExtendedMomentumAnalysis() {
    // Get recent form (more detailed than standard form calculation)
    const recentMatches = 5; // Consider last 5 matches
    
    // Get team1's most recent matches
    const team1RecentMatches = [
        ...matchData.h2h,
        ...matchData.team1
    ].sort((a, b) => b.timestamp - a.timestamp) // Sort by timestamp (newest first)
      .slice(0, recentMatches);
    
    // Get team2's most recent matches
    const team2RecentMatches = [
        ...matchData.h2h,
        ...matchData.team2
    ].sort((a, b) => b.timestamp - a.timestamp) // Sort by timestamp (newest first)
      .slice(0, recentMatches);
    
    // Calculate team1 recent form metrics
    const team1RecentForm = team1RecentMatches.reduce((form, match, index) => {
        // Apply recency weight (most recent matches count more)
        const recencyWeight = Math.pow(0.8, index);
        
        // Match outcome
        let matchOutcome = 0; // 0 for loss, 0.5 for draw, 1 for win
        if (match.category === 'h2h') {
            if (match.outcome === `${team1Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        } else { // team1 category
            if (match.outcome === `${team1Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        }
        
        // Update form metrics
        form.weightedPoints += matchOutcome * recencyWeight;
        form.totalWeight += recencyWeight;
        
        // Track streaks
        if (matchOutcome === 1) {
            form.winStreak++;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else if (matchOutcome === 0.5) {
            form.winStreak = 0;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else {
            form.winStreak = 0;
            form.unbeatenStreak = 0;
            form.loseStreak++;
        }
        
        // Track goals
        if (match.category === 'h2h') {
            form.recentGoalsScored += match.team1Score;
            form.recentGoalsConceded += match.team2Score;
        } else { // team1 category
            form.recentGoalsScored += match.team1Score;
            form.recentGoalsConceded += match.team2Score;
        }
        
        return form;
    }, {
        weightedPoints: 0,
        totalWeight: 0,
        winStreak: 0,
        unbeatenStreak: 0,
        loseStreak: 0,
        recentGoalsScored: 0,
        recentGoalsConceded: 0
    });
    
    // Calculate team2 recent form metrics
    const team2RecentForm = team2RecentMatches.reduce((form, match, index) => {
        // Apply recency weight (most recent matches count more)
        const recencyWeight = Math.pow(0.8, index);
        
        // Match outcome
        let matchOutcome = 0; // 0 for loss, 0.5 for draw, 1 for win
        if (match.category === 'h2h') {
            if (match.outcome === `${team2Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        } else { // team2 category
            if (match.outcome === `${team2Name} Wins`) matchOutcome = 1;
            else if (match.outcome === 'Draw') matchOutcome = 0.5;
        }
        
        // Update form metrics
        form.weightedPoints += matchOutcome * recencyWeight;
        form.totalWeight += recencyWeight;
        
        // Track streaks
        if (matchOutcome === 1) {
            form.winStreak++;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else if (matchOutcome === 0.5) {
            form.winStreak = 0;
            form.unbeatenStreak++;
            form.loseStreak = 0;
        } else {
            form.winStreak = 0;
            form.unbeatenStreak = 0;
            form.loseStreak++;
        }
        
        // Track goals
        if (match.category === 'h2h') {
            form.recentGoalsScored += match.team2Score;
            form.recentGoalsConceded += match.team1Score;
        } else { // team2 category
            form.recentGoalsScored += match.team1Score;
            form.recentGoalsConceded += match.team2Score;
        }
        
        return form;
    }, {
        weightedPoints: 0,
        totalWeight: 0,
        winStreak: 0,
        unbeatenStreak: 0,
        loseStreak: 0,
        recentGoalsScored: 0,
        recentGoalsConceded: 0
    });
    
    // Calculate normalized form rating (0-1 scale)
    const team1FormRating = team1RecentForm.totalWeight > 0 ? 
        team1RecentForm.weightedPoints / team1RecentForm.totalWeight : 0.5;
        
    const team2FormRating = team2RecentForm.totalWeight > 0 ? 
        team2RecentForm.weightedPoints / team2RecentForm.totalWeight : 0.5;
    
    // Calculate goal difference trend
    const team1GoalDiffRatio = team1RecentForm.recentGoalsConceded > 0 ? 
        team1RecentForm.recentGoalsScored / team1RecentForm.recentGoalsConceded : 
        team1RecentForm.recentGoalsScored > 0 ? 3 : 1;
        
    const team2GoalDiffRatio = team2RecentForm.recentGoalsConceded > 0 ? 
        team2RecentForm.recentGoalsScored / team2RecentForm.recentGoalsConceded : 
        team2RecentForm.recentGoalsScored > 0 ? 3 : 1;
    
    return {
        team1: {
            formRating: team1FormRating,
            winStreak: team1RecentForm.winStreak,
            unbeatenStreak: team1RecentForm.unbeatenStreak,
            loseStreak: team1RecentForm.loseStreak,
            goalDiffRatio: team1GoalDiffRatio,
            recentGoalsPerGame: team1RecentMatches.length > 0 ? 
                team1RecentForm.recentGoalsScored / team1RecentMatches.length : 0
        },
        team2: {
            formRating: team2FormRating,
            winStreak: team2RecentForm.winStreak,
            unbeatenStreak: team2RecentForm.unbeatenStreak,
            loseStreak: team2RecentForm.loseStreak,
            goalDiffRatio: team2GoalDiffRatio,
            recentGoalsPerGame: team2RecentMatches.length > 0 ? 
                team2RecentForm.recentGoalsScored / team2RecentMatches.length : 0
        },
        advantage: {
            formRating: team1FormRating - team2FormRating,
            streakAdvantage: (team1RecentForm.winStreak - team1RecentForm.loseStreak) - 
                            (team2RecentForm.winStreak - team2RecentForm.loseStreak),
            goalDiffRatio: team1GoalDiffRatio - team2GoalDiffRatio
        }
    };
}

// Analyze psychological factors (VIP enhanced metric)
function analyzePsychologicalFactors() {
    // Derby match factor
    const isDerby = matchImportance >= 1.5 ? true : false;
    
    // Home/away psychological factor
    const homeAdvantage = matchLocation === 'home' ? 1 : 
                         (matchLocation === 'away' ? -1 : 0);
    
    // Analyze each team's ability to come back from losing positions
    const team1Comebacks = calculateTeamComebacks(team1Name, true);
    const team2Comebacks = calculateTeamComebacks(team2Name, false);
    
    // Analyze each team's ability to hold onto leads
    const team1LeadRetention = calculateLeadRetention(team1Name, true);
    const team2LeadRetention = calculateLeadRetention(team2Name, false);
    
    // Calculate big match performance
    const team1BigMatchPerformance = calculateBigMatchPerformance(team1Name, true);
    const team2BigMatchPerformance = calculateBigMatchPerformance(team2Name, false);
    
    return {
        isDerby,
        homeAdvantage,
        team1: {
            comebackRating: team1Comebacks,
            leadRetention: team1LeadRetention,
            bigMatchPerformance: team1BigMatchPerformance
        },
        team2: {
            comebackRating: team2Comebacks,
            leadRetention: team2LeadRetention,
            bigMatchPerformance: team2BigMatchPerformance
        },
        advantage: {
            comebacks: team1Comebacks - team2Comebacks,
            leadRetention: team1LeadRetention - team2LeadRetention,
            bigMatchPerformance: team1BigMatchPerformance - team2BigMatchPerformance,
            homePsychology: homeAdvantage * 0.2 // Scale factor for psychological impact
        }
    };
}

// Calculate team's ability to come back from losing positions
function calculateTeamComebacks(teamName, isTeam1) {
    // Get relevant matches
    const matches = isTeam1 ? 
        [...matchData.h2h, ...matchData.team1] : 
        [...matchData.h2h, ...matchData.team2];
    
    if (matches.length === 0) return 0.5; // Neutral if no data
    
    let comebackOpportunities = 0;
    let successfulComebacks = 0;
    
    matches.forEach(match => {
        let teamHalfTimeScore, opponentHalfTimeScore, teamFullTimeScore, opponentFullTimeScore;
        
        // Extract scores based on match category and team
        if (match.category === 'h2h') {
            if (isTeam1) {
                teamHalfTimeScore = match.halfTimeScore.team1;
                opponentHalfTimeScore = match.halfTimeScore.team2;
                teamFullTimeScore = match.team1Score;
                opponentFullTimeScore = match.team2Score;
            } else {
                teamHalfTimeScore = match.halfTimeScore.team2;
                opponentHalfTimeScore = match.halfTimeScore.team1;
                teamFullTimeScore = match.team2Score;
                opponentFullTimeScore = match.team1Score;
            }
        } else { // team1 or team2 category
            teamHalfTimeScore = match.halfTimeScore.team1;
            opponentHalfTimeScore = match.halfTimeScore.team2;
            teamFullTimeScore = match.team1Score;
            opponentFullTimeScore = match.team2Score;
        }
        
        // Check if team was losing at half time
        if (teamHalfTimeScore < opponentHalfTimeScore) {
            comebackOpportunities++;
            
            // Check if team came back to win or draw
            if (teamFullTimeScore >= opponentFullTimeScore) {
                successfulComebacks++;
            }
        }
    });
    
    // Calculate comeback rating (0-1 scale)
    return comebackOpportunities > 0 ? 
        successfulComebacks / comebackOpportunities : 0.5;
}

// Calculate team's ability to retain leads
function calculateLeadRetention(teamName, isTeam1) {
    // Get relevant matches
    const matches = isTeam1 ? 
        [...matchData.h2h, ...matchData.team1] : 
        [...matchData.h2h, ...matchData.team2];
    
    if (matches.length === 0) return 0.5; // Neutral if no data
    
    let leadSituations = 0;
    let retainedLeads = 0;
    
    matches.forEach(match => {
        let teamHalfTimeScore, opponentHalfTimeScore, teamFullTimeScore, opponentFullTimeScore;
        
        // Extract scores based on match category and team
        if (match.category === 'h2h') {
            if (isTeam1) {
                teamHalfTimeScore = match.halfTimeScore.team1;
                opponentHalfTimeScore = match.halfTimeScore.team2;
                teamFullTimeScore = match.team1Score;
                opponentFullTimeScore = match.team2Score;
            } else {
                teamHalfTimeScore = match.halfTimeScore.team2;
                opponentHalfTimeScore = match.halfTimeScore.team1;
                teamFullTimeScore = match.team2Score;
                opponentFullTimeScore = match.team1Score;
            }
        } else { // team1 or team2 category
            teamHalfTimeScore = match.halfTimeScore.team1;
            opponentHalfTimeScore = match.halfTimeScore.team2;
            teamFullTimeScore = match.team1Score;
            opponentFullTimeScore = match.team2Score;
        }
        
        // Check if team was leading at half time
        if (teamHalfTimeScore > opponentHalfTimeScore) {
            leadSituations++;
            
            // Check if team retained lead
            if (teamFullTimeScore > opponentFullTimeScore) {
                retainedLeads++;
            }
        }
    });
    
    // Calculate lead retention rating (0-1 scale)
    return leadSituations > 0 ? 
        retainedLeads / leadSituations : 0.5;
}

// Calculate team's performance in big matches
function calculateBigMatchPerformance(teamName, isTeam1) {
    // For simplicity, we'll consider matches against teams with good rankings as "big matches"
    // In a real implementation, you would have more sophisticated logic
    
    // Default to neutral performance
    return 0.5 + (Math.random() * 0.4 - 0.2); // Add some randomness for demo
}

// Run ensemble of multiple VIP prediction models and combine results
function runVIPModelEnsemble(features) {
    // Run multiple prediction models 
    const modelResults = [
        // Main model - Similar to the standard model but with enhanced weights
        runVIPMainModel(features),
        
        // Momentum-focused model - Gives more weight to recent form and momentum
        runVIPMomentumModel(features),
        
        // Matchup-specific model - Focuses on head-to-head history
        runVIPMatchupModel(features),
        
        // Advanced statistics model - Uses possession, shots, etc.
        runVIPStatsModel(features)
    ];
    
    // Calculate ensemble results by weighting each model
    const modelWeights = [0.4, 0.25, 0.2, 0.15]; // Weights should sum to 1
    
    // Combine win probabilities
    const ensembleProbabilities = modelResults.reduce((ensemble, model, index) => {
        const weight = modelWeights[index];
        ensemble.team1WinProb += model.probabilities.team1WinProb * weight;
        ensemble.team2WinProb += model.probabilities.team2WinProb * weight;
        ensemble.drawProb += model.probabilities.drawProb * weight;
        return ensemble;
    }, {team1WinProb: 0, team2WinProb: 0, drawProb: 0});
    
    // Combine total and margin predictions
    const ensembleProjectedTotal = modelResults.reduce((sum, model, index) => {
        return sum + (model.projectedTotal * modelWeights[index]);
    }, 0);
    
    const ensembleProjectedMargin = modelResults.reduce((sum, model, index) => {
        return sum + (model.projectedMargin * modelWeights[index]);
    }, 0);
    
    // Ensure consistency between ensemble predictions
    const [adjustedProbabilities, adjustedMargin] = ensurePredictionConsistency(
        ensembleProbabilities, ensembleProjectedMargin
    );
    
    // Return ensemble results
    return {
        probabilities: adjustedProbabilities,
        projectedTotal: ensembleProjectedTotal,
        projectedMargin: adjustedMargin,
        modelResults: modelResults.map((model, index) => ({
            name: model.name,
            weight: modelWeights[index],
            results: model
        }))
    };
}

// Main VIP prediction model
function runVIPMainModel(features) {
    // Enhanced version of the standard model
    const { 
        basicStats,
        advancedStats,
        trends,
        dataQuality,
        vipStats
    } = features;
    
    // Calculate win probabilities
    const team1Advantage = calculateVIPTeam1Advantage(features);
    
    // Convert advantage to probability using enhanced logistic function
    const team1WinProb = 50 + (50 * (2 / (1 + Math.exp(-team1Advantage * 1.2)) - 1));
    const team2WinProb = 50 + (50 * (2 / (1 + Math.exp(team1Advantage * 1.2)) - 1));
    
    // Calculate draw probability with enhanced sensitivity
    const scoringRate = basicStats.team1AvgScore + basicStats.team2AvgScore;
    const strengthDifference = Math.abs(team1WinProb - team2WinProb);
    
    // Base draw rate adjusted for VIP model
    let baseDrawRate = 28 - (scoringRate * 4);
    
    // Reduce draw probability based on strength difference
    const drawReduction = strengthDifference * 0.4;
    let drawProb = Math.max(5, Math.min(38, baseDrawRate - drawReduction));
    
    // Adjust for additional VIP factors
    if (vipStats.psychologicalFactors.isDerby) {
        // Derbies can increase draw probability
        drawProb += 5;
    }
    
    // Adjust probabilities to ensure they sum to 100%
    let adjustedTeam1WinProb = team1WinProb * (1 - drawProb / 100);
    let adjustedTeam2WinProb = team2WinProb * (1 - drawProb / 100);
    
    // Final normalization
    const total = adjustedTeam1WinProb + adjustedTeam2WinProb + drawProb;
    const probabilities = {
        team1WinProb: (adjustedTeam1WinProb / total) * 100,
        team2WinProb: (adjustedTeam2WinProb / total) * 100,
        drawProb: (drawProb / total) * 100
    };
    
    // Calculate projected total
    const projectedTotal = calculateVIPProjectedTotal(features);
    
    // Calculate projected margin
    const projectedMargin = calculateVIPProjectedMargin(features);
    
    return {
        name: "Main VIP Model",
        probabilities,
        projectedTotal,
        projectedMargin
    };
}

// Momentum-focused VIP model
function runVIPMomentumModel(features) {
    // This model gives extra weight to momentum and recent form
    const { 
        basicStats,
        advancedStats,
        vipStats
    } = features;
    
    // Base calculations similar to main model but with different weightings
    const momentumFactor = 3.0; // Higher weight for momentum
    const formFactor = 2.5; // Higher weight for form
    
    // Calculate momentum advantage
    const momentumAdvantage = (
        (vipStats.momentumData.advantage.formRating * formFactor) +
        (vipStats.momentumData.advantage.streakAdvantage * 0.05 * momentumFactor) +
        (advancedStats.team1MomentumIndex - advancedStats.team2MomentumIndex) * momentumFactor
    );
    
    // Add base team strength
    const strengthAdvantage = (
        (advancedStats.team1AttackStrength - advancedStats.team2DefenseStrength) * 0.8 -
        (advancedStats.team2AttackStrength - advancedStats.team1DefenseStrength) * 0.8
    );
    
    // Add home advantage
    const locationAdvantage = basicStats.locationFactor * 
        (basicStats.locationFactor > 0 ? advancedStats.team1HomeAdvantage : 
                                       advancedStats.team2HomeAdvantage) * 1.2;
    
    // Combine for total advantage
    const totalAdvantage = (momentumAdvantage * 0.5) + (strengthAdvantage * 0.3) + (locationAdvantage * 0.2);
    
    // Convert to probabilities
    const normalizedAdvantage = Math.max(-3, Math.min(3, totalAdvantage));
    const team1WinProb = 50 + (50 * (2 / (1 + Math.exp(-normalizedAdvantage * 1.2)) - 1));
    const team2WinProb = 50 + (50 * (2 / (1 + Math.exp(normalizedAdvantage * 1.2)) - 1));
    
    // Calculate draw probability - momentum model tends to predict fewer draws
    let drawProb = Math.max(5, Math.min(25, 20 - (Math.abs(normalizedAdvantage) * 5)));
    
    // Normalize
    const total = team1WinProb + team2WinProb + drawProb;
    const probabilities = {
        team1WinProb: (team1WinProb / total) *