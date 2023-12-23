// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

/**
 * 创建本地缓存对象
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */

export default class Storage {
  private storage: globalThis.Storage
  private prefixKey?: string

  constructor(prefixKey = '', storage = localStorage) {
    this.storage = storage
    this.prefixKey = prefixKey
  }
  getKey(key: string) {
    return `${this.prefixKey}${key}`.toLowerCase()
  }

  get(key: string, def: any = null) {
    const item = this.storage.getItem(this.getKey(key))
    if (item) {
      try {
        const data = JSON.parse(item)
        const { value, expire } = data
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value
        }
        this.remove(key)
      } catch (e) {
        return def
      }
    }
    return def
  }

  set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
    const stringData = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  clear(): void {
    this.storage.clear()
  }
}

export const storage = new Storage('')
