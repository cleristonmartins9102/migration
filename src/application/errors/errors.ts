export abstract class CustomError extends Error {
  parameterName!: string | null
  code!: string
}

export class IsNotStringError extends CustomError {
  constructor (parameterName: string) {
    super('the parameter is not a string')
    this.parameterName = parameterName
    this.name = 'IsNotStringError'
  }
}
export class MemberAlreadyExistsError extends CustomError {
  constructor (user_account_id: string) {
    super(`the member already exists with user_account_id - ${user_account_id}`)
    this.parameterName = user_account_id
    this.name = 'MemberAlreadyExistsError'
  }
}
export class FcmTokenAlreadyExistsError extends CustomError {
  constructor (fcmToken: string) {
    super(`fcm token already exists - ${fcmToken}`)
    this.name = 'FcmTokenAlreadyExistsError'
  }
}


export class PrismaError extends CustomError {
  constructor (error: Error) {
    super(error.message)
    this.name = 'PrismaError'
  }
}
export class IsNotObjectError extends CustomError {
  constructor (parameterName: string) {
    super('the parameter is not an object')
    this.parameterName = parameterName
    this.name = 'IsNotObject'
  }
}
export class IsNotBooleanError extends CustomError {
  constructor (parameterName: string) {
    super('the parameter is not a boolean')
    this.parameterName = parameterName
    this.name = 'IsNotBooleanError'
  }
}

export class RecordNotFoundError extends CustomError {
  constructor (recordName: string, fieldName: string, fieldValue: string) {
    super(`${recordName} was not found with ${fieldName} ${fieldValue}`)
    this.parameterName = fieldValue
    this.name = 'RecordNotFoundError'
  }
}
export class IsNotArrayError extends CustomError {
  constructor (parameterName: string) {
    super('the parameter is not an array')
    this.parameterName = parameterName
    this.name = 'IsNotArrayError'
  }
}

export class IsNotNumberError extends CustomError {
  constructor (parameterName: string) {
    super('the parameter is not a number')
    this.parameterName = parameterName
    this.name = 'IsNotNumberError'
  }
}
export class IsNotNanError extends CustomError {
  constructor (parameterName: string) {
    super('the parameter is not a NaN')
    this.parameterName = parameterName
    this.name = 'IsNotNanError'
  }
}

export class WrongProvidedEmailError extends CustomError {
  constructor (email: string) {
    super(`wrong provided email - ${email}`)
    this.parameterName = 'email'
    this.name = 'WrongProvidedEmailError'
  }
}

export class UserAlreadyExistsError extends CustomError {
  constructor (email: string) {
    super(`the user already exists ${email}`)
    this.parameterName = 'email'
    this.name = 'UserAlreadyExistsError'
  }
}
export class RequiredParameterdError extends CustomError {
  constructor (paramName: string) {
    super('required parameter error')
    this.parameterName = paramName
    this.name = 'RequiredParameterError'
  }
}
export class InvalidContentTypeError extends CustomError {
  constructor (allowedContentTypes: string[]) {
    super(`invalid content type error - ${allowedContentTypes.join(' or ')}`)
    this.name = 'InvalidContentTypeError'
  }
}

export class UnauthorizedError extends CustomError {
  constructor () {
    super('unauthorized')
    this.name = 'UnauthorizedError'
  }
}
export class InvalidTokenError extends CustomError {
  constructor () {
    super('invalid token provided')
    this.name = 'InvalidTokenError'
  }
}

export class TokenNotProvidedError extends CustomError {
  constructor () {
    super('token not provided')
    this.name = 'TokenNotProvidedError'
  }
}

export class MissingJWTSecret extends CustomError {
  constructor () {
    super('missing jwt secret')
    this.parameterName = 'email'
    this.name = 'MissingJwtSecret'
  }
}

export class ProxyError extends CustomError {
  constructor (proxyName: string, errorCode: number, message?: string) {
    super(`the proxy ${proxyName} failed with error ${errorCode}`)
    this.name = 'ProxyError'
    super.message = message ?? `The ${proxyName} has failed with error ${errorCode}`
  }
}
