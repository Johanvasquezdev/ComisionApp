namespace ComisionApp.Application.DTOs;

/// <summary>
/// Resultado devuelto al vendedor con el monto de comisión calculado.
/// </summary>
public class CalcularComisionResponseDto
{
    /// <summary>Monto de comisión calculado según las reglas del país.</summary>
    public decimal Comision { get; set; }
}