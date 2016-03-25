BIN := node_modules/.bin
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
	@$(GULP)
	@$(WEBPACK)

watch:
	@$(FOREMAN) start dev-ts

clean:
	@rm -rf dist
