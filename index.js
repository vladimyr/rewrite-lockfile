'use strict';

const reHttp = /(^\s*"resolved"\s*:\s*)"http:\/\//;
const split = require('split2');

module.exports = () => split(line => line.replace(reHttp, '$1"https://') + '\n');
