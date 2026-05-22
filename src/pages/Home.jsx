import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Compass, Anchor, Waves, ArrowRight } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import MarineElements from '../components/MarineElements'

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`

const Hero = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.gradients.nautical};
`

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  padding: 0 2rem;
`

const Title = styled(motion.h1)`
  font-size: clamp(4rem, 12vw, 10rem);
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 10px 30px rgba(0,0,0,0.3);
`

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  max-width: 800px;
  margin: 0 auto 3rem;
  opacity: 0.9;
  font-family: ${({ theme }) => theme.fonts.heading};
`

const LaunchButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 3.5rem;
  background: white;
  color: ${({ theme }) => theme.colors.primary.main};
  border-radius: 999px;
  font-weight: 800;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);

  &:hover {
    transform: scale(1.1) translateY(-5px);
    background: ${({ theme }) => theme.colors.accent.gold};
    color: white;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
`

const Layer = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-size: cover;
  background-position: center;
`

const Boat = styled(motion.div)`
  position: absolute;
  bottom: 15%;
  right: 10%;
  width: 300px;
  height: 200px;
  background: url('/-La-Grande-Voile/images/appartements/caravelle.svg') no-repeat center;
  background-size: contain;
  animation: ${float} 6s ease-in-out infinite;
  z-index: 5;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));
`

const Home = () => {
  const { siteContent } = useBooking()
  const { scrollY } = useScroll()

  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div style={{ background: '#0a1d37' }}>
      <Hero>
        <MarineElements density="heavy" divingTheme />

        <Layer
          style={{
            backgroundImage: `url(${siteContent.hero.backgroundImage})`,
            y: y1,
            scale: 1.1
          }}
        />

        <Boat
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ y: y2 }}
        />

        <HeroContent style={{ opacity }}>
          <Title
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            LA GRANDE VOILE
          </Title>
          <Subtitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {siteContent.hero.subtitle}
          </Subtitle>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.4 }}
          >
            <LaunchButton to="/reservation">
              <Anchor size={24} />
              Embarquer maintenant
            </LaunchButton>
          </motion.div>
        </HeroContent>

        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            translateX: '-50%',
            color: 'white',
            opacity
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowRight size={32} style={{ transform: 'rotate(90deg)' }} />
        </motion.div>
      </Hero>

      <section style={{ padding: '10rem 0', color: 'white', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container"
        >
          <Waves size={64} style={{ marginBottom: '2rem', color: '#5fa7c8' }} />
          <h2 style={{ color: 'white', fontSize: '4rem', marginBottom: '2rem' }}>
            Une expérience immersive
          </h2>
          <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto', opacity: 0.8 }}>
            Bienvenue à bord de La Grande Voile. Nous avons réinventé notre portail pour vous offrir
            un voyage dès la première seconde. Découvrez nos appartements comme si vous y étiez déjà.
          </p>
          <div style={{ marginTop: '4rem' }}>
             <Link to="/rooms" className="btn btn-game">
                Explorer la flotte
             </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
