'use client'

import styles from "./Information.module.css";
import {FacebookFilled,InstagramFilled,PhoneOutlined,MailOutlined} from '@ant-design/icons';

export default function Information() {
  return (
    <div className={styles.bgcolor}>
      <div className={styles.container}>
      <div className={styles.flex}>
     <div className={styles.callmess}>
  <div className={styles.iconBox}>
    <MailOutlined style={{ fontSize: '18px' }} />
  </div>
  <p>info@chupstore.ge</p>
</div>

<div className={styles.callmess}>
  <div className={styles.iconBox}>
    <PhoneOutlined style={{ fontSize: '18px' }} />
  </div>
  <p>555 555 555</p>
</div>
      </div>
      <div className={`${styles.flex} ${styles.socials}`}>
      <div className={styles.iconBox}>
           <FacebookFilled style={{ fontSize: '21px' }} />
      </div>
      <div className={styles.iconBox}>
           <InstagramFilled style={{ fontSize: '22px' }} />
     </div>
     </div>
    </div>
    </div>
  );
}