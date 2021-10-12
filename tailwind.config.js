const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // ** animation from https://github.com/animate-css/animate.css
      animation: {
        bounce: 'bounce 1.5s linear 0s infinite normal',
        flash: 'flash 1.5s linear 0s infinite normal',
        pulse: 'pulse 1.5s ease-in-out 0s infinite normal',
        rubberBand: 'pulse 1.5s linear 0s infinite normal',
        shakeX: 'shakeX 1.5s linear 0s infinite normal',
        shakeY: 'shakeY  1.5s linear 0s infinite normal',
        headShake: 'headShake 1.5s ease-in-out 0s infinite normal',
        swing: 'swing 1.5s linear 0s infinite normal',
        tada: 'tada 1.5s linear 0s infinite normal',
        wobble: 'wobble 1.5s linear 0s infinite normal',
        jello: 'jello 1.5s linear 0s infinite normal',
        heartBeat: 'heartBeat 1.5s ease-in-out 0s infinite normal'
      },
      keyframes: {
        bounce: {
          '0%, 20%, 53%, 100%': { animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)', transform: 'translate3d(0, 0, 0)' },
          '40%, 43%': { animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)', transform: 'translate3d(0, -20px, 0) scaleY(1.1)' },
          '70%': { animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)', transform: 'translate3d(0, -10px, 0) scaleY(1.05)' },
          '80%': { animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)', transform: 'translate3d(0, 0, 0) scaleY(0.95)' },
          '90%': { transform: 'translate3d(0, -4px, 0) scaleY(1.02)' }
        },
        flash: {
          '0%, 50%, 100%': { opacity: 1 },
          '25%, 75%': { opacity: 0 }
        },
        pulse: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '50%': { transform: 'scale3d(1.05, 1.05, 1.05)' },
          '100%': { transform: 'scale3d(1, 1, 1)' }
        },
        rubberBand: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' }
        },
        shakeX: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(10px, 0, 0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(-10px, 0, 0)' }
        },
        shakeY: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(0, 10px, 0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(0, -10px, 0)' }
        },
        headShake: {
          '0%': { transform: 'translateX(0)' },
          '6.5%': { transform: 'translateX(-6px) rotateY(-9deg)' },
          '18.5%': { transform: 'translateX(5px) rotateY(7deg)' },
          '31.5%': { transform: 'translateX(-3px) rotateY(-5deg)' },
          '43.5%': { transform: 'translateX(2px) rotateY(3deg)' },
          '50%': { transform: 'translateX(0)' }
        },
        swing: {
          '20%': { transform: 'rotate3d(0, 0, 1, 15deg)' },
          '40%': { transform: 'rotate3d(0, 0, 1, -10deg)' },
          '60%': { transform: 'rotate3d(0, 0, 1, 5deg)' },
          '70%': { transform: 'rotate3d(0, 0, 1, -5deg)' },
          '100%': { transform: 'rotate3d(0, 0, 1, 0deg)' }
        },
        tada: {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '10%, 20%': { transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)' },
          '40%, 60%, 80%': { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)' },
          '100%': { transform: 'scale3d(1, 1, 1)' }
        },
        wobble: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '15%': { transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)' },
          '30%': { transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)' },
          '45%': { transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)' },
          '60%': { transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)' },
          '75%': { transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)' },
          '100%': { transform: 'translate3d(0, 0, 0)' }
        },
        jello: {
          '0%, 11.1%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '22.2%': { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
          '33.3%': { transform: 'skewX(6.25deg) skewY(6.25deg)' },
          '44.4%': { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
          '55.5%': { transform: 'skewX(1.5625deg) skewY(1.5625deg)' },
          '66.6%': { transform: 'skewX(-0.78125deg) skewY(-0.78125deg)' },
          '77.7%': { transform: 'skewX(0.390625deg) skewY(0.390625deg)' },
          '88.8%': { transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)' }
        },
        heartBeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' }
        }
      }
    },
    colors: {
      primary: '#05C46B',
      'primary-hover': '#28D17C',
      white: '#FFFFFF',
      body: '#F1F1F1',
      line: '#D9D9D9',
      content: '#2D2D2D',
      danger: '#E74C3C',
      transparent: 'transparent',
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink
    },
    fontFamily: {
      peyda: ['Peyda'],
      iransans: ['IRANSansX']
    },
    fontWeight: {
      normal: 'normal',
      bold: 'bold'
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwindcss-rtl')]
}
