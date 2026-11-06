/**
 * HavenNest Lodge & Budget Hotel - Rooms & Tariff Master Database
 * Comprehensive configuration for all 12 room categories with specs, tariffs, amenities, food benefits, and policies.
 */

const ROOMS_DATA = [
  {
    "id": "economy-single",
    "slug": "economy-single",
    "name": "Economy Single Room",
    "category": "standard",
    "acType": "non-ac",
    "badge": "Solo Travel Favorite",
    "badgeType": "neutral",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 24,
    "startingPriceINR": 1399,
    "weekdayRate": 24,
    "weekdayRateINR": 1399,
    "weekendRate": 28,
    "weekendRateINR": 1599,
    "extraPersonRate": 8,
    "extraPersonRateINR": 450,
    "extraBedRate": 10,
    "extraBedRateINR": 550,
    "capacity": 1,
    "maxCapacity": 1,
    "bedType": "1 Cosy Single Bed",
    "roomSize": "140 sq.ft (13 m²)",
    "floor": "1st & 2nd Floor",
    "shortDesc": "A spotless, budget-friendly private haven designed specifically for solo travelers and quick transit stays.",
    "fullDesc": "Designed with solo travelers, transit passengers, and students in mind, our Economy Single Room guarantees a restful night's sleep without paying for empty space. Features clean crisp bed linen, high-speed Wi-Fi, power outlets near the bed, a compact study/work corner, and an attached sanitized bathroom with 24/7 hot geyser water.",
    "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Free High-Speed Wi-Fi",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Sanitized Ensuite Bathroom",
        "icon": "bath",
        "free": true
      },
      {
        "name": "24/7 Geyser Hot Water",
        "icon": "water",
        "free": true
      },
      {
        "name": "Silent Ceiling Fan & Ventilation",
        "icon": "fan",
        "free": true
      },
      {
        "name": "Power Backup (Lighting & Fan)",
        "icon": "bolt",
        "free": true
      },
      {
        "name": "Daily Housekeeping",
        "icon": "broom",
        "free": true
      },
      {
        "name": "Fresh Towels & Soap Kit",
        "icon": "towel",
        "free": true
      },
      {
        "name": "Luggage Rack & Wardrobe",
        "icon": "closet",
        "free": true
      }
    ],
    "inclusions": [
      "Complimentary high-speed Wi-Fi access",
      "Fresh sanitized linen, pillows & fleece blanket",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "24-hour hot water in attached bathroom",
      "Complimentary packaged drinking water bottle",
      "Daily room cleaning service"
    ],
    "exclusions": [
      "Air Conditioning (Ceiling fan equipped)",
      "Breakfast (Available as add-on for $3 / ₹150)",
      "Late check-out after 12:00 PM without prior request"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Government-issued photo ID required at check-in",
      "Strictly non-smoking room",
      "Visitors permitted in lobby area only"
    ],
    "foodBenefits": [
      "Complimentary morning filter coffee or ginger chai delivered to your room (6:30 AM – 9:00 AM)",
      "Complimentary sealed packaged mineral water bottle daily + unlimited pure RO water refills on your floor",
      "Hot homestyle breakfast add-on ($3 / ₹150) featuring Idli-Vada-Sambar, Poha, Aloo Paratha, or Eggs & Toast",
      "Outside food welcome: Free dining plates, bowls, cutlery, and microwave reheating in common dining hall",
      "24/7 late-night room service menu (hot noodles, sandwiches, tea, biscuits, and bottled beverages)"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (soft microfiber or firm contour) delivered free on request",
      "Complimentary extra warm fleece blanket or thick winter quilt on demand from housekeeping",
      "Sanitized personal dental kit (toothbrush + herbal toothpaste) and fresh bathing soap kit on request",
      "Steam iron and fold-out ironing board delivered to room on request (zero extra fee)",
      "Daily fresh towel replacement and sanitized cotton bedsheets with hospital-grade hygiene",
      "Complimentary secure luggage cloakroom holding before check-in and after check-out"
    ]
  },
  {
    "id": "standard-double",
    "slug": "standard-double",
    "name": "Standard Double Room",
    "category": "standard",
    "acType": "ac",
    "badge": "Best Value",
    "badgeType": "best-value",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 32,
    "startingPriceINR": 1899,
    "weekdayRate": 32,
    "weekdayRateINR": 1899,
    "weekendRate": 36,
    "weekendRateINR": 2099,
    "extraPersonRate": 8,
    "extraPersonRateINR": 450,
    "extraBedRate": 10,
    "extraBedRateINR": 600,
    "capacity": 2,
    "maxCapacity": 3,
    "bedType": "1 Queen Size Bed",
    "roomSize": "190 sq.ft (18 m²)",
    "floor": "1st, 2nd & 3rd Floor",
    "shortDesc": "Our most popular choice for couples and traveling duos. Air-conditioned, quiet, and exceptionally clean.",
    "fullDesc": "The Standard Double Room offers the ideal blend of budget-friendly pricing and everyday comfort. Fitted with a silent energy-efficient air conditioner, plush queen mattress, blackout curtains, LED television with cable channels, and an immaculately maintained bathroom. Perfect for couples or business colleagues seeking peace after a busy day.",
    "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Split Air Conditioner",
        "icon": "snow",
        "free": true
      },
      {
        "name": "Free High-Speed Wi-Fi",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "32-inch LED TV (Cable Channels)",
        "icon": "tv",
        "free": true
      },
      {
        "name": "Sanitized Ensuite Bathroom",
        "icon": "bath",
        "free": true
      },
      {
        "name": "24/7 Hot Water Geyser",
        "icon": "water",
        "free": true
      },
      {
        "name": "Full Power Backup Generator",
        "icon": "bolt",
        "free": true
      },
      {
        "name": "Telephone for Room Service",
        "icon": "phone",
        "free": true
      },
      {
        "name": "Free On-Site Vehicle Parking",
        "icon": "parking",
        "free": true
      }
    ],
    "inclusions": [
      "Full Air-Conditioning & Power Backup",
      "High-speed Wi-Fi (up to 50 Mbps)",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Daily fresh linen & towel change",
      "Complimentary morning newspaper in lobby",
      "Complimentary 2 water bottles daily"
    ],
    "exclusions": [
      "Laundry / Dry cleaning (Available on paid request)",
      "Extra bed mattress ($10 / ₹600 per night)"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Original ID cards mandatory for both adult guests",
      "No alcohol consumption in corridors/public spaces",
      "Quiet hours observed between 10:30 PM - 06:00 AM"
    ],
    "foodBenefits": [
      "Complimentary morning filter coffee or ginger chai delivered to your room (6:30 AM – 9:00 AM)",
      "Complimentary sealed packaged mineral water bottle daily + unlimited pure RO water refills on your floor",
      "Hot homestyle breakfast add-on ($3 / ₹150) featuring Idli-Vada-Sambar, Poha, Aloo Paratha, or Eggs & Toast",
      "Outside food welcome: Free dining plates, bowls, cutlery, and microwave reheating in common dining hall",
      "24/7 late-night room service menu (hot noodles, sandwiches, tea, biscuits, and bottled beverages)"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (soft microfiber or firm contour) delivered free on request",
      "Complimentary extra warm fleece blanket or thick winter quilt on demand from housekeeping",
      "Sanitized personal dental kit (toothbrush + herbal toothpaste) and fresh bathing soap kit on request",
      "Steam iron and fold-out ironing board delivered to room on request (zero extra fee)",
      "Daily fresh towel replacement and sanitized cotton bedsheets with hospital-grade hygiene",
      "Complimentary secure luggage cloakroom holding before check-in and after check-out"
    ]
  },
  {
    "id": "deluxe-double",
    "slug": "deluxe-double",
    "name": "Deluxe Double Room",
    "category": "deluxe",
    "acType": "ac",
    "badge": "Top Rated",
    "badgeType": "best-value",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 39,
    "startingPriceINR": 2399,
    "weekdayRate": 39,
    "weekdayRateINR": 2399,
    "weekendRate": 45,
    "weekendRateINR": 2699,
    "extraPersonRate": 9,
    "extraPersonRateINR": 500,
    "extraBedRate": 12,
    "extraBedRateINR": 700,
    "capacity": 2,
    "maxCapacity": 3,
    "bedType": "1 King Size Bed + Sitting Area",
    "roomSize": "240 sq.ft (22 m²)",
    "floor": "2nd & 3rd Floor (Elevator Access)",
    "shortDesc": "Extra spacious room featuring a private balcony, workstation, tea kettle, and enhanced hotel amenities.",
    "fullDesc": "Step into our upgraded Deluxe Double Room with generous floor space, warm timber accents, an electric kettle with tea/coffee supplies, and large French windows opening to a private balcony. Designed for extended stays, working professionals, and travelers who appreciate extra breathing room without luxury price tags.",
    "image": "assets/images/rooms/deluxe-double.jpg",
    "gallery": [
      "assets/images/rooms/deluxe-double.jpg",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Climate Control AC",
        "icon": "snow",
        "free": true
      },
      {
        "name": "Private Balcony with Seating",
        "icon": "sun",
        "free": true
      },
      {
        "name": "Electric Kettle & Tea/Coffee Kits",
        "icon": "coffee",
        "free": true
      },
      {
        "name": "40-inch Smart LED TV",
        "icon": "tv",
        "free": true
      },
      {
        "name": "Dedicated Work Desk & Ergonomic Chair",
        "icon": "desk",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi (100 Mbps)",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Deluxe Toiletries & Shower Gel",
        "icon": "bath",
        "free": true
      },
      {
        "name": "Mini Wardrobe with Digital Safe",
        "icon": "shield",
        "free": true
      }
    ],
    "inclusions": [
      "Unlimited fast Wi-Fi and smart streaming on TV",
      "Electric kettle with complimentary tea bags & coffee",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Hot water 24/7 with premium soap & dental kit",
      "Private balcony access",
      "Free covered parking slot"
    ],
    "exclusions": [
      "Breakfast buffet (Add-on $3.50 / ₹180)",
      "Airport / Station drop taxi (Can be booked at travel desk)"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Valid government photo ID required",
      "Balcony doors must be latched when leaving room",
      "Eco-friendly linen reuse program supported"
    ],
    "foodBenefits": [
      "In-room electric kettle with daily complimentary tea bags, premium coffee sachets, creamer & sugar",
      "Complimentary morning fresh filter coffee or herbal tea door delivery (6:30 AM – 9:30 AM)",
      "2 Complimentary sealed 1-litre packaged mineral water bottles daily + unlimited 24/7 RO station access",
      "Hot homestyle breakfast add-on ($3 / ₹150) freshly prepared with regional & continental choices",
      "Outside food friendly: Complimentary porcelain crockery, cutlery set & microwave reheating assistance",
      "24/7 room service & late-night snack counter with prompt 15-minute door delivery"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (choice of soft microfiber or orthopedic neck contour) on request",
      "Complimentary extra heavy fleece blanket or warm winter quilt delivered anytime by housekeeping",
      "Deluxe personal toiletry kit with dental kit, herbal shampoo, body wash, and fresh bath sheets",
      "In-room wardrobe with digital locker, clothes hangers, and steam iron/board on request",
      "Daily comprehensive housekeeping with complete linen turnaround and evening turndown",
      "Complimentary early luggage drop, express assistance, and guaranteed wake-up call ring"
    ]
  },
  {
    "id": "budget-twin",
    "slug": "budget-twin",
    "name": "Budget Twin Room",
    "category": "standard",
    "acType": "ac",
    "badge": "Colleague & Friend Choice",
    "badgeType": "neutral",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 30,
    "startingPriceINR": 1799,
    "weekdayRate": 30,
    "weekdayRateINR": 1799,
    "weekendRate": 34,
    "weekendRateINR": 1999,
    "extraPersonRate": 8,
    "extraPersonRateINR": 450,
    "extraBedRate": 10,
    "extraBedRateINR": 600,
    "capacity": 2,
    "maxCapacity": 2,
    "bedType": "2 Separate Single Beds",
    "roomSize": "185 sq.ft (17 m²)",
    "floor": "1st & 2nd Floor",
    "shortDesc": "Two separate single beds ideal for friends, colleagues, or siblings traveling together.",
    "fullDesc": "Need individual beds without paying for two separate rooms? Our Budget Twin Room provides two separate cosy single beds with individual bedside reading lights and power sockets. Equipped with AC, TV, Wi-Fi, and a spotless attached bathroom.",
    "image": "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1648383228240-6ed939727ad6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Energy-Saver Air Conditioner",
        "icon": "snow",
        "free": true
      },
      {
        "name": "2 Separate Comfy Beds",
        "icon": "bed",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Attached Sanitized Bathroom",
        "icon": "bath",
        "free": true
      },
      {
        "name": "LED Television",
        "icon": "tv",
        "free": true
      },
      {
        "name": "Dual Bedside Power Ports",
        "icon": "bolt",
        "free": true
      },
      {
        "name": "Luggage Bench & Hangers",
        "icon": "closet",
        "free": true
      },
      {
        "name": "24/7 Front Desk Assistance",
        "icon": "headset",
        "free": true
      }
    ],
    "inclusions": [
      "2 separate single beds with fresh sanitized linen",
      "24/7 instant hot water shower",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Daily room service & trash clearing",
      "High-speed Wi-Fi for both guests"
    ],
    "exclusions": [
      "Extra bed (Not applicable due to twin arrangement)"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "All guests must present government ID",
      "Non-smoking policy applies"
    ],
    "foodBenefits": [
      "Complimentary morning filter coffee or ginger chai delivered to your room (6:30 AM – 9:00 AM)",
      "Complimentary sealed packaged mineral water bottle daily + unlimited pure RO water refills on your floor",
      "Hot homestyle breakfast add-on ($3 / ₹150) featuring Idli-Vada-Sambar, Poha, Aloo Paratha, or Eggs & Toast",
      "Outside food welcome: Free dining plates, bowls, cutlery, and microwave reheating in common dining hall",
      "24/7 late-night room service menu (hot noodles, sandwiches, tea, biscuits, and bottled beverages)"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (soft microfiber or firm contour) delivered free on request",
      "Complimentary extra warm fleece blanket or thick winter quilt on demand from housekeeping",
      "Sanitized personal dental kit (toothbrush + herbal toothpaste) and fresh bathing soap kit on request",
      "Steam iron and fold-out ironing board delivered to room on request (zero extra fee)",
      "Daily fresh towel replacement and sanitized cotton bedsheets with hospital-grade hygiene",
      "Complimentary secure luggage cloakroom holding before check-in and after check-out"
    ]
  },
  {
    "id": "family-quad",
    "slug": "family-quad",
    "name": "Family Quad Suite",
    "category": "family",
    "acType": "ac",
    "badge": "Family Favorite",
    "badgeType": "best-value",
    "availability": "Limited Rooms",
    "isLimited": true,
    "startingPrice": 52,
    "startingPriceINR": 3199,
    "weekdayRate": 52,
    "weekdayRateINR": 3199,
    "weekendRate": 59,
    "weekendRateINR": 3599,
    "extraPersonRate": 8,
    "extraPersonRateINR": 450,
    "extraBedRate": 11,
    "extraBedRateINR": 650,
    "capacity": 4,
    "maxCapacity": 5,
    "bedType": "2 Queen Size Beds",
    "roomSize": "320 sq.ft (30 m²)",
    "floor": "2nd Floor (Elevator Access)",
    "shortDesc": "Spacious family layout with two double beds, large closet, and ample room for children and luggage.",
    "fullDesc": "Traveling with family or small group? Keep everyone under one roof with our generous Family Quad Suite. Equipped with two queen size beds, double wardrobes, spacious attached bathroom, large flat-screen television, and plenty of space for multiple suitcases.",
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Heavy-Duty Split AC",
        "icon": "snow",
        "free": true
      },
      {
        "name": "2 Queen Size Beds (4 Sleeps)",
        "icon": "bed",
        "free": true
      },
      {
        "name": "43-inch Smart TV with Kids Channels",
        "icon": "tv",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Large Bathroom with Hot Water",
        "icon": "bath",
        "free": true
      },
      {
        "name": "Double Wardrobe & Full Mirror",
        "icon": "closet",
        "free": true
      },
      {
        "name": "Complimentary Tea/Coffee Setup",
        "icon": "coffee",
        "free": true
      },
      {
        "name": "Elevator Access to Floor",
        "icon": "elevator",
        "free": true
      }
    ],
    "inclusions": [
      "Comfortable lodging for 4 adults / kids",
      "Hot water 24/7 with family toiletries kit",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Complimentary drinking water (4 bottles daily)",
      "Free parking for SUV / family car"
    ],
    "exclusions": [
      "5th guest extra mattress ($11 / ₹650)"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Children under 6 stay free sharing existing beds",
      "Please monitor kids in balcony/corridor"
    ],
    "foodBenefits": [
      "In-room electric kettle with daily complimentary tea bags, premium coffee sachets, creamer & sugar",
      "Complimentary morning fresh filter coffee or herbal tea door delivery (6:30 AM – 9:30 AM)",
      "2 Complimentary sealed 1-litre packaged mineral water bottles daily + unlimited 24/7 RO station access",
      "Hot homestyle breakfast add-on ($3 / ₹150) freshly prepared with regional & continental choices",
      "Outside food friendly: Complimentary porcelain crockery, cutlery set & microwave reheating assistance",
      "24/7 room service & late-night snack counter with prompt 15-minute door delivery"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (choice of soft microfiber or orthopedic neck contour) on request",
      "Complimentary extra heavy fleece blanket or warm winter quilt delivered anytime by housekeeping",
      "Deluxe personal toiletry kit with dental kit, herbal shampoo, body wash, and fresh bath sheets",
      "In-room wardrobe with digital locker, clothes hangers, and steam iron/board on request",
      "Daily comprehensive housekeeping with complete linen turnaround and evening turndown",
      "Complimentary early luggage drop, express assistance, and guaranteed wake-up call ring"
    ]
  },
  {
    "id": "triple-sharing",
    "slug": "triple-sharing",
    "name": "Triple Sharing Room",
    "category": "standard",
    "acType": "ac",
    "badge": "Group Saver",
    "badgeType": "neutral",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 42,
    "startingPriceINR": 2599,
    "weekdayRate": 42,
    "weekdayRateINR": 2599,
    "weekendRate": 48,
    "weekendRateINR": 2899,
    "extraPersonRate": 8,
    "extraPersonRateINR": 450,
    "extraBedRate": 10,
    "extraBedRateINR": 600,
    "capacity": 3,
    "maxCapacity": 3,
    "bedType": "3 Single Beds or 1 Double + 1 Single",
    "roomSize": "260 sq.ft (24 m²)",
    "floor": "1st & 3rd Floor",
    "shortDesc": "Thoughtfully laid out for 3 guests with individual sleeping spaces, dedicated outlets, and split AC.",
    "fullDesc": "Designed for small tour groups, pilgrimage travelers, or colleagues attending seminars together. Offers three distinct sleeping beds with separate charging stations, a wide dressing mirror, air conditioning, and a clean attached bathroom with hot geyser.",
    "image": "assets/images/rooms/triple-sharing.jpg",
    "gallery": [
      "assets/images/rooms/triple-sharing.jpg",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Powerful AC",
        "icon": "snow",
        "free": true
      },
      {
        "name": "3 Comfortable Sleeping Beds",
        "icon": "bed",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Attached Bathroom with Geyser",
        "icon": "bath",
        "free": true
      },
      {
        "name": "32-inch LED Television",
        "icon": "tv",
        "free": true
      },
      {
        "name": "3 Personal Storage Lockers",
        "icon": "lock",
        "free": true
      },
      {
        "name": "Daily Towels & Soap Kit",
        "icon": "towel",
        "free": true
      },
      {
        "name": "24/7 Front Desk Support",
        "icon": "headset",
        "free": true
      }
    ],
    "inclusions": [
      "Lodging for 3 adults in dedicated beds",
      "Complimentary Wi-Fi for all 3 devices",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "24/7 hot water supply"
    ],
    "exclusions": [
      "Food and beverage service (Available on order)"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Valid IDs mandatory for all 3 occupants",
      "Smoking strictly forbidden"
    ],
    "foodBenefits": [
      "Complimentary morning filter coffee or ginger chai delivered to your room (6:30 AM – 9:00 AM)",
      "Complimentary sealed packaged mineral water bottle daily + unlimited pure RO water refills on your floor",
      "Hot homestyle breakfast add-on ($3 / ₹150) featuring Idli-Vada-Sambar, Poha, Aloo Paratha, or Eggs & Toast",
      "Outside food welcome: Free dining plates, bowls, cutlery, and microwave reheating in common dining hall",
      "24/7 late-night room service menu (hot noodles, sandwiches, tea, biscuits, and bottled beverages)"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (soft microfiber or firm contour) delivered free on request",
      "Complimentary extra warm fleece blanket or thick winter quilt on demand from housekeeping",
      "Sanitized personal dental kit (toothbrush + herbal toothpaste) and fresh bathing soap kit on request",
      "Steam iron and fold-out ironing board delivered to room on request (zero extra fee)",
      "Daily fresh towel replacement and sanitized cotton bedsheets with hospital-grade hygiene",
      "Complimentary secure luggage cloakroom holding before check-in and after check-out"
    ]
  },
  {
    "id": "dormitory-bed",
    "slug": "dormitory-bed",
    "name": "Dormitory Bunk Bed (AC)",
    "category": "dormitory",
    "acType": "ac",
    "badge": "Lowest Price Guaranteed",
    "badgeType": "best-value",
    "availability": "Limited Rooms",
    "isLimited": true,
    "startingPrice": 12,
    "startingPriceINR": 699,
    "weekdayRate": 12,
    "weekdayRateINR": 699,
    "weekendRate": 14,
    "weekendRateINR": 799,
    "extraPersonRate": 0,
    "extraPersonRateINR": 0,
    "extraBedRate": 0,
    "extraBedRateINR": 0,
    "capacity": 1,
    "maxCapacity": 1,
    "bedType": "1 Bunk Bed in 6-Bed AC Dorm",
    "roomSize": "Shared Hall (380 sq.ft)",
    "floor": "Ground Floor",
    "shortDesc": "The ultimate budget stay. Heavy wooden bunk bed with privacy curtain, personal reading light, and locker.",
    "fullDesc": "Designed for backpackers, exam aspirants, and overnight transit travelers. Our clean 6-bed air-conditioned dormitory features sturdy custom solid wood bunk beds, thick orthopedic foam mattresses, full privacy curtains, personal reading lamp, dual USB charging ports, and private padlock lockers.",
    "image": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Night-Time AC (8 PM - 8 AM)",
        "icon": "snow",
        "free": true
      },
      {
        "name": "Full Privacy Bed Curtain",
        "icon": "shield",
        "free": true
      },
      {
        "name": "Personal Padlock Locker",
        "icon": "lock",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Clean Shared Washrooms (x3)",
        "icon": "bath",
        "free": true
      },
      {
        "name": "Personal Reading Light & Port",
        "icon": "bolt",
        "free": true
      },
      {
        "name": "Luggage Storage Facility",
        "icon": "closet",
        "free": true
      },
      {
        "name": "RO Purified Water Station",
        "icon": "water",
        "free": true
      }
    ],
    "inclusions": [
      "1 Bunk Bed with clean sheet, pillow & blanket",
      "Locker access (bring or rent a padlock)",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "High-speed Wi-Fi",
      "Free RO drinking water refills"
    ],
    "exclusions": [
      "Private attached washroom (Shared sanitized stalls)",
      "Towel rental ($1 / ₹50 refundable deposit)"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Strict silence in dorm between 10:00 PM - 07:00 AM",
      "No food consumption on beds"
    ],
    "foodBenefits": [
      "Complimentary morning hot tea or coffee voucher redeemable at our lobby café counter",
      "Unlimited pure UV+RO chilled and room-temperature drinking water dispensers on dorm floor",
      "Budget homestyle breakfast add-on available at only $2.50 / ₹120 for backpackers and students",
      "Outside food welcome: Dedicated lounge dining tables with free microwave, plates, and cutlery",
      "24/7 midnight snack counter at front desk (instant noodles, tea, biscuits, mineral water)"
    ],
    "comfortBenefits": [
      "Complimentary extra pillow available on request at the reception desk",
      "Complimentary extra warm fleece blanket available on demand during chilly nights",
      "Sanitized fresh cotton bedsheet, pillow cover, and clean blanket assigned per bed",
      "Personal lockable steel locker with electronic/padlock security for backpack and laptop",
      "Sanitized shared washroom stalls with 24/7 geyser hot water showers and soap dispensers",
      "Free luggage storage in cloakroom before check-in time and after check-out"
    ]
  },
  {
    "id": "executive-suite",
    "slug": "executive-suite",
    "name": "Executive King Room",
    "category": "deluxe",
    "acType": "ac",
    "badge": "Premium Comfort",
    "badgeType": "neutral",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 48,
    "startingPriceINR": 2899,
    "weekdayRate": 48,
    "weekdayRateINR": 2899,
    "weekendRate": 54,
    "weekendRateINR": 3299,
    "extraPersonRate": 10,
    "extraPersonRateINR": 600,
    "extraBedRate": 12,
    "extraBedRateINR": 750,
    "capacity": 2,
    "maxCapacity": 3,
    "bedType": "1 Premium King Bed + Lounge Chairs",
    "roomSize": "280 sq.ft (26 m²)",
    "floor": "Top Floor (Quiet Zone)",
    "shortDesc": "Our finest lodge accommodation with extra space, plush king mattress, coffee maker, and city views.",
    "fullDesc": "For travelers seeking a touch of extra luxury without high hotel prices, the Executive King Room provides top-floor quietude, premium linen, two comfortable accent armchairs, coffee maker, 43-inch smart TV with streaming support, and a deluxe walk-in shower bathroom.",
    "image": "assets/images/rooms/executive-king.jpg",
    "gallery": [
      "assets/images/rooms/executive-king.jpg",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Super Silent Inverter AC",
        "icon": "snow",
        "free": true
      },
      {
        "name": "Plush King Size Bed",
        "icon": "bed",
        "free": true
      },
      {
        "name": "43-inch 4K Smart TV",
        "icon": "tv",
        "free": true
      },
      {
        "name": "Mini Refrigerator",
        "icon": "snowflake",
        "free": true
      },
      {
        "name": "Coffee & Tea Maker",
        "icon": "coffee",
        "free": true
      },
      {
        "name": "Walk-in Rain Shower",
        "icon": "bath",
        "free": true
      },
      {
        "name": "Ultra-Fast Wi-Fi (150 Mbps)",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Luggage Bench & Safe",
        "icon": "shield",
        "free": true
      }
    ],
    "inclusions": [
      "Complimentary welcome tea on arrival",
      "Electric kettle with daily assortment",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Complimentary packaged water (2 bottles daily)",
      "Priority check-in assistance",
      "Free car parking"
    ],
    "exclusions": [
      "Mini bar items (charged as consumed)",
      "Late check-out surcharge beyond 1:00 PM"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Valid ID required for all guests",
      "Strict non-smoking room"
    ],
    "foodBenefits": [
      "In-room electric kettle with daily complimentary tea bags, premium coffee sachets, creamer & sugar",
      "Complimentary morning fresh filter coffee or herbal tea door delivery (6:30 AM – 9:30 AM)",
      "2 Complimentary sealed 1-litre packaged mineral water bottles daily + unlimited 24/7 RO station access",
      "Hot homestyle breakfast add-on ($3 / ₹150) freshly prepared with regional & continental choices",
      "Outside food friendly: Complimentary porcelain crockery, cutlery set & microwave reheating assistance",
      "24/7 room service & late-night snack counter with prompt 15-minute door delivery"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (choice of soft microfiber or orthopedic neck contour) on request",
      "Complimentary extra heavy fleece blanket or warm winter quilt delivered anytime by housekeeping",
      "Deluxe personal toiletry kit with dental kit, herbal shampoo, body wash, and fresh bath sheets",
      "In-room wardrobe with digital locker, clothes hangers, and steam iron/board on request",
      "Daily comprehensive housekeeping with complete linen turnaround and evening turndown",
      "Complimentary early luggage drop, express assistance, and guaranteed wake-up call ring"
    ]
  },
  {
    "id": "deluxe-triple",
    "slug": "deluxe-triple",
    "name": "Deluxe Triple Room with City View",
    "category": "deluxe",
    "acType": "ac",
    "badge": "City Panorama",
    "badgeType": "neutral",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 45,
    "startingPriceINR": 2699,
    "weekdayRate": 45,
    "weekdayRateINR": 2699,
    "weekendRate": 50,
    "weekendRateINR": 2999,
    "extraPersonRate": 10,
    "extraPersonRateINR": 600,
    "extraBedRate": 12,
    "extraBedRateINR": 700,
    "capacity": 3,
    "maxCapacity": 4,
    "bedType": "1 Queen Bed + 1 Single Bed",
    "roomSize": "280 sq.ft (26 m²)",
    "floor": "3rd Floor",
    "shortDesc": "A bright, air-conditioned corner room with expansive city views, private balcony, and comfortable bedding for 3 guests.",
    "fullDesc": "Perfect for three colleagues or a small family, the Deluxe Triple Room offers sweeping street and heritage city views. Featuring a plush queen bed alongside a separate comfortable single bed, private step-out balcony, whisper-quiet split air conditioning, dedicated study table, and a contemporary bathroom with 24/7 hot water geyser.",
    "image": "assets/images/rooms/deluxe-triple.jpg",
    "gallery": [
      "assets/images/rooms/deluxe-triple.jpg",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Whisper-Quiet Split AC",
        "icon": "snow",
        "free": true
      },
      {
        "name": "Private Step-out Balcony",
        "icon": "sun",
        "free": true
      },
      {
        "name": "Attached Sanitized Bathroom",
        "icon": "bath",
        "free": true
      },
      {
        "name": "24/7 Geyser Hot Water",
        "icon": "water",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi (100 Mbps)",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "32-inch LED Television",
        "icon": "tv",
        "free": true
      },
      {
        "name": "Tea & Coffee Kettle Kit",
        "icon": "coffee",
        "free": true
      },
      {
        "name": "Wardrobe & Full Mirror",
        "icon": "closet",
        "free": true
      }
    ],
    "inclusions": [
      "High-speed Wi-Fi access for up to 3 devices",
      "Fresh sanitized towels & bathroom essentials",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Daily room cleaning and waste disposal",
      "Complimentary packaged drinking water bottles",
      "Free secure car or two-wheeler parking"
    ],
    "exclusions": [
      "Breakfast (Add-on available at $3 / ₹150 per guest)",
      "Late check-out after 1:00 PM without prior confirmation"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Valid government photo ID required for all 3 guests",
      "Strict non-smoking room"
    ],
    "foodBenefits": [
      "In-room electric kettle with daily complimentary tea bags, premium coffee sachets, creamer & sugar",
      "Complimentary morning fresh filter coffee or herbal tea door delivery (6:30 AM – 9:30 AM)",
      "2 Complimentary sealed 1-litre packaged mineral water bottles daily + unlimited 24/7 RO station access",
      "Hot homestyle breakfast add-on ($3 / ₹150) freshly prepared with regional & continental choices",
      "Outside food friendly: Complimentary porcelain crockery, cutlery set & microwave reheating assistance",
      "24/7 room service & late-night snack counter with prompt 15-minute door delivery"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (choice of soft microfiber or orthopedic neck contour) on request",
      "Complimentary extra heavy fleece blanket or warm winter quilt delivered anytime by housekeeping",
      "Deluxe personal toiletry kit with dental kit, herbal shampoo, body wash, and fresh bath sheets",
      "In-room wardrobe with digital locker, clothes hangers, and steam iron/board on request",
      "Daily comprehensive housekeeping with complete linen turnaround and evening turndown",
      "Complimentary early luggage drop, express assistance, and guaranteed wake-up call ring"
    ]
  },
  {
    "id": "standard-single-ac",
    "slug": "standard-single-ac",
    "name": "Standard Single Room (AC)",
    "category": "standard",
    "acType": "ac",
    "badge": "Solo Business Pick",
    "badgeType": "best-value",
    "availability": "Available",
    "isLimited": false,
    "startingPrice": 28,
    "startingPriceINR": 1649,
    "weekdayRate": 28,
    "weekdayRateINR": 1649,
    "weekendRate": 32,
    "weekendRateINR": 1899,
    "extraPersonRate": 8,
    "extraPersonRateINR": 450,
    "extraBedRate": 10,
    "extraBedRateINR": 550,
    "capacity": 1,
    "maxCapacity": 1,
    "bedType": "1 Cosy Queen Bed",
    "roomSize": "160 sq.ft (15 m²)",
    "floor": "1st & 2nd Floor",
    "shortDesc": "Private climate-controlled sanctuary with high-speed internet, dedicated work desk, and zero street noise.",
    "fullDesc": "Tailored specifically for solo executives, exam candidates, and transit guests requiring climate-controlled comfort. This private en-suite room includes a split air conditioner, comfortable queen mattress, dedicated laptop work desk with accessible power strip, sanitized bathroom, and complimentary high-speed Wi-Fi.",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Individual Split AC",
        "icon": "snow",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi (100 Mbps)",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Executive Workstation & Lamp",
        "icon": "briefcase",
        "free": true
      },
      {
        "name": "Attached Sanitized Bathroom",
        "icon": "bath",
        "free": true
      },
      {
        "name": "24/7 Hot Water Geyser",
        "icon": "water",
        "free": true
      },
      {
        "name": "Power Backup (AC & Lights)",
        "icon": "bolt",
        "free": true
      },
      {
        "name": "Sound-Insulated Window",
        "icon": "volume-x",
        "free": true
      },
      {
        "name": "Daily Housekeeping",
        "icon": "broom",
        "free": true
      }
    ],
    "inclusions": [
      "High-speed Wi-Fi router connectivity",
      "Fresh sanitized linen, pillow & comforter",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "24-hour hot water in ensuite bathroom",
      "Complimentary packaged water bottle",
      "Free luggage holding at reception"
    ],
    "exclusions": [
      "Breakfast (Available as add-on for $3 / ₹150)",
      "Laundry washing service (Nominal per-piece charge)"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Original ID card required at check-in",
      "Strict non-smoking room"
    ],
    "foodBenefits": [
      "Complimentary morning filter coffee or ginger chai delivered to your room (6:30 AM – 9:00 AM)",
      "Complimentary sealed packaged mineral water bottle daily + unlimited pure RO water refills on your floor",
      "Hot homestyle breakfast add-on ($3 / ₹150) featuring Idli-Vada-Sambar, Poha, Aloo Paratha, or Eggs & Toast",
      "Outside food welcome: Free dining plates, bowls, cutlery, and microwave reheating in common dining hall",
      "24/7 late-night room service menu (hot noodles, sandwiches, tea, biscuits, and bottled beverages)"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (soft microfiber or firm contour) delivered free on request",
      "Complimentary extra warm fleece blanket or thick winter quilt on demand from housekeeping",
      "Sanitized personal dental kit (toothbrush + herbal toothpaste) and fresh bathing soap kit on request",
      "Steam iron and fold-out ironing board delivered to room on request (zero extra fee)",
      "Daily fresh towel replacement and sanitized cotton bedsheets with hospital-grade hygiene",
      "Complimentary secure luggage cloakroom holding before check-in and after check-out"
    ]
  },
  {
    "id": "family-interconnected",
    "slug": "family-interconnected",
    "name": "Family Interconnected 2-Room Suite",
    "category": "family",
    "acType": "ac",
    "badge": "Big Family Choice",
    "badgeType": "limited",
    "availability": "Limited Rooms",
    "isLimited": true,
    "startingPrice": 68,
    "startingPriceINR": 3999,
    "weekdayRate": 68,
    "weekdayRateINR": 3999,
    "weekendRate": 78,
    "weekendRateINR": 4599,
    "extraPersonRate": 10,
    "extraPersonRateINR": 600,
    "extraBedRate": 12,
    "extraBedRateINR": 700,
    "capacity": 6,
    "maxCapacity": 7,
    "bedType": "2 King Beds + 1 Single Bed (2 Rooms)",
    "roomSize": "420 sq.ft (39 m²)",
    "floor": "2nd Floor",
    "shortDesc": "Two adjoining air-conditioned bedrooms connected by an interior private door, with 2 en-suite bathrooms for up to 6 guests.",
    "fullDesc": "Our most spacious option, designed for large families, vacationing groups, and pilgrimage parties. Features two full bedrooms connected via an internal privacy door, two completely separate sanitized bathrooms, two LED TVs, dual split air conditioners, and ample wardrobe and luggage space so everyone stays together comfortably.",
    "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "2 Independent Split ACs",
        "icon": "snow",
        "free": true
      },
      {
        "name": "2 Attached Ensuite Bathrooms",
        "icon": "bath",
        "free": true
      },
      {
        "name": "2 Flat-Screen LED TVs",
        "icon": "tv",
        "free": true
      },
      {
        "name": "Interconnecting Privacy Door",
        "icon": "door",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi for 6 Devices",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "Dual Luggage Storage Racks",
        "icon": "briefcase",
        "free": true
      },
      {
        "name": "24/7 Hot Water Geysers",
        "icon": "water",
        "free": true
      },
      {
        "name": "Electric Tea Kettle Kit",
        "icon": "coffee",
        "free": true
      }
    ],
    "inclusions": [
      "Full access to both connected bedrooms and bathrooms",
      "Complimentary high-speed Wi-Fi for all guests",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Fresh linens, pillows, and extra blankets",
      "Daily comprehensive housekeeping",
      "Complimentary secure car parking (up to 2 vehicles)"
    ],
    "exclusions": [
      "Breakfast (Add-on available at $3 / ₹150 per person)",
      "Late check-out surcharge beyond 1:00 PM"
    ],
    "houseRules": [
      "Check-in: 12:00 PM | Check-out: 11:00 AM",
      "Government photo IDs required for all adult guests",
      "Quiet hours observed after 10:30 PM"
    ],
    "foodBenefits": [
      "In-room electric kettle with daily complimentary tea bags, premium coffee sachets, creamer & sugar",
      "Complimentary morning fresh filter coffee or herbal tea door delivery (6:30 AM – 9:30 AM)",
      "2 Complimentary sealed 1-litre packaged mineral water bottles daily + unlimited 24/7 RO station access",
      "Hot homestyle breakfast add-on ($3 / ₹150) freshly prepared with regional & continental choices",
      "Outside food friendly: Complimentary porcelain crockery, cutlery set & microwave reheating assistance",
      "24/7 room service & late-night snack counter with prompt 15-minute door delivery"
    ],
    "comfortBenefits": [
      "Complimentary extra pillows (choice of soft microfiber or orthopedic neck contour) on request",
      "Complimentary extra heavy fleece blanket or warm winter quilt delivered anytime by housekeeping",
      "Deluxe personal toiletry kit with dental kit, herbal shampoo, body wash, and fresh bath sheets",
      "In-room wardrobe with digital locker, clothes hangers, and steam iron/board on request",
      "Daily comprehensive housekeeping with complete linen turnaround and evening turndown",
      "Complimentary early luggage drop, express assistance, and guaranteed wake-up call ring"
    ]
  },
  {
    "id": "female-dorm-pod",
    "slug": "female-dorm-pod",
    "name": "Female Dormitory Pod Bed (AC)",
    "category": "dormitory",
    "acType": "ac",
    "badge": "Women Only Pod",
    "badgeType": "best-value",
    "availability": "Limited Beds",
    "isLimited": true,
    "startingPrice": 14,
    "startingPriceINR": 799,
    "weekdayRate": 14,
    "weekdayRateINR": 799,
    "weekendRate": 16,
    "weekendRateINR": 899,
    "extraPersonRate": 0,
    "extraPersonRateINR": 0,
    "extraBedRate": 0,
    "extraBedRateINR": 0,
    "capacity": 1,
    "maxCapacity": 1,
    "bedType": "1 Privacy Bunk Pod + Electronic Locker",
    "roomSize": "6-Bed Female Hall (280 sq.ft)",
    "floor": "2nd Floor (Secure Wing)",
    "shortDesc": "A dedicated women-only air-conditioned dormitory hall with private curtained pod beds, keycard access, and personal lockers.",
    "fullDesc": "Designed with safety, privacy, and community in mind for solo female backpackers, students, and traveling professionals. Located in a secure wing with electronic keycard entry, each pod includes an orthopedic mattress, privacy blackout curtains, dedicated reading light, universal charging socket, USB ports, and a lockable steel locker.",
    "image": "assets/images/rooms/female-dorm-pod.jpg",
    "gallery": [
      "assets/images/rooms/female-dorm-pod.jpg",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
    ],
    "amenities": [
      {
        "name": "Electronic Keycard Wing Entry",
        "icon": "key",
        "free": true
      },
      {
        "name": "Blackout Privacy Curtains",
        "icon": "shield",
        "free": true
      },
      {
        "name": "Night Climate AC Control",
        "icon": "snow",
        "free": true
      },
      {
        "name": "Private Lockable Steel Locker",
        "icon": "lock",
        "free": true
      },
      {
        "name": "Personal Reading Light & Plug",
        "icon": "bolt",
        "free": true
      },
      {
        "name": "Dedicated Female Clean Washrooms",
        "icon": "bath",
        "free": true
      },
      {
        "name": "High-Speed Wi-Fi (100 Mbps)",
        "icon": "wifi",
        "free": true
      },
      {
        "name": "RO Drinking Water Dispenser",
        "icon": "droplet",
        "free": true
      }
    ],
    "inclusions": [
      "1 Bunk Pod in 6-bed female-only hall",
      "Fresh sanitized bedsheet, pillow, and fleece blanket",
      "Outside food allowed (free plates, cutlery & microwave heating)",
      "Complimentary packaged drinking water + unlimited RO refills",
      "Complimentary morning hot filter coffee or chai",
      "Complimentary extra pillows & warm blankets on request",
      "Electronic luggage locker use",
      "High-speed Wi-Fi access",
      "24/7 hot water in shared female washroom"
    ],
    "exclusions": [
      "Padlocks (Bring your own or purchase at reception for $1 / ₹50)",
      "Towels (Available for rent at $0.50 / ₹30)"
    ],
    "houseRules": [
      "Strictly female guests only in this wing",
      "Quiet hours: 10:00 PM to 06:00 AM",
      "No visitors permitted inside dormitory hall"
    ],
    "foodBenefits": [
      "Complimentary morning hot tea or coffee voucher redeemable at our lobby café counter",
      "Unlimited pure UV+RO chilled and room-temperature drinking water dispensers on dorm floor",
      "Budget homestyle breakfast add-on available at only $2.50 / ₹120 for backpackers and students",
      "Outside food welcome: Dedicated lounge dining tables with free microwave, plates, and cutlery",
      "24/7 midnight snack counter at front desk (instant noodles, tea, biscuits, mineral water)"
    ],
    "comfortBenefits": [
      "Complimentary extra pillow available on request at the reception desk",
      "Complimentary extra warm fleece blanket available on demand during chilly nights",
      "Sanitized fresh cotton bedsheet, pillow cover, and clean blanket assigned per bed",
      "Personal lockable steel locker with electronic/padlock security for backpack and laptop",
      "Sanitized shared washroom stalls with 24/7 geyser hot water showers and soap dispensers",
      "Free luggage storage in cloakroom before check-in time and after check-out"
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = ROOMS_DATA;
}
