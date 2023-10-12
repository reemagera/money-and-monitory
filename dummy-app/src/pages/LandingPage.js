import React, { useEffect, useRef } from "react";
import About from "../components/About";
import HeroUnit from "../components/HeroUnit";
import LearnMore from "../components/LearnMore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { setCustomer } from "../store/actions";

function LandingPage() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setCustomer(null));
    }, [dispatch]);

    const learnMoreRef = useRef();
    const footerRef = useRef();
    function handleClick() {
        learnMoreRef.current.scrollIntoView({ behavior: "smooth" })
    }
    function scrollToFooter() {
        footerRef.current.scrollIntoView({behavior: "smooth"});
    }
    return(
        <>
            <Navbar navToAbout = {handleClick} 
            navToContact = {scrollToFooter}/>
            <HeroUnit handleClick = {handleClick}/>
            <div ref={learnMoreRef}>
                <LearnMore/>
                <hr/>
                <About/>
            </div>
            <div ref={footerRef}><Footer/></div>
        </>
    )
}
export default LandingPage;