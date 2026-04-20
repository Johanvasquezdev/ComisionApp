export interface ComisionRequest {
  ventas: number
  descuentos: number
  pais: string
}

export interface ComisionResponse {
  comision: number
}

export interface ComisionError {
  error: string
}

export async function calcularComision(
  data: ComisionRequest
): Promise<ComisionResponse> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
  const res = await fetch(`${apiBase}/api/comision/calcular`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = (await res.json()) as ComisionError
    throw new Error(errorData.error || "Error al calcular la comisión")
  }

  return res.json()
}
