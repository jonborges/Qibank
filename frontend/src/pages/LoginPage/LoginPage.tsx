import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formState.email || !formState.password) {
      setError("Por favor, preencha e-mail и senha.");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Falha no login. Verifique suas credenciais." }));
        throw new Error(errorData.message);
      }

      const loggedInUser = await response.json();
      console.log("Usuário logado:", loggedInUser);

      // Se o login no backend for bem-sucedido:
      login(loggedInUser);
      navigate("/account");

    } catch (err: any) {
      setError(err.message || "Falha no login. Verifique suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.page}>
        <form className={styles.card} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.title}>Entrar na sua conta</h2>

          <label className={styles.label}>
            E-mail
            <input
              className={styles.input}
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="seu@exemplo.com"
            />
          </label>

          <label className={styles.label}>
            Senha
            <input
              className={styles.input}
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          {error && <span className={styles.error}>{error}</span>}

          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <p className={styles.signupLink}>
            Não tem uma conta? <Link to="/create-account">Crie uma agora</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}