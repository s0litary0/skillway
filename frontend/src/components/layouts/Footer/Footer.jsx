import "./Footer.css";


export default function Footer() {
  return (
    <div className="footer-container">
      <div className="left-side">
        <h4> Skillway </h4>
        <p className="left-side__description">
          {" "}
          Learn, grow, and master new skills.{" "}
        </p>
      </div>
      <div className="right-side">
        <div className="right-side__fetures-list">
          <h4>Features</h4>
          <ul>
            <li>Courses</li>
            <li>Profile</li>
            <li>Dashboard</li>
            <li>Groups</li>
            <li>Achievements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
