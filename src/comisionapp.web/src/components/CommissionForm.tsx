"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { CommissionResult } from "@/components/ui/CommissionResult"
import { calcularComision } from "@/lib/api"
import { animate } from "animejs"

interface FormErrors {
  ventas?: string
  descuentos?: string
  pais?: string
}

export function CommissionForm() {
  const [ventas, setVentas] = useState("")
  const [descuentos, setDescuentos] = useState("")
  const [pais, setPais] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    comision: number
    ventas: number
    descuentos: number
    tasa: number
  } | null>(null)

  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formRef.current) {
      animate(formRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        ease: "outExpo",
      })
    }
  }, [])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    const ventasNum = parseFloat(ventas) || 0
    const descuentosNum = parseFloat(descuentos) || 0

    if (!ventas || ventasNum < 0) {
      newErrors.ventas = "Las ventas no pueden ser negativas"
    }
    if (descuentosNum < 0) {
      newErrors.descuentos = "Los descuentos no pueden ser negativos"
    }
    if (descuentosNum > ventasNum) {
      newErrors.descuentos = "Los descuentos no pueden superar las ventas"
    }
    if (!pais) {
      newErrors.pais = "Selecciona un país"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError(null)
    setResult(null)

    if (!validate()) {
      if (formRef.current) {
        animate(formRef.current, {
          translateX: [-10, 10, -10, 10, 0],
          duration: 400,
          ease: "inOutSine",
        })
      }
      return
    }

    setLoading(true)

    try {
      const ventasNum = parseFloat(ventas)
      const descuentosNum = parseFloat(descuentos) || 0
      
      const data = await calcularComision({
        ventas: ventasNum,
        descuentos: descuentosNum,
        pais,
      })

      // Get tasa for display
      const tasas: Record<string, number> = { "US": 0.15, "India": 0.10, "UK": 0.12 };

      setResult({
        comision: data.comision,
        ventas: ventasNum,
        descuentos: descuentosNum,
        tasa: tasas[pais] || 0,
      })
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card ref={formRef} className="glass opacity-0 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <CardHeader>
          <CardTitle className="text-center text-3xl shiny-text tracking-tight">ComisionApp</CardTitle>
          <p className="text-center text-muted-foreground text-sm font-medium">
            Calculadora de Comisiones de Ventas
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ventas" className="text-foreground/80">Ventas Totales</Label>
              <Input
                id="ventas"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={ventas}
                onChange={(e) => setVentas(e.target.value)}
                className={`bg-background/50 border-border/50 focus:ring-2 focus:ring-primary/20 ${errors.ventas ? "border-destructive" : ""}`}
              />
              {errors.ventas && (
                <p className="text-xs text-destructive font-medium animate-pulse">{errors.ventas}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="descuentos" className="text-foreground/80">Descuentos</Label>
              <Input
                id="descuentos"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={descuentos}
                onChange={(e) => setDescuentos(e.target.value)}
                className={`bg-background/50 border-border/50 focus:ring-2 focus:ring-primary/20 ${errors.descuentos ? "border-destructive" : ""}`}
              />
              {errors.descuentos && (
                <p className="text-xs text-destructive font-medium animate-pulse">{errors.descuentos}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pais" className="text-foreground/80">País</Label>
              <Select value={pais} onValueChange={setPais}>
                <SelectTrigger
                  id="pais"
                  className={`bg-background/50 border-border/50 focus:ring-2 focus:ring-primary/20 ${errors.pais ? "border-destructive" : ""}`}
                >
                  <SelectValue placeholder="Selecciona un país" />
                </SelectTrigger>
                <SelectContent className="glass">
                  <SelectItem value="US">Estados Unidos (15%)</SelectItem>
                  <SelectItem value="India">India (10%)</SelectItem>
                  <SelectItem value="UK">Reino Unido (12%)</SelectItem>
                </SelectContent>
              </Select>
              {errors.pais && (
                <p className="text-xs text-destructive font-medium animate-pulse">{errors.pais}</p>
              )}
            </div>

            {apiError && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 animate-in slide-in-from-top-2">
                <AlertDescription className="text-xs font-semibold">{apiError}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 h-11 text-base font-bold" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="w-4 h-4" />
                  <span>Calculando...</span>
                </div>
              ) : (
                "Calcular Comisión"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <CommissionResult
          comision={result.comision}
          ventas={result.ventas}
          descuentos={result.descuentos}
          tasa={result.tasa}
        />
      )}
    </div>
  )
}
