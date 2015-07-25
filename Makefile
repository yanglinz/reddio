# ------------------------------------
# Define binary
# ------------------------------------

NPM ?= npm
BIN := ./node_modules/.bin
GULP := $(BIN)/gulp
ESLINT := $(BIN)/eslint
JSCS := $(BIN)/jscs
WEBPACK := $(BIN)/webpack
WEBPACK_DEV_SERVER := $(BIN)/webpack-dev-server


# ------------------------------------
# Define make commands
# ------------------------------------

build:
	$(GULP) build

lint:
	$(JSCS) .
	$(ESLINT) .

run:
	$(GULP) run

deploy: build
	$(GULP) deploy

.PHONY: build
