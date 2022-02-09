import { questionsAndAnswers } from "globalData";
import { snakeCase } from "lodash";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

export default function FaqAccordion() {
  return (
    <div className="mt-8 md:mt-4 max-w-3xl mx-auto">
      <Accordion
        allowZeroExpanded
        preExpanded={["what_is_staking"]}
        className="text-left"
      >
        {questionsAndAnswers.map((faq) => (
          <AccordionItem key={faq.question} uuid={snakeCase(faq.question)}>
            <AccordionItemState>
              {({ expanded }) => (
                <AccordionItemHeading
                  className={`ring-gray-300 my-1 bg-white
                    hover:bg-primary-50/20 hover:ring-primary-50/40 transition-all duration-300
                    ${
                      expanded
                        ? "ring-0 ring-primary-50/40 scale-105 bg-primary-50/20"
                        : "ring-1"
                    }`}
                >
                  <AccordionItemButton className="p-4 flex justify-between items-center">
                    {faq.question}
                    {!expanded ? (
                      <RiAddLine className="text-gray-600 h-6 w-6 inline float-right" />
                    ) : (
                      <RiSubtractLine className="text-gray-600 h-6 w-6 inline float-right" />
                    )}
                  </AccordionItemButton>
                </AccordionItemHeading>
              )}
            </AccordionItemState>
            <AccordionItemPanel className="w-11/12 mx-auto text-center p-3 border-x-2 border-gray-400">
              <p>{faq.answer}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
