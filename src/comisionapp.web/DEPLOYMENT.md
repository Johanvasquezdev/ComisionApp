# Guía de Despliegue - ComissionApp

Esta guía detalla los pasos necesarios para desplegar la aplicación completa (Frontend y Backend).

## 1. Backend (.NET API)

El backend es una API construida con .NET 8. Puede desplegarse en **Azure App Service**, **AWS Elastic Beanstalk**, o en cualquier servidor que soporte Docker.

### Pasos para preparar el despliegue:

1. **Publicar el API**:
   Ejecuta el siguiente comando en la carpeta `src/ComissionApp.API`:
   ```bash
   dotnet publish -c Release -o ./publish
   ```
2. **Configuración de CORS**:
   Asegúrate de que la URL final del frontend esté permitida en `Program.cs`.
3. **Variables de Entorno**:
   - `ASPNETCORE_ENVIRONMENT`: `Production`

## 2. Frontend (Next.js)

El frontend está construido con Next.js y puede desplegarse fácilmente en **Vercel** (recomendado), **Netlify**, o un VPS con Node.js.

### Pasos para desplegar en Vercel:

1. Sube tu código a un repositorio de GitHub.
2. Conecta el repositorio en el panel de Vercel.
3. **Configura las Variables de Entorno**:
   - `NEXT_PUBLIC_API_URL`: La URL pública de tu API de .NET (ej: `https://tu-api.azurewebsites.net`).
4. Haz clic en **Deploy**.

### Pasos para despliegue manual (VPS):

1. Instala Node.js (v18+).
2. Clona el repositorio y ve a `src/comisionapp.web`.
3. Crea un archivo `.env.production`:
   ```env
   NEXT_PUBLIC_API_URL=https://tu-api.com
   ```
4. Ejecuta:
   ```bash
   npm install
   npm run build
   npm start
   ```

## 3. Consideraciones de Red

- El Frontend llama al Backend desde el navegador del cliente.
- Ambos servicios deben tener certificados SSL útiles (`https`).
- Si el API está detrás de un firewall, asegúrate de abrir el puerto correspondiente (usualmente 443).

## 4. Troubleshooting

- **CORS Error**: Verifica que el API permite el origen del Frontend.
- **Mixed Content**: Asegúrate de que tanto el API como el Web usen `https`.
