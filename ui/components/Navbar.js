import Link from 'next/link';

export default function Navbar() {
    return (
      <nav>
        <ul>
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/about">À propos</Link></li>
          <li><Link href="/contacts">Contacts</Link></li>
          <li><Link href="/articles">Articles</Link></li>
        </ul>
      </nav>
    );
  }
  