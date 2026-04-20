using ComisionApp.Application.DTOs;
using ComisionApp.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

namespace ComisionApp.API.Controllers;

/// <summary>
/// Controlador que expone el endpoint de cálculo de comisiones al cliente HTTP.
/// </summary>
[ApiController]
[Route("api/comision")]
public class ComisionController : ControllerBase
{
    private readonly CalcularComisionUseCase _useCase;

    /// <summary>
    /// Inicializa el controlador inyectando el caso de uso de comisiones.
    /// </summary>
    public ComisionController(CalcularComisionUseCase useCase)
    {
        _useCase = useCase;
    }

    /// <summary>
    /// Recibe los datos del vendedor, delega el cálculo al caso de uso y devuelve la comisión resultante.
    /// </summary>
    [HttpPost("calcular")]
    public IActionResult Calcular([FromBody] CalcularComisionRequestDto request)
    {
        try
        {
            // Delegar toda la lógica al caso de uso; el controlador no realiza cálculos
            CalcularComisionResponseDto resultado = _useCase.Ejecutar(request);
            return Ok(resultado);
        }
        catch (ArgumentException ex)
        {
            // Retornar 400 si los datos de entrada son inválidos según las reglas de negocio
            return BadRequest(new { error = ex.Message });
        }
    }
}