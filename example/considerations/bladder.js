import ai from '../../src/index'
import CharacterContext from '../characterContext'

export default class Bladder extends ai.Consideration {

  constructor(){
    super({name: 'Bladder'})

    this.evaluator = new ai.LineEvaluator({
      xa: 0.5, xb: 1,
      ya: 0.05, yb: 1
    })
  }

  /**
   * @param {CharacterContext} context 
   * @memberof Bladder
   */
  consider(context){
    this.setUtility(this.evaluator.evaluate(context.bladder))
  }

}
