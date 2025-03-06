import { Button } from "@/pages/core/components/design-system/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/pages/core/components/design-system/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router";

const Pricing = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Personal",
      price: 75000,
      description: "Perfect for individual storage needs",
      buttonText: "Get Personal Plan",
      limit: 104857600,
      features: [
        "100MB secure storage",
        // "File versioning up to 30 days",
        // "Access on all devices",
        // "End-to-end encryption",
        // "Basic sharing features",
      ],
    },
    {
      id: 2,
      name: "Professional",
      price: 195000,
      description: "Ideal for professionals and small teams",
      popular: true,
      buttonText: "Get Professional Plan",
      limit: 1073741824,
      features: [
        "1GB secure storage",
        // "File versioning up to 90 days",
        // "Priority support",
        // "Advanced sharing controls",
        // "Team folders",
        // "Offline access",
        // "Smart sync",
      ],
    },
    {
      id: 3,
      name: "Business",
      price: 450000,
      description: "For growing businesses with advanced needs",
      buttonText: "Get Business Plan",
      limit: 5368709120,
      features: [
        "5GB secure storage",
        // "Unlimited version history",
        // "24/7 priority support",
        // "Admin console",
        // "User management",
        // "Audit logs",
        // "Advanced security features",
        // "API access",
      ],
    },
  ];

  return (
    <section id="pricing">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pricing Plans
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Secure, reliable cloud storage for all your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-visible ${
                  plan.popular
                    ? "border-blue-600 shadow-xl scale-105"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="min-h-[48px]">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                  asChild
                  onClick={() => {
                    localStorage.setItem("selectedPlan", JSON.stringify(plan));
                  }}
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Link to="/confirm-payment">{plan.buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-gray-500">
            <p>
              All plans include SSL security, automatic backups, and 99.9%
              uptime guarantee.
            </p>
            <p className="mt-2">
              Need more storage? Contact us for custom enterprise plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
