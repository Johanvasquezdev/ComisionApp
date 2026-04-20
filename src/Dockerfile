FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar todos los proyectos
COPY src/ComissionApp.Domain/ ./ComissionApp.Domain/
COPY src/ComissionApp.Application/ ./ComissionApp.Application/
COPY src/ComissionApp.API/ ./ComissionApp.API/

# Publicar desde el proyecto API
WORKDIR /src/ComissionApp.API
RUN dotnet publish "ComisionApp.Api.csproj" -c Release -o /app/out

FROM base AS final
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "ComisionApp.Api.dll"]