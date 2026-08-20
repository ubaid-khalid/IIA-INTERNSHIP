// script.js – professional loops with financial data

// ---------- DOM refs ----------
const whileOutput = document.getElementById('whileOutput');
const arrayOutput = document.getElementById('arrayOutput');
const counterDisplay = document.getElementById('counterDisplay');

// ---------- PROFESSIONAL DATA: Quarterly Revenue (in $K) ----------
const quarterlyRevenue = ['Q1: $420K', 'Q2: $385K', 'Q3: $510K', 'Q4: $675K'];

// ---------- HELPER: display array ----------
function renderArray(arr, prefix = '') {
    return arr.join(' · ');
}

// ---------- 1. WHILE & DO-WHILE (with extra variants) ----------

// basic while 1–6
document.getElementById('whileBtn').addEventListener('click', function () {
    let i = 1;
    let result = [];
    while (i <= 6) {
        result.push(i);
        i++;
    }
    whileOutput.innerHTML = `🔄 while: <span class="highlight">${result.join(' · ')}</span>`;
});

// basic do-while 1–6
document.getElementById('doWhileBtn').addEventListener('click', function () {
    let i = 1;
    let result = [];
    do {
        result.push(i);
        i++;
    } while (i <= 6);
    whileOutput.innerHTML = `🔁 do-while: <span class="highlight">${result.join(' · ')}</span>`;
});

// while – even numbers (2,4,6,8,10)
document.getElementById('whileEvenBtn').addEventListener('click', function () {
    let i = 2;
    let result = [];
    while (i <= 10) {
        result.push(i);
        i += 2;
    }
    whileOutput.innerHTML = `⚡ even: <span class="highlight">${result.join(' · ')}</span>`;
});

// do-while – odd numbers (1,3,5,7,9)
document.getElementById('doWhileOddBtn').addEventListener('click', function () {
    let i = 1;
    let result = [];
    do {
        result.push(i);
        i += 2;
    } while (i <= 9);
    whileOutput.innerHTML = `⚡ odd: <span class="highlight">${result.join(' · ')}</span>`;
});

// ---------- 2. ARRAY LOOP (for, forEach, map) - Professional ----------

// for loop
document.getElementById('arrayForBtn').addEventListener('click', function () {
    let result = [];
    for (let i = 0; i < quarterlyRevenue.length; i++) {
        result.push(quarterlyRevenue[i]);
    }
    arrayOutput.innerHTML = `📌 for: <span class="highlight">${result.join(' | ')}</span>`;
});

// forEach
document.getElementById('arrayForEachBtn').addEventListener('click', function () {
    let result = [];
    quarterlyRevenue.forEach((item) => {
        result.push(item);
    });
    arrayOutput.innerHTML = `📌 forEach: <span class="highlight">${result.join(' | ')}</span>`;
});

// map (professional: transforms data)
document.getElementById('arrayMapBtn').addEventListener('click', function () {
    const mapped = quarterlyRevenue.map((item) => {
        // Extract the value and add a growth indicator
        const value = parseInt(item.match(/\d+/)[0]);
        if (value > 500) {
            return item + ' 🚀';
        } else if (value > 400) {
            return item + ' 📈';
        } else {
            return item + ' 📊';
        }
    });
    arrayOutput.innerHTML = `📌 map: <span class="highlight">${mapped.join(' | ')}</span>`;
});

// ---------- 3. SUBMIT EVENT (add to array) ----------
const submitForm = document.getElementById('submitForm');
const submitInput = document.getElementById('submitInput');

submitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const newItem = submitInput.value.trim();
    if (newItem === '') {
        arrayOutput.innerHTML = `⚠️ <span style="color:#f7a88a;">please enter a metric</span>`;
        return;
    }
    // add to array
    quarterlyRevenue.push(newItem);
    // display updated array using forEach
    let result = [];
    quarterlyRevenue.forEach((item) => {
        result.push(item);
    });
    arrayOutput.innerHTML = `✅ added: <span class="highlight">${newItem}</span> &nbsp;→&nbsp; ${result.join(' | ')}`;
    submitInput.value = '';
});

// ---------- 4. CLICK COUNTER (hands-on) ----------
let clickCount = 0;
const clickBtn = document.getElementById('clickBtn');
const resetBtn = document.getElementById('resetCounterBtn');

clickBtn.addEventListener('click', function () {
    clickCount++;
    counterDisplay.textContent = clickCount;
});

resetBtn.addEventListener('click', function () {
    clickCount = 0;
    counterDisplay.textContent = clickCount;
});

// ---------- 5. EXTRA: window load (initial state) ----------
window.addEventListener('load', function () {
    // set initial array display using forEach
    let initial = [];
    quarterlyRevenue.forEach((item) => {
        initial.push(item);
    });
    arrayOutput.innerHTML = `📊 ${initial.join(' | ')} &nbsp; <span style="color:#5f7ca0;">(${quarterlyRevenue.length} quarters)</span>`;
    whileOutput.innerHTML = `<span class="placeholder">click a button →</span>`;
    counterDisplay.textContent = '0';
    console.log('✅ All event listeners bound. Click counter ready.');
});

// ---------- 6. BONUS: click event on document (just to demonstrate) ----------
document.addEventListener('click', function (e) {
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.app')) return;
    console.log('👀 document clicked (event listener active)');
});