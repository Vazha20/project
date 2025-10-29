'use client'

import React from "react";
import { Collapse, Typography } from "antd";

const { Title } = Typography;
const { Panel } = Collapse;

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories: { title: string; items: FAQItem[] }[] = [
  {
    title: "მიწოდება",
    items: [
      {
        question: "რამდენ ხანში ხდება მიწოდება?",
        answer: "თბილისში 1 დღეში, რეგიონებში 2-3 სამუშაო დღეში.",
      },
      {
        question: "რა ხდება, თუ შეკვეთა დაგვიანდა?",
        answer: "დაგვიკავშირდით 24/7 მხარდაჭერაზე, განვახლებულ ინფორმაციას მოგაწვდით და საჭიროების შემთხვევაში გავაკეთებთ კომპენსაციას.",
      },
      {
        question: "როგორ გავიგო, არის თუ არა ნივთი მარაგში?",
        answer: "პროდუქტის გვერდზე მოცემულია მარაგის ინფორმაცია, რომელიც მუდმივად განახლდება.",
      },
    ],
  },
  {
    title: "გადახდა",
    items: [
      {
        question: "რომელი გადახდის მეთოდებია ხელმისაწვდომი?",
        answer: "შეგიძლიათ გადაიხადოთ ბარათით ან ნაღდი ანგარიშსწორებით კურიერთან.",
      },
      {
        question: "არის ჩემი მონაცემები დაცული გადახდის დროს?",
        answer: "გამოყენებულია SSL და PCI DSS სტანდარტები, თქვენი მონაცემები უსაფრთხოა.",
      },
      {
        question: "როგორ გამოვიყენო ფასდაკლების კუპონი?",
        answer: "შეკვეთის დროს ჩასვით კუპონის კოდი შესაბამის ველში და ფასდაკლება ავტომატურად დაემატება.",
      },
    ],
  },
  {
    title: "პროდუქტი",
    items: [
      {
        question: "აპარატს ან ნივთს აქვს გარანტია?",
        answer: "ყველა პროდუქტი შეძენილია ოფიციალური გარანტიით. დეტალები პროდუქტის გვერდზეა.",
      },
      {
        question: "შეიძლება ერთ შეკვეთაში რამდენიმე პროდუქტი შევუკვეთო?",
        answer: "დიახ, შეგიძლიათ კალათაში დაამატოთ რამდენიმე ნივთი და გადაიხადოთ ერთ ტრანზაქციად.",
      },
    ],
  },
  {
    title: "დაბრუნება",
    items: [
      {
        question: "რა ვქნა თუ პროდუქტი არ მომწონს?",
        answer: "პროდუქტის დაბრუნება ან შეცვლა შესაძლებელია 7 დღის განმავლობაში, დაუკავშირდით ჩვენს მხარდაჭერას.",
      },
      {
        question: "პროდუქტი დაზიანდა, რა ვქნა?",
        answer: "დაგვიკავშირდით 24/7 მხარდაჭერაზე, მოგაწვდით მარტივ დაბრუნების პროცესს ან შეცვლის გზას.",
      },
    ],
  },
];

const FAQSection: React.FC = () => {
  return (
    <div>
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 30px 40px",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          ❓ ხშირად დასმული კითხვები
        </Title>

        {faqCategories.map((category, idx) => (
          <div key={idx} style={{ marginTop: 40 }}>
            <Title level={4} style={{ marginBottom: 20 }}>
              {category.title}
            </Title>
            <Collapse
              accordion
              bordered={false}
              expandIconPosition="end"
              style={{ textAlign: "left" }}
            >
              {category.items.map((faq, index) => (
                <Panel
                  header={faq.question}
                  key={index}
                  style={{
                    marginBottom: 10,
                    borderRadius: 8,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <p>{faq.answer}</p>
                </Panel>
              ))}
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
