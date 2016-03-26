BIN := node_modules/.bin
BABEL_NODE := $(BIN)/babel-node
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
GULP := $(BIN)/gulp
SHRINKPACK := $(BIN)/shrinkpack
WEBPACK := $(BIN)/webpack

setup:
	node --version
	npm --version
	@npm install --loglevel=http

deps:
	npm install shrinkpack --loglevel=http
	npm shrinkwrap --dev
	$(SHRINKPACK)

lint:
	@$(ESLINT) .

build: clean
	@$(BABEL_NODE) ./tools/custom/debug-info.js
	@$(WEBPACK)
	@$(GULP)

watch:
	@$(FOREMAN) start dev-ts

clean:
	@rm -rf dist
