import Evaluator from '../core/evaluator'
import Maths from '../maths'

export default class LineEvaluator extends Evaluator {

  /**
   * Creates an instance of LineEvaluator.
   * @param {object} params a
   * @param {number} params.xa xa
   * @param {number} params.xb xb
   * @param {number} params.ya ya
   * @param {number} params.yb yb
   * @memberof LineEvaluator
   */
  constructor(params){
    super(params)

    this._dyOverDx = (this.yb - this.ya) / (this.xb - this.xa)
  }

  evaluate(x){
    return Maths.clamp(this.ya + this._dyOverDx * (x - this.xa))
  }

}