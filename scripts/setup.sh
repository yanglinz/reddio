#!/bin/bash

set -e

# ensure dependencies are installed

if which npm >/dev/null; then
    echo "Npm is installed"
else
    echo "Npm is not installed. Please install node.js and npm by running the following commands:"
    echo "brew install node"
    exit 1
fi

if which ruby >/dev/null; then
    echo "Ruby is installed"
else
    echo "Ruby is not installed. Please install it by through rvm."
    exit 1
fi

if which bundle >/dev/null; then
    echo "Bundler is installed"
else
    echo "Bundler is not installed. Please install it by running the following commands:"
    echo "gem install bundler  # do not use sudo"
    exit 1
fi

# install project packages

echo "Installing ruby packages"
bundle install

echo "Installing node packages"
npm install
