# Utility AI

Inspired by [CrystalAI](https://github.com/igiagkiozis/CrystalAI), implemented in C# for Unity.

## AI



## Decision maker

Every agent should have at least one of those.

## Behavior

Set of options to do in a given scenario. A behavior can be for example "things to do in a bar", "things to do in a bathroom". Once character enters bathroom action "order a drink" doesn't make sense, so it's useful to disable whole behaviour depending on the context.

## Option

Option contains one Action and one or more Considerations. An Action is considered viable to execute when all of the considerations "win" over other options in a given behaviour group.

## Consideration

Given the context (prepared by you) calculate (with methods provided by you) how well will an option linked with this consideration perform.

## Evaluator

Is basically a math function (TODO: or composite of functions) which can be used to determine  

## Utility

Represents the value of usefullness. This coulnd be represented simply by a `number` type TODO: write why it's useful to have utility.
