// ===========================================
// data.js - Affiliate content & categories
// Items organized by category ID
// All external links use openExternal (applied in script.js)
// ===========================================

// Categories metadata (enhanced from categories.json, used in list.html)
window.categoriesList = [
  { id: "action", name: "Action", emoji: "⚡", description: "High-octane movies & thrilling fight scenes" },
  { id: "romance", name: "Romance", emoji: "💖", description: "Heartfelt love stories and romantic dramas" },
  { id: "thriller", name: "Thriller", emoji: "🔪", description: "Suspenseful, psychological, edge-of-seat content" },
  { id: "comedy", name: "Comedy", emoji: "😂", description: "Laughter guaranteed, sitcoms & standup specials" },
  { id: "drama", name: "Drama", emoji: "🎭", description: "Powerful narratives and emotional journeys" },
  { id: "scifi", name: "Sci-Fi", emoji: "🛸", description: "Futuristic worlds, aliens, and advanced tech" },
  { id: "horror", name: "Horror", emoji: "👻", description: "Terrifying tales and supernatural suspense" },
  { id: "crime", name: "Crime", emoji: "🚔", description: "Gangsters, detectives, and heist thrillers" },
  { id: "anime", name: "Anime", emoji: "🇯🇵", description: "Japanese animation, epic series & movies" },
  { id: "bollywood", name: "Bollywood", emoji: "🎬", description: "Hindi blockbusters and exclusive stories" }
];

// Items database - each category has array of { title, description, link }
window.itemsByCategory = {
  action: [
    { title: "Fury Road: Wasteland", description: "Non-stop car chases and explosions", link: "https://candylink69.vercel.app/action1" },
    { title: "Shadow Strike", description: "Elite agent vs terrorist organization", link: "https://candylink69.vercel.app/action2" },
    { title: "Last Warrior", description: "Epic martial arts masterpiece", link: "https://candylink69.vercel.app/action3" },
    { title: "Sniper: Ghost Protocol", description: "Tactical military thriller", link: "https://candylink69.vercel.app/action4" }
  ],
  romance: [
    { title: "Midnight in Paris", description: "Timeless romantic journey", link: "https://candylink69.vercel.app/romance1" },
    { title: "Love & Forever", description: "Soulmates across continents", link: "https://candylink69.vercel.app/romance2" },
    { title: "The Last Letter", description: "Heartwarming emotional drama", link: "https://candylink69.vercel.app/romance3" },
    { title: "Sunset Vows", description: "Second chance romance", link: "https://candylink69.vercel.app/romance4" }
  ],
  thriller: [
    { title: "The Silent Witness", description: "Psychological mind-bender", link: "https://candylink69.vercel.app/thriller1" },
    { title: "Deep Water", description: "Secrets beneath the surface", link: "https://candylink69.vercel.app/thriller2" },
    { title: "Hunted", description: "Cat and mouse suspense", link: "https://candylink69.vercel.app/thriller3" },
    { title: "Fractured Memory", description: "Amnesia thriller with twists", link: "https://candylink69.vercel.app/thriller4" }
  ],
  comedy: [
    { title: "Office Bizarre", description: "Crazy workplace shenanigans", link: "https://candylink69.vercel.app/comedy1" },
    { title: "Family Vacation", description: "Road trip gone wild", link: "https://candylink69.vercel.app/comedy2" },
    { title: "Standup Kings", description: "Best comedy special", link: "https://candylink69.vercel.app/comedy3" },
    { title: "Neighbors from Hell", description: "Laugh-out-loud sitcom", link: "https://candylink69.vercel.app/comedy4" }
  ],
  drama: [
    { title: "The Broken Shore", description: "Family tragedy and redemption", link: "https://candylink69.vercel.app/drama1" },
    { title: "Silent Roar", description: "Coming of age masterpiece", link: "https://candylink69.vercel.app/drama2" },
    { title: "A Mother's Prayer", description: "Emotional award-winner", link: "https://candylink69.vercel.app/drama3" },
    { title: "City of Dreams", description: "Struggle and ambition", link: "https://candylink69.vercel.app/drama4" }
  ],
  scifi: [
    { title: "Galaxy Uprising", description: "Interstellar rebellion", link: "https://candylink69.vercel.app/scifi1" },
    { title: "AI Chronicles", description: "Conscious machines and ethics", link: "https://candylink69.vercel.app/scifi2" },
    { title: "Time Drift", description: "Mind-bending time travel", link: "https://candylink69.vercel.app/scifi3" },
    { title: "Alien Code", description: "First contact thriller", link: "https://candylink69.vercel.app/scifi4" }
  ],
  horror: [
    { title: "Midnight Ritual", description: "Supernatural terror", link: "https://candylink69.vercel.app/horror1" },
    { title: "The Hollow", description: "Forest of nightmares", link: "https://candylink69.vercel.app/horror2" },
    { title: "Possession", description: "Demonic haunting", link: "https://candylink69.vercel.app/horror3" },
    { title: "Fear Clinic", description: "Psychological horror", link: "https://candylink69.vercel.app/horror4" }
  ],
  crime: [
    { title: "Kingpin", description: "Underworld empire", link: "https://candylink69.vercel.app/crime1" },
    { title: "Detective Noir", description: "Gritty murder mystery", link: "https://candylink69.vercel.app/crime2" },
    { title: "Heist Masters", description: "Perfect robbery gone wrong", link: "https://candylink69.vercel.app/crime3" },
    { title: "Gangland Justice", description: "Corruption and loyalty", link: "https://candylink69.vercel.app/crime4" }
  ],
  anime: [
    { title: "Samurai Eclipse", description: "Epic feudal Japan action", link: "https://candylink69.vercel.app/anime1" },
    { title: "Cyberpunk 2099", description: "Neo-Tokyo rebellion", link: "https://candylink69.vercel.app/anime2" },
    { title: "Soul Reaper", description: "Supernatural battle shonen", link: "https://candylink69.vercel.app/anime3" },
    { title: "Mecha Storm", description: "Giant robot warfare", link: "https://candylink69.vercel.app/anime4" }
  ],
  bollywood: [
    { title: "Dil Ki Raah", description: "Exclusive Hindi romantic saga", link: "https://antarvasana69.vercel.app/story1" },
    { title: "Sherni", description: "Powerful woman-led thriller", link: "https://antarvasana69.vercel.app/story2" },
    { title: "Ishq Mubarak", description: "Heartfelt family drama", link: "https://antarvasana69.vercel.app/story3" },
    { title: "Mumbai Undercover", description: "Gritty crime in Hindi", link: "https://antarvasana69.vercel.app/story4" },
    { title: "Prem Kahani", description: "Classic Bollywood romance", link: "https://antarvasana69.vercel.app/story5" }
  ]
};

// For any category that might be missing, ensure empty array fallback
const allCategoryIds = window.categoriesList.map(c => c.id);
allCategoryIds.forEach(catId => {
  if (!window.itemsByCategory[catId]) {
    window.itemsByCategory[catId] = [];
  }
});
