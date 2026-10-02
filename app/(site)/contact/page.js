import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/data";
import { waLink } from "@/lib/format";
import { WhatsApp } from "@/components/Icons";

export const metadata = { title: "Contact Us" };

export default async function Contact() {
  const s = await getSettings();
  return (
    <main>
      <PageBanner title="Contact Us" sub={`We are here to help, ${s.hours}.`} image="/media/contact-1.jpg" crumbs={[{ label: "Contact" }]} />
      <div className="container contact-grid">
        <div className="info">
          <div><small>Call Us</small>{s.phone}</div>
          <div><small>General</small>{s.email}</div>
          {s.emailCorporate && <div><small>Corporate</small>{s.emailCorporate}</div>}
          <div><small>Hours</small>{s.hours}</div>
          <p><a className="btn wa-btn" href={waLink(s.whatsapp, `Hello ${s.siteName}, I would like to consult about jewellery.`)} target="_blank" rel="noopener noreferrer"><WhatsApp width={20} height={20} /> Chat on WhatsApp</a></p>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
