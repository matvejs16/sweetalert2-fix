<<<<<<< HEAD
import execute from '@sweetalert2/execute'
import replaceInFile from 'replace-in-file'

const log = console.log // eslint-disable-line no-console

log('Resetting the branch...')
await execute('git checkout .')

// the command has been called by semantic-release, bump version in src/SweetAlert.js before building dist
if (process.env.VERSION) {
  log('Updating the version in src/SweetAlert.js...')
  replaceInFile.sync({
    files: 'src/SweetAlert.js',
    from: /\.version = '.*?'/,
    to: `.version = '${process.env.VERSION}'`,
  })
  await execute('git add src/SweetAlert.js')
}

log('Running the build...')
await execute('yarn build')

log('OK!')
=======
#!/usr/bin/env zx
import { $, echo, fs } from 'zx'

echo`Resetting the branch...`
await $`git checkout .`
echo``

// the command has been called by semantic-release, bump version in src/SweetAlert.js before building dist
if (process.env.VERSION) {
  echo`Updating the version in src/SweetAlert.js...`
  fs.writeFileSync(
    'src/SweetAlert.js',
    fs.readFileSync('src/SweetAlert.js', 'utf8').replace(/version = '(.*?)'/, `version = '${process.env.VERSION}'`)
  )
  await $`git add src/SweetAlert.js`
  echo``
}

echo`Running the build...`
await $`yarn build`
echo``

echo`OK!`
>>>>>>> upstream/main
