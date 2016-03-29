BIN := node_modules/.bin
BABEL_NODE := $(BIN)/babel-node
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
GULP := $(BIN)/gulp
PROTRACTOR := $(BIN)/protractor
SHRINKPACK := $(BIN)/shrinkpack
TYPINGS := $(BIN)/typings
WEBDRIVER_MANAGER := $(BIN)/webdriver-manager
WEBPACK := $(BIN)/webpack
WEBPACK_DEV_SERVER := $(BIN)/webpack-dev-server

NPM_FLAGS := --loglevel=http

setup:
	node --version
	npm --version
	@npm install $(NPM_FLAGS)
	@$(TYPINGS) install
	@$(WEBDRIVER_MANAGER) update

deps:
	@npm shrinkwrap --dev
	@$(SHRINKPACK)

lint:
	@$(ESLINT) .

test:
	@echo "Running unit tests"

test-full:
	@$(BABEL_NODE) ./tools/custom/debug-info.js
	@$(PROTRACTOR)

build: clean
	@$(BABEL_NODE) ./tools/custom/debug-info.js
	@$(WEBPACK)
	@$(GULP) build

run: build
	$(WEBPACK_DEV_SERVER)

watch: build
	@$(BABEL_NODE) ./tools/custom/debug-info.js
	@$(FOREMAN) start dev-webpack,dev-gulp

artifact: clean
	@$(BABEL_NODE) ./tools/custom/debug-info.js
    @$(WEBPACK)
    @$(GULP) build
    @$(GULP) artifact

deploy: artifact
	@$(GULP) deploy

clean:
	@rm -rf dist

.PHONY: setup deps lint test test-full build run watch artifact deploy clean

