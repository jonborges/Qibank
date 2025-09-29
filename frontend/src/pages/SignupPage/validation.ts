interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  cpf: string;
  profilePhoto: File | null;
}

type FormErrors = Partial<Record<keyof FormInputs, string>>;

export const validate = (data: FormInputs): FormErrors => {
  const errors: FormErrors = {};

  if (!data.firstName) {
    errors.firstName = "Nome é obrigatório";
  }

  if (!data.lastName) {
    errors.lastName = "Sobrenome é obrigatório";
  }

  if (!data.email) {
    errors.email = "Email é obrigatório";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Email inválido";
  }

  if (!data.password) {
    errors.password = "Senha obrigatória";
  } else if (data.password.length < 6) {
    errors.password = "Senha mínima 6 caracteres";
  }

  if (!data.cpf) {
    errors.cpf = "CPF é obrigatório";
  }

  return errors;
};