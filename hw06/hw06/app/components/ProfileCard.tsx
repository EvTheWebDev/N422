import '../styles.css';

function ProfileCard() {
  return (
    <div className="profile-card">
      <img 
        className="profile-image" 
        src="/assets/ev.jpg" 
        alt="Profile Avatar" 
      />
      <div className="profile-content">
        <h2 className="profile-name">
          Ev Schmitt
        </h2>
        <p className="profile-bio">
          Senior at IUI studying Media Arts and Science. Working to obtain a Master of Art and Teaching specilizing in Computer Science.
        </p>
        
        <h3 className="favorites-title">Favorite Things:</h3>
        <ul className="favorites-list">
          <li>Video Games</li>
          <li>Learning Japanese</li>
          <li>WDDA</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileCard;