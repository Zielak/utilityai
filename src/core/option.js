
export default class Option {

  constructor({action = null}){
    this.action = action
    this.weight = 1
    
    this.considerations = new Map()
  }

  get action(){ return this._action }
  set action(v) { this._action = v }

  addConsideration(consideration){
    if(this.considerations.has(consideration.uniqueName)){
      throw `This option already has '${consideration.uniqueName}' consideration`
    }
    this.considerations.push(consideration)
  }

  consider(context){
    if(this.considerations.size === 0) return
    
  }

}