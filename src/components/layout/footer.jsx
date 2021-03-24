import React from "react";

import { ReactComponent as AmericanExpress } from "../../assets/images/billingMethod/amex.svg";
import { ReactComponent as MasterCard } from "../../assets/images/billingMethod/mc.svg";
import { ReactComponent as Paypal } from "../../assets/images/billingMethod/paypal.svg";
import { ReactComponent as Visa } from "../../assets/images/billingMethod/visa.svg";
import { ReactComponent as Facebook } from "../../assets/images/facebook.svg";
import { ReactComponent as Instagram } from "../../assets/images/instagram.svg";

import "./style.css";

const Footer = () => (
  <footer className="m-0 text-white font-messina">
    <section className="bg-primary">
      <div className="container-footer mx-auto pt-10 px-7 pb-11 md:flex justify-between md:pt-16 md:pb-12 xl:px-0 md:max-w-6xl">
        <div className="lg:w-w-1/4 lg:max-w-37 md:pr-3 lg:pr-0">
          <h2 className="font-bold text-xl">About</h2>
          <ul className="mt-4.75">
            <li>
              <a
                href="/transition-guide"
                className="hover:opacity-50 transition-all text-sm font-light"
              >
                Transition Guide
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="hover:opacity-50 transition-all text-sm font-light"
              >
                Our Blog
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:opacity-50 transition-all text-sm font-light"
              >
                About Our Food
              </a>
            </li>
            <li>
              <a
                href="/press"
                className="hover:opacity-50 transition-all text-sm font-light"
              >
                Press
              </a>
            </li>
          </ul>
        </div>
        <div className="md:pt-12 lg:w-w-1/4 lg:max-w-56.5 md:pr-3 lg:pr-0">
          <div>
            <p>
              <a href="/login" className="hover:opacity-50 transition-all text-sm font-light">Log In</a>
            </p>
            <p>
              <a
                href="#TrustPilot"
                className="hover:opacity-50 transition-all text-sm font-light"
              >
                Read verified reviews on TrustPilot
              </a>
            </p>
            <p>
              <a
                href="tel:18445435226"
                className="hover:opacity-50 transition-all text-sm font-normal"
              >
                +1 (844) 543-5226
              </a>
            </p>
          </div>
          <ul className="flex mt-3.5">
            <li className="mr-1">
              <AmericanExpress />
            </li>
            <li className="mr-1">
              <MasterCard />
            </li>
            <li className="mr-1">
              <Paypal />
            </li>
            <li>
              <Visa />
            </li>
          </ul>
        </div>
        <div className="mt-9 lg:mt-0 lg:w-1/2 lg:max-w-58 md:pr-3 lg:pr-0">
          <h2 className="font-bold text-xl">Questions?</h2>
          <div className="mt-4.75">
            <p className="text-sm font-light">Email us anytime, at <a href="mailto:help@kabo.co" className="text-sm font-light hover:opacity-50 transition-all">help@kabo.co</a>.</p>
            <p className="text-sm font-light">We’ll respond within 12 hours.</p>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 lg:max-w-70">
          <h2 className="font-bold text-xl">Join our Mailing List</h2>
          <div className="mt-5">
            <p className="text-sm font-light md:w-56">Get Kabo promotions and healthy feeding advice for your dog!</p>
            <div className="flex mt-5.5">
              <input type="email" placeholder="Your Email" className="rounded-5lg bg-greebShadeInput text-sm font-light text-white px-4.25 py-3.5 subscription w-auto max-w-54 lg:max-w-43" />
              <button type="button" className="text-primary rounded-5lg bg-white font-messina font-bold text-base px-6 py-2 ml-1.75 lg:min-w-23.5 lg:text-center lg:px-0 hover:bg-greebShade hover:text-white transition-all">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-greebShade pt-5 pl-8 pb-7 pr-10 xl:px-0 md:py-7">
      <div className="container-footer mx-auto md:flex md:justify-between md:max-w-6xl md:items-center">
        <div className="flex social-list">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="mr-4 transform hover:scale-125 transition-all w-8 h-8 md:w-6 md:h-6"
          >
            <Facebook />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="transform hover:scale-125 transition-all w-8 h-8 md:w-6 md:h-6"
          >
            <Instagram />
          </a>
        </div>
        <ul className="flex justify-between flex-wrap md:lex-nowrap mt-4 md:mt-0">
          <li className="w-3/5 md:w-auto md:mr-10">
            <a href="/terms-of-use" className="hover:opacity-50 transition-all text-sm font-light">Terms of Use</a>
          </li>
          <li className="w-2/5 md:w-auto md:mr-10">
            <a href="/refund-policy" className="hover:opacity-50 transition-all text-sm font-light">Refund Policy</a>
          </li>
          <li className="w-3/5 mt-2 md:w-auto md:mt-0 md:mr-10">
            <a href="/privacy-oolicy" className="hover:opacity-50 transition-all text-sm font-light">Privacy Policy</a>
          </li>
          <li className="w-2/5 mt-2 whitespace-nowrap md:w-auto md:mt-0 text-sm font-light">©2021 Kabo Labs</li>
        </ul>
      </div>
    </section>
  </footer>
);

export default Footer;
