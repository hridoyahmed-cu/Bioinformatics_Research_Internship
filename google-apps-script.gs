/**
 * BioPC Academy — BRI 4.0 Registration Form Handler
 * =====================================================
 * DEPLOYMENT STEPS:
 * 1. Go to https://script.google.com → New Project
 * 2. Paste this entire script
 * 3. Create a Google Sheet and copy its ID from the URL
 * 4. Replace SHEET_ID below with your actual Sheet ID
 * 5. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web App URL
 * 7. In script.js, replace GAS_ENDPOINT with that URL
 */

const SHEET_ID = '1-jPVNu1_9zuBM-4hlhocW3_qXoOSyr4q-6dVnotoSKw';
const SHEET_NAME = 'Registrations';
const NOTIFY_EMAIL = 'biopc.research@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    writeToSheet(data);
    sendConfirmationEmail(data);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Registration received.' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
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
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Add header row
    sheet.appendRow([
      'Timestamp', 'Full Name', 'Email', 'Phone', 'WhatsApp',
      'University / Institution', 'Department', 'Academic Level',
      'Skill Level', 'Coupon Code', 'Payment Method', 'Transaction ID', 'Status'
    ]);
    // Style header
    const headerRange = sheet.getRange(1, 1, 1, 13);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4F46E5');
    headerRange.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
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
    `Transaction ID: ${data.transactionId}\n\n` +
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
