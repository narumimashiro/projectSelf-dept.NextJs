import Link from "next/link";
import { ReactNode } from "react";
import styles from '@/styles/components/NavBar.module.sass'

interface Props {
  children: ReactNode;
}

const NavBar = ({ children }: Props) => {
  return (
    <>
    <div className={styles.navbar}>
      <nav className="flex absolute w-full h-20 justify-between top-0 left-0">
        <div>
          <Link href="/">
            <img className="h-full"
                 src="/images/projectSelf.png"
                 alt="projectSelf"/>
          </Link>
        </div>
        <div className="flex mr-5">
          <li><Link href="/narunaru/profile">Profile</Link></li>
          <li><Link href="/narunaru/note">Note</Link></li>
        </div>
      </nav>
    </div>
    { children }
    </>
  )
}
export default NavBar