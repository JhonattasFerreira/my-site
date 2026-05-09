import styles from "./NavItem.module.css";
import Link from "next/link";
import type { NavItemData } from "@/types";

type Props = {
  item: NavItemData;
  children?: React.ReactNode;
};

const NavItem = ({ item: { url, name }, children }: Props) => (
  <nav className={styles.nav}>
    <Link href={url}>{name}</Link>
    {children}
  </nav>
);

export default NavItem;
