import "@/sass/pages/_termsAndPrivacy.scss";

import Link from "next/link";
import Image from "next/image";

const terms = [
  {
    id: 1,
    title: "Account Registration:",
    lists: [
      "Users must provide accurate and complete information during the registration process.",
      "Users are responsible for maintaining the confidentiality of their account credentials.",
    ],
  },
  {
    id: 2,
    title: "App Usage:",
    lists: [
      "Users must use the app in accordance with applicable laws and regulations.",
      "Any unauthorized use of the app is strictly prohibited.",
    ],
  },
  {
    id: 3,
    title: "Data Security:",
    lists: [
      "We take reasonable measures to secure user data, but users are encouraged to take their own precautions.",
    ],
  },
  {
    id: 4,
    title: "Prohibited Activities:",
    lists: [
      "Users must not engage in any illegal or harmful activities while using the app.",
    ],
  },
  {
    id: 5,
    title: "Termination:",
    lists: [
      "Banking App reserves the right to terminate user accounts for violations of these terms.",
    ],
  },
  {
    id: 6,
    title: "Disclaimer:",
    lists: ["The app is provided `as is` without any warranties."],
  },
  {
    id: 7,
    title: "Limitation of Liability:",
    lists: [
      "Banking App is not liable for any damages arising from the use of the app.",
    ],
  },
  {
    id: 8,
    title: "Changes to Terms:",
    lists: [
      "Banking App may update these terms at any time. Users will be notified of significant changes.",
    ],
  },
];

const privacies = [
  {
    id: 1,
    title: "Information Collection:",
    lists: [
      "We collect personal information when users register accounts, make transactions, or interact with the app.",
    ],
  },
  {
    id: 2,
    title: "Use of Information:",
    lists: [
      "We use collected information to provide and improve our services, as well as for marketing purposes with user consent.",
    ],
  },
  {
    id: 3,
    title: "Data Security:",
    lists: [
      "We implement security measures to protect user data, but no method is 100% secure.",
    ],
  },
  {
    id: 4,
    title: "Third-Party Services:",
    lists: [
      "We may use third-party services, and their privacy policies will apply.",
    ],
  },
  {
    id: 5,
    title: "Cookies and Analytics:",
    lists: [
      "We use cookies and analytics tools to enhance user experience and gather usage data.",
    ],
  },
  {
    id: 6,
    title: "Sharing of Information:",
    lists: [
      "We may share information with third parties for specific purposes, such as payment processing",
    ],
  },
  {
    id: 7,
    title: "User Controls:",
    lists: [
      "Users can manage their privacy settings and opt-out of certain data collection.",
    ],
  },
  {
    id: 8,
    title: "Changes to Privacy Policy:",
    lists: [
      "Users will be notified of any significant changes to the privacy policy.",
    ],
  },
];

const TermsAndPrivacy = () => {
  return (
    <section className="terms__privacy">
      <div className="terms__privacy__content">
        <Link href="/signin" className="terms__privacy__content__link">
          <Image
            src="/assets/sign/back.png"
            alt="back"
            width={20}
            height={20}
            className="terms__privacy__content__img"
          />
        </Link>
        <div className="terms__privacy__content__title">Terms</div>
        <div className="terms__privacy__content__text">
          {terms.map((term) => {
            return (
              <div
                key={term.id}
                className="terms__privacy__content__text__item"
              >
                <div className="terms__privacy__content__text__item__title">
                  {term.title}
                </div>
                <div className="terms__privacy__content__text__item__list">
                  {term.lists.map((item) => (
                    <div
                      key={item}
                      className="terms__privacy__content__text__item__list__item"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="terms__privacy__content__title">Privacy</div>
        <div className="terms__privacy__content__text">
          {privacies.map((privacy) => {
            return (
              <div
                key={privacy.id}
                className="terms__privacy__content__text__item"
              >
                <div className="terms__privacy__content__text__item__title">
                  {privacy.title}
                </div>
                <div className="terms__privacy__content__text__item__list">
                  {privacy.lists.map((item) => (
                    <div
                      key={item}
                      className="terms__privacy__content__text__item__list__item"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TermsAndPrivacy;
