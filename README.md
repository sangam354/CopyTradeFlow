<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="TradeFlow Copy">
    <meta name="format-detection" content="telephone=no">
    <meta name="theme-color" content="#1e5a8a">
    
    <!-- iOS Icons -->
    <link rel="apple-touch-icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231e5a8a'/%3E%3Ctext x='50' y='67' font-size='50' text-anchor='middle' fill='white' font-family='Arial'%3ETC%3C/text%3E%3C/svg%3E">
    <link rel="apple-touch-icon" sizes="152x152" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231e5a8a'/%3E%3Ctext x='50' y='67' font-size='50' text-anchor='middle' fill='white' font-family='Arial'%3ETC%3C/text%3E%3C/svg%3E">
    <link rel="apple-touch-icon" sizes="167x167" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231e5a8a'/%3E%3Ctext x='50' y='67' font-size='50' text-anchor='middle' fill='white' font-family='Arial'%3ETC%3C/text%3E%3C/svg%3E">
    <link rel="apple-touch-icon" sizes="180x180" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231e5a8a'/%3E%3Ctext x='50' y='67' font-size='50' text-anchor='middle' fill='white' font-family='Arial'%3ETC%3C/text%3E%3C/svg%3E">
    
    <!-- iOS Splash Screens -->
    <link rel="apple-touch-startup-image" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1125 2436'%3E%3Crect width='1125' height='2436' fill='%231e5a8a'/%3E%3Ctext x='562' y='1218' font-size='60' text-anchor='middle' fill='white' font-family='Arial'%3ETradeFlow Copy%3C/text%3E%3C/svg%3E" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)">
    
    <title>TradeFlow Copy - Professional Copy Trading</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: -apple-system, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #f5f7fc 0%, #eef2f8 100%);
            min-height: 100vh;
            color: #1a2c3e;
            padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        }

        .app-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px 20px 30px 20px;
        }

        /* iOS-style Login */
        .login-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 48px;
            padding: 40px 28px;
            width: 90%;
            max-width: 380px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .login-icon {
            font-size: 56px;
            background: linear-gradient(135deg, #0f2b4d, #1e5a8a);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-align: center;
            margin-bottom: 20px;
        }

        .login-card h2 {
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #0b2b5e, #1e4a76);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .input-group {
            margin-bottom: 20px;
        }

        .input-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #2c3e50;
        }

        .input-group input {
            width: 100%;
            padding: 16px 18px;
            border: 1.5px solid #e2e8f0;
            border-radius: 24px;
            font-size: 1rem;
            transition: all 0.2s;
            font-family: inherit;
            background: #ffffff;
            -webkit-appearance: none;
        }

        .input-group input:focus {
            outline: none;
            border-color: #2b6a9e;
            box-shadow: 0 0 0 3px rgba(43, 106, 158, 0.1);
        }

        .login-btn {
            width: 100%;
            background: linear-gradient(135deg, #1a5d8c, #0f3b5c);
            color: white;
            border: none;
            padding: 16px;
            border-radius: 32px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 10px;
            -webkit-tap-highlight-color: rgba(255,255,255,0.2);
        }

        .login-btn:active {
            transform: scale(0.97);
        }

        .main-app {
            display: none;
        }

        /* iOS Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 16px;
            background: rgba(255,255,255,0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 12px 20px;
            border-radius: 60px;
        }

        .logo h1 {
            font-size: 1.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #0f2b4d, #1e5a8a);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .logo p {
            font-size: 0.7rem;
            color: #5a6e8a;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .logout-btn {
            background: none;
            border: none;
            color: #e53e3e;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            padding: 8px;
        }

        /* Stats Cards */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 14px;
            margin-bottom: 28px;
        }

        .stat-card {
            background: white;
            border-radius: 28px;
            padding: 18px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .stat-title {
            font-size: 0.7rem;
            text-transform: uppercase;
            font-weight: 600;
            color: #6c7f9c;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .stat-number {
            font-size: 1.8rem;
            font-weight: 800;
            color: #1a2c3e;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 28px;
        }

        @media (min-width: 768px) {
            .dashboard-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        .card {
            background: white;
            border-radius: 32px;
            padding: 20px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
            border: 1px solid #eef2fa;
        }

        .card h3 {
            font-size: 1.1rem;
            margin-bottom: 16px;
            font-weight: 600;
        }

        /* Account Items */
        .account-group {
            margin-bottom: 16px;
            border-radius: 24px;
            background: #f8fafd;
            overflow: hidden;
        }

        .main-account-header {
            background: white;
            padding: 16px;
            border-left: 4px solid #2b6a9e;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.2s;
            -webkit-tap-highlight-color: rgba(0,0,0,0.05);
        }

        .main-account-header:active {
            background: #f0f4fa;
        }

        .account-name {
            font-size: 1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }

        .master-badge {
            background: linear-gradient(135deg, #ffd966, #ffc107);
            color: #7c5c00;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.65rem;
            font-weight: 700;
        }

        .sub-account-badge {
            background: #e2e8f0;
            color: #2c5282;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.65rem;
            font-weight: 600;
        }

        .account-stats {
            font-size: 0.7rem;
            color: #5a6e8a;
            margin-top: 6px;
            display: flex;
            gap: 12px;
        }

        .expand-icon {
            font-size: 1rem;
            color: #5b7a9a;
            transition: transform 0.3s;
        }

        .sub-accounts-container {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out;
            background: #f8fafd;
        }

        .sub-accounts-container.expanded {
            max-height: 800px;
            transition: max-height 0.5s ease-in;
        }

        .sub-account-item {
            padding: 12px 16px 12px 40px;
            border-top: 1px solid #eef2f6;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .sub-account-name {
            font-weight: 600;
            font-size: 0.85rem;
        }

        .sub-account-meta {
            font-size: 0.65rem;
            color: #7c8ea0;
            margin-top: 2px;
        }

        .sub-account-pnl {
            font-weight: 700;
            font-size: 0.85rem;
        }

        .positive {
            color: #2bc48a;
        }

        .negative {
            color: #e53e3e;
        }

        .add-subaccount-btn {
            padding: 12px;
            background: none;
            border-top: 1px solid #eef2f6;
            color: #2b6a9e;
            cursor: pointer;
            font-size: 0.8rem;
            text-align: center;
            -webkit-tap-highlight-color: rgba(0,0,0,0.05);
        }

        .add-subaccount-btn:active {
            background: #eef2fa;
        }

        .add-account-btn {
            width: 100%;
            padding: 14px;
            background: #f0f4fa;
            border: 2px dashed #b9c8e0;
            border-radius: 24px;
            text-align: center;
            color: #2b6a9e;
            font-weight: 600;
            cursor: pointer;
            margin-top: 12px;
            transition: all 0.2s;
            -webkit-tap-highlight-color: rgba(0,0,0,0.05);
        }

        .add-account-btn:active {
            background: #e6ecf5;
            transform: scale(0.98);
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: white;
            border-radius: 40px;
            padding: 28px;
            width: 90%;
            max-width: 460px;
            animation: slideUp 0.3s ease;
            max-height: 85vh;
            overflow-y: auto;
        }

        .toggle-switch {
            width: 52px;
            height: 28px;
            background: #cbd5e0;
            border-radius: 30px;
            position: relative;
            cursor: pointer;
            transition: 0.2s;
        }

        .toggle-active {
            background: #2bc48a;
        }

        .toggle-knob {
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 3px;
            transition: 0.2s;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .toggle-active .toggle-knob {
            left: 25px;
        }

        .success-msg {
            background: #e6f7ed;
            color: #1e7b48;
            padding: 12px;
            border-radius: 20px;
            margin-top: 12px;
            font-size: 0.8rem;
        }

        canvas {
            max-height: 220px;
            width: 100%;
        }

        .total-accounts-count {
            font-size: 0.8rem;
            font-weight: 500;
            background: #eef2fa;
            padding: 6px 12px;
            border-radius: 20px;
        }

        .install-prompt {
            background: #1e5a8a;
            color: white;
            padding: 12px 16px;
            border-radius: 24px;
            margin-bottom: 16px;
            font-size: 0.8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .install-prompt button {
            background: white;
            border: none;
            padding: 6px 16px;
            border-radius: 20px;
            color: #1e5a8a;
            font-weight: 600;
            cursor: pointer;
        }

        @media (display-mode: standalone) {
            .install-prompt {
                display: none;
            }
        }
    </style>
</head>
<body>

<!-- iOS Install Prompt -->
<div id="installPrompt" class="install-prompt" style="display: none;">
    <span><i class="fas fa-download"></i> Install as App</span>
    <button onclick="showInstallInstructions()">Add to Home Screen</button>
</div>

<!-- Login Modal -->
<div id="loginModal" class="login-overlay">
    <div class="login-card">
        <div class="login-icon">
            <i class="fas fa-chart-line"></i>
        </div>
        <h2>TradeFlow Copy</h2>
        <p style="text-align: center; color: #6c7f9c; margin-bottom: 28px;">Professional Copy Trading</p>
        <div class="input-group">
            <label><i class="fas fa-envelope"></i> Email</label>
            <input type="email" id="loginEmail" placeholder="trader@example.com" value="demo@tradeflow.com">
        </div>
        <div class="input-group">
            <label><i class="fas fa-lock"></i> Password</label>
            <input type="password" id="loginPassword" placeholder="••••••••" value="demo123">
        </div>
        <button class="login-btn" onclick="handleLogin()">
            <i class="fas fa-arrow-right-to-bracket"></i> Sign In
        </button>
        <p style="font-size: 0.7rem; text-align: center; margin-top: 20px; color: #8ba0bc;">Demo credentials work instantly</p>
    </div>
</div>

<!-- Main App -->
<div class="main-app" id="mainApp">
    <div class="app-container">
        <div class="header">
            <div class="logo">
                <h1><i class="fas fa-bolt"></i> TradeFlow</h1>
                <p>Copy Trading Platform</p>
            </div>
            <div class="user-info">
                <i class="fas fa-user-circle" style="font-size: 28px;"></i>
                <span id="userNameDisplay">Trader</span>
                <button class="logout-btn" onclick="handleLogout()"><i class="fas fa-sign-out-alt"></i></button>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-title"><i class="fas fa-chart-simple"></i> Total P&L</div>
                <div class="stat-number" id="totalPnl">+$18,432</div>
            </div>
            <div class="stat-card">
                <div class="stat-title"><i class="fas fa-copy"></i> Copy Trades</div>
                <div class="stat-number" id="copyCount">247</div>
            </div>
            <div class="stat-card">
                <div class="stat-title"><i class="fas fa-account"></i> Sub-Accounts</div>
                <div class="stat-number" id="totalSubAccountsCount">12</div>
            </div>
            <div class="stat-card">
                <div class="stat-title"><i class="fas fa-waveform"></i> Status</div>
                <div class="stat-number"><span style="color:#2bc48a;">●</span> Live</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <h3><i class="fas fa-chart-line"></i> Performance</h3>
                <canvas id="equityChart"></canvas>
            </div>
            <div class="card">
                <h3><i class="fas fa-robot"></i> Copy Engine</h3>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Auto-copy mode</span>
                    <div id="copyToggle" class="toggle-switch toggle-active" onclick="toggleCopyMode()">
                        <div class="toggle-knob"></div>
                    </div>
                </div>
                <div id="copyStatusMsg" class="success-msg" style="margin-top: 12px;">
                    <i class="fas fa-check-circle"></i> Active • Monitoring master
                </div>
            </div>
        </div>

        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3><i class="fas fa-building"></i> Tradovate Organizations</h3>
                <div class="total-accounts-count" id="totalAccountsBadge">0 Accounts</div>
            </div>
            <div id="accountsHierarchy"></div>
            <div class="add-account-btn" onclick="openMasterAccountModal()">
                <i class="fas fa-plus-circle"></i> Link Tradovate Organization
            </div>
        </div>

        <div class="card">
            <h3><i class="fas fa-clock"></i> Recent Trades</h3>
            <div id="recentTrades">
                <div style="padding: 12px; border-bottom: 1px solid #eef2fa;"><i class="fas fa-arrow-up"></i> ES M5 Long @ 4852.25 (12 subs)</div>
                <div style="padding: 12px;"><i class="fas fa-arrow-down"></i> NQ M5 Short @ 19842.50 (12 subs)</div>
            </div>
        </div>
    </div>
</div>

<!-- Modals -->
<div id="masterAccountModal" class="modal">
    <div class="modal-content">
        <span style="float: right; font-size: 28px; cursor: pointer;" onclick="closeMasterModal()">&times;</span>
        <h3><i class="fab fa-tradovate"></i> Add Organization</h3>
        <div class="input-group">
            <label>Organization Name</label>
            <input type="text" id="orgName" placeholder="e.g., Alpha Capital">
        </div>
        <div class="input-group">
            <label>Tradovate Username</label>
            <input type="text" id="masterUsername" placeholder="email@tradovate.com">
        </div>
        <div class="input-group">
            <label>Password</label>
            <input type="password" id="masterPassword" placeholder="••••••••">
        </div>
        <div class="input-group">
            <label>Role</label>
            <select id="masterRole" style="width:100%; padding:14px; border-radius:20px; border:1.5px solid #e2e8f0;">
                <option value="master">Master (sends signals)</option>
                <option value="follower_org">Follower (receives)</option>
            </select>
        </div>
        <button class="login-btn" onclick="addMasterAccount()">Link Account</button>
    </div>
</div>

<div id="subAccountModal" class="modal">
    <div class="modal-content">
        <span style="float: right; font-size: 28px; cursor: pointer;" onclick="closeSubModal()">&times;</span>
        <h3><i class="fas fa-user-plus"></i> Add Sub-Account</h3>
        <input type="hidden" id="parentOrgId">
        <div class="input-group">
            <label>Sub-Account Name</label>
            <input type="text" id="subNickname" placeholder="e.g., Prop Fund #1">
        </div>
        <div class="input-group">
            <label>Account Number</label>
            <input type="text" id="subAccountId" placeholder="e.g., 12345678">
        </div>
        <div class="input-group">
            <label>Initial Balance ($)</label>
            <input type="number" id="subBalance" value="25000">
        </div>
        <button class="login-btn" onclick="addSubAccount()">Add Sub-Account</button>
    </div>
</div>

<script>
    let organizations = [];
    let copyActive = true;
    let masterOrgId = null;
    let equityChart = null;

    // Sample data
    function loadInitialData() {
        const saved = localStorage.getItem("tradeflow_ios_data");
        if (saved) {
            const data = JSON.parse(saved);
            organizations = data.organizations || [];
            copyActive = data.copyActive !== undefined ? data.copyActive : true;
        } else {
            organizations = [
                { id: "org1", name: "Alpha Capital", username: "alpha@tradovate.com", role: "master", subAccounts: [
                    { id: "sub1", name: "Alpha Prop Fund A", accountNumber: "ALPHA001", balance: 125000, pnl: 8450 },
                    { id: "sub2", name: "Alpha Prop Fund B", accountNumber: "ALPHA002", balance: 89000, pnl: 3250 },
                    { id: "sub3", name: "Alpha Institutional", accountNumber: "ALPHA003", balance: 250000, pnl: 15200 }
                ]},
                { id: "org2", name: "Beta Trading", username: "beta@tradovate.com", role: "follower_org", subAccounts: [
                    { id: "sub4", name: "Beta Main", accountNumber: "BETA001", balance: 75000, pnl: 4200 },
                    { id: "sub5", name: "Beta Swing", accountNumber: "BETA002", balance: 32000, pnl: 1850 }
                ]}
            ];
        }
        updateMasterReference();
        renderHierarchy();
        updateStats();
    }

    function updateMasterReference() {
        const master = organizations.find(o => o.role === "master");
        masterOrgId = master ? master.id : null;
    }

    function saveData() {
        localStorage.setItem("tradeflow_ios_data", JSON.stringify({ organizations, copyActive }));
    }

    function getTotalSubs() {
        return organizations.reduce((sum, org) => sum + (org.subAccounts?.length || 0), 0);
    }

    function updateStats() {
        const totalSubs = getTotalSubs();
        document.getElementById("totalSubAccountsCount").innerText = totalSubs;
        document.getElementById("totalAccountsBadge").innerHTML = `${totalSubs} Sub-Accounts`;
        const totalPnl = organizations.reduce((sum, org) => sum + (org.subAccounts?.reduce((s, a) => s + (a.pnl || 0), 0) || 0), 0);
        document.getElementById("totalPnl").innerHTML = (totalPnl >= 0 ? "+" : "") + "$" + totalPnl.toLocaleString();
    }

    function renderHierarchy() {
        const container = document.getElementById("accountsHierarchy");
        if (!organizations.length) {
            container.innerHTML = '<div style="text-align:center; padding: 40px; color:#8ba0bc;">No organizations linked.<br>Tap below to add</div>';
            return;
        }
        let html = '';
        organizations.forEach(org => {
            const isMaster = org.role === "master";
            const subCount = org.subAccounts?.length || 0;
            const totalOrgPnl = org.subAccounts?.reduce((s, a) => s + (a.pnl || 0), 0) || 0;
            html += `
                <div class="account-group">
                    <div class="main-account-header" onclick="toggleExpand('${org.id}')">
                        <div>
                            <div class="account-name">
                                <i class="fas ${isMaster ? 'fa-crown' : 'fa-building'}"></i>
                                ${escapeHtml(org.name)}
                                ${isMaster ? '<span class="master-badge">MASTER</span>' : '<span class="sub-account-badge">FOLLOWER</span>'}
                                <span style="font-size:0.7rem;">(${subCount})</span>
                            </div>
                            <div class="account-stats">
                                <span>P&L: <span class="${totalOrgPnl >= 0 ? 'positive' : 'negative'}">${totalOrgPnl >= 0 ? '+' : ''}$${totalOrgPnl.toLocaleString()}</span></span>
                            </div>
                        </div>
                        <div>
                            <button onclick="event.stopPropagation(); setAsMaster('${org.id}')" style="background:none; border:none; color:#2b6a9e; margin-right:8px;"><i class="fas fa-crown"></i></button>
                            <button onclick="event.stopPropagation(); removeOrg('${org.id}')" style="background:none; border:none; color:#e53e3e;"><i class="fas fa-trash"></i></button>
                            <i class="fas fa-chevron-down expand-icon" id="icon_${org.id}"></i>
                        </div>
                    </div>
                    <div class="sub-accounts-container" id="subs_${org.id}">
                        ${renderSubAccounts(org.subAccounts)}
                        <div class="add-subaccount-btn" onclick="event.stopPropagation(); openSubModal('${org.id}')">
                            <i class="fas fa-plus"></i> Add Sub-Account
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderSubAccounts(subs) {
        if (!subs || subs.length === 0) return '<div style="padding: 16px 40px; color:#8ba0bc; text-align:center;">No sub-accounts</div>';
        return subs.map(sub => `
            <div class="sub-account-item">
                <div>
                    <div class="sub-account-name"><i class="fas fa-user-circle"></i> ${escapeHtml(sub.name)}</div>
                    <div class="sub-account-meta">ID: ${sub.accountNumber} • $${(sub.balance || 0).toLocaleString()}</div>
                </div>
                <div class="sub-account-pnl ${(sub.pnl || 0) >= 0 ? 'positive' : 'negative'}">
                    ${(sub.pnl || 0) >= 0 ? '+' : ''}$${(sub.pnl || 0).toLocaleString()}
                </div>
            </div>
        `).join('');
    }

    function toggleExpand(orgId) {
        const container = document.getElementById(`subs_${orgId}`);
        const icon = document.getElementById(`icon_${orgId}`);
        if (container.classList.contains('expanded')) {
            container.classList.remove('expanded');
            icon.style.transform = 'rotate(0deg)';
        } else {
            container.classList.add('expanded');
            icon.style.transform = 'rotate(180deg)';
        }
    }

    function setAsMaster(orgId) {
        organizations.forEach(o => { o.role = o.id === orgId ? "master" : "follower_org"; });
        updateMasterReference();
        saveData();
        renderHierarchy();
        updateStats();
        showToast(`${organizations.find(o=>o.id===orgId).name} is now MASTER`);
    }

    function removeOrg(orgId) {
        if (confirm("Remove organization and all sub-accounts?")) {
            organizations = organizations.filter(o => o.id !== orgId);
            updateMasterReference();
            saveData();
            renderHierarchy();
            updateStats();
        }
    }

    function addMasterAccount() {
        const name = document.getElementById("orgName").value.trim();
        const username = document.getElementById("masterUsername").value.trim();
        const role = document.getElementById("masterRole").value;
        if (!name || !username) { alert("Fill organization name"); return; }
        const newOrg = { id: "org_" + Date.now(), name, username, role, subAccounts: [] };
        organizations.push(newOrg);
        if (role === "master") organizations.forEach(o => { if (o.id !== newOrg.id) o.role = "follower_org"; });
        updateMasterReference();
        saveData();
        renderHierarchy();
        closeMasterModal();
        showToast(`✅ ${name} added`);
    }

    function addSubAccount() {
        const orgId = document.getElementById("parentOrgId").value;
        const nickname = document.getElementById("subNickname").value.trim();
        const accountNumber = document.getElementById("subAccountId").value.trim();
        const balance = parseFloat(document.getElementById("subBalance").value);
        const org = organizations.find(o => o.id === orgId);
        if (org && nickname) {
            org.subAccounts = org.subAccounts || [];
            org.subAccounts.push({ id: "sub_" + Date.now(), name: nickname, accountNumber: accountNumber || "NEW", balance: balance || 25000, pnl: 0 });
            saveData();
            renderHierarchy();
            closeSubModal();
            showToast(`✅ ${nickname} added`);
            updateStats();
        }
    }

    function toggleCopyMode() {
        copyActive = !copyActive;
        const toggle = document.getElementById("copyToggle");
        if (copyActive) toggle.classList.add("toggle-active");
        else toggle.classList.remove("toggle-active");
        document.getElementById("copyStatusMsg").innerHTML = copyActive ? '<i class="fas fa-check-circle"></i> Active' : '<i class="fas fa-pause-circle"></i> Paused';
        saveData();
    }

    function initChart() {
        const ctx = document.getElementById('equityChart').getContext('2d');
        equityChart = new Chart(ctx, {
            type: 'line',
            data: { labels: ['W1', 'W2', 'W3', 'W4'], datasets: [{ label: 'Equity', data: [124500, 132800, 141200, 153400], borderColor: '#1e5a8a', tension: 0.3, fill: true, backgroundColor: 'rgba(30,90,138,0.05)' }] },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } } }
        });
    }

    function showToast(msg) {
        const toast = document.createElement('div');
        toast.innerText = msg;
        toast.style.position = 'fixed';
        toast.style.bottom = '80px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#1f2f3e';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '40px';
        toast.style.zIndex = '3000';
        toast.style.fontSize = '0.85rem';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

    function showInstallInstructions() {
        alert("📱 To install on iPhone:\n\n1. Tap Share button (📤)\n2. Scroll down\n3. Tap 'Add to Home Screen'\n4. Tap 'Add'\n\nOpen from home screen like a native app!");
    }

    function escapeHtml(str) { return String(str).replace(/[&<>]/g, function(m){return m==='&'?'&amp;':m==='<'?'&lt;':'&gt;';}); }
    function closeMasterModal() { document.getElementById("masterAccountModal").style.display = "none"; }
    function closeSubModal() { document.getElementById("subAccountModal").style.display = "none"; }
    function openMasterAccountModal() { document.getElementById("masterAccountModal").style.display = "flex"; }
    function openSubModal(orgId) { document.getElementById("parentOrgId").value = orgId; document.getElementById("subAccountModal").style.display = "flex"; }

    function handleLogin() {
        document.getElementById("loginModal").style.display = "none";
        document.getElementById("mainApp").style.display = "block";
        loadInitialData();
        if (!equityChart) initChart();
        if (!window.navigator.standalone) {
            document.getElementById("installPrompt").style.display = "flex";
        }
    }

    function handleLogout() {
        document.getElementById("loginModal").style.display = "flex";
        document.getElementById("mainApp").style.display = "none";
        if (equityChart) { equityChart.destroy(); equityChart = null; }
    }

    window.onclick = function(e) {
        if (e.target === document.getElementById("masterAccountModal")) closeMasterModal();
        if (e.target === document.getElementById("subAccountModal")) closeSubModal();
    }
</script>
</body>
</html>
