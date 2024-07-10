import { Express, NextFunction, Request, Response, json } from 'express'

export const jsonMiddleware = (app: Express): any => {
  return (req: Request, res: Response, next: NextFunction): any => {
    try {
      json()(req, res, next)
    } catch (error) {
      next(error)
    }
    app.use((err: SyntaxError, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof SyntaxError && 'body' in err) {
        const error: {status: number} = err as any
        return res.status(error.status).json({ error: 'Invalid JSON' })
      }
      next()
    })
  }
}
