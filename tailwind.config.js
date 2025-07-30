export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        // Bab.ai global font system - Inter as primary font
        sans: [
          'Inter',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        heading: [
          'Inter',
          'Segoe UI',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        body: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        dancing: ["'Dancing Script'", "'Brush Script MT'", 'cursive'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        // STRICT 4-COLOR PALETTE ENFORCEMENT
        // Only these 4 colors are allowed throughout the application
        brand: {
          primary: '#1561ad', // Primary Blue - main brand color
          accent: '#FFB300', // Accent Gold - CTAs and highlights
          white: '#FFFFFF', // Neutral White - backgrounds
          charcoal: '#212121', // Charcoal - text and dark backgrounds
        },
        // Direct palette access (replaces all other color definitions)
        babai: {
          primary: '#1561ad',
          accent: '#FFB300',
          white: '#FFFFFF',
          charcoal: '#212121',
        },
        // Override Tailwind defaults to use only our palette
        gray: {
          50: '#FFFFFF', // White
          100: '#FFFFFF', // White
          200: '#FFFFFF', // White
          300: '#FFFFFF', // White
          400: '#FFB300', // Accent Gold for mid-tones
          500: '#1561ad', // Primary Blue for default
          600: '#1561ad', // Primary Blue
          700: '#212121', // Charcoal
          800: '#212121', // Charcoal
          900: '#212121', // Charcoal
        },
        slate: {
          50: '#FFFFFF', // Force all slate to our palette
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFB300',
          500: '#1561ad',
          600: '#1561ad',
          700: '#212121',
          800: '#212121',
          900: '#212121',
        },
        neutral: {
          50: '#FFFFFF', // Force all neutral to our palette
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFB300',
          500: '#1561ad',
          600: '#1561ad',
          700: '#212121',
          800: '#212121',
          900: '#212121',
        },
      },
      backgroundImage: {
        // STRICT PALETTE GRADIENTS - Only using the 4 approved colors
        'gradient-primary': 'linear-gradient(135deg, #1561ad 0%, #1561ad 100%)', // Primary blue solid to lighter primary
        'gradient-accent': 'linear-gradient(135deg, #FFB300 0%, #FFB300 100%)', // Accent gold variations
        'gradient-charcoal':
          'linear-gradient(135deg, #212121 0%, #212121 100%)', // Charcoal variations
        'gradient-white': 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 100%)', // White variations
        'gradient-primary-accent':
          'linear-gradient(135deg, #1561ad 0%, #FFB300 100%)', // Primary to accent
        'gradient-charcoal-primary':
          'linear-gradient(135deg, #212121 0%, #1561ad 100%)', // Charcoal to primary
        'gradient-subtle':
          'linear-gradient(135deg, rgba(21, 97, 173, 0.05) 0%, rgba(255, 179, 0, 0.05) 100%)', // Subtle brand overlay
        'gradient-overlay':
          'linear-gradient(135deg, rgba(33, 33, 33, 0.8) 0%, rgba(21, 97, 173, 0.3) 100%)', // Dark overlay
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        medium: 'var(--shadow-medium)',
        strong: 'var(--shadow-strong)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        babaiGlow: {
          '0%': {
            textShadow: '0 0 5px rgba(21, 97, 173, 0.3)', // Primary Blue
          },
          '100%': {
            textShadow:
              '0 0 20px rgba(255, 179, 0, 0.4), 0 0 30px rgba(21, 97, 173, 0.2)', // Accent Gold + Primary Blue
          },
        },
        helloGlow: {
          '0%': {
            textShadow: '0 0 5px rgba(33, 33, 33, 0.3)', // Charcoal
          },
          '100%': {
            textShadow:
              '0 0 15px rgba(33, 33, 33, 0.4), 0 0 25px rgba(33, 33, 33, 0.3)', // Charcoal only
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        babaiGlow: 'babaiGlow 3s ease-in-out infinite alternate',
        helloGlow: 'helloGlow 3s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
