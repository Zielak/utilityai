import Maths from '../maths'
import Action from './action'

const maxRecursions = 100

export default class DecisionMaker {

  constructor(uai, contextProvider, aiScheduler){
    this.state = DecisionMaker.STOPPED

    /**
     * Will hold an action (or null) chosen by `think()`
     */
    this.currentAction = null

    this._recursionCounter = 0

    /**
     * Current context of this AI, will be passed down when selecting an action, and when executing selected action
     */
    this._currentContext = null
  }

  /**
   * Starts this AI, changing status to RUNNING
   * 
   * @memberof DecisionMaker
   */
  start(){
    if(this.state === DecisionMaker.STOPPED){
      return
    }

    this.state = DecisionMaker.RUNNING
    this.onStart()
  }

  /**
   * Stops this AI, changing status to STOPPED
   * 
   * @memberof DecisionMaker
   */
  stop(){
    if(this.state === DecisionMaker.STOPPED){
      return
    }
    this.state = DecisionMaker.STOPPED
    this.onStop()
  }

  /**
   * Pauses this AI, changing status to PAUSED
   * 
   * @memberof DecisionMaker
   */
  pause(){
    if(this.state === DecisionMaker.PAUSED){
      return
    }
    this.state = DecisionMaker.PAUSED
    this.onPause()
  }

  /**
   * Resumes this AI, changing state to RUNNING
   * 
   * @memberof DecisionMaker
   */
  resume(){
    if(this.state === DecisionMaker.RUNNING){
      return
    }
    this.state = DecisionMaker.RUNNING
    this.onResume()
  }

  /**
   * Makes a decision on what next action should be executed
   * 
   * @memberof DecisionMaker
   */
  think(){
    if(this.actionStillRunning){
      return
    }
  }

  /**
   * Updates selected action, if it needs updating.
   * 
   * @memberof DecisionMaker
   */
  update(){

  }

  /**
   * Called after DecisionMaker.start
   * 
   * @memberof DecisionMaker
   */
  onStart(){}

  /**
   * Called after DecisionMaker.stop
   * 
   * @memberof DecisionMaker
   */
  onStop(){}

  /**
   * Called after DecisionMaker.pause
   * 
   * @memberof DecisionMaker
   */
  onPause(){}

  
  /**
   * Called after DecisionMaker.resume
   * 
   * @memberof DecisionMaker
   */
  onResume(){}

  executeCurrentAction(){
    if(this.currentAction !== null){
      this.currentAction.execute(this._currentContext)

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