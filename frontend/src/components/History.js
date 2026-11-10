import React, { useEffect, useState } from 'react';
import { useNotification } from './Notification';
import { useConfirmationModal } from './ConfirmationModal';

function History() {
  const [history, setHistory] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const { showNotification, NotificationComponent } = useNotification();
  const { showConfirmation, ConfirmationModalComponent } = useConfirmationModal();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    fetch('http://localhost:8080/api/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(error => {
        console.error('Erreur lors du chargement de l’historique :', error);
      });
  };

  const handleDelete = async (id) => {
    const item = history.find(h => h.id === id);
    const promptPreview = item?.prompt?.substring(0, 80) + (item?.prompt?.length > 80 ? '...' : '');
    const outputPreview = item?.output?.substring(0, 100) + (item?.output?.length > 100 ? '...' : '');
    const timestamp = item?.timestamp ? new Date(item.timestamp).toLocaleString() : 'Date inconnue';
    
    // Utilisation de la modale de confirmation élégante
    const confirmed = await showConfirmation({
      title: 'Supprimer le prompt',
      message: `Êtes-vous sûr de vouloir supprimer ce prompt de l'historique ?\n\n📝 Prompt :\n"${promptPreview}"\n\n🤖 Réponse :\n"${outputPreview}"\n\n📅 Date : ${timestamp}\n\nCette action est irréversible et ne peut pas être annulée.`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      type: 'danger'
    });

    if (!confirmed) return;

    setDeletingId(id);
    
    try {
      const response = await fetch(`http://localhost:8080/api/history/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      setHistory(history.filter(item => item.id !== id));
      showNotification('success', 'Prompt supprimé avec succès', 4000);
    } catch (error) {
      console.error('Erreur de suppression :', error);
      
      let errorMessage = 'Erreur lors de la suppression du prompt';
      if (error.message.includes('404')) {
        errorMessage = 'Prompt introuvable ou déjà supprimé';
      } else if (error.message.includes('403')) {
        errorMessage = 'Vous n\'avez pas les permissions pour supprimer ce prompt';
      } else if (error.message.includes('500')) {
        errorMessage = 'Erreur serveur. Veuillez réessayer plus tard';
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet';
      }
      
      showNotification('error', errorMessage, 6000);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <NotificationComponent />
      <ConfirmationModalComponent />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="section-spacing">
          <div className="max-width-content container-padding">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🕘</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  Historique des Prompts
                </h1>
              </div>
              <p className="text-xl text-muted max-w-2xl mx-auto">
                Consultez et gérez tous vos analyses de code précédentes
              </p>
            </div>

            {/* Table Container */}
            <div className="card-elevated overflow-hidden animate-scale-in">
              {history.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aucun historique
                  </h3>
                  <p className="text-muted">
                    Vos analyses de code apparaîtront ici une fois que vous commencerez à utiliser l'assistant.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Prompt
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Réponse
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {history.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                            #{item.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs">
                            <div className="truncate" title={item.prompt}>
                              {item.prompt || <span className="text-subtle italic">Aucun prompt</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-md">
                            <div className="truncate" title={item.output}>
                              {item.output || <span className="text-subtle italic">Aucune réponse</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                            {item.timestamp ? new Date(item.timestamp).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'N/A'}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDelete(item.id)}
                              disabled={deletingId === item.id}
                              className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                deletingId === item.id
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                              }`}
                              title={deletingId === item.id ? "Suppression en cours..." : "Supprimer ce prompt"}
                            >
                              {deletingId === item.id ? (
                                <>
                                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                  Suppression...
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Supprimer
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
