'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { FormField } from './form-field';

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    // TODO: Implement signup logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full">
        Sign up
      </Button>
    </form>
  );
};
