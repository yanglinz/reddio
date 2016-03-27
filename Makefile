BIN := node_modules/.bin
BABEL_NODE := $(BIN)/babel-node
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
GULP := $(BIN)/gulp
SHRINKPACK := $(BIN)/shrinkpack
TYPINGS := $(BIN)/typings
WEBPACK := $(BIN)/webpack
WEBPACK_DEV_SERVER := $(BIN)/webpack-dev-server

NPM_FLAGS := --loglevel=http

setup:
	node --version
	npm --version
	@npm install $(NPM_FLAGS)
	@$(TYPINGS) install

deps:
	@npm shrinkwrap --dev
	@$(SHRINKPACK)

lint:
	@$(ESLINT) .

build: clean
	@$(BABEL_NODE) ./tools/custom/debug-info.js
	@$(WEBPACK)
	@$(GULP) build

watch-webpack:
	@$(WEBPACK_DEV_SERVER)

watch:
	@$(FOREMAN) start dev-ts

clean:
	@rm -rf dist
