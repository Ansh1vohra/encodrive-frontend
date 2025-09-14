import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

export default function PricingComp() {
    return (
        <motion.section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl text-[#4963c1] md:text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Simple, Transparent Pricing
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Choose the plan that works for you. No hidden fees.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Free",
                            price: "₹0",
                            period: "forever",
                            description: "Perfect for testing and small projects",
                            features: [
                                "1GB storage",
                                "Up to 100 files/month",
                                "Basic support"
                            ],
                            cta: "Get Started",
                            highlight: false
                        },
                        {
                            name: "Pro",
                            price: "₹399",
                            period: "per month",
                            description: "For growing applications",
                            features: [
                                "50GB storage",
                                "Unlimited files",
                                "Priority support",
                                // "Custom encryption keys"
                            ],
                            cta: "Start Free Trial",
                            highlight: true
                        },
                        {
                            name: "Enterprise",
                            price: "Custom",
                            period: "tailored for you",
                            description: "For large-scale applications",
                            features: [
                                "Unlimited storage",
                                "Unlimited files",
                                "24/7 dedicated support",
                                "SLA guarantees",
                                // "Custom integrations"
                            ],
                            cta: "Contact Sales",
                            highlight: false
                        }
                    ].map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                                plan.highlight 
                                    ? 'ring-2 ring-[#4963c1] shadow-2xl border-0' 
                                    : 'border border-gray-200 shadow-lg'
                            }`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#4963c1] to-[#3a52a8] text-white text-center font-semibold py-3 text-sm">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className={`${plan.highlight ? 'pt-16' : 'pt-8'} pb-8 px-8 bg-white h-full flex flex-col`}>
                                {/* Header */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center mb-2">
                                        <span className="text-4xl font-bold text-[#4963c1]">{plan.price}</span>
                                        {plan.price !== "Custom" && (
                                            <span className="text-gray-500 text-lg ml-1">/month</span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm">{plan.period}</p>
                                </div>

                                {/* Description */}
                                <p className="text-gray-700 text-center mb-8 px-4">{plan.description}</p>

                                {/* Features */}
                                <div className="mb-8 space-y-4 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start">
                                            <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <a
                                    href={plan.name === "Enterprise" ? "/contact" : "/signin"}
                                    className={`w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                                        plan.highlight
                                            ? 'bg-gradient-to-r from-[#4963c1] to-[#3a52a8] text-white hover:shadow-lg hover:from-[#3a52a8] hover:to-[#2a3a7a]'
                                            : 'bg-gray-100 text-[#4963c1] hover:bg-gray-200 hover:text-[#3a52a8]'
                                    }`}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div 
                    className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">All plans include:</h3>
                    <div className="flex flex-wrap justify-center gap-6 text-gray-700">
                        <div className="flex items-center">
                            <FaCheck className="text-green-500 mr-2" />
                            End-to-end encryption
                        </div>
                        <div className="flex items-center">
                            <FaCheck className="text-green-500 mr-2" />
                            Secure file storage
                        </div>
                        <div className="flex items-center">
                            <FaCheck className="text-green-500 mr-2" />
                            Easy API integration
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}