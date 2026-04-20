"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { animate } from "animejs"

interface CommissionResultProps {
  comision: number
  ventas: number
  descuentos: number
  tasa: number
}

export function CommissionResult({
  comision,
  ventas,
  descuentos,
  tasa,
}: CommissionResultProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const amountRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Animate card entrance
    if (cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.98, 1],
        duration: 800,
        ease: "outExpo",
      })
    }

    // Animate number counting
    if (amountRef.current) {
      const target = { value: 0 }
      const el = amountRef.current
      animate(target, {
        value: comision,
        duration: 1500,
        ease: "outExpo",
        onUpdate: () => {
          el.textContent = `$${target.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
      })
    }
  }, [comision])

  return (
    <Card
      ref={cardRef}
      className="glass border-emerald-500/30 bg-emerald-500/5 opacity-0 overflow-hidden"
    >
      <div className="h-1 w-full bg-emerald-500/50" />
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg font-bold text-emerald-500 tracking-wide uppercase">
          Resultado del Cálculo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-2">
          <span
            ref={amountRef}
            className="text-5xl font-black text-emerald-600 dark:text-emerald-400 drop-shadow-sm"
          >
            $0.00
          </span>
        </div>
        <div className="pt-2 border-t border-emerald-500/10">
          <p className="text-center text-[10px] text-muted-foreground uppercase font-bold tracking-widest leading-relaxed">
            Ecuación: (Ventas {ventas.toFixed(2)} - Desc {descuentos.toFixed(2)}) × Tasa {(tasa * 100).toFixed(0)}%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
