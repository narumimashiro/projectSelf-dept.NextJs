import Link from "next/link";
import { ReactNode } from "react";
import styles from './NavBar.module.sass'

interface Props {
  children: ReactNode;
}

const NavBar = ({ children }: Props) => {
  return (
    <>
      <nav className={styles.container}>
        <div className={styles["to-top"]}>
          <Link href="/">Top</Link>
        </div>
        <div className={styles["nav-cont"]}>
          <li><Link href="/sample/sample">Navi1</Link></li>
          <li><Link href="/">Navi2</Link></li>
          <li><Link href="/">Navi3</Link></li>
          <li><Link href="/">Navi4</Link></li>
          <li><Link href="/">Navi5</Link></li>
        </div>
      </nav>
      { children }
    </>
  )
}
export default NavBar;