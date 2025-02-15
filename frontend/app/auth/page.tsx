import React from "react";
const SignInForm = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Se connecter
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mots de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md mt-4 hover:bg-indigo-700"
        >
          Se connecter
        </button>

        {/* Google Sign In Button */}
        <div className="mt-6 w-full flex items-center justify-center">
          <form action="/api/auth/google" className="w-[100%]">
            <button
              className="flex items-center justify-center bg-gray-100 text-black py-2 px-4 rounded-md w-full cursor-pointer"
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
