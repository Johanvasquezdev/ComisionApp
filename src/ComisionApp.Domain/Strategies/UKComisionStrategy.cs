namespace ComisionApp.Domain.Strategies;
using ComisionApp.Domain.Interfaces;

/// <summary>
/// Estrategia de comisión para vendedores en el Reino Unido (12%).
/// </summary>
public class UKComisionStrategy : IComisionStrategy
{
    /// <summary>
    /// Aplica una tasa del 12% sobre la base neta (ventas menos descuentos).
    /// </summary>
    public decimal Calcular(decimal ventas, decimal descuentos)
        => (ventas - descuentos) * 0.12m;
}