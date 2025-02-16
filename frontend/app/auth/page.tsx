"use client";
import { login } from "@/api/user";
import { IUser } from "@/interfaces/entity";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInForm = () => {
  const FormSchema = z.object({
    email: z
      .string({})
      .min(1, {
        message: "L'email est obligatoire",
      })
      .email({
        message: "L'email est invalide",
      }),
    password: z.string({
      message: "Le nom est obligatoire",
    }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    function onError(response: unknown): response is IUser {
      return (response as IUser).id !== undefined;
    }
    const results = await login(data);

    if (!onError(results)) {
      if (results.type === "email") {
        setError("email", {
          message: "L'email n'existe pas",
        });
      } else {
        console.log("Error password");

        setError("password", {
          message: "Mots de passe incorrecte",
        });
      }
    } else {
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Se connecter
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              {...register("email")}
            />

            {errors?.email?.message && (
              <p className="text-sm font-bold text-[#f24646]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mots de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              {...register("password")}
            />

            {errors?.password?.message && (
              <p className="text-sm font-bold text-[#f24646]">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md mt-4 hover:bg-indigo-700"
          >
            Se connecter
          </button>
        </form>

        {/* Google Sign In Button */}
        <div className="mt-6 w-full flex items-center justify-center">
          <form action="/api/auth/google" className="w-[100%]">
            <button
              className="flex items-center justify-center bg-gray-300 text-black py-2 px-4 rounded-md w-full cursor-pointer"
              type="submit"
            >
              <img
                src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Se connecter avec Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default function page() {
  return <SignInForm />;
}
