"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Sparkles, Target } from "lucide-react"

export interface TutorialStep {
  id: number
  title: string
  description: string
  target: string
  position: { x: number; y: number }
  action?: string
  requirement?: (...args: any[]) => boolean
  hint?: string
  fairyMessage?: string
  isObservationOnly?: boolean
}

interface TutorialSystemProps {
  steps: TutorialStep[]
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
  isVisible: boolean
  // ✅ ADAPTADO: Parámetros específicos del primer teorema fundamental
  leftLimit?: number[]
  rightLimit?: number[]
  currentFunction?: string
  isAnimating?: boolean
  currentX?: number
  fValue?: number
  integralValue?: number
  // Parámetros de Riemann (opcionales para compatibilidad)
  partitions?: number[]
  approximationType?: string
}

export function TutorialSystem({
  steps,
  currentStep,
  onStepChange,
  onComplete,
  isVisible,
  // ✅ ADAPTADO: Parámetros específicos del primer teorema fundamental
  leftLimit,
  rightLimit,
  currentFunction,
  isAnimating,
  currentX,
  fValue,
  integralValue,
  // Parámetros de Riemann (opcionales)
  partitions,
  approximationType,
}: TutorialSystemProps) {
  
  const [showHint, setShowHint] = useState(false)
  const [animationClass, setAnimationClass] = useState("")
  const [hasInteracted, setHasInteracted] = useState(false)

  const currentStepData = steps[currentStep - 1]
  
  // 🔍 LOG DE RENDERIZADO REMOVIDO
  const renderKey = `${currentStep}-${isVisible}`
  if (renderKey !== (window as any).lastRenderKey) {
    (window as any).lastRenderKey = renderKey
  }
  const progress = (currentStep / steps.length) * 100

  useEffect(() => {
    if (isVisible && currentStepData) {
      setAnimationClass("animate-bounce")
      const timer = setTimeout(() => setAnimationClass(""), 1000)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isVisible, currentStepData])

  // ✅ CORREGIDO: Reset del estado en cada paso nuevo (como en el backup que funciona)
  useEffect(() => {
    setHasInteracted(false)  // ← Reset normal para todos los pasos
    setShowHint(false)
  }, [currentStep])

  // ✅ ADAPTADO: Detección de interacciones para el primer teorema fundamental
  useEffect(() => {
    if (!isVisible || !currentStepData || currentStepData.isObservationOnly) return

    const checkInteraction = () => {
      // Paso 3: Detectar cambio en límites (primer teorema fundamental)
      if (currentStep === 3 && leftLimit && rightLimit && (leftLimit[0] !== -1.6 || rightLimit[0] !== 4.0)) {
        setHasInteracted(true)
      }
      // Paso 4: Detectar cambio en posición x (primer teorema fundamental)
      else if (currentStep === 4 && currentX && leftLimit && Math.abs(currentX - leftLimit[0]) > 0.1) {
        setHasInteracted(true)
      }
      // Paso 5: Detectar animación (primer teorema fundamental)
      else if (currentStep === 5 && isAnimating) {
        setHasInteracted(true)
      }
      // Compatibilidad con Riemann (si se proporcionan los parámetros)
      else if (currentStep === 4 && partitions && partitions[0] !== 8) {
        setHasInteracted(true)
      }
      else if (currentStep === 5 && leftLimit && rightLimit && (leftLimit[0] !== -2 || rightLimit[0] !== 4)) {
        setHasInteracted(true)
      }
    }

    checkInteraction()
  }, [currentX, leftLimit, rightLimit, isAnimating, partitions, currentStep, isVisible, currentStepData])



  // ===== USEEFFECT DE BLOQUEO COMPLETO (SOLUCIÓN EXACTA) =====
  useEffect(() => {
    if (!isVisible || !currentStepData) {
      return
    }

    // Solo ejecutar una vez por paso para evitar bucle infinito
    const stepKey = `${currentStep}-${isVisible}`
    if ((window as any).lastTutorialStep === stepKey) return
    ;(window as any).lastTutorialStep = stepKey
    
    // Log removido

    // Delay para asegurar renderizado
    const timeoutId = setTimeout(() => {
      // 1. LIMPIAR BLOQUEOS ANTERIORES
      document.querySelectorAll(".tutorial-blocked").forEach((el) => {
        el.classList.remove("tutorial-blocked")
        ;(el as HTMLElement).style.pointerEvents = ""
        ;(el as HTMLElement).style.opacity = ""
        ;(el as HTMLElement).style.filter = ""
        ;(el as HTMLElement).style.cursor = ""
      })

      // 2. IDENTIFICAR ELEMENTO OBJETIVO
      let targetElement: Element | null = null
      switch (currentStepData.target) {
        // ✅ Targets de Riemann
        case "#partitions-slider":
          targetElement = document.querySelector("#partitions-slider")
          break
        case "#limits":
          targetElement = document.querySelector("#limits")
          break
        case "#approximation-type":
          targetElement = document.querySelector("#approximation-type")
          break
        case ".function-curve":
        case "function-curve":
          targetElement = document.querySelector("canvas")
          break
        case ".rectangles":
        case "rectangles":
          targetElement = document.querySelector("canvas")
          break
        // ✅ Targets del Primer Teorema Fundamental
        case "bridge-canvas":
          targetElement = document.querySelector("#bridge-canvas")
          break
        case "limits-controls":
          targetElement = document.querySelector("#limits-controls")
          break
        case "position-control":
          targetElement = document.querySelector("#position-control")
          break
        case "animation-controls":
          targetElement = document.querySelector("#animation-controls")
          break
        case "function-selector":
          targetElement = document.querySelector("#function-selector")
          break
        default:
          if (currentStepData.target !== "fairy" && currentStepData.target !== "completion") {
            targetElement = document.querySelector(currentStepData.target)
          }
      }


      // 3. APLICAR HIGHLIGHT AL OBJETIVO
      if (targetElement) {
        targetElement.classList.add("tutorial-highlight")
        targetElement.classList.add("tutorial-spotlight")
      }

      // 4. BLOQUEAR TODOS LOS ELEMENTOS (SIEMPRE, excepto en pasos especiales)
      // BLOQUEAR SIEMPRE, excepto en pasos de finalización
      if (currentStepData.target !== "completion") {
        const interactiveElements = document.querySelectorAll(
          'button, input, [role="slider"], .draggable-point, .slider-handle, .range-input, .interactive-element, [data-interactive], .function-button, .function-selector, .limit-slider, .partitions-slider, [data-radix-collection-item], [data-radix-slider-thumb], [data-radix-slider-track], select, option, [data-radix-slider-root], [data-radix-slider-range], .slider, .slider-track, .slider-thumb, .slider-range'
        )
        
        interactiveElements.forEach((el) => {
          const isTargetElement = el === targetElement || el.closest(currentStepData.target)
          const isHintButton = el.classList.contains('hint-button')
          const isTutorialCard = el.closest('[data-tutorial-card]')
          const isModeButton = el.textContent?.includes('Básico') || el.textContent?.includes('Avanzado') || 
                              el.textContent?.includes('Guiado') || el.textContent?.includes('Libre')
          
          // ✅ DETECCIÓN ESPECÍFICA PARA SLIDERS DE RADIX UI
          const isSlider = el.closest('[data-radix-slider-root]') || 
                          el.closest('[data-radix-slider-thumb]') || 
                          el.closest('[data-radix-slider-track]') ||
                          el.closest('[data-radix-slider-range]') ||
                          el.closest('.slider') ||
                          el.closest('[role="slider"]')
          
          
          // LÓGICA DE BLOQUEO BASADA EN TIPO DE PASO
          let shouldBlock = false
          
          if (currentStepData.isObservationOnly) {
            // PASOS DE OBSERVACIÓN: Bloquear TODO excepto navegación del tutorial y botones de modo
            shouldBlock = !isHintButton && !isTutorialCard && !isModeButton
          } else {
            // PASOS DE INTERACCIÓN: Bloquear TODO excepto elemento objetivo, navegación y botones de modo
            shouldBlock = !isTargetElement && !isHintButton && !isTutorialCard && !isModeButton
          }
          
        // ✅ BLOQUEO ESPECÍFICO PARA SLIDERS EN PASOS DE OBSERVACIÓN
        if (currentStepData.isObservationOnly) {
          // Bloqueando sliders en paso de observación
          // En pasos de observación, bloquear TODOS los sliders sin excepción
          const allSliders = document.querySelectorAll('[data-radix-slider-root], [data-radix-slider-thumb], [data-radix-slider-track], [data-radix-slider-range], [role="slider"]')
          // Sliders encontrados para bloquear
          
          allSliders.forEach((slider, index) => {
            const htmlSlider = slider as HTMLElement
            htmlSlider.style.pointerEvents = 'none'
            htmlSlider.style.opacity = '0.5'
            htmlSlider.style.cursor = 'not-allowed'
            htmlSlider.classList.add('tutorial-blocked')
            // Bloqueando slider
          })
          
          // Verificar sliders específicos del primer teorema
          const limitsSliders = document.querySelectorAll('#limits-controls [data-radix-slider-root], #limits-controls [data-radix-slider-thumb], #limits-controls [data-radix-slider-track], #limits-controls [data-radix-slider-range]')
          const positionSliders = document.querySelectorAll('#position-control [data-radix-slider-root], #position-control [data-radix-slider-thumb], #position-control [data-radix-slider-track], #position-control [data-radix-slider-range]')
          const animationSliders = document.querySelectorAll('#animation-controls [data-radix-slider-root], #animation-controls [data-radix-slider-thumb], #animation-controls [data-radix-slider-track], #animation-controls [data-radix-slider-range]')
          
          // Sliders específicos encontrados
        }
          
          
          
          if (shouldBlock) {
            // APLICAR BLOQUEO COMPLETO
            el.classList.add("tutorial-blocked")
            ;(el as HTMLElement).style.pointerEvents = "none"
            ;(el as HTMLElement).style.opacity = "0.3"
            ;(el as HTMLElement).style.filter = "grayscale(100%)"
            ;(el as HTMLElement).style.cursor = "not-allowed"
            
          }
        })
        
        // BLOQUEO ESPECÍFICO PARA SLIDERS
        if (currentStepData.isObservationOnly) {
          // En pasos de observación: bloquear TODOS los sliders
          const specificSliders = [
            '#partitions-slider',
            '#limits',
            'input[type="range"]',
            '[data-radix-slider-root]'
          ]
          
          specificSliders.forEach(selector => {
            const elements = document.querySelectorAll(selector)
            elements.forEach(el => {
              if (el && !el.closest('[data-tutorial-card]')) {
                el.classList.add("tutorial-blocked")
                ;(el as HTMLElement).style.pointerEvents = "none"
                ;(el as HTMLElement).style.opacity = "0.3"
                ;(el as HTMLElement).style.filter = "grayscale(100%)"
                ;(el as HTMLElement).style.cursor = "not-allowed"
              }
            })
          })
        } else {
          // En pasos de interacción: bloquear sliders que NO son el objetivo
          if (currentStepData.target === "#partitions-slider") {
            // Solo bloquear sliders de límites
            const limitsContainer = document.querySelector('#limits')
            if (limitsContainer) {
              const limitSliders = limitsContainer.querySelectorAll('input[type="range"], [data-radix-slider-root]')
              limitSliders.forEach(slider => {
                slider.classList.add("tutorial-blocked")
                ;(slider as HTMLElement).style.pointerEvents = "none"
                ;(slider as HTMLElement).style.opacity = "0.3"
                ;(slider as HTMLElement).style.filter = "grayscale(100%)"
                ;(slider as HTMLElement).style.cursor = "not-allowed"
              })
            }
          } else if (currentStepData.target === "#limits") {
            // Solo bloquear slider de particiones
            const partitionsSlider = document.querySelector('#partitions-slider')
            if (partitionsSlider) {
              partitionsSlider.classList.add("tutorial-blocked")
              ;(partitionsSlider as HTMLElement).style.pointerEvents = "none"
              ;(partitionsSlider as HTMLElement).style.opacity = "0.3"
              ;(partitionsSlider as HTMLElement).style.filter = "grayscale(100%)"
              ;(partitionsSlider as HTMLElement).style.cursor = "not-allowed"
            }
          }
          
          // BLOQUEO ADICIONAL: Siempre bloquear controles del jardín excepto en paso 5
          if (currentStep !== 5) {
            const gardenControls = document.querySelector('#limits')
            if (gardenControls) {
              // Bloquear todo el contenedor de límites
              gardenControls.classList.add("tutorial-blocked")
              ;(gardenControls as HTMLElement).style.pointerEvents = "none"
              ;(gardenControls as HTMLElement).style.opacity = "0.3"
              ;(gardenControls as HTMLElement).style.filter = "grayscale(100%)"
              ;(gardenControls as HTMLElement).style.cursor = "not-allowed"
              
              // Bloquear todos los sliders dentro del contenedor
              const allSlidersInLimits = gardenControls.querySelectorAll('input[type="range"], [data-radix-slider-root], [data-radix-slider-track], [data-radix-slider-thumb]')
              allSlidersInLimits.forEach(slider => {
                slider.classList.add("tutorial-blocked")
                ;(slider as HTMLElement).style.pointerEvents = "none"
                ;(slider as HTMLElement).style.opacity = "0.3"
                ;(slider as HTMLElement).style.filter = "grayscale(100%)"
                ;(slider as HTMLElement).style.cursor = "not-allowed"
              })
            }
            
            // BLOQUEO ADICIONAL: Bloquear slider de velocidad en todos los pasos excepto cuando sea necesario
            const speedSlider = document.querySelector('input[type="range"]:not(#partitions-slider)')
            if (speedSlider && !speedSlider.closest('#limits')) {
              speedSlider.classList.add("tutorial-blocked")
              ;(speedSlider as HTMLElement).style.pointerEvents = "none"
              ;(speedSlider as HTMLElement).style.opacity = "0.3"
              ;(speedSlider as HTMLElement).style.filter = "grayscale(100%)"
              ;(speedSlider as HTMLElement).style.cursor = "not-allowed"
            }
          }
        }
        
        // VERIFICAR QUE LOS ESTILOS SE APLICARON
        setTimeout(() => {
          const blockedElements = document.querySelectorAll('.tutorial-blocked')
          // Verificación de elementos bloqueados
          blockedElements.forEach((el, index) => {
            const htmlEl = el as HTMLElement
            // Elemento bloqueado
          })
        }, 200)
        
        // 🔍 VERIFICACIÓN ESPECÍFICA DE SLIDERS DEL PRIMER TEOREMA
        setTimeout(() => {
          // Verificación específica de sliders del primer teorema
          
          const limitsContainer = document.querySelector('#limits-controls')
          const positionContainer = document.querySelector('#position-control')
          const animationContainer = document.querySelector('#animation-controls')
          
          // Estado de contenedores
          
          if (limitsContainer) {
            const limitsSliders = limitsContainer.querySelectorAll('[data-radix-slider-root], [data-radix-slider-thumb], [data-radix-slider-track], [data-radix-slider-range]')
            // Sliders en límites
            limitsSliders.forEach((slider, index) => {
              const htmlSlider = slider as HTMLElement
              // Slider en límites
            })
          }
        }, 300)
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [currentStep, isVisible])

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.querySelectorAll(".tutorial-highlight").forEach((el) => {
        el.classList.remove("tutorial-highlight", "tutorial-spotlight")
      })
      document.querySelectorAll(".tutorial-blocked").forEach((el) => {
        el.classList.remove("tutorial-blocked")
        ;(el as HTMLElement).style.pointerEvents = ""
        ;(el as HTMLElement).style.opacity = ""
        ;(el as HTMLElement).style.filter = ""
        ;(el as HTMLElement).style.cursor = ""
      })
    }
  }, [])

  const nextStep = () => {
    if (!canProceed()) {
      return
    }
    
    if (currentStep < steps.length) {
      onStepChange(currentStep + 1)
      setShowHint(false)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1)
      setShowHint(false)
    }
  }

  // ✅ CORREGIDO: Función canProceed() simplificada (como en el backup que funciona)
  const canProceed = () => {
    // Si es un paso de solo observación, siempre puede continuar
    if (currentStepData?.isObservationOnly) {
      return true
    }

    // Si tiene un requirement personalizado, ejecuta la función directamente
    if (currentStepData?.requirement) {
      return currentStepData.requirement(partitions, leftLimit, rightLimit, currentFunction, approximationType)
    }

    // Si no tiene requirements, puede continuar
    return true
  }

  if (!isVisible || !currentStepData) return null

  return (
    <>
      {/* Estilos CSS para elementos bloqueados */}
      <style jsx>{`
        .tutorial-blocked {
          opacity: 0.5 !important;
          pointer-events: none !important;
          cursor: not-allowed !important;
          filter: grayscale(50%) !important;
        }
        .tutorial-highlight {
          position: relative;
          z-index: 50;
        }
        .tutorial-spotlight {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.8) !important;
          border: 2px solid #ffd700 !important;
        }
      `}</style>
      
      {/* Tutorial Overlay - ✅ CORREGIDO: Overlay simple como en el backup que funciona */}
      <div 
        className="fixed inset-0 bg-black/10 z-40" 
        style={{ 
          pointerEvents: "none" // Permitir que todos los clics pasen a través
        }}
      />

      {/* Tutorial Card - Fixed positioning */}
      <div
        className={`fixed z-50 ${animationClass}`}
        style={{
          left: 20,
          top: 20,
          maxWidth: "380px",
          pointerEvents: "auto",
          zIndex: 9999,
        }}
        data-tutorial-card
      >
        <Card className="w-full p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-2xl max-h-[80vh] overflow-y-auto">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-yellow-700">
                Paso {currentStep} de {steps.length}
              </span>
              <span className="text-xs text-yellow-700">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-yellow-100" />
          </div>

          {/* Fairy Avatar */}
          <div className="flex items-start gap-3 mb-3">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-yellow-800 mb-1 text-sm">{currentStepData.title}</h3>
              <p className="text-yellow-700 text-xs leading-relaxed">{currentStepData.description}</p>
            </div>
          </div>

          {/* Fairy Message */}
          {currentStepData.fairyMessage && (
            <div className="mb-3 p-2 bg-purple-100 rounded-lg border border-purple-200">
              <p className="text-purple-700 text-xs italic">"{currentStepData.fairyMessage}"</p>
            </div>
          )}

          {/* Action Required */}
          {currentStepData.action && (
            <div className="mb-3 p-2 bg-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-blue-700 text-xs font-medium">
                  {currentStepData.isObservationOnly ? "Observa:" : "Acción requerida:"}
                </span>
              </div>
              <p className="text-blue-600 text-xs mt-1">{currentStepData.action}</p>
              {currentStepData.isObservationOnly && (
                <p className="text-blue-500 text-xs mt-1 italic">
                  👀 Solo observa el área iluminada, luego presiona "Siguiente"
                </p>
              )}
              {!currentStepData.isObservationOnly && hasInteracted && (
                <p className="text-green-600 text-xs mt-1 font-medium">✅ ¡Perfecto! Ahora puedes continuar</p>
              )}
            </div>
          )}

          {/* Hint - ✅ CORREGIDO: Botón de pista siempre habilitado (como en el backup que funciona) */}
          <div className="mb-3">
            <Button
              onClick={() => {
                setShowHint(!showHint)
              }}
              size="sm"
              variant="outline"
              className="flex items-center gap-1 h-8 text-xs"
            >
              {showHint ? "Ocultar pista" : "💡 Necesito una pista"}
            </Button>
            {showHint && currentStepData.hint && (
              <div className="mt-2 p-2 bg-green-100 rounded-lg border border-green-200">
                <p className="text-green-700 text-xs leading-relaxed">{currentStepData.hint}</p>
              </div>
            )}
            {showHint && !currentStepData.hint && (
              <div className="mt-2 p-2 bg-yellow-100 rounded-lg border border-yellow-200">
                <p className="text-yellow-700 text-xs leading-relaxed">
                  💡 No hay pista específica para este paso, pero puedes experimentar libremente con los controles.
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-transparent h-8 text-xs"
            >
              <ChevronLeft className="w-3 h-3" />
              Anterior
            </Button>

            <Button
              onClick={nextStep}
              disabled={!canProceed()}  // ← CONDICIÓN PRINCIPAL: deshabilitado si canProceed() es false
              size="sm"
              style={{ pointerEvents: canProceed() ? "auto" : "none" }}  // ← Bloquea clicks si está deshabilitado
              className={`flex items-center gap-1 h-8 text-xs ${
                canProceed()
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"  // ← ESTILO HABILITADO
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"  // ← ESTILO DESHABILITADO
              }`}
            >
              {currentStep === steps.length ? "¡Completar!" : "Siguiente"}
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>

        </Card>
      </div>

      {/* ✅ CORREGIDO: Eliminar botón separado y overlays complejos */}
      {/* Ya no necesitamos el botón separado ni overlays complicados */}

      <style jsx global>{`
        .tutorial-blocked {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
          filter: grayscale(100%) !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          position: relative !important;
          z-index: 1 !important;
        }
        
        /* BLOQUEO AGRESIVO PARA TODOS LOS ELEMENTOS INTERACTIVOS */
        .tutorial-blocked * {
          pointer-events: none !important;
        }
        
        /* BLOQUEO ESPECÍFICO PARA SLIDERS DE RADIX UI */
        .tutorial-blocked[data-radix-slider-root],
        .tutorial-blocked[data-radix-slider-track],
        .tutorial-blocked[data-radix-slider-thumb],
        .tutorial-blocked input[type="range"] {
          pointer-events: none !important;
          opacity: 0.3 !important;
          filter: grayscale(100%) !important;
          cursor: not-allowed !important;
        }
        
        /* BLOQUEO DE TODOS LOS ELEMENTOS DENTRO DE SLIDERS BLOQUEADOS */
        .tutorial-blocked[data-radix-slider-root] *,
        .tutorial-blocked[data-radix-slider-track] *,
        .tutorial-blocked[data-radix-slider-thumb] * {
          pointer-events: none !important;
        }

        .tutorial-highlight {
          position: relative !important;
          z-index: 45 !important;
          box-shadow: 0 0 0 4px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.6) !important;
          border-radius: 12px !important;
          animation: tutorial-glow 2s ease-in-out infinite alternate !important;
        }

        .tutorial-spotlight {
          background: radial-gradient(circle, rgba(255,255,0,0.15) 0%, rgba(255,255,0,0.05) 50%, transparent 70%) !important;
        }

        @keyframes tutorial-glow {
          from {
            box-shadow: 0 0 0 4px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.6);
          }
          to {
            box-shadow: 0 0 0 4px rgba(255, 255, 0, 1), 0 0 40px rgba(255, 255, 0, 0.8);
          }
        }
      `}</style>
    </>
  )
}
