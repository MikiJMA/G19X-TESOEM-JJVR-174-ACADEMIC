# Instalación local — NexoCredit

El código activo está en `nexocredit/`; `.github/` y `NexoCredit.code-workspace` se conservan en la raíz del repositorio. Los PDF y las capturas que se generen para entregar se guardan fuera del código fuente.

## 1. Preparar el equipo

Instalar y abrir Docker Desktop. La primera construcción requiere Internet, imágenes y dependencias; la copia no es un instalador offline. Los puertos locales 8080, 8000 y 55433 deben estar libres. No desactivar TLS o autenticación para resolver descargas.

Esta entrega usa el proyecto Compose `nexocredit-demo` y su volumen `nexocredit-demo_datos_postgresql`. No migra ni reutiliza datos de una instalación anterior con otro nombre. No copiar su `.env`, borrar volúmenes ni iniciar dos copias sobre los mismos puertos. Una segunda copia con el mismo nombre Compose tampoco es independiente.

## 2. Construir, activar el modo local y crear una cuenta

Abrir PowerShell en `nexocredit/` y ejecutar por separado:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion local
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion usuario
```

El lanzador crea un `.env` privado con contraseñas aleatorias y construye la aplicación. No reemplazarlo por `.env.example`. El último paso pide usuario, nombre y contraseña oculta: no existe una cuenta predeterminada. Abrir [http://localhost:8080/](http://localhost:8080/) y entrar con la cuenta recién creada.

### Alternativa sin PowerShell: Docker Compose directo

Desde `nexocredit/`, crea el archivo privado `infraestructura/contenedores_docker/.env` a partir de `.env.example`. Antes de iniciarlo, sustituye `REEMPLAZAR` por valores aleatorios distintos en `POSTGRES_ADMIN_PASSWORD` y `POSTGRES_APP_PASSWORD`, y asigna un secreto aleatorio de al menos 64 caracteres hexadecimales a `LOCAL_AUTH_SECRET`. Para modo local, establece `LOCAL_AUTH_ENABLED=true`, `EXPLICACIONES_PROVEEDOR=local`, `DOCUMENTOS_PROVEEDOR=local`, `ML_PROVEEDOR=local` y `VALORACION_IA_PROVEEDOR=deshabilitado` si no tienes Ollama.

```text
docker compose --project-name nexocredit-local --project-directory infraestructura/contenedores_docker --env-file infraestructura/contenedores_docker/.env -f infraestructura/contenedores_docker/docker-compose.yml up -d --build --wait --wait-timeout 180
docker compose --project-name nexocredit-local --project-directory infraestructura/contenedores_docker --env-file infraestructura/contenedores_docker/.env -f infraestructura/contenedores_docker/docker-compose.yml exec backend python scripts/crear_usuario_local.py --usuario tu_usuario --nombre "Tu nombre"
```

El segundo comando solicita la contraseña de forma oculta. Para detener esta instalación sin borrar sus datos, sustituye `up -d --build --wait --wait-timeout 180` por `down`; no uses `down -v`. En una segunda instalación usa otro `--project-name` y cambia `WEB_PORT`, `API_PORT` y `POSTGRES_PORT` en su archivo privado para no ocupar los puertos de la primera.

El modo local selecciona documentos locales, scikit-learn y Ollama, sin consumir Azure. Ollama debe estar activo y tener el modelo configurado (`llama3.1:8b` por defecto); descargarlo necesita Internet, memoria y espacio adicionales. El código no descarga modelos al extraerse.

## 3. Si no hay un modelo Ollama disponible

Editar **sólo** `EXPLICACIONES_PROVEEDOR=local` y `VALORACION_IA_PROVEEDOR=deshabilitado` en `nexocredit/infraestructura/contenedores_docker/.env`. Conservar `DOCUMENTOS_PROVEEDOR=local`, `ML_PROVEEDOR=local` y todas las demás variables. La valoración generativa se desactiva sin simular una respuesta; el modelo mexicano continúa disponible. Luego, desde `nexocredit/`, ejecutar de nuevo:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
```

La explicación por plantilla está marcada **NO IA generativa**; el modelo predictivo numérico incluido sigue siendo un modelo entrenado. El resultado de reglas y la segunda opinión académica no se mezclan ni se convierten en una aprobación crediticia. No se convierten variables MXN a NTD.

## 4. Operación y configuración adicional

- Detener conservando los datos: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 detener`. No utilizar `down -v` ni borrar el volumen como parte del arranque.
- [Recorrido breve con datos ficticios](README.md#recorrido-para-el-revisor--4-pasos).
- [Manual de operación](nexocredit/docs/manuales/OPERACION.md), [proveedores locales y llaves](nexocredit/docs/manuales/ACCESO_LOCAL_Y_PROVEEDORES.md) y [tecnologías](nexocredit/REQUISITOS_TECNOLOGICOS.md).
- Azure OpenAI/ML/Search y Entra conservan sus adaptadores y campos vacíos en las plantillas. Requieren recursos, suscripción, configuración y credenciales vigentes; el recorrido local no comprueba esos servicios.
- Banxico/Banco Mundial necesitan Internet; no proporcionan historial Buró. La consulta SAT es manual y la revisión RFC/CURP local no certifica identidad.
- Power BI requiere Desktop y una nueva conexión de lectura limitada. Sólo se entregan definiciones PBIP/TMDL, no PBIX/ABF, cachés o credenciales.

Esta copia no incluye cuentas, secretos, bases, respaldos, dependencias instaladas, datasets UCI ni modelos Ollama. Las evidencias históricas y el SHA de un manifiesto no acreditan una ejecución nueva. No se certifican capacitación, horas, Scrum o aceptación por publicar archivos. [Alcance y condiciones de entrega](nexocredit/docs/entrega/ENTREGA_DEMO.md).

## Verificación

Las mismas pruebas que ejecuta [`.github/workflows/ci.yml`](.github/workflows/ci.yml). Desde `nexocredit/`, con el entorno virtual activado y PostgreSQL disponible:

```powershell
# Backend — 247 pruebas esperadas (API, PostgreSQL, integraciones, validación)
python -m unittest discover -s backend/tests -v

# Frontend — 168 pruebas esperadas (componentes, servicios, contratos)
cd frontend
npm test

# Lint y compilación
npm run lint
npm run build
```

La suite aislada completa (PostgreSQL temporal propio, sin tocar datos de trabajo) se ejecuta con `operacion/pruebas/Probar programacion.cmd`.
