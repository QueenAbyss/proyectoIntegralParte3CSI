"use client"

import React, { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowLeftRight } from "lucide-react"

interface ReverseLimitsDemoProps {
  onBack: () => void
}

// Funciones matemáticas
const functions = {
  x: { name: "x", fn: (x: number) => x, integral: (a: number, b: number) => (b * b - a * a) / 2 },
  "x²": { name: "x²", fn: (x: number) => x * x, integral: (a: number, b: number) => (b * b * b - a * a * a) / 3 },
  "x³": { name: "x³", fn: (x: number) => x * x * x, integral: (a: number, b: number) => (b * b * b * b - a * a * a * a) / 4 },
  "sin(x)": { name: "sin(x)", fn: (x: number) => Math.sin(x), integral: (a: number, b: number) => -Math.cos(b) + Math.cos(a) },
  "cos(x)": { name: "cos(x)", fn: (x: number) => Math.cos(x), integral: (a: number, b: number) => Math.sin(b) - Math.sin(a) }
}

type FunctionKey = keyof typeof functions

export function ReverseLimitsDemo({ onBack }: ReverseLimitsDemoProps) {
  const [functionType, setFunctionType] = useState<FunctionKey>("x²")
  const [limitA, setLimitA] = useState(1)
  const [limitB, setLimitB] = useState(3)

  const isValidLimits = limitA !== limitB

  const calculations = useMemo(() => {
    if (!isValidLimits) return { integralAB: 0, integralBA: 0, isEqual: false }

    const integralAB = functions[functionType].integral(limitA, limitB)
    const integralBA = functions[functionType].integral(limitB, limitA)
    const isEqual = Math.abs(integralAB + integralBA) < 0.001

    return { integralAB, integralBA, isEqual }
  }, [functionType, limitA, limitB, isValidLimits])

  const swapLimits = () => {
    const temp = limitA
    setLimitA(limitB)
    setLimitB(temp)
  }

  // Generar puntos para la gráfica SVG
  const generateGraphData = () => {
    if (!isValidLimits) return []
    
    const points = 100
    const minX = Math.min(limitA, limitB) - 1
    const maxX = Math.max(limitA, limitB) + 1
    const step = (maxX - minX) / points
    const data = []
    
    for (let i = 0; i <= points; i++) {
      const x = minX + i * step
      const y = functions[functionType].fn(x)
      data.push({ x, y })
    }
    
    return data
  }

  const graphData = generateGraphData()
  const minY = Math.min(...graphData.map(d => d.y))
  const maxY = Math.max(...graphData.map(d => d.y))
  const yRange = maxY - minY
  const padding = 40
  const width = 400
  const height = 300

  const scaleX = (x: number) => padding + ((x - Math.min(limitA, limitB) + 1) / (Math.max(limitA, limitB) - Math.min(limitA, limitB) + 2)) * (width - 2 * padding)
  const scaleY = (y: number) => height - padding - ((y - minY) / yRange) * (height - 2 * padding)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Jardín
          </Button>
          
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            🔄 Inversión de Límites
          </h1>
          <p className="text-purple-600">
            Explora cómo invertir los límites de integración cambia el signo de la integral
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de controles */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-lg font-bold text-purple-800 mb-4">
                ⚙️ Configuración
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Función
                </label>
                <select
                  value={functionType}
                  onChange={(e) => setFunctionType(e.target.value as FunctionKey)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                >
                    {Object.entries(functions).map(([key, func]) => (
                    <option key={key} value={key}>
                        {func.name}
                    </option>
                  ))}
                </select>
            </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Límite A
                </label>
                <input
                  type="number"
                  value={limitA}
                    onChange={(e) => setLimitA(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    min="-5"
                    max="5"
                  step={0.1}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Límite B
                </label>
                <input
                  type="number"
                  value={limitB}
                    onChange={(e) => setLimitB(parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
                    min="-5"
                    max="5"
                  step={0.1}
                />
              </div>
              
              <Button
                onClick={swapLimits}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center gap-2"
              >
                  <ArrowLeftRight className="w-4 h-4" />
                  Intercambiar Límites
              </Button>
            </div>
          </Card>
        </div>

          {/* Visualización */}
        <div className="lg:col-span-2">
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h3 className="text-lg font-bold text-purple-800 mb-4">
                📊 Visualización de la Propiedad
            </h3>
            
            {isValidLimits ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gráfica normal */}
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2 text-center">
                      ∫[{limitA}, {limitB}] f(x)dx
                    </h4>
                    <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                      <svg width={width} height={height} className="mx-auto">
                        {/* Ejes */}
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#374151" strokeWidth="2"/>
                        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#374151" strokeWidth="2"/>
                        
                        {/* Función */}
                        <path
                          d={`M ${graphData.map((d, i) => `${scaleX(d.x)},${scaleY(d.y)}`).join(' L ')}`}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                      
                      {/* Área bajo la curva */}
                        <path
                          d={`M ${scaleX(limitA)},${height - padding} L ${graphData.filter(d => d.x >= Math.min(limitA, limitB) && d.x <= Math.max(limitA, limitB)).map(d => `${scaleX(d.x)},${scaleY(d.y)}`).join(' L ')} L ${scaleX(limitB)},${height - padding} Z`}
                        fill="#3b82f6"
                          fillOpacity="0.3"
                        />
                        
                        {/* Límites */}
                        <line x1={scaleX(limitA)} y1={padding} x2={scaleX(limitA)} y2={height - padding} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
                        <line x1={scaleX(limitB)} y1={padding} x2={scaleX(limitB)} y2={height - padding} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5"/>
                        
                        {/* Etiquetas */}
                        <text x={scaleX(limitA)} y={height - padding + 20} textAnchor="middle" className="text-xs fill-red-600">
                          {limitA}
                        </text>
                        <text x={scaleX(limitB)} y={height - padding + 20} textAnchor="middle" className="text-xs fill-red-600">
                          {limitB}
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-blue-600">
                        Valor: {calculations.integralAB.toFixed(4)}
                      </div>
                </div>
                  </div>

                  {/* Gráfica invertida */}
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2 text-center">
                      ∫[{limitB}, {limitA}] f(x)dx
                    </h4>
                    <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
                      <svg width={width} height={height} className="mx-auto">
                        {/* Ejes */}
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#374151" strokeWidth="2"/>
                        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#374151" strokeWidth="2"/>
                        
                        {/* Función */}
                        <path
                          d={`M ${graphData.map((d, i) => `${scaleX(d.x)},${scaleY(d.y)}`).join(' L ')}`}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2"
                        />
                        
                        {/* Área bajo la curva (invertida) */}
                        <path
                          d={`M ${scaleX(limitB)},${height - padding} L ${graphData.filter(d => d.x >= Math.min(limitA, limitB) && d.x <= Math.max(limitA, limitB)).map(d => `${scaleX(d.x)},${scaleY(d.y)}`).join(' L ')} L ${scaleX(limitA)},${height - padding} Z`}
                        fill="#ef4444"
                          fillOpacity="0.3"
                        />
                        
                        {/* Límites */}
                        <line x1={scaleX(limitB)} y1={padding} x2={scaleX(limitB)} y2={height - padding} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>
                        <line x1={scaleX(limitA)} y1={padding} x2={scaleX(limitA)} y2={height - padding} stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5"/>
                        
                        {/* Etiquetas */}
                        <text x={scaleX(limitB)} y={height - padding + 20} textAnchor="middle" className="text-xs fill-blue-600">
                          {limitB}
                        </text>
                        <text x={scaleX(limitA)} y={height - padding + 20} textAnchor="middle" className="text-xs fill-blue-600">
                          {limitA}
                        </text>
                      </svg>
                      <div className="text-center mt-2 text-sm text-red-600">
                        Valor: {calculations.integralBA.toFixed(4)}
                      </div>
                    </div>
                </div>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                <p>⚠️ Ajusta los límites para ver la visualización</p>
              </div>
            )}

              {/* Resultados numéricos */}
              {isValidLimits && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-2">Integral Normal</h4>
                    <div className="text-2xl font-bold text-blue-600">
                      {calculations.integralAB.toFixed(4)}
              </div>
                    <div className="text-sm text-blue-500">
                      ∫[{limitA}, {limitB}] f(x)dx
              </div>
            </Card>

                  <Card className="p-4 bg-red-50 border-red-200">
                    <h4 className="font-bold text-red-800 mb-2">Integral Invertida</h4>
                    <div className="text-2xl font-bold text-red-600">
                      {calculations.integralBA.toFixed(4)}
                </div>
                    <div className="text-sm text-red-500">
                      ∫[{limitB}, {limitA}] f(x)dx
              </div>
            </Card>

                  <Card className={`p-4 border-2 ${calculations.isEqual ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <h4 className={`font-bold mb-2 ${calculations.isEqual ? 'text-green-800' : 'text-yellow-800'}`}>
                      {calculations.isEqual ? '✅ Verificación' : '⚠️ Verificación'}
              </h4>
                    <div className={`text-2xl font-bold ${calculations.isEqual ? 'text-green-600' : 'text-yellow-600'}`}>
                      {(calculations.integralAB + calculations.integralBA).toFixed(4)}
                </div>
                    <div className={`text-sm ${calculations.isEqual ? 'text-green-500' : 'text-yellow-500'}`}>
                      {calculations.isEqual ? '¡Correcto!' : 'Casi correcto'}
                </div>
                  </Card>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
