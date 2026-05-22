import React from 'react'
import styled, { keyframes } from 'styled-components'

const rise = keyframes`
  0% {
    transform: translate3d(0, 18px, 0) scale(0.95);
    opacity: 0;
  }
  20% {
    opacity: 0.75;
  }
  100% {
    transform: translate3d(18px, -34px, 0) scale(1.08);
    opacity: 0;
  }
`

const drift = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(24px, -16px, 0) rotate(4deg);
  }
`

const sway = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(-1deg);
  }
  50% {
    transform: translate3d(-18px, 12px, 0) rotate(2deg);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
`

const Field = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: ${({ $zIndex }) => $zIndex || 0};
`

const Bubble = styled.span`
  position: absolute;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  border-radius: 50%;
  border: 1px solid ${({ $border }) => $border};
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), ${({ $fill }) => $fill});
  box-shadow: 0 0 40px ${({ $glow }) => $glow};
  opacity: ${({ $opacity }) => $opacity};
  animation: ${rise} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`

const Current = styled.span`
  position: absolute;
  width: ${({ $width }) => $width};
  height: 1px;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  transform-origin: left center;
  background: linear-gradient(90deg, transparent, ${({ $color }) => $color}, transparent);
  opacity: ${({ $opacity }) => $opacity};
  filter: blur(0.5px);
  animation: ${drift} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`

const Ribbon = styled.span`
  position: absolute;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  border-radius: 999px;
  background: linear-gradient(180deg, ${({ $from }) => $from}, transparent 75%);
  opacity: ${({ $opacity }) => $opacity};
  filter: blur(8px);
  animation: ${sway} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`

const Glow = styled.div`
  position: absolute;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  background: radial-gradient(circle, ${({ $color }) => $color} 0%, transparent 70%);
  opacity: ${({ $opacity }) => $opacity};
  animation: ${pulse} ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  filter: blur(20px);
`

const densityMap = {
  light: { bubbles: 7, currents: 3, ribbons: 2, glows: 2 },
  normal: { bubbles: 12, currents: 5, ribbons: 3, glows: 3 },
  heavy: { bubbles: 18, currents: 7, ribbons: 4, glows: 5 },
}

const createBubbleConfig = (index, divingTheme) => ({
  size: `${18 + (index % 5) * 14}px`,
  left: `${(index * 11 + 7) % 100}%`,
  top: `${18 + ((index * 13) % 72)}%`,
  delay: index * 0.7,
  duration: 9 + (index % 4) * 2.5,
  opacity: divingTheme ? 0.24 + (index % 4) * 0.05 : 0.14 + (index % 4) * 0.04,
  fill: divingTheme ? 'rgba(99, 211, 223, 0.12)' : 'rgba(255, 255, 255, 0.08)',
  border: divingTheme ? 'rgba(173, 233, 240, 0.35)' : 'rgba(219, 233, 242, 0.24)',
  glow: divingTheme ? 'rgba(88, 199, 212, 0.18)' : 'rgba(255, 255, 255, 0.12)',
})

const createCurrentConfig = (index, divingTheme) => ({
  width: `${160 + (index % 4) * 80}px`,
  left: `${(index * 16 + 12) % 95}%`,
  top: `${16 + ((index * 17) % 68)}%`,
  delay: index * 0.9,
  duration: 14 + (index % 3) * 4,
  opacity: divingTheme ? 0.42 : 0.22,
  color: divingTheme ? 'rgba(135, 237, 246, 0.42)' : 'rgba(223, 251, 255, 0.24)',
})

const createRibbonConfig = (index, divingTheme) => ({
  width: `${180 + (index % 3) * 70}px`,
  height: `${28 + (index % 4) * 10}px`,
  left: `${(index * 23 + 5) % 92}%`,
  top: `${12 + ((index * 19) % 76)}%`,
  delay: index * 1.1,
  duration: 16 + (index % 3) * 5,
  opacity: divingTheme ? 0.22 : 0.12,
  from: divingTheme ? 'rgba(88, 199, 212, 0.34)' : 'rgba(255, 255, 255, 0.18)',
})

const createGlowConfig = (index, divingTheme) => ({
  size: `${300 + (index % 3) * 200}px`,
  left: `${(index * 30) % 100}%`,
  top: `${(index * 40) % 100}%`,
  delay: index * 2,
  duration: 5 + (index % 5),
  opacity: divingTheme ? 0.4 : 0.2,
  color: divingTheme ? '#5fa7c8' : '#efe3d3',
})

export const MarineFloat = ({ position = {}, duration = 10, delay = 0, size = '42px', color }) => (
  <Bubble
    $size={size}
    $left={position.left || '50%'}
    $top={position.top || '50%'}
    $duration={duration}
    $delay={delay}
    $opacity={0.22}
    $fill={color || 'rgba(99, 211, 223, 0.12)'}
    $border="rgba(173, 233, 240, 0.32)"
    $glow="rgba(88, 199, 212, 0.18)"
  />
)

export const MarineSwim = ({ position = {}, duration = 16, delay = 0, size = '220px', color }) => (
  <Current
    $width={size}
    $left={position.left || '40%'}
    $top={position.top || '50%'}
    $duration={duration}
    $delay={delay}
    $opacity={0.28}
    $color={color || 'rgba(223, 251, 255, 0.26)'}
  />
)

export const MarineTentacle = ({ position = {}, duration = 18, delay = 0, size = '220px', color }) => (
  <Ribbon
    $width={size}
    $height="40px"
    $left={position.left || '45%'}
    $top={position.top || '55%'}
    $duration={duration}
    $delay={delay}
    $opacity={0.18}
    $from={color || 'rgba(88, 199, 212, 0.32)'}
  />
)

export const MarineElements = ({ density = 'normal', divingTheme = false }) => {
  const config = densityMap[density] || densityMap.normal

  return (
    <Field aria-hidden="true">
      {Array.from({ length: config.glows }, (_, index) => {
        const glow = createGlowConfig(index, divingTheme)
        return (
          <Glow
            key={`glow-${index}`}
            $size={glow.size}
            $left={glow.left}
            $top={glow.top}
            $delay={glow.delay}
            $duration={glow.duration}
            $opacity={glow.opacity}
            $color={glow.color}
          />
        )
      })}

      {Array.from({ length: config.bubbles }, (_, index) => {
        const bubble = createBubbleConfig(index, divingTheme)
        return (
          <Bubble
            key={`bubble-${index}`}
            $size={bubble.size}
            $left={bubble.left}
            $top={bubble.top}
            $delay={bubble.delay}
            $duration={bubble.duration}
            $opacity={bubble.opacity}
            $fill={bubble.fill}
            $border={bubble.border}
            $glow={bubble.glow}
          />
        )
      })}

      {Array.from({ length: config.currents }, (_, index) => {
        const current = createCurrentConfig(index, divingTheme)
        return (
          <Current
            key={`current-${index}`}
            $width={current.width}
            $left={current.left}
            $top={current.top}
            $delay={current.delay}
            $duration={current.duration}
            $opacity={current.opacity}
            $color={current.color}
          />
        )
      })}

      {Array.from({ length: config.ribbons }, (_, index) => {
        const ribbon = createRibbonConfig(index, divingTheme)
        return (
          <Ribbon
            key={`ribbon-${index}`}
            $width={ribbon.width}
            $height={ribbon.height}
            $left={ribbon.left}
            $top={ribbon.top}
            $delay={ribbon.delay}
            $duration={ribbon.duration}
            $opacity={ribbon.opacity}
            $from={ribbon.from}
          />
        )
      })}
    </Field>
  )
}

export const MarineBackground = ({ children, density = 'normal' }) => (
  <div style={{ position: 'relative', overflow: 'hidden' }}>
    <MarineElements density={density} />
    {children}
  </div>
)

export default MarineElements
