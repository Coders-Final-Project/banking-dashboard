import "@/sass/pages/_termsAndPrivacy.scss";

const termsAndPrivacy = [
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

const TermsAndPrivacy = () => {
  return (
    <section className="terms__privacy">
      <div className="terms__privacy__content">
        <div className="terms__privacy__content__title">Terms and Privacy</div>
        <div className="terms__privacy__content__text">
          {termsAndPrivacy.map((rule) => {
            return (
              <div
                key={rule.id}
                className="terms__privacy__content__text__item"
              >
                <div className="terms__privacy__content__text__item__title">
                  {rule.title}
                </div>
                <div className="terms__privacy__content__text__item__list">
                  {rule.lists.map((item) => (
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
