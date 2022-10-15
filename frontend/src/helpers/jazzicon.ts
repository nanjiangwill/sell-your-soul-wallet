import Jazzicon from '@raugfer/jazzicon'

export const buildJazziconDataUrl = (address: string) => {
  return 'data:image/svg+xml;base64,' + window.btoa(Jazzicon(address))
}
