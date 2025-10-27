import { useEffect } from 'preact/hooks';

function KakaoBrowserEscape() {
  const isIOSAgent = (userAgent: string) => {
    return /iphone|ipad|ipod/i.test(userAgent);
  };

  const isKakaoTalkAgent = (userAgent: string) => {
    return /kakaotalk/i.test(userAgent);
  };

  const openKakaoTalkExternalBrowser = (url: string) => {
    window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(url)}`;
  };

  const closeKakaoTalkBrowser = (userAgent: string) => {
    if (isIOSAgent(userAgent)) {
      window.location.href = 'kakaoweb://closeBrowser';
      return;
    }

    window.location.href = 'kakaotalk://inappbrowser/close';
    return;
  };

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const currentUrl = window.location.href;

    if (isKakaoTalkAgent(userAgent)) {
      openKakaoTalkExternalBrowser(currentUrl);
      setTimeout(() => {
        closeKakaoTalkBrowser(userAgent);
      }, 100);
      return;
    }
  }, []);

  return null;
}

export default KakaoBrowserEscape;
