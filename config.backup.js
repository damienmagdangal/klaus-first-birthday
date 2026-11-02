/* EDIT THIS FILE to personalize the invitation. Keep quotation marks around text.
   Paths are relative to index.html. Blank photo paths show illustrated placeholders.
   See SETUP.md for Google Forms, photos, music and Vercel instructions. */
window.INVITATION = {
  celebrant: "Klaus",
  shortName: "Klaus",
  age: "ONE",
  date: "2026-12-05", // YYYY-MM-DD
  timeZone: "Asia/Manila", // Assumed for the day countdown; change if needed.
  time: "[Celebration time]",
  venue: "[Venue name]",
  address: "[Full venue address]",
  mapsUrl: "", // Paste your Google Maps share link here.
  hosts: "Dana & Damien",
  dressCode: "Scarlet (Red), Beige, White, Emerald (Green)",
  rsvpDeadline: "November 28, 2026",
  welcome: "A little magic. A whole lot of love.",
  introduction: "Our little wizard is turning one! Join us for a spellbinding celebration of first giggles, tiny adventures, and a whole year of wonderful memories.",
  heroImage: "assets/castle.svg",
  mainPhoto: "", // Example: "assets/klaus.jpg"
  mainPhotoPosition: "50% 50%", // Adjust crop: horizontal% vertical%.
  program: [
    { icon: "stars", title: "Fun games", description: "Little adventures, big smiles." },
    { icon: "claw", title: "Claw machine", description: "A little luck. A lovely surprise." },
    { icon: "wand", title: "Magician", description: "A spellbinding show for everyone." },
    { icon: "palette", title: "Face paint", description: "Become something magical." }
  ],
  giftMessage: "Your presence is our favorite present. If you would like to bring a little something, here are a few ideas for our growing wizard.",
  gifts: [
    { icon: "envelope", title: "Monetary gifts", description: "For little dreams and future adventures." },
    { icon: "book", title: "Educational toys", description: "For a curious mind and busy little hands." },
    { icon: "shirt", title: "Clothes", description: "[Add preferred clothing size here]" }
  ],
  rsvp: {
    formUrl: "https://forms.gle/Zznj42HYQdYT46hS8", // Published responder link: https://docs.google.com/forms/d/e/.../viewform (or forms.gle link)
    embedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfs7RH9dTI2L433g-VIlR3LNZpbmFDALviKATL0zfGZuEg9gQ/viewform?embedded=true", // ONLY the src URL from Google's Embed HTML, not the whole <iframe> tag.
    height: 1050 // Adjust after checking your finished form on a phone.
  },
  music: {
    src: "assets/fairytale-waltz.mp3",
    volume: 1.0,
    title: "Fairytale Waltz",
    artist: "Kevin MacLeod",
    sourceUrl: "https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100232",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/"
  }
};
