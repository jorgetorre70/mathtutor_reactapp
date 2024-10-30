import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  useTheme,
  View,
  Text,
  translations,
  Image as AmplifyImage,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { I18n } from "aws-amplify/utils";
// Import the image directly
import logoImage from "./img/MathTutor_image.jpg";

Amplify.configure(awsExports);

I18n.putVocabularies(translations);
I18n.setLanguage("es");

I18n.putVocabularies({
  fr: {
    "Sign In": "Se connecter",
    "Sign Up": "S'inscrire",
  },
  es: {
    "Sign In": "Registrarse",
    "Sign Up": "Regístrate",
  },
});

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <AmplifyImage alt="UAIE logo" src={logoImage} className="auth-logo" />
        <Text
          variation="primary"
          // as="h2"
          fontSize={tokens.fontSizes.xl}
          fontWeight={tokens.fontWeights.bold}
          color={tokens.colors.white}
          marginTop={tokens.space.medium}
        >
          Bienvenido al asistente de Matemáticas
        </Text>
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.white}>
          &copy; Derechos Reservados J.T.R. 2024
        </Text>
      </View>
    );
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Introduzca su correo",
      isRequired: true,
      label: "Correo:",
    },
    password: {
      placeholder: "Introduzca su contraseña",
      isRequired: true,
      label: "Contraseña:",
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator components={components} formFields={formFields}>
      <App />
    </Authenticator>
  </React.StrictMode>
);
