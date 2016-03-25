BIN := node_modules/.bin
BABEL_NODE := $(BIN)/babel-node
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
GULP := $(BIN)/gulp
WEBPACK := $(BIN)/webpack

setup:
	node --version
	npm --version
	@npm install

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
