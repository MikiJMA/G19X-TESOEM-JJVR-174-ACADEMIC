# NexoCredit · G19X-TESOEM-JJVR-174-ACADEMIC

[![Validación NexoCredit](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml/badge.svg)](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml)

Sistema académico de análisis de riesgo crediticio: React, FastAPI, PostgreSQL, reglas explicables, un modelo scikit-learn y revisión humana. La aplicación es local; GitHub aloja su código, no una demo web. Utiliza datos ficticios: no consulta Buró, no certifica identidad y no autoriza créditos reales.

## Instalar y abrir sin Azure

Requisitos: Windows, PowerShell, Docker Desktop iniciado e Internet para la primera construcción. Desde la carpeta `nexocredit/`, ejecutar cada comando por separado:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion local
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion usuario
```

El último comando crea una cuenta propia con contraseña oculta; no hay usuario ni contraseña predeterminados. Abrir [localhost:8080](http://localhost:8080/) e iniciar sesión. Compose usa `nexocredit-demo`: la copia no reutiliza automáticamente el volumen de desarrollo. Si otra aplicación ocupa 8080, 8000 o 55433, detenerla antes; no borrar sus datos.

El modo local activa el modelo numérico incluido, los documentos locales y Ollama (`llama3.1:8b`, debe estar instalado). Sin Ollama, seleccionar `EXPLICACIONES_PROVEEDOR=local` en el archivo privado y reconstruir el backend: es una explicación por plantilla, **no IA generativa**. [Guía de instalación y configuración](LEEME_PRIMERO.md).

## Recorrido para el revisor — 4 pasos

1. En **Evaluación**, usar RFC ficticio `AAAA010101AA1`, ingresos `30000`, gastos `10000`, deuda `0`, pagos `0` y atraso `0`. No activar la revisión opcional CURP para este ejemplo.
2. Evaluar con score `200`: se espera margen `$20,000` y riesgo **Alto**. Repetir con `600` → **Medio** y `900` → **Bajo**. El margen puede elevar el riesgo; estas categorías son reglas de demostración, no probabilidades.
3. Dentro del resultado, desplegar **Capturar las 19 variables UCI del escenario ficticio**, pulsar **Cargar ejemplo UCI ficticio** y después **Consultar segunda opinión**. Se espera una respuesta académica del modelo local, con proveedor/modelo, clase y advertencias; el riesgo por reglas se conserva. Las 19 variables UCI/NTD son independientes: no se convierten los importes MXN ni se valida una solicitud mexicana. [Modelo y alcance](nexocredit/docs/manuales/LABORATORIO_IA_LOCAL.md).
4. Abrir **Historial**, comprobar los escenarios guardados y entrar a un detalle para registrar una revisión ficticia. **Dashboard** resume los registros; **Documentos** consulta las guías locales. Nada de este recorrido requiere Azure; las explicaciones generativas sí requieren el servicio Ollama local disponible.

## Documentación esencial

| Documento | Contenido |
|---|---|
| [PRD](nexocredit/docs/producto/PRD_NEXOCREDIT.md) · [MVP/MoSCoW](nexocredit/docs/producto/MVP_NEXOCREDIT.md) | Requisitos, alcance y prioridades |
| [Arquitectura y datos](nexocredit/docs/desarrollo/ARQUITECTURA_Y_DATOS.md) | Componentes, API y persistencia |
| [Operación](nexocredit/docs/manuales/OPERACION.md) · [Soporte](nexocredit/docs/manuales/MANTENIMIENTO_Y_SOPORTE.md) | Uso, respaldo y mantenimiento |
| [QA](nexocredit/docs/calidad/QA.md) · [Evidencias fechadas](nexocredit/docs/evidencias/README.md) | Pruebas, resultados y límites |
| [Estado de tecnologías](nexocredit/REQUISITOS_TECNOLOGICOS.md) · [Índice ampliado](nexocredit/docs/README.md) | Integraciones y documentación complementaria |

Python, FastAPI, React, PostgreSQL, Docker, Power BI, GitHub Actions, Azure OpenAI, Azure Machine Learning, Azure AI Search, Microsoft Entra ID, APIs financieras y Scrum permanecen en el alcance. Las integraciones Azure/Entra conservan adaptadores, campos de keys y evidencias históricas; usarlas requiere configuración, recursos y suscripción vigentes. Las alternativas locales no certifican conectividad cloud ni sustituyen las tecnologías obligatorias. [Configuración Azure conservada](nexocredit/docs/manuales/AZURE_IMPLEMENTADO_Y_CONFIGURACION.md).

## Procedencia e historial de desarrollo

Este repositorio académico empezó como una **copia depurada con historial independiente** el 14/10/2026. Sus primeros commits no representan todo el proceso anterior. El repositorio de desarrollo original es [MikiJMA/EmpresaPluri](https://github.com/MikiJMA/EmpresaPluri); su acceso, si fuera necesario para revisar el historial, está sujeto a autorización del propietario. No se ha concedido acceso ni publicado su base de datos o configuración privada. A partir de esta entrega se registran mejoras mediante commits pequeños con mensajes descriptivos; las evidencias anteriores conservan sus fechas.

## Uso de IA

Se utilizó **Codex** como apoyo para implementar y depurar código, preparar pruebas automatizadas, organizar archivos y redactar documentación. Esta asistencia no equivale a validación humana, aceptación del asesor, autoría de datos de entrenamiento o ejecución de ceremonias Scrum. Los resultados comprobados se distinguen de las propuestas y los pendientes en QA y evidencias.

Las llaves van únicamente en archivos privados del servidor. No compartir `.env`, contraseñas, bases, respaldos ni capturas privadas. Los artefactos PDF/capturas generados para la entrega no forman parte del código fuente. [Límites completos de la demo](nexocredit/docs/entrega/ENTREGA_DEMO.md).
