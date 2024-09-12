import { ProxyError } from '@/application/errors'
import sm from '@adamsfoodservice/shared-modules'

export class NotificationApi {
  async populateEmailTemplateAndSend (params: { templateId: string, data: Record<string, any> }): Promise<void> {
    const axiosAdapter = new sm.Api.Http.AxiosAdapter()
    const httpResponse = await axiosAdapter.request({ method: 'post' as any, url: `${process.env.NOTIFICATION_API}/populate-send/email/${params.templateId}`, data: params.data }, { Authorization: process.env.TOKEN, 'refresh-token': process.env.REFRESH_TOKEN })
    if (httpResponse.statusCode !== 200) {
      throw new ProxyError('Notification', httpResponse.statusCode, httpResponse.body as string)
    }
  }
}