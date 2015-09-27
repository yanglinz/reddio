#!/bin/bash

set -e

echo "Clearing build directory"
rm -rf dist
rm -rf tests/coverage

echo "Re-setting webpack bundles"
BUNDLE_JS="./src/_app/main.bundle.js"
BUNDLE_CSS="./src/_app/main.bundle.css"
rm -f $BUNDLE_JS; touch $BUNDLE_JS
rm -f $BUNDLE_CSS; touch $BUNDLE_CSS
