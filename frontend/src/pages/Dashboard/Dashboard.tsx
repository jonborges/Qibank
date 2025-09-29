import  Header  from "../../components/header/Header";
import  Footer  from  "../../components/footer/Footer"
import styles from "./Dashboard.module.css";

interface Transaction {
  id: number;
  type: "Depósito" | "Transferência" | "Pagamento";
  amount: number;
  date: string;
}

export default function Dashboard() {
  const saldo = 12500.75; // Exemplo de saldo
  const transactions: Transaction[] = [
    { id: 1, type: "Depósito", amount: 2000, date: "15/09/2025" },
    { id: 2, type: "Transferência", amount: 500, date: "14/09/2025" },
    { id: 3, type: "Pagamento", amount: 150, date: "13/09/2025" },
  ];

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.title}>Dashboard QiBank</h1>

        <section className={styles.balanceSection}>
          <h2>Saldo disponível</h2>
          <p className={styles.balance}>R$ {saldo.toFixed(2)}</p>
          <div className={styles.buttons}>
            <button className={styles.actionBtn}>Depositar</button>
            <button className={styles.actionBtn}>Transferir</button>
            <button className={styles.actionBtn}>Extrato</button>
          </div>
        </section>

        <section className={styles.transactionsSection}>
          <h2>Últimas transações</h2>
          <ul className={styles.transactionList}>
            {transactions.map((t) => (
              <li key={t.id} className={styles.transactionItem}>
                <span>{t.date} - {t.type}</span>
                <span className={t.type === "Depósito" ? styles.deposit : styles.payment}>
                  R$ {t.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
