namespace ComisionApp.Domain.Interfaces;

/// <summary>
/// Contrato que deben implementar todas las estrategias de cálculo de comisión.
/// </summary>
public interface IComisionStrategy
{
    /// <summary>
    /// Calcula la comisión neta a partir de ventas brutas y descuentos aplicados.
    /// </summary>
    decimal Calcular(decimal ventas, decimal descuentos);
}