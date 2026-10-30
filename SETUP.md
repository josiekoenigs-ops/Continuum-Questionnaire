# Setting up The Continuum questionnaire

You have three files:

- **index.html** is the questionnaire page.
- **apps-script.gs** is the small program that emails each response to you.
- **SETUP.md** is this guide.

Setup takes about 20 minutes. You only need your Google account (josiekoenigs@gmail.com). Participants never sign in to anything.

## Why Google Apps Script instead of Formspree

Formspree's privacy policy says it may automatically collect visitors' IP addresses and keep log files, and I couldn't find a setting to turn that off. Its free plan also stops at 50 submissions a month.

Google Apps Script runs inside your own Google account. Google's documentation lists no IP address or account field in what the script receives, so the script can't record who sent a response. It emails you every response (up to 100 a day on a free account) and keeps a backup copy in a Google Sheet.

One honest caveat: any website still connects to Google's servers to load the Lexend font and to send the form. Google's servers see a visitor's IP address as part of that connection. It is never passed to you or stored with the answers.

---

## Part 1: Create the backend (Google Sheet and Apps Script)

1. Go to **sheets.google.com** and create a **Blank spreadsheet**. Name it something like *Continuum responses*.
2. In the menu, click **Extensions → Apps Script**. A code editor opens in a new tab.
3. Delete everything in the editor. Open **apps-script.gs** in Notepad, copy all of it, and paste it into the editor.
4. Click the **Save** icon (floppy disk). If asked, name the project *Continuum form*.
5. Give the script permission to send email:
   - At the top, find the drop-down list of functions next to **Run**. Choose **sendTestEmail**, then click **Run**.
   - Click **Review permissions** and choose your Google account.
   - You may see "Google hasn't verified this app." This is normal for a script you wrote yourself. Click **Advanced**, then **Go to Continuum form (unsafe)**, then **Allow**.
   - Check your inbox for an email called *"The Continuum: test email"*.
6. Publish the script as a web app:
   - Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - **Execute as:** *Me (josiekoenigs@gmail.com)*
   - **Who has access:** *Anyone*. This setting is important. Do **not** pick "Anyone with Google account", or participants would have to sign in.
   - Click **Deploy**, then copy the **Web app URL**. It starts with `https://script.google.com/macros/s/` and ends with `/exec`.

## Part 2: Paste the link into the questionnaire

1. Right-click **index.html → Open with → Notepad**.
2. Press **Ctrl + F** and search for `PASTE_YOUR_ENDPOINT_HERE`.
3. Replace only those words with your Web app URL, and keep the quote marks. It should look like this:

   ```
   const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfy.../exec";
   ```

4. Save the file.

## Part 3: Publish it with a free shareable link (Netlify Drop)

1. Create a new folder on your Desktop called `continuum-questionnaire`. Put only **index.html** in it.
2. Go to **app.netlify.com/drop**.
3. Drag the folder onto the page. Within a few seconds you'll get a link like `https://random-name-123.netlify.app`.
4. To keep the link working, sign up for a free Netlify account when it asks. Otherwise the site is deleted after about an hour. In **Site configuration → Change site name**, you can rename it to something like `continuum-questionnaire.netlify.app`.
5. If you change **index.html** later, open your site in Netlify, go to **Deploys**, and drag the folder in again. The link stays the same.

You need a Netlify account, but participants don't. They just open the link.

## Part 4: Send a test submission

1. Open your Netlify link, ideally on your phone as well as your computer.
2. Tick both consent boxes and type "TEST" into a couple of answers.
3. Click through to section 7 and press **Send my answers**.
4. You should see the **Thank you** screen. Within a minute or two you should get an email called *"The Continuum: new anonymous response"*. A new row should also appear in your Google Sheet.
5. Delete the test row from the Sheet before you share the link.

### If something goes wrong

- **"Your answers didn't send"** on the page: check that the link in index.html is in quote marks and ends with `/exec`. Also check that the deployment's access is set to **Anyone**.
- **The Thank you screen appears but no email arrives:** check your Spam folder. In the Apps Script editor, open **Executions** in the left sidebar to see any errors.
- **You edit apps-script.gs later:** after saving, go to **Deploy → Manage deployments**, click the pencil icon, choose **Version: New version**, and click **Deploy**. The link stays the same.

## Before you share the link

- Responses go to your inbox and your Sheet. Keep both private, and share them only with Vanessa.
- Participants' drafts are saved only in their own browser. They're cleared when the participant sends the form or clicks "Clear my saved answers". On a shared computer, the draft stays until then.
