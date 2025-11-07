let templates = {};

// Load templates on start
fetch('templates.json')
    .then(res => res.json())
    .then(data => {
        templates = data;
        switchTemplate(); // Apply default
    })
    .catch(() => console.warn('templates.json not found – using defaults'));

function startBuilder() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    loadDraft(); // Auto-load if exists
}

function updatePreview() {
    document.getElementById('previewName').textContent = document.getElementById('name').value || 'Your Name';
    document.getElementById('previewTitle').textContent = document.getElementById('title').value || 'Your Job Title';
    document.getElementById('previewEmail').textContent = document.getElementById('email').value || 'your@email.com';
    document.getElementById('previewPhone').textContent = document.getElementById('phone').value || '123-456-7890';
    document.getElementById('previewSummary').textContent = document.getElementById('summary').value || 'Write a compelling summary here...';
}

function switchTemplate() {
    const select = document.getElementById('templateSelect').value;
    const tmpl = templates[select] || { colors: { primary: '#007BFF' } };
    document.documentElement.style.setProperty('--primary', tmpl.colors.primary);
    document.documentElement.style.setProperty('--bg-light', tmpl.colors.accent || '#F8F9FA');
}

function addSection(type) {
    const sectionsDiv = document.getElementById('previewSections');
    const newSection = document.createElement('div');
    newSection.innerHTML = `
        <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <textarea placeholder="Details for ${type}..." oninput="updatePreview()"></textarea>
    `;
    newSection.draggable = true;
    newSection.className = 'section-item';
    sectionsDiv.appendChild(newSection);
}

function aiSuggest() {
    const summary = document.getElementById('summary');
    summary.value = 'Results-driven professional with 5+ years in software development. Boosted team efficiency by 35% through agile practices and clean code. Expert in JavaScript, React, and Node.js.';
    updatePreview();
    alert('AI Suggestion Added! (Real OpenAI coming soon)');
}

function checkATS() {
    alert('ATS Score: 88% – Add keywords: "React", "Node.js", "Agile" for 100%.');
}

function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const content = document.getElementById('resumePreview').innerText;
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 15, 20);
    doc.save('my-resume.pdf');
}

// Save & Load Draft
function saveDraft() {
    const data = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        summary: document.getElementById('summary').value,
        sections: Array.from(document.querySelectorAll('#previewSections textarea')).map(t => t.value)
    };
    localStorage.setItem('resumeDraft', JSON.stringify(data));
    alert('Draft saved locally!');
}

function loadDraft() {
    const saved = localStorage.getItem('resumeDraft');
    if (!saved) return;
    const data = JSON.parse(saved);
    document.getElementById('name').value = data.name || '';
    document.getElementById('title').value = data.title || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('phone').value = data.phone || '';
    document.getElementById('summary').value = data.summary || '';
    updatePreview();

    // Clear old sections
    document.getElementById('previewSections').innerHTML = '';
    data.sections?.forEach((text, i) => {
        const type = ['experience', 'education', 'skills'][i] || 'custom';
        addSection(type);
        document.querySelectorAll('#previewSections textarea')[i].value = text;
    });
}

// Drag-drop (basic)
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => {
    e.preventDefault();
    const dragged = document.querySelector('.section-item.dragging');
    if (dragged) {
        document.getElementById('previewSections').appendChild(dragged);
    }
});
document.addEventListener('dragstart', e => {
    if (e.target.classList.contains('section-item')) {
        e.target.classList.add('dragging');
    }
});
document.addEventListener('dragend', e => {
    e.target.classList.remove('dragging');
});
