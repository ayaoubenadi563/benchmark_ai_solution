FROM openjdk:17-jdk-slim

WORKDIR /app

# Copier le fichier Maven wrapper et pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Donner les permissions d'exécution au Maven wrapper
RUN chmod +x mvnw

# Télécharger les dépendances
RUN ./mvnw dependency:go-offline -B

# Copier le code source
COPY src ./src

# Compiler l'application
RUN ./mvnw clean package -DskipTests

# Exposer le port
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["java", "-jar", "target/llamabackend-0.0.1-SNAPSHOT.jar"] 