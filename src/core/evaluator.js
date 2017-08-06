import Utility from './utility'

export default class Evaluator {

  /**
   * Creates an instance of Evaluator.
   * It's a math function which will return Y value when given X.
   * Used in Considerations.
   * 
   * @param {number} params.xa
   * @param {number} params.xb
   * @param {number} params.ya
   * @param {number} params.yb
   * @memberof Evaluator
   */
  constructor({xa=0, xb=1, ya=0, yb=1}){
    this.xa = xa
    this.xb = xb
    this.ya = ya
    this.yb = yb
  }

  get minX(){ return this.xa }
  get maxX(){ return this.xb }
  get minY(){ return Math.min(this.minY, this.maxY) }
  get maxY(){ return Math.max(this.minY, this.maxY) }

  /**
   * Override this. Returns the value for specified X
   * 
   * @param {number} x 
   * @returns {Utility}
   * @memberof Evaluator
   */
  evaluate(x){
    return new Utility(0, 0)
  }

}