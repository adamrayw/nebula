import { Clock10, Cloud, ShieldCloseIcon } from "lucide-react";

const features = [
  {
    name: "Cloud Storage",
    description:
      "Store your files securely in the cloud with 50MB of free storage.",
    icon: Cloud,
  },
  {
    name: "Security & Encryption",
    description:
      "Keep your files safe with end-to-end encryption and secure file sharing.",
    icon: ShieldCloseIcon,
  },
  {
    name: "Activity History",
    description:
      "Track your file activity and history with our detailed logs.",
    icon: Clock10,
  },
];

const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Powerful Features
          </h2>
          <p className="text-heading-2">
            Everything you need to store files securely.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nebula offers a wide range of features to help you store files in the cloud.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-blue-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
