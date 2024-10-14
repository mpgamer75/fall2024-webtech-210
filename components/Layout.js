// components/Layout.js
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">Home</Link> | <Link href="/about">About</Link> | <Link href="/contacts">Contacts</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
