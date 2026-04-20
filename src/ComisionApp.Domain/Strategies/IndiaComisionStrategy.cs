namespace ComisionApp.Domain.Strategies;
using ComisionApp.Domain.Interfaces;

/// <summary>
/// Estrategia de comisión para vendedores en India (10%).
/// </summary>
public class IndiaComisionStrategy : IComisionStrategy
{
    /// <summary>
    /// Aplica una tasa del 10% sobre la base neta (ventas menos descuentos).
    /// </summary>
    public decimal Calcular(decimal ventas, decimal descuentos)
        => (ventas - descuentos) * 0.10m;
}