#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const fdSlicer = require('fd-slicer');
const meow = require('meow');
const open = require('util').promisify(require('fs').open);
const path = require('path');
const pkg = require('./package.json');
const pumpify = require('pumpify');
const rewriter = require('./');

const description = chalk`{bold ${pkg.name}} v${pkg.version} - ${pkg.description}`;
const help = chalk`
Usage:
  rewrite-lockfile <path>

Options
  -h, --help      Show help
  -v, --version   Show version number

Homepage:     {cyan ${pkg.homepage}}
Report issue: {cyan ${pkg.bugs.url}}`;

const flags = {
  help: { alias: 'h' },
  version: { alias: 'v' }
};

program(meow(help, { description, version: pkg.version, flags }));

async function program(cli) {
  const [lockfilePath] = cli.input;
  if (!lockfilePath) return cli.showHelp();
  const stream = await rewriteUrls(path.resolve(lockfilePath));
  return new Promise((resolve, reject) => stream
    .once('error', reject)
    .once('finish', resolve));
}

async function rewriteUrls(lockfilePath) {
  const fd = await open(lockfilePath, 'r+');
  const slicer = fdSlicer.createFromFd(fd);
  const reader = slicer.createReadStream();
  const writer = slicer.createWriteStream();
  return pumpify(reader, rewriter(), writer);
}
