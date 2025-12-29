// import { MenuPreset } from "@/types/preset";

// export const PRESETS: MenuPreset[] = [
//   // ───────────────────────── Vintage Café ─────────────────────────
//   {
//     id: "vintage-1",
//     name: "Vintage Café",
//     category: "vintage",
//     document: {
//       meta: {
//         templateName: "Vintage Café",
//         restaurantName: "Old Town Café",
//         tagline: "Since 1984",
//         address: "Market Street",
//         currency: "$",
//       },
//       theme: {
//         theme: "vintage",
//         fontFamily: "serif",
//         accentColor: "#7a5c3e",

//         layout: "single-column",
//         density: "compact",
//         dividerStyle: "accent",
//         priceAlignment: "right",
//       },
//       sections: [
//         {
//           id: "v-hot",
//           title: "Hot Beverages",
//           items: [
//             {
//               id: "v-h1",
//               name: "Masala Chai",
//               price: 40,
//               isVeg: true,
//               description: "Classic Indian spiced tea",
//             },
//             {
//               id: "v-h2",
//               name: "Filter Coffee",
//               price: 60,
//               isVeg: true,
//               description: "Strong South Indian brewed coffee",
//             },
//           ],
//         },
//         {
//           id: "v-snacks",
//           title: "Evening Snacks",
//           items: [
//             {
//               id: "v-s1",
//               name: "Vegetable Cutlet",
//               price: 90,
//               isVeg: true,
//               description: "Crispy shallow-fried veg patties",
//             },
//             {
//               id: "v-s2",
//               name: "Chicken Cutlet",
//               price: 130,
//               isVeg: false,
//               description: "Classic crumb-fried chicken cutlet",
//             },
//           ],
//         },
//       ],
//     },
//   },

//   // ───────────────────────── Elegant Dining ─────────────────────────
//   {
//     id: "elegant-1",
//     name: "Elegant Dining",
//     category: "elegant",
//     document: {
//       meta: {
//         templateName: "Elegant Dining",
//         restaurantName: "La Maison",
//         tagline: "Fine Dining Experience",
//         address: "Park Street",
//         currency: "₨",
//       },
//       theme: {
//         theme: "elegant",
//         fontFamily: "serif",
//         accentColor: "#b38b59",

//         layout: "single-column",
//         density: "comfortable",
//         dividerStyle: "line",
//         priceAlignment: "right",
//       },
//       sections: [
//         {
//           id: "e-starters",
//           title: "Starters",
//           items: [
//             {
//               id: "e-st1",
//               name: "Bruschetta",
//               price: 220,
//               isVeg: true,
//               description: "Grilled bread with tomato & basil",
//             },
//             {
//               id: "e-st2",
//               name: "Chicken Galantine",
//               price: 320,
//               isVeg: false,
//               description: "Slow-cooked chicken with herbs",
//             },
//           ],
//         },
//         {
//           id: "e-main",
//           title: "Main Course",
//           items: [
//             {
//               id: "e-m1",
//               name: "Penne Alfredo",
//               price: 420,
//               isVeg: true,
//               description: "Creamy parmesan sauce pasta",
//             },
//             {
//               id: "e-m2",
//               name: "Grilled Chicken Steak",
//               price: 520,
//               isVeg: false,
//               description: "Served with mashed potatoes",
//             },
//           ],
//         },
//       ],
//     },
//   },

//   // ───────────────────────── Bold Street Food ─────────────────────────
//   {
//     id: "bold-1",
//     name: "Street Food Hub",
//     category: "bold",
//     document: {
//       meta: {
//         templateName: "Street Food Hub",
//         restaurantName: "Spice Junction",
//         tagline: "Hot · Fast · Desi",
//         address: "Food Court",
//         currency: "₨",
//       },
//       theme: {
//         theme: "bold",
//         fontFamily: "sans",
//         accentColor: "#ff4d00",

//         layout: "single-column",
//         density: "compact",
//         dividerStyle: "none",
//         priceAlignment: "inline",
//       },
//       sections: [
//         {
//           id: "b-chaat",
//           title: "Chaat Specials",
//           items: [
//             {
//               id: "b-c1",
//               name: "Pani Puri",
//               price: 60,
//               isVeg: true,
//               description: "Crispy puris with tangy water",
//             },
//             {
//               id: "b-c2",
//               name: "Papdi Chaat",
//               price: 80,
//               isVeg: true,
//               description: "Crispy wafers with yogurt & chutney",
//             },
//           ],
//         },
//         {
//           id: "b-rolls",
//           title: "Rolls & Wraps",
//           items: [
//             {
//               id: "b-r1",
//               name: "Paneer Kathi Roll",
//               price: 120,
//               isVeg: true,
//               description: "Spiced paneer wrapped in paratha",
//             },
//             {
//               id: "b-r2",
//               name: "Chicken Kathi Roll",
//               price: 150,
//               isVeg: false,
//               description: "Juicy chicken wrapped with onions",
//             },
//           ],
//         },
//       ],
//     },
//   },

//   // ───────────────────────── Minimal Coffee Bar ─────────────────────────
//   {
//     id: "minimal-1",
//     name: "Minimal Coffee Bar",
//     category: "modern",
//     document: {
//       meta: {
//         templateName: "Minimal Coffee Bar",
//         restaurantName: "Bean & Brew",
//         tagline: "Freshly Brewed Everyday",
//         address: "High Street",
//         currency: "₨",
//       },
//       theme: {
//         theme: "light",
//         fontFamily: "sans",
//         accentColor: "#4a7c59",

//         layout: "single-column",
//         density: "comfortable",
//         dividerStyle: "line",
//         priceAlignment: "right",
//       },
//       sections: [
//         {
//           id: "m-coffee",
//           title: "Coffee",
//           items: [
//             {
//               id: "m-c1",
//               name: "Espresso",
//               price: 90,
//               isVeg: true,
//               description: "Rich and intense single shot",
//             },
//             {
//               id: "m-c2",
//               name: "Cappuccino",
//               price: 130,
//               isVeg: true,
//               description: "Espresso with steamed milk foam",
//             },
//           ],
//         },
//       ],
//     },
//   },
// ];
