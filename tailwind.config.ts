import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#FFD34E',
        accentWeak: 'rgba(255, 211, 78, 0.12)',
        bg: '#FFFFFF',
        surface: '#F3F4F6',
        textMain: '#0B0B0B',
        muted: '#5A5A5A',
        border: '#D2D6DC',
        zone1: '#E5E7EB',
        zone2: '#3B82F6',
        zone3: '#F59E0B',
        zone4: '#F97316',
        zone5: '#EF4444',
        zoneRest: '#374151',
        zoneStrength: '#8B5CF6'
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.08)'
      },
      borderRadius: {
        card: '18px'
      }
    }
  }
} satisfies Config;
