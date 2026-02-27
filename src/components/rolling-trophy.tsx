"use client";
import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const RollingTrophy = () => {
    return (
        <section className="relative text-white py-20 px-6 overflow-hidden bg-gradient-to-b from-transparent/30 to-transparent/30">
            {/* Decorative background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Trophy Icon & Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] mb-6 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                    >
                        <Trophy className="w-10 h-10 text-black" />
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-extrabold text-[#D4AF37] drop-shadow-lg tracking-tight">
                        Rolling Trophy
                    </h2>
                </motion.div>

                {/* Main Description Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-8 md:p-10 shadow-[0_0_60px_rgba(212,175,55,0.08)]"
                >
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-2xl" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-[#FDF6E3] leading-relaxed font-light text-center mb-8"
                    >
                        The{" "}
                        <span className="text-[#FFD700] font-semibold">Rolling Trophy</span>{" "}
                        will be awarded to the college that demonstrates{" "}
                        <span className="text-[#E5C100] font-semibold italic">
                            outstanding participation and performance
                        </span>{" "}
                        during the fest.
                    </motion.p>

                    {/* Criteria */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        <p className="text-lg text-[#FDF6E3]/80 text-center mb-6 font-light">
                            The trophy will be presented to the college that:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Criterion 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex items-start gap-4 p-5 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors duration-300"
                            >
                                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-2xl">
                                    📋
                                </span>
                                <div>
                                    <p className="text-[#FDF6E3] text-lg leading-relaxed">
                                        Records the{" "}
                                        <span className="text-[#FFD700] font-bold">
                                            highest number of registrations
                                        </span>{" "}
                                        across all events.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Criterion 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="flex items-start gap-4 p-5 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors duration-300"
                            >
                                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-2xl">
                                    🏅
                                </span>
                                <div>
                                    <p className="text-[#FDF6E3] text-lg leading-relaxed">
                                        Secures the{" "}
                                        <span className="text-[#FFD700] font-bold">
                                            highest number of prizes
                                        </span>{" "}
                                        overall.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
                />
            </div>
        </section>
    );
};

export default RollingTrophy;
