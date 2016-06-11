# Reddio
:musical_note: Reddit powered radio

[![Build Status](https://travis-ci.org/yanglinz/reddio.svg?branch=master)](https://travis-ci.org/yanglinz/reddio)
[![Project Status](https://img.shields.io/badge/status-rewrite-yellow.svg)](https://github.com/yanglinz/reddio)

## Build Instructions

The project is verified to work on Mac OSX with `node v6+` and `npm v3+`.
 
```sh
# install npm packages and relevant binaries
$ make setup

# run karma tests
$ make test

# build site to `dist`
$ NODE_ENV=production make build

# run webpackdevserver
$ make watch
```
