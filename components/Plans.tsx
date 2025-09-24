interface Plan {
  name: string;
  priceKES: number;
  priceUSD: number;
  features: string[];
  link: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    priceKES: 300,
    priceUSD: 2.5,
    features: [
      "50 Word downloads/month",
      "No PDFs",
      "Priority email support",
    ],
    link: "https://payhip.com/QuickSoftwares", // replace with your product link
  },
  {
    name: "Pro",
    priceKES: 800,
    priceUSD: 6.5,
    features: [
      "Unlimited Word downloads",
      "10 PDF downloads/month",
      "Remove PDF watermark",
      "3 premium resume templates",
      "Save up to 5 resumes",
    ],
    link: "https://payhip.com/QuickSoftwares", // replace with Pro link
  },
  {
    name: "Business",
    priceKES: 2500,
    priceUSD: 20,
    features: [
      "Unlimited Word & PDF downloads",
      "Remove watermark always",
      "Unlimited resume/cover history",
      "All templates + priority support",
      "Bulk exports (agencies)",
    ],
    link: "https://payhip.com/QuickSoftwares", // replace with Business link
  },
];

export default function Plans() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-teal">
        Choose Your Plan
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-xl shadow-md p-6 flex flex-col"
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-teal text-lg font-semibold mb-4">
              KES {plan.priceKES} / ~${plan.priceUSD}
            </p>

            <ul className="flex-1 space-y-2 mb-6 text-sm">
              {plan.features.map((f, idx) => (
                <li key={idx}>✅ {f}</li>
              ))}
            </ul>

            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal text-white py-2 rounded-lg text-center hover:bg-teal-dark transition"
            >
              Subscribe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
