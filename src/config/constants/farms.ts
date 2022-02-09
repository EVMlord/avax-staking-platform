import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [ 
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 1,
    lpSymbol: 'KRL-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x4d19Dbc2686011B593902AA3Ee26e3a7203fc453',
    },
    token: serializedTokens.krl,
    quoteToken: serializedTokens.busd,
  }
]

export default farms
