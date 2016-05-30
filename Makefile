PROJECT:=reddio

BIN:=node_modules/.bin
ESLINT:=$(BIN)/eslint
GULP:=$(BIN)/gulp
KARMA:=$(BIN)/karma
PROTRACTOR:=$(BIN)/protractor
SHRINKPACK:=$(BIN)/shrinkpack
STORYBOOK:=$(BIN)/start-storybook
WEBDRIVER_MANAGER:=$(BIN)/webdriver-manager
WEBPACK:=$(BIN)/webpack
WEBPACK_DEV_SERVER:=$(BIN)/webpack-dev-server

setup:
	node --version
	npm --version
	@npm install --loglevel=http
	@$(WEBDRIVER_MANAGER) update

lint:
	@$(ESLINT) .

deps:
	@npm prune
	@npm shrinkwrap --dev
	@$(SHRINKPACK)

build: clean
	@$(WEBPACK) --progress -p

watch: clean
	@$(WEBPACK_DEV_SERVER) --hot --inline --config webpack.watch.config.js

storybook:
	$(STORYBOOK) --port 9001 --config-dir tools/storybook

test:
	@$(KARMA) start --single-run

test-watch:
	$(KARMA) start

test-e2e:
	@$(PROTRACTOR) protractor.conf.js

docker:
	docker-compose up --remove-orphans

docker-shell:
	docker-compose run --service-ports frontend /bin/bash

docs:
	@dot -Tpng docs/diagrams/architecture.dot -o docs/diagrams/architecture.png

deploy:
	@$(GULP) deploy

clean:
	@rm -rf dist

.PHONY: setup lint deps build test
.PHONY: docker docker-shell
.PHONY: docs clean
