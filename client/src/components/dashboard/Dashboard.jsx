import React from "react";
import Footer from "../landing-page/Footer";
import NavBar from "../essentials/NavBar";
import Carousel from "../essentials/Carousel";
import YourBidsSection from "./YourBidsSection";

function Dashboard() {
    return (
        <div>
            <NavBar />
            <div className="dashboard-content">
                <h1 style={{fontSize: "48px", marginLeft: "53px", paddingBottom: "18px"}}>Welcome Back, Khaled</h1>
                {
                    //TODO: discuss the font size and responsive design with khaled
                }
            </div>
            <YourBidsSection />
        </div>
    );
}

export default Dashboard;