const raw = `A.S. Rao Nagar#Door No. 1-18-27/MIG-B/25, Dr. A.S. Rao Nagar Main Road, Secunderabad#10:30 am to 9:00 pm#4027188800, 9121393232
Dilsukhnagar#Door No.13-4-26, Vikas Nagar, Main Road, Chaitanyapuri, Dilsukhnagar#10:30 am to 9:00 pm#04024112345, 9121069123
Habsiguda#Door No: 01-01-86, Ground, 1st and 2nd Floor, L M Central, Main Road, Habsiguda#10:30 am to 8:30 pm#8069656103, 7075769392
Hyderabad#Door No. 6-3-674/1/2/3, Punjagutta#10:30 am to 9:00 pm#4023484400, 9494836600
Kokapet#Door no 158, Vamsiram Jyothi Optima, Gandipet Main Rd#10:30 am to 9:00 pm#0406776 8900, 78428 60101
Kondapur II#Door No: 1-60/30/1&2/134/2, Fortune Cyber, Gachibowli, Kondapur#10:30 am to 9:00 pm#4040744000, 9059125550
Kukatpally 2#2-22-261/1/A/NR Metro Pillar No: A772, NH65, A.S.Raju Nagar, Vivekananda Nagar, Kukatpally#10:30 am to 9:00 pm#04049644000, 7702343916
Jewellery Vanasthalipuram#8HQ9+4J9, Bommidi Elite Towers, Panama Bus Stop, Vanasthalipuram#10:30 am to 9:00 pm#04024003460, 8977782068
Suchitra#91, 92 & 93, Jeedimetla, Suchitra Rd, Quthbullapur, Rengareddy#10:30 am to 9:00 pm#4044321000, 9177555731
Charminar#ISM Complex, Ground & 1st Floor, Shah Ali Banda#11:00 am to 9:30 pm#04045241000, 9177555706
Kukatpally#Door No. 2-22-306/1/1 KPHB Main Road, opp. Vishwanath Theatre, Kukatpally#10:30 am to 9:00 pm#4023892555, 9440801032
Kondapur#2-91/77/2/ST/G, Signature Towers, Opp. Botanical Garden, Kondapur#10:30 am to 9:00 pm#4023004555, 9676797779
Mehdipatnam#Door No: 12-2, 831/2, Asif Nagar Rd, MIGH Colony, Near Khaja Gulshan Masjid, Mehdipatnam#10:30 am to 9:00 pm#4044844000, 9177555794
Chandanagar#Door No: 2/137/9A,1, 2, NH 65, Gangaram, Chanda Nagar, Opposite R.S. Brothers#10:30 am to 9:00 pm#4044841000, 9177555732`;

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const stores = raw.split("\n").map((line, i) => {
  const [name, address, hours, phone] = line.split("#");
  const full = `Sree Sivani Jewellers ${name}`;
  return {
    id: i + 1,
    slug: slugify(full),
    name: full,
    short: name,
    address,
    hours,
    phones: phone.split(",").map((p) => p.trim()),
    email: "care@sreesivanijewellers.com",
    image: `/media/store-${i + 1}.jpg`,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${full}, ${address}, Hyderabad`)}`,
  };
});

export const services = [
  { title: "In-Store Customisation", image: "/media/svc-1.jpg", text: "Our expert craftsmen turn your ideas, inspirations, and emotions into stunning jewellery designed to be treasured for a lifetime." },
  { title: "Jewellery Consultation", image: "/media/svc-2.jpg", text: "Our expert jewellery consultants help you discover styles that match your story, your style, and your special moments." },
  { title: "Jewellery Savings Made Easy", image: "/media/svc-3.jpg", text: "Make jewellery buying simple with our convenient savings schemes. Enjoy flexible monthly contributions, special benefits, and guaranteed value at maturity." },
];

export const trust = [
  { icon: "shield", label: "Your Jewellery Is Insured" },
  { icon: "refresh", label: "Guaranteed Buy back" },
  { icon: "seal", label: "100% HUID 916 HALLMARKED GOLD" },
];

export const faqs = [
  { q: "What collections are available at Sree Sivani Jewellers showrooms?", a: "Sree Sivani Jewellers showrooms offer an extensive selection of jewellery, including gold, diamond, platinum, and precious-stone pieces. You will find classic everyday wear, office-wear jewellery, contemporary styles, gifting collections, children’s jewellery, and regional favourites." },
  { q: "How can I contact the showroom for assistance?", a: "Each showroom’s telephone number, address, and map location are listed on the Store Locator. Simply select your preferred showroom to view its contact details." },
  { q: "Can I check if a particular design is available at the showroom?", a: "Yes. Call the showroom or write to care@sreesivanijewellers.com with the design details and the team will confirm availability before your visit." },
  { q: "Do showrooms offer in-store customisation?", a: "Yes, selected showrooms offer customisation. Our craftsmen can help turn your ideas and inspirations into a one-of-a-kind piece." },
];

export const menu = ["New Arrivals", "Express Delivery", "Earrings", "Pendants", "Rings", "Diamond Jewellery", "More Jewellery", "Gifting", "Wedding Collections"];

export const footer = {
  About: ["About Us", "History - The Journey", "Awards", "Social Initiatives", "Career", "FAQ’s"],
  "Jewellery Guide": ["Jewellery Education", "Know Your Gold", "Know Your Diamond", "Know Your Gemstone", "Know Your Silver", "Bangle Size Guide", "Ring Size Guide", "Jewellery Care", "Platinum Care"],
  Media: ["Our Blogs", "Latest Promotion", "Testimonials", "Video Campaign", "News & Events", "Investor Relations"],
  Policies: ["Disclaimer", "Privacy Policy", "Shipping Policy", "Terms & Conditions", "Return & Refund", "Cancellation Policy", "Exchange", "Buyback Policy"],
  "Quick Links": ["Track My Order", "Scheme Payments", "Jewellery Purchase Scheme", "Buy Gift Card", "Corporate Gifting", "Advance Booking", "Fraud Alert", "Help Desk"],
};
