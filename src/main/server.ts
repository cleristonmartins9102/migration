import moduleAlias from 'module-alias'

moduleAlias.addAlias('@', __dirname + '/../../src')

import { createApp } from './config/app'

const port = 5050

createApp().then(app => {
  app.listen(port, () => { console.log(`Running on ${port}`) })
})
