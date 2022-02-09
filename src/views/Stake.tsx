import React from "react";
import Layout from "components/Layout";
import SEO from "components/SEO";
import StakingTable from "components/Tables/StakingTable";
import FaqAccordion from "components/widgets/Accordion/FaqAccordion";
import { stakingFaqs } from "globalData";

export default function Stake() {
  return (
    <Layout>
      <SEO
        slug="/stake"
        title="Stake to earn more"
        pageDescription="Stake your ASP tokens within the Staking Portal and earn daily interest.
            Additionally, Stakers are rewarded AVAX tokens from the daily Lobbies based off the
            percentage of total tokens beign staked."
      />
      <div className="px-4 pt-20 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl px-8 mx-auto mb-16">
          <h1>Stake ASP and earn AVAX tokens daily!</h1>
          <p>
            Stake your ASP tokens within the Staking Portal and earn daily
            interest. Additionally, Stakers are rewarded AVAX tokens from the
            daily Lobbies based off the percentage of total tokens beign staked.
          </p>
        </div>
        <div
          className="bg-white shadow-md flex flex-col sm:flex-row justify-between divide-y
          sm:divide-y-0 p-5"
        >
          <div className="text-lg text-gray-500">
            SHARE RATE{" "}
            <span className="inline-block ml-2 text-2xl font-semibold text-gray-500">
              0/ASP
            </span>
          </div>
          <div className="text-lg text-gray-500">
            VERAGE DIVIDENDS POOL{" "}
            <span className="inline-block ml-2 text-2xl font-semibold text-gray-500">
              0
            </span>
          </div>
        </div>
        <div className="my-8">
          <h3 className="text-center">MY STAKES</h3>
          <div className="flex flex-col items-center md:flex-row-reverse md:items-start gap-4">
            <StakingTable />
            <div className="max-w-xs p-2 md:bg-gray-50">
              <h3 className="text-center">Page FAQ</h3>
              <FaqAccordion faqs={stakingFaqs} expandedUuids={["what_is_staking"]} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
