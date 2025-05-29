// Content sections mapping
const contentSections = [
    { id: 'hero-title', label: 'Hero Title', default: 'Professional Services' },
    { id: 'hero-subtitle', label: 'Hero Subtitle', default: 'Quality service you can trust' },
    { id: 'hero-description', label: 'Hero Description', default: 'We provide professional services with a commitment to excellence and customer satisfaction.' },
    { id: 'process-step-1-title', label: 'Process Step 1 Title', default: 'Schedule A Visit' },
    { id: 'process-step-1-desc', label: 'Process Step 1 Description', default: 'Contact us to schedule a convenient time for our team to visit your location.' },
    { id: 'process-step-2-title', label: 'Process Step 2 Title', default: 'Get Your Quote' },
    { id: 'process-step-2-desc', label: 'Process Step 2 Description', default: 'Our team will assess your needs and provide a fair, transparent quote.' },
    { id: 'process-step-3-title', label: 'Process Step 3 Title', default: 'We Handle Everything' },
    { id: 'process-step-3-desc', label: 'Process Step 3 Description', default: 'Sit back and relax while our professionals take care of everything for you.' },
    { id: 'about-title', label: 'About Section Title', default: 'Your Trusted Local Service Provider' },
    { id: 'about-description', label: 'About Description', default: 'We are a locally owned and operated business committed to providing exceptional service to our community.' },
    { id: 'cta-text', label: 'Call to Action Text', default: 'Ready to get started? Contact us today for a free quote!' },
    { id: 'footer-description', label: 'Footer Description', default: 'Professional services delivered with integrity and excellence.' }
];

// Initialize the builder
document.addEventListener('DOMContentLoaded', function() {
    initializeContentTable();
    loadSavedData();
});

// Initialize content table with default sections
function initializeContentTable() {
    const tbody = document.getElementById('contentTableBody');
    tbody.innerHTML = '';
    
    contentSections.forEach(section => {
        addContentRow(section.id, section.label, section.default);
    });
}

// Add a new content row
function addContentRow(sectionId = '', label = '', content = '') {
    const tbody = document.getElementById('contentTableBody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <input type="text" class="form-control form-control-sm" value="${sectionId}" placeholder="Section ID">
            <small class="text-muted">${label}</small>
        </td>
        <td>
            <textarea class="form-control form-control-sm" rows="2" placeholder="Enter content...">${content}</textarea>
        </td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="removeRow(this)">Remove</button>
        </td>
    `;
    
    tbody.appendChild(row);
}

// Remove a content row
function removeRow(button) {
    button.closest('tr').remove();
}

// Load sample content
function loadSampleContent() {
    const sampleContent = {
        'hero-title': 'Junk Removal Minneapolis',
        'hero-subtitle': 'Smart Removal & Recycling',
        'hero-description': 'Junk Masters is locally owned, licensed, insured, and provides eco-friendly junk removal in the Minneapolis metro area.',
        'process-step-1-title': 'Schedule A Visit',
        'process-step-1-desc': 'Simply give us a call or easily book online to set up a convenient appointment for your junk removal—we work around your schedule!',
        'process-step-2-title': 'On-site Quote',
        'process-step-2-desc': 'Our friendly team arrives promptly to carefully assess your junk removal needs, providing you with a fair, transparent quote upfront.',
        'process-step-3-title': 'Load and Haul',
        'process-step-3-desc': 'Sit back and relax as our skilled professionals efficiently load, haul away your unwanted items, and thoroughly clean up.',
        'about-title': 'Full-Service Junk Removal Solution in Minneapolis',
        'about-description': 'Junk Masters provides fast, reliable junk removal for homes and businesses throughout Minneapolis.',
        'cta-text': 'Limited Time Offer! Get $20 Off your first service. Book online today!',
        'footer-description': 'Professional junk removal services delivered with integrity and a commitment to environmental responsibility.'
    };
    
    // Update company info
    document.getElementById('companyName').value = 'Junk Masters';
    document.getElementById('phoneNumber').value = '612-516-5865';
    document.getElementById('email').value = 'jobs@junkmastersmn.com';
    document.getElementById('address').value = '7402 Washington Ave, Eden Prairie, MN 55344';
    document.getElementById('businessHours').value = 'Monday - Friday: 6am - 9pm\nSaturday: 8am - 6pm\nSunday: 8am - 5pm';
    document.getElementById('serviceAreas').value = 'Minneapolis, St. Paul, Bloomington, Minnetonka, Eden Prairie, Maple Grove';
    
    // Update content blocks
    const rows = document.querySelectorAll('#contentTableBody tr');
    rows.forEach(row => {
        const sectionInput = row.querySelector('input');
        const contentTextarea = row.querySelector('textarea');
        const sectionId = sectionInput.value;
        
        if (sampleContent[sectionId]) {
            contentTextarea.value = sampleContent[sectionId];
        }
    });
}

// Import from spreadsheet
function importFromSpreadsheet() {
    const modal = new bootstrap.Modal(document.getElementById('importModal'));
    modal.show();
}

// Process imported data
function processImport() {
    const importData = document.getElementById('importData').value;
    const lines = importData.trim().split('\n');
    
    // Clear existing content
    const tbody = document.getElementById('contentTableBody');
    tbody.innerHTML = '';
    
    lines.forEach(line => {
        const [sectionId, content] = line.split('|').map(item => item.trim());
        if (sectionId && content) {
            addContentRow(sectionId, '', content);
        }
    });
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('importModal'));
    modal.hide();
    
    // Clear import textarea
    document.getElementById('importData').value = '';
}

// Generate preview
function generatePreview() {
    const companyData = getCompanyData();
    const contentData = getContentData();
    
    // Get the template HTML
    fetch('index.html')
        .then(response => response.text())
        .then(html => {
            // Replace placeholders with actual content
            let processedHtml = processPlaceholders(html, companyData, contentData);
            
            // Show preview
            const previewFrame = document.getElementById('previewFrame');
            const previewCard = document.getElementById('previewCard');
            
            previewCard.style.display = 'block';
            previewFrame.srcdoc = processedHtml;
            
            // Scroll to preview
            previewCard.scrollIntoView({ behavior: 'smooth' });
        });
}

// Process placeholders in HTML
function processPlaceholders(html, companyData, contentData) {
    // Replace company information
    html = html.replace(/Junk Masters/g, companyData.companyName);
    html = html.replace(/612-516-5865/g, companyData.phoneNumber);
    html = html.replace(/jobs@junkmastersmn\.com/g, companyData.email);
    html = html.replace(/7402 Washington Ave, Eden Prairie, MN 55344/g, companyData.address);
    
    // Replace content blocks
    for (const [sectionId, content] of Object.entries(contentData)) {
        // This is a simplified replacement - in production, you'd want more sophisticated targeting
        const patterns = getReplacementPatterns(sectionId);
        patterns.forEach(pattern => {
            html = html.replace(pattern.search, pattern.replace(content));
        });
    }
    
    // Update colors
    html = html.replace(/#007bff/g, companyData.primaryColor);
    html = html.replace(/#6c757d/g, companyData.secondaryColor);
    
    return html;
}

// Get replacement patterns for content sections
function getReplacementPatterns(sectionId) {
    const patterns = {
        'hero-title': [
            { 
                search: /<h1>\s*Junk Removal\s*<span>\s*Minneapolis\s*<\/span>\s*<\/h1>/g,
                replace: (content) => `<h1>${content}</h1>`
            }
        ],
        'hero-subtitle': [
            {
                search: /<h4[^>]*>\s*Smart Removal &amp; Recycling\s*<\/h4>/g,
                replace: (content) => `<h4 style="text-align: center;">${content}</h4>`
            }
        ],
        // Add more patterns as needed
    };
    
    return patterns[sectionId] || [];
}

// Get company data from form
function getCompanyData() {
    return {
        companyName: document.getElementById('companyName').value || 'Your Company',
        logoUrl: document.getElementById('logoUrl').value,
        primaryColor: document.getElementById('primaryColor').value,
        secondaryColor: document.getElementById('secondaryColor').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        businessHours: document.getElementById('businessHours').value,
        serviceAreas: document.getElementById('serviceAreas').value
    };
}

// Get content data from table
function getContentData() {
    const contentData = {};
    const rows = document.querySelectorAll('#contentTableBody tr');
    
    rows.forEach(row => {
        const sectionId = row.querySelector('input').value;
        const content = row.querySelector('textarea').value;
        
        if (sectionId && content) {
            contentData[sectionId] = content;
        }
    });
    
    return contentData;
}

// Close preview
function closePreview() {
    document.getElementById('previewCard').style.display = 'none';
}

// Save project
function saveProject() {
    const projectData = {
        company: getCompanyData(),
        content: getContentData(),
        template: document.getElementById('templateSelect').value,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('websiteBuilderProject', JSON.stringify(projectData));
    alert('Project saved successfully!');
}

// Load saved data
function loadSavedData() {
    const savedData = localStorage.getItem('websiteBuilderProject');
    if (savedData) {
        const projectData = JSON.parse(savedData);
        
        // Load company data
        if (projectData.company) {
            document.getElementById('companyName').value = projectData.company.companyName || '';
            document.getElementById('logoUrl').value = projectData.company.logoUrl || '';
            document.getElementById('primaryColor').value = projectData.company.primaryColor || '#007bff';
            document.getElementById('secondaryColor').value = projectData.company.secondaryColor || '#6c757d';
            document.getElementById('phoneNumber').value = projectData.company.phoneNumber || '';
            document.getElementById('email').value = projectData.company.email || '';
            document.getElementById('address').value = projectData.company.address || '';
            document.getElementById('businessHours').value = projectData.company.businessHours || '';
            document.getElementById('serviceAreas').value = projectData.company.serviceAreas || '';
        }
        
        // Load template
        if (projectData.template) {
            document.getElementById('templateSelect').value = projectData.template;
        }
    }
}

// Export website
function exportWebsite() {
    const companyData = getCompanyData();
    const contentData = getContentData();
    
    // Get the template HTML
    fetch('index.html')
        .then(response => response.text())
        .then(html => {
            // Process the HTML with actual content
            let processedHtml = processPlaceholders(html, companyData, contentData);
            
            // Create a blob and download
            const blob = new Blob([processedHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${companyData.companyName.replace(/\s+/g, '-').toLowerCase()}-website.html`;
            a.click();
            URL.revokeObjectURL(url);
            
            alert('Website exported successfully! The HTML file has been downloaded.');
        });
}