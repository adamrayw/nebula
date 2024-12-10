import { Button } from "@/modules/core/components/design-system/ui/button";
import { Link } from "react-router";

const CTA = () => {
  return (
    <div className="bg-blue-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-heading-2 !text-white">
            Ready to get started?
            <br />
            Try our file manager today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Join thousands of users who trust our platform for their file
            management needs. Start with our free plan and upgrade anytime.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="btn-white" asChild>
              <Link to="/register">Get started</Link>
            </Button>
            <Link
              to="/pricing"
              className="text-sm font-semibold leading-6 text-white"
            >
              View pricing <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
