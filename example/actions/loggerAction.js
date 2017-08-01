import * as ai from '../app'

export default class LoggerAction extends ai.Action {
  
  constructor({name = 'Logger', message = 'noop'}) {
    super({ name })
    
    this.message = message
  }
  
  onExecute(context) {
    context.console.log('Logger: ', this.message)
    this.succeed(context)
  }
  
}
