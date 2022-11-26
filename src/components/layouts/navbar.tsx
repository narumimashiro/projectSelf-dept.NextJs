import Link from "next/link";
import { ReactNode } from "react";
import styles from './Navbar.module.sass'

// todo delete
import FooterMiku from './FooterMiku'

interface Props {
  children: ReactNode;
}

const Navbar = ({ children }: Props) => {
  return (
    <div>
      <nav className={styles.container}>
        <div className={styles["to-top"]}>
          <Link href="/">Top</Link>
        </div>
        <div className={styles["nav-cont"]}>
          <li><Link href="/main/profile">Profile</Link></li>
          <li><Link href="/main/news">News</Link></li>
          <li><Link href="https://pjsekai.sega.jp/" target="_blank">prsk</Link></li>
          <li><Link href="https://genshin.hoyoverse.com/ja" target="_blank">Genshin</Link></li>
          <li><Link href="https://playvalorant.com/ja-jp/?utm_source=riotbar&utm_medium=productcard%2Bplayvalorant.com&utm_campaign=val&utm_content=ep5act1" target="_blank">Valorant</Link></li>
        </div>
      </nav>
      { children }
    </div>
  )
}
export default Navbar;