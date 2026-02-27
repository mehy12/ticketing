"use client";

import { SetStateAction, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number }>;
}

export interface DiscreteTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export default function DiscreteTabs({
  tabs,
  activeTab: controlledActive,
  onChange,
  className,
}: DiscreteTabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? "");
  const activeButton = controlledActive ?? internalActive;

  const handleChange = (id: string) => {
    if (onChange) {
      onChange(id);
    } else {
      setInternalActive(id);
    }
  };

  return (
    <div className={cn("flex gap-3 items-center flex-wrap", className)}>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          title={tab.title}
          ButtonIcon={tab.icon}
          isActive={activeButton === tab.id}
          setActiveButton={() => handleChange(tab.id)}
        />
      ))}
    </div>
  );
}

function TabButton({
  title,
  ButtonIcon,
  isActive,
  setActiveButton,
}: {
  title: string;
  ButtonIcon: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { size?: number }
  >;
  isActive: boolean;
  setActiveButton: () => void;
}) {
  const [showShine, setShowShine] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isActive && isLoaded) {
      setShowShine(true);
      const timer = setTimeout(() => setShowShine(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, isLoaded]);

  const activeColor = "text-primary";

  return (
    <motion.div
      layoutId={"button-id-" + title}
      transition={{
        layout: {
          type: "spring",
          damping: 20,
          stiffness: 230,
          mass: 1.2,
          ease: [0.215, 0.61, 0.355, 1],
        },
      }}
      onClick={() => {
        setActiveButton();
        setIsLoaded(true);
      }}
      className="w-fit h-fit flex"
      style={{ willChange: "transform" }}
    >
      <motion.div
        layout
        transition={{
          layout: {
            type: "spring",
            damping: 20,
            stiffness: 230,
            mass: 1.2,
          },
        }}
        className={cn(
          "flex items-center font-mono uppercase gap-1.5 bg-secondary outline outline-2 outline-background overflow-hidden shadow-md transition-colors duration-75 ease-out p-3 cursor-pointer",
          isActive && activeColor,
          isActive ? "px-4" : "px-3"
        )}
        style={{
          borderRadius: "25px",
        }}
      >
        <motion.div
          layoutId={"icon-id" + title}
          className="shrink-0"
          style={{ willChange: "transform" }}
        >
          <ButtonIcon size={22} />
        </motion.div>
        {isActive && (
          <motion.div
            className="flex items-center"
            initial={isLoaded ? { opacity: 0, filter: "blur(4px)" } : false}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: isLoaded ? 0.2 : 0,
              ease: [0.86, 0, 0.07, 1],
            }}
          >
            <motion.span
              layoutId={"text-id-" + title}
              className="text-sm font-medium font-mono uppercase whitespace-nowrap relative inline-block"
              style={{ willChange: "transform" }}
            >
              {title}
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
