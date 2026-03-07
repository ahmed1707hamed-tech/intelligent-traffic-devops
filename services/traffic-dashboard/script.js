/**
 * PRODUCTION-READY INTELLIGENT TRAFFIC DASHBOARD
 * Modular Code Structure based on DevOps requirements.
 */

const API_URL = "http://localhost:8000/traffic";
const POLLING_INTERVAL = 5000;

// State management
let trafficData = [];
let charts = {
    volume: null,
    location: null
};

// Grafana-inspired palette
const grafanaColors = ['#3274d9', '#73bf69', '#ff9830', '#f2495d', '#b164f0', '#51efc1', '#ecc30b'];

/**
 * START DASHBOARD
 */
function init() {
    updateClock();
    setInterval(updateClock, 1000);

    // Initialize Charts
    initCharts();

    // Initial Fetch
    fetchTrafficData();

    // Auto Refresh
    setInterval(fetchTrafficData, POLLING_INTERVAL);
}

/**
 * 1. API INTEGRATION: fetchTrafficData()
 */
async function fetchTrafficData() {
    const statusEl = document.getElementById('connection-status');
    const errorOverlay = document.getElementById('error-overlay');
    const loadingOverlay = document.getElementById('loading-overlay');

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Backend API not reachable");

        trafficData = await response.json();

        // Success Update
        statusEl.className = 'status-indicator connected';
        statusEl.querySelector('.status-text').textContent = 'Connected';
        errorOverlay.style.display = 'none';

        // Update Components
        updateDashboard();

    } catch (error) {
        console.warn("Connection Status: FATAL:", error.message);

        // Fail Update
        statusEl.className = 'status-indicator disconnected';
        statusEl.querySelector('.status-text').textContent = 'Disconnected';

        // Error UI
        if (trafficData.length === 0) {
            errorOverlay.style.display = 'flex';
        }
    } finally {
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => loadingOverlay.style.display = 'none', 500);
        }
    }
}

/**
 * MAIN UPDATE HANDLER
 */
function updateDashboard() {
    updateStats();
    updateCharts();
    updateTable();
    showAlerts();
}

/**
 * 2. STATISTICS: updateStats()
 */
function updateStats() {
    const total = trafficData.reduce((sum, item) => sum + item.vehicle_count, 0);
    const avg = Math.round(total / (trafficData.length || 1));

    // Congestion calculation
    const locTotals = {};
    trafficData.forEach(item => {
        locTotals[item.location] = (locTotals[item.location] || 0) + item.vehicle_count;
    });

    let maxLoc = "---";
    let maxCount = 0;
    for (const loc in locTotals) {
        if (locTotals[loc] > maxCount) {
            maxCount = locTotals[loc];
            maxLoc = loc;
        }
    }

    document.getElementById('stat-total').textContent = total.toLocaleString();
    document.getElementById('stat-avg').textContent = avg.toLocaleString();
    document.getElementById('stat-congested').textContent = maxLoc;
    document.getElementById('stat-congested-val').textContent = `${maxCount} vehicles`;

    // Dynamic colors for health
    const avgEl = document.getElementById('stat-avg');
    avgEl.style.color = avg > 150 ? 'var(--accent-red)' : 'var(--accent-green)';
}

/**
 * 3. CHARTS: updateCharts()
 */
function updateCharts() {
    if (!charts.volume || !charts.location) return;

    const sorted = [...trafficData].sort((a, b) => a.time.localeCompare(b.time));
    const locations = [...new Set(sorted.map(d => d.location))];
    const last10Times = [...new Set(sorted.map(d => d.time))].slice(-10);

    // Time Series Update
    charts.volume.data.labels = last10Times;
    charts.volume.data.datasets = locations.map((loc, idx) => {
        const color = grafanaColors[idx % grafanaColors.length];
        return {
            label: loc,
            data: last10Times.map(t => {
                const entry = sorted.find(d => d.location === loc && d.time === t);
                return entry ? entry.vehicle_count : null;
            }),
            borderColor: color,
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 0
        };
    });
    charts.volume.update('none');

    // Location Bar Update
    const locTotals = {};
    trafficData.forEach(d => { locTotals[d.location] = (locTotals[d.location] || 0) + d.vehicle_count; });

    charts.location.data.labels = Object.keys(locTotals);
    charts.location.data.datasets[0].data = Object.values(locTotals);
    charts.location.data.datasets[0].backgroundColor = grafanaColors.map(c => `${c}80`);
    charts.location.data.datasets[0].borderColor = grafanaColors;
    charts.location.update('none');
}

/**
 * 4. TABLE: updateTable()
 */
function updateTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    [...trafficData].slice(-15).reverse().forEach(item => {
        const isCongested = item.vehicle_count > 150;
        const row = document.createElement('tr');
        if (isCongested) row.className = 'row-alert';

        row.innerHTML = `
      <td>${item.location}</td>
      <td>${item.time}</td>
      <td>${item.vehicle_count}</td>
      <td style="color: ${isCongested ? 'var(--accent-red)' : 'var(--accent-green)'}">
        ${isCongested ? '⚠ HEAVY' : '✓ CLEAR'}
      </td>
    `;
        tbody.appendChild(row);
    });
}

/**
 * 5. ALERTS: showAlerts()
 */
function showAlerts() {
    const banner = document.getElementById('alert-banner');
    const criticals = trafficData.filter(d => d.vehicle_count > 150);

    if (criticals.length > 0) {
        banner.style.display = 'flex';
        banner.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      <span>CRITICAL ALERT: Heavy congestion detected at <strong>${criticals[0].location}</strong></span>
    `;
    } else {
        banner.style.display = 'none';
    }
}

/**
 * HELPER: initCharts()
 */
function initCharts() {
    const commonScale = {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ea0a2', font: { size: 10 } }
    };

    const commonPlugins = {
        legend: { labels: { color: '#9ea0a2', font: { size: 10 }, boxWidth: 10 } }
    };

    charts.volume = new Chart(document.getElementById('volumeChart'), {
        type: 'line',
        data: { labels: [], datasets: [] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: commonPlugins,
            scales: { x: commonScale, y: commonScale }
        }
    });

    charts.location = new Chart(document.getElementById('locationChart'), {
        type: 'bar',
        data: { labels: [], datasets: [{ label: 'Vehicle Load', data: [] }] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { ...commonPlugins, legend: { display: false } },
            scales: { x: commonScale, y: commonScale }
        }
    });
}

/**
 * HELPER: updateClock()
 */
function updateClock() {
    const clock = document.getElementById('real-time-clock');
    if (clock) clock.textContent = new Date().toLocaleTimeString();
}

// BOOTSTRAP
init();
