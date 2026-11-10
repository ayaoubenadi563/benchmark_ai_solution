import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              À propos de DevSpark-AI
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Révolutionnez votre expérience de développement avec notre assistant IA intelligent
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Notre Mission
              </h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              DevSpark-AI Assistant est conçu pour transformer la façon dont les développeurs 
              apprennent et améliorent leur code. Notre plateforme utilise l'intelligence artificielle 
              avancée pour analyser, corriger et optimiser le code en temps réel, offrant une 
              expérience d'apprentissage interactive et personnalisée.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Fonctionnalités Principales
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-orange-500 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Analyse IA Avancée
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Notre IA analyse automatiquement le langage de programmation et détecte les erreurs 
                de syntaxe, d'indentation et de logique.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-orange-500 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Corrections en Temps Réel
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Obtenez des corrections instantanées avec un système de surlignage visuel pour 
                identifier les erreurs et les améliorations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-orange-500 text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Interface Conversationnelle
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interagissez naturellement avec l'IA grâce à notre interface de chat intuitive 
                et moderne.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-orange-500 text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Historique des Sessions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Conservez et revisitez vos sessions de correction pour un apprentissage continu 
                et un suivi de vos progrès.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-orange-500 text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Interface Moderne
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Profitez d'une interface élégante avec support du mode sombre et une expérience 
                utilisateur optimisée.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-orange-500 text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Architecture Microservices
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Bénéficiez d'une architecture robuste et scalable avec React, Spring Boot et FastAPI 
                pour des performances optimales.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Technologies Utilisées
              </h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frontend</h3>
                <div className="space-y-2">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mr-2">React.js</span>
                  <span className="inline-block bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full text-sm font-medium mr-2">Tailwind CSS</span>
                  <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">JavaScript</span>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backend</h3>
                <div className="space-y-2">
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium mr-2">Spring Boot</span>
                  <span className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium mr-2">FastAPI</span>
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">PostgreSQL</span>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">DevOps</h3>
                <div className="space-y-2">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mr-2">Docker</span>
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">Docker Compose</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Notre Équipe
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">DS</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">DevSpark Team</h3>
              <p className="text-orange-600 font-medium mb-4">Équipe de Développement</p>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Notre équipe passionnée de développeurs et d'experts en IA travaille sans relâche 
                pour créer des outils qui révolutionnent l'expérience de développement. Nous croyons 
                en la puissance de l'intelligence artificielle pour améliorer la productivité et 
                l'apprentissage des développeurs du monde entier.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Améliorer Votre Code ?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de développeurs qui utilisent déjà DevSpark-AI pour 
              optimiser leur code et accélérer leur apprentissage.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-orange-50 transition-colors duration-300 shadow-lg"
            >
              Commencer Maintenant
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
