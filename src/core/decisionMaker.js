import Maths from '../maths'
import Action from './action'

const maxRecursions = 100

export default class DecisionMaker {

  constructor(uai, contextProvider, aiScheduler){
    this.state = DecisionMaker.STOPPED

    this._recursionCounter = 0
    this._currentContext = null
  }

  start(){
    if(this.state === DecisionMaker.STOPPED){
      return
    }

    this.state = DecisionMaker.RUNNING
    this.onStart()
  }

  stop(){
    if(this.state === DecisionMaker.STOPPED){
      return
    }
    this.state = DecisionMaker.STOPPED
    this.onStop()
  }

  pause(){
    if(this.state === DecisionMaker.PAUSED){
      return
    }
    this.state = DecisionMaker.PAUSED
    this.onPause()
  }

  resume(){
    if(this.state === DecisionMaker.RESUMED){
      return
    }
    this.state = DecisionMaker.RESUMED
    this.onResume()
  }

  think(){
    if(this.actionStillRunning){
      return
    }
  }

  get actionStillRunning(){
    return this.currentAction.status === Action.RUNNING
  }
  get couldNotUpdateContext(){
    this._recursionCounter = 0
    this._currentContext = this.context
  }

  static get STOPPED(){ return 0 }
  static get RUNNING(){ return 1 }
  static get PAUSED(){ return 2 }
}