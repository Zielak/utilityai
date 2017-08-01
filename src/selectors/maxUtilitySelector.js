import Selector from '../core/selector'

/**
 * Selects an utility with heighest score
 * 
 * @export
 * @param {Map<Utilitiy>} utilities 
 * @returns {string} name of the best choice
 */
export default class MaxUtilitySelector extends Selector{

  select(utilities){
    super.select(utilities)
    let maxUtil = 0
    let selected = null

    utilities.forEach((utility, key) => {
      if(utility.combined > maxUtil){
        maxUtil = utility.combined
        selected = key
      }
    })

    return selected
  }
}