const ItineraryDisplay = ({ data }) => {
  if (!data) return null;

  const { tripSummary, itinerary } = data;

  return (
    <div className="itinerary-display">
      <div className="glass-container summary-card" style={{ padding: 0, overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
          alt="Destination Banner" 
          className="destination-banner" 
        />
        <div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div className="summary-details">
            <h3>{tripSummary.destination}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {tripSummary.totalDays} Days • {tripSummary.generalSafetyTip || "Safe travels!"}
            </p>
          </div>
          <div className="summary-cost">
            ${tripSummary.estimatedCost || "TBD"}
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
        Daily Itinerary
      </h3>

      {itinerary.map((dayData, index) => (
        <div key={index} className="day-card glass-container" style={{ padding: '1.5rem' }}>
          <div className="day-header">
            <h3>Day {dayData.day}</h3>
            <span>{dayData.theme}</span>
          </div>

          <div className="activity-grid">
            <div className="activity-card activity-morning">
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80" alt="Morning" className="activity-image" />
              <div className="activity-content">
                <span className="activity-time">Morning</span>
                <p className="activity-desc">{dayData.morning.activity}</p>
                <span className="cost-badge">Est. ${dayData.morning.costEstimate}</span>
              </div>
            </div>
            
            <div className="activity-card activity-afternoon">
              <img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=500&q=80" alt="Afternoon" className="activity-image" />
              <div className="activity-content">
                <span className="activity-time">Afternoon</span>
                <p className="activity-desc">{dayData.afternoon.activity}</p>
                <span className="cost-badge">Est. ${dayData.afternoon.costEstimate}</span>
              </div>
            </div>
            
            <div className="activity-card activity-evening">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" alt="Evening" className="activity-image" />
              <div className="activity-content">
                <span className="activity-time">Evening</span>
                <p className="activity-desc">{dayData.evening.activity}</p>
                <span className="cost-badge">Est. ${dayData.evening.costEstimate}</span>
              </div>
            </div>
          </div>
          
          {dayData.localFoodSuggestion && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              <strong>🍽️ Food Suggestion:</strong> {dayData.localFoodSuggestion}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItineraryDisplay;
