Write-Host "🚀 Démarrage du système de correction de code avec IA" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Vérifier si Docker est installé
try {
    docker --version | Out-Null
    Write-Host "✅ Docker détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker n'est pas installé. Veuillez installer Docker d'abord." -ForegroundColor Red
    exit 1
}

# Vérifier si Docker Compose est installé
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Construction et démarrage des services..." -ForegroundColor Yellow
docker-compose up --build -d

Write-Host "⏳ Attente du démarrage des services..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "🔍 Vérification de l'état des services..." -ForegroundColor Yellow

# Vérifier le serveur IA
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Serveur IA (FastAPI) - OK" -ForegroundColor Green
    } else {
        Write-Host "❌ Serveur IA (FastAPI) - ERREUR" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Serveur IA (FastAPI) - ERREUR" -ForegroundColor Red
}

# Vérifier le backend Spring Boot
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/chats" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend Spring Boot - OK" -ForegroundColor Green
    } else {
        Write-Host "❌ Backend Spring Boot - ERREUR" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Backend Spring Boot - ERREUR" -ForegroundColor Red
}

# Vérifier le frontend React
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend React - OK" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend React - ERREUR" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Frontend React - ERREUR" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Système prêt !" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:8080" -ForegroundColor Cyan
Write-Host "🤖 Serveur IA: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Pour arrêter les services: docker-compose down" -ForegroundColor Yellow
Write-Host "💡 Pour voir les logs: docker-compose logs -f" -ForegroundColor Yellow 