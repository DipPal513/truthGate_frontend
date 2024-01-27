import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from "i18next-browser-languagedetector";


i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "bn",
        resources: {
            en: {
                translation: {
                    greeting: "hello how are you"
                }
            },
            bn: {
                translation: {
                    greeting: "তুমি কেমন আছো"
                }
            }
        }
    });

