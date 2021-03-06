
export default class Selector {

  /**
   * Override this and call `super.select(utilities)`.
   * This function will sanitize the results.
   * 
   * @param {Map<Utility>} utilities 
   * @memberof Selector
   */
  select(utilities){
    // Fail when there's no utilities
    if(utilities.size === 0) {
      this.selected = null
    }
    
    // Pick first if it has only one utiliy
    if(utilities.size === 1) {
      this.selected = utilities.keys[0]
    }

    // TODO: add typ checks here? or is that dev's problem?
  }

}