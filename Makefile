# ------------------------------------
# Define binary
# ------------------------------------

NPM ?= npm
NODE ?= node
BIN := ./node_modules/.bin
GULP := $(BIN)/gulp
ESLINT := $(BIN)/eslint
JSCS := $(BIN)/jscs
CSSLINT := $(BIN)/csslint
CSSCOMB := $(BIN)/csscomb
KARMA := $(BIN)/karma
PROTRACTOR := $(BIN)/protractor
WEBDRIVER_MANAGER := $(BIN)/webdriver-manager

# ------------------------------------
# Define make commands
# ------------------------------------

setup:
	./build/scripts/setup.sh

build: clean
	$(GULP) build

lint: clean
ifdef FIX
	$(JSCS) . --fix
	$(ESLINT) --ext .jsx --ext .js . --fix
	$(CSSCOMB) ./src/_app/
else
	$(JSCS) .
	$(ESLINT) --ext .jsx --ext .js .
	$(CSSLINT) ./src
endif

test: test-unit

test-unit:
	$(KARMA) start tests/karma.conf.js

test-e2e: test-e2e-setup
	$(PROTRACTOR) tests/protractor.conf.js

test-e2e-setup:
	$(WEBDRIVER_MANAGER) update

run: clean
	$(GULP) run

deploy: build
	$(GULP) deploy

clean:
	./build/scripts/clean.sh

.PHONY: build
