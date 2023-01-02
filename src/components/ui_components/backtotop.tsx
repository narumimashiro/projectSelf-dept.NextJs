const BackToTop = () => {

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="fixed w-12 h-12 right-6 bottom-6 opacity-20 hover:opacity-100 hover:animate-bounce"
         onClick={backToTop}>
      <span className="btt-line -rotate-45  translate-x-1.5  translate-y-1"></span>
      <span className="btt-line  rotate-45 -translate-x-1    translate-y-1"></span>
      <span className="btt-line -rotate-45  translate-x-1.5 -translate-y-1"></span>
      <span className="btt-line  rotate-45 -translate-x-1   -translate-y-1"></span>
    </div>
  )
}
export default BackToTop