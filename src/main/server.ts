/* eslint-disable node/no-path-concat */
/* eslint-disable import/first */
import moduleAlias from 'module-alias'

moduleAlias.addAlias('@', __dirname + '/../../src')

import { App } from './config/app'

const port = 5050

const app = App()
export const runnedApp = app.listen(port, () => { console.log(`Running on ${port}`) })
