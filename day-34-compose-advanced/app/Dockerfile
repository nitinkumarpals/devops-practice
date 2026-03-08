FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean package

# stage 2 - runtime

FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=builder /app/target/demo-1.0.jar app.jar

EXPOSE 8080

CMD ["java","-jar","app.jar"]