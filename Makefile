BIN := node_modules/.bin
FOREMAN := $(BIN)/nf
TYPESCRIPT := $(BIN)/tsc

TYPESCRIPT_FLAGS := --module system --sourceMap --allowJs

build-ts:
	$(TYPESCRIPT) $(TYPESCRIPT_FLAGS) --outfile dist/app/main.js src/app/main.ts

watch-ts:
	$(TYPESCRIPT) $(TYPESCRIPT_FLAGS) --outfile dist/app/main.js src/app/main.ts --watch

build: build-ts

watch:
	$(FOREMAN) start dev-ts
