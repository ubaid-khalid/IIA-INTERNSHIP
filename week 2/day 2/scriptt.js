// script.js - complete JavaScript for the Conditions & Selectors demo

(function() {
    'use strict';

    // ---------- 1. IF / ELSE ----------
    const outputIfElse = document.getElementById('outputIfElse');
    document.querySelectorAll('#blockIfElse .btn-group button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const temp = this.dataset.temp;
            let message = '';
            if (temp === 'cold') {
                message = '❄️ It\'s cold (10°C). Wear a jacket!';
            } else if (temp === 'warm') {
                message = '☀️ It\'s warm (25°C). Perfect weather!';
            } else {
                message = '🌤️ Unknown temperature.';
            }
            outputIfElse.textContent = message;
        });
    });

    // ---------- 2. ELSE IF & NESTED CONDITIONS + SELECTING ELEMENTS ----------
    const outputElseIfNested = document.getElementById('outputElseIfNested');
    const scoreSelect = document.getElementById('scoreSelect');
    const attendanceSelect = document.getElementById('attendanceSelect');
    const evaluateBtn = document.getElementById('evaluateNestedBtn');

    function evaluateNested() {
        const score = parseInt(scoreSelect.value, 10);
        const attendance = parseInt(attendanceSelect.value, 10);

        let grade = '';
        let attendanceNote = '';

        // Nested condition: attendance first, then grade
        if (attendance >= 80) {
            // Good attendance
            if (score >= 90) {
                grade = 'A (excellent)';
            } else if (score >= 75) {
                grade = 'B (good)';
            } else if (score >= 60) {
                grade = 'C (fair)';
            } else {
                grade = 'D (needs improvement)';
            }
            attendanceNote = '✅ Good attendance';
        } else if (attendance >= 50) {
            // Moderate attendance
            if (score >= 85) {
                grade = 'B (moderate attendance)';
            } else if (score >= 70) {
                grade = 'C (moderate attendance)';
            } else {
                grade = 'D (moderate attendance)';
            }
            attendanceNote = '⚠️ Moderate attendance';
        } else {
            // Low attendance
            if (score >= 80) {
                grade = 'C (low attendance)';
            } else {
                grade = 'D/F (low attendance)';
            }
            attendanceNote = '❌ Low attendance';
        }

        outputElseIfNested.innerHTML = `📘 Grade: <strong>${grade}</strong> · ${attendanceNote} (score: ${score}, attendance: ${attendance}%)`;
    }

    evaluateBtn.addEventListener('click', evaluateNested);
    scoreSelect.addEventListener('change', evaluateNested);
    attendanceSelect.addEventListener('change', evaluateNested);
    // Initial evaluation
    evaluateNested();

    // ---------- 3. SWITCH STATEMENTS ----------
    const outputSwitch = document.getElementById('outputSwitch');
    document.querySelectorAll('#blockSwitch .btn-group button').forEach(btn => {
        btn.addEventListener('click', function() {
            const device = this.dataset.device;
            let permission = '';
            switch (device) {
                case 'admin':
                    permission = '👑 Full access · can manage users & settings';
                    break;
                case 'editor':
                    permission = '✍️ Can create and edit content';
                    break;
                case 'viewer':
                    permission = '👀 Read-only access · can view content';
                    break;
                case 'guest':
                    permission = '🚪 Limited guest access · view public pages';
                    break;
                default:
                    permission = '❓ Unknown role';
            }
            outputSwitch.textContent = `🔹 ${permission}`;
        });
    });

    // ---------- 4. QUERYSELECTORALL (MULTIPLE ELEMENTS) ----------
    const outputQSA = document.getElementById('outputQSA');
    const countFruitsBtn = document.getElementById('countFruitsBtn');
    const highlightFruitsBtn = document.getElementById('highlightFruitsBtn');

    // Helper: get all .fruit-item elements
    function getFruitItems() {
        return document.querySelectorAll('.fruit-item');
    }

    countFruitsBtn.addEventListener('click', function() {
        const items = getFruitItems();
        const count = items.length;
        const fruitNames = Array.from(items).map(el => el.textContent.trim()).join(', ');
        outputQSA.innerHTML = `🍒 Found <strong>${count}</strong> fruit elements: <span class="highlight">${fruitNames}</span>`;
    });

    highlightFruitsBtn.addEventListener('click', function() {
        const items = getFruitItems();
        // Toggle highlight style using querySelectorAll
        items.forEach(el => {
            if (el.style.backgroundColor === 'rgb(255, 235, 140)' || el.style.backgroundColor === '#ffeb8c') {
                el.style.backgroundColor = '';
                el.style.color = '#124257';
            } else {
                el.style.backgroundColor = '#ffeb8c';
                el.style.color = '#0a2a3a';
            }
        });
        // Update output
        const highlighted = Array.from(items).filter(el => 
            el.style.backgroundColor === 'rgb(255, 235, 140)' || 
            el.style.backgroundColor === '#ffeb8c'
        );
        outputQSA.innerHTML = `✨ ${highlighted.length} fruit(s) highlighted. (click again to toggle)`;
    });

    // ---------- DEMONSTRATE SINGLE ELEMENT SELECTION (querySelector) ----------
    const singleElemDemo = document.querySelector('#evaluateNestedBtn');
    if (singleElemDemo) {
        singleElemDemo.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#154b64';
        });
        singleElemDemo.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#1f5f7e';
        });
    }

    // Additional demonstration: selecting element by ID (already used)
    const header = document.querySelector('h1');
    if (header) {
        // Subtle decoration - just to show selection
        console.log('✅ Header element selected:', header.textContent);
    }

    // ---------- EXTRA: Demonstrate selecting multiple elements with forEach ----------
    // Show all buttons with class 'primary' (just for demo)
    const allPrimaryBtns = document.querySelectorAll('.primary');
    console.log(`✅ Found ${allPrimaryBtns.length} primary buttons using querySelectorAll`);

    console.log('✅ All selectors & conditions ready.');
})();