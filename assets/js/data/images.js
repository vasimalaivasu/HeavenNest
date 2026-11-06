/**
 * HavenNest Lodge & Budget Hotel - Image Registry
 * Centralized, high-resolution, realistic hotel & lodge photography configuration.
 * All images are curated from Unsplash with appropriate realistic budget lodge aesthetics.
 * Buyers can effortlessly replace URLs with local assets here.
 */

const HOTEL_IMAGES = {
  // Brand & Favicon
  brand: {
    logoIcon: "assets/images/logo-icon.svg",
    favicon: "assets/images/favicon.svg"
  },

  // Property Exterior & Spaces
  property: {
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80",
    heroAlt: "HavenNest Lodge entrance and welcoming lobby facade",
    exteriorNight: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    reception: "assets/images/property/reception.jpg",
    receptionAlt: "24/7 Front desk with friendly reception staff",
    lobby: "assets/images/property/lobby.jpg",
    lobbyAlt: "Clean, comfortable waiting lounge with sofas",
    dining: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    diningAlt: "Lodge breakfast dining room with warm seating",
    corridor: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    corridorAlt: "Bright, sanitized corridor and room entrances",
    parking: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
    parkingAlt: "Secure covered on-site vehicle parking"
  },

  // Rooms Photography (Clean, honest, realistic)
  rooms: {
    economySingle: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    economySingleGallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
    ],
    standardDouble: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    standardDoubleGallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    deluxeDouble: "assets/images/rooms/deluxe-double.jpg",
    deluxeDoubleGallery: [
      "assets/images/rooms/deluxe-double.jpg",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    budgetTwin: "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?auto=format&fit=crop&w=1000&q=80",
    budgetTwinGallery: [
      "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    familyRoom: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    familyRoomGallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    dormitoryBed: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    dormitoryBedGallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    femaleDormPod: "assets/images/rooms/female-dorm-pod.jpg",
    femaleDormPodGallery: [
      "assets/images/rooms/female-dorm-pod.jpg",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    tripleSharing: "assets/images/rooms/triple-sharing.jpg",
    tripleSharingGallery: [
      "assets/images/rooms/triple-sharing.jpg",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    deluxeTriple: "assets/images/rooms/deluxe-triple.jpg",
    deluxeTripleGallery: [
      "assets/images/rooms/deluxe-triple.jpg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    executiveSuite: "assets/images/rooms/executive-king.jpg",
    executiveSuiteGallery: [
      "assets/images/rooms/executive-king.jpg",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    cleanBathroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
  },

  // Amenities & Stay Inclusions
  amenities: {
    sealedWater: "assets/images/amenities/sealed-water.jpg"
  },

  // Gallery Highlights (Filtered Lightbox)
  gallery: [
    {
      id: "gal-1",
      category: "rooms",
      title: "Deluxe Double Room",
      caption: "Spacious room with air conditioning, premium linen & natural sunlight",
      url: "assets/images/rooms/deluxe-double.jpg",
      thumb: "assets/images/rooms/deluxe-double.jpg"
    },
    {
      id: "gal-2",
      category: "reception",
      title: "24/7 Reception & Helpdesk",
      caption: "Express check-in and friendly local transit guidance",
      url: "assets/images/property/reception.jpg",
      thumb: "assets/images/property/reception.jpg"
    },
    {
      id: "gal-3",
      category: "rooms",
      title: "Standard Double Room",
      caption: "Perfect for couples and business travelers seeking quiet comfort",
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gal-4",
      category: "dining",
      title: "Breakfast & Dining Area",
      caption: "Freshly brewed morning tea, hot vegetarian breakfast & refreshments",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gal-5",
      category: "bathrooms",
      title: "Sanitized Ensuite Bathroom",
      caption: "Hot water geyser, fresh sanitized towels & toiletries provided",
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gal-6",
      category: "dining",
      title: "Morning Coffee & Dining Hall",
      caption: "Freshly brewed morning tea, hot breakfast, and casual seating for guests",
      url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gal-7",
      category: "rooms",
      title: "Family Quad Room",
      caption: "Two large beds comfortably accommodating up to 4 family members",
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      thumb: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "gal-8",
      category: "reception",
      title: "Comfortable Guest Waiting Lounge",
      caption: "Welcoming lobby lounge adjacent to reception with cushioned seating and daily newspapers",
      url: "assets/images/property/lobby.jpg",
      thumb: "assets/images/property/lobby.jpg"
    }
  ],

  // Testimonial Avatars
  testimonials: [
    {
      name: "Rajesh & Priya Sharma",
      location: "Bengaluru, India",
      role: "Family Holiday",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      date: "Stayed March 2026",
      text: "Remarkably clean room and very peaceful stay near the railway station. The staff helped us with an early check-in without fuss. Best value lodge in the city!"
    },
    {
      name: "David Miller",
      location: "Melbourne, Australia",
      role: "Solo Backpacker",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      date: "Stayed February 2026",
      text: "The Wi-Fi was fast, hot water worked instantly, and the front desk gave great bus directions. Honest pricing with zero hidden surcharges. Highly recommended!"
    },
    {
      name: "Ananya Deshmukh",
      location: "Pune, India",
      role: "Transit Business Trip",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      date: "Stayed April 2026",
      text: "Safe, well-lit corridors, crisp clean bedsheets, and super friendly reception. Booking enquiry was answered on WhatsApp within 10 minutes."
    },
    {
      name: "Suresh Menon",
      location: "Chennai, India",
      role: "Group Pilgrimage",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      date: "Stayed January 2026",
      text: "We booked 3 rooms for our family. Spacious parking, doctor on call when my father felt unwell, and great home-cooked breakfast nearby. 10/10."
    }
  ],

  // Transit & Nearby Locations
  nearby: [
    { name: "Central Railway Station", distance: "1.2 km", time: "5 mins drive / 15 mins walk", type: "transit" },
    { name: "Interstate Main Bus Stand", distance: "2.0 km", time: "8 mins drive", type: "transit" },
    { name: "Historic City Market & Bazaar", distance: "800 m", time: "3 mins walk", type: "attraction" },
    { name: "Heritage Landmark & Temple", distance: "1.5 km", time: "6 mins drive", type: "attraction" },
    { name: "City Government General Hospital", distance: "1.8 km", time: "7 mins drive", type: "emergency" },
    { name: "Domestic / International Airport", distance: "14.5 km", time: "25-30 mins drive", type: "transit" }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = HOTEL_IMAGES;
}
