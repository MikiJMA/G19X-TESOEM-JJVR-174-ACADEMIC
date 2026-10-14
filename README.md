# G19X-TESOEM-JJVR-174-ACADEMIC

[![Validación NexoCredit](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml/badge.svg)](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml)

Proyecto de Desarrollo de un Sistema Inteligente de Análisis de Riesgo Crediticio.

**NexoCredit es un prototipo académico local**, con datos ficticios: no consulta Buró, certifica identidad ni autoriza créditos. Publicar el código en GitHub no publica la aplicación como sitio web. Esta copia depurada no incluye cuentas, llaves, base de datos ni historial Git del entorno original.

## Empezar

Leer primero [LEEME_PRIMERO.md](LEEME_PRIMERO.md), que explica requisitos, configuración privada y límites. La primera construcción requiere Docker Desktop e Internet. En un equipo sin instalación NexoCredit previa, abrir PowerShell en `empresa - copia/` y ejecutar:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion local
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion usuario
```

El último paso permite crear una cuenta propia; no hay una contraseña predeterminada. Abrir `http://localhost:8080/`. No reutilizar el volumen o la configuración de otra instalación: cambiar de carpeta no cambia automáticamente el nombre de proyecto Compose.

Ollama requiere servicio/modelo local instalado (`llama3.1:8b` por defecto). Sin modelo se puede seleccionar explícitamente la plantilla de reglas, marcada **NO IA generativa**. El laboratorio predictivo scikit-learn utiliza un artefacto numérico incluido y 19 variables UCI/NTD, separado de las reglas demo MXN.

## Organización

- [empresa - copia/](empresa%20-%20copia/README.md): raíz activa con backend, frontend, IA, analítica, infraestructura, operación, scripts y documentación.
- [.github/workflows/ci.yml](.github/workflows/ci.yml): pruebas automatizadas, migraciones PostgreSQL, auditoría, lint y compilación; sin despliegue.
- [NexoCredit.code-workspace](NexoCredit.code-workspace): área de trabajo opcional de VS Code.

Se conserva la carpeta interior para mantener las rutas de Docker, lanzadores y CI. No ejecutar los scripts desde una carpeta distinta a la indicada.

## Documentación de entrega

- [Índice general](empresa%20-%20copia/docs/README.md).
- [PRD](empresa%20-%20copia/docs/producto/PRD_NEXOCREDIT.md) y [MVP/MoSCoW](empresa%20-%20copia/docs/producto/MVP_NEXOCREDIT.md).
- [Arquitectura y datos](empresa%20-%20copia/docs/desarrollo/ARQUITECTURA_Y_DATOS.md).
- [Manual de operación](empresa%20-%20copia/docs/manuales/OPERACION.md), [soporte](empresa%20-%20copia/docs/manuales/MANTENIMIENTO_Y_SOPORTE.md) y [QA](empresa%20-%20copia/docs/calidad/QA.md).
- [Tecnologías obligatorias y estado](empresa%20-%20copia/REQUISITOS_TECNOLOGICOS.md).
- [Alcance de la entrega](empresa%20-%20copia/docs/entrega/ENTREGA_DEMO.md).

Las evidencias citadas del repositorio de desarrollo son históricas y conservan sus fechas; no equivalen a una ejecución nueva en este repositorio. El estado actual de sus pruebas se consulta en **Actions**. La aceptación, capacitación y ceremonias Scrum no se certifican por publicar estos archivos.

## Tecnologías y límites

Python, FastAPI, React, PostgreSQL y Docker implementan el flujo local; Power BI se entrega mediante definiciones PBIP/TMDL sin cachés. Azure OpenAI, Azure Machine Learning, Azure AI Search y Microsoft Entra ID conservan adaptadores, plantillas de configuración y evidencias históricas; requieren recursos, credenciales y suscripción vigentes para usar sus servicios. Ollama, documentos locales y scikit-learn permiten continuar la demo sin Azure. Banxico/Banco Mundial aportan contexto público, no historial crediticio privado. Scrum cuenta con planificación/documentos, no ceremonias inventadas.

Las nuevas evaluaciones aplican `reglas-demo-v2`; un score menor implica mayor riesgo y el margen insuficiente puede elevarlo. No es un modelo crediticio validado para México. Los hechos de la explicación Ollama los calcula el servidor; sólo su comentario académico es IA, con límites y revisión humana.

## Seguridad de la copia pública

Las keys se configuran exclusivamente en archivos privados del servidor, nunca en el frontend. `.env.example` contiene campos de ejemplo, no credenciales de trabajo. Se excluyeron datos personales de identificación, dumps, usuarios, capturas privadas, PBIX/ABF, dependencias y modelos Ollama. No se publica ningún secreto ni se abren puertos adicionales por clonar este repositorio.
