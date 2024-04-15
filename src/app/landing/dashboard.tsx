import Slider from "./sliderSection";
import Header from "../common/header";
import AboutApp from "./aboutApp";
import AboutChitChat from "./aboutChitChat";
import TeamWork from "./teamWork";
import Collaboration from "./collaboration";
import TeamExpert from "./teamExpert";
import SecureApp from "./secureApp";
import PricePlan from "./pricePlan";
import Subscribe from "./subscribe";
import Footer from "../common/footer";
import TapTop from "../common/tapTop";

export const Landing = () => {
    return (
        <>
            <Header />
            <Slider />
            <AboutApp />
            <AboutChitChat />
            <TeamWork />
            <SecureApp />
            <Collaboration />
            <TeamExpert />
            <PricePlan />
            <Subscribe />
            <Footer />
            <TapTop />
        </>
    );
};