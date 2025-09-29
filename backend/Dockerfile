# --- 1. Build Stage ---
# Usamos uma imagem do Maven com Java 17 para compilar o projeto.
# "AS build" dá um nome a este estágio.
FROM maven:3.8.5-openjdk-17 AS build

# Define o diretório de trabalho dentro do contêiner.
WORKDIR /app

# Copia apenas o pom.xml para baixar as dependências.
# Isso aproveita o cache do Docker, acelerando builds futuros.
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o resto do código-fonte.
COPY src ./src

# Compila e empacota a aplicação em um arquivo .jar, pulando os testes.
RUN mvn package -DskipTests

# --- 2. Run Stage ---
# Usamos uma imagem leve, apenas com o Java necessário para rodar (JRE).
FROM eclipse-temurin:17-jre-slim

# Copia o .jar gerado no estágio de build para o contêiner final.
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta 8080 para que o Render possa se conectar à sua aplicação.
EXPOSE 8080

# Comando para iniciar a aplicação quando o contêiner rodar.
ENTRYPOINT ["java", "-jar", "app.jar"]