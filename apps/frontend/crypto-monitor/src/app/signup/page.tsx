'use client';

import { FormHeader } from '@/components/signup/form-header';
import { SignupForm } from '@/components/signup/signup-form';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <FormHeader />
        <SignupForm />
      </div>
    </div>
  );
}
