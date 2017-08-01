import Timer from '../timer'
import Random from '../random'

export default class Agent {

  /**
   * Creates an instance of Agent.
   *
   * @param {object} params
   * @param {object} [params.behaviours]
   * @param {object} [params.decisionUpdateRateMin]
   * @param {object} [params.decisionUpdateRateMax]
   * @memberof Agent
   */
  constructor({
    behaviours = new Map(),
    decisionUpdateRateMin = 1000,
    decisionUpdateRateMax = 1500
  } = {}) {
    this.behaviours = behaviours
    this.decisionUpdateRateMin = decisionUpdateRateMin
    this.decisionUpdateRateMax = decisionUpdateRateMax

    this._decisionUpdateTimer = new Timer({
      time: this.decisionUpdateRate,
      repeat: true,
      onFinished: (passedTime, timer) => {
        timer.time = Random.float(
          this.decisionUpdateRateMin,
          this.decisionUpdateRateMax
        )
        this.update(passedTime)
      }
    })
  }

  /**
   * Get currently running action or `null`
   * 
   * @readonly
   * @memberof Agent
   */
  get currentAction() {
    return this._currentAction
  }
  
  // TODO: add stuff from DecisionMaker

  update() { }

}