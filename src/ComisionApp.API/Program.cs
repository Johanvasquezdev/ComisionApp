using ComisionApp.Application.UseCases;

var builder = WebApplication.CreateBuilder(args);

// Registrar el caso de uso en el contenedor de DI nativo de ASP.NET Core
builder.Services.AddScoped<CalcularComisionUseCase>();

// Permitir cualquier origen en producción
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");
app.UseHttpsRedirection();
app.MapControllers();
app.Run();