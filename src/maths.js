
export default {
  clamp: (val,min=0,max=1) => Math.max(min,Math.min(max,val)),
  clampPositive: (val) => Math.max(0, val),
  clampNegative: (val) => Math.min(val, 0),
}
