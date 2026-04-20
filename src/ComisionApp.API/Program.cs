using ComisionApp.Application.UseCases;

var builder = WebApplication.CreateBuilder(args);
var frontendOrigin = Environment.GetEnvironmentVariable("FrontendOrigin")
                     ?? builder.Configuration["FrontendOrigin"]
                     ?? "http://localhost:3000";
// Registrar el caso de uso en el contenedor de DI nativo de ASP.NET Core
builder.Services.AddScoped<CalcularComisionUseCase>();

// Permitir solicitudes desde el frontend Next.js en desarrollo
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(frontendOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Habilitar Swagger solo en entorno de desarrollo para pruebas rápidas
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
