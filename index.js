const core = require('@actions/core')
const exec = require('@actions/exec')
const cache = require('@actions/cache')
const os = require('os')
const shell = require('shelljs');

try {
  main()
} catch (error) {
  core.setFailed(error.message)
}

async function installXcodegen () {
  const xcodegenDir = os.homedir() + '/setup-xcodegen/'
  const xcodegenDirBin = os.homedir() + '/setup-xcodegen-bin/'
  const cacheKey = 'setup-xcodegen-cache-key'

  if (core.getInput('enable-cache') === 'true') {
    await cache.restoreCache([xcodegenDirBin], cacheKey)

    if (isXcodegenAvailable()) {
      core.info('🎉 xcodegen available from cache!')
    } else {
      await downloadInstallXcodegen(xcodegenDir, xcodegenDirBin)

      core.info('📦 xcodegen is being added to cache...')
      await cache.saveCache([xcodegenDirBin], cacheKey)
      core.info('✅ xcodegen is cached successfully!')
    }
  } else {
    await downloadInstallXcodegen(xcodegenDir, xcodegenDirBin)
  }

  if (!isXcodegenAvailable()) {
    core.addPath(xcodegenDirBin + '/bin')
  }

  if (!isXcodegenAvailable()) {
    core.setFailed('❌ xcodegen is still not accessible, please contact action maintainers!')
  }
}

function isXcodegenAvailable () {
  return shell.which('xcodegen')
}

async function downloadInstallXcodegen(downloadDir, binDir) {
  core.info('⌛ xcodegen is installing...')

  const zipFile = downloadDir + 'xcodegen.zip'
  const version = core.getInput('version')
  const url = version === 'latest'
    ? 'https://github.com/yonaskolb/XcodeGen/releases/latest/download/xcodegen.zip'
    : `https://github.com/yonaskolb/XcodeGen/releases/download/${version}/xcodegen.zip`
  await exec.exec('curl', [
    '--silent',
    '--create-dirs',
    '--location',
    '--output',
    zipFile,
    url
  ])
  await exec.exec('unzip', ['-q', '-o', zipFile], {cwd: downloadDir})
  await exec.exec('rm', [zipFile])
  await exec.exec('xcodegen/install.sh', [binDir], {cwd: downloadDir})
  await exec.exec('rm -rf', [downloadDir])

  core.info('✅ xcodegen is installed!')
}

async function main () {
  await installXcodegen()
}