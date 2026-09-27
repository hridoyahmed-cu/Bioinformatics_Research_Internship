# Walkthrough — Amount Sent Question, ৳1,000 Coupon Discount, FAQ & Custom Round Cursor

We have added the **"Amount Sent (BDT / ৳)"** question to the registration form, integrated a **৳1,000 instant coupon discount calculation**, updated the **FAQ section**, created a **smooth round shape custom cursor**, and enhanced the **Google Apps Script backend** and Google Sheets schema.

---

## Key Updates & Features Implemented

### 1. Beautiful Round Shape Custom Cursor
- **Dual-Element Design**:
  - **Center Dot (`#cursorDot`)**: High-precision, zero-lag glowing focal point.
  - **Trailing Ring (`#cursorRing`)**: Smooth lerp interpolated trailing circle with soft glow and glassmorphic accent.
- **Interactive Micro-Animations**:
  - **Hover Expansion**: Expands to `54px` with glowing cyan/violet highlight when hovering links, buttons, inputs, accordion headers, and tool cards.
  - **Click Feedback**: Contracts smoothly on mouse click down (`scale: 0.85`).
  - **Auto-Hide**: Fades out seamlessly when the mouse leaves the browser viewport.
  - **Mobile Optimized**: Automatically disabled on touch screens via `@media (pointer: coarse)`.

---

### 2. "Amount Sent (BDT / ৳)" Question in Registration Form
- **Professional Label**: `Amount Sent (BDT / ৳) *`
- **Dynamic Helper Note**: `Student: ৳5,000 | With coupon: ৳4,000 | Professional: ৳10,000`
- **Placeholder**: `e.g. 5000 (or 4000 with coupon)`
- **Dynamic Auto-Calculation**:
  - When a student applies a valid coupon code, the field is automatically updated to **`4000`** and highlighted.
  - If a professional academic level is selected, it suggests **`10000`** (or **`9000`** with coupon).
- **Validation**: Ensures a positive number is provided before allowing form submission.

---

### 3. ৳1,000 Coupon Discount System
- When applicants enter a valid single-use coupon code (e.g. `BBO3-XXXXXX`, `BPC-CORE-XXXXXX`, `BPC-WS-XXXXXX`, etc.):
  - **Instant Feedback**:
    > ✓ **[Category] Coupon Applied!** ৳1,000 discount applied — Please send **৳4,000** (Student) / **৳9,000** (Professional).
  - **Real-Time UI Update**: Automatically updates the `Amount Sent` field and hint text to show the ৳1,000 savings.

---

### 4. Payment Instructions Box & Fee Breakdown Pills
Added modern visual fee breakdown pills inside the payment box:
- **Student Rate**: ৳5,000
- **With Coupon Code**: ৳4,000 *(৳1,000 OFF)*
- **Professional Rate**: ৳10,000

---

### 5. Comprehensive FAQ Section Updates
Added and refined FAQ questions in the **Fees & Payment** section:
1. **What are the course fees?**
   > Explains student rate ৳5,000, professional rate ৳10,000, and the additional ৳1,000 discount with coupon reducing student fee to ৳4,000.
2. **How does the coupon discount work, and how much money do I send?** *(New FAQ)*
   > Step-by-step explanation: Enter coupon &rarr; get ৳1,000 discount &rarr; send ৳4,000 via Send Money &rarr; enter `4000` in "Amount Sent" along with TrxID and screenshot.
3. **How do I register and pay?**
   > Mentions the exact fee structure, Send Money instructions, entering the Amount Sent and TrxID, and email verification.
4. **What is the refund policy?** *(Updated)*
   > Explains that there is strictly no refund once registered and payments are completely non-refundable.

---

### 6. Google Apps Script & Sheet Integration (`google-apps-script.gs`)
- **New Column in `Registrations` sheet**: Column 11 is **`Amount Sent (BDT)`**.
- **`writeToSheet()`**: Saves the exact amount sent by the applicant to Google Sheets.
- **World-Class HTML Automated Confirmation Email**:
  - Replaced plain text email with a responsive, branded HTML email template.
  - **No Public WhatsApp Group Invite in Email**: The direct group invite link is kept exclusively on-screen after form submission to protect group privacy.
  - **Payment Verification Not Needed Notice**: Clearly informs applicants that if they have properly joined the official WhatsApp group via the post-submission screen, their seat is secured and manual payment verification is **not required**.
  - **WhatsApp Support & Confirmation Assistance**: Direct coordinator support card with click-to-chat WhatsApp link to `+8801308584945` (`https://wa.me/8801308584945`) and `biopc.research@gmail.com` if they missed joining or need confirmation.
  - **Full Registration Summary**: Clean table displaying Full Name, Email, Phone, WhatsApp, University, Department, Amount Sent (৳), Payment Method, Transaction ID, Coupon savings, and Verification Status.
  - **Key Program Routine & Details**: Displays updated routine (**Friday, Saturday & Tuesday, 9:30–11:00 PM BST**) and updated deadline (**31 October 2026**).

---

### 7. Post-Registration WhatsApp Next-Step Modal & In-Form Card
Upon completing registration, applicants are immediately guided to join the official WhatsApp cohort group:
- **Interactive Modal (`#whatsappModal`) & In-Form Card (`#formSuccess`)**:
  - **Important Badge**: `IMPORTANT — ONE MORE STEP`
  - **Title**: `Join the WhatsApp group`
  - **Explanation**: `Class links, schedule changes, materials and announcements are shared only in the WhatsApp group. Your registration is not complete until you join.`
  - **Primary CTA**: `• Join the WhatsApp group` (opens `https://chat.whatsapp.com/B5gSATnSJlg6Xm800uu5ub?s=cl&p=i&mlu=0&ilr=4`)
  - **Direct Support Contact**: Added quick WhatsApp contact note: `+880 1308-584945` for anyone facing difficulties joining or needing confirmation.

---

### 8. Dates & Routine Adjustments
- **Registration Deadline**: Updated to **31 October 2026** across `index.html` (hero badge, key info table, FAQ, meta description), `script.js` (countdown timer `2026-10-31T23:59:59`), and `google-apps-script.gs`.
- **Class Routine**: Confirmed and synchronized to **Friday, Saturday, and Tuesday from 9:30 PM to 11:00 PM (Bangladesh Time / BST)** across all website sections, FAQs, and confirmation emails.
- **Website URL**: Standardized across the entire project to **`https://biopc.org/`**.
- **Live Email Preview**: Created [`email-preview.html`](file:///f:/Mustak/BRI%204.0/email-preview.html) for reviewing desktop and mobile rendering.

---

### 9. Project Work & Q1/Q2 Journal Publication Outcomes
- **"Why Join This Internship" Section**:
  - Added: `✓ Opportunity to get project work after successfully completing the internship`
  - Added: `✓ Research support & publication in Q1 / Q2 indexed journals`
  - Added: `✓ Pathways to join active project work & funded research teams`
- **Career Development Pathway**:
  - Step 4 updated to: **Research Assistant & Project Work**
  - Step 5 updated to: **Permanent Membership & Q1/Q2 Publishing**
- **FAQ Section (Outcomes, Projects & Publications)**:
  - Added FAQ: *"Can I get project work after successfully completing the internship?"*
  - Added FAQ: *"Will I receive research support to publish in Q1 or Q2 journals?"*

---

## Instructions to Update Google Apps Script

To deploy the new HTML confirmation email and sync your Google Sheet:
1. Open your Google Sheet: [https://docs.google.com/spreadsheets/d/1-jPVNu1_9zuBM-4hlhocW3_qXoOSyr4q-6dVnotoSKw](https://docs.google.com/spreadsheets/d/1-jPVNu1_9zuBM-4hlhocW3_qXoOSyr4q-6dVnotoSKw)
2. Go to **Extensions → Apps Script**.
3. Replace all contents of `Code.gs` with the updated code in [`google-apps-script.gs`](file:///f:/Mustak/BRI%204.0/google-apps-script.gs).
4. Click **Save** (💾 icon).
5. Click **Deploy → Manage Deployments → Edit (pencil icon) → New version → Deploy**.

