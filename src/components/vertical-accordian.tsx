"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useWindowSize } from "@/hooks/window";
import {
  FileQuestion,
  DollarSign,
  Bell,
  MapIcon,
  ChevronRight,
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface AccordionItem {
  id: number;
  title: string;
  Icon: React.ElementType;
  faqs: FAQ[];
}

interface PanelProps {
  open: number;
  setOpen: (id: number) => void;
  id: number;
  Icon: React.ElementType;
  title: string;
  faqs: FAQ[];
}

const VerticalAccordion = () => {
  const [open, setOpen] = useState<number>(items[0].id);

  return (
    <section className="p-4 bg-gradient-to-b from-transparent/80 via-transparent/95 to-black">
      <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden rounded-3xl">
        {items.map((item) => (
          <Panel
            key={item.id}
            open={open}
            setOpen={setOpen}
            id={item.id}
            Icon={item.Icon}
            title={item.title}
            faqs={item.faqs}
          />
        ))}
      </div>
    </section>
  );
};

const Panel: React.FC<PanelProps> = ({
  open,
  setOpen,
  id,
  Icon,
  title,
  faqs,
}) => {
  const { width } = useWindowSize();
  const isOpen = open === id;
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <>
      <button
        className="bg-[#1c1c1d] hover:bg-[#434343] transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-900 text-white flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{ writingMode: "vertical-lr" }}
          className="hidden lg:block text-xl font-light rotate-180"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
        <div className="w-6 lg:w-full aspect-square rounded-full bg-orange-600 text-white grid place-items-center">
          <Icon />
        </div>
        <span className="w-4 h-4 bg-[#1c1c1d] group-hover:bg-[#434343] transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-700 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            className="w-full h-full overflow-hidden relative bg-[#111] flex flex-col"
          >
            <motion.div
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-6 py-5 text-white overflow-y-auto h-full"
            >
              <h3 className="text-xl font-semibold mb-4 text-orange-400">
                {title}
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isExpanded = expandedFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedFaq(isExpanded ? null : index);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-4 w-4 text-orange-400 flex-shrink-0" />
                        </motion.div>
                        <span className="text-sm font-medium text-white/90">
                          {faq.question}
                        </span>
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-3 pl-11 text-sm text-white/60 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerticalAccordion;

const panelVariants = {
  open: { width: "100%", height: "100%" },
  closed: { width: "0%", height: "100%" },
};

const panelVariantsSm = {
  open: { width: "100%", height: "auto" },
  closed: { width: "100%", height: "0px" },
};

const contentVariants = {
  open: { opacity: 1, y: "0%", transition: { delay: 0.125 } },
  closed: { opacity: 0, y: "100%" },
};

const items: AccordionItem[] = [
  {
    id: 1,
    title: "General Information",
    Icon: DollarSign,
    faqs: [
      {
        question: "What is Vemanothsav / Ikyam 2026?",
        answer:
          "Vemanothsav (Ikyam 2026) is the annual cultural fest of Vemana Institute of Technology, Bangalore — celebrating 25 years of culture, talent, and entertainment with competitions, performances, and special guests.",
      },
      {
        question: "Who can participate?",
        answer:
          "Students from any college or university can participate. Some events may have specific eligibility criteria mentioned in their individual rules.",
      },
      {
        question: "Is there a registration fee?",
        answer:
          "Yes, event registration fees vary by event. You can see the exact price for each event during registration. Combo/pass options may also be available.",
      },
      {
        question: "When and where is the event?",
        answer:
          "The fest takes place at Vemana Institute of Technology, Koramangala, Bangalore. Check the homepage or event pages for exact dates.",
      },
    ],
  },
  {
    id: 2,
    title: "Event Guidelines",
    Icon: FileQuestion,
    faqs: [
      {
        question: "How do I register for events?",
        answer:
          "Head to the Register page, fill in your details, select your events, complete the payment via UPI, and upload the payment screenshot to confirm your registration.",
      },
      {
        question: "Can I register for multiple events?",
        answer:
          "Absolutely! You can select as many events as you like. Just ensure there are no schedule conflicts between your chosen events.",
      },
      {
        question: "What is the team size for group events?",
        answer:
          "Team sizes vary by event. Each event listing specifies the minimum and maximum team size. Solo events are marked as individual participation.",
      },
      {
        question: "What should I bring on event day?",
        answer:
          "Bring a valid college ID, your registration confirmation (email or screenshot), and any event-specific materials mentioned in the rules.",
      },
    ],
  },
  {
    id: 3,
    title: "Competition Rules",
    Icon: Bell,
    faqs: [
      {
        question: "How are winners decided?",
        answer:
          "Each competition has its own judging criteria defined by expert judges. Criteria typically include creativity, technical skill, presentation, and audience engagement.",
      },
      {
        question: "Are there prizes for winners?",
        answer:
          "Yes! Cash prizes, certificates, and trophies are awarded to winners and runners-up of each competition. Prize details are listed on individual event pages.",
      },
      {
        question: "What happens if I violate the rules?",
        answer:
          "Violation of event rules may result in immediate disqualification. The organizing committee's decision is final and binding in all matters.",
      },
      {
        question: "Can I use pre-recorded content in performances?",
        answer:
          "This depends on the specific event. Some events require live performances only, while others allow backing tracks. Check each event's rules page for details.",
      },
    ],
  },
  {
    id: 4,
    title: "Venue & Facilities",
    Icon: MapIcon,
    faqs: [
      {
        question: "Where is the venue located?",
        answer:
          "Vemana Institute of Technology, 3rd Block, No. 1, Mahakavi Vemana Rd, Koramangala, Bengaluru, Karnataka 560034. It's easily accessible by metro and bus.",
      },
      {
        question: "Is parking available?",
        answer:
          "Limited parking is available on campus. We recommend using public transport or ride-sharing services. The nearest metro station is within walking distance.",
      },
      {
        question: "Are food and refreshments available?",
        answer:
          "Yes, food stalls and refreshment counters will be set up across the campus during the fest. A variety of cuisines and snacks will be available.",
      },
      {
        question: "Is the venue accessible for differently-abled attendees?",
        answer:
          "Yes, the venue is equipped with ramps and accessible facilities. If you need any specific assistance, please contact us in advance at Ikyam.vemanothsav@gmail.com.",
      },
    ],
  },
];
