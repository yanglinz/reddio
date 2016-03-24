BIN := node_modules/.bin
ESLINT := $(BIN)/eslint
FOREMAN := $(BIN)/nf
WEBPACK := $(BIN)/webpack

lint:
	@$(ESLINT) .

build-webpack:
	@$(WEBPACK)

build: clean build-webpack

watch:
	@$(FOREMAN) start dev-ts

clean:
	@rm -rf dist
