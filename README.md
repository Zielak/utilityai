# Utility AI

Inspired by [CrystalAI](https://github.com/igiagkiozis/CrystalAI), implemented in C# for Unity.

## Behavior

Set of options to do in a given scenario. A behavior can be for example "things to do in a bar", "things to do in a bathroom". Once character enters bathroom action "order a drink" doesn't make sense, so it's useful to disable whole behaviour depensing on the context.

## Option

Option contains one Action and one or more Considerations. An Action is considered viable to execute when all of the considerations "win" over other options in a given behaviour group.

## Consideration



## Update loop

1. Decision making loop

- update all timers
- 