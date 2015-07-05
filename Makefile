# ------------------------------------
# Define bins
# ------------------------------------

BIN := ./node_modules/.bin
GULP := $(BIN)/gulp
ESLINT := $(BIN)/eslint
JSCS := $(BIN)/jscs
SCSS_LINT := scss-lint
KARMA := $(BIN)/karma
PROTRACTOR := $(BIN)/protractor
WEBDRIVER_MANAGER := $(BIN)/webdriver-manager


# ------------------------------------
# Define directories
# ------------------------------------

SRC_DIR := ./src
DST_DIR := ./dst
BUILD_DIR := ./build
TESTS_DIR := ./tests
GULP_DIR := ./gulp


# ------------------------------------
# Global commands
# ------------------------------------

setup:
	./scripts/setup.sh

test: test_unit

test_unit:
	$(KARMA) start karma.conf.js

test_e2e:
	$(WEBDRIVER_MANAGER) update --standalone
	$(WEBDRIVER_MANAGER) start --standalone
	$(PROTRACTOR) protractor.js

build:
	$(GULP) build --verbose

deploy:
	./scripts/predeploy-tests.sh
	$(GULP) deploy --verbose

clean:
	rm -rf $(DST_DIR)
	rm -rf $(BUILD_DIR)


# ------------------------------------
# Local commands
# ------------------------------------

run:
	$(GULP) serve --verbose

lint: lint_css lint_jscs lint_eslint

lint_css:
	$(SCSS_LINT) $(SRC_DIR)

lint_eslint:
	$(ESLINT) $(SRC_DIR) $(TESTS_DIR) $(GULP_DIR)

lint_jscs:
	$(JSCS) $(SRC_DIR) $(TESTS_DIR) $(GULP_DIR) --esprima=esprima-fb

iamge_min:
	$(GULP) commands:optimizeImages --verbose


# ------------------------------------
# Jenkins specific commands
# ------------------------------------

jenkins_setup_diff:
	./scripts/jenkins/diff-setup.sh

jenkins_setup_ci:
	./scripts/jenkins/ci-setup.sh

jenkins_ci_condition:
	./scripts/jenkins/ci-condition.py

jenkins_stage_setup:
	./scripts/jenkins/stage-setup.sh

jenkins_prod_setup:
	./scripts/jenkins/prod-setup.sh

jenkins_diff_build: jenkins_setup_diff setup build

jenkins_ci_build: jenkins_setup_ci setup build

jenkins_stage_deploy: jenkins_clean jenkins_stage_setup setup build deploy

jenkins_prod_deploy: jenkins_clean jenkins_prod_setup setup build deploy
	./scripts/jenkins/prod-deploy.sh

jenkins_clean:
	./scripts/jenkins/clean.sh
