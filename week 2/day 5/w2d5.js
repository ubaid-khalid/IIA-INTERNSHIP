// script.js — separate JavaScript file
// ---------- 1. conditionals & loops practice ----------
(function loopPractice() {
  const outputDiv = document.getElementById('loop-output');
  const runBtn = document.getElementById('run-loop-btn');

  function generateEvenWithFizz() {
    const result = [];
    for (let i = 1; i <= 20; i++) {
      if (i % 2 === 0) {
        if (i % 4 === 0) {
          result.push('Fizz');
        } else {
          result.push(i);
        }
      }
    }
    return result.join('  ·  ');
  }

  function updateLoopOutput() {
    outputDiv.textContent = generateEvenWithFizz();
  }

  runBtn.addEventListener('click', updateLoopOutput);
  // initial run to show something
  updateLoopOutput();
})();

// ---------- 2. DOM selection practice ----------
(function domSelectionPractice() {
  const target = document.getElementById('dom-target');
  const actionBtn = document.getElementById('dom-action-btn');

  function handleDomAction() {
    // DOM selection: select the element by id (already selected)
    // additionally select the paragraph inside the same card
    const card = target.closest('.card');
    const descParagraph = card ? card.querySelector('.dom-demo-text') : null;

    // update target
    target.textContent = '✅ selected & updated! (DOM manipulation)';
    target.style.background = '#ddf0e8';
    target.style.borderColor = '#2a9d7a';

    // update the paragraph as well (bonus DOM selection)
    if (descParagraph) {
      descParagraph.textContent = '✔️ paragraph selected via DOM — style changed';
      descParagraph.style.color = '#1a6b4a';
      descParagraph.style.fontWeight = '500';
    }

    // also add a little highlight effect
    target.classList.add('highlight-target');
  }

  actionBtn.addEventListener('click', handleDomAction);
})();

// ---------- 3. planning (interactive checklist) ----------
(function planningChecklist() {
  const list = document.getElementById('planning-list');
  const progressText = document.getElementById('progress-text');
  const resetBtn = document.getElementById('reset-plan-btn');

  function updateProgress() {
    const items = list.querySelectorAll('li');
    const done = list.querySelectorAll('li.done');
    progressText.textContent = `${done.length} / ${items.length} done`;
  }

  // toggle done on click (event delegation)
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    li.classList.toggle('done');
    updateProgress();
  });

  // reset checklist
  resetBtn.addEventListener('click', () => {
    const items = list.querySelectorAll('li');
    items.forEach(li => li.classList.remove('done'));
    updateProgress();
  });

  // initial progress
  updateProgress();
})();

// ---------- 4. build & test (mini project simulation) ----------
(function buildAndTest() {
  const testReport = document.getElementById('test-report');
  const testBtn = document.getElementById('run-tests-btn');

  function runTests() {
    const results = [];
    let passed = 0;

    // Test 1: loop output contains even numbers and Fizz for multiples of 4
    const loopOutput = document.getElementById('loop-output');
    const loopText = loopOutput.textContent || '';
    const evenNumbers = loopText.match(/\d+/g)?.map(Number) || [];
    const fizzCount = (loopText.match(/Fizz/g) || []).length;

    // expected: all numbers should be even, and Fizz for every multiple of 4 from 1..20
    const expectedFizzCount = [4, 8, 12, 16, 20].length; // 5
    const allEven = evenNumbers.every(n => n % 2 === 0);
    const fizzOk = (fizzCount === expectedFizzCount);
    const loopPass = allEven && fizzOk;

    results.push({ name: 'Loop (conditionals) : even + Fizz', pass: loopPass });
    if (loopPass) passed++;

    // Test 2: DOM selection action (check if target was changed)
    const target = document.getElementById('dom-target');
    const targetText = target.textContent || '';
    const domPass = targetText.includes('selected & updated') || targetText.includes('✅');
    results.push({ name: 'DOM selection : element updated', pass: domPass });
    if (domPass) passed++;

    // Test 3: planning checklist – at least 3 items done? (optional but we test)
    const doneItems = document.querySelectorAll('#planning-list li.done');
    const planPass = doneItems.length >= 3;
    results.push({ name: 'Planning : at least 3 steps marked done', pass: planPass });
    if (planPass) passed++;

    // Build test report
    const total = results.length;
    let reportHtml = `🧪 test suite: ${passed}/${total} passed\n`;
    results.forEach(r => {
      const icon = r.pass ? '✅' : '❌';
      reportHtml += `${icon} ${r.name}\n`;
    });
    reportHtml += `\n${passed === total ? '🎉 all tests passed — build & test successful' : '⚠️ some tests failed — review code'}`;

    testReport.textContent = reportHtml;
    testReport.style.background = passed === total ? '#e6f5ed' : '#fef1ee';
    testReport.style.borderColor = passed === total ? '#2a9d7a' : '#d96c5a';
  }

  testBtn.addEventListener('click', runTests);

  // initial test run (show something)
  // we run after a tiny delay to let DOM settle
  setTimeout(runTests, 100);
})();