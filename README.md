# 💼 ComisionApp — Calculadora de Comisiones de Ventas

Aplicación web fullstack para calcular comisiones de ventas por país, construida con **Next.js** en el frontend y **.NET 8 Web API** en el backend, siguiendo los principios de **Clean Architecture**.

---
<img width="683" height="991" alt="image" src="https://github.com/user-attachments/assets/e1357a75-2f20-4cc0-928f-d8e2dc9d0a1e" />


## 📋 Tabla de contenidos

- [Descripción general](#descripción-general)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Reglas de negocio](#reglas-de-negocio)
- [Referencia del API](#referencia-del-api)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Principios de diseño](#principios-de-diseño)
- [Equipo](#equipo)

---

## Descripción general

ComisionApp permite a los vendedores calcular rápidamente su comisión mensual en función de sus ventas totales, los descuentos aplicados y el país en el que operan. El objetivo es ofrecer una herramienta clara y confiable que promueva la transparencia en el cálculo de comisiones.

**Funcionalidades principales:**

- Cálculo de comisión para EE.UU. (15%), India (10%) y Reino Unido (12%)
- Validación de datos de entrada en el backend
- API REST en JSON consumida por el frontend web
- Arquitectura extensible por país sin modificar la lógica existente

---

## Arquitectura

El sistema sigue una **Clean Architecture de 3 capas** en el backend, con un frontend Next.js desacoplado que se comunica mediante REST:

```
┌─────────────────────────────────────┐
│         Frontend Next.js            │
│    (React + TypeScript + shadcn)    │
└──────────────────┬──────────────────┘
                   │ HTTP / REST
                   ▼
┌─────────────────────────────────────┐
│       Capa API — .NET 8             │
│        ComisionController           │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│       Capa de Aplicación            │
│  CalcularComisionUseCase + DTOs     │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│         Capa de Dominio             │
│  IComisionStrategy + Estrategias    │
│       (US / India / UK)             │
└─────────────────────────────────────┘
```

La capa de datos en este sistema está representada por los DTOs de entrada que transportan los datos del usuario hacia la lógica de negocio. No se requiere persistencia porque la calculadora es una operación sin estado — no hay nada que guardar entre cálculos.

### Responsabilidades por capa

| Capa           | Responsabilidad                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Dominio**    | Lógica de negocio pura — interfaz de estrategia e implementaciones por país. Sin dependencias externas.           |
| **Aplicación** | Orquestación — valida los datos, selecciona la estrategia correcta y retorna el resultado mediante DTOs.          |
| **API**        | Superficie HTTP — recibe solicitudes, llama al caso de uso, maneja errores y retorna JSON. Sin lógica de negocio. |
| **Frontend**   | Interfaz de usuario — captura los datos del vendedor, llama al API y muestra el resultado de la comisión.         |

### Regla de dependencia

Las dependencias apuntan **hacia adentro únicamente**: API → Aplicación → Dominio. El dominio no conoce nada del mundo exterior.

---

## Tecnologías

### Backend

| Tecnología   | Versión | Propósito                         |
| ------------ | ------- | --------------------------------- |
| .NET         | 8.0     | Runtime y framework Web API       |
| ASP.NET Core | 8.0     | Controladores HTTP y enrutamiento |
| Swashbuckle  | 6.5     | Documentación Swagger / OpenAPI   |
| C#           | 12      | Lenguaje de programación          |

### Frontend

| Tecnología   | Versión | Propósito                             |
| ------------ | ------- | ------------------------------------- |
| Next.js      | 14      | Framework React con App Router        |
| TypeScript   | 5.x     | JavaScript tipado                     |
| shadcn/ui    | latest  | Librería de componentes UI accesibles |
| Tailwind CSS | 3.x     | Estilos utilitarios                   |

---

## Estructura del proyecto

```
ComisionApp/
│
├── src/
│   │
│   ├── ComissionApp.Domain/
│   │   └── Strategies/
│   │       ├── IComisionStrategy.cs        # Contrato de estrategia
│   │       ├── USComisionStrategy.cs       # Tasa 15%
│   │       ├── IndiaComisionStrategy.cs    # Tasa 10%
│   │       └── UKComisionStrategy.cs       # Tasa 12%
│   │
│   ├── ComissionApp.Application/
│   │   ├── DTOs/
│   │   │   ├── CalcularComisionRequestDto.cs
│   │   │   └── CalcularComisionResponseDto.cs
│   │   └── UseCases/
│   │       └── CalcularComisionUseCase.cs  # Validación + selección de estrategia
│   │
│   └── ComissionApp.API/
│       ├── Controllers/
│       │   └── ComisionController.cs       # POST /api/comision/calcular
│       └── Program.cs                      # Registro de DI + middleware
│
├── commisionapp.web/                               # Aplicación Next.js
│   ├── app/
│   │   └── page.tsx                        # Página principal de la calculadora
│   ├── components/
│   │   └── ComissionForm.tsx               # Formulario de cálculo
│   └── lib/
│       └── api.ts                          # Cliente HTTP tipado
│
└── README.md
```

---

## Reglas de negocio

La comisión se calcula sobre la **base neta de ventas** (ventas totales menos descuentos):

```
Comisión = (Ventas Totales − Descuentos) × Tasa del País
```

| País                | Tasa | Ejemplo (Ventas: $5,000 / Descuentos: $500) |
| ------------------- | ---- | ------------------------------------------- |
| US (Estados Unidos) | 15%  | ($5,000 − $500) × 0.15 = **$675.00**        |
| India               | 10%  | ($5,000 − $500) × 0.10 = **$450.00**        |
| UK (Reino Unido)    | 12%  | ($5,000 − $500) × 0.12 = **$540.00**        |

### Validaciones aplicadas

- `ventas` debe ser mayor o igual a 0
- `descuentos` debe ser mayor o igual a 0
- `descuentos` no puede superar a `ventas`
- `pais` debe ser uno de: `US`, `India`, `UK` (sin distinción de mayúsculas)

---

## Referencia del API

### `POST /api/comision/calcular`

Calcula la comisión de un vendedor según sus datos de ventas.

**Cuerpo de la solicitud:**

```json
{
  "ventas": 5000,
  "descuentos": 500,
  "pais": "US"
}
```

**Respuesta exitosa — 200 OK:**

```json
{
  "comision": 675.0
}
```

**Error de validación — 400 Bad Request:**

```json
{
  "error": "Los descuentos no pueden superar las ventas totales."
}
```

> La documentación interactiva **Swagger UI** está disponible en `/swagger` cuando el proyecto corre en modo Development.

---

## Cómo ejecutar el proyecto

### Requisitos previos

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) con npm
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-org/ComisionApp.git
cd ComisionApp
```

### 2. Ejecutar el API de .NET

```bash
cd src/ComissionApp.API
dotnet run
```

El API estará disponible en `https://localhost:5001` (o el puerto que indique la consola).  
Swagger UI: `https://localhost:5001/swagger`

### 3. Ejecutar el frontend Next.js

```bash
cd src/comisionapp.web
npm install
npm run dev
```

La aplicación web estará disponible en `http://localhost:3000`.

> **Nota:** Crea un archivo `.env.local` dentro de `/src/comisionapp.web` con la URL del API:
>
> ```
> NEXT_PUBLIC_API_URL=https://localhost:5001
> ```

---

## Principios de diseño

### SOLID

- **S — Responsabilidad Única:** Cada clase tiene un único trabajo. `ComisionController` solo maneja HTTP. `CalcularComisionUseCase` solo orquesta. Cada estrategia solo calcula.
- **O — Abierto/Cerrado:** Agregar un nuevo país significa agregar una nueva clase de estrategia — no se modifica código existente.
- **D — Inversión de Dependencias:** El caso de uso depende de la abstracción `IComisionStrategy`, no de implementaciones concretas.

### KISS — Mantenlo Simple

Sin factories ni abstracciones innecesarias. La expresión `switch` en el caso de uso es directa, legible y suficiente para 3 países.

### DRY — No te Repitas

La fórmula `(ventas - descuentos) × tasa` vive una sola vez en cada estrategia. La lógica de validación vive una sola vez en el caso de uso.

### YAGNI — No lo Necesitas Todavía

Sin base de datos, sin repositorios, sin caché, sin middleware extra — porque el problema no lo requiere.

### Clean Architecture

- La capa **Dominio** no tiene dependencias externas de ningún tipo.
- La capa **Aplicación** solo depende del Dominio.
- La capa **API** solo depende de la Aplicación.
- El **Frontend** está completamente desacoplado — solo conoce el contrato del API.

---

## Equipo

Johan Gabriel Vasquez Camacho 2025-1235

**Asignatura:** Programación II — ITLA  
**Profesor:** Francis Ramirez
