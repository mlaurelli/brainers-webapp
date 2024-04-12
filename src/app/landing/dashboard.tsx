import { loadStripe } from "@stripe/stripe-js"
import useUser from "@/utils/useUser"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
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

const proItemId = process.env.NEXT_PUBLIC_PRO_SUBSCRIPTION!
const premiumItemId = process.env.NEXT_PUBLIC_PREMIUM_SUBSCRIPTION!

export const Landing = () => {


    // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    // const createCheckOutSession = async (itemId: String, profileId: string) => {
    //     // setLoading(true);
    //     const stripe = await stripePromise;
    //     const checkoutSession = await fetch("/api/checkout", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             itemId,
    //             userId: profileId
    //         }),
    //     })
    //     if (!stripe || stripe === null) {
    //         alert("Something wrong with payment, retry later")
    //     }

    //     if (checkoutSession.status === 208) {
    //         alert("Sottoscrizione ancora valida")
    //         return
    //     }

    //     const sessionId = (await checkoutSession.json()).id

    //     try {
    //         const saveSession = await fetch("/api/users/" + session?.user?.email! + "/payment/session", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 sessionId: sessionId
    //             }),
    //         })

    //         if (saveSession.status != 200) {
    //             console.error(saveSession)
    //             alert(saveSession)
    //         }

    //         const result = await stripe!.redirectToCheckout({
    //             sessionId,
    //         });

    //         if (result.error) {
    //             alert(result.error.message)
    //         }
    //     } catch (error) {
    //         alert(error)
    //     }

    //     // setLoading(false);
    // }


    //     <a onClick={() => createCheckOutSession(proItemId, profile.id)} className="btn btn-primary hover-animate">
    //     Upgrade Now
    //     <i className="mdi mdi-arrow-right ml-1 small"></i>
    // </a>

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