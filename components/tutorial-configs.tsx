"use client"

import { TutorialStep } from "./tutorial-system"

// Configuración de tutoriales para el Jardín de Riemann
export const RIEMANN_TUTORIAL_STEPS_BASIC: TutorialStep[] = [
  {
    id: 1,
    title: "¡Bienvenida al Jardín Mágico!",
    description: "Soy Aria, el hada jardinera. Te ayudaré a entender las integrales de Riemann plantando macetas mágicas en nuestro jardín encantado.",
    target: "fairy",
    position: { x: 50, y: 20 },
    fairyMessage: "¡Hola! Estoy muy emocionada de enseñarte sobre las integrales. ¿Estás listo para esta aventura mágica?",
    hint: "💡 Las integrales de Riemann son una forma de calcular el área bajo una curva dividiéndola en pequeños rectángulos. ¡Es como contar cuadraditos en papel cuadriculado, pero de forma más precisa!",
    isObservationOnly: true,
  },
  {
    id: 2,
    title: "La Cerca Mágica",
    description: "Esta cerca ondulada representa nuestra función f(x). Necesitamos calcular cuánta tierra mágica hay debajo de ella para plantar nuestras flores.",
    target: "canvas",
    position: { x: 400, y: 150 },
    action: "Observa cómo la curva morada forma la cerca de nuestro jardín",
    fairyMessage: "Esta cerca cambia de altura. Nuestra misión es encontrar el área total debajo de ella.",
    hint: "🔍 La función f(x) = 0.5x² + 1 es una parábola que siempre es positiva. Su forma crea un área específica entre los límites que podemos calcular exactamente, pero las integrales de Riemann nos permiten aproximarla usando rectángulos.",
    isObservationOnly: true,
  },
  {
    id: 3,
    title: "Los Límites del Jardín",
    description: "Los puntos rojo y azul marcan los límites de nuestro jardín. Arrastra estos puntos para cambiar el área que queremos calcular.",
    target: "limits",
    position: { x: 300, y: 100 },
    action: "Arrastra los puntos rojo y azul para cambiar los límites",
    fairyMessage: "Estos son los límites de nuestro jardín. ¡Puedes moverlos para explorar diferentes áreas!",
    hint: "🎯 Los límites definen el intervalo [a, b] sobre el cual calculamos la integral. ¡Arrastra los puntos para ver cómo cambia el área!",
    requirement: (partitions: number[], leftLimit: number[], rightLimit: number[]) => {
      return leftLimit && rightLimit && (leftLimit[0] !== -2 || rightLimit[0] !== 4)
    },
  },
  {
    id: 4,
    title: "Plantando Macetas Mágicas",
    description: "Cada maceta representa un rectángulo de Riemann. Usa el slider para cambiar el número de macetas y ver cómo se aproxima el área.",
    target: "partitions",
    position: { x: 200, y: 200 },
    action: "Cambia el número de macetas con el slider",
    fairyMessage: "¡Cada maceta es un rectángulo mágico! Cuantas más macetas, mejor aproximación.",
    hint: "🌱 Más macetas = mejor aproximación. ¡Observa cómo el error disminuye cuando aumentas el número de particiones!",
    requirement: (partitions: number[]) => partitions && partitions[0] !== 8,
  },
  {
    id: 5,
    title: "El Tipo de Hechizo",
    description: "Elige cómo medir la altura de cada rectángulo: por la izquierda, derecha o centro.",
    target: "approximation-type",
    position: { x: 150, y: 250 },
    action: "Selecciona un tipo de aproximación",
    fairyMessage: "¡Cada tipo de hechizo da una aproximación diferente! ¡Experimenta con todos!",
    hint: "✨ Centro suele dar la mejor aproximación, pero ¡experimenta con todos los tipos!",
    requirement: (approximationType: string) => Boolean(approximationType && approximationType !== "middle"),
  },
  {
    id: 6,
    title: "¡Magia en Acción!",
    description: "Observa cómo las macetas se plantan y calculan el área aproximada. ¡Cada rectángulo contribuye al total!",
    target: "canvas",
    position: { x: 400, y: 200 },
    action: "Observa la animación de las macetas plantándose",
    fairyMessage: "¡Mira cómo cada maceta suma su área al total! ¡Es la magia de las sumas de Riemann!",
    hint: "🌟 Cada rectángulo tiene área = base × altura. La suma de todos da nuestra aproximación. ¡Es como contar cuadraditos pero de forma inteligente!",
    isObservationOnly: true,
  },
  {
    id: 7,
    title: "¡Felicidades, Aprendiz!",
    description: "Has completado el tutorial básico. Ahora puedes explorar libremente el jardín mágico y experimentar con todas las herramientas. ¡En el modo libre podrás arrastrar elementos directamente!",
    target: "completion",
    position: { x: 300, y: 200 },
    fairyMessage: "¡Excelente trabajo! Ahora eres oficialmente mi aprendiz de jardinería mágica. ¡Ve y experimenta arrastrando los elementos!",
    hint: "🌟 ¡Ahora eres un experto en integrales de Riemann! En el modo libre puedes: arrastrar los límites directamente en el gráfico, probar diferentes funciones (seno, cúbica), y ver cómo el error disminuye con más particiones. ¡La integral exacta es tu objetivo!",
    isObservationOnly: true,
  },
]

export const RIEMANN_TUTORIAL_STEPS_ADVANCED: TutorialStep[] = [
  {
    id: 1,
    title: "¡Bienvenida al Nivel Avanzado!",
    description: "Soy Aria, tu hada guía. Ahora exploraremos las sumas de Riemann con más profundidad: convergencia, precisión y diferentes funciones.",
    target: "fairy",
    position: { x: 50, y: 20 },
    fairyMessage: "¡Excelente! Ahora que dominas lo básico, profundicemos en la magia de las sumas de Riemann. ¡Prepárate para experimentar más!",
    hint: "🌟 ¡Nivel avanzado activado! Aquí explorarás la convergencia de las sumas de Riemann, análisis de error, y experimentarás con diferentes funciones. ¡Matemáticas de nivel superior!",
    isObservationOnly: true,
  },
  {
    id: 2,
    title: "Convergencia Mágica",
    description: "Observa cómo las sumas de Riemann convergen al valor exacto cuando aumentas las particiones. ¡Es la magia de las matemáticas!",
    target: "canvas",
    position: { x: 400, y: 150 },
    action: "Observa la convergencia de las sumas",
    fairyMessage: "¡Mira cómo las sumas se acercan al valor exacto! ¡Es la convergencia en acción!",
    hint: "📈 La convergencia significa que cuando n → ∞, la suma de Riemann → valor exacto. ¡Es el fundamento del cálculo integral!",
    isObservationOnly: true,
  },
  {
    id: 3,
    title: "Desliza hacia la Precisión",
    description: "Desliza el control de particiones hasta 40 para ver una aproximación muy precisa. ¡Observa cómo el error disminuye dramáticamente!",
    target: "partitions",
    position: { x: 200, y: 200 },
    action: "Desliza hasta 40 particiones",
    fairyMessage: "¡40 particiones! ¡Observa cómo el error se vuelve casi imperceptible!",
    hint: "🎯 Con 40 particiones, el error debería ser menor a 0.1. ¡La precisión aumenta cuadráticamente con el número de particiones!",
    requirement: (partitions: number[]) => partitions && partitions[0] >= 40,
  },
  {
    id: 4,
    title: "Explora Diferentes Funciones",
    description: "Cambia la función a 'Onda Senoidal' para ver cómo las sumas de Riemann se adaptan a diferentes formas. ¡Cada función tiene su propia magia!",
    target: "function-selector",
    position: { x: 150, y: 100 },
    action: "Selecciona 'Onda Senoidal'",
    fairyMessage: "¡La función seno tiene una forma ondulante! ¡Observa cómo las sumas se adaptan a esta nueva forma!",
    hint: "🌊 La función seno oscila entre -1 y 1. ¡Observa cómo las sumas de Riemann capturan estas oscilaciones!",
    requirement: (currentFunction: string) => Boolean(currentFunction && currentFunction !== "quadratic"),
  },
  {
    id: 5,
    title: "Experimenta con Tipos de Aproximación",
    description: "Prueba diferentes tipos de aproximación (izquierda, derecha, centro) y observa cómo afectan la precisión. ¡Cada uno tiene sus ventajas!",
    target: "approximation-type",
    position: { x: 150, y: 250 },
    action: "Cambia el tipo de aproximación",
    fairyMessage: "¡Cada tipo de aproximación da resultados diferentes! ¡Experimenta para encontrar el mejor!",
    hint: "⚖️ Centro suele ser más preciso, pero izquierda y derecha son útiles para entender límites. ¡La elección depende de tu objetivo!",
    requirement: (approximationType: string) => Boolean(approximationType && approximationType !== "middle"),
  },
  {
    id: 6,
    title: "¡Maestro de las Sumas de Riemann!",
    description: "Has dominado los conceptos avanzados. ¡Ahora eres un verdadero experto en integrales de Riemann! ¡Explora libremente y descubre más magia matemática!",
    target: "completion",
    position: { x: 300, y: 200 },
    fairyMessage: "¡Increíble! Has dominado las sumas de Riemann avanzadas. ¡Eres un verdadero mago de las matemáticas!",
    hint: "🏆 ¡Felicidades! Has completado el tutorial avanzado. Ahora puedes explorar libremente, experimentar con diferentes funciones, y entender la convergencia de las sumas de Riemann. ¡Eres un experto!",
    isObservationOnly: true,
  },
]

// Configuración de tutoriales para el Puente del Primer Teorema
export const BRIDGE_TUTORIAL_STEPS_BASIC: TutorialStep[] = [
  {
    id: 1,
    title: "¡Bienvenida al Puente Mágico!",
    description: "Soy Aria, tu hada guía. Te ayudaré a entender el Primer Teorema Fundamental del Cálculo a través de este puente mágico.",
    target: "fairy",
    position: { x: 50, y: 20 },
    fairyMessage: "¡Hola! Estoy emocionada de enseñarte sobre el teorema fundamental. ¡Este puente es especial!",
    hint: "🌉 El Primer Teorema Fundamental del Cálculo conecta la derivada y la integral. ¡Es como un puente mágico entre dos mundos matemáticos!",
    isObservationOnly: true,
  },
  {
    id: 2,
    title: "El Puente del Hada",
    description: "Este puente curvo representa nuestra función f(x). Observa cómo el hada viaja por él y acumula área dorada a medida que avanza.",
    target: "bridge-canvas",
    position: { x: 400, y: 150 },
    action: "Observa el puente y el hada",
    fairyMessage: "¡Este puente es mágico! Cada paso que doy acumula área dorada debajo de mí.",
    hint: "✨ El puente representa f(x) y el área dorada representa la integral acumulada. ¡Es la conexión entre la función y su integral!",
    isObservationOnly: true,
  },
  {
    id: 3,
    title: "Los Límites del Puente",
    description: "Los controles 'Límite a' y 'Límite b' definen el tramo del puente que exploraremos. ¡Cambia estos valores para ver diferentes tramos!",
    target: "limits-controls",
    position: { x: 200, y: 100 },
    action: "Ajusta los límites a y b",
    fairyMessage: "¡Estos límites definen nuestro tramo de puente! ¡Cambia a y b para explorar diferentes secciones!",
    hint: "🎯 Los límites [a, b] definen el intervalo de integración. ¡Cambia estos valores para ver cómo cambia el área acumulada!",
    requirement: (leftLimit: number, rightLimit: number) => {
      return leftLimit !== -1.6 || rightLimit !== 4.0
    },
  },
  {
    id: 4,
    title: "El Viaje del Hada",
    description: "Usa el control 'Posición x' para mover al hada a lo largo del puente. ¡Observa cómo el área acumulada cambia con cada paso!",
    target: "position-control",
    position: { x: 200, y: 200 },
    action: "Mueve el hada con el control de posición",
    fairyMessage: "¡Mueve el control para hacerme caminar por el puente! ¡Observa cómo crece el área dorada!",
    hint: "🚶‍♀️ Al mover el hada, el área dorada representa ∫[a,x] f(t)dt. ¡Es la función integral acumulada!",
    requirement: (currentX: number, leftLimit: number) => {
      return Math.abs(currentX - leftLimit) > 0.1
    },
  },
  {
    id: 5,
    title: "La Animación Mágica",
    description: "Presiona 'Reproducir' para ver al hada viajar automáticamente por el puente. ¡Observa cómo el área se acumula suavemente!",
    target: "animation-controls",
    position: { x: 300, y: 250 },
    action: "Presiona el botón de reproducción",
    fairyMessage: "¡Presiona reproducir para verme viajar por el puente! ¡Es mágico ver cómo se acumula el área!",
    hint: "▶️ La animación muestra cómo la integral se construye punto a punto. ¡Es la visualización perfecta del teorema fundamental!",
    requirement: (isAnimating: boolean) => isAnimating,
  },
  {
    id: 6,
    title: "¡Felicidades, Explorador del Puente!",
    description: "Has entendido el Primer Teorema Fundamental del Cálculo. ¡Ahora puedes explorar libremente y experimentar con diferentes funciones y límites!",
    target: "completion",
    position: { x: 300, y: 200 },
    fairyMessage: "¡Excelente! Ahora entiendes cómo el puente conecta la función con su integral. ¡Eres un verdadero explorador matemático!",
    hint: "🌟 ¡Has dominado el Primer Teorema Fundamental! Ahora puedes: cambiar funciones, ajustar límites, y ver cómo la derivada de la integral es la función original. ¡Es la magia del cálculo!",
    isObservationOnly: true,
  },
]

export const BRIDGE_TUTORIAL_STEPS_ADVANCED: TutorialStep[] = [
  {
    id: 1,
    title: "¡Nivel Avanzado del Puente!",
    description: "Soy Aria, tu hada guía avanzada. Ahora exploraremos el Primer Teorema Fundamental con mayor profundidad: diferentes funciones, análisis de la derivada, y conexiones profundas.",
    target: "fairy",
    position: { x: 50, y: 20 },
    fairyMessage: "¡Excelente! Ahora que dominas lo básico, profundicemos en las conexiones más profundas del teorema fundamental. ¡Prepárate para la magia avanzada!",
    hint: "🌟 ¡Nivel avanzado activado! Aquí explorarás: la conexión derivada-integral, diferentes tipos de funciones, y el poder del teorema fundamental en acción. ¡Matemáticas de nivel superior!",
    isObservationOnly: true,
  },
  {
    id: 2,
    title: "Explora Diferentes Funciones",
    description: "Cambia la función a 'Parábola Mágica' o 'Onda Senoidal' para ver cómo el puente se adapta. ¡Cada función tiene su propia personalidad!",
    target: "function-selector",
    position: { x: 150, y: 100 },
    action: "Selecciona una función diferente",
    fairyMessage: "¡Cada función crea un puente único! ¡Observa cómo cambia la forma y el área acumulada!",
    hint: "🌈 Diferentes funciones crean diferentes puentes. ¡Observa cómo la forma del puente afecta la acumulación del área!",
    requirement: (currentFunction: string) => Boolean(currentFunction && currentFunction !== "quadratic"),
  },
  {
    id: 3,
    title: "Límites Extremos",
    description: "Experimenta con límites extremos: haz a muy negativo y b muy positivo. ¡Observa cómo el puente se extiende y el área crece!",
    target: "limits-controls",
    position: { x: 200, y: 100 },
    action: "Cambia los límites a valores extremos",
    fairyMessage: "¡Límites extremos! ¡Observa cómo el puente se extiende y el área puede crecer enormemente!",
    hint: "📏 Límites extremos muestran el comportamiento asintótico. ¡Observa cómo el área puede crecer sin límite o converger!",
    requirement: (leftLimit: number, rightLimit: number) => {
      return Math.abs(leftLimit) > 2 || Math.abs(rightLimit) > 5
    },
  },
  {
    id: 4,
    title: "La Derivada en Acción",
    description: "Observa cómo la pendiente del área acumulada (la derivada de la integral) es exactamente la función original. ¡Es la magia del teorema fundamental!",
    target: "derivative-display",
    position: { x: 400, y: 200 },
    action: "Observa la conexión derivada-integral",
    fairyMessage: "¡Mira! La pendiente del área es exactamente la función del puente. ¡Es la magia del teorema fundamental!",
    hint: "🔗 d/dx[∫f(t)dt] = f(x). ¡La derivada de la integral es la función original! ¡Es la conexión más profunda del cálculo!",
    isObservationOnly: true,
  },
  {
    id: 5,
    title: "Velocidad de Acumulación",
    description: "Observa cómo la velocidad de acumulación del área cambia según la altura del puente. ¡Donde el puente es más alto, el área crece más rápido!",
    target: "bridge-canvas",
    position: { x: 400, y: 150 },
    action: "Observa la velocidad de acumulación",
    fairyMessage: "¡Donde el puente es más alto, el área crece más rápido! ¡Es la velocidad de acumulación en acción!",
    hint: "⚡ La velocidad de acumulación = f(x). ¡Donde f(x) es mayor, el área crece más rápido! ¡Es la esencia del teorema fundamental!",
    isObservationOnly: true,
  },
  {
    id: 6,
    title: "¡Maestro del Puente Mágico!",
    description: "Has dominado el Primer Teorema Fundamental del Cálculo en su nivel más profundo. ¡Eres un verdadero maestro de las conexiones matemáticas!",
    target: "completion",
    position: { x: 300, y: 200 },
    fairyMessage: "¡Increíble! Has comprendido las conexiones más profundas del teorema fundamental. ¡Eres un verdadero maestro del puente mágico!",
    hint: "🏆 ¡Felicidades! Has dominado el Primer Teorema Fundamental del Cálculo. Ahora entiendes: la conexión derivada-integral, el comportamiento de diferentes funciones, y la magia de la acumulación. ¡Eres un experto!",
    isObservationOnly: true,
  },
]

// Configuración de tutoriales para la Torre del Valor Medio
export const MVT_TUTORIAL_STEPS_BASIC: TutorialStep[] = [
  {
    id: 1,
    title: "¡Bienvenida a la Torre del Valor Medio!",
    description: "Soy Aria, tu guía mágica. Te ayudaré a entender el Teorema del Valor Medio escalando esta torre encantada.",
    target: "fairy",
    position: { x: 50, y: 20 },
    fairyMessage: "¡Hola! Estoy emocionada de enseñarte sobre el Teorema del Valor Medio. ¿Estás listo para esta aventura matemática?",
    hint: "💡 El Teorema del Valor Medio dice que si una función es continua en [a,b] y derivable en (a,b), entonces existe un punto c donde la pendiente de la tangente es igual a la pendiente de la secante.",
    isObservationOnly: true,
  },
  {
    id: 2,
    title: "La Torre Mágica",
    description: "Esta torre representa nuestra función f(x). Necesitamos encontrar el punto c donde la pendiente de la tangente es igual a la pendiente de la secante.",
    target: "canvas",
    position: { x: 400, y: 150 },
    action: "Observa cómo la torre forma una curva suave",
    fairyMessage: "La torre debe ser continua y suave. Solo así podemos aplicar el Teorema del Valor Medio.",
    hint: "🔍 La función debe ser continua en [a,b] y derivable en (a,b). La torre no puede tener saltos ni esquinas afiladas.",
    isObservationOnly: true,
  },
  {
    id: 3,
    title: "La Función de la Torre",
    description: "Selecciona el tipo de función que forma nuestra torre. Cada función tiene su propia magia y comportamiento.",
    target: "function-selector",
    position: { x: 150, y: 100 },
    action: "Selecciona un tipo de función diferente y oprima el botón pista para ver la información",
    fairyMessage: "¡Cada función crea una torre única! La parábola es suave, el seno es ondulante, y la cúbica es más compleja.",
    hint: "🌊 Prueba la función seno para ver una torre ondulante, o la cúbica para una torre más compleja. ¡Cada una tiene su propio punto c!",
    requirement: (functionType: string) => {
      return functionType !== "quadratic"
    },
  },
  {
    id: 4,
    title: "Los Límites de la Torre",
    description: "Estos controles rojos y azules marcan los puntos a y b de nuestro intervalo. Ajusta estos valores para cambiar el tramo de la torre que estudiamos.",
    target: "limits",
    position: { x: 300, y: 400 },
    action: "Ajusta los límites a y b del intervalo",
    fairyMessage: "Los límites definen el tramo de la torre que vamos a analizar. ¡Experimenta con diferentes valores!",
    hint: "📏 Cambia los valores de a y b para ver cómo afecta la pendiente de la secante. ¡Prueba con a=-2, b=2!",
    requirement: (a: number, b: number) => {
      return a !== -2 || b !== 2
    },
  },
  {
    id: 5,
    title: "Estimación del Punto C",
    description: "Ahora intenta estimar dónde está el punto c. Usa el control deslizante para hacer tu estimación y verifica qué tan cerca estás.",
    target: "c-estimator",
    position: { x: 400, y: 250 },
    action: "Estima el valor de c usando el control deslizante",
    fairyMessage: "¡Haz tu mejor estimación! El punto c debe estar entre a y b, donde la pendiente de la tangente es igual a la de la secante.",
    hint: "🎯 El punto c está donde la pendiente de la tangente es igual a la pendiente de la secante. ¡Usa tu intuición matemática!",
    requirement: (c: number) => {
      return c !== null && c !== undefined
    },
  },
  {
    id: 6,
    title: "Ver el Punto C Real",
    description: "Ahora haz clic en el botón para mostrar el punto c real y ver qué tan cerca estuviste de tu estimación.",
    target: "show-real-c",
    position: { x: 400, y: 300 },
    action: "Haz clic en el botón para mostrar el punto c real",
    fairyMessage: "¡Es hora de la verdad! Veamos qué tan precisa fue tu estimación comparada con el valor real del Teorema del Valor Medio.",
    hint: "🔍 El botón te mostrará el punto c exacto donde la pendiente de la tangente es igual a la pendiente de la secante.",
    requirement: (showReal: boolean) => {
      return showReal === true
    },
  },
  {
    id: 7,
    title: "¡Felicidades, Aprendiz!",
    description: "Has completado el tutorial básico. Ahora puedes explorar libremente la Torre del Valor Medio y experimentar con todas las herramientas.",
    target: "completion",
    position: { x: 300, y: 200 },
    fairyMessage: "¡Excelente trabajo! Ahora eres oficialmente mi aprendiz del Teorema del Valor Medio. ¡Ve y experimenta!",
    hint: "🌟 ¡Ahora eres un experto en el Teorema del Valor Medio! En el modo libre puedes: cambiar los límites, probar diferentes funciones, y encontrar el punto c mágico.",
    isObservationOnly: true,
  },
]

export const MVT_TUTORIAL_STEPS_ADVANCED: TutorialStep[] = [
  {
    id: 1,
    title: "¡Bienvenida al Nivel Avanzado!",
    description: "Soy Aria, tu guía mágica. Ahora exploraremos el Teorema del Valor Medio con más profundidad: estimación, precisión y diferentes funciones.",
    target: "fairy",
    position: { x: 50, y: 20 },
    fairyMessage: "¡Excelente! Ahora que dominas lo básico, profundicemos en la magia del Teorema del Valor Medio. ¡Prepárate para experimentar más!",
    hint: "🌟 ¡Nivel avanzado activado! Aquí explorarás la estimación del punto c, análisis de error, y experimentarás con diferentes funciones. ¡Matemáticas de nivel superior!",
    isObservationOnly: true,
  },
  {
    id: 2,
    title: "La Pendiente Mágica",
    description: "Observa cómo la pendiente de la secante (línea roja) debe ser igual a la pendiente de la tangente en el punto c. ¡Es la magia del teorema!",
    target: "canvas",
    position: { x: 400, y: 150 },
    action: "Observa la pendiente de la secante y la tangente",
    fairyMessage: "¡Mira cómo las pendientes deben ser iguales! ¡Es la esencia del Teorema del Valor Medio!",
    hint: "📈 La pendiente de la secante es (f(b)-f(a))/(b-a). En el punto c, la pendiente de la tangente f'(c) debe ser igual a esta pendiente.",
    isObservationOnly: true,
  },
  {
    id: 3,
    title: "Estimación del Punto C",
    description: "Ahora intenta estimar dónde está el punto c. Usa el control deslizante para hacer tu estimación y verifica qué tan cerca estás.",
    target: "c-estimator",
    position: { x: 300, y: 300 },
    action: "Estima el valor de c usando el control deslizante",
    fairyMessage: "¡Haz tu mejor estimación! El punto c debe estar entre a y b, donde la pendiente de la tangente es igual a la de la secante.",
    hint: "🎯 Para una parábola f(x)=x² en [-2,2], el punto c está en x=0. ¡Intenta estimar y verifica tu precisión!",
    requirement: (userEstimateC: number) => {
      return userEstimateC !== null
    },
  },
  {
    id: 4,
    title: "Explora Diferentes Funciones",
    description: "Cambia la función a 'Seno' para ver cómo el Teorema del Valor Medio se adapta a diferentes formas. ¡Cada función tiene su propia magia!",
    target: "function-selector",
    position: { x: 150, y: 100 },
    action: "Selecciona 'Seno' para una función ondulante",
    fairyMessage: "¡La función seno crea una torre ondulante! ¡Observa cómo cambia el punto c con esta nueva forma!",
    hint: "🌊 La función seno oscila entre -1 y 1. ¡Observa cómo el punto c se adapta a esta oscilación!",
    requirement: (functionType: string) => {
      return functionType === "sin"
    },
  },
  {
    id: 5,
    title: "Precisión y Error",
    description: "Observa cómo el error de tu estimación se calcula automáticamente. ¡Intenta conseguir un error menor a 0.2 para desbloquear el logro 'Ojo de Águila'!",
    target: "error-display",
    position: { x: 500, y: 200 },
    action: "Observa el cálculo del error en tiempo real",
    fairyMessage: "¡El error te dice qué tan cerca estás del punto c real! ¡Intenta conseguir un error muy pequeño!",
    hint: "🎯 Error = |c_real - c_estimado|. Un error < 0.2 es excelente, < 0.1 es perfecto. ¡Apunta a la precisión!",
    isObservationOnly: true,
  },
  {
    id: 6,
    title: "Experimenta con Límites",
    description: "Cambia los límites a y b para ver cómo afecta la posición del punto c. ¡Diferentes intervalos dan diferentes puntos c!",
    target: "limits",
    position: { x: 300, y: 400 },
    action: "Cambia los límites a y b del intervalo",
    fairyMessage: "¡Cada intervalo tiene su propio punto c! ¡Experimenta con diferentes valores para ver cómo cambia!",
    hint: "📏 Prueba con a=-3, b=3 o a=-1, b=1. ¡Observa cómo el punto c se mueve con el intervalo!",
    requirement: (a: number, b: number) => {
      return a !== -2 || b !== 2
    },
  },
  {
    id: 7,
    title: "¡Maestro del Teorema del Valor Medio!",
    description: "Has dominado los conceptos avanzados. ¡Ahora eres un verdadero experto en el Teorema del Valor Medio! ¡Explora libremente y descubre más magia matemática!",
    target: "completion",
    position: { x: 300, y: 200 },
    fairyMessage: "¡Increíble! Has dominado el Teorema del Valor Medio avanzado. ¡Eres un verdadero mago de las matemáticas!",
    hint: "🏆 ¡Felicidades! Has completado el tutorial avanzado. Ahora puedes explorar libremente, experimentar con diferentes funciones, y entender la estimación del punto c. ¡Eres un experto!",
    isObservationOnly: true,
  },
]

// Función para obtener los pasos del tutorial según el contexto
export function getTutorialSteps(context: 'riemann' | 'bridge' | 'mvt', level: 'basic' | 'advanced'): TutorialStep[] {
  if (context === 'riemann') {
    return level === 'basic' ? RIEMANN_TUTORIAL_STEPS_BASIC : RIEMANN_TUTORIAL_STEPS_ADVANCED
  } else if (context === 'bridge') {
    return level === 'basic' ? BRIDGE_TUTORIAL_STEPS_BASIC : BRIDGE_TUTORIAL_STEPS_ADVANCED
  } else if (context === 'mvt') {
    return level === 'basic' ? MVT_TUTORIAL_STEPS_BASIC : MVT_TUTORIAL_STEPS_ADVANCED
  }
  return []
}

