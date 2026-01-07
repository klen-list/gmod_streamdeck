const { Plugins, Actions, log } = require('./utils/plugin')
import got from 'got'

const plugin = new Plugins()

plugin.concmd = new Actions({
    default: {},
    _willAppear({ context, payload }) {
        //log.info("willAppear: ", context, payload)
    },
    _willDisappear({ context }) {
        //log.info('willDisAppear', context)
    },
    _propertyInspectorDidAppear({ context }) {
    },
    sendToPlugin({ payload, context }) {
        //log.info('sendToPlugin', payload, context)
    },
    keyUp({ context, payload }) {
        //log.info('keyUp', payload, context)
        got.post('http://127.0.0.1:35428/concmd', {
            json: {
                cmd: payload.settings?.cmd || 'echo "Hello from steamdock!"'
            }
        })
    },
    dialDown({ context, payload }) {},
    dialRotate({ context, payload }) {}
})