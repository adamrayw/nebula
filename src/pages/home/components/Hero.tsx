import { Button } from "@/pages/core/components/design-system/ui/button";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section>
      <div className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-500/20">
                GET 50MB FREE!🎉
              </span>
            </div>
            <h1 className="text-heading-1">
              Secure cloud storage for your files.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Making cloud storage secure and easy to use for everyone.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="btn-primary" asChild>
                <Link to="/register">Get started</Link>
              </Button>
              <Link
                to="#features"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="h-[24rem] w-[36rem] rounded-lg bg-gray-50 p-4 ring-1 ring-inset ring-gray-900/10">
                  <div className="flex h-full flex-col">
                    {/* File System Preview UI */}
                    <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center justify-center space-y-2"
                        >
                          <div className="h-16 w-16 rounded-lg bg-blue-100"></div>
                          <div className="h-2 w-16 rounded bg-gray-200"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
