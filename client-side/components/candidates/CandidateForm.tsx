"use client";

import { useState, FormEvent } from "react";
import { CreateCandidateDTO } from "@/types/candidate";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface CandidateFormProps {
  onSubmit: (data: CreateCandidateDTO) => Promise<void>;
  onCancel: () => void;
}

type FormErrors = Partial<Record<keyof CreateCandidateDTO, string>>;

const emptyForm: CreateCandidateDTO = {
  name: "",
  email: "",
  phone: "",
  position: "",
};

function validate(data: CreateCandidateDTO): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Nome é obrigatório";
  if (!data.email.trim()) errors.email = "E-mail é obrigatório";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "E-mail inválido";
  if (!data.phone.trim()) errors.phone = "Telefone é obrigatório";
  if (!data.position.trim()) errors.position = "Cargo é obrigatório";
  return errors;
}

export function CandidateForm({ onSubmit, onCancel }: CandidateFormProps) {
  const [form, setForm] = useState<CreateCandidateDTO>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof CreateCandidateDTO) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setSubmitting(true);
      await onSubmit(form);
      setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome completo"
        placeholder="Ex: Maria Silva"
        value={form.name}
        onChange={handleChange("name")}
        error={errors.name}
      />
      <Input
        label="E-mail"
        type="email"
        placeholder="maria@email.com"
        value={form.email}
        onChange={handleChange("email")}
        error={errors.email}
      />
      <Input
        label="Telefone"
        placeholder="(11) 91234-5678"
        value={form.phone}
        onChange={handleChange("phone")}
        error={errors.phone}
      />
      <Input
        label="Cargo pretendido"
        placeholder="Ex: Desenvolvedor Front-end"
        value={form.position}
        onChange={handleChange("position")}
        error={errors.position}
      />
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={submitting}>
          Cadastrar candidato
        </Button>
      </div>
    </form>
  );
}