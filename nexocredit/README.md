# NexoCredit — Sistema Inteligente de Análisis de Riesgo Crediticio

NexoCredit es un sistema local de análisis de escenarios de riesgo crediticio. Integra React, FastAPI, PostgreSQL, Docker, una comparación por reglas y un modelo experimental ENIF mostrado como segunda opinión, además de historial, revisión humana, pagos ficticios e indicadores financieros.

El código se organiza en `nexocredit/`. Empezar por el [README de la raíz](../README.md), con operación, recorrido de cuatro pasos, procedencia y declaración de uso de IA. El historial detallado de cambios se encuentra en [BITACORA.md](docs/BITACORA.md).

Accesos de Windows: [operacion](operacion/README.md). Documentación: [índice](docs/README.md), [PRD](docs/producto/PRD_NEXOCREDIT.md) y [MVP](docs/producto/MVP_NEXOCREDIT.md). Para una vista limpia en VS Code, abrir [NexoCredit.code-workspace](../NexoCredit.code-workspace) desde la raíz exterior.

## Tecnologías obligatorias

Python, FastAPI, React.js, Azure OpenAI Service, Azure Machine Learning, Azure AI Search, PostgreSQL, Power BI, Docker, GitHub Actions, Microsoft Entra ID, APIs financieras y Scrum. Consultar [función, ubicación y estado de cada tecnología](REQUISITOS_TECNOLOGICOS.md). Para el historial fechado de incrementos y cambios, consultar [BITACORA.md](docs/BITACORA.md).

## Arranque con Docker

Con Docker Desktop abierto, ejecutar desde la carpeta interior:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
```

Abrir [http://localhost:8080/](http://localhost:8080/) e iniciar sesión con una cuenta Microsoft autorizada, o con una cuenta local si está habilitada y creada. Ver [creación de cuenta local](docs/manuales/ACCESO_LOCAL_Y_PROVEEDORES.md#crear-la-primera-cuenta-local). Incluye frontend, backend, PostgreSQL y migraciones automáticas en un volumen persistente. Para abrir sin reconstruir: `.\scripts\docker.ps1 abrir`. Para detener conservando datos: `.\scripts\docker.ps1 detener`. Consultar [operación de Docker](infraestructura/contenedores_docker/README.md).

## Ejecución local en Windows (sin Docker)

Para desarrollo local, preparar PostgreSQL una sola vez (escucha en 127.0.0.1:55432, datos en `.local/postgresql/datos`):

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\postgresql-local.ps1 preparar
```

Iniciar backend (http://127.0.0.1:8000, docs en `/docs`) e interfaz (http://127.0.0.1:5173) en terminales separadas:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\iniciar-backend.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\iniciar-frontend.ps1
```

O manualmente: instalar `backend/requirements.txt` en un `.venv` y ejecutar `uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000`; en frontend ejecutar `npm ci` y `npm run dev -- --host 127.0.0.1`.

## Verificación

Las mismas pruebas que ejecuta [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). La suite completa aislada se ejecuta con `operacion/pruebas/Probar programacion.cmd`: PostgreSQL temporal sin datos de trabajo y limpieza protegida de su propio contenedor.

```powershell
# Backend — 247 pruebas esperadas (API, PostgreSQL, integraciones, validación)
python -m unittest discover -s backend/tests -v

# Frontend — 168 pruebas esperadas
cd frontend
npm test

# Lint y compilación
npm run lint
npm run build
```

`operacion/respaldos/Respaldar PostgreSQL.cmd` y `operacion/respaldos/Probar restauracion PostgreSQL.cmd` permiten el respaldo manual privado y un ensayo aislado; el ensayo de doce tablas pasó el 15/10/2026.

## Entregables

Empezar por [ENTREGA_DEMO.md](docs/entrega/ENTREGA_DEMO.md): alcance comprobado, evidencias, guion de revisión y pendientes. Consultar [plan](docs/planificacion/PLAN_PROYECTO.md), [manual](docs/manuales/OPERACION.md), [QA](docs/calidad/QA.md), [índice de evidencias](docs/evidencias/README.md), [BITACORA.md](docs/BITACORA.md) y [backlog de cierre](gestion_proyecto/scrum/BACKLOG_CIERRE.md).

## Organización de carpetas

```text
nexocredit/                                Raíz del proyecto (carpeta interior)
├── backend/                                Python + FastAPI
│   ├── app/
│   │   ├── main.py                         Entrada de la API
│   │   ├── rutas_api/                      Endpoints HTTP protegidos
│   │   ├── validacion_datos/               Validación de solicitudes y esquemas Pydantic
│   │   ├── evaluacion_crediticia/          Reglas de riesgo actuales (v2)
│   │   ├── seguimiento_crediticio/         Planes, cuotas, pagos y auditoría
│   │   ├── persistencia_postgresql/        Guardado, historial y migraciones
│   │   ├── autenticacion_entra_id/         Identidad Entra y acceso delegado
│   │   ├── autenticacion_local/            Acceso local por usuario y contraseña
│   │   └── integraciones/                 Adaptadores Azure, locales y financieros
│   │       ├── explicaciones_azure_openai/ Explicación automática post-evaluación
│   │       ├── prediccion_azure_ml/        Cliente remoto de inferencia Azure ML
│   │       ├── prediccion_local/           Inferencia UCI numérica local (scikit-learn)
│   │       ├── prediccion_mexico/          Inferencia local ENIF 2024 conectada al flujo principal
│   │       ├── busqueda_azure_ai_search/   Búsqueda documental en Azure
│   │       ├── proveedores_locales/        Ollama y búsqueda documental local
│   │       └── datos_financieros/          Indicadores Banxico y Banco Mundial
│   └── tests/                             Pruebas automatizadas backend (247 pruebas)
├── frontend/                              React.js + Vite
│   └── src/
│       ├── autenticacion/                 MSAL y login local
│       ├── evaluacion_crediticia/         Formulario, modelo mexicano y resultado
│       ├── seguimiento_crediticio/        Planes, pagos y eventos
│       ├── dashboard/                     Métricas agregadas y filtros
│       ├── datos_financieros/             Panel de indicadores macroeconómicos
│       ├── azure_ml/                      Laboratorio de predicción UCI
│       ├── azure_openai/                  Visualización de explicaciones IA
│       ├── azure_search/                  Búsqueda y visualización de guías
│       ├── interfaz/                      Componentes comunes, navegación y diseño
│       └── styles/                        Estilos compartidos y modo oscuro
├── inteligencia_artificial/
│   ├── prediccion_azure_ml/                Candidato UCI evaluado en Azure ML
│   ├── prediccion_local/                   Baseline scikit-learn UCI reproducible
│   └── prediccion_mexico/                  Modelo ENIF 2024: código, entrenamiento y métricas
├── analitica/reportes_power_bi/            Dashboard Power BI local verificado (11 visuales)
├── infraestructura/contenedores_docker/    Dockerfiles, Compose, Nginx y base persistente
├── gestion_proyecto/scrum/                Backlog de cierre; sprints aún por acreditar
├── docs/                                  Índice de documentación
│   ├── BITACORA.md                        Historial fechado de incrementos y cambios
│   ├── producto/                          PRD y MVP separados
│   ├── planificacion/                     Plan del proyecto
│   ├── manuales/                          Operación, soporte y reglas de riesgo
│   ├── calidad/                           QA y reportes de pruebas
│   ├── entrega/                           Guion y alcance de entrega
│   ├── desarrollo/                        Arquitectura, datos y CI
│   ├── evidencias/                        Registros fechados de comprobaciones
│   ├── estadia/                           Información académica
│   └── archivo/                           Originales conservados
├── operacion/                             Accesos .cmd para Windows
│   ├── aplicacion/                        Abrir, actualizar y detener
│   ├── integraciones/                     Conexiones Azure/Banxico y carga documental
│   ├── pruebas/                           Suite aislada
│   └── respaldos/                         Respaldo y ensayo de restauración
├── scripts/                               Implementación Python/PowerShell y pruebas
└── REQUISITOS_TECNOLOGICOS.md              Tecnologías obligatorias y estado
```

El workflow está en `.github/workflows/ci.yml` de la raíz Git exterior. Ver el [mapa del espacio de trabajo](../README.md).
