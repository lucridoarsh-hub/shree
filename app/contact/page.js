import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact Us | Sree Sivani Jewellers" };

export default function Contact() {
  return (
    <main>
      <PageBanner title="Contact Us" sub="We are here to help, Monday to Saturday, 10AM to 6.30PM." image="/media/contact-1.jpg" crumbs={[{ label: "Contact" }]} />
      <div className="container contact-grid">
        <div className="info">
          <div><small>Call Us</small>+91 93461 04233</div>
          <div><small>General</small>care@sreesivanijewellers.com</div>
          <div><small>Corporate</small>b2b@sreesivanijewellers.com</div>
          <div><small>Hours</small>Mon to Saturday 10AM-6.30PM</div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
