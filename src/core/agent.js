import Timer from '../timer'
import Random from '../random'

export default class Agent {

  constructor({
    behaviours = new Map(),
    decisionUpdateRateMin = 1000,
    decisionUpdateRateMax = 1500
  }) {
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

  get currentAction() {
    return this._currentAction
  }

  update()

}