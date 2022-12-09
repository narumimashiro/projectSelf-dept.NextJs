import styles from './FooterMiku.module.sass'

const FooterMiku = () => {
  return (
    <div>
      <div className={styles["footer-logo"]}>
        <p>
          <img src="/images/logo_crypton.png" alt="crypton-logo"></img>
        </p>
        <a href="https://piapro.jp/license/pcl/summary" target="_blank">
          <img src="/images/logo_piapro.svg.png" alt="piapro-logo"></img>
        </a>
      </div>
      <div className={styles.copyright}>
        <p>&copy;Colorful Palette Inc.</p>
        <p>/</p>
        <p>&copy;Crypton Future Media, INC. www.piapro.net</p>
      </div>
    </div>
  )
}

export default FooterMiku;