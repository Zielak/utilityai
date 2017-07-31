import Maths from '../maths'

export default class Consideration {

  constructor({uniqueName, weight = 1} = {}){
    this.uniqueName = uniqueName
    this.weight = weight
    this.utility
    // TODO: did I miss something?
  }

  get weight(){
    return this._weight
  }
  set weight(v){
    Maths.clamp(v, 0, 1)
  }

  
  consider(context){ }

}