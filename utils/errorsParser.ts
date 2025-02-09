export default function (message: string): string|undefined {
  const { t } = useI18n();
  let httpCode = message.match(/\d+/) ?.[0];
  let translatedError = httpCode && t(`toast.messages.server_errors.${httpCode}`);
  if (translatedError) return translatedError;
}
