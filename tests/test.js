'use strict';

const execa = require('execa');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const rewriteUrls = require('..');
const split = require('split2');
const test = require('tape');

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const pump = require('pump');

const reHttp = /^\s*"resolved"\s*:\s*"http:\/\//g;
const tmpDir = path.join(__dirname, './.tmp');

test('rewrites resolved registry urls', async t => {
  t.plan(2);
  let result = true;
  pump(
    fs.createReadStream(path.join(__dirname, './fixtures/package-lock.json')),
    rewriteUrls(),
    split(line => {
      result = result && !reHttp.test(line);
      return line;
    }),
    err => {
      t.is(err, void 0, 'finishes successfullly');
      t.ok(result, 'all urls are secure');
    }
  ).resume();
});

test('CLI rewrites lockfile in-place', async t => {
  t.plan(2);
  let result = true;
  try {
    await mkdir(tmpDir);
  } catch (err) {}
  const tmpLockfile = path.join(tmpDir, 'package-lock.json');
  await copyFile(path.join(__dirname, './fixtures/package-lock.json'), tmpLockfile);
  await execa('node', ['cli.js', tmpLockfile], { cwd: path.join(__dirname, '..') });
  pump(
    fs.createReadStream(tmpLockfile),
    split(line => {
      result = result && !reHttp.test(line);
      return line;
    }),
    err => {
      t.is(err, void 0, 'finishes successfullly');
      t.ok(result, 'all urls are secure');
    }
  ).resume();
});
