# ------------------------------------
# Define binary
# ------------------------------------

NPM ?= npm
BIN := ./node_modules/.bin
GULP := $(BIN)/gulp
ESLINT := $(BIN)/eslint
JSCS := $(BIN)/jscs


# ------------------------------------
# Define make commands
# ------------------------------------

setup:
	./build/scripts/setup.sh

build: clean
	$(GULP) build

lint: clean
	$(JSCS) .
	$(ESLINT) --ext .jsx --ext .js .

run: clean
	$(GULP) run

deploy: build
	$(GULP) deploy

clean:
	./build/scripts/clean.sh

.PHONY: build
