namespace ComisionApp.Application.DTOs;

/// <summary>
/// Datos de entrada enviados por el vendedor para solicitar el cálculo de su comisión.
/// </summary>
public class CalcularComisionRequestDto
{
    /// <summary>Monto total de ventas brutas del período.</summary>
    public decimal Ventas { get; set; }

    /// <summary>Monto total de descuentos aplicados a las ventas.</summary>
    public decimal Descuentos { get; set; }

    /// <summary>Código del país del vendedor (US, India, UK).</summary>
    public string Pais { get; set; } = string.Empty;
}