"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type FormFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField = ({ id, label, type, placeholder, value, onChange }: FormFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} placeholder={placeholder} required value={value} onChange={onChange} />
  </div>
);
