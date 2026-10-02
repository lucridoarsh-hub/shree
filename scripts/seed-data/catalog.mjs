// Static demo catalogue. Images come from Pexels (public/media/p-<prefix>-N.jpg).
export const collections = [
  { slug: "new-arrivals", title: "New Arrivals", prefix: "new", blurb: "Fresh designs straight from our craftsmen, added every week.", names: ["Floral Gold Necklace", "Leaf Motif Chain", "Twisted Rope Bracelet", "Temple Jhumka", "Mesh Gold Bangle", "Beaded Mangalsutra", "Petal Drop Earrings", "Coin Link Necklace"] },
  { slug: "express-delivery", title: "Express Delivery", prefix: "express", blurb: "Ready-to-ship pieces delivered to your doorstep in 3 to 4 days.", names: ["Lakshmi Gold Coin 4g", "Gold Coin 8g", "Plain Gold Bar 10g", "Ganesha Coin 2g", "Gold Coin 20g", "Floral Gold Coin 5g", "Gold Bar 5g", "Gold Coin 1g"] },
  { slug: "earrings", title: "Earrings", prefix: "earrings", blurb: "Studs, drops, jhumkas and hoops for every mood and moment.", names: ["Classic Stud Earrings", "Pearl Drop Earrings", "Antique Jhumka", "Daily Wear Hoops", "Diamond Stud Earrings", "Chandbali Earrings", "Kids Gold Studs", "Cluster Drop Earrings"] },
  { slug: "pendants", title: "Pendants", prefix: "pendants", blurb: "Delicate pendants to wear every day or gift to someone special.", names: ["Heart Solitaire Pendant", "Evil Eye Pendant", "Initial Letter Pendant", "Om Gold Pendant", "Diamond Drop Pendant", "Floral Pendant", "Lotus Pendant", "Infinity Pendant"] },
  { slug: "rings", title: "Rings", prefix: "rings", blurb: "From everyday bands to statement solitaires.", names: ["Solitaire Ring", "Eternity Band", "Floral Gold Ring", "Men's Signet Ring", "Stackable Ring", "Cocktail Ring", "Couple Band", "Twist Gold Ring"] },
  { slug: "diamond-jewellery", title: "Diamond Jewellery", prefix: "diamond", blurb: "Certified diamonds set in gold and platinum.", names: ["Diamond Necklace Set", "Diamond Tennis Bracelet", "Halo Diamond Ring", "Diamond Nose Pin", "Diamond Stud Pair", "Diamond Pendant Set", "Diamond Bangle", "Diamond Choker"] },
  { slug: "more-jewellery", title: "More Jewellery", prefix: "more", blurb: "Bangles, chains, bracelets, anklets and more.", names: ["Gold Kada", "Rope Chain 22in", "Charm Bracelet", "Silver Anklet Pair", "Bangle Set of 2", "Box Chain", "Platinum Bracelet", "Nose Pin Trio"] },
  { slug: "gifting", title: "Gifting", prefix: "gifting", blurb: "Thoughtful jewellery gifts for every relationship and occasion.", names: ["Gift Set for Her", "Anniversary Pendant", "Rakhi Gold Coin Gift", "Baby Bracelet", "Silver Gift Box", "Couple Rings Set", "Birthday Stud Set", "Festive Coin Pack"] },
  { slug: "wedding-collections", title: "Wedding Collections", prefix: "wedding", blurb: "Bridal sets and heirloom designs for your big day.", names: ["Bridal Necklace Set", "Temple Haram", "Kundan Choker", "Bridal Bangles (Set of 4)", "Maang Tikka", "Polki Necklace", "Wedding Rani Haar", "Bridal Vaddanam"] },
];

const METALS = ["22K Gold", "18K Gold", "Diamond", "Platinum", "Silver"];

export const products = collections.flatMap((c) =>
  c.names.map((name, i) => {
    const seed = (c.slug.length * 7 + i * 13) % 17;
    const metal = c.slug === "diamond-jewellery" ? "Diamond" : c.slug === "express-delivery" ? "22K Gold" : METALS[(seed + i) % 4 === 3 ? 1 : (seed + i) % 3];
    const weight = c.slug === "express-delivery" ? [4, 8, 10, 2, 20, 5, 5, 1][i] : 2 + ((seed * 3 + i * 5) % 28);
    const price = Math.round((weight * (metal === "Diamond" ? 16500 : 7400) + 1500 + seed * 230) / 10) * 10;
    return {
      id: `${c.slug}-${i + 1}`,
      name,
      collection: c.slug,
      collectionTitle: c.title,
      image: `/media/p-${c.prefix}-${i + 1}.jpg`,
      metal,
      weight: `${weight}.${(seed + i) % 10}0 g`,
      price,
      mrp: Math.round((price * 1.08) / 10) * 10,
      code: `JL${(1000 + seed * 91 + i * 37).toString()}`,
    };
  })
);

export const inr = (n) => "₹" + n.toLocaleString("en-IN");

export const goldRates = [
  { label: "24 Karat Gold", unit: "per gram", price: 7845, change: +32 },
  { label: "22 Karat Gold", unit: "per gram", price: 7190, change: +30 },
  { label: "18 Karat Gold", unit: "per gram", price: 5884, change: +24 },
  { label: "Silver", unit: "per gram", price: 98, change: -1 },
  { label: "Platinum", unit: "per gram", price: 3210, change: +12 },
];
export const goldHistory = [
  ["Today", 7190], ["Yesterday", 7160], ["2 days ago", 7175], ["3 days ago", 7120], ["4 days ago", 7105], ["5 days ago", 7130], ["6 days ago", 7090],
];

export const offers = [
  { title: "Up to 25% off on making charges", text: "On gold jewellery above 10g. Applicable on select collections at all Hyderabad stores.", code: "MAKING25", image: "/media/banner-1.jpg" },
  { title: "Flat 15% off on diamond value", text: "Certified diamond jewellery across rings, earrings and necklace sets.", code: "DIAMOND15", image: "/media/banner-2.jpg" },
  { title: "Extra discounts on eGift Cards", text: "Unlock joy with extra discounts when you buy a Sree Sivani Jewellers eGift Card online.", code: "EGIFT5", image: "/media/banner-3.jpg" },
  { title: "Old gold exchange bonus", text: "Zero deduction on 22K old gold exchange when you upgrade to new jewellery.", code: "EXCHANGE", image: "/media/p-wedding-3.jpg" },
];

export const schemeSteps = [
  { n: 1, t: "Enrol", d: "Choose a monthly amount from ₹1,000 and register at any store or online." },
  { n: 2, t: "Save", d: "Pay 10 monthly instalments. Flexible due dates with reminders." },
  { n: 3, t: "Redeem", d: "On maturity get the value of your instalments plus a bonus towards jewellery." },
];

export const cities = [
  { slug: "hyderabad", name: "Hyderabad", count: 14, active: true },
  { slug: "mumbai", name: "Mumbai", count: 9 },
  { slug: "chennai", name: "Chennai", count: 18 },
  { slug: "bengaluru", name: "Bengaluru", count: 12 },
  { slug: "delhi", name: "Delhi NCR", count: 11 },
  { slug: "kochi", name: "Kochi", count: 6 },
  { slug: "kolkata", name: "Kolkata", count: 5 },
  { slug: "pune", name: "Pune", count: 4 },
];

const lorem = (t) => [
  `${t} at Sree Sivani Jewellers is designed to keep every customer informed and confident. This page is a placeholder for the demo presentation.`,
  "In the live website this section carries the full approved text provided by the client's legal and content teams.",
  "For any questions please contact our customer care on +91 93461 04233 (Mon to Saturday 10AM-6.30PM) or write to care@sreesivanijewellers.com.",
];
const mk = (title, group) => ({ title, group, body: lorem(title) });
export const infoPages = [
  ...["About Us", "History - The Journey", "Awards", "Social Initiatives", "Career"].map((t) => mk(t, "About")),
  ...["Jewellery Education", "Know Your Gold", "Know Your Diamond", "Know Your Gemstone", "Know Your Silver", "Bangle Size Guide", "Ring Size Guide", "Jewellery Care", "Platinum Care"].map((t) => mk(t, "Jewellery Guide")),
  ...["Our Blogs", "Latest Promotion", "Testimonials", "Video Campaign", "News & Events", "Investor Relations"].map((t) => mk(t, "Media")),
  ...["Disclaimer", "Privacy Policy", "Shipping Policy", "Terms & Conditions", "Return & Refund", "Cancellation Policy", "Exchange", "Buyback Policy"].map((t) => mk(t, "Policies")),
  ...["Track My Order", "Scheme Payments", "Jewellery Purchase Scheme", "Buy Gift Card", "Corporate Gifting", "Advance Booking", "Fraud Alert", "Help Desk"].map((t) => mk(t, "Quick Links")),
].map((p) => ({ ...p, slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }));

export const pageHref = (title) => {
  const p = infoPages.find((x) => x.title === title);
  return p ? `/info/${p.slug}` : "#";
};
