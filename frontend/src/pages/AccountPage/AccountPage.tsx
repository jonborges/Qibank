import { useState, type FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountPage.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useAuth } from '../../context/AuthContext';

export default function AccountPage() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  // Controla qual formulário de ação está visível
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  const [showBalance, setShowBalance] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(user?.saldo ?? 0);

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getFormattedFirstName = () => {
    if (!user?.nome) {
      return '';
    }
    const firstName = user.nome.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  const fetchBalance = async () => {
    if (!user) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/clientes/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setCurrentBalance(data.saldo);
        login({ ...user, saldo: data.saldo });
      }
    } catch (err) {
      console.error("Falha ao buscar saldo:", err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleDepositSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user || !depositAmount || parseFloat(depositAmount) <= 0) {
      setError("Por favor, insira um valor de depósito válido.");
      return;
    }
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/clientes/${user.id}/depositar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor: depositAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao realizar o depósito.");
      }

      alert("Depósito realizado com sucesso!");
      setActiveAction(null);
      setDepositAmount('');
      fetchBalance(); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWithdrawSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user || !withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setError("Por favor, insira um valor de saque válido.");
      return;
    }
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/clientes/${user.id}/sacar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor: withdrawAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao realizar o saque.");
      }

      alert("Saque realizado com sucesso!");
      setActiveAction(null);
      setWithdrawAmount('');
      fetchBalance(); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!newEmail) {
      setError("O novo e-mail não pode ser vazio.");
      return;
    }
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/clientes/${user?.id}/email`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ novoEmail: newEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao alterar o e-mail.");
      }

      const updatedUser = await response.json();
      login(updatedUser); 
      alert("E-mail alterado com sucesso!");
      setActiveAction(null);
      setNewEmail('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmNewPassword) {
      setError("As novas senhas não coincidem.");
      return;
    }
    if (newPassword.length < 6) {
      setError("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await fetch(`${apiUrl}/api/clientes/${user?.id}/senha`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senhaAtual: currentPassword, novaSenha: newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao alterar a senha.");
      }

      alert("Senha alterada com sucesso!");
      setActiveAction(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Tem certeza que deseja deletar sua conta? Esta ação é irreversível.")) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
        const response = await fetch(`${apiUrl}/api/clientes/${user?.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error("Falha ao deletar a conta.");
        }

        alert("Conta deletada com sucesso!");
        logout();
        navigate('/');
      } catch (err: any) {
        alert(`Erro: ${err.message}`);
      }
    }
  };

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <div className={styles.welcomeHeader}>
          <h1 className={styles.title}>Bem-vindo, {getFormattedFirstName()}!</h1>
          <p className={styles.subtitle}>Gerencie sua conta QiBank aqui.</p>
        </div>

        <div className={styles.balanceCard}>
          <h3>Saldo em Conta</h3>
          <div className={styles.balanceValue}>
            {showBalance ? (
              `R$ ${currentBalance.toFixed(2).replace('.', ',')}`
            ) : (
              'R$ ****,**'
            )}
          </div>
          <button onClick={() => setShowBalance(!showBalance)} className={styles.balanceToggleButton}>{showBalance ? 'Ocultar' : 'Mostrar Saldo'}</button>
        </div>

        <div className={styles.optionsGrid}>
          <div className={styles.optionCard}>
            <h2>Transações</h2>
            <p>Adicione ou retire dinheiro da sua conta.</p>
            <div className={styles.cardActionGroup}>
              <button onClick={() => { setActiveAction(activeAction === 'deposit' ? null : 'deposit'); setError(null); }} className={styles.actionButton}>
                Depositar
              </button>
              <span className={styles.actionSeparator}>→</span>
              <button onClick={() => { setActiveAction(activeAction === 'withdraw' ? null : 'withdraw'); setError(null); }} className={styles.actionButton}>
                Sacar
              </button>
            </div>
          </div>
          <button onClick={() => { setActiveAction(activeAction === 'email' ? null : 'email'); setError(null); }} className={styles.optionCard}>
            <h2>Alterar E-mail</h2>
            <p>Atualize seu endereço de e-mail.</p>
            {activeAction === 'email' && <span className={styles.closeIndicator}>Fechar</span>}
          </button>
          <button onClick={() => { setActiveAction(activeAction === 'password' ? null : 'password'); setError(null); }} className={styles.optionCard}>
            <h2>Alterar Senha</h2>
            <p>Mantenha sua conta segura.</p>
            {activeAction === 'password' && <span className={styles.closeIndicator}>Fechar</span>}
          </button>
        </div>

        {/* Container para os formulários de ação */}
        {activeAction === 'deposit' && (
          <div className={styles.actionFormContainer}>
            <h2>Realizar Depósito</h2>
            <form onSubmit={handleDepositSubmit} className={styles.actionForm}>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Valor do depósito"
                className={styles.modalInput}
              />
              <button type="submit" className={styles.modalButtonConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Confirmando...' : 'Confirmar Depósito'}
              </button>
              {error && <p className={styles.modalError}>{error}</p>}
            </form>
          </div>
        )}

        {activeAction === 'withdraw' && (
          <div className={styles.actionFormContainer}>
            <h2>Realizar Saque</h2>
            <form onSubmit={handleWithdrawSubmit} className={styles.actionForm}>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Valor do saque"
                className={styles.modalInput}
              />
              <button type="submit" className={styles.modalButtonConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Confirmando...' : 'Confirmar Saque'}
              </button>
              {error && <p className={styles.modalError}>{error}</p>}
            </form>
          </div>
        )}

        {activeAction === 'email' && (
          <div className={styles.actionFormContainer}>
            <h2>Alterar E-mail</h2>
            <form onSubmit={handleEmailSubmit} className={styles.actionForm}>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="novo@email.com"
                className={styles.modalInput}
              />
              <button type="submit" className={styles.modalButtonConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar E-mail'}
              </button>
              {error && <p className={styles.modalError}>{error}</p>}
            </form>
          </div>
        )}

        {activeAction === 'password' && (
          <div className={styles.actionFormContainer}>
            <h2>Alterar Senha</h2>
            <form onSubmit={handlePasswordSubmit} className={styles.actionForm}>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Senha atual" className={styles.modalInput} />
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nova senha" className={styles.modalInput} />
              <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirmar nova senha" className={styles.modalInput} />
              <button type="submit" className={styles.modalButtonConfirm} disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Senha'}
              </button>
              {error && <p className={styles.modalError}>{error}</p>}
            </form>
          </div>
        )}

        <div className={styles.dangerZone}>
          <h3 className={styles.dangerTitle}>Zona de Perigo</h3>
          <p>Ações nesta área são permanentes e não podem ser desfeitas.</p>
          <button onClick={handleDeleteAccount} className={styles.deleteButton}>Deletar Conta</button>
        </div>
      </main>

      <Footer />
    </>
  );
}