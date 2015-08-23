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

echo "Installing node packages"
npm install
