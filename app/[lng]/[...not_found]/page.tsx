import Link from "next/link";

import "@/sass/pages/_notFound.scss";

export default function NotFound() {
  return (
    <div className="not__found">
      <h1 className="not__found__title">Not found – 404!</h1>
      <div className="not__found__link">
        <Link href="/" className="not__found__link__item">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
