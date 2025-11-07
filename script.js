function startBuilder() {
    document.querySelector('.hero').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    updatePreview(); // Initial load
}

function updatePreview() {
    document.getElementById('previewName').textContent = document.getElementById('name').value || 'Your Name';
    document.getElementById('previewTitle').textContent = document.getElementById('title').value || 'Your Job Title';
    document.getElementById('previewEmail').textContent = document.getElementById('email').value || 'your@email.com';
    document.getElementById('previewPhone').textContent = document.getElementById('phone').value || '123-456-7890';
    document.getElementById('previewSummary').textContent = document.getElementById('summary').value || 'Write a compelling summary here...';
    // Update sections (from addSection)
}

function switchTemplate() {
    const select = document.getElementById('templateSelect');
    const preview = document.getElementById('resumePreview');
    preview.className = `resume-preview ${select.value}`;
    // In full app, load CSS classes for each template
}

function addSection(type) {
    const sectionsDiv = document.getElementById('previewSections');
    const sidebarSections = document.getElementById('sections');
    const newSection = document.createElement('div');
    newSection.innerHTML = `
        <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <textarea placeholder="Details for ${type}..." oninput="updatePreview()"></textarea>
    `;
    newSection.draggable = true; // Mock drag-drop like Novoresume/Canva
    newSection.ondragstart = () => newSection.classList.add('dragging');
    sectionsDiv.appendChild(newSection);
    updatePreview(); // Refresh preview
}

function aiSuggest() {
    // Mock AI like Kickresume/Rezi – In real: fetch OpenAI
    const summary = document.getElementById('summary');
    summary.value = 'Dynamic professional with 5+ years in tech, boosting efficiency by 30% via innovative solutions. Tailored for ATS success.';
    updatePreview();
    alert('AI Suggestion Added! (Inspired by top AI builders)');
}

function checkATS() {
    // Mock ATS like Teal/Rezi
    alert('ATS Check: 85% optimized! Add keywords like "agile" or "Python" for 100%.');
}

function exportPDF() {
    // Use jsPDF in full version; mock here
    const content = document.getElementById('resumePreview').innerText;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt'; // Start with TXT; upgrade to PDF
    a.click();
    alert('Exported! (Free like Indeed)');
}

// Drag-drop mock (Novoresume style)
document.addEventListener('dragover', e => e.preventDefault());
document.addEventListener('drop', e => {
    e.preventDefault();
    const dragged = document.querySelector('.dragging');
    if (dragged) {
        document.getElementById('previewSections').appendChild(dragged);
    }
});
