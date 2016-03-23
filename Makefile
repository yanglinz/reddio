BIN := node_modules/.bin
TYPESCRIPT := $(BIN)/tsc

TYPESCRIPT_FLAGS := --module system --sourceMap --allowJs

build:
	$(TYPESCRIPT) $(TYPESCRIPT_FLAGS) --outfile dist/app/main.js src/app/main.ts
