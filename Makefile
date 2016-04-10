BIN := node_modules/.bin
BABEL_NODE := $(BIN)/babel-node
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
GULP := $(BIN)/gulp
KARMA := $(BIN)/karma
PROTRACTOR := $(BIN)/protractor
SHRINKPACK := $(BIN)/shrinkpack
WEBDRIVER_MANAGER := $(BIN)/webdriver-manager
WEBPACK := $(BIN)/webpack
WEBPACK_DEV_SERVER := $(BIN)/webpack-dev-server

NPM_FLAGS := --loglevel=http

setup:
	node --version
	npm --version
	@npm install $(NPM_FLAGS)
	@$(WEBDRIVER_MANAGER) update

deps:
	@npm shrinkwrap --dev
	@$(SHRINKPACK)

lint:
	@$(ESLINT) .

test:
	@$(BABEL_NODE) ./scripts/custom/debug-info.js
	@$(KARMA) start --single-run

test-full:
	@$(BABEL_NODE) ./scripts/custom/debug-info.js
	@$(PROTRACTOR)

build: clean
	@$(BABEL_NODE) ./scripts/custom/debug-info.js
	@$(WEBPACK)
	@$(GULP) build

run: build
	@$(WEBPACK_DEV_SERVER)

watch: clean
	@$(BABEL_NODE) ./scripts/custom/debug-info.js
	@$(FOREMAN) start dev-webpack,dev-gulp

deploy:
	@$(GULP) deploy

doc:
	@dot -Tpng docs/diagrams/architecture.dot -o docs/diagrams/architecture.png

clean:
	@rm -rf dist

.PHONY: setup deps lint test test-full build run watch artifact deploy doc clean

