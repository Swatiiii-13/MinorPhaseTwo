import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TripForm from '../components/TripForm';
import ItineraryDisplay from '../components/ItineraryDisplay';
import api from '../services/api';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGenerateItinerary = async (formData) => {
    setLoading(true);
    setItineraryData(null);
    try {
      const response = await api.post('/trips/generate', formData);
      setItineraryData(response.data);
    } catch (error) {
      console.error('Error generating itinerary', error);
      alert('Failed to generate itinerary. Check your API key or inputs.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h2>Dashboard</h2>
          <p>Welcome back, {user.name}!</p>
        </div>
        <button onClick={handleLogout} className="glass-button" style={{ width: 'auto', margin: 0, padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--glass-border)' }}>
          Logout
        </button>
      </header>

      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <TripForm onSubmit={handleGenerateItinerary} />
        </aside>

        <main className="dashboard-main">
          {loading && (
            <div className="glass-container loading-spinner">
              <div style={{ fontSize: '2rem' }}>✨</div>
              <p>AI is planning your perfect trip...</p>
            </div>
          )}
          
          {!loading && !itineraryData && (
            <div className="glass-container empty-state">
              <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>✈️</span>
              <h3>No trip generated yet</h3>
              <p>Fill out the form on the left to get your personalized AI itinerary.</p>
            </div>
          )}

          {!loading && itineraryData && (
            <ItineraryDisplay data={itineraryData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
