import UAParser from 'ua-parser-js'

export const generateDeepLink = (type = '', link = '') => {
  switch (type) {
    case 'instagram': {
      return {
        // instagram
        // id
        'deep-link': 'instagram://user?username=' + link,
        'deep-link-ad': 'intent://www.instagram.com/' + link + '#Intent;package=com.instagram.android;scheme=https;end/',
        url: 'https://instagram.com/' + link
      }
    }
    case 'telegram': {
      if (!link.includes('/joinchat/')) {
        // telegram
        // id
        const telegramId = link.replace(/(http(s)?:\/\/)?t\.me\/(joinchat\/)?/g, '')
        return {
          'deep-link': 'tg://resolve?domain=' + telegramId,
          'deep-link-ad': 'tg://resolve?domain=' + telegramId,
          url: 't.me/' + telegramId
        }
      }
      break
    }
    case 'twitter': {
      // twitter
      // id
      return {
        'deep-link': 'twitter://user?screen_name=' + link,
        'deep-link-ad': 'intent://twitter.com/' + link + '#Intent;package=com.twitter.android;scheme=https;end',
        url: 'twitter.com/' + link
      }
    }
    case 'youtube': {
      const youtubeId = link.replace(/(?:(http(?:s?):\/\/)?)(?:(www\.)?)youtube\.com\/(watch|channel\/|c\/)(\?v=|)/g, '')
      if (link.includes('/watch?')) {
        // video youtube
        // https://www.youtube.com/watch?v=yl9OGLMxI8E
        return {
          'deep-link': 'vnd.youtube://' + youtubeId,
          'deep-link-ad': 'intent://www.youtube.com/watch?v=' + youtubeId + '#Intent;package=com.google.android.youtube;scheme=https;end',
          url: link
        }
      } else if (link.includes('/channel/') || link.includes('/c/')) {
        // channel youtube
        // https://www.youtube.com/channel/UCa20QQoV4gaLv9XRki-ynWQ
        return {
          'deep-link': 'vnd.youtube://www.youtube.com/channel/' + youtubeId,
          'deep-link-ad': 'intent://www.youtube.com/channel/' + youtubeId + '#Intent;package=com.google.android.youtube;scheme=https;end',
          url: link
        }
      }
      break
    }
    case 'tiktok': {
      // tiktok
      // id
      return {
        url: 'https://tiktok.com/@' + link.replace(/@/g, '')
      }
    }

    case 'whatsapp':
      return {
        'deep-link': 'whatsapp://send?phone=+98' + link.substring(1),
        'deep-link-ad': 'intent://send/+98' + link.substring(1) + '#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end',
        url: 'https://wa.me/+98' + link.substring(1)
      }

    case 'browser':
      return {
        'deep-link': 'safari-https://' + link.substring,
        'deep-link-ad': 'intent://' + link.substring + '#Intent;scheme=http;package=com.android.chrome;end',
        url: link
      }
  }

  return {
    // default
    url: link
  }
}

const openUrlWithFallback = (t, e) => {
  let i,
    n,
    o,
    s,
    r,
    a = document.querySelector('#launcher'),
    l = -1 != window.navigator.userAgent.indexOf('Safari/'),
    c = (window.navigator.userAgent.indexOf('Chrome/'), -1 != window.navigator.userAgent.indexOf('Mobile/')),
    d = -1 != window.navigator.userAgent.indexOf('Instagram'),
    u = (l || d) && c
  a || (((a = document.createElement('iframe')).id = 'launcher'), (a.style.display = 'none'), document.body.appendChild(a)),
    e &&
      ((i = Date.now()),
      (n = !0),
      (o = setTimeout(() => {
        window.top.location = t
      }, 300)),
      (s = setTimeout(() => {
        ;(!u && (1250 < Date.now() - i || !n)) || (window.top.location = e)
      }, 1200)),
      u ||
        ((r = function t() {
          ;(n = !1), clearTimeout(o), clearTimeout(s), window.removeEventListener('blur', t, !1), window.removeEventListener('pagehide', t, !1)
        }),
        window.addEventListener('blur', r, !1),
        window.addEventListener('pagehide', r, !1))),
    (a.src = t)
}

const onDeepLink = (type, link) => {
  const urls = generateDeepLink(type, link)
  if (typeof window !== 'undefined') {
    const os = new UAParser().getOS().name
    if (urls['deep-link-ad'] && os === 'Android') {
      return {
        url: urls.url,
        onClick: () => {
          openUrlWithFallback(urls['deep-link-ad'], urls.url)
        }
      }
    } else if (urls['deep-link'] && os !== 'Android') {
      return {
        url: urls.url,
        onClick: () => {
          openUrlWithFallback(urls['deep-link'], urls.url)
        }
      }
    }
  }
  return { url: urls.url }
}

export default onDeepLink
