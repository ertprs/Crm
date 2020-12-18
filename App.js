
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import Root from './src/components/root';
import { colors, Fonts } from './src/components/styles';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
  },
  fonts: {
    regular: Fonts.fontFamily.regular,
    medium: Fonts.fontFamily.medium,
    light: Fonts.fontFamily.light,
    bold: Fonts.fontFamily.bold,
  },
};

const App = () => (
  <Provider store={store}>
     <PaperProvider theme={theme}>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
     </PaperProvider>
  </Provider>
);

export default App;
