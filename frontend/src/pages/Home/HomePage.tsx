import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './HomePage.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import womaninvest from "../../assets/images/womaninvest.jpg"
import investChart from "../../assets/images/invest-chart.jpg";
import familyPlanning from "../../assets/images/family-planning.jpg";
import homegirl from "../../assets/images/homegirl.png";
import homeman from "../../assets/images/homeman.png";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const faqData = [
  {
    question: "Preciso mesmo criar uma conta no QiBank?",
    answer: "Claro! assim você testa nosso Backend CRUD e pode acessar funcionalidades extras."
  },
  {
    question: "Meus dados estão seguros nessa aplicação fake?",
    answer: "Sim, os dados são criptografados e armazenados com segurança. Utilizamos as melhores práticas de segurança para garantir a proteção das suas informações, mesmo que envie dados sensíveis."
  },
  {
    question: "O QiBank é real?",
    answer: "Não, o QiBank é um banco fictícia desenvolvido para fins educacionais e de demonstração. Qualquer semelhança com instituições reais é mera coincidência."
  },
  {
    question: "As comparações são reais?",
    answer: "Sim, as comparações são baseadas em dados reais de diferentes bancos, mas o QiBank não é real e não tem essas ofertas maravilhosas."
  }
];

const benefitsData = [
  {
    image: womaninvest,
    title: "Planeje seu futuro",
    description: "No QiBank, acreditamos que a educação financeira é a chave para um futuro próspero. Comece a poupar e investir com sabedoria."
  },
  {
    image: investChart,
    title: "Invista com Inteligência",
    description: "Fornecemos as melhores ferramentas e informações para que você possa tomar decisões financeiras informadas e alcançar seus objetivos."
  },
  {
    image: familyPlanning,
    title: "Segurança para sua família",
    description: "Construa um patrimônio sólido e garanta a tranquilidade de quem você ama com as nossas soluções de investimento seguro."
  }
];

// Componente para animar seções ao rolar
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { isLoggedIn } = useAuth();

  const handleFaqClick = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' }); // 'auto' para rolagem instantânea
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <>
      <Header onLoginClick={handleScrollToTop} />
      <main className={styles.container}>

        {/* HERO */}
        <section className={styles.sectionHero}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.textContainer}>
                <h1 className={styles.title}>
                  Bem vindo ao QiBank! O melhor Banco Fictício do Mundo.
                </h1>
                <p className={styles.subtitle}>
                  Compare bancos, aprenda a investir e controle suas finanças com a gente.
                </p>
                {!isLoggedIn && (
                  <Link to="/create-account">
                    <button className={styles.ctaButton}>Crie sua conta</button>
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.imageWrapper}>
                <img src={homegirl} alt="Mulher QiBank" className={styles.fadeImage} />
                <img src={homeman} alt="Homem QiBank" className={styles.fadeImageHover} />
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <AnimatedSection className={styles.sectionCarousel}>
          <Slider {...sliderSettings}>
            {benefitsData.map((benefit, index) => (
              <div key={index} className={styles.carouselSlide}>
                <div className={styles.carouselContent}>
                  <div className={styles.carouselImageContainer}>
                    <img src={benefit.image} alt={benefit.title} className={styles.carouselImage} />
                  </div>
                  <div className={styles.carouselText}>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </AnimatedSection>

        {/* FUNCIONALIDADES */}
        <AnimatedSection className={styles.sectionFeatures}>
          <div className={styles.content}>
            <div className={styles.feature}>
              <h3>Compare com outros bancos</h3>
              <p>Veja os juros, taxas e vantagens de cada banco em um só lugar.</p>
            </div>
            <div className={styles.feature}>
              <h3>Aprenda investimentos</h3>
              <p>Conteúdos simplificados para você começar a investir sem medo.</p>
            </div>
            <div className={styles.feature}>
              <h3>Controle suas finanças</h3>
              <p>Ferramentas que ajudam você a entender melhor sua vida financeira.</p>
            </div>
          </div>
        </AnimatedSection>

        {/* AJUDA / FAQ */}
        <AnimatedSection className={styles.sectionFaq}>
          <div className={styles.contentColumn}>

            <div className={styles.faqContainer}>
              {faqData.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <button className={styles.faqQuestion} onClick={() => handleFaqClick(index)}>
                    {faq.question}
                    <span className={`${styles.faqIcon} ${openFaqIndex === index ? styles.faqIconOpen : ''}`}></span>
                  </button>
                  <div className={`${styles.faqAnswerContainer} ${openFaqIndex === index ? styles.faqAnswerOpen : ''}`}>
                    <div className={styles.faqAnswer}>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CALL TO ACTION FINAL */}
        <AnimatedSection className={styles.sectionCta}>
          <div className={styles.content}>
            <div className={styles.textCenter}>
              {isLoggedIn ? (
                <>
                  <h2>Explore sua conta</h2>
                  <p>Acesse seu painel para gerenciar suas finanças, fazer transações e muito mais.</p>
                  <Link to="/account">
                    <button className={styles.ctaButton}>Ir para minha conta</button>
                  </Link>
                </>
              ) : (
                <>
                  <h2>Pronto para começar?</h2>
                  <p>Abra sua conta gratuita no QiBank e dê o primeiro passo para um futuro financeiro melhor.</p>
                  <Link to="/create-account">
                    <button className={styles.ctaButton}>Quero abrir minha conta</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </AnimatedSection>

      </main>
      <Footer />
    </>
  );
}
