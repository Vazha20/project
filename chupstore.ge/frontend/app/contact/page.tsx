'use client';

import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function Contact() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>დაგვიკავშირდი</h1>
        <p className={styles.subtitle}>გაგვიზიარე შენი შეკითხვა, კომენტარი ან შეთავაზება 💬</p>

        <div className={styles.grid}>
               {/* Contact Form */}
          <form className={styles.form}>
            <h2>გამოგვიგზავნე შეტყობინება</h2>
            <input type="text" placeholder="სახელი" required />
            <input type="email" placeholder="ელ. ფოსტა" required />
            <textarea placeholder="შეტყობინება" rows={5} required></textarea>
            <button type="submit">გაგზავნა</button>
          </form>
          {/* Contact Info */}
          <div className={styles.infoBox}>
            <h2>კონტაქტის ინფორმაცია</h2>
            <p><EnvironmentOutlined /> მისამართი: თბილისი, საქართველო</p>
            <p><PhoneOutlined /> ტელეფონი: +995 555 12 34 56</p>
            <p><MailOutlined /> ელ-ფოსტა: info@chupstore.ge</p>

            <iframe
              className={styles.map}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.9035672220467!2d44.793!3d41.712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cfd5ab3b8f7%3A0x8a9b70b4e364c38d!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2sge!4v1682549577000!5m2!1sen!2sge"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

       
        </div>
      </div>
    </section>
  );
}