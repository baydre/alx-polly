import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Suspense } from "react";

function LoginContent() {
  return (
    <>
      <LoginForm />
    </>
  );
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in to Polly</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {params.message && (
              <Alert className="mb-4">
                <AlertDescription>{params.message}</AlertDescription>
              </Alert>
            )}
            <Suspense fallback={<div>Loading...</div>}>
              <LoginContent />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
