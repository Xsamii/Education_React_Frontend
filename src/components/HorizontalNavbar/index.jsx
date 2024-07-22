import React, { useContext } from "react";
import "./style.css"; // Import the CSS file for styling
// import Logo from "../../../images/chinook_blue-logo-only.png";
// import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Students", type: "link", link: "/students" },
  { label: "Teachers", type: "link", link: "/teachers" },
  {
    label: "Sessions",
    type: "mega_menu",
    items: [
      {
        header: "Project Management",
        subItems: [
          { label: "Tasks", link: "" },
          { label: "RACI", link: "" },
        ],
      },
      {
        header: "Materials Management",
        subItems: [
          { label: "Material Records", link: "" },
          { label: "Material Database", link: "" },
        ],
      },
    ],
  },
];
function HorizontalNavbar() {
  //   const { auth, logout } = useContext(AuthContext);
  const currentUser = "auth";
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    // logout();
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <a href="/">
            <img
              src={"dsaf"}
              style={{ paddingTop: "15px", width: "120px", height: "40px" }}
            />
          </a>
        </div>
        <input type="checkbox" id="menu-btn" />
        <input type="checkbox" id="close-btn" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn">
            <i className="fas fa-times"></i>
          </label>
          {/*NEWWW  */}
          {currentUser.role ? (
            <>
              {navItems.map((item) => {
                // Direct Links
                return item.type === "link" ? (
                  <li key={item.label}>
                    <a href={item.link}>{item.label}</a>
                  </li>
                ) : item.type === "mega_menu" ? (
                  <li key={item.label}>
                    <a href="#" className="desktop-item">
                      {item.label}
                      <i
                        className="fas fa-chevron-down"
                        style={{ marginLeft: "5px" }}
                      ></i>
                    </a>
                    <input type="checkbox" id="showMega" />
                    <label htmlFor="showMega" className="mobile-item">
                      {item.label}
                    </label>
                    <div className="mega-box">
                      <div className="content">
                        {item.items.map((subItem) => (
                          <div className="row" key={subItem.header}>
                            <header>{subItem.header}</header>
                            <ul className="mega-links">
                              {subItem.subItems.map((subItem) => (
                                <li key={subItem.label}>
                                  <a href={subItem.link}>{subItem.label}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : null;
              })}
              <li>
                <a onClick={logoutAndRedirect}>Logout</a>
              </li>
            </>
          ) : (
            <li>
              <a onClick={redirectToLogin}>Login</a>
            </li>
          )}
        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn">
          <i className="fas fa-bars"></i>
        </label>
      </div>
    </nav>
  );
}

export default HorizontalNavbar;
