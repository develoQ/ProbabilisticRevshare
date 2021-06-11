export function fromBase64Url(b64: string) {
  return Buffer.from(b64, 'base64').toString()
}
