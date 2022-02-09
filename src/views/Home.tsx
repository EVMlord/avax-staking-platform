import React from "react";
import Layout from "components/Layout";
import Link from "components/Link";
import SEO from "components/SEO";
import FaqAccordion from "components/widgets/Accordion/FaqAccordion";
import { RiCalendar2Line, RiMoneyDollarBoxLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";


export default function HomePage() {

  return (
    <Layout>
      <SEO
        title="Stake it till you make it - Longer and Bigger Pays Better!"
        slug="Home"
        pageDescription="Stake your ASP tokens within the Staking Portal and earn daily
          interest. Additionally, Stakers are rewarded AVAX tokens from the
          daily Lobbies based off the percentage of total tokens beign
          staked."
      />
      {/* Hero header */}
      <div className="bg-primary-50/10 bg-gradient-to-b from-white">
        <div
          className="h-screen max-h-[900px] max-w-screen-2xl mx-auto flex flex-col justify-center
          items-center -my-0 px-8 lg:px-20"
        >
          <div className="w-full max-w-4xl -mt-20 md:mt-0 text-center md:text-left">
            <h1>ASP Community Staking Platform built on AVALANCHE</h1>
            <p className="my-4 py-2">
              The community has taken on this project and we're here to help it
              succeed! Stake it till you make it - Longer and Bigger Pays
              Better!
            </p>
            <div className="my-4 -mx-4">
              <Link
                to="/buy-asp"
                className="mx-4 lg:w-auto"
                button
              >
                Buy ASP
              </Link>
              <Link to="/stake" className="mx-4 lg:w-auto" button>
                Stake ASP
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-12 px-4 lg:px-8 max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-center">
          <div className="max-w-xs md:max-w-sm lg:mx-10 text-center mb-8 md:mb-0">
            <div className="h-20 w-20 mx-auto mb-3">
              <RiMoneyDollarBoxLine className="w-20 h-20" />
            </div>
            <h2 className="text-2xl mb-4">Lucrative Staking System</h2>
            <p>
              Stake your ASP tokens within the Staking Portal and earn daily
              interest. Additionally, Stakers are rewarded AVAX tokens from the
              daily Lobbies based off the percentage of total tokens beign
              staked.
            </p>
          </div>
          <div className="max-w-xs md:max-w-sm lg:mx-10 my-4 text-center">
            <div className="h-20 w-20 mx-auto mb-3">
              <RiCalendar2Line className="w-20 h-20" />
            </div>
            <h2 className="text-2xl mb-4">Daily Auction Lobby</h2>
            <p>
              Our Daily Auctions will start from 5 million ASP tokens per day
              and will be distributed between the users that participated in
              Auction based on their purchase amount. This will reduce over the
              next 365 days
            </p>
          </div>
          <div className="max-w-xs md:max-w-sm lg:mx-10 my-4 text-center">
            <div className="h-20 w-20 mx-auto mb-3">
              <GiReceiveMoney className="w-20 h-20" />
            </div>
            <h2 className="text-2xl mb-4">Daily AVAX Dividends</h2>
            <p>
              Everyday 97% of the previous day's AVAX that was spent in the
              Auction Lobby will be pooled and allocated to users based upon
              their completed stake terms.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary-50/10">
        <div
          id="contact-us"
          className="px-4 lg:px-8 h-[500px] max-w-screen-2xl mx-auto
            flex flex-col justify-center text-center"
        >
          <h2>Join our Community</h2>
          <div className="mt-8 md:mt-4">
            <p className="mb-4">
              Learn more about the project, interact with the team, and take a
              part in shaping the future of AVAX Staking Platform.
            </p>
            <Link to="/telegam" button>
              Telegram
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div
          id="contact-us"
          className="px-4 py-16 lg:px-8 max-w-screen-2xl mx-auto text-center"
        >
          <h2>Staking FAQ</h2>
          <FaqAccordion />
        </div>
      </div>
    </Layout>
  );
}
