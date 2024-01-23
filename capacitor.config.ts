import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-todo-list',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
