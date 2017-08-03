import Selector from '../core/selector'

/**
 * Selects an utility with heighest score
 * 
 * @export
 * @param {Map<Utilitiy>} utilities 
 * @returns {string} name of the best choice
 */
export default class MaxUtilitySelector extends Selector {

  select(utilities) {
    super.select(utilities)
    let maxUtil = 0

    if (this.selected === undefined) {
      utilities.forEach((utility, key) => {
        if (utility.combined > maxUtil) {
          maxUtil = utility.combined
          this.selected = key
        }
      })
    }

    return this.selected
  }
}