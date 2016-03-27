BIN := node_modules/.bin
BABEL_NODE := $(BIN)/babel-node
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
GULP := $(BIN)/gulp
SHRINKPACK := $(BIN)/shrinkpack
TYPINGS := $(BIN)/typings
WEBPACK := $(BIN)/webpack

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

watch:
	@$(FOREMAN) start dev-webpack,dev-gulp

clean:
	@rm -rf dist
