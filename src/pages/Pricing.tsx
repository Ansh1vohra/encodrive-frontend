
const plans = [
  {
    name: "Starter",
    price: "Rs 0",
    description: "Perfect for testing and small projects",
    features: [
      "1GB storage",
      "10GB monthly bandwidth",
      "Basic support",
      "Up to 100 files/month"
    ],
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "Rs 399/Month",
    description: "For growing applications",
    features: [
      "50GB storage",
      "500GB monthly bandwidth",
      "Priority support",
      "Up to 10,000 files/month",
      "Custom encryption keys"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale applications",
    features: [
      "Unlimited storage",
      "Unlimited bandwidth",
      "24/7 dedicated support",
      "SLA guarantees",
      "On-premise options",
      "Custom integrations"
    ],
    cta: "Contact Sales"
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#4963c1]">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Pay only for what you use with our scalable pricing model. Start for free, upgrade as you grow.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 pricing-card ${plan.popular ? "border-2 border-[#4963c1]" : ""}`}
          >
            {plan.popular && (
              <div className="bg-[#4963c1] text-white text-center py-1 font-medium">
                Most Popular
              </div>
            )}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold mb-4 text-[#4963c1]">{plan.price}</p>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.name === "Enterprise" ? "/contact" : "/signin"}
                className={`block text-center py-3 px-6 rounded-md font-medium ${plan.popular ? "bg-[#4963c1] hover:bg-[#3a52a8] text-white" : "bg-gray-100 hover:bg-gray-200 text-[#4963c1]"}`}
              >
                {plan.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-2 text-[#4963c1]">Ready to get started?</h2>
        <p className="text-lg text-gray-600 mb-6">Join developers who trust Encodrive for secure, end-to-end encrypted file storage.</p>
        <a
          href="/signin"
          className="inline-block bg-[#4963c1] hover:bg-[#3a52a8] text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Start Free Trial
        </a>
      </div>
    </div>
  );
}