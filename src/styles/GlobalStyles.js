import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=JetBrains+Mono:wght@500&family=Manrope:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.colors.surface.page};
  }

  body {
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.neutral[800]};
    background: ${({ theme }) => theme.colors.gradients.aurora};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    background:
      radial-gradient(circle at 10% 12%, rgba(215, 178, 119, 0.16), transparent 24%),
      radial-gradient(circle at 88% 8%, rgba(95, 167, 200, 0.16), transparent 22%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0));
  }

  #root,
  .App {
    min-height: 100vh;
  }

  .App {
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    position: relative;
    z-index: 1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 0.96;
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  h1 {
    font-size: clamp(3.3rem, 8vw, ${({ theme }) => theme.fontSizes['7xl']});
  }

  h2 {
    font-size: clamp(2.5rem, 5.8vw, ${({ theme }) => theme.fontSizes['6xl']});
  }

  h3 {
    font-size: clamp(1.8rem, 3vw, ${({ theme }) => theme.fontSizes['4xl']});
  }

  p {
    color: ${({ theme }) => theme.colors.neutral[700]};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  small,
  label,
  input,
  textarea,
  select,
  button {
    font-family: ${({ theme }) => theme.fonts.body};
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast},
      opacity ${({ theme }) => theme.transitions.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary.dark};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
    transition: transform ${({ theme }) => theme.transitions.fast},
      box-shadow ${({ theme }) => theme.transitions.fast},
      background ${({ theme }) => theme.transitions.fast},
      border-color ${({ theme }) => theme.transitions.fast};
  }

  input,
  textarea,
  select {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.surface.border};
    border-radius: ${({ theme }) => theme.radii.lg};
    padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[5]}`};
    color: ${({ theme }) => theme.colors.neutral[800]};
    background: ${({ theme }) => theme.colors.surface.cardStrong};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: border-color ${({ theme }) => theme.transitions.fast},
      box-shadow ${({ theme }) => theme.transitions.fast};
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.neutral[500]};
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary.main};
    box-shadow: 0 0 0 4px rgba(95, 167, 200, 0.12);
  }

  ::selection {
    background: rgba(95, 167, 200, 0.18);
    color: ${({ theme }) => theme.colors.primary.dark};
  }

  .container,
  .container-wide {
    width: min(1240px, calc(100% - 2rem));
    margin: 0 auto;
  }

  .container-wide {
    width: min(1400px, calc(100% - 2rem));
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[2]};
    min-height: 3.45rem;
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
    border-radius: ${({ theme }) => theme.radii.full};
    border: 1px solid transparent;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: 0.02em;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    position: relative;
    overflow: hidden;
  }

  .btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  .btn:hover::after {
    transform: translateX(100%);
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-primary {
    color: ${({ theme }) => theme.colors.neutral.white};
    background: ${({ theme }) => theme.colors.gradients.button};
  }

  .btn-secondary {
    color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.surface.cardStrong};
    border-color: ${({ theme }) => theme.colors.surface.border};
  }

  .btn-outline {
    color: ${({ theme }) => theme.colors.primary.main};
    background: transparent;
    border-color: rgba(18, 58, 99, 0.18);
    box-shadow: none;
  }

  .btn-accent {
    color: ${({ theme }) => theme.colors.primary.dark};
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent.gold}, ${({ theme }) => theme.colors.accent.champagne});
    border-color: transparent;
  }

  .btn-game {
    color: white;
    background: ${({ theme }) => theme.colors.gradients.game};
    box-shadow: 0 4px 15px rgba(47, 109, 162, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 800;
  }

  .glass-panel {
    background: ${({ theme }) => theme.colors.surface.card};
    border: 1px solid ${({ theme }) => theme.colors.surface.border};
    box-shadow: ${({ theme }) => theme.shadows.base};
    backdrop-filter: blur(18px);
  }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
    border-radius: ${({ theme }) => theme.radii.full};
    background: rgba(18, 58, 99, 0.06);
    border: 1px solid rgba(18, 58, 99, 0.08);
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  ::-webkit-scrollbar {
    width: 11px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface.page};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(47, 109, 162, 0.72), rgba(18, 58, 99, 0.72));
    border: 3px solid ${({ theme }) => theme.colors.surface.page};
    border-radius: 999px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    html {
      font-size: 15px;
    }

    .container,
    .container-wide {
      width: min(100%, calc(100% - 1rem));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles
