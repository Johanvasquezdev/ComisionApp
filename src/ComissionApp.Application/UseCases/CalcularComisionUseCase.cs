using ComisionApp.Application.DTOs;
using ComisionApp.Domain.Interfaces;
using ComisionApp.Domain.Strategies;

namespace ComisionApp.Application.UseCases;

/// <summary>
/// Caso de uso principal: valida la solicitud, selecciona la estrategia del país y calcula la comisión.
/// </summary>
public class CalcularComisionUseCase
{
    /// <summary>
    /// Ejecuta el cálculo de comisión aplicando las reglas de negocio del país indicado.
    /// Lanza excepciones de argumento si los datos de entrada son inválidos.
    /// </summary>
    public CalcularComisionResponseDto Ejecutar(CalcularComisionRequestDto request)
    {
        // Validar que los montos sean valores no negativos y coherentes entre sí
        if (request.Ventas < 0)
            throw new ArgumentException("Las ventas no pueden ser negativas.");

        if (request.Descuentos < 0)
            throw new ArgumentException("Los descuentos no pueden ser negativos.");

        if (request.Descuentos > request.Ventas)
            throw new ArgumentException("Los descuentos no pueden superar las ventas totales.");

        // Seleccionar la estrategia de comisión según el país del vendedor
        IComisionStrategy estrategia = request.Pais.Trim().ToUpper() switch
        {
            "US"    => new USComisionStrategy(),
            "INDIA" => new IndiaComisionStrategy(),
            "UK"    => new UKComisionStrategy(),
            _       => throw new ArgumentException($"País '{request.Pais}' no soportado. Use: US, India, UK.")
        };

        // Calcular y retornar la comisión resultante
        decimal comision = estrategia.Calcular(request.Ventas, request.Descuentos);

        return new CalcularComisionResponseDto { Comision = comision };
    }
}