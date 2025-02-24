

export default (title: string) => {
  const runtimeConfig = useRuntimeConfig()
  return title +  runtimeConfig.public.appName
}
