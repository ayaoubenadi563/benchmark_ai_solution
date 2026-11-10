# Système de Correction de Code avec IA

Un système complet de correction de code utilisant l'IA avec une interface moderne et une architecture microservices.

## 🏗️ Architecture

- **Frontend**: React.js + Tailwind CSS
- **Backend Principal**: Spring Boot (Java)
- **Serveur IA**: FastAPI (Python) avec simulation de correction de code
- **Base de données**: PostgreSQL

## 🚀 Fonctionnalités

### Interface Utilisateur
- Interface moderne avec sidebar pour gérer les chats
- Formulaire de saisie pour prompt + code
- Affichage côte à côte du code original et corrigé
- Surlignage des erreurs (rouge) et corrections (vert)
- Gestion complète des conversations/chats

### Backend
- API REST complète pour la gestion des chats
- Communication avec le serveur IA
- Persistance des données avec PostgreSQL
- Gestion des messages et historique

### Serveur IA
- Analyse automatique du langage de programmation
- Simulation de correction de code
- Détection d'erreurs typiques (syntaxe, indentation, etc.)
- Génération de diff avec surlignages

## 📁 Structure du Projet

```
benchmark_ai_solution/
├── frontend/                 # Application React
│   ├── src/components/      # Composants React
│   ├── public/             # Assets statiques
│   └── package.json        # Dépendances Node.js
├── llama-backend/          # Backend Spring Boot
│   ├── src/main/java/     # Code Java
│   ├── pom.xml           # Dépendances Maven
│   └── Dockerfile        # Configuration Docker
├── pythonFastAPI/         # Serveur IA FastAPI
│   ├── main.py           # API FastAPI
│   ├── requirements.txt  # Dépendances Python
│   └── Dockerfile       # Configuration Docker
└── docker-compose.yml    # Orchestration des services
```

## 🛠️ Installation et Démarrage

### Prérequis
- Docker et Docker Compose
- Node.js 18+ (pour développement local)
- Java 17+ (pour développement local)
- Python 3.11+ (pour développement local)

### Démarrage Rapide avec Docker

1. **Cloner le projet**
```bash
git clone <repository-url>
cd benchmark_ai_solution
```

2. **Démarrer tous les services**
```bash
docker-compose up --build
```

3. **Accéder à l'application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Serveur IA: http://localhost:8000

### Développement Local

#### Frontend React
```bash
cd frontend
npm install
npm start
```

#### Backend Spring Boot
```bash
cd llama-backend
./mvnw spring-boot:run
```

#### Serveur IA FastAPI
```bash
cd pythonFastAPI
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🔧 Configuration

### Variables d'environnement

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_FASTAPI_URL=http://localhost:8000
```

#### Backend Spring Boot (application.properties)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/llamadb
spring.datasource.username=llama
spring.datasource.password=llama123
spring.jpa.hibernate.ddl-auto=update
```

## 📚 API Endpoints

### Backend Spring Boot (Port 8080)

#### Gestion des Chats
- `GET /api/chats` - Lister tous les chats
- `POST /api/chats` - Créer un nouveau chat
- `GET /api/chats/{id}` - Récupérer un chat spécifique
- `DELETE /api/chats/{id}` - Supprimer un chat

#### Analyse de Code
- `POST /api/prompts` - Analyser et corriger du code

### Serveur IA FastAPI (Port 8000)

- `POST /analyze` - Analyser et corriger du code
- `GET /health` - Vérifier la santé du service

## 🎯 Utilisation

1. **Créer un nouveau chat**
   - Cliquer sur "+ Nouveau Chat" dans la sidebar
   - Saisir un titre pour le chat

2. **Analyser du code**
   - Saisir un prompt (optionnel)
   - Coller le code à analyser
   - Cliquer sur "Analyser le code"

3. **Consulter les résultats**
   - Le code original avec erreurs surlignées en rouge
   - Le code corrigé avec modifications surlignées en vert
   - Liste des erreurs détectées
   - Liste des corrections apportées

4. **Gérer l'historique**
   - Naviguer entre les chats via la sidebar
   - Supprimer des chats inutiles
   - Reprendre une conversation précédente

## 🔍 Fonctionnalités Techniques

### Détection de Langage
Le système détecte automatiquement le langage de programmation basé sur le code :
- Python (def, import, class, etc.)
- JavaScript (function, var, let, const, etc.)
- Java (public class, System.out.println, etc.)
- C/C++ (#include, int main, etc.)
- Go (package, func, fmt, etc.)

### Correction Simulée
Le serveur IA simule la correction de code en détectant :
- Erreurs d'indentation (Python)
- Parenthèses manquantes
- Points-virgules manquants (JavaScript/Java)
- Docstrings manquantes (Python)

### Surlignage Intelligent
- **Rouge** : Lignes avec erreurs dans le code original
- **Vert** : Lignes avec corrections dans le code corrigé
- Calcul automatique des différences avec l'algorithme diff

## 🧪 Tests

### Tests du Backend
```bash
cd llama-backend
./mvnw test
```

### Tests du Frontend
```bash
cd frontend
npm test
```

### Tests du Serveur IA
```bash
cd pythonFastAPI
python -m pytest
```

## 🚀 Déploiement

### Production avec Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Variables d'environnement de production
```env
# Base de données
POSTGRES_DB=llamadb_prod
POSTGRES_USER=llama_prod
POSTGRES_PASSWORD=<secure_password>

# Backend
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/llamadb_prod

# Frontend
REACT_APP_API_URL=https://api.votre-domaine.com
REACT_APP_FASTAPI_URL=https://ai.votre-domaine.com
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation technique
- Contacter l'équipe de développement

## 🔮 Roadmap

- [ ] Intégration d'un vrai modèle LLaMA 3
- [ ] Support de plus de langages de programmation
- [ ] Analyse statique de code avancée
- [ ] Suggestions d'amélioration de performance
- [ ] Mode collaboratif en temps réel
- [ ] Intégration avec des IDE populaires