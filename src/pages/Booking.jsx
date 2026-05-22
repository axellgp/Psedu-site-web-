import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled, { keyframes, useTheme } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Anchor,
  Compass,
  Users,
  Calendar,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Ship,
  MapPin,
  Waves
} from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import MarineElements from '../components/MarineElements'
import { toast } from 'react-hot-toast'

// --- Styled Components ---

const Container = styled.div`
  min-height: 100vh;
  background: #0a1d37;
  color: white;
  padding: 8rem 2rem 4rem;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
`

const StepDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $active, $completed, theme }) =>
    $active ? theme.colors.accent.gold : $completed ? theme.colors.success : 'rgba(255,255,255,0.2)'};
  transition: all 0.3s ease;
  box-shadow: ${({ $active, theme }) => $active ? `0 0 15px ${theme.colors.accent.gold}` : 'none'};
`

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 3rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
`

const FleetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const ShipCard = styled(motion.div)`
  cursor: pointer;
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  height: 400px;
  border: 2px solid ${({ $selected, theme }) => $selected ? theme.colors.accent.gold : 'transparent'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 29, 55, 0.9), transparent);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`

const SliderContainer = styled.div`
  margin: 3rem 0;
`

const CustomSlider = styled.input`
  width: 100%;
  appearance: none;
  background: rgba(255,255,255,0.1);
  height: 8px;
  border-radius: 4px;
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    background: ${({ theme }) => theme.colors.accent.gold};
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.accent.gold};
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const InputWrapper = styled.div`
  position: relative;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.7;
  }

  input, textarea {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    width: 100%;
    font-size: 1.1rem;

    &:focus {
      border-color: ${({ theme }) => theme.colors.accent.gold};
      outline: none;
    }
  }
`

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &.primary {
    background: ${({ theme }) => theme.colors.accent.gold};
    color: white;
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// --- Components ---

const Booking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { rooms, createBookingRequest } = useBooking()
  const theme = useTheme()

  const [step, setStep] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    guestName: '',
    email: '',
    phone: '',
    requests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      const room = rooms.find(r => r.id === id)
      if (room) setSelectedRoom(room)
    }
  }, [id, rooms])

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await createBookingRequest({
        ...formData,
        roomId: selectedRoom.id,
        roomName: selectedRoom.name
      })
      toast.success('Demande de réservation envoyée !')
      setStep(4) // Final Step
    } catch (error) {
      toast.error('Erreur lors de l\'envoi')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>Choisissez votre port</h2>
      <FleetGrid>
        {rooms.map(room => (
          <ShipCard
            key={room.id}
            $selected={selectedRoom?.id === room.id}
            onClick={() => setSelectedRoom(room)}
            whileHover={{ y: -10 }}
          >
            <img src={room.images[0]} alt={room.name} />
            <div className="overlay">
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{room.name}</h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>{room.type}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={16} /> {room.capacity}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> {room.size}
                </span>
              </div>
            </div>
            {selectedRoom?.id === room.id && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: theme.colors.accent.gold, borderRadius: '50%', p: '0.5rem' }}>
                <Check size={20} color="white" />
              </div>
            )}
          </ShipCard>
        ))}
      </FleetGrid>
      <NavButtons>
        <div />
        <Button
          className="primary"
          disabled={!selectedRoom}
          onClick={handleNext}
        >
          Continuer <ArrowRight size={20} />
        </Button>
      </NavButtons>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>Préparez le voyage</h2>
      <FormGrid>
        <InputWrapper>
          <label><Calendar size={16} /> Arrivée</label>
          <input
            type="date"
            value={formData.checkIn}
            onChange={e => setFormData({...formData, checkIn: e.target.value})}
          />
        </InputWrapper>
        <InputWrapper>
          <label><Calendar size={16} /> Départ</label>
          <input
            type="date"
            value={formData.checkOut}
            onChange={e => setFormData({...formData, checkOut: e.target.value})}
          />
        </InputWrapper>
      </FormGrid>

      <SliderContainer>
        <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Users size={24} /> Nombre de passagers : <span style={{ color: theme.colors.accent.gold, fontSize: '2rem', fontWeight: 800 }}>{formData.guests}</span>
        </label>
        <CustomSlider
          type="range"
          min="1"
          max={selectedRoom.capacity}
          value={formData.guests}
          onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', opacity: 0.5 }}>
          <span>1 voyageur</span>
          <span>Max {selectedRoom.capacity} voyageurs</span>
        </div>
      </SliderContainer>

      <NavButtons>
        <Button className="secondary" onClick={handleBack}>
          <ArrowLeft size={20} /> Retour
        </Button>
        <Button
          className="primary"
          disabled={!formData.checkIn || !formData.checkOut}
          onClick={handleNext}
        >
          Continuer <ArrowRight size={20} />
        </Button>
      </NavButtons>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2 style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>Signez le manifeste</h2>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <InputWrapper>
            <label>Nom complet</label>
            <input
              required
              type="text"
              placeholder="Nom du capitaine"
              value={formData.guestName}
              onChange={e => setFormData({...formData, guestName: e.target.value})}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Email</label>
            <input
              required
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Téléphone</label>
            <input
              required
              type="tel"
              placeholder="06 00 00 00 00"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Requêtes spéciales</label>
            <textarea
              rows="4"
              placeholder="Comment pouvons-nous améliorer votre séjour ?"
              value={formData.requests}
              onChange={e => setFormData({...formData, requests: e.target.value})}
            />
          </InputWrapper>
        </FormGrid>

        <NavButtons>
          <Button className="secondary" type="button" onClick={handleBack}>
            <ArrowLeft size={20} /> Retour
          </Button>
          <Button className="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Embarquement...' : 'Demander la réservation'} <Ship size={20} />
          </Button>
        </NavButtons>
      </form>
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        width: '100px',
        height: '100px',
        background: theme.colors.success,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 2rem'
      }}>
        <Check size={64} color="white" />
      </div>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Bon voyage !</h2>
      <p style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto 3rem' }}>
        Votre demande de réservation pour le **{selectedRoom.name}** a été envoyée au port.
        Le capitaine reviendra vers vous très rapidement par email.
      </p>
      <Button className="primary" style={{ margin: '0 auto' }} onClick={() => navigate('/')}>
        Retour à l'accueil
      </Button>
    </motion.div>
  )

  return (
    <Container>
      <MarineElements density="normal" divingTheme />
      <Content>
        <StepIndicator>
          {[1, 2, 3].map(i => (
            <StepDot
              key={i}
              $active={step === i}
              $completed={step > i}
            />
          ))}
        </StepIndicator>

        <AnimatePresence mode="wait">
          <Card key={step}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </Card>
        </AnimatePresence>
      </Content>
    </Container>
  )
}

export default Booking
