import {
  supportedLanguages,
  type SupportedLanguage,
} from "~/shared/config/i18n";

export type ApiErrorMessages = {
  unknownGenerator: string;
  missingOptions: string;
  invalidOptions: string;
  invalidJson: string;
  invalidParameters: string;
  methodNotAllowed: string;
  passwordCharacterSet: string;
  passwordLength: string;
  invalidRange: string;
  rangeTooLarge: string;
  phraseWordCount: string;
};

const messages: Record<SupportedLanguage, ApiErrorMessages> = {
  en: {
    unknownGenerator: "Unknown generator type",
    missingOptions: "X-Data header is required for GET requests",
    invalidOptions: "X-Data must contain a valid Base64-encoded UTF-8 JSON value",
    invalidJson: "Request body must contain valid JSON",
    invalidParameters: "Invalid request parameters",
    methodNotAllowed: "Method not allowed",
    passwordCharacterSet: "Select at least one character set",
    passwordLength: "Length is too small",
    invalidRange: "Minimum must not exceed maximum",
    rangeTooLarge: "Range is too large",
    phraseWordCount: "Use 12, 15, 18, 21 or 24 words",
  },
  ru: {
    unknownGenerator: "Неизвестный тип генератора",
    missingOptions: "Для GET-запроса обязателен заголовок X-Data",
    invalidOptions: "X-Data должен содержать корректное UTF-8 JSON-значение в Base64",
    invalidJson: "Тело запроса должно содержать корректный JSON",
    invalidParameters: "Некорректные параметры запроса",
    methodNotAllowed: "Метод не поддерживается",
    passwordCharacterSet: "Выберите хотя бы один набор символов",
    passwordLength: "Длина слишком мала",
    invalidRange: "Минимальное значение не должно превышать максимальное",
    rangeTooLarge: "Диапазон слишком большой",
    phraseWordCount: "Используйте 12, 15, 18, 21 или 24 слова",
  },
  de: {
    unknownGenerator: "Unbekannter Generatortyp",
    missingOptions: "Der Header X-Data ist für GET-Anfragen erforderlich",
    invalidOptions: "X-Data muss einen gültigen Base64-kodierten UTF-8-JSON-Wert enthalten",
    invalidJson: "Der Anfragetext muss gültiges JSON enthalten",
    invalidParameters: "Ungültige Anfrageparameter",
    methodNotAllowed: "Methode nicht zulässig",
    passwordCharacterSet: "Wählen Sie mindestens einen Zeichensatz aus",
    passwordLength: "Die Länge ist zu klein",
    invalidRange: "Der Mindestwert darf den Höchstwert nicht überschreiten",
    rangeTooLarge: "Der Bereich ist zu groß",
    phraseWordCount: "Verwenden Sie 12, 15, 18, 21 oder 24 Wörter",
  },
  fr: {
    unknownGenerator: "Type de générateur inconnu",
    missingOptions: "L’en-tête X-Data est requis pour les requêtes GET",
    invalidOptions: "X-Data doit contenir une valeur JSON UTF-8 valide encodée en Base64",
    invalidJson: "Le corps de la requête doit contenir du JSON valide",
    invalidParameters: "Paramètres de requête non valides",
    methodNotAllowed: "Méthode non autorisée",
    passwordCharacterSet: "Sélectionnez au moins un jeu de caractères",
    passwordLength: "La longueur est trop petite",
    invalidRange: "Le minimum ne doit pas dépasser le maximum",
    rangeTooLarge: "La plage est trop grande",
    phraseWordCount: "Utilisez 12, 15, 18, 21 ou 24 mots",
  },
  es: {
    unknownGenerator: "Tipo de generador desconocido",
    missingOptions: "El encabezado X-Data es obligatorio para las solicitudes GET",
    invalidOptions: "X-Data debe contener un valor JSON UTF-8 válido codificado en Base64",
    invalidJson: "El cuerpo de la solicitud debe contener JSON válido",
    invalidParameters: "Parámetros de solicitud no válidos",
    methodNotAllowed: "Método no permitido",
    passwordCharacterSet: "Selecciona al menos un conjunto de caracteres",
    passwordLength: "La longitud es demasiado pequeña",
    invalidRange: "El mínimo no debe superar el máximo",
    rangeTooLarge: "El rango es demasiado grande",
    phraseWordCount: "Usa 12, 15, 18, 21 o 24 palabras",
  },
};

export function getApiLanguage(value: string | null): SupportedLanguage {
  const language = value?.trim().toLowerCase().split("-", 1)[0];

  return supportedLanguages.includes(language as SupportedLanguage)
    ? (language as SupportedLanguage)
    : "en";
}

export function getApiErrorMessages(language: SupportedLanguage) {
  return messages[language];
}
