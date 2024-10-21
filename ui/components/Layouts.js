import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Mon Blog</p>
      </footer>
    </div>
  );
}
