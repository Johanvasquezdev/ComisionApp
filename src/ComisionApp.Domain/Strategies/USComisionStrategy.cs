namespace ComisionApp.Domain.Strategies;
using ComisionApp.Domain.Interfaces;

/// <summary>
/// Estrategia de comisión para vendedores en Estados Unidos (15%).
/// </summary>
public class USComisionStrategy : IComisionStrategy
{
    /// <summary>
    /// Aplica una tasa del 15% sobre la base neta (ventas menos descuentos).
    /// </summary>
    public decimal Calcular(decimal ventas, decimal descuentos)
        => (ventas - descuentos) * 0.15m;
}