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
