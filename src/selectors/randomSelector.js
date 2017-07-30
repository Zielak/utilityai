import Selector from '../core/selector'

/**
 * Selects random utility
 * 
 * @export
 * @param {Map<Utilitiy>} utilities 
 * @returns {string} uniqueName of the best choice
 */
export default class RandomSelector extends Selector {

  select(utilities) {
    super.select(utilities)

    // FIXME: random plz
    return utilities.keys[0]
  }
}