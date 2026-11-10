#!/bin/bash

echo "🚀 Démarrage du système de correction de code avec IA"
echo "=================================================="

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

echo "📦 Construction et démarrage des services..."
docker-compose up --build -d

echo "⏳ Attente du démarrage des services..."
sleep 30

echo "🔍 Vérification de l'état des services..."

# Vérifier le serveur IA
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Serveur IA (FastAPI) - OK"
else
    echo "❌ Serveur IA (FastAPI) - ERREUR"
fi

# Vérifier le backend Spring Boot
if curl -s http://localhost:8080/api/chats > /dev/null; then
    echo "✅ Backend Spring Boot - OK"
else
    echo "❌ Backend Spring Boot - ERREUR"
fi

# Vérifier le frontend React
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend React - OK"
else
    echo "❌ Frontend React - ERREUR"
fi

echo ""
echo "🎉 Système prêt !"
echo "=================="
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080"
echo "🤖 Serveur IA: http://localhost:8000"
echo ""
echo "💡 Pour arrêter les services: docker-compose down"
echo "💡 Pour voir les logs: docker-compose logs -f" 