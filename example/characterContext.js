
export default class CharacterContext {
  constructor(character) {
    
    // Private stuff
    this._ = {
      character: character,
      energy: 100,
      hunger: 0,
      thirst: 0,
      bladder: 0,
      happiness: 50,
    }
    
  }
  
  get character(){ return this._.character }
  
  get hunger(){ return this._.hunger }
  set hunger(v){
    this._.hunger = Math.max(0, Math.min(100, v))
  }
  
  get energy(){ return this._.energy }
  set energy(v){
    this._.energy = Math.max(0, Math.min(100, v))
  }
  
  get thirst(){ return this._.thirst }
  set thirst(v){
    this._.thirst = Math.max(0, Math.min(100, v))
  }
  
  get bladder(){ return this._.bladder }
  set bladder(v){
    this._.bladder = Math.max(0, Math.min(100, v))
  }
  
  get happiness(){ return this._.happiness }
  set happiness(v){
    this._.happiness = Math.max(0, Math.min(100, v))
  }
  
}
