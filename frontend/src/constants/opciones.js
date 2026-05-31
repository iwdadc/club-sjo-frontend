//opciones.js - — Opciones generales reutilizables en el formulario

export const GENEROS = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
]

export const PARENTESCOS = [
  { value: "madre", label: "Madre" },
  { value: "padre", label: "Padre" },
  { value: "tutor", label: "Tutor/a" },
  { value: "abuelo", label: "Abuelo/a" },
  { value: "otro", label: "Otro" },
]

export const TURNOS = [
  { value: "manana", label: "Mañana" },
  { value: "tarde", label: "Tarde" },
  { value: "noche", label: "Noche" },
]

export const RETIRO_MENOR = [
  { value: "solo", label: "Autorizo que se retire solo" },
  { value: "buscan", label: "No lo autorizo que se retire solo, lo va a buscar un familiar mayor de edad" },
]

export const RAZON_SACRAMENTO = [
  { value: "quiere_info", label: "No contaba con el tiempo y me gustaría recibir información" },
  { value: "no_interesado", label: "Porque no estamos interesados aún" },
  { value: "no_catolico", label: "Porque no profesamos la fe católica" },
  { value: "no_sabe", label: "Porque no sé lo qué es" },
  { value: "ya_recibio", label: "No le falta ningún sacramento, ya los ha recibido" },
]

export const GRUPOS_PASTORALES = [
  { value: "scout", label: "Scout SCJ" },
  { value: "jovenes_smp", label: "Grupo de jóvenes SMP" },
  { value: "catequesis", label: "Catequesis sacramental" },
  { value: "mbegue", label: "Centro Socioeducativo Hermanxs Mbegue" },
  { value: "cef112", label: "CEF 112" },
  { value: "jubilados", label: "Centro de Jubilados y Pensionados RENACER" },
  { value: "envion", label: "Envión Podes Villa Celina" },
  { value: "guardia", label: "Parroquia/Club Nuestra Señora de la Guardia" },
  { value: "otros", label: "Otros" },
]

export const SACRAMENTOS = [
  { value: "bautismo", label: "Bautismo" },
  { value: "comunion", label: "Comunión" },
  { value: "confirmacion", label: "Confirmación" },
]