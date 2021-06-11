import { fromBase64Url } from './base64'

export type PointerEntry = [string, number]
export type PointerList = PointerEntry[]

export function pickPointer(pointers: PointerList): string {
  const sum = pointers.reduce((sum, entry) => sum + entry[1], 0)
  let choice = Math.random() * sum

  for (const pointer of pointers) {
    const weight = pointer[1]
    if ((choice -= weight) <= 0) {
      return pointer[0]
    }
  }

  // this should never get reached
  throw new Error('unable to choose pointer; drew invalid value')
}

export function resolvePointer(pointer: string): string {
  if (!pointer.startsWith('$')) {
    return pointer
  }

  const url = new URL('https://' + pointer.substring(1))
  if (url.pathname === '/') {
    url.pathname = '/.well-known/pay'
  }

  return url.href
}

export function parsePointerMap(path: string): PointerList {
  const pointerListB64 = path.split('/').pop()

  if (!pointerListB64) {
    throw new Error('request does not include pointer list')
  }

  const pointerListJson = fromBase64Url(pointerListB64)
  const pointerList = JSON.parse(pointerListJson)

  if (!Array.isArray(pointerList)) {
    throw new TypeError('pointer list must be array')
  }

  for (const entry of pointerList) {
    if (typeof entry[0] !== 'string') {
      throw new TypeError('pointers must be strings')
    }
    if (typeof entry[1] !== 'number') {
      throw new TypeError('pointer weights must be numbers')
    }
  }

  return pointerList as PointerList
}
