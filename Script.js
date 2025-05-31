let selectedClass = '';
let selectedSubject = '';

const ncertChapters = {
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

function selectClass(cls) {
  selectedClass = cls;
  document.getElementById('selected-class').textContent = cls;
  document.getElementById('home-screen').style.display = 'none';
  document.getElementById('subject-screen').style.display = 'block';
}

function selectSubject(subject) {
  selectedSubject = subject;
  const chapters = ncertChapters[selectedClass][subject];
  const tbody = document.getElementById('planner-body');
  tbody.innerHTML = '';

  chapters.forEach((chapter) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${chapter}</td>` +
      ['Lecture','Notes','PYQs','DPP','Test-1','Test-2','Rev-1','Rev-2','Rev-3','Rev-4','Short Notes'].map(col => {
        const checked = loadData(chapter, col) ? '✅' : '❌';
        return `<td class="toggle-cell" onclick="toggleCell(this, '${chapter}', '${col}')">${checked}</td>`;
      }).join('');
    tbody.appendChild(row);
  });

  document.getElementById('planner-title').textContent = `Planner - Class ${selectedClass} ${selectedSubject}`;
  document.getElementById('subject-screen').style.display = 'none';
  document.getElementById('planner-screen').style.display = 'block';
}

function toggleCell(el, chapter, type) {
  const state = el.textContent === '✅' ? false : true;
  el.textContent = state ? '✅' : '❌';
  saveData(chapter, type, state);
}

function saveData(chapter, type, value) {
  const key = `study_progress_${selectedClass}_${selectedSubject}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (!data[chapter]) data[chapter] = {};
  data[chapter][type] = value;
  localStorage.setItem(key, JSON.stringify(data));
}

function loadData(chapter, type) {
  const key = `study_progress_${selectedClass}_${selectedSubject}`;
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  return data[chapter] ? data[chapter][type] : false;
}

function goBackToClass() {
  document.getElementById('subject-screen').style.display = 'none';
  document.getElementById('home-screen').style.display = 'block';
}

function goBackToSubjects() {
  document.getElementById('planner-screen').style.display = 'none';
  document.getElementById('subject-screen').style.display = 'block';
}
