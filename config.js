/* EDIT THIS FILE to personalize the invitation. Keep quotation marks around text.
   Paths are relative to index.html. Blank photo paths show illustrated placeholders.
   See SETUP.md for Google Forms, photos, music and Vercel instructions. */
window.INVITATION = {
  celebrant: "Klaus",
  shortName: "Klaus",
  age: "ONE",
  date: "2026-12-05", // YYYY-MM-DD
  timeZone: "Asia/Manila", // Assumed for the day countdown; change if needed.
  time: "4PM",
  venue: "Jollibee Sheridan",
  address: "7 Pioneer Corner Sheridan Street, Mandaluyong City, Metro Manila",
  mapsUrl: "https://ul.waze.com/ul?venue_id=79364242.793314737.22579165&overview=yes&utm_campaign=live_map&utm_source=waze_website&utm_medium=lm_share_location", // Paste your Google Maps share link here.
  hosts: "Dana & Damien",
  dressCode: "Scarlet (Red), Beige, White, Emerald (Green)",
  rsvpDeadline: "November 28, 2026",
  welcome: "A little magic. A whole lot of love.",
  introduction: "Our little wizard is turning one! Join us for a spellbinding celebration of first giggles, tiny adventures, and a whole year of wonderful memories.",
  heroImage: "assets/castle.svg?v=gryffindor-2",
  mainPhoto: "assets/klaus-gryffindor.png", // Edited Gryffindor portrait of Klaus.
  mainPhotoPosition: "50% 50%", // Adjust crop: horizontal% vertical%.
  program: [
    { icon: "stars", title: "Fun games", description: "Little adventures, big smiles." },
    { icon: "claw", title: "Claw machine", description: "A little luck. A lovely surprise." },
    { icon: "wand", title: "Giveaways", description: "Treats for everyone." },
    { icon: "palette", title: "Face paint", description: "Become something magical." }
  ],
  giftMessage: "Your presence is our favorite present. If you would like to bring a little something, here are a few ideas for our growing wizard.",
  gifts: [
    { icon: "envelope", title: "Monetary gifts", description: "For little dreams and future adventures." },
    { icon: "book", title: "Educational toys", description: "For a curious mind and busy little hands." },
    { icon: "shirt", title: "Clothes", description: "For 1 - 2 years old" }
  ],
  rsvp: {
    formUrl: "https://forms.gle/Zznj42HYQdYT46hS8", // Published responder link: https://docs.google.com/forms/d/e/.../viewform (or forms.gle link)
    embedUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfs7RH9dTI2L433g-VIlR3LNZpbmFDALviKATL0zfGZuEg9gQ/viewform?embedded=true", // ONLY the src URL from Google's Embed HTML, not the whole <iframe> tag.
    height: 1050 // Adjust after checking your finished form on a phone.
  },
  music: {
    src: "assets/fairytale-waltz.mp3",
    volume: 0.8,
    title: "Harry Potter Theme"
  }
};
