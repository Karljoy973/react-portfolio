import { FaPhoneVolume } from "react-icons/fa6";

const ContactPage = () => {
  return (
    <section className="w-[100%] flex" data-testid="contact-page">
      <h1>Contact Page</h1>
      <p>
        Mon numero de telephone <FaPhoneVolume /> : +33...{" "}
      </p>
    </section>
  );
};

export default ContactPage;
