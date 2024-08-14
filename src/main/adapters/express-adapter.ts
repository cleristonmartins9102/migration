import { type Controller } from '@/application/contract'
import { type Response, type NextFunction, type Request, type RequestHandler } from 'express'

export const expressAdapter = (controller: Controller<unknown, unknown>): (req: Request, res: Response, next: NextFunction | undefined) => Promise<void> => {
  return async (req: Request, res: Response, next: NextFunction | undefined): Promise<void> => {
    const { body, params, headers } = req

    const controllerResponse = await controller.handler({ body, params, contentType: headers['content-type'] })
    res.status(controllerResponse.statusCode).json(controllerResponse.body)
  }
}
