FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar archivos de proyecto para restaurar dependencias
COPY ComisionApp.Domain/ComisionApp.Domain.csproj ./ComisionApp.Domain/
COPY ComisionApp.Application/ComisionApp.Application.csproj ./ComisionApp.Application/
COPY ComisionApp.API/ComisionApp.Api.csproj ./ComisionApp.API/

RUN dotnet restore "ComisionApp.API/ComisionApp.Api.csproj"

# Copiar el resto de los archivos y publicar
COPY ComisionApp.Domain/ ./ComisionApp.Domain/
COPY ComisionApp.Application/ ./ComisionApp.Application/
COPY ComisionApp.API/ ./ComisionApp.API/

WORKDIR /src/ComisionApp.API
RUN dotnet publish "ComisionApp.Api.csproj" -c Release -o /app/out

FROM base AS final
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "ComisionApp.Api.dll"]