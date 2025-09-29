import { useState } from "react";
import styles from "./CompareBanks.module.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

interface Bank {
  name: string;
  type: "banco" | "serviço";
  rendimento?: string; 
  taxa?: string; 
  rate?: number; 
  observacao?: string;
}

const savings: Bank[] = [
  { name: "QiBank", type: "banco", rendimento: "4,8% a.m.", taxa: "0%", rate: 0.048, observacao: "Melhor rendimento e zero taxas!" },
  { name: "Banco do Brasil", type: "banco", rendimento: "0,5% a.m.", taxa: "R$ 10/mês", rate: 0.005 },
  { name: "Caixa Econômica", type: "banco", rendimento: "0,5% a.m.", taxa: "R$ 8/mês", rate: 0.005 },
  { name: "Nubank", type: "banco", rendimento: "0,7% a.m.", taxa: "0%", rate: 0.007, observacao: "Rendimento atrelado ao CDI." },
  { name: "Santander", type: "banco", rendimento: "0,5% a.m.", taxa: "R$ 12/mês", rate: 0.005 },
];

const loans: Bank[] = [
  { name: "QiBank Empréstimo", type: "serviço", rendimento: "1,5% a.m.", taxa: "Sem tarifa", rate: 0.015, observacao: "Juros competitivos!" },
  { name: "Banco do Brasil Empréstimo", type: "serviço", rendimento: "2,0% a.m.", taxa: "R$ 5/mês", rate: 0.02 },
  { name: "Itaú Empréstimo", type: "serviço", rendimento: "2,2% a.m.", taxa: "R$ 8/mês", rate: 0.022 },
  { name: "Nubank Empréstimo", type: "serviço", rendimento: "1,9% a.m.", taxa: "Sem tarifa", rate: 0.019 },
  { name: "Santander Empréstimo", type: "serviço", rendimento: "2,5% a.m.", taxa: "R$ 10/mês", rate: 0.025 },
];

const cards: Bank[] = [
  { name: "QiBank Card", type: "serviço", rendimento: "1,2% cashback", taxa: "R$ 0 anual", rate: 0.012, observacao: "Cashback excelente!" },
  { name: "Bradesco Card", type: "serviço", rendimento: "0,5% cashback", taxa: "R$ 50 anual", rate: 0.005 },
  { name: "Itaú Card", type: "serviço", rendimento: "0,8% cashback", taxa: "R$ 30 anual", rate: 0.008 },
  { name: "Nubank Ultravioleta", type: "serviço", rendimento: "1% cashback", taxa: "R$ 0 (com gastos)", rate: 0.01, observacao: "Cashback que rende 200% do CDI." },
  { name: "Santander SX", type: "serviço", rendimento: "Pontos Esfera", taxa: "R$ 0 (com gastos)", rate: 0 },
];

interface ComparatorProps {
  title: string;
  data: Bank[];
}

const Comparator: React.FC<ComparatorProps> = ({ title, data }) => {
  const [selected, setSelected] = useState<Bank | null>(null);
  const [value, setValue] = useState<number>(1000);
  const [months, setMonths] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);

  const handleSelect = (bank: Bank) => {
    setSelected(bank);
    setResult(null);
  };

  const handleRemove = () => {
    setSelected(null);
    setValue(1000);
    setMonths(1);
    setResult(null);
  };

  const handleCalculate = () => {
    if (!selected || !selected.rate) return;
    let total = value;
    for (let i = 0; i < months; i++) {
      total += total * selected.rate;
    }
    setResult(parseFloat(total.toFixed(2)));
  };

  return (
    <div className={styles.comparatorSection}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        {selected && (
          <div className={styles.selectedBank}>
            <button className={styles.removeBtn} onClick={handleRemove}>X</button>
            <h2>{selected.name}</h2>
            {selected.rendimento && <p>Rendimento/Juros: {selected.rendimento}</p>}
            {selected.taxa && <p>Taxa: {selected.taxa}</p>}
            {selected.observacao && <p className={styles.observation}>{selected.observacao}</p>}

            <div className={styles.simulator}>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
              />
              <div className={styles.months}>
                <button onClick={() => setMonths(1)}>1 mês</button>
                <button onClick={() => setMonths(3)}>3 meses</button>
                <button onClick={() => setMonths(6)}>6 meses</button>
              </div>
              <button onClick={handleCalculate} className={styles.calculateBtn}>
                CALCULAR
              </button>
              {result !== null && <p>Resultado: R$ {result}</p>}
            </div>
          </div>
        )}

        <div className={styles.carousel}>
          {data.map((bank) => (
            <div
              key={bank.name}
              className={`${styles.card} ${selected?.name === bank.name ? styles.highlight : ""}`}
              onClick={() => handleSelect(bank)}
            >
              <h3>{bank.name}</h3>
              {bank.rendimento && <p>Rendimento/Juros: {bank.rendimento}</p>}
              {bank.taxa && <p>Taxa: {bank.taxa}</p>}
              <p>Tipo: {bank.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function CompareBanksPage() {
  return (
    <>
      <Header />
      <Comparator title="Comparador de Poupanças" data={savings} />
      <Comparator title="Comparador de Empréstimos" data={loans} />
      <Comparator title="Comparador de Cartões" data={cards} />
      <Footer />
    </>
  );
}
