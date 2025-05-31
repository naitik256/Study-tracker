const dataMap = {
  '11': {
    'Physics': ['Physical world', 'Units and Measurements', 'Motion in a Straight Line'],
    'Chemistry': ['Some Basic Concepts of Chemistry', 'Structure of Atom'],
    'Biology': ['The Living World', 'Biological Classification'],
    'Math': ['Sets', 'Relations and Functions']
  },
  '12': {
    'Physics': ['Electric Charges and Fields', 'Electrostatic Potential and Capacitance'],
    'Chemistry': ['The Solid State', 'Solutions'],
    'Biology': ['Reproduction in Organisms', 'Human Reproduction'],
    'Math': ['Relations and Functions', 'Inverse Trigonometric Functions']
  }
};

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const cls = getParam('class');
const subject = getParam('subject');
if (!cls || !subject) window.location.href = "index.html";

document.getElementById("title").textContent = `Planner - Class ${cls} ${subject}`;
const chapters = dataMap[cls][subject];
const tbody = document.getElementById("planner-body");

chapters.forEach(chapter => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${chapter}</td>` +
    ['Lecture','Notes','PYQs','DPP','Test-1','Test-2','Rev-1','Rev-2','Rev-3','Rev-4','Short Notes'].map(type => {
      const checked = loadState(chapter, type) ? '✅' : '❌';
      return `<td class="toggle" onclick="toggle(this, '${chapter}', '${type}')">${checked}</td>`;
    }).join('');
  tbody.appendChild(row);
});

function toggle(cell, chapter, type) {
  const isChecked = cell.textContent === '✅';
  cell.textContent = isChecked ? '❌' : '✅';
  saveState(chapter, type, !isChecked);
}

function saveState(chapter, type, val) {
  const key = `progress_${cls}_${subject}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (!data[chapter]) data[chapter] = {};
  data[chapter][type] = val;
  localStorage.setItem(key, JSON.stringify(data));
}

function loadState(chapter, type) {
  const key = `progress_${cls}_${subject}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  return data[chapter] ? data[chapter][type] : false;
}
