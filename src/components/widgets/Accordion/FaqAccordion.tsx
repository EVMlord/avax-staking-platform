import React from "react";
import { snakeCase } from "lodash";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

interface FaqAccordionProps {
  faqs: {
    question: string;
    answer: string;
  }[];
  expandedUuids: string[];
}

export default function FaqAccordion({faqs, expandedUuids}: FaqAccordionProps) {
  return (
    <div className="mt-8 md:mt-4 w-full max-w-3xl mx-auto text-base">
      <Accordion
        allowZeroExpanded={false}
        preExpanded={expandedUuids}
        className="text-left"
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} uuid={snakeCase(faq.question)}>
            <AccordionItemState>
              {({ expanded }) => (
                <AccordionItemHeading
                  className={`ring-gray-300 my-1 bg-white ring-1
                    hover:bg-primary-50/20 hover:ring-primary-50/40 transition-all duration-300
                    ${
                      expanded
                        ? "bg-primary-50/20 ring-primary-50"
                        : ""
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
            <AccordionItemPanel className="mx-auto text-sm p-3 border-x-2 border-gray-400
              transition-all duration-300">
              <p>{faq.answer}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
