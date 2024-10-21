const storageKey = 'certificates';

function addCertificate(type) {
    const form = type === 'birth' ? document.getElementById('birthForm') : document.getElementById('deathForm');

    const certificate = {
        id: Date.now(),
        type: type,
        details: {}
    };

    // Collect details and check for empty fields
    if (type === 'birth') {
        certificate.details = {
            childName: document.getElementById('childName').value,
            dob: document.getElementById('dob').value,
            timeOfBirth: document.getElementById('timeOfBirth').value,
            hospitalName: document.getElementById('hospitalName').value,
            gender: document.getElementById('gender').value,
            abnormalities: document.getElementById('abnormalities').value,
            parentName: document.getElementById('parentName').value,
            placeOfBirth: document.getElementById('placeOfBirth').value,
        };
    } else {
        certificate.details = {
            deceasedName: document.getElementById('deceasedName').value,
            dateOfDeath: document.getElementById('dateOfDeath').value,
            timeOfDeath: document.getElementById('timeOfDeath').value,
            placeOfDeath: document.getElementById('placeOfDeath').value,
            causeOfDeath: document.getElementById('causeOfDeath').value,
            reportedDeath: document.getElementById('reportedDeath').value,
        };
    }

    // Check for empty fields
    const hasEmptyFields = Object.values(certificate.details).some(value => value === '' || value === null);
    if (hasEmptyFields) {
        alert("Please fill all the details.");
        return; // Stop further execution
    }

    let certificates = JSON.parse(localStorage.getItem(storageKey)) || [];
    certificates.push(certificate);
    localStorage.setItem(storageKey, JSON.stringify(certificates));
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} certificate added!`);
    updateCertificateList();
}

function downloadCertificate(type) {
    alert("Not connected to the blockchain network. Can't generate a PDF file.");
}

function verifyCertificate() {
    const id = document.getElementById('certificateId').value;
    const certificates = JSON.parse(localStorage.getItem(storageKey)) || [];
    const exists = certificates.some(cert => cert.id == id);
    document.getElementById('verificationResult').textContent = exists ? "Certificate is valid!" : "Certificate not found.";
}

function updateCertificateList() {
    const certificates = JSON.parse(localStorage.getItem(storageKey)) || [];
    const listElement = document.getElementById('certificatesList');
    listElement.innerHTML = '';

    certificates.forEach(cert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cert.id}</td>
            <td>${cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}</td>
            <td>
                <div>
                    <strong>Details:</strong><br>
                    ${cert.type === 'birth' ? `
                        Child's Name: ${cert.details.childName}<br>
                        Date of Birth: ${cert.details.dob}<br>
                        Time of Birth: ${cert.details.timeOfBirth}<br>
                        Hospital: ${cert.details.hospitalName}<br>
                        Gender: ${cert.details.gender}<br>
                        Abnormalities: ${cert.details.abnormalities || 'None'}<br>
                        Parent's Name: ${cert.details.parentName}<br>
                        Place of Birth: ${cert.details.placeOfBirth}
                    ` : `
                        Deceased Name: ${cert.details.deceasedName}<br>
                        Date of Death: ${cert.details.dateOfDeath}<br>
                        Time of Death: ${cert.details.timeOfDeath}<br>
                        Place of Death: ${cert.details.placeOfDeath}<br>
                        Cause of Death: ${cert.details.causeOfDeath}<br>
                        Reported Death: ${cert.details.reportedDeath}
                    `}
                </div>
                <i class="fas fa-check-circle" style="color: green;"></i> Verified
            </td>
        `;
        listElement.appendChild(row);
    });

    updateCounts(certificates); // Update counts for each category
}

function updateCounts(certificates) {
    const totalBirth = certificates.filter(cert => cert.type === 'birth').length;
    const totalDeath = certificates.filter(cert => cert.type === 'death').length;

    document.getElementById('totalAll').textContent = certificates.length;
    document.getElementById('totalBirth').textContent = totalBirth;
    document.getElementById('totalDeath').textContent = totalDeath;
}

function filterCertificates(type) {
    const certificates = JSON.parse(localStorage.getItem(storageKey)) || [];
    const filteredCertificates = type === 'all' ? certificates : certificates.filter(cert => cert.type === type);
    const listElement = document.getElementById('certificatesList');
    listElement.innerHTML = '';

    filteredCertificates.forEach(cert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cert.id}</td>
            <td>${cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}</td>
            <td>
                <div>
                    <strong>Details:</strong><br>
                    ${cert.type === 'birth' ? `
                        Child's Name: ${cert.details.childName}<br>
                        Date of Birth: ${cert.details.dob}<br>
                        Time of Birth: ${cert.details.timeOfBirth}<br>
                        Hospital: ${cert.details.hospitalName}<br>
                        Gender: ${cert.details.gender}<br>
                        Abnormalities: ${cert.details.abnormalities || 'None'}<br>
                        Parent's Name: ${cert.details.parentName}<br>
                        Place of Birth: ${cert.details.placeOfBirth}
                    ` : `
                        Deceased Name: ${cert.details.deceasedName}<br>
                        Date of Death: ${cert.details.dateOfDeath}<br>
                        Time of Death: ${cert.details.timeOfDeath}<br>
                        Place of Death: ${cert.details.placeOfDeath}<br>
                        Cause of Death: ${cert.details.causeOfDeath}<br>
                        Reported Death: ${cert.details.reportedDeath}
                    `}
                </div>
                <i class="fas fa-check-circle" style="color: green;"></i> Verified
            </td>
        `;
        listElement.appendChild(row);
    });

    updateCounts(certificates); // Update counts after filtering
}

// Initial call to populate the table and counts if there are existing certificates
updateCertificateList();

function findCertificate() {
    const id = document.getElementById('findCertificateId').value;
    const certificates = JSON.parse(localStorage.getItem(storageKey)) || [];
    const certificate = certificates.find(cert => cert.id == id);
    const detailsDiv = document.getElementById('certificateDetails');
    detailsDiv.innerHTML = '';

    if (certificate) {
        detailsDiv.innerHTML = `
            <h3>Certificate Found</h3>
            <div>
                <strong>Type:</strong> ${certificate.type.charAt(0).toUpperCase() + certificate.type.slice(1)}<br>
                <strong>Details:</strong><br>
                ${certificate.type === 'birth' ? `
                    Child's Name: ${certificate.details.childName}<br>
                    Date of Birth: ${certificate.details.dob}<br>
                    Time of Birth: ${certificate.details.timeOfBirth}<br>
                    Hospital: ${certificate.details.hospitalName}<br>
                    Gender: ${certificate.details.gender}<br>
                    Abnormalities: ${certificate.details.abnormalities || 'None'}<br>
                    Parent's Name: ${certificate.details.parentName}<br>
                    Place of Birth: ${certificate.details.placeOfBirth}
                ` : `
                    Deceased Name: ${certificate.details.deceasedName}<br>
                    Date of Death: ${certificate.details.dateOfDeath}<br>
                    Time of Death: ${certificate.details.timeOfDeath}<br>
                    Place of Death: ${certificate.details.placeOfDeath}<br>
                    Cause of Death: ${certificate.details.causeOfDeath}<br>
                    Reported Death: ${certificate.details.reportedDeath}
                `}
            </div>
            <button onclick="editCertificate(${certificate.id})">Edit Record</button>
            <button onclick="downloadCertificate('${certificate.type}', ${certificate.id})">Download as PDF</button>
        `;
    } else {
        detailsDiv.innerHTML = "<p>No certificate found with this ID.</p>";
    }
}

function editCertificate(id) {
    const certificates = JSON.parse(localStorage.getItem(storageKey)) || [];
    const certificate = certificates.find(cert => cert.id == id);
    if (certificate) {
        // Simulate an edit form with current values (you can expand this)
        alert('Edit functionality is a placeholder. Implement accordingly.');
    }
}

function downloadCertificate(type, id) {
    alert("Not connected to the blockchain network. Can't generate a PDF file.");
}
