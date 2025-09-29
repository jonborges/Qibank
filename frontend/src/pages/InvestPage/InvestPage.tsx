import React, { useState } from 'react';
import styles from './InvestPage.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

type Category = {
  id: string;
  label: string;
  title: string;
  content: React.ReactNode; 
};

const investmentCategories: Category[] = [
  { 
    id: 'tesouro-direto', 
    label: 'Tesouro Direto', 
    title: 'Tesouro Direto', 
    content: (
      <>
        <p>Considerado o investimento mais seguro do país, o Tesouro Direto é um programa do Tesouro Nacional para venda de títulos públicos federais para pessoas físicas. É ideal para iniciantes e para compor a parte mais conservadora da sua carteira.</p>
        <h4>Principais Títulos:</h4>
        <ul>
          <li><strong>Tesouro Selic:</strong> Pós-fixado, sua rentabilidade segue a taxa básica de juros (Selic). Ótimo para reserva de emergência, pois tem liquidez diária e baixo risco.</li>
          <li><strong>Tesouro Prefixado:</strong> Você sabe exatamente quanto vai receber no vencimento. Ideal para metas de médio e longo prazo quando você acredita que a taxa de juros vai cair.</li>
          <li><strong>Tesouro IPCA+:</strong> Protege seu dinheiro da inflação, pois rende a variação do IPCA mais uma taxa prefixada. Perfeito para aposentadoria e objetivos de longuíssimo prazo.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Para a reserva de emergência, não há opção melhor que o <strong>Tesouro Selic</strong>. Para outros objetivos, diversifique entre os tipos de título conforme seu perfil e prazo.</p>
      </>
    )
  },
  { 
    id: 'cdb', 
    label: 'CDB', 
    title: 'CDB (Certificado de Depósito Bancário)', 
    content: (
      <>
        <p>O CDB é um título emitido por bancos para captar recursos. Em troca, o investidor recebe uma rentabilidade que pode ser prefixada, pós-fixada (atrelada ao CDI) ou híbrida.</p>
        <h4>Tipos de CDB:</h4>
        <ul>
          <li><strong>Pós-fixado:</strong> Rentabilidade atrelada ao CDI. Indicado para médio prazo.</li>
          <li><strong>Prefixado:</strong> Você sabe quanto vai render desde o início. Bom quando a taxa de juros tende a cair.</li>
          <li><strong>IPCA+:</strong> Rende inflação + taxa fixa, ótimo para longo prazo e proteção.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Prefira bancos médios com boa reputação, pois costumam pagar mais que os grandes. E lembre-se: há proteção do <strong>FGC</strong> até R$ 250 mil por CPF e instituição.</p>
      </>
    )
  },
  { 
    id: 'lci-lca', 
    label: 'LCI e LCA', 
    title: 'LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio)', 
    content: (
      <>
        <p>As LCIs e LCAs são títulos de crédito emitidos por bancos para financiar o setor imobiliário e do agronegócio. O grande atrativo é a <strong>isenção de Imposto de Renda</strong> para pessoas físicas.</p>
        <h4>Características:</h4>
        <ul>
          <li>Isenção de IR, aumentando a rentabilidade líquida.</li>
          <li>Prazo de vencimento geralmente maior que o CDB.</li>
          <li>Protegidos pelo FGC até R$ 250 mil por CPF e instituição.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Ótima opção para diversificar sua renda fixa, principalmente em prazos de médio e longo prazo.</p>
      </>
    )
  },
  { 
    id: 'renda-fixa', 
    label: 'Fundos de Renda Fixa', 
    title: 'Fundos de Renda Fixa', 
    content: (
      <>
        <p>Fundos de renda fixa reúnem o dinheiro de vários investidores para aplicar em ativos de baixo risco, como Tesouro Direto, CDBs e LCIs/LCAs. São geridos por profissionais.</p>
        <h4>Vantagens:</h4>
        <ul>
          <li>Gestão profissional dos recursos.</li>
          <li>Boa alternativa para quem não quer escolher ativos individualmente.</li>
          <li>Possibilidade de liquidez diária.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Verifique a taxa de administração. Quanto menor, melhor, principalmente em fundos conservadores.</p>
      </>
    )
  },
  { 
    id: 'fundos-imobiliarios', 
    label: 'Fundos Imobiliários', 
    title: 'Fundos Imobiliários (FIIs)', 
    content: (
      <>
        <p>Os FIIs permitem investir em imóveis de forma acessível e diversificada. Você compra cotas de fundos que aplicam em shoppings, galpões, hospitais, lajes corporativas e até títulos de crédito imobiliário.</p>
        <h4>Vantagens:</h4>
        <ul>
          <li>Recebimento de rendimentos mensais isentos de IR.</li>
          <li>Diversificação no setor imobiliário sem precisar comprar um imóvel físico.</li>
          <li>Boa liquidez na bolsa.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Prefira fundos com boa gestão e imóveis de qualidade em regiões estratégicas. Observe também a vacância e o histórico de dividendos.</p>
      </>
    )
  },
  { 
    id: 'acoes', 
    label: 'Ações', 
    title: 'Ações', 
    content: (
      <>
        <p>Ações são pequenas partes de uma empresa de capital aberto negociadas na bolsa de valores. Ao comprar uma ação, você se torna sócio da companhia. É um investimento de renda variável, com maior potencial de retorno, mas também maior risco.</p>
        <h4>Como começar:</h4>
        <ul>
          <li><strong>Estude as empresas:</strong> Invista em companhias sólidas e que você acredita no modelo de negócio.</li>
          <li><strong>Diversifique:</strong> Monte uma carteira com ações de diferentes setores.</li>
          <li><strong>Pense no longo prazo:</strong> O mercado de ações é volátil, mas os maiores ganhos vêm com paciência e reinvestimento de dividendos.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Comece aos poucos e invista em "blue chips" (empresas líderes do setor) para mais segurança.</p>
      </>
    )
  },
  { 
    id: 'etfs', 
    label: 'ETFs', 
    title: 'ETFs (Exchange Traded Funds)', 
    content: (
      <>
        <p>ETFs são fundos de índice negociados em bolsa. Ao comprar uma cota, você investe em várias empresas ao mesmo tempo, seguindo a performance de um índice, como o Ibovespa.</p>
        <h4>Vantagens:</h4>
        <ul>
          <li>Diversificação imediata com baixo custo.</li>
          <li>Taxa de administração menor que fundos tradicionais.</li>
          <li>Liquidez na bolsa, podendo comprar e vender como ações.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>São ideais para quem quer investir na bolsa sem escolher ações individuais.</p>
      </>
    )
  },
  { 
    id: 'multimercado', 
    label: 'Fundos Multimercado', 
    title: 'Fundos Multimercado', 
    content: (
      <>
        <p>Esses fundos misturam renda fixa, ações, câmbio e até ativos internacionais. O objetivo é buscar rentabilidade superior à renda fixa tradicional.</p>
        <h4>Vantagens:</h4>
        <ul>
          <li>Diversificação em várias classes de ativos.</li>
          <li>Gestão profissional ativa.</li>
          <li>Potencial de retorno acima da média, mas com mais risco.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Indicado para investidores com perfil moderado ou arrojado. Confira o histórico do gestor antes de investir.</p>
      </>
    )
  },
  { 
    id: 'previdencia', 
    label: 'Previdência Privada', 
    title: 'Previdência Privada', 
    content: (
      <>
        <p>A previdência privada é um investimento de longo prazo para complementar a aposentadoria. Existem dois tipos principais: PGBL e VGBL.</p>
        <h4>Tipos:</h4>
        <ul>
          <li><strong>PGBL:</strong> Permite deduzir até 12% da renda bruta anual no IR. Indicado para quem faz declaração completa.</li>
          <li><strong>VGBL:</strong> Não dá benefício fiscal na entrada, mas a tributação incide apenas sobre os rendimentos.</li>
        </ul>
        <h4>Dica de Ouro:</h4>
        <p>Escolha fundos de previdência com taxas baixas e boa gestão. É um produto de longo prazo, então compare bem antes de contratar.</p>
      </>
    )
  },
];

const InvestPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(investmentCategories[0].id);

  const activeContent = investmentCategories.find(cat => cat.id === activeId);

  return (
    <>
      <Header />
      <main className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h1>Guia de Investimentos</h1>
          <p>Navegue pelas categorias para encontrar dicas e informações sobre cada tipo de investimento.</p>
        </header>

        <div className={styles.investContainer}>
          <nav className={styles.investNav}>
            <ul>
              {investmentCategories.map((category) => (
                <li key={category.id}>
                  <button
                    className={`${styles.navButton} ${activeId === category.id ? styles.active : ''}`}
                    onClick={() => setActiveId(category.id)}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.investContent}>
            {activeContent && (
              <div className={styles.contentSection}>
                <h2>{activeContent.title}</h2>
                <div>{activeContent.content}</div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default InvestPage;
