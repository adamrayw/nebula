import LoadingSpinner from "@/modules/core/components/design-system/LoadingSpinner";
import Logo from "@/modules/core/components/design-system/Logo";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/modules/core/components/design-system/ui/alert";
import { Button } from "@/modules/core/components/design-system/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/modules/core/components/design-system/ui/card";
import { Input } from "@/modules/core/components/design-system/ui/input";
import { Label } from "@/modules/core/components/design-system/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISignIn } from "@/types/inputSignin";

const SignInForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignIn>();

  const onSubmit: SubmitHandler<ISignIn> = async (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="card-container p-4">
          <CardHeader>
            <div className="flex justify-center">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <CardTitle className="text-center text-heading-5">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                  {/* <div>
          <Label htmlFor="fullname">Full name</Label>
          <Input type="text" name="fullName" placeholder="Nebulo" />
        </div> */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Ooppss!</AlertTitle>
                      <AlertDescription className="">{error}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="nebulo@domain.com"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      placeholder="******"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <div className="">
                    {loading ? (
                      <Button
                        type="submit"
                        className="btn-primary w-full"
                        disabled={loading}
                      >
                        <LoadingSpinner />
                      </Button>
                    ) : (
                      <Button type="submit" className="btn-primary w-full">
                        Sign in
                      </Button>
                    )}
                  </div>
                </div>
              </form>
              {/* <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div> */}
              <div className="flex gap-x-4">
                {/* <GoogleBtn name="Sign up" /> */}
                {/* <Button
                    className="w-full bg-white border btn-white"
                    type="button"
                  >
                    <Image
                      src={"/github-icon.svg"}
                      alt="Github"
                      width={20}
                      height={20}
                    />
                  </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInForm;
