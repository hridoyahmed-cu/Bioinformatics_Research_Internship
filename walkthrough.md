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
- **New Column in `Registrations` sheet**: Column 11 is now **`Amount Sent (BDT)`**.
- **`writeToSheet()`**: Saves the exact amount sent by the applicant to Google Sheets.
- **Automated Email Notifications**: Both admin and applicant confirmation emails display the exact **Amount Sent (BDT)** alongside Transaction ID and Coupon details. *(Note: As requested, the WhatsApp group link is **not** included in the email).*

---

### 7. Post-Registration WhatsApp Next-Step Modal & In-Form Card
Upon completing registration, applicants are immediately guided to join the official WhatsApp cohort group:
- **Interactive Celebration Modal (`#whatsappModal`)**:
  - **Important Badge**: `IMPORTANT — ONE MORE STEP`
  - **Pulsing WhatsApp Icon**: Animated emerald glowing badge
  - **Title**: `Join the WhatsApp group`
  - **Explanation**: `Class links, schedule changes, materials and announcements are shared only in the WhatsApp group. Your registration is not complete until you join.`
  - **Primary CTA**: `• Join the WhatsApp group` (opens `https://chat.whatsapp.com/B5gSATnSJlg6Xm800uu5ub?s=cl&p=i&mlu=4&ilr=4` in a new tab)
  - **Secondary Action**: `I'll join later` (dismisses modal and smoothly scrolls to the confirmation card)
  - **Keyboard & Backdrop dismissal**: Supports closing via `Esc` key, background click, or top-right `×` button.
- **Persistent In-Form Success Card (`#formSuccess`)**:
  - Shows green confirmation checkmark and verification notice.
  - Keeps the embedded WhatsApp group invitation banner visible permanently so applicants can still join anytime even if they dismissed the initial popup.
- **Email Privacy Protected**: The WhatsApp group URL is kept exclusively on-screen and is **strictly omitted from emails**.

---

## Instructions to Update Google Apps Script

To sync your Google Sheet with the new "Amount Sent" column:
1. Open your Google Sheet: [https://docs.google.com/spreadsheets/d/1-jPVNu1_9zuBM-4hlhocW3_qXoOSyr4q-6dVnotoSKw](https://docs.google.com/spreadsheets/d/1-jPVNu1_9zuBM-4hlhocW3_qXoOSyr4q-6dVnotoSKw)
2. Go to **Extensions → Apps Script**.
3. Replace all contents of `Code.gs` with the updated code in [`google-apps-script.gs`](file:///f:/Mustak/BRI%201.0/google-apps-script.gs).
4. In the toolbar dropdown, select **`setupSheet`** and click **▶ Run**. (This refreshes the header row to include `Amount Sent (BDT)`).
5. Click **Deploy → Manage Deployments → Edit (pencil icon) → New version → Deploy**.

