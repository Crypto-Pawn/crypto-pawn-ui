export function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

export function isMetaMaskWebView() {
  return Boolean((window as any).ethereum?.isMetaMask && (window as any).ethereum?.isMetaMaskInAppBrowser);
}
