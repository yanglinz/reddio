BIN := node_modules/.bin
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
WEBPACK := $(BIN)/webpack

setup:
	node --version
	npm --version
	@npm install

lint:
	@$(ESLINT) .

build: clean
	@$(WEBPACK)

watch:
	@$(FOREMAN) start dev-ts

clean:
	@rm -rf dist
