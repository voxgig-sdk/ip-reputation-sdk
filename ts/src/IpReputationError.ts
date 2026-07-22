
import { Context } from './Context'


class IpReputationError extends Error {

  isIpReputationError = true

  sdk = 'IpReputation'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  IpReputationError
}

