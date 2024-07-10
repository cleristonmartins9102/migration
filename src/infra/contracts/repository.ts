export abstract class Repository {
  toJson<R> (): R {
    return JSON.parse(JSON.stringify(this))
  }
}
