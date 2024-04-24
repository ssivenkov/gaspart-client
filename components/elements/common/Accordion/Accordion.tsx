import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IAccordion } from "@/types/common";

const Accordion = ({ children, title, titleCLass, arrowOpenClass }: IAccordion) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleAccordion = () => setExpanded(!expanded);

  return (
    <>
      <motion.button
        initial={false}
        onClick={toggleAccordion}
        className={`${titleCLass} ${expanded ? arrowOpenClass : ''}`}
      >
        {title}
      </motion.button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
