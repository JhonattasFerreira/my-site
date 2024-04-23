import styles from "./NavItem.module.css";
import Link from "next/link";

const NavItem = ({ item: { url, name }, children }) => (
  <nav className={styles.nav}>
    <Link href={url}>{name}</Link>
    {children}
  </nav>
);

export default NavItem;
