import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLine, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { useRecoilValue } from 'recoil'
import { pageInfo, hashTag } from '@/recoil/siteinfo/siteinfo'
import type { PageInfo } from '@/recoil/siteinfo/types'

interface PageParams {
  pageParams: PageInfo
}
function ShareTweet(props: PageParams) {
  const twitterUrl = new URL('https://twitter.com/intent/tweet')
  const tag = useRecoilValue(hashTag)
  twitterUrl.searchParams.set('text', props.pageParams.title)
  twitterUrl.searchParams.set('url', props.pageParams.url)
  twitterUrl.searchParams.set('hashtags', tag.hashtag)
  
  return (
    <Link href={twitterUrl.toString()}
          target='_blank'
          rel='noopenner noreferrer'
    >
      <FontAwesomeIcon icon={faTwitter} className="fa-2xl mr-2 ml-2 duration-700 transition-all hover:scale-125" />
    </Link>
  )
}

function ShareLine(props: PageParams) {
  const lineUrl = new URL('https://social-plugins.line.me/lineit/share')
  lineUrl.searchParams.set('text', props.pageParams.title)
  lineUrl.searchParams.set('url', props.pageParams.url)

  return (
    <Link href={lineUrl.toString()}
          target='_blank'
          rel='noopenner noreferrer'
    >
      <FontAwesomeIcon icon={faLine} className="fa-2xl mr-2 ml-2 duration-700 transition-all hover:scale-125"/>
    </Link>

  )
}

function ShareFacebook(props: PageParams) {
  const faceboolUrl = new URL('http://www.facebook.com/share.php')
  faceboolUrl.searchParams.set('u', props.pageParams.url)

  return (
    <Link href={faceboolUrl.toString()}
          target='_blank'
          rel='noopenner noreferrer'
    >
      <FontAwesomeIcon icon={faFacebookF} className="fa-2xl mr-2 ml-2 duration-700 transition-all hover:scale-125"/>
    </Link>
  )
}

const ShareFooter = () => {

  const pageData = useRecoilValue(pageInfo)

  return (
    <div className="flex justify-center items-center w-full h-24">
      <ShareTweet pageParams={pageData}/>
      <ShareLine pageParams={pageData}/>
      <ShareFacebook pageParams={pageData}/>
    </div>
  )
}
export default ShareFooter