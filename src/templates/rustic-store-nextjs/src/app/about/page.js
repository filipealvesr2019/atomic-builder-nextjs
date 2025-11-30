'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Home, Truck, Shield } from 'lucide-react'
import styles from '../page.module.css'

export default function About() {
  return (
    <div className={styles.appContainer}>
      <Header />

      <main>
        <section id="about" className={styles.sectionGray}>
          <div className={styles.container}>
            <div className={styles.aboutContent}>
              <h1 className={styles.aboutTitle}>Sobre a RusticStore</h1>
              <div className={styles.aboutDivider}></div>
              <p className={styles.aboutDescription}>
                Somos uma loja especializada em móveis e decoração rústica artesanal.
                Cada peça é cuidadosamente selecionada e produzida por artesãos experientes,
                garantindo qualidade e exclusividade para transformar sua casa em um lar aconchegante.
              </p>
              <div className={styles.aboutGrid}>
                <div className={styles.aboutItem}>
                  <div className={styles.aboutIconContainer}>
                    <Home className={styles.aboutIcon} />
                  </div>
                  <h3 className={styles.aboutItemTitle}>Qualidade Artesanal</h3>
                  <p className={styles.aboutItemDescription}>Produtos únicos feitos à mão com materiais de primeira qualidade.</p>
                </div>
                <div className={styles.aboutItem}>
                  <div className={styles.aboutIconContainer}>
                    <Truck className={styles.aboutIcon} />
                  </div>
                  <h3 className={styles.aboutItemTitle}>Entrega Rápida</h3>
                  <p className={styles.aboutItemDescription}>Frete grátis para todo o Brasil em compras acima de R$ 299.</p>
                </div>
                <div className={styles.aboutItem}>
                  <div className={styles.aboutIconContainer}>
                    <Shield className={styles.aboutIcon} />
                  </div>
                  <h3 className={styles.aboutItemTitle}>Garantia Total</h3>
                  <p className={styles.aboutItemDescription}>1 ano de garantia e 30 dias para trocas sem complicações.</p>
                </div>
              </div>

              <div className={styles.aboutMission}>
                <h2 className={styles.aboutSubtitle}>Nossa Missão</h2>
                <p className={styles.aboutText}>
                  Levar para sua casa peças únicas que contam histórias, criadas por mãos habilidosas
                  que preservam tradições artesanais. Cada móvel, cada decoração é uma obra de arte
                  que transforma ambientes comuns em espaços especiais.
                </p>
              </div>

              <div className={styles.aboutValues}>
                <h2 className={styles.aboutSubtitle}>Nossos Valores</h2>
                <div className={styles.valuesGrid}>
                  <div className={styles.valueItem}>
                    <h4>Sustentabilidade</h4>
                    <p>Utilizamos madeiras certificadas e processos eco-friendly.</p>
                  </div>
                  <div className={styles.valueItem}>
                    <h4>Artesanato</h4>
                    <p>Valorizamos o trabalho manual e as técnicas tradicionais.</p>
                  </div>
                  <div className={styles.valueItem}>
                    <h4>Qualidade</h4>
                    <p>Cada peça passa por rigorosos controles de qualidade.</p>
                  </div>
                  <div className={styles.valueItem}>
                    <h4>Transparência</h4>
                    <p>Somos honestos sobre origens e processos de produção.</p>
                  </div>
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