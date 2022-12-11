import Link from "next/link";
import { ReactNode } from "react";
import styles from './NavBar.module.sass'

// todo delete
import MikuFooter from './mikufooter'

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
          <li><Link href="/narunaru/profile">Profile</Link></li>
          <li><Link href="/narunaru/news">News</Link></li>
          <li><Link href="https://pjsekai.sega.jp/" target="_blank">prsk</Link></li>
          <li><Link href="https://genshin.hoyoverse.com/ja" target="_blank">Genshin</Link></li>
          <li><Link href="https://playvalorant.com/ja-jp/?utm_source=riotbar&utm_medium=productcard%2Bplayvalorant.com&utm_campaign=val&utm_content=ep5act1" target="_blank">Valorant</Link></li>
        </div>
      </nav>
      { children }
    </>
  )
}
export default NavBar;