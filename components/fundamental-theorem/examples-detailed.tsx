"use client"

import React from "react"
import { Card } from "@/components/ui/card"

export function FundamentalTheoremExamplesDetailed() {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-purple-800 mb-4">
          📚 Ejemplos Prácticos del Teorema Fundamental
        </h3>
        <p className="text-lg text-purple-600">
          Aprende paso a paso con ejemplos fáciles de entender
        </p>
      </div>

      <div className="space-y-8">
        {/* Ejemplo 1: Función Lineal */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <div>
              <h4 className="text-xl font-bold text-blue-800 mb-2">Ejemplo 1: Función Lineal Simple</h4>
              <p className="text-blue-600">La función más fácil para empezar</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2">🎯 ¿Qué vamos a hacer?</h5>
              <p className="text-gray-700">
                Vamos a verificar que si <strong>f(x) = 2x</strong>, entonces cuando integramos desde 0 hasta x, 
                obtenemos <strong>F(x) = x²</strong>, y la derivada de F(x) es exactamente f(x).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-2">📊 Paso 1: La función original</h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700 mb-2">f(x) = 2x</div>
                  <p className="text-sm text-green-600">Esta es nuestra función de partida</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-2">📈 Paso 2: La integral</h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700 mb-2">F(x) = ∫₀ˣ 2t dt = x²</div>
                  <p className="text-sm text-purple-600">El área bajo la curva desde 0 hasta x</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h5 className="font-semibold text-yellow-800 mb-2">✨ Paso 3: ¡La magia del teorema!</h5>
              <div className="text-center space-y-2">
                <div className="text-xl font-bold text-yellow-700">
                  F'(x) = d/dx(x²) = 2x = f(x)
                </div>
                <p className="text-yellow-600">
                  ¡La derivada de la integral es exactamente la función original!
                </p>
              </div>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h5 className="font-semibold text-pink-800 mb-2">🧚‍♀️ ¿Qué significa esto en palabras simples?</h5>
              <p className="text-gray-700">
                Imagina que estás construyendo un puente. <strong>f(x) = 2x</strong> te dice qué tan alto debe ser 
                el puente en cada punto. <strong>F(x) = x²</strong> te dice cuánta madera has usado hasta ese punto. 
                ¡Y resulta que la velocidad a la que usas madera (F') es exactamente igual a la altura del puente (f)!
              </p>
            </div>
          </div>
        </Card>

        {/* Ejemplo 2: Función Cuadrática */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <div>
              <h4 className="text-xl font-bold text-green-800 mb-2">Ejemplo 2: Función Cuadrática</h4>
              <p className="text-green-600">Una curva más interesante</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-800 mb-2">🎯 ¿Qué vamos a hacer?</h5>
              <p className="text-gray-700">
                Ahora vamos con <strong>f(x) = 3x²</strong>. Vamos a integrar desde 0 hasta x y ver que 
                obtenemos <strong>F(x) = x³</strong>, y que F'(x) = f(x).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2">📊 La función original</h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700 mb-2">f(x) = 3x²</div>
                  <p className="text-sm text-blue-600">Una parábola que crece cada vez más rápido</p>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-2">📈 La integral</h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700 mb-2">F(x) = ∫₀ˣ 3t² dt = x³</div>
                  <p className="text-sm text-purple-600">El área bajo la parábola</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h5 className="font-semibold text-orange-800 mb-2">✨ ¡Verificación del teorema!</h5>
              <div className="text-center space-y-2">
                <div className="text-xl font-bold text-orange-700">
                  F'(x) = d/dx(x³) = 3x² = f(x)
                </div>
                <p className="text-orange-600">
                  ¡Perfecto! El teorema funciona también con funciones cuadráticas
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Ejemplo 3: Función Trigonométrica */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <div>
              <h4 className="text-xl font-bold text-purple-800 mb-2">Ejemplo 3: Función Seno</h4>
              <p className="text-purple-600">Una onda que sube y baja</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-purple-800 mb-2">🎯 ¿Qué vamos a hacer?</h5>
              <p className="text-gray-700">
                Ahora con <strong>f(x) = cos(x)</strong>. Vamos a integrar desde 0 hasta x y ver que 
                obtenemos <strong>F(x) = sin(x)</strong>, y que F'(x) = f(x).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
                <h5 className="font-semibold text-cyan-800 mb-2">📊 La función original</h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-700 mb-2">f(x) = cos(x)</div>
                  <p className="text-sm text-cyan-600">Una onda que oscila entre -1 y 1</p>
                </div>
              </div>

              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                <h5 className="font-semibold text-rose-800 mb-2">📈 La integral</h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-700 mb-2">F(x) = ∫₀ˣ cos(t) dt = sin(x)</div>
                  <p className="text-sm text-rose-600">El área bajo la onda coseno</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h5 className="font-semibold text-indigo-800 mb-2">✨ ¡Verificación del teorema!</h5>
              <div className="text-center space-y-2">
                <div className="text-xl font-bold text-indigo-700">
                  F'(x) = d/dx(sin(x)) = cos(x) = f(x)
                </div>
                <p className="text-indigo-600">
                  ¡Increíble! El teorema funciona incluso con funciones trigonométricas
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Resumen y Consejos */}
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
          <h4 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
            🌟 Resumen: ¿Qué hemos aprendido?
          </h4>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <h5 className="font-semibold text-yellow-800 mb-2">🎯 El patrón que vimos:</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>f(x) = 2x</strong> → <strong>F(x) = x²</strong> → <strong>F'(x) = 2x = f(x)</strong></li>
                <li>• <strong>f(x) = 3x²</strong> → <strong>F(x) = x³</strong> → <strong>F'(x) = 3x² = f(x)</strong></li>
                <li>• <strong>f(x) = cos(x)</strong> → <strong>F(x) = sin(x)</strong> → <strong>F'(x) = cos(x) = f(x)</strong></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-yellow-200">
              <h5 className="font-semibold text-yellow-800 mb-2">💡 Consejos para entender mejor:</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Integrar</strong> es como <strong>acumular área</strong> bajo una curva</li>
                <li>• <strong>Derivar</strong> es como <strong>medir la pendiente</strong> en un punto</li>
                <li>• El teorema dice que <strong>la pendiente del área acumulada = altura de la curva</strong></li>
                <li>• ¡Es como si el área "recordara" de dónde vino!</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2">🧚‍♀️ Analogía del Puente Mágico:</h5>
              <p className="text-gray-700">
                Imagina que estás construyendo un puente. La función <strong>f(x)</strong> te dice qué tan alto 
                debe ser el puente en cada punto. La integral <strong>F(x)</strong> te dice cuánta madera has 
                usado hasta ese punto. ¡Y resulta que la velocidad a la que usas madera (F') es exactamente 
                igual a la altura del puente (f)! Es como si el puente "recordara" su altura en cada paso.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}


