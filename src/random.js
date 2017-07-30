const Random = {
  float: (min, max) => {
    const diff = Math.abs(max - min)
    return Math.random()*diff + min
  },
  int: (min, max) => {
    return Math.round(Random.float(min, max))
  }
}

export default Random
