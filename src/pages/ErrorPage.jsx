import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "../../components/ui/button";

const ErrorPage = ({
  code = "Opp!",
  title = "Something went wrong",
  message = "We apologize for the inconvenience. An unexpected error has occurred.",
  onRetry = null,
  showHomeButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="relative">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {code}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-500 leading-relaxed font-light">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          {showHomeButton && (
            <Button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          )}

          {onRetry && (
            <Button
              onClick={onRetry}
              variant="default"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
