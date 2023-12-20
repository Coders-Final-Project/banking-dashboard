import Link from "next/link";
//@ts-ignore
import { i18n } from "../../i18n-config";

import "@/sass/layout/_langSwitcher.scss";

function LangSwitcher() {
  const { locales, defaultLocale } = i18n;

  return (
    <div dir="ltr" className="lang__switcher">
      {[...locales].sort().map((locale) => (
        <Link
          key={locale}
          href={locale === defaultLocale ? "/" : `/${locale}`}
          className="lang__switcher__link"
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}

export default LangSwitcher;
