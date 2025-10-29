'use client';

import styles from './page.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1>ჩვენ შესახებ</h1>
          <p>
            ჩვენი ონლაინ მაღაზია შექმნილია იმისთვის, რომ შენთვის შოპინგი იყოს მარტივი, სტილური და სასიამოვნო —
            სადაც ხარისხი და კომფორტი ერთიანდება 💛
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Who we are */}
        <div className={styles.section}>
          <div className={styles.imageBox}>
            <img
              src="bgabout.png"
              alt="ჩვენი გუნდი"
              width={500}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.textBox}>
            <h2>ვინ ვართ ჩვენ?</h2>
            <p>
              ჩვენ ვართ ახალგაზრდა გუნდი, რომელიც ქმნის ონლაინ სივრცეს თანამედროვე მომხმარებლისთვის —
              ადგილობრივი და საერთაშორისო ბრენდების უნიკალური კოლექციებით.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className={`${styles.section} ${styles.reverse}`}>
          <div className={styles.imageBox}>
            <img
              src="bgabout.png"
              alt="ჩვენი მიზანი"
              width={500}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.textBox}>
            <h2>ჩვენი მისია</h2>
            <p>
              ჩვენი მიზანია შოპინგი გახდეს სიამოვნება — არა ვალდებულება.
              თითოეულ მომხმარებელზე ზრუნვა და სწრაფი მომსახურება ჩვენი ყოველდღიური პრიორიტეტია.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className={styles.values}>
          <h2>ჩვენი ღირებულებები</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>ნდობა</h3>
              <p>ჩვენი ურთიერთობა შენთან ემყარება სანდოობას და გამჭვირვალობას.</p>
            </div>
            <div className={styles.card}>
              <h3>ხარისხი</h3>
              <p>ჩვენი პროდუქცია შერჩეულია მაღალი სტანდარტების მიხედვით.</p>
            </div>
            <div className={styles.card}>
              <h3>გაგება</h3>
              <p>მომხმარებლის მოსმენა და საჭიროებების გათვალისწინება ჩვენი წარმატების საფუძველია.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <h2>გაეცანი ჩვენს კოლექციებს</h2>
          <p>იპოვე შენი სტილი ჩვენი მრავალფეროვანი პროდუქციიდან 🎁</p>
          <Link href="/shop" className={styles.button}>გადადი მაღაზიაში</Link>
        </div>
      </div>
    </section>
  );
}