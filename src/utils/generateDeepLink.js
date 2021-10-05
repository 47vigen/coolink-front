const generateDeepLink = (type, link) => {
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
  }

  return {
    // default
    url: link
  }
}

export default generateDeepLink
