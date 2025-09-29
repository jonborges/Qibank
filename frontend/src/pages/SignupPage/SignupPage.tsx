import { useState, type FormEvent, type ChangeEvent } from "react";
import styles from "./SignupPage.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { validate } from "./validation";
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  cpf: string;
  profilePhoto: File | null;
}

export default function SignupPage() {
  const [formState, setFormState] = useState<FormInputs>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpf: "",
    profilePhoto: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormInputs | "api", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "profilePhoto" && files) {
      setFormState((prev) => ({ ...prev, profilePhoto: files[0] }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formState); 
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

      const payload = {
        nome: `${formState.firstName} ${formState.lastName}`,
        email: formState.email,
        password: formState.password,
        cpf: formState.cpf,
        phone: formState.phone,
      };

      const response = await fetch(`${apiUrl}/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Tratamento de erro seguro
      if (!response.ok) {
        let errorMessage = "Falha ao realizar o cadastro.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }

      const novoCliente = await response.json();
      console.log("Cliente criado:", novoCliente);
      login(novoCliente); // Define o estado como logado e salva os dados do usuário
      alert("Cadastro realizado com sucesso!");
      navigate('/account'); // Redireciona para a página da conta

    } catch (error: any) {
      setErrors({ ...errors, api: error.message });
      alert(`Erro: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (
    name: keyof FormInputs,
    label: string,
    type = "text",
    placeholder?: string
  ) => (
    <label className={styles.label}>
      {label}
      <input
        className={`${styles.input} ${errors[name] ? styles.inputError : ""}`}
        type={type}
        name={name}
        value={(formState[name] as string) ?? ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errors[name] && <span className={styles.error}>{errors[name]}</span>}
    </label>
  );

  return (
    <>
      <Header />
      <div className={styles.page}>
        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.title}>Criar conta</h2>

          {renderInput("firstName", "Nome")}
          {renderInput("lastName", "Sobrenome")}
          {renderInput("email", "E-mail", "email", "seu@exemplo.com")}
          {renderInput("cpf", "CPF", "text", "000.000.000-00")}
          {renderInput("password", "Senha", "password", "••••••••")}
          {renderInput("phone", "Telefone", "text", "(00) 00000-0000")}

          {errors.api && <span className={styles.error}>{errors.api}</span>}

          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Criar conta"}
          </button>

          <p className={styles.loginLink}>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}
