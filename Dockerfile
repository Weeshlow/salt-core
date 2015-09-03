#
# Mosaic Test Container
# Apache Spark 1.4.1
#
# Runs the Mosaic test suite in a container
#
# One-time usage (such as on travis):
# $ docker build -t docker.uncharted.software/mosaic-test .
# $ docker run --rm docker.uncharted.software/mosaic-test
#
# Dev environment usage:
# $ docker run -v $(pwd):/opt/mosaic -it docker.uncharted.software/mosaic-test bash
# container$ ./gradlew

FROM sequenceiq/spark:1.4.0
MAINTAINER Sean McIntyre <smcintyre@uncharted.software>

ADD . /opt/mosaic

WORKDIR /opt/mosaic
RUN mkdir /opt/libs

# for dev environment
ENV GRADLE_OPTS -Dorg.gradle.daemon=true

# download scalatest
RUN curl http://central.maven.org/maven2/org/scalatest/scalatest_2.10/2.2.5/scalatest_2.10-2.2.5.jar > /opt/libs/scalatest_2.10-2.2.5.jar

# download scoverage
RUN curl https://repo1.maven.org/maven2/org/scoverage/scalac-scoverage-runtime_2.10/1.1.1/scalac-scoverage-runtime_2.10-1.1.1.jar > /opt/libs/scalac-scoverage-runtime_2.10-1.1.1.jar

CMD ["./gradlew"]