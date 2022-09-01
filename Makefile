# Makefile.
DOCKER_IMAGE_NAME ?= atto_ubicast

zip:
	# Build zip file for moodle.org with last commit.
	git archive HEAD --prefix="ubicast/" --format=zip -o "atto_ubicast.zip"

build:
	docker build -t ${DOCKER_IMAGE_NAME} .

rebuild:
	docker build --no-cache -t ${DOCKER_IMAGE_NAME} .

push:
	docker push ${DOCKER_IMAGE_NAME}

shifter:
	docker run -ti --rm -v ${CURDIR}:/apps -w /apps/yui/src/button ${DOCKER_IMAGE_NAME} shifter

shell:
	docker run -ti --rm -v ${CURDIR}:/apps ${DOCKER_IMAGE_NAME} sh
