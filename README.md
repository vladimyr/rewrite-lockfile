# rewrite-lockfile 
[![build status](https://badgen.net/travis/vladimyr/rewrite-lockfile/master)](https://travis-ci.com/vladimyr/rewrite-lockfile) [![install size](https://badgen.net/packagephobia/install/rewrite-lockfile)](https://packagephobia.now.sh/result?p=rewrite-lockfile) [![npm package version](https://badgen.net/npm/v/rewrite-lockfile)](https://npm.im/rewrite-lockfile) [![github license](https://badgen.net/github/license/vladimyr/rewrite-lockfile)](https://github.com/vladimyr/rewrite-lockfile/blob/master/LICENSE) [![js semistandard style](https://badgen.net/badge/code%20style/semistandard/pink)](https://github.com/Flet/semistandard)

>Rewrite npm's lockfile/shrinkwrap to ensure secure registry urls are being used

## Run
```
$ npx rewrite-lockfile <path>
```

## Usage

In order to automatically rewrite lockfile on every installation, install it as dev dependency:
```
$ npm install --save-dev rewrite-lockfile
```
and add following script to your `package.json`:

```json
{
  "scripts": {
    "postshrinkwrap": "rewrite-lockfile package-lock.json"
  }
}
```
