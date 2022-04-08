import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import firebaseConfig from "../../configs/firebaseConfig";
import { Redirect } from "react-router-dom";
import { ScrollView } from "@cantonjs/react-scroll-view";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [auth, setAuth] = useState(false);
  const logout = () => {
    firebaseConfig
      .auth()
      .signOut()
      .then(() => {
        setAuth(true);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
          <nav className={sidebar ? "nav-menu " : "nav-menu active"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
          <ScrollView style={{ height: '100vh' }}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/sports">
                <AiIcons.AiFillTrophy />
                <span>Sports</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/users">
                <AiIcons.AiOutlineUser />
                <span>Members</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/trials">
                <AiIcons.AiOutlineUsergroupAdd />
                <span>Trials Data</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/academies">
                <AiIcons.AiFillBank />
                <span>Academies</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/coaches">
                <AiIcons.AiOutlineCopyright />
                <span>Coaches</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/coupons">
                <AiIcons.AiOutlineFire />
                <span>Coupons</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/pay&play">
                <AiIcons.AiTwotoneSkin />
                <span>Pay and Play</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/batches">
                <AiIcons.AiTwotoneShop />
                <span>Batches</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/academy/prices">
                <AiIcons.AiOutlineDollarCircle />
                <span>Academy Packages</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/sportsLink">
                <AiIcons.AiFillFilter />
                <span>Sports Academy Linkage</span>
              </Link>
            </li>

            <li className="nav-text">
              <Link to="/discounts">
                <AiIcons.AiFillTrophy />
                <span>Discounts</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/socities">
                <AiIcons.AiFillFlag />
                <span>Socities</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="#">
                <AiIcons.AiFillHome />
                <span onClick={logout}>Logout</span>
              </Link>
            </li>
            </ScrollView>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
