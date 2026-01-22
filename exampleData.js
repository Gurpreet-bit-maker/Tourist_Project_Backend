const touristPlaces = [
  {
    id: 1,
    name: "Manali",
    state: "Himachal Pradesh",
    to: "Kullu",
    description: "Snow mountains, rivers and adventure sports",
    longDescription:
      "Manali ek popular hill station hai jo Himalayas me sthit hai. Yahan snow-capped mountains, Beas river aur adventure activities milti hain.",
    bestTime: "October to February",
    famousFor: ["Snowfall", "Solang Valley", "Rohtang Pass"],
    activities: ["Paragliding", "Skiing", "River Rafting"],
    avgBudget: "₹10,000 - ₹18,000 (per person)",
    howToReach: "Nearest airport Bhuntar hai. Bus aur cab easily available.",
    image: "/Tourist/manali.jpg",
  },
  {
    id: 2,
    name: "Goa",
    state: "Goa",
    to: "Goa",
    description: "Beaches, nightlife and water sports",
    longDescription:
      "Goa apni beaches, parties aur Portuguese culture ke liye famous hai. Yahan nightlife aur water sports ka best experience milta hai.",
    bestTime: "November to February",
    famousFor: ["Baga Beach", "Nightlife", "Churches"],
    activities: ["Scuba Diving", "Parasailing", "Beach Parties"],
    avgBudget: "₹12,000 - ₹20,000",
    howToReach: "Dabolim airport se easily reachable.",
    image: "/Tourist/goa.jpg",
  },
  {
    id: 3,
    name: "Jaipur",
    state: "Rajasthan",
    to: "Jaipur",
    description: "Royal palaces and pink city heritage",
    longDescription:
      "Jaipur, Rajasthan ki rajdhani, apne royal palaces, forts aur rich cultural heritage ke liye jaana jata hai. Isse Pink City bhi kaha jata hai.",
    bestTime: "October to March",
    famousFor: ["Hawa Mahal", "Amber Fort", "City Palace", "Pink City"],
    activities: [
      "Fort sightseeing",
      "Local shopping",
      "Cultural shows",
      "Street food tour",
    ],
    avgBudget: "₹8,000 - ₹15,000 (per person)",
    howToReach:
      "Jaipur International Airport aur railway station city ke andar hi located hai. Road connectivity bhi achi hai.",
    image: "/Tourist/rajasthan.jpg",
  },
  {
    id: 4,
    name: "Kashmir",
    state: "Jammu & Kashmir",
    to: "Srinagar",
    description: "Heaven on earth with valleys and lakes",
    longDescription:
      "Kashmir ko 'Heaven on Earth' kaha jata hai. Yahan ke valleys, Dal Lake, houseboats aur snow-covered mountains tourists ko attract karte hain.",
    bestTime: "March to October",
    famousFor: ["Dal Lake", "Gulmarg", "Pahalgam", "Houseboats"],
    activities: [
      "Shikara ride",
      "Skiing",
      "Snowfall experience",
      "Nature photography",
    ],
    avgBudget: "₹12,000 - ₹22,000 (per person)",
    howToReach:
      "Nearest airport Srinagar hai. Road aur cab services available hain.",

    image: "/Tourist/kashmir.jpg",
  },
  {
    id: 5,
    name: "Kerala",
    state: "Kerala",
    to: "Cochin",
    description: "Backwaters, greenery and Ayurveda",
    longDescription:
      "Kerala ko 'God’s Own Country' kaha jata hai. Yahan backwaters, lush greenery, beaches aur Ayurveda treatments world-famous hain.",
    bestTime: "September to March",
    famousFor: ["Alleppey Backwaters", "Munnar", "Varkala Beach", "Ayurveda"],
    activities: [
      "Houseboat stay",
      "Tea garden visit",
      "Ayurvedic massage",
      "Wildlife safari",
    ],
    avgBudget: "₹10,000 - ₹20,000 (per person)",
    howToReach:
      "Cochin International Airport major hub hai. Train aur road connectivity bhi strong hai.",

    image: "/Tourist/kerela.jpg",
  },
];

module.exports = touristPlaces;
