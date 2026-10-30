/**
 * The Continuum questionnaire: receives anonymous answers,
 * emails them to Josie, and keeps a backup row in this Google Sheet.
 *
 * Google Apps Script does not give this code the participant's IP address,
 * browser or Google account, so none of that can be stored or emailed.
 */
const RECIPIENT = "josiekoenigs@gmail.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Spam trap: real people never fill this hidden field.
    if (data._gotcha) return reply({ ok: true });

    const subject = data._subject || "The Continuum: new anonymous response";
    const answers = {};
    Object.keys(data).forEach(function (key) {
      if (key.charAt(0) !== "_") answers[key] = String(data[key]).slice(0, 20000);
    });
    const keys = Object.keys(answers);

    const body = keys.map(function (k) { return k + "\n" + answers[k]; }).join("\n\n");
    MailApp.sendEmail({ to: RECIPIENT, subject: subject, body: body });

    // Backup copy in the spreadsheet this script is attached to.
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(["Received"].concat(keys));
    sheet.appendRow([new Date()].concat(keys.map(function (k) { return answers[k]; })));

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Run this once from the editor to give the script permission to send email. */
function sendTestEmail() {
  MailApp.sendEmail(RECIPIENT, "The Continuum: test email", "If you can read this, the script can email you.");
}
