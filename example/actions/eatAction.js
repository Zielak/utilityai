import ai from '../../src/index'
import CharacterContext from '../characterContext'

export default class EatAction extends ai.Action {

  constructor() {
    super({ name: 'Eat' })
  }

  /**
   * @param {CharacterContext} context 
   * @memberof EatAction
   */
  onExecute(context) {
    context.hunger -= 50
    context.energy += 35
    this.succeed(context)
  }

}
