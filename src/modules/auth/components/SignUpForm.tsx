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
import { ISignUp } from "@/types/inputSignup";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useregister } from "@/api/auth/register";
import { toast } from "@/hooks/use-toast";

const SignUpForm = () => {
  const { register, handleSubmit, getValues } = useForm<ISignUp>();

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (newData: ISignUp) => useregister({ data: newData }),
  });

  const onSubmit = () => {
    const data = {
      fullName: getValues("fullName"),
      email: getValues("email"),
      password: getValues("password"),
      login_provider: "credentials",
    };

    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    toast({
      title: "Sign up success!",
      description: "You can now sign in to Nebula!",
    });
    navigate("/signin");
  }

  console.log(mutation)

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
              Create your account
            </CardTitle>
            <CardDescription className="text-center">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mutation.isError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="">
                    {mutation.error.message}
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullname">Full name</Label>
                    <Input
                      type="text"
                      placeholder="Nebula"
                      {...register("fullName", { required: true })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      placeholder="nebula@domain.com"
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
                    {mutation.isPending ? (
                      <Button type="submit" className="btn-primary w-full">
                        <LoadingSpinner />
                      </Button>
                    ) : (
                      <Button type="submit" className="btn-primary w-full">
                        Sign up
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

export default SignUpForm;
