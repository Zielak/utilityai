
export default class Selector {

  /**
   * Override this.
   * TODO: Does it need to be a class?
   * 
   * @param {any} utilities 
   * @memberof Selector
   */
  select(utilities){
    // Fail when there's no utilities
    if(utilities.size === 0) return -1
    
    // Pick first if it has only one utiliy
    if(utilities.size === 1) return 0
  }

}