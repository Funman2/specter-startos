import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'specter',
  title: 'Specter',
  license: 'mit',
  wrapperRepo: 'https://github.com/Alex71btc/specter-startos',
  upstreamRepo: 'https://github.com/cryptoadvance/specter-desktop',
  supportSite: 'https://github.com/cryptoadvance/specter-desktop/issues',
  marketingSite: 'https://specter.solutions',
  donationUrl: null,
  description: {
    short:
      'A user-friendly web GUI for Bitcoin Core with a focus on multisignature setup using hardware wallets and airgapped devices.',
    long: 'Bitcoin Core has a very powerful command line interface and a wonderful daemon. Using PSBT and HWI it also works great with hardware wallets, but at the moment this is beyond most users. The same applies to multisignature setups. The goal of this project is to make a convenient and user-friendly GUI around Bitcoin Core with a focus on multisignature setup with hardware wallets and airgapped devices.',
  },
  volumes: ['main'],
  images: {
    specter: {
      source: {
        dockerTag: 'lncm/specter-desktop:v2.1.1',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    bitcoind: {
      optional: true,
      description:
        'Needed if you want to connect Specter to your StartOS Bitcoin node.',
      s9pk: 'https://github.com/Start9Labs/bitcoind-startos/releases/download/v28.1.0.0-alpha.2/bitcoind.s9pk',
    },
    electrs: {
      optional: true,
      description:
        'Needed if you want to connect Specter to your StartOS electrs server',
      s9pk: 'https://github.com/Start9Labs/bitcoind-startos/releases/download/v28.1.0.0-alpha.2/bitcoind.s9pk',
    },
  },
})
