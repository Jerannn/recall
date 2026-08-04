import { SubmitEvent, useState } from "react";
import { signinSchema, signupSchema } from "../schema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { INITIAL_AUTH_ERRORS } from "@/utils/constant";

type AuthFormData = {
  name?: string;
  email: string;
  password: string;
};

type EmailAuthProps = {
  mode: "signin" | "signup";
};

export default function useEmailAuth({ mode }: EmailAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] =
    useState<Record<string, string>>(INITIAL_AUTH_ERRORS);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
    formData: AuthFormData,
  ) => {
    e.preventDefault();
    setFieldErrors(INITIAL_AUTH_ERRORS);
    setServerError(null);

    const schema = mode === "signup" ? signupSchema : signinSchema;
    const validation = schema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      console.log(errors);
      setFieldErrors(errors);
      return;
    }

    const callbacks = {
      onRequest: () => setIsLoading(true),
      onSuccess: () => {
        setIsLoading(false);
        router.push("/dashboard");
        router.refresh();
      },
      onError: (ctx: { error: { message?: string } }) => {
        setIsLoading(false);
        setServerError(ctx.error.message || "Something went wrong");
      },
    };

    if (mode === "signup") {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.name || "",
        },
        callbacks,
      );
    } else {
      await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
        },
        callbacks,
      );
    }
  };

  return { isLoading, fieldErrors, serverError, handleSubmit };
}
