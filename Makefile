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

run: clean
	$(GULP) run

deploy: build
	$(GULP) deploy

clean:
	./build/scripts/clean.sh

.PHONY: build
