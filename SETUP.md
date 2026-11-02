# Klaus — one magical year

The main photo is now `assets/klaus-gryffindor.png`, an Imagegen edit of your supplied photograph. It is already connected in `config.js`. Your original photograph is unchanged. This updated copy lives in the new `Klaus 1st Birthday/outputs/klaus-invitation` folder; start any local preview server from this folder to see the new portrait.

The invitation uses Gryffindor scarlet and gold with warm parchment and charcoal. The main photo displays the full portrait without cropping or stretching, with no hat or scarf overlays. The ONE badge sits below the photo.

A responsive, static birthday invitation made with HTML, CSS and JavaScript. No package installation, paid services, backend, or build step is required.

## Preview and personalize

1. Extract the ZIP, keeping the folders together. Open `index.html` in Chrome, Edge, Firefox or Safari.
2. Open `config.js` in a text editor. Change values inside quotation marks; preserve commas and brackets.
3. Save and refresh the browser. After deployment, upload/commit the changes to redeploy.

The event date is December 5, 2026. Time, venue, address, host names, dress code, RSVP deadline and clothing size remain clearly marked placeholders. The countdown assumes `Asia/Manila` and counts calendar days, not hours, because the start time is undecided. Change `timeZone` if your event is elsewhere.

### Add the one main photo

Place your photo inside `assets/` and update:

```js
mainPhoto: "assets/klaus.jpg",
mainPhotoPosition: "50% 40%",
```

Use JPG, PNG or WebP, ideally around 1200 pixels on the longest side and under 500 KB. Paths are case-sensitive on Vercel; use forward slashes. An empty or failed photo path shows the one decorative placeholder. The gallery has been removed.

`heroImage` controls the castle artwork. `music.src` controls the audio file. If replacing the music, also update the title, artist, source and license settings with accurate credits.

## Connect Google Forms — step by step

### 1. Your form is connected

The website now embeds your form and includes a prominent fallback button:
https://forms.gle/Zznj42HYQdYT46hS8

The short link resolves to the published Google Forms responder URL, which is already set in `config.js`. No API key is needed.

**Observed on November 2, 2026:** The form now displays its questions and Submit button while signed out, both directly and in the embedded view. No response was submitted. The form's own title still says “Gabriel Klaus' 1st Birthday”; change it in Google Forms if you want it to say only Klaus there too. The website's displayed name is Klaus throughout.

### 2. Check responder settings

- Publish the form and choose the responder access appropriate for your guests. For guests to reply without signing in, allow anyone with the link, if your account permits it.
- Keep **Limit to 1 response** off if you do not want Google sign-in required. Avoid file-upload questions for this simple RSVP.
- Keep **View results summary** off so guests do not see other guests' answers.
- Add a confirmation message, for example: “Thank you! Your owl has arrived. We can't wait to celebrate Klaus's magical first birthday with you.”
- Optionally connect the Responses tab to Google Sheets for your guest list. Keep the responses spreadsheet private.

### 3. If you replace the form later

1. Copy the published **responder link**. It normally ends in `/viewform`, or uses `forms.gle`. This goes in `rsvp.formUrl`.
2. In the form editor, open **More (⋮) → Embed HTML**. Copy the embed code.
3. Find the URL between `src="` and the next `"`. Paste **only that URL** into `rsvp.embedUrl`. Do not paste the entire iframe tag or the editor URL ending in `/edit`.

Your settings will look like this (replace the example ID with your real one):

```js
rsvp: {
  formUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform",
  embedUrl: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true",
  height: 1050
},
```

The website displays the embedded form and the fallback link. If both URL fields are cleared, it shows “Owl post opens soon”. If only the responder link is supplied, guests can use that link. If only the embed URL is supplied, the fallback link is derived from it.

### 4. Test a real RSVP

Refresh the website, open the invitation and go to RSVP. Test in a private/incognito browser window while signed out of Google. Submit one test RSVP and verify it appears in the form's Responses tab. Also test the fallback link and a phone-sized screen. Increase `rsvp.height` if the bottom of the form needs more space.

Google hosts and controls the form inside the frame, so the outer invitation cannot fully restyle its fields or detect a successful submission. The form's own confirmation message is the success confirmation. No Google password, API key or Apps Script is needed.

Official reference: [Publish and share your form with responders](https://support.google.com/docs/answer/2839588?hl=en).

## Deploy free on Vercel

Use a personal **Hobby** account. This plan supports personal, non-commercial projects within its limits.

1. Create a GitHub repository and upload the contents of `gabriel-invitation/`, including `assets/`. `index.html` should be at the repository root. A private repository is fine.
2. Sign in to Vercel and select **Add New → Project**. Import that repository.
3. Set **Framework Preset: Other**.
4. Select the folder containing `index.html` as **Root Directory** (leave the default if the files are at the repository root).
5. Leave **Build Command** empty (enable its override if needed). There are no dependencies to install.
6. Use the project root as the output directory (`.`), or the default root behavior for the Other preset. Do not enter `dist`—there is no build output folder.
7. Deploy. Vercel provides a `.vercel.app` address that you can share.
8. Test the deployed link on your phone, music, images, RSVP submission and fallback link. Check that guests can open the production link without needing your Vercel account.

Future edits: update `config.js` or assets in the connected repository, commit, and Vercel deploys the update automatically.

Official references: [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build), [deployment overview](https://vercel.com/docs/deployments), [Hobby plan](https://vercel.com/docs/plans/hobby).

## Before sharing

- Replace every bracketed placeholder in `config.js`.
- Add Klaus's photos, venue and map URL; confirm the time zone.
- Connect and test the real Google Form.
- Keep the music attribution in the footer while using the bundled music.

The invitation asks search engines not to index it. This is not password protection: anyone with the deployed URL can view its content and photos. No tracking, cookies, or RSVP database is added to this site. Google Fonts and an enabled Google Form make requests to Google's services.

## Design and audio

The opening cover and section sequence were inspired by the supplied [Little Moments safari invitation](https://littlemoments.digital/safari). The code, layout treatment, castle, owl and decorative vectors were created for this project; reference-site artwork was not copied. The image-generation service rejected the attempted raster illustration, so the finished art is editable SVG.

Music: **Fairytale Waltz**, Kevin MacLeod (incompetech.com). **Creative Commons Attribution 4.0**. This is a magical celesta-led instrumental, not a Harry Potter film recording. The unmodified MP3 is bundled locally and repeats during playback. Music begins only after a guest chooses the musical opening or presses the music control; a silent opening is available.

Track: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100232

License: https://creativecommons.org/licenses/by/4.0/

Official browser guidance: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay

## Validation

Checked in a desktop browser and at phone viewport widths of 390 and 320 pixels: opening flow, section navigation, audio playback/pause, no horizontal overflow, and no reported console errors. All bundled artwork loaded. Audio decoded successfully at approximately 99 seconds.

With Node.js installed, run `node tests/verify.cjs` for regression checks covering the rendering/configuration logic, day countdown across Manila midnight, silent/audio opening, form URL validation and fallback links, and single-photo/missing-image behavior. These use a small DOM test double; they do not submit a live Google Form. A real RSVP submission and the Vercel-hosted page still need verification after the site is deployed.


## Upload your matching Google Forms banner

Use `assets/klaus-forms-banner.png` (1600 × 400 pixels). A separate copy named `klaus-google-forms-banner.png` is supplied outside the website folder. The editable SVG artwork is included too.

1. Open your form in the Google Forms editor.
2. Click **Customize theme** (the palette icon).
3. Under **Header**, click **Choose image → Upload**, choose the PNG and confirm the crop.
4. Select a scarlet theme color (`#8c1c2d`) and a light cream background if desired.

Google Forms uses a header image plus background colors; this PNG is designed for the header, not a full-page wallpaper. The website cannot change the appearance of Google's embedded content, so upload it in the form editor.

Official instructions: https://support.google.com/docs/answer/145737

## Added wizarding details

Original illustrations: Platform 9¾ sign, steam train, potions, wand, wizard hat, burgundy-and-gold scarf, chocolate frog and golden winged ball. Short, gentle animations include steam, bubbles, wand sparkles and hovering. Animations stop after a few repetitions and respect reduced-motion preferences. Train, potion and frog animations begin when their sections enter the screen.

The banner was created as original vector artwork and exported to PNG. The main portrait is an AI-assisted edit of your supplied photograph.
