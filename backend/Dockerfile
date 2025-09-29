
FROM maven:3.9.6-amazoncorretto-21 AS build


WORKDIR /app


COPY demo/pom.xml .
RUN mvn dependency:go-offline

COPY demo/src ./src


RUN mvn package -DskipTests

FROM amazoncorretto:21

COPY --from=build /app/target/*.jar app.jar


EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-Djdk.tls.client.protocols=TLSv1.2", "-jar", "app.jar"]