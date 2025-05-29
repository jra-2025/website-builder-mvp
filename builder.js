// Complete content sections mapping from the spreadsheet
const contentSections = [
    { id: 'homepage-1', label: 'Hero Introduction', placeholder: 'Junk Masters is locally owned, licensed, insured, and provides eco-friendly junk removal in the Minneapolis metro area.', charCount: 119 },
    { id: 'homepage-2', label: 'Process Tagline', placeholder: 'Easy, Fast, and Stress-Free from Start to finish!', charCount: 49 },
    { id: 'homepage-3', label: 'Schedule A Visit', placeholder: 'Simply give us a call or easily book online to set up a convenient appointment for your junk removal—we work around your schedule!', charCount: 130 },
    { id: 'homepage-4', label: 'On-site Quote', placeholder: 'Our friendly team arrives promptly to carefully assess your junk removal needs, providing you with a fair, transparent quote upfront.', charCount: 133 },
    { id: 'homepage-5', label: 'Load and Haul', placeholder: 'Sit back and relax as our skilled professionals efficiently load, haul away your unwanted items, and thoroughly clean up.', charCount: 121 },
    { id: 'homepage-6', label: 'Service Headline', placeholder: 'Fast Friendly Professional Junk Removal in Minneapolis', charCount: 54 },
    { id: 'homepage-7', label: 'Full Service Description', placeholder: 'Junk Masters is locally owned and operated. We provide full-service junk removal to the Minneapolis, Twin Cities metro area...', charCount: 315 },
    { id: 'homepage-8', label: 'About Us Link', placeholder: 'For more information about our junk removal team, be sure to visit our About Us page!', charCount: 85 },
    { id: 'homepage-9', label: 'Cost Subheading', placeholder: 'We recycle & dispose the junk so you don\'t have to', charCount: 50 },
    { id: 'homepage-10', label: 'Cost Description', placeholder: 'Get a FREE no-obligation quote of your junk removal items by sending us a picture or calling us directly for an on-site estimate.', charCount: 129 },
    { id: 'homepage-11', label: 'Charity Partnership', placeholder: 'Here at Junk Masters, we are committed to giving a new home to old furniture items...', charCount: 152 },
    { id: 'homepage-12', label: 'Furniture Removal CTA', placeholder: 'If you have any old furniture items and are in need of furniture removal...', charCount: 158 },
    { id: 'homepage-13', label: 'Testimonials Intro', placeholder: 'Read firsthand how Junk Masters has simplified junk removal for countless happy clients.', charCount: 93 },
    { id: 'homepage-14', label: 'Solution Description', placeholder: 'Junk Masters provides fast, reliable junk removal for homes and businesses throughout Minneapolis.', charCount: 100 },
    { id: 'homepage-15', label: 'Residential Service', placeholder: 'We provide full-service junk removal to the Minneapolis, Twin Cities metro area...', charCount: 153 },
    { id: 'homepage-16', label: 'Commercial Service', placeholder: 'If you are a business owner in the Minneapolis area, Junk Masters can\'t wait to assist you...', charCount: 158 },
    { id: 'homepage-17', label: 'Demolition Service', placeholder: 'Junk Masters is the local answer for demolition services in the Minneapolis...', charCount: 160 },
    { id: 'homepage-18', label: 'Construction Debris', placeholder: 'If you\'ve recently completed a home DIY project, you can trust us...', charCount: 166 },
    { id: 'homepage-19', label: 'Donation Pickups', placeholder: 'Are you trying to get rid of some old furniture, clothing, or appliances...', charCount: 179 },
    { id: 'homepage-20', label: 'Foreclosure Cleanouts', placeholder: 'Dealing with the loss of a friend or loved one is hard...', charCount: 235 },
    { id: 'homepage-21', label: 'House Cleanouts', placeholder: 'Sometimes, junk just seems to keep piling up, filling your entire home...', charCount: 191 },
    { id: 'homepage-22', label: 'Shed Removal', placeholder: 'Your old shed has served you well, but it\'s finally time for an upgrade...', charCount: 155 },
    { id: 'homepage-23', label: 'Storage Cleanouts', placeholder: 'If you\'re a property owner or a renter, you can trust us...', charCount: 115 },
    { id: 'homepage-24', label: 'Yard Waste', placeholder: 'Whether you\'re a landscaping professional with jobs all over town...', charCount: 157 },
    { id: 'homepage-25', label: 'Schedule CTA', placeholder: 'Reach out now to Schedule Your Pickup!', charCount: 43 },
    { id: 'homepage-26', label: 'Same Day Service', placeholder: 'Need junk removed quickly? Our responsive team provides reliable same-day service...', charCount: 116 },
    { id: 'homepage-27', label: 'Eco-Friendly', placeholder: 'We prioritize the environment by recycling, responsibly disposing...', charCount: 119 },
    { id: 'homepage-28', label: 'Non-Profit Donation', placeholder: 'We proudly partner with local charities, donating gently-used items...', charCount: 100 },
    { id: 'homepage-29', label: 'Emergency Service', placeholder: 'Facing an unexpected situation? Our dependable team is ready...', charCount: 127 },
    { id: 'homepage-30', label: 'Licensed & Insured', placeholder: 'Our professional crew is fully licensed, insured, and trained...', charCount: 137 },
    { id: 'homepage-31', label: 'Locally Owned', placeholder: 'As a local business, we genuinely care about our neighbors...', charCount: 122 },
    { id: 'homepage-32', label: 'FAQ Intro', placeholder: 'Find quick answers to common questions about Junk Masters\' services.', charCount: 75 },
    { id: 'homepage-33', label: 'FAQ Cost Question', placeholder: 'What is the cost for Junk Removal?', charCount: 37 },
    { id: 'homepage-34', label: 'FAQ Cost Answer', placeholder: 'Our junk removal pricing is based on the amount of space...', charCount: 335 },
    { id: 'homepage-35', label: 'FAQ Good Items Question', placeholder: 'What if my items are still in good, useable condition?', charCount: 60 },
    { id: 'homepage-36', label: 'FAQ Good Items Answer', placeholder: 'Good news! We will drop your items off on your behalf...', charCount: 221 },
    { id: 'homepage-37', label: 'FAQ Disposal Question', placeholder: 'What do you do with the junk?', charCount: 32 },
    { id: 'homepage-38', label: 'FAQ Disposal Answer', placeholder: 'We do the best to either recycle or donate your items...', charCount: 226 },
    { id: 'homepage-39', label: 'FAQ Process Intro', placeholder: 'Junk removal works in a few short, simple steps.', charCount: 46 },
    { id: 'homepage-40', label: 'FAQ Step 1', placeholder: '1. Call, use a contact form, or use an online booking tool.', charCount: 68 },
    { id: 'homepage-41', label: 'FAQ Step 2', placeholder: '2. A junk removal professional will ask you to describe...', charCount: 137 },
    { id: 'homepage-42', label: 'FAQ Step 3', placeholder: '3. Schedule a time for your appointment...', charCount: 113 },
    { id: 'homepage-43', label: 'FAQ Step 4', placeholder: '4. When the day of your appointment arrives...', charCount: 128 },
    { id: 'homepage-44', label: 'FAQ Step 5', placeholder: '5. Once they arrive, simply point out your unwanted items...', charCount: 136 },
    { id: 'homepage-45', label: 'FAQ Step 6', placeholder: '6. Watch as the junk removal professionals make...', charCount: 88 },
    { id: 'homepage-46', label: 'FAQ Step 7', placeholder: '7. Finally, it\'s time to settle up...', charCount: 86 },
    { id: 'homepage-47', label: 'FAQ Donation Question', placeholder: 'Our donation pickup service is simple...', charCount: 172 },
    { id: 'homepage-48', label: 'FAQ Prohibited Question', placeholder: 'What type of items do we NOT haul away?', charCount: 49 },
    { id: 'homepage-49', label: 'FAQ Prohibited Intro', placeholder: 'Our team will not haul away the following items:', charCount: 49 },
    { id: 'homepage-50', label: 'FAQ Cheapest Question', placeholder: 'What is the cheapest way to get rid of rubbish?', charCount: 53 },
    { id: 'homepage-51', label: 'FAQ Cheapest Option 1', placeholder: '1. You can get rid of your unwanted junk by selling it...', charCount: 100 },
    { id: 'homepage-52', label: 'FAQ Cheapest Option 2', placeholder: '2. Rent a dumpster. That way you can throw away...', charCount: 102 },
    { id: 'homepage-53', label: 'FAQ Cheapest Option 3', placeholder: '3. Bring your unwanted junk to a dump site...', charCount: 89 },
    { id: 'homepage-54', label: 'FAQ Cheapest Option 4', placeholder: '4. Bring your junk items to a recycling center...', charCount: 85 },
    { id: 'homepage-55', label: 'FAQ Cheapest Option 5', placeholder: '5. Bring your unwanted junk to a donation center.', charCount: 50 },
    { id: 'homepage-56', label: 'FAQ Cheapest Option 6', placeholder: '6. If you would rather not haul your junk on your own...', charCount: 123 },
    { id: 'homepage-57', label: 'FAQ Tipping', placeholder: 'While tipping for junk removal is appreciated...', charCount: 224 },
    { id: 'homepage-58', label: 'FAQ Large Junk Question', placeholder: 'How do I get rid of large junk?', charCount: 37 },
    { id: 'homepage-59', label: 'FAQ Large Junk Answer', placeholder: 'You can get rid of large, bulky junk items...', charCount: 157 },
    { id: 'homepage-60', label: 'FAQ Location Question', placeholder: 'Do I have to have my items in the garage?', charCount: 46 },
    { id: 'homepage-61', label: 'FAQ Location Answer', placeholder: 'Our service includes labor to remove items...', charCount: 197 },
    { id: 'homepage-62', label: 'FAQ License Question', placeholder: 'Are you licensed and insured for junk removal?', charCount: 50 },
    { id: 'homepage-63', label: 'FAQ License Answer', placeholder: 'Our team is fully licensed and insured...', charCount: 262 }
];

// Company information fields
const companyFields = {
    name: '',
    phone: '',
    email: '',
    address: '',
    hours: '',
    serviceAreas: [],
    specialDiscount: '',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    logoUrl: ''
};

// Initialize the builder
document.addEventListener('DOMContentLoaded', function() {
    initializeContentTable();
    loadSavedData();
    setupEventListeners();
});

// Initialize content table with all sections
function initializeContentTable() {
    const tbody = document.getElementById('contentTableBody');
    tbody.innerHTML = '';
    
    contentSections.forEach(section => {
        addContentRow(section.id, section.label, '', section.charCount);
    });
}

// Add a new content row with character counter
function addContentRow(sectionId = '', label = '', content = '', charCount = 0) {
    const tbody = document.getElementById('contentTableBody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <input type="text" class="form-control form-control-sm section-id" value="${sectionId}" readonly>
            <small class="text-muted">${label}</small>
        </td>
        <td>
            <textarea class="form-control form-control-sm content-input" rows="2" placeholder="Enter content..." data-char-count="${charCount}">${content}</textarea>
            <small class="char-counter text-muted">0 / ${charCount} characters</small>
        </td>
        <td>
            <button class="btn btn-sm btn-danger" onclick="removeRow(this)">Remove</button>
        </td>
    `;
    
    tbody.appendChild(row);
    
    // Add character counter listener
    const textarea = row.querySelector('textarea');
    textarea.addEventListener('input', updateCharCounter);
}

// Update character counter
function updateCharCounter(event) {
    const textarea = event.target;
    const charCount = textarea.value.length;
    const maxCount = textarea.getAttribute('data-char-count');
    const counter = textarea.nextElementSibling;
    
    counter.textContent = `${charCount} / ${maxCount} characters`;
    
    if (charCount > maxCount) {
        counter.classList.add('text-danger');
    } else {
        counter.classList.remove('text-danger');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Add input listeners for all textareas
    document.querySelectorAll('.content-input').forEach(textarea => {
        textarea.addEventListener('input', updateCharCounter);
    });
}

// Remove a content row
function removeRow(button) {
    if (confirm('Are you sure you want to remove this content block?')) {
        button.closest('tr').remove();
    }
}

// Load sample content
function loadSampleContent() {
    // Sample company info
    document.getElementById('companyName').value = 'Junk Masters';
    document.getElementById('phoneNumber').value = '612-516-5865';
    document.getElementById('email').value = 'jobs@junkmastersmn.com';
    document.getElementById('address').value = '7402 Washington Ave, Eden Prairie, MN 55344';
    document.getElementById('businessHours').value = 'Monday - Friday: 6am - 9pm\nSaturday: 8am - 6pm\nSunday: 8am - 5pm';
    document.getElementById('serviceAreas').value = 'Minneapolis, St. Paul, Bloomington, Minnetonka, Eden Prairie, Maple Grove';
    document.getElementById('specialDiscount').value = '$20 off when you book online';
    
    // Load some sample content blocks
    const sampleContent = {
        'homepage-1': 'Junk Masters is locally owned, licensed, insured, and provides eco-friendly junk removal in the Minneapolis metro area.',
        'homepage-2': 'Easy, Fast, and Stress-Free from Start to finish!',
        'homepage-3': 'Simply give us a call or easily book online to set up a convenient appointment for your junk removal—we work around your schedule!',
        'homepage-6': 'Fast Friendly Professional Junk Removal in Minneapolis',
        'homepage-25': 'Reach out now to Schedule Your Pickup!'
    };
    
    // Update content in table
    document.querySelectorAll('#contentTableBody tr').forEach(row => {
        const sectionId = row.querySelector('.section-id').value;
        const textarea = row.querySelector('textarea');
        
        if (sampleContent[sectionId]) {
            textarea.value = sampleContent[sectionId];
            // Trigger character counter update
            textarea.dispatchEvent(new Event('input'));
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
    
    lines.forEach(line => {
        // Support multiple formats: pipe-separated or tab-separated
        let parts = line.includes('|') ? line.split('|') : line.split('\t');
        
        if (parts.length >= 2) {
            const sectionId = parts[0].trim();
            const content = parts[1].trim();
            
            // Find the matching row and update content
            document.querySelectorAll('#contentTableBody tr').forEach(row => {
                const rowSectionId = row.querySelector('.section-id').value;
                if (rowSectionId === sectionId) {
                    const textarea = row.querySelector('textarea');
                    textarea.value = content;
                    textarea.dispatchEvent(new Event('input'));
                }
            });
        }
    });
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('importModal'));
    modal.hide();
    document.getElementById('importData').value = '';
    
    alert('Content imported successfully!');
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
        serviceAreas: document.getElementById('serviceAreas').value,
        specialDiscount: document.getElementById('specialDiscount').value || ''
    };
}

// Get content data from table
function getContentData() {
    const contentData = {};
    
    document.querySelectorAll('#contentTableBody tr').forEach(row => {
        const sectionId = row.querySelector('.section-id').value;
        const content = row.querySelector('textarea').value;
        
        if (sectionId && content) {
            contentData[sectionId] = content;
        }
    });
    
    return contentData;
}

// Enhanced HTML processing
function processPlaceholders(html, companyData, contentData) {
    // First, handle all content blocks
    for (const [sectionId, content] of Object.entries(contentData)) {
        html = replaceContentSection(html, sectionId, content);
    }
    
    // Global company information replacements
    html = html.replace(/Junk Masters/g, companyData.companyName);
    html = html.replace(/612-516-5865/g, companyData.phoneNumber);
    html = html.replace(/\(612\) 516-5865/g, formatPhone(companyData.phoneNumber));
    html = html.replace(/jobs@junkmastersmn\.com/g, companyData.email);
    html = html.replace(/7402 Washington Ave, Eden Prairie, MN 55344/g, companyData.address);
    
    // Service areas
    if (companyData.serviceAreas) {
        const areas = companyData.serviceAreas.split(',').map(area => area.trim());
        const areaList = areas.map(area => `<li>${area}</li>`).join('');
        html = html.replace(/<ul class="service-areas">[\s\S]*?<\/ul>/g, `<ul class="service-areas">${areaList}</ul>`);
    }
    
    // Business hours
    if (companyData.businessHours) {
        const hours = companyData.businessHours.replace(/\n/g, '<br>');
        html = html.replace(/Monday.*?Sunday: 8am – 5pm/g, hours);
        html = html.replace(/MON.*?FRI: 6AM.*?9PM/g, formatBusinessHours(companyData.businessHours));
    }
    
    // Special discount
    if (companyData.specialDiscount) {
        html = html.replace(/\$20 off when you book online/g, companyData.specialDiscount);
        html = html.replace(/Save \$20/g, companyData.specialDiscount);
    }
    
    // Colors
    html = updateColors(html, companyData.primaryColor, companyData.secondaryColor);
    
    // Logo
    if (companyData.logoUrl) {
        html = html.replace(/src="[^"]*junk-masters-logo[^"]*\.png"/g, `src="${companyData.logoUrl}"`);
    }
    
    return html;
}

// Replace specific content sections
function replaceContentSection(html, sectionId, content) {
    const replacements = {
        'homepage-1': [
            {
                pattern: /Junk Masters is locally owned, licensed, insured, and provides eco-friendly junk removal in the Minneapolis metro area\./g,
                replacement: content
            }
        ],
        'homepage-2': [
            {
                pattern: /Easy, Fast, and Stress-Free from Start to finish!/g,
                replacement: content
            }
        ],
        'homepage-3': [
            {
                pattern: /Simply give us a call or easily book online to set up a convenient appointment for your junk removal—we work around your schedule!/g,
                replacement: content
            }
        ],
        'homepage-4': [
            {
                pattern: /Our friendly team arrives promptly to carefully assess your junk removal needs, providing you with a fair, transparent quote upfront\./g,
                replacement: content
            }
        ],
        'homepage-5': [
            {
                pattern: /Sit back and relax as our skilled professionals efficiently load, haul away your unwanted items, and thoroughly clean up\./g,
                replacement: content
            }
        ],
        'homepage-6': [
            {
                pattern: /Fast Friendly Professional Junk Removal in Minneapolis/g,
                replacement: content
            }
        ],
        // Add more mappings as needed
    };
    
    if (replacements[sectionId]) {
        replacements[sectionId].forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });
    }
    
    return html;
}

// Format phone number
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
}

// Format business hours for header
function formatBusinessHours(hours) {
    const lines = hours.split('\n');
    if (lines.length > 0) {
        const weekdayHours = lines[0].match(/\d+[ap]m.*?\d+[ap]m/i);
        if (weekdayHours) {
            return weekdayHours[0].toUpperCase();
        }
    }
    return 'MON - FRI: 6AM - 9PM';
}

// Update colors throughout the HTML
function updateColors(html, primaryColor, secondaryColor) {
    // CSS color replacements
    html = html.replace(/#007bff/g, primaryColor);
    html = html.replace(/#bed900/g, secondaryColor);
    
    // You may need to add more specific color replacements based on your CSS
    return html;
}

// Generate preview
function generatePreview() {
    const companyData = getCompanyData();
    const contentData = getContentData();
    
    // Show loading state
    const previewBtn = event.target;
    previewBtn.classList.add('disabled');
    previewBtn.textContent = 'Generating...';
    
    // Get the template HTML
    fetch('index.html')
        .then(response => response.text())
        .then(html => {
            // Process the HTML with actual content
            let processedHtml = processPlaceholders(html, companyData, contentData);
            
            // Show preview
            const previewFrame = document.getElementById('previewFrame');
            const previewCard = document.getElementById('previewCard');
            
            previewCard.style.display = 'block';
            previewFrame.srcdoc = processedHtml;
            
            // Scroll to preview
            previewCard.scrollIntoView({ behavior: 'smooth' });
            
            // Reset button
            previewBtn.classList.remove('disabled');
            previewBtn.textContent = 'Preview Website';
        })
        .catch(error => {
            alert('Error generating preview: ' + error.message);
            previewBtn.classList.remove('disabled');
            previewBtn.textContent = 'Preview Website';
        });
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
            document.getElementById('specialDiscount').value = projectData.company.specialDiscount || '';
        }
        
        // Load content data
        if (projectData.content) {
            for (const [sectionId, content] of Object.entries(projectData.content)) {
                document.querySelectorAll('#contentTableBody tr').forEach(row => {
                    const rowSectionId = row.querySelector('.section-id').value;
                    if (rowSectionId === sectionId) {
                        const textarea = row.querySelector('textarea');
                        textarea.value = content;
                        textarea.dispatchEvent(new Event('input'));
                    }
                });
            }
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
        })
        .catch(error => {
            alert('Error exporting website: ' + error.message);
        });
}
