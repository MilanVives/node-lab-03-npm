# Lab 03: Node Package Manager

Create your own npm package that uses lodash, and publish it to the npm registry.

## Getting started

```bash
npm install
npm test
```

`npm test` runs the same checks as the autograder. Run a single requirement with `npm test -- --test-name-pattern="^R1:"`.

## Requirements

### R1: round2 rounds to two decimals with lodash
**3 points**

Install lodash (`npm install lodash`). In `index.js`, `require('lodash')` and export a function `round2(number)` that rounds to two decimals with `_.round`. `round2(3.14159)` is `3.14`; `round2(1.005)` is `1.01`.

### R2: round0 rounds to a whole number
**2 points**

Export a second function `round0(number)` that rounds to a whole number: `round0(2.5)` is `3`. Export both: `module.exports = { round2, round0 }`.

### R3: package.json describes your package
**3 points**

- Change `"name"` to a name that is still free on [npmjs.com](https://www.npmjs.com), lowercase without spaces (for example `round-<your-name>`).
- `lodash` is listed under `"dependencies"` (`npm install lodash` does this).
- `"main"` is `"index.js"`.

### R4: node_modules is not committed
**2 points**

Create a `.gitignore` with the line `node_modules/` so the installed packages never end up in git. If you already committed them: `git rm -r --cached node_modules`, then commit.

## Publish your package (not graded)

1. Create an account on [npmjs.com](https://www.npmjs.com) and run `npm login`.
2. `npm publish` (the version in `package.json` is `1.0.0`).
3. In a new folder: `npm init -y`, `npm install <your-package-name>`, and use `round2` in an `index.js`.
4. Add `round0` if you haven't yet, run `npm version minor` and `npm publish` again. Update your test project with `npm update`.

## Submitting

Commit your work and run `npm run submit`. Your score and feedback appear under **Releases** after a few minutes. You can submit as often as you like; the latest submission counts.
