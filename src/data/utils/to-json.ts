export abstract class ToJson {
  toJson <R>(): R {
    return JSON.parse(JSON.stringify(this))
  }
}
