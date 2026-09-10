import "./Navbar.css";
import skitLogo from "../../assets/skit-logo.jpg";

function Navbar({ isLoggedIn = false, name = "", profileImage = "" }) {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src={skitLogo}
          alt="SKIT Jaipur Logo"
          className="navbar-logo"
        />

        <span className="navbar-title">
          Project Allocation & Tracking Portal
        </span>
      </div>

      {isLoggedIn && (
        <div className="navbar-profile">
          <button type="button" className="profile-button">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              firstLetter
            )}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;