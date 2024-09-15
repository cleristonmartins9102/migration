import moduleAlias from 'module-alias'
moduleAlias.addAlias('@', __dirname + '/../../src')

import { PubAdapter } from '@/migrations/sub-adapter'
import { createApp } from './config/app'

const port = 5050

createApp().then(app => {
  app.listen(port, () => { console.log(`Running on ${port}`) })
})

const main = async () => {
  PubAdapter.Subscriber.messageOnCreatedTopic()
  PubAdapter.Subscriber.messageOnUpdatedTopic()
  PubAdapter.Subscriber.messageOnRemovedTopic()
  console.log('Listening Topics')
}

main().catch(err => console.log(err))