
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IpReputationSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IpReputationSDK.test()
    equal(null !== testsdk, true)
  })

})
