
export default class Agent {

  constructor({actions = []}){
    this.actions = actions
  }

  get currentAction(){
    return this._currentAction
  }

}