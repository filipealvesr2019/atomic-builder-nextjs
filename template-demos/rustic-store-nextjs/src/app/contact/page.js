'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import styles from '../page.module.css'

export default function Contact() {
  return (
    <div className={styles.appContainer}>
      <Header />

      <main>
        <section id="contact" className={styles.sectionGray}>
          <div className={styles.container}>
            <div className={styles.contactContent}>
              <div className={styles.contactHeader}>
                <h1 className={styles.contactTitle}>Entre em Contato</h1>
                <div className={styles.contactDivider}></div>
              </div>

              <div className={styles.contactGrid}>
                <div className={styles.contactInfo}>
                  <h2 className={styles.contactInfoTitle}>Fale Conosco</h2>
                  <div className={styles.contactInfoList}>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIconContainer}>
                        <MapPin className={styles.contactInfoIcon} />
                      </div>
                      <div>
                        <p className={styles.contactInfoLabel}>Endereço</p>
                        <p className={styles.contactInfoText}>Rua das Flores, 123 - São Paulo, SP</p>
                      </div>
                    </div>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIconContainer}>
                        <Phone className={styles.contactInfoIcon} />
                      </div>
                      <div>
                        <p className={styles.contactInfoLabel}>Telefone</p>
                        <p className={styles.contactInfoText}>(11) 9999-9999</p>
                      </div>
                    </div>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIconContainer}>
                        <Mail className={styles.contactInfoIcon} />
                      </div>
                      <div>
                        <p className={styles.contactInfoLabel}>E-mail</p>
                        <p className={styles.contactInfoText}>contato@rusticstore.com</p>
                      </div>
                    </div>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIconContainer}>
                        <Clock className={styles.contactInfoIcon} />
                      </div>
                      <div>
                        <p className={styles.contactInfoLabel}>Horário de Funcionamento</p>
                        <p className={styles.contactInfoText}>Seg-Sex: 9h às 18h<br />Sáb: 9h às 16h</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <form className={styles.contactForm}>
                    <div>
                      <input
                        type="text"
                        placeholder="Seu nome completo"
                        className={styles.contactInput}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        className={styles.contactInput}
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Seu telefone"
                        className={styles.contactInput}
                      />
                    </div>
                    <div>
                      <select className={styles.contactInput}>
                        <option value="">Assunto da mensagem</option>
                        <option value="duvida">Dúvida sobre produto</option>
                        <option value="pedido">Status do pedido</option>
                        <option value="devolucao">Devolução/Troca</option>
                        <option value="sugestao">Sugestão</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        rows="6"
                        placeholder="Digite sua mensagem aqui..."
                        className={`${styles.contactInput} ${styles.contactTextarea}`}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className={styles.contactSubmitButton}
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}