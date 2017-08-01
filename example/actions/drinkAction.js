import ai from '../../src/index'
import CharacterContext from '../characterContext'

export default class DrinkAction extends ai.Action {

  constructor() {
    super({ name: 'Drink' })
  }

  /**
   * @param {CharacterContext} context 
   * @memberof EatAction
   */
  onExecute(context) {
    context.thirst -= 50
    context.energy += 20
    this.succeed(context)
  }

}
