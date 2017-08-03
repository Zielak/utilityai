export { default as CharacterContext } from './characterContext'
import './constructor'
import Character from './character'
import Timer from '../src/timer'

const characters = []
const updateTimer = new Timer({
  time: 250,
  repeat: true,
  onFinished: updateGameLoop
})

for(let i=0; i<=1; i++){
  const char = new Character(`Dude ${i}`)

  // Decision maker stuff

  characters.push(char)
}

const updateGameLoop = passedTime => {
  characters.forEach(char => {
    char.update()
    console.log(char.toString())
  })
}
