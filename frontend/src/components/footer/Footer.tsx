import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-top']}>
        <div className={styles['footer-column'] + ' ' + styles['app-download']}>
          <div className={styles['app-links']}>
            <a href="#" target="_blank" rel="noopener noreferrer"></a>
          </div>
        </div>

        <div className={styles['footer-column'] + ' ' + styles.atendimento}>
          <h3>Atendimento</h3>
          <p><strong>Central de Relacionamento</strong></p>
          <p>Não temos atendimento, pois é um Banco fictício! Passar bem!</p>
          <p><strong>Serviços Emergenciais</strong></p>
          <p>Em caso de cancelamento de cartão, perda, roubo de celular, suspeita de fraude, alteração de e-mail, ou recebimento do código de segurança, ligue para 4002-8922</p>
          <p><strong>SAC</strong></p>
          <p>Para registrar sugestões, reclamações ou elogios <br /> 4002-8922</p>
          <p><strong>Ouvidoria</strong> <br /> 4002-8922</p>
        </div>

        <div className={styles['footer-column'] + ' ' + styles.informacoes}>
          <h3>Informações</h3>
          <ul>
            <li><a href="https://www.rj.gov.br/procon/" target="_blank" rel="noopener noreferrer">Procon</a></li>
            <li><a href="https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor/Anexos/cdc-portugues-2013.pdf" target='_blank' rel='noopener noreferrer'>Código de Defesa do Consumidor</a></li>
          </ul>
        </div>

        <div className={styles['footer-column'] + ' ' + styles.empresa}>
          <h3>Empresa</h3>
          <ul>
            <li><a href="#">Mais sobre nós</a></li>
          </ul>
        </div>
      </div>
      <div className={styles['footer-bottom']}>
          <p>© Todos os direitos reservados. Feito por <a href='https://github.com/jonborges' target='_blank' rel='noopener noreferrer'><strong>JonB</strong></a></p>
      </div>
    </footer>
  );
}

export default Footer;
