const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const lib = require('../index.js');
const source = fs.readFileSync('index.js', 'utf8');

describe('R1: round2 rounds to two decimals with lodash', () => {
  it('rounds correctly', () => {
    assert.equal(typeof lib.round2, 'function', 'index.js should export a function round2');
    assert.equal(lib.round2(3.14159), 3.14, 'round2(3.14159) should return 3.14');
    assert.equal(lib.round2(1.005), 1.01, 'round2(1.005) should return 1.01 (lodash rounds this correctly, Math.round does not)');
    assert.equal(lib.round2(-1.234), -1.23, 'round2(-1.234) should return -1.23');
  });
  it('uses lodash', () => {
    assert.match(source, /require\(['"]lodash['"]\)/, 'index.js should require("lodash")');
  });
});

describe('R2: round0 rounds to a whole number', () => {
  it('rounds correctly', () => {
    assert.equal(typeof lib.round0, 'function', 'index.js should export a function round0');
    assert.equal(lib.round0(2.5), 3, 'round0(2.5) should return 3');
    assert.equal(lib.round0(2.4), 2, 'round0(2.4) should return 2');
  });
});

describe('R3: package.json describes your package', () => {
  it('has your own package name', () => {
    assert.ok(pkg.name && pkg.name !== 'node-lab-03-npm', 'Give your package its own unique name in package.json (it must be unique on npmjs.com)');
    assert.match(pkg.name, /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/, 'The package name should be lowercase without spaces');
  });
  it('declares lodash as a dependency and index.js as entry point', () => {
    assert.ok(pkg.dependencies && pkg.dependencies.lodash, 'lodash should be listed under "dependencies" (npm install lodash)');
    assert.equal(pkg.main, 'index.js', 'package.json "main" should be "index.js"');
  });
});

describe('R4: node_modules is not committed', () => {
  it('ignores node_modules', () => {
    const ignore = fs.existsSync('.gitignore') ? fs.readFileSync('.gitignore', 'utf8') : '';
    assert.match(ignore, /^\/?node_modules\/?$/m, '.gitignore should contain a line "node_modules/"');
    const tracked = execFileSync('git', ['ls-files', 'node_modules'], { encoding: 'utf8' }).trim();
    assert.equal(tracked, '', 'node_modules should not be committed: run "git rm -r --cached node_modules" and commit');
  });
});
