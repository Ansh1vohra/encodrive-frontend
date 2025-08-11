import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

export default function PricingComp() {
    return (
        <motion.section id="pricing" className="py-20">
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
                        Pay only for what you use with our scalable pricing model
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        {
                            name: "Starter",
                            price: "₹0",
                            period: "forever",
                            description: "Perfect for testing and small projects",
                            features: [
                                "1GB storage",
                                "10GB monthly bandwidth",
                                "Basic support",
                                "Up to 100 files/month"
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
                                "500GB monthly bandwidth",
                                "Priority support",
                                "Up to 10,000 files/month",
                                "Custom encryption keys",
                                "Advanced analytics"
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
                                "Unlimited bandwidth",
                                "24/7 dedicated support",
                                "SLA guarantees",
                                "On-premise options",
                                "Custom integrations"
                            ],
                            cta: "Contact Sales",
                            highlight: false
                        }
                    ].map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`relative rounded-xl overflow-hidden ${plan.highlight ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            {plan.highlight && (
                                <div className="bg-blue-50 text-blue-700 text-center font-bold pt-3">
                                    Most Popular
                                </div>
                            )}

                            <div className={`${plan.highlight ? 'bg-gradient-to-b from-blue-50 to-white' : 'bg-white'} p-8 h-full`}>
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    {plan.price !== "Custom" && (
                                        <span className="text-gray-500">/mo</span>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-6">{plan.description}</p>

                                <ul className="mb-8 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <FaCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={plan.name === "Enterprise" ? "/contact" : "/signin"}
                                    className={`block text-center py-3 px-6 rounded-lg font-semibold transition-all ${plan.highlight
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                                            : 'bg-gray-100 text-blue-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {plan.cta}
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    )
}