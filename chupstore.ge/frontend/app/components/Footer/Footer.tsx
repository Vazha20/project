import Link from "next/link";
import { FacebookFilled, InstagramFilled } from '@ant-design/icons';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ბრენდი */}
        <div className={styles.brand}>
          <h2>CHUPSTORE</h2>
          <p>ყველაფერი რაც გჭირდებათ ჩვენი ონლაინ მაღაზიიდან.</p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h4>ნავიგატორი</h4>
          <Link href="/">მთავარი</Link>
          <Link href="/about">ჩვენ შესახებ</Link>
          <Link href="/shop">მაღაზია</Link>
          <Link href="/contact">კონტაქტი</Link>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h4>კონტაქტი</h4>
          <p>Email: info@chupstore.com</p>
          <p>ტელეფონი: +995 555 555 555</p>
          <div className={styles.socials}>
            <FacebookFilled />
            <InstagramFilled />
          </div>
        </div>
      </div>

     <div className={styles.bottom}>
  &copy; {new Date().getFullYear()} CHUPSTORE. ყველა უფლება დაცულია. Powered by <Link className={styles.webers} href="https://www.facebook.com/profile.php?id=61577946634847" target="_blank" rel="noopener noreferrer">Webers.ge</Link>
</div>

    </footer>
  );
}