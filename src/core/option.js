
const options = new Map()

export default class Option {

  constructor({ uniqueName, action = null }) {
    if (options.has(uniqueName)) {
      throw `Option called '${uniqueName} already exists`
    }

    this.uniqueName = uniqueName

    this.action = action
    this.weight = 1

    this.considerations = new Map()
  }

  get action() { return this._action }
  set action(v) { this._action = v }

  addConsideration(consideration) {
    // TODO: add consideration by their uniqueName
    if (this.considerations.has(consideration.uniqueName)) {
      throw `This option already has '${consideration.uniqueName}' consideration`
    }
    this.considerations.set(consideration.uniqueName, consideration)
  }

  /**
   * Calculate the utility of this option using all considerations
   * 
   * @param {any} context 
   * @returns {array<Utility>} array of utilities
   * @memberof Option
   */
  consider(context) {
    if (this.considerations.size === 0) return
    const utilities = this.considerations.map(el => {
      return el.consider(context)
    })
    return utilities
  }

  // STATIC

  /**
   * Find an instance of Option by its name
   * 
   * @static
   * @param {string} name unique name of an option
   * @returns {Option} or undefined if not found
   * @memberof Option
   */
  static get(name) {
    return options.get(name)
  }

}