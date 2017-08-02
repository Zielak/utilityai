import Maths from '../maths'

/**
 * This class represents the utility of given behavior, option or consideration
 * 
 * @export
 * @class Utility
 */
export default class Utility {

  constructor(value, weight = 1) {
    this.value = value
    this.weight = weight
  }

  get value() {
    return this._value
  }
  set value(v) {
    this._value = Maths.clamp(v, 0, 1)
  }

  get weight() {
    return this._weight
  }
  set weight(v) {
    this._weight = Maths.clamp(v, 0, 1)
  }

  /**
   * Returns the value*weight of this Utility.
   * 
   * @readonly
   * @memberof Utility
   */
  get combined() {
    return this.value * this.weight
  }

  get isZero() {
    return this.combined === 0
  }
  get isOne() {
    return this.combined === 1
  }

  equals(other) {
    return this.value === other.value && this.weight === other.weight
  }
}