'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "react-feather"
import { loadStripe } from "@stripe/stripe-js"
import { Badge } from 'reactstrap'

const StatusSection = (props) => {
  const closeLeftSide = () => {
    document.querySelector(".status-tab").classList.remove("active")
    // document.querySelector(".recent-default").classList.add("active");
    props.ActiveTab("")
  }
  const [profile, setProfile] = useState(null)


  const proItemId = process.env.NEXT_PUBLIC_PRO_SUBSCRIPTION

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  const createCheckOutSession = async (itemId, profileId) => {
    // setLoading(true);
    const stripe = await stripePromise;
    const checkoutSession = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        userId: profileId
      }),
    })
    if (!stripe || stripe === null) {
      alert("Something wrong with payment, retry later")
    }

    if (checkoutSession.status === 208) {
      alert("Sottoscrizione ancora valida")
      return
    }

    const sessionId = (await checkoutSession.json()).id

    try {
      const saveSession = await fetch("/api/users/" + profileId + "/payment/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId
        }),
      })

      if (saveSession.status != 200) {
        console.error(saveSession)
        alert(saveSession)
      }

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        alert(result.error.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    if (props.session && props.user) {
      setProfile({
        username: props.session.user.name,
        image: props.session.user.image,
        address: props.session.user.email,
        tier: props.user.subscriptionId
      })
    }
  }, [props.session, props.user])

  return (
    <div className={`status-tab custom-scroll dynemic-sidebar ${props.tab === "status" ? "active" : ""}`} id="status">
      <div className="my-status-box">
        <div className="status-content">
          <div className="media" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="img-status" style={{ backgroundColor: 'transparent' }}>
              {profile ? <img className="user-status bg-size"
                src={profile.image}
              ></img>
                : <div className="user-status bg-size"
                  style={{
                    backgroundImage: `url('../assets/images/avtar/girls.jpg'})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "block"
                  }}></div>
              }</div>
            <div className="media-body">
              <h3>My Status</h3>
              <p>Tap to add status Update</p>
              {profile && profile.tier === 'PRO_TIER' ? <><Badge color="warning" pill>PRO</Badge></> : <>
                <a onClick={() => createCheckOutSession(proItemId, profile.address)} className="btn btn-primary btn-sm hover-animate">
                  Upgrade Now
                  <i className="mdi mdi-arrow-right ml-1 small"></i>
                </a></>}
            </div>
            <div>
              <Link className="icon-btn btn-outline-light btn-sm close-panel" href="#" onClick={() => closeLeftSide()}><X />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="contact-status-box">
              <div className="theme-title">
                <h3>Recent Update</h3>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-1.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-1.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox">
                      <img src="/assets/images/status-img/large/lg-1.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Josephin water</h5>
                    <p>today , 8:30am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox2" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-2.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-2.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox2">
                      <img src="/assets/images/status-img/large/lg-2.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Jony Lynetin</h5>
                    <p>today , 10:30am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox3" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-3.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-3.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox3">
                      <img src="/assets/images/status-img/large/lg-3.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Sufiya Elija</h5>
                    <p>today , 11:00am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox4" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-4.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-4.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox4">
                      <img src="/assets/images/status-img/large/lg-4.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Mukrani Pabelo </h5>
                    <p>today , 9:55am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox5" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-5.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-5.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox5">
                      <img src="/assets/images/status-img/large/lg-5.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Pabelo Mukrani</h5>
                    <p>today , 12:05am</p>
                  </li>
                </ul>
              </div>
              <div className="status-content">
                <ul>
                  <li className="user-status">
                    <a className="lightbox img-status status" href="#statusbox6" style={{ backgroundImage: `url('/assets/images/status-img/small/sm-3.jpg')`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                      <img className="img-fluid bg-img" src="/assets/images/status-img/small/sm-3.jpg" alt="status" style={{display:"none"}}/>
                    </a>
                    <div className="lightbox-target" id="statusbox6">
                      <img src="/assets/images/status-img/large/lg-3.jpg" alt="status"/>
                      <a className="lightbox-close" href="#"></a>
                    </div>
                  </li>
                  <li>
                    <h5>Sufiya Elija</h5>
                    <p>today , 11:00am</p>
                  </li>
                </ul>
              </div>
            </div> */}
    </div>
  );
}

export default StatusSection;