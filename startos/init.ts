import { sdk } from './sdk'
import { exposedStore, initStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { configJson } from './file-models/config.json'
import { selectNode } from './actions/selectNode'
import {
  spectrumNodeDefaultConfig,
  spectrumNodeJson,
} from './file-models/spectrum_node.json'
import {
  bitcoinCoreDefaultConfig,
  bitcoinCoreJson,
} from './file-models/bitcoin_core.json'

// **** PreInstall ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {
  await bitcoinCoreJson.write(effects, bitcoinCoreDefaultConfig)
  await spectrumNodeJson.write(effects, spectrumNodeDefaultConfig)
})

// **** PostInstall ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'specter' },
    sdk.Mounts.of().addVolume('main', null, '/root', false),
    'specter-init',
    async (sub) => {
      await sub.spawn([
        'python3',
        '-m',
        'cryptoadvance.specter',
        'server',
        '--host',
        '0.0.0.0',
      ])

      let cfgExists = false
      for (let i = 0; i < 10 && !cfgExists; i++) {
        await new Promise((resolve) => setTimeout(resolve, 4000))
        cfgExists = !!(await configJson.read.once())
        if (cfgExists) break
      }
      if (!cfgExists) throw new Error('Failed to initialize Specter')
    },
  )

  await sdk.action.requestOwn(effects, selectNode, 'critical', {
    reason:
      'Decide whether Specter will use Bitcoin or electrs. This can be changed later.',
  })
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  initStore,
  exposedStore,
)
