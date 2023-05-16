import React from "react";
import Footer from "../landing-page/Footer";
import NavBar from "../essentials/NavBar";
import YourBidsSection from "./YourBidsSection";
import TrendingAuctionsSection from "./TrendingAuctionsSection";
import "./Dashboard.css"
import { contract } from "../../contract";


function Dashboard() {
    return (
        <div>
            <NavBar />
            <div className="dashboard-content">
                <h2>Welcome Back, Khaled</h2>
                <div className="YourBidsSection"><YourBidsSection /></div>
                <div className="TrendingAuctionsSection"><TrendingAuctionsSection /></div>
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;