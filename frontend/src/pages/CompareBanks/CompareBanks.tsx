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
  score?: number;
  atendimento?: string;
  seguranca?: string;
}

const savings: Bank[] = [
  { name: "QiBank", type: "banco", rendimento: "130% do CDI", taxa: "R$ 0", rate: 0.013, observacao: "Melhor rendimento e zero taxas! Liquidez diária.", score: 9.8, atendimento: "24/7 Digital", seguranca: "Criptografia bancária" },
  { name: "Banco do Brasil", type: "banco", rendimento: "70% do CDI", taxa: "R$ 15/mês", rate: 0.007, score: 7.2, atendimento: "Agências físicas", seguranca: "FGC até 250k" },
  { name: "Caixa Econômica", type: "banco", rendimento: "65% do CDI", taxa: "R$ 12/mês", rate: 0.0065, score: 6.8, atendimento: "Agências físicas", seguranca: "FGC até 250k" },
  { name: "Nubank", type: "banco", rendimento: "100% do CDI", taxa: "R$ 0", rate: 0.01, observacao: "Rendimento automático e diário.", score: 8.9, atendimento: "App 24/7", seguranca: "Tecnologia de ponta" },
  { name: "Inter", type: "banco", rendimento: "100% do CDI", taxa: "R$ 0", rate: 0.01, score: 8.5, atendimento: "Digital", seguranca: "FGC até 250k" },
  { name: "Santander", type: "banco", rendimento: "75% do CDI", taxa: "R$ 20/mês", rate: 0.0075, score: 7.0, atendimento: "Híbrido", seguranca: "FGC até 250k" },
];

const loans: Bank[] = [
  { name: "QiBank Empréstimo", type: "serviço", rendimento: "1,49% a.m.", taxa: "R$ 0", rate: 0.0149, observacao: "Menor taxa do mercado! Aprovação em 24h.", score: 9.5, atendimento: "100% Digital", seguranca: "Análise automatizada" },
  { name: "Banco do Brasil", type: "serviço", rendimento: "2,89% a.m.", taxa: "R$ 15", rate: 0.0289, score: 7.0, atendimento: "Presencial", seguranca: "Análise rigorosa" },
  { name: "Itaú", type: "serviço", rendimento: "3,10% a.m.", taxa: "R$ 20", rate: 0.031, score: 6.8, atendimento: "Híbrido", seguranca: "Padrão bancário" },
  { name: "Nubank", type: "serviço", rendimento: "2,15% a.m.", taxa: "R$ 0", rate: 0.0215, observacao: "Processo 100% digital", score: 8.7, atendimento: "Digital", seguranca: "Sem burocracia" },
  { name: "C6 Bank", type: "serviço", rendimento: "2,35% a.m.", taxa: "R$ 0", rate: 0.0235, score: 8.3, atendimento: "Digital", seguranca: "Análise rápida" },
  { name: "Santander", type: "serviço", rendimento: "3,50% a.m.", taxa: "R$ 25", rate: 0.035, score: 6.5, atendimento: "Híbrido", seguranca: "Tradicional" },
];

const cards: Bank[] = [
  { name: "QiBank Card Premium", type: "serviço", rendimento: "2% cashback", taxa: "R$ 0 anual", rate: 0.02, observacao: "Cashback ilimitado + Acesso a salas VIP", score: 9.7, atendimento: "Concierge 24/7", seguranca: "Chip EMV + NFC" },
  { name: "Nubank Ultravioleta", type: "serviço", rendimento: "1% cashback", taxa: "R$ 49/mês", rate: 0.01, observacao: "Cashback rende 200% do CDI", score: 9.2, atendimento: "Premium", seguranca: "Máxima" },
  { name: "Bradesco Prime", type: "serviço", rendimento: "0,25% cashback", taxa: "R$ 60 anual", rate: 0.0025, score: 7.5, atendimento: "Standard", seguranca: "Alta" },
  { name: "Itaú Personnalité", type: "serviço", rendimento: "Pontos Sempre", taxa: "R$ 0 (renda 10k+)", rate: 0.008, score: 8.0, atendimento: "VIP", seguranca: "Alta" },
  { name: "C6 Bank Carbon", type: "serviço", rendimento: "1% Átomos", taxa: "R$ 0", rate: 0.01, score: 8.5, atendimento: "Digital", seguranca: "Alta" },
  { name: "Santander SX", type: "serviço", rendimento: "Pontos Esfera", taxa: "R$ 0 (gasto 1k)", rate: 0.005, score: 7.8, atendimento: "Standard", seguranca: "Padrão" },
];

interface ComparatorProps {
  title: string;
  data: Bank[];
}

const Comparator: React.FC<ComparatorProps> = ({ title, data }) => {
  const [selected, setSelected] = useState<Bank | null>(null);
  const [value, setValue] = useState<number>(10000);
  const [months, setMonths] = useState<number>(12);
  const [result, setResult] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleSelect = (bank: Bank) => {
    setSelected(bank);
    setResult(null);
    setShowComparison(false);
  };

  const handleRemove = () => {
    setSelected(null);
    setValue(10000);
    setMonths(12);
    setResult(null);
    setShowComparison(false);
  };

  const handleCalculate = () => {
    if (!selected || !selected.rate) return;
    let total = value;
    for (let i = 0; i < months; i++) {
      total += total * selected.rate;
    }
    setResult(parseFloat(total.toFixed(2)));
    setShowComparison(true);
  };

  const calculateAllResults = () => {
    return data.map(bank => {
      let total = value;
      for (let i = 0; i < months; i++) {
        total += total * (bank.rate || 0);
      }
      return {
        name: bank.name,
        result: parseFloat(total.toFixed(2)),
        profit: parseFloat((total - value).toFixed(2))
      };
    }).sort((a, b) => b.result - a.result);
  };

  return (
    <div className={styles.comparatorSection}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>Compare taxas, rendimentos e escolha a melhor opção para você</p>
      </div>

      <div className={styles.content}>
        {selected && (
          <div className={styles.selectedBank}>
            <button className={styles.removeBtn} onClick={handleRemove}>✕</button>
            <div className={styles.bankHeader}>
              <h2>{selected.name}</h2>
              {selected.score && (
                <div className={styles.scoreBadge}>
                  ⭐ {selected.score}/10
                </div>
              )}
            </div>

            <div className={styles.bankDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Rendimento/Taxa</span>
                <span className={styles.detailValue}>{selected.rendimento}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Custo</span>
                <span className={styles.detailValue}>{selected.taxa}</span>
              </div>
              {selected.atendimento && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Atendimento</span>
                  <span className={styles.detailValue}>{selected.atendimento}</span>
                </div>
              )}
      {selected.seguranca && (
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Segurança</span>
          <span className={styles.detailValue}>{selected.seguranca}</span>
        </div>
      )}
            </div>

            {selected && selected.observacao && (
              <div className={styles.observation}>
                <strong>💡 Destaque:</strong> {selected.observacao}
              </div>
            )}

            <div className={styles.simulator}>
              <h3>Simulador Financeiro</h3>
              <div className={styles.inputGroup}>
                <label>Valor inicial (R$)</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(parseFloat(e.target.value))}
                  placeholder="Digite o valor"
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Período</label>
                <div className={styles.months}>
                  <button 
                    className={months === 6 ? styles.activeMonth : ''}
                    onClick={() => setMonths(6)}
                  >
                    6 meses
                  </button>
                  <button 
                    className={months === 12 ? styles.activeMonth : ''}
                    onClick={() => setMonths(12)}
                  >
                    12 meses
                  </button>
                  <button 
                    className={months === 24 ? styles.activeMonth : ''}
                    onClick={() => setMonths(24)}
                  >
                    24 meses
                  </button>
                </div>
              </div>

              <button onClick={handleCalculate} className={styles.calculateBtn}>
                🧮 CALCULAR AGORA
              </button>

              {result !== null && (
                <div className={styles.resultBox}>
                  <div className={styles.resultItem}>
                    <span>Valor Final</span>
                    <strong>R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                  </div>
                  <div className={styles.resultItem}>
                    <span>Lucro</span>
                    <strong className={styles.profit}>
                      + R$ {(result - value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                  <div className={styles.resultItem}>
                    <span>Rentabilidade</span>
                    <strong className={styles.profitPercent}>
                      {(((result - value) / value) * 100).toFixed(2)}%
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.carousel}>
          <h3 className={styles.carouselTitle}>Selecione uma opção para comparar</h3>
          <div className={styles.cardGrid}>
            {data.map((bank) => (
              <div
                key={bank.name}
                className={`${styles.card} ${selected?.name === bank.name ? styles.highlight : ""}`}
                onClick={() => handleSelect(bank)}
              >
                <div className={styles.cardHeader}>
                  <h3>{bank.name}</h3>
                  {bank.score && (
                    <span className={styles.miniScore}>⭐ {bank.score}</span>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardMain}>{bank.rendimento}</p>
                  <p className={styles.cardSecondary}>Taxa: {bank.taxa}</p>
                  <span className={styles.cardType}>{bank.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showComparison && result !== null && (
        <div className={styles.comparisonTable}>
          <h3>📊 Ranking Completo - Melhores Opções</h3>
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Posição</th>
                  <th>Instituição</th>
                  <th>Valor Final</th>
                  <th>Lucro</th>
                  <th>Rentabilidade</th>
                </tr>
              </thead>
              <tbody>
                {calculateAllResults().map((item, index) => (
                  <tr key={item.name} className={item.name === selected?.name ? styles.highlightRow : ''}>
                    <td className={styles.position}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                    </td>
                    <td className={styles.bankName}>{item.name}</td>
                    <td>R$ {item.result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className={styles.profitCell}>
                      + R$ {item.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className={styles.percentCell}>
                      {((item.profit / value) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
