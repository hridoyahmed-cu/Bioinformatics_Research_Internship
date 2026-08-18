/**
 * BioPC Academy — BRI 4.0 Registration Form Handler
 * =====================================================
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open your Google Sheet in browser
 * 2. Click Extensions → Apps Script
 * 3. Delete everything in Code.gs and paste this entire code
 * 4. In the top toolbar, select 'setupSheet' in the dropdown and click ▶ 'Run'
 *    (Authorize permissions if prompted)
 * 5. Click Deploy → Manage Deployments (or New Deployment) → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and paste it into script.js (GAS_ENDPOINT)
 */

// If you created Apps Script standalone at script.google.com, paste your Sheet ID here:
const SHEET_ID = '1-jPVNu1_9zuBM-4hlhocW3_qXoOSyr4q-6dVnotoSKw';
const SHEET_NAME = 'Registrations';
const DRIVE_FOLDER_NAME = 'BRI 4.0 Payment Screenshots';
const NOTIFY_EMAIL = 'biopc.research@gmail.com';

/**
 * Automatically adds a custom menu to your Google Sheet toolbar when opened.
 */
function onOpen() {
  try {
    SpreadsheetApp.getUi()
      .createMenu('★ BRI 4.0')
      .addItem('Setup / Refresh Sheet Headers', 'setupSheet')
      .addToUi();
  } catch (e) {
    // Silently ignore if running in non-UI context
  }
}

/**
 * Gets the active spreadsheet if opened from Extensions > Apps Script,
 * or opens by SHEET_ID if running as standalone web app.
 */
function getSpreadsheet() {
  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (e) {}

  if (SHEET_ID && SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID_HERE') {
    return SpreadsheetApp.openById(SHEET_ID);
  }
  throw new Error('Please set your SHEET_ID or open Apps Script from Extensions > Apps Script inside your Google Sheet.');
}

/**
 * Gets or creates the Google Drive folder to store uploaded screenshots.
 */
function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

/**
 * Saves uploaded Base64 screenshot to Google Drive and returns the shareable URL.
 */
function saveScreenshot(data) {
  if (!data || !data.screenshotData) {
    return 'No screenshot uploaded';
  }

  try {
    const folder = getOrCreateFolder();
    let base64Data = data.screenshotData;
    
    // Remove "data:image/...;base64," prefix if present
    const commaIndex = base64Data.indexOf(',');
    if (commaIndex !== -1) {
      base64Data = base64Data.substring(commaIndex + 1);
    }

    const decodedBytes = Utilities.base64Decode(base64Data);
    const contentType = data.screenshotType || 'image/jpeg';
    const safeName = (data.fullName || 'User').replace(/[^a-zA-Z0-9]/g, '_');
    const safeTrx = (data.transactionId || 'NoTrx').replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${safeTrx}_${safeName}_screenshot.jpg`;

    const blob = Utilities.newBlob(decodedBytes, contentType, fileName);
    const file = folder.createFile(blob);

    // Make viewable to anyone with the link
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      Logger.log('Warning setting public share: ' + shareErr.toString());
    }

    return file.getUrl();
  } catch (err) {
    Logger.log('Error saving screenshot: ' + err.toString());
    return 'Upload error: ' + err.toString();
  }
}

/**
 * Direct Test: Run this function to test Google Drive folder creation and image upload.
 */
function testDriveUpload() {
  const dummyData = {
    fullName: 'Test Student',
    transactionId: 'TEST12345',
    screenshotType: 'image/png',
    screenshotData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  };
  const url = saveScreenshot(dummyData);
  Logger.log('Test file created in Drive! URL: ' + url);
  return 'SUCCESS! Drive file uploaded: ' + url;
}

/**
 * One-click function to create and style the headers in your Google Sheet.
 * Select 'setupSheet' in the Apps Script toolbar dropdown and click 'Run'.
 */
function setupSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    const sheets = ss.getSheets();
    if (sheets.length === 1 && sheets[0].getLastRow() === 0) {
      sheet = sheets[0];
      sheet.setName(SHEET_NAME);
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }

  // Define headers including Screenshot Link
  const headers = [
    'Timestamp', 'Full Name', 'Email', 'Phone', 'WhatsApp',
    'University / Institution', 'Department', 'Academic Level',
    'Skill Level', 'Coupon Code', 'Payment Method', 'Transaction ID',
    'Payment Screenshot (Drive Link)', 'Status'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Style header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4F46E5');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  // Set column widths
  sheet.setColumnWidth(1, 170); // Timestamp
  sheet.setColumnWidth(2, 180); // Full Name
  sheet.setColumnWidth(3, 200); // Email
  sheet.setColumnWidth(4, 130); // Phone
  sheet.setColumnWidth(5, 130); // WhatsApp
  sheet.setColumnWidth(6, 220); // University
  sheet.setColumnWidth(7, 180); // Department
  sheet.setColumnWidth(8, 140); // Academic Level
  sheet.setColumnWidth(9, 130); // Skill Level
  sheet.setColumnWidth(10, 120); // Coupon Code
  sheet.setColumnWidth(11, 140); // Payment Method
  sheet.setColumnWidth(12, 150); // Transaction ID
  sheet.setColumnWidth(13, 280); // Payment Screenshot (Drive Link)
  sheet.setColumnWidth(14, 160); // Status

  Logger.log('Headers created successfully in ' + sheet.getName() + ' tab!');
  return 'Headers created successfully in ' + sheet.getName() + ' tab!';
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const screenshotUrl = saveScreenshot(data);
    data.screenshotUrl = screenshotUrl;

    writeToSheet(data);
    sendConfirmationEmail(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Registration received.', screenshotUrl: screenshotUrl }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log('doPost Error: ' + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'BRI 4.0 Registration API is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function writeToSheet(data) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet || sheet.getLastRow() === 0) {
    setupSheet();
    sheet = ss.getSheetByName(SHEET_NAME);
  }

  sheet.appendRow([
    new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' }),
    data.fullName || '',
    data.email || '',
    data.phone || '',
    data.whatsapp || '',
    data.university || '',
    data.department || '',
    data.academicLevel || '',
    data.skillLevel || '',
    data.couponCode || 'N/A',
    data.paymentMethod || '',
    data.transactionId || '',
    data.screenshotUrl || 'No screenshot uploaded',
    'Pending Verification'
  ]);
}

function sendConfirmationEmail(data) {
  // Notify admin
  GmailApp.sendEmail(
    NOTIFY_EMAIL,
    `[BRI 4.0] New Registration — ${data.fullName}`,
    `New registration received:\n\n` +
    `Name: ${data.fullName}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone}\n` +
    `WhatsApp: ${data.whatsapp || 'Same as phone'}\n` +
    `University: ${data.university}\n` +
    `Department: ${data.department}\n` +
    `Academic Level: ${data.academicLevel}\n` +
    `Skill Level: ${data.skillLevel}\n` +
    `Coupon Code: ${data.couponCode || 'None'}\n` +
    `Payment Method: ${data.paymentMethod}\n` +
    `Transaction ID: ${data.transactionId}\n` +
    `Payment Screenshot Link: ${data.screenshotUrl || 'None'}\n\n` +
    `Please verify payment and confirm the seat.\n\n` +
    `View all registrations: https://docs.google.com/spreadsheets/d/${SHEET_ID}`
  );

  // Send confirmation to applicant
  if (data.email) {
    GmailApp.sendEmail(
      data.email,
      'BioPC Academy — BRI 4.0 Registration Received ✓',
      `Dear ${data.fullName},\n\n` +
      `Thank you for registering for BioPC Academy's Bioinformatics Research Internship 4.0!\n\n` +
      `We have received your registration with Transaction ID: ${data.transactionId}.\n\n` +
      `Our team will verify your payment and confirm your seat within 24–48 hours via email.\n\n` +
      `Key Details:\n` +
      `• Program: Bioinformatics Research Internship 4.0\n` +
      `• Duration: 4 Months\n` +
      `• Schedule: Fri & Sat, 9:30–11:00 PM\n` +
      `• Platform: Google Meet / Zoom\n\n` +
      `If you have any questions, reply to this email or contact us at biopc.research@gmail.com.\n\n` +
      `Best regards,\n` +
      `BioPC Academy Team`
    );
  }
}
