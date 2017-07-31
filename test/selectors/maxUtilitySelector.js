import test from 'ava'
import MaxUtilitySelector from '../../src/selectors/maxUtilitySelector'
import Utility from '../../src/core/utility'

test.beforeEach(t => {
  t.context.selector = new MaxUtilitySelector()
})

test('select with no utilities', t => {
  const utilities = new Map()
  t.is(t.context.selector.select(utilities), null, `didn't return null`)
})

test('select with one utility', t => {
  const utilities = new Map()
  utilities.set('the only one', new Utility({value: 0.7}))
  t.is(t.context.selector.select(utilities), 'the only one')
})

test('select with some utilities', t => {
  const utilities = new Map()
  utilities.set('third', new Utility({value: 0.5}))
  utilities.set('best', new Utility({value: 1}))
  utilities.set('last', new Utility({value: 0.2}))
  utilities.set('second', new Utility({value: 0.7}))
  t.is(t.context.selector.select(utilities), 'best')
})
