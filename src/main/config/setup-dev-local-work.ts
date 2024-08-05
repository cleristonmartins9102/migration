import sm from '@adamsfoodservice/shared-modules'
import path from 'path'

export const setupDevLocalWork = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'local') {
    const jwt = new sm.JwtUtility.JwtAdapter(path.join(__dirname, '../../../credentials.json'))
    const token: string = await jwt.encrypt({ id: '9df2e123-b7b0-4c8a-8489-3434cff42b91', email: 'any@gmail.com', name: 'dev-local', permissions: [{ subject: 'delivery', action: 'create' }, { subject: 'delivery', action: 'update' }, { subject: 'delivery', action: 'read' }, { subject: 'delivery', action: 'delete' }] })
    console.log(`Token for dev local test: ${token}`)
  }
}
