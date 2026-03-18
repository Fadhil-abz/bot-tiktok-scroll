import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.botscroll.app',
  appName: 'tiktok-bot',
  webDir: 'out', // Pastikan ini 'out', bukan 'public'
  server: {
    androidScheme: 'https'
  }
};

export default config;