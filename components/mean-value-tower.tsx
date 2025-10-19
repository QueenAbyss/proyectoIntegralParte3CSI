"use client"

import React, { useState, useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, BookOpen, Eye, Lightbulb, MousePointer, Hand } from "lucide-react"
import { TheorySection } from "./mean-value-theorem/theory-section"
import { VisualizationSection } from "./mean-value-theorem/visualization-section"
import { ExamplesSection } from "./mean-value-theorem/examples-section"
import { FundamentalTheoremVisualization } from "./mean-value-theorem/second-theorem-visualization"
import { SecondTheoremExamples } from "./mean-value-theorem/second-theorem-examples"
import { TutorialSystem } from "@/components/tutorial-system"
import { getTutorialSteps } from "@/components/tutorial-configs"

// Tipos para los datos de ejemplo
type MVTExampleData = {
  functionType: "quadratic" | "cubic" | "sin" | "custom"
  customFunction: string
  a: number
  b: number
}

type SecondTheoremExampleData = {
  functionType: "linear" | "quadratic" | "cubic" | "sin" | "cos" | "custom"
  customFunction: string
  a: number
  b: number
}


export function MeanValueTower() {
  const [mainTab, setMainTab] = useState("teoria")
  const [subTab, setSubTab] = useState("teoria")
  const [mvtTimerState, setMvtTimerState] = useState({
    startTime: null as number | null,
    elapsedTime: 0,
    isRunning: false,
  })
  
  // Estados compartidos para ejemplos
  const [mvtExampleData, setMvtExampleData] = useState<MVTExampleData | null>(null)
  const [secondTheoremExampleData, setSecondTheoremExampleData] = useState<SecondTheoremExampleData | null>(null)

  // Estados del tutorial
  const [mode, setMode] = useState<"guided" | "free">("free")
  const [tutorialActive, setTutorialActive] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [complexityLevel, setComplexityLevel] = useState<"basic" | "advanced">("basic")
  const [isTransitioningToFree, setIsTransitioningToFree] = useState(false)

  // Tutorial management
  const startTutorial = useCallback(() => {
    console.log("🔄 Iniciando tutorial MVT - Reseteando valores...")
    setTutorialActive(true)
    setTutorialStep(1)
    setMode("guided")
    
    // Reiniciar datos de ejemplo para empezar limpio
    setMvtExampleData({
      functionType: "quadratic",
      customFunction: "",
      a: -2,
      b: 2
    })
    
    console.log("✅ Tutorial MVT iniciado con valores reiniciados")
  }, [])

  const completeTutorial = useCallback(() => {
    setTutorialActive(false)
    setTutorialStep(0)
    setIsTransitioningToFree(true)
    setTimeout(() => {
      setMode("free")
      setIsTransitioningToFree(false)
    }, 2000)
  }, [])

  const handleTutorialStepChange = useCallback((step: number) => {
    setTutorialStep(step)
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20">
      {/* Header Mágico */}
      <div className="relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-16 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-24 left-2/3 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-300"></div>
        </div>

        {/* Contenido del header */}
        <div className="relative z-10 text-center py-8 px-4">
          {/* Icono del castillo */}
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <div className="w-8 h-8 bg-black rounded-sm transform rotate-45"></div>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Torre del Valor Medio
          </h1>
          
          {/* Subtítulo */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bienvenido al reino mágico del cálculo, donde las derivadas e integrales se encuentran en perfecta armonía
          </p>
        </div>
      </div>

      {/* Controles de modo y tutorial */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Indicador de modo */}
          <div className="flex items-center space-x-2">
            {mode === "guided" ? (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                <Hand className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Modo Guiado
                </span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                <MousePointer className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Modo Libre
                </span>
              </div>
            )}
          </div>

          {/* Botones de tutorial */}
          {!tutorialActive && mode === "free" && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => {
                  setComplexityLevel("basic")
                  startTutorial()
                }}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                📚 Tutorial Básico
              </Button>
              <Button
                onClick={() => {
                  setComplexityLevel("advanced")
                  startTutorial()
                }}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                🎓 Tutorial Avanzado
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Navegación principal */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0 shadow-xl">
          <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
            {/* Pestañas principales */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="teoria" 
                  className="flex items-center gap-2 px-6 py-4 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
                >
                  <Sparkles className="w-4 h-4" />
                  Teorema del Valor Medio
                </TabsTrigger>
                <TabsTrigger 
                  value="teorema-fundamental" 
                  className="flex items-center gap-2 px-6 py-4 data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-800"
                >
                  <BookOpen className="w-4 h-4" />
                  2do Teorema Fundamental
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Contenido de las pestañas */}
            <TabsContent value="teoria" className="p-0">
              <div className="p-6">
                {/* Navegación secundaria para MVT */}
                <div className="mb-6">
                  <Tabs value={subTab} onValueChange={setSubTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-50 dark:bg-gray-800">
                      <TabsTrigger value="teoria" className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Teoría
                      </TabsTrigger>
                      <TabsTrigger value="visualizaciones" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Visualizaciones
                      </TabsTrigger>
                      <TabsTrigger value="ejemplos" className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Ejemplos
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Contenido según la pestaña activa */}
                {subTab === "teoria" && <TheorySection />}
                {subTab === "visualizaciones" && (
                  <div className="space-y-4">
                    {/* Controles de nivel en modo guiado */}
                    {mode === "guided" && (
                      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Hand className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              Modo Guiado Activo
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-blue-600 dark:text-blue-400">Nivel:</span>
                            <Button
                              onClick={() => {
                                setComplexityLevel("basic")
                                startTutorial()
                              }}
                              variant={complexityLevel === "basic" ? "default" : "outline"}
                              size="sm"
                              className="text-xs"
                            >
                              🌱 Básico
                            </Button>
                            <Button
                              onClick={() => {
                                setComplexityLevel("advanced")
                                startTutorial()
                              }}
                              variant={complexityLevel === "advanced" ? "default" : "outline"}
                              size="sm"
                              className="text-xs"
                            >
                              🌟 Avanzado
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                    
                  <VisualizationSection 
                    timerState={mvtTimerState}
                    setTimerState={setMvtTimerState}
                      exampleData={mvtExampleData}
                      onExampleLoaded={setMvtExampleData}
                      mode={mode}
                      tutorialActive={tutorialActive}
                      tutorialStep={tutorialStep}
                    />
                    
                    {/* Sistema de Tutorial solo para MVT Visualizaciones */}
                    {tutorialActive && (
                      <>
                        <TutorialSystem
                          steps={getTutorialSteps('mvt', complexityLevel)}
                          currentStep={tutorialStep}
                          onStepChange={handleTutorialStepChange}
                          onComplete={completeTutorial}
                          isVisible={tutorialActive}
                        />
                        
                        {/* CSS específico para MVT - Habilitar elementos según el paso */}
                        <style jsx global>{`
                          /* Paso 3: Habilitar solo botones de función */
                          ${tutorialStep === 3 ? `
                            #function-selector.tutorial-blocked,
                            #function-selector.tutorial-blocked * {
                              opacity: 1 !important;
                              pointer-events: auto !important;
                              filter: none !important;
                              cursor: auto !important;
                            }
                            
                            #function-selector button {
                              opacity: 1 !important;
                              pointer-events: auto !important;
                              filter: none !important;
                              cursor: auto !important;
                            }
                          ` : ''}
                          
                          /* Paso 4: Habilitar y hacer brillar sliders de límites */
                          ${tutorialStep === 4 ? `
                            #limits.tutorial-blocked,
                            #limits.tutorial-blocked * {
                              opacity: 1 !important;
                              pointer-events: auto !important;
                              filter: none !important;
                              cursor: auto !important;
                            }
                            
                            #limits input[type="range"],
                            #limits [data-radix-slider-root],
                            #limits [data-radix-slider-track],
                            #limits [data-radix-slider-thumb] {
                              opacity: 1 !important;
                              pointer-events: auto !important;
                              filter: none !important;
                              cursor: auto !important;
                            }
                            
                            /* Efecto de brillo para sliders en paso 4 */
                            #limits {
                              animation: tutorial-glow 2s ease-in-out infinite alternate !important;
                              box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4) !important;
                              border-radius: 8px !important;
                              padding: 8px !important;
                              background: rgba(34, 197, 94, 0.1) !important;
                            }
                            
                            #limits input[type="range"] {
                              animation: tutorial-slider-glow 1.5s ease-in-out infinite alternate !important;
                              box-shadow: 0 0 15px rgba(34, 197, 94, 0.8) !important;
                            }
                            
                            #limits [data-radix-slider-track] {
                              animation: tutorial-track-glow 1.5s ease-in-out infinite alternate !important;
                              box-shadow: 0 0 10px rgba(34, 197, 94, 0.6) !important;
                            }
                            
                            #limits [data-radix-slider-thumb] {
                              animation: tutorial-thumb-glow 1.5s ease-in-out infinite alternate !important;
                              box-shadow: 0 0 20px rgba(34, 197, 94, 1) !important;
                            }
                            
                            @keyframes tutorial-glow {
                              0% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4); }
                              100% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.6); }
                            }
                            
                            @keyframes tutorial-slider-glow {
                              0% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.8); }
                              100% { box-shadow: 0 0 25px rgba(34, 197, 94, 1); }
                            }
                            
                            @keyframes tutorial-track-glow {
                              0% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.6); }
                              100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8); }
                            }
                            
                            @keyframes tutorial-thumb-glow {
                              0% { box-shadow: 0 0 20px rgba(34, 197, 94, 1); }
                              100% { box-shadow: 0 0 30px rgba(34, 197, 94, 1), 0 0 40px rgba(34, 197, 94, 0.8); }
                            }
                          ` : ''}
                          
                          /* Paso 5: Habilitar estimación de c */
                          ${tutorialStep === 5 ? `
                            #c-estimator.tutorial-blocked,
                            #c-estimator.tutorial-blocked * {
                              opacity: 1 !important;
                              pointer-events: auto !important;
                              filter: none !important;
                              cursor: auto !important;
                            }
                          ` : ''}
                          
                          /* Paso 6: Habilitar botón "Buscar c" */
                          ${tutorialStep === 6 ? `
                            #show-real-c.tutorial-blocked,
                            #show-real-c.tutorial-blocked * {
                              opacity: 1 !important;
                              pointer-events: auto !important;
                              filter: none !important;
                              cursor: auto !important;
                            }
                            
                            /* Botón brillante antes de hacer clic */
                            #show-real-c:not(.clicked) {
                              animation: tutorial-button-glow 2s ease-in-out infinite alternate !important;
                              box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4) !important;
                              background: rgba(34, 197, 94, 0.1) !important;
                            }
                            
                            /* Ocultar botón después de hacer clic */
                            #show-real-c.clicked {
                              opacity: 0.3 !important;
                              pointer-events: none !important;
                              background: transparent !important;
                              border: 2px dashed rgba(34, 197, 94, 0.3) !important;
                              color: rgba(34, 197, 94, 0.5) !important;
                              animation: none !important;
                              box-shadow: none !important;
                            }
                            
                            /* Ocultar completamente el texto del botón después del clic */
                            #show-real-c.clicked * {
                              opacity: 0 !important;
                            }
                            
                            @keyframes tutorial-button-glow {
                              0% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4); }
                              100% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.6); }
                            }
                          ` : ''}
                        `}</style>
                      </>
                    )}
                  </div>
                )}
                {subTab === "ejemplos" && (
                  <ExamplesSection 
                    onLoadExample={(data) => {
                      setMvtExampleData(data)
                      setSubTab("visualizaciones") // Cambiar automáticamente a visualizaciones
                    }}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="teorema-fundamental" className="p-0">
              <div className="p-6">
                {/* Navegación secundaria para Segundo Teorema Fundamental */}
                <div className="mb-6">
                  <Tabs value={subTab} onValueChange={setSubTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-50 dark:bg-gray-800">
                      <TabsTrigger value="teoria" className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Teoría
                      </TabsTrigger>
                      <TabsTrigger value="visualizaciones" className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Visualizaciones
                      </TabsTrigger>
                      <TabsTrigger value="ejemplos" className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Ejemplos
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Contenido según la pestaña activa */}
                {subTab === "teoria" && (
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-200 mb-2">
                        Segundo Teorema Fundamental del Cálculo
                      </h2>
                      <p className="text-lg text-purple-600 dark:text-purple-300">
                        La conexión entre derivadas e integrales
                      </p>
                    </div>

                {/* Enunciado */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Enunciado
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Si <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">f</span> es continua en <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">[a, b]</span> y <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F</span> es una antiderivada de <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">f</span> en <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">[a, b]</span>, entonces:
                    </p>
                    
                    {/* Fórmula principal */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-700">
                      <div className="text-center">
                        <div className="text-2xl font-mono text-blue-800 dark:text-blue-300">
                          ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) - F(a)
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* ¿Qué es una Antiderivada? */}
                <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    ¿Qué es una Antiderivada?
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F(x)</span> es una antiderivada de <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">f(x)</span> si <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F'(x) = f(x)</span>. Es decir, cuando derivas <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F</span>, obtienes <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">f</span>.
                    </p>
                  </div>
                </Card>

                {/* La magia del teorema */}
                <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    La magia del teorema
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-yellow-300 dark:border-yellow-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center font-medium">
                      En lugar de sumar infinitos rectángulos para calcular el área, solo necesitas encontrar <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F(x)</span> y calcular <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F(b) - F(a)</span>.
                    </p>
                  </div>
                </Card>

                {/* Ejemplos de Antiderivadas */}
                <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Ejemplos de Antiderivadas
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Si f(x) = x</p>
                        <div className="font-mono text-lg text-purple-800 dark:text-purple-200">
                          F(x) = x²/2
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Si f(x) = x²</p>
                        <div className="font-mono text-lg text-purple-800 dark:text-purple-200">
                          F(x) = x³/3
                        </div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Si f(x) = sin(x)</p>
                        <div className="font-mono text-lg text-purple-800 dark:text-purple-200">
                          F(x) = -cos(x)
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* ¿Por qué funciona? */}
                <Card className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 border-indigo-200 dark:border-indigo-800">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    ¿Por qué funciona?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    El teorema conecta dos operaciones inversas: derivar e integrar. Si <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F'(x) = f(x)</span>, entonces integrar <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">f</span> te devuelve <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">F</span> (más una constante que se cancela al restar).
                  </p>
                </Card>
                  </div>
                )}

                {/* Sección de Visualizaciones */}
                {subTab === "visualizaciones" && (
                  <FundamentalTheoremVisualization 
                    timerState={mvtTimerState}
                    setTimerState={setMvtTimerState}
                    exampleData={secondTheoremExampleData}
                    onExampleLoaded={setSecondTheoremExampleData}
                  />
                )}

                {/* Sección de Ejemplos */}
                {subTab === "ejemplos" && (
                  <SecondTheoremExamples 
                    onLoadExample={(data) => {
                      setSecondTheoremExampleData(data)
                      setSubTab("visualizaciones") // Cambiar automáticamente a visualizaciones
                    }}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

    </div>
  )
}