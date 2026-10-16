# NexoCredit · G19X-TESOEM-JJVR-174-ACADEMIC

[![Validación NexoCredit](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml/badge.svg)](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml)

**Piloto empresarial en sombra** de análisis de riesgo crediticio: React, FastAPI, PostgreSQL, modelo ENIF mexicano, comparación por reglas, valoración generativa Ollama y revisión humana. Pruebas controladas con datos públicos/escenarios ficticios; aún sin historial de la empresa ni validación de impagos futuros. No consulta Buró, certifica identidad o autoriza créditos reales. La aplicación es local; GitHub aloja código, no una demo web.

## Estado del piloto empresarial

Se compararon regresión logística, Random Forest y Gradient Boosting con validación anidada agrupada y calibración interna. AUC de desarrollo: 0.642 / 0.648 / 0.647; diferencias no concluyentes, **sin sustituir automáticamente el modelo**. No representan una mejora demostrada frente al 0.605 de la prueba histórica, que corresponde a otro conjunto. La pantalla muestra el estado del piloto, comparación, límites y pendientes para usarlo en la empresa. [Protocolo, resultados y contrato para el historial futuro](nexocredit/docs/desarrollo/PILOTO_EMPRESARIAL.md).

## Instalar y abrir sin Azure

Requisitos: Windows, PowerShell, Docker Desktop iniciado e Internet para la primera construcción. Desde la carpeta `nexocredit/`, ejecutar cada comando por separado:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion local
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion usuario
```

El último comando crea una cuenta propia con contraseña oculta; no hay usuario ni contraseña predeterminados. Abrir [localhost:8080](http://localhost:8080/) e iniciar sesión. Compose usa `nexocredit-demo`: la copia no reutiliza automáticamente el volumen de desarrollo. Si otra aplicación ocupa 8080, 8000 o 55433, detenerla antes; no borrar sus datos.

El modelo mexicano incluido **no necesita Azure, Ollama ni conexión a INEGI al evaluar**: al completar su perfil en el formulario principal, ejecuta una regresión logística real y conserva su resultado junto con la solicitud. Estudia asociaciones con atrasos autodeclarados, no impagos futuros. AUC de prueba **0.605**, capacidad limitada: no usar para decisiones reales. [Datos, métricas, reproducción y límites](nexocredit/inteligencia_artificial/prediccion_mexico/README.md).

El modo local también activa documentos, laboratorio UCI y Ollama (`llama3.1:8b`, debe estar instalado y ejecutándose). **Evaluación con IA de tu escenario** es una valoración generativa adicional de los seis importes/score, no el modelo estadístico ENIF. Puede diferir de las reglas y no las sobrescribe. Primera carga hasta tres minutos según el equipo; caché 24 h y diez valoraciones/hora/cuenta.

Sin Ollama, seleccionar `EXPLICACIONES_PROVEEDOR=local` y `VALORACION_IA_PROVEEDOR=deshabilitado` en el archivo privado y actualizar el backend: la explicación será una plantilla **NO IA generativa**, y la valoración IA aparecerá no disponible, nunca simulada. [Guía de instalación](LEEME_PRIMERO.md) y [operación de IA](nexocredit/docs/manuales/OPERACION.md).

## Recorrido para el revisor — 4 pasos

1. En **Evaluación**, usar RFC ficticio `AAAA010101AA1`, ingresos `30000`, gastos `10000`, deuda `0`, pagos `0` y atraso `0`. No activar la revisión opcional CURP para este ejemplo.
2. Mantener **Incluir análisis estadístico mexicano**. Perfil ficticio: ingreso laboral `12000`, periodo **Mes**, ingreso **Fijo**, presupuesto **Sí**, gastos cubiertos **Sí**, ahorros **Tres meses a menos de seis meses** y **Tarjeta bancaria**. Evaluar con score `900`. Aparece primero **Resultado del modelo mexicano**, con versión, clase asociativa y calidad medida. No requiere Ollama. Las respuestas ENIF no se deducen ni se rellenan desde los otros campos.
3. Cambiar sólo el score a `200` y evaluar de nuevo: la comparación por reglas cambia de **Bajo** a **Alto**, pero el modelo mexicano conserva la misma salida porque no utiliza el score. El margen sigue en `$20,000`. La explicación Azure/Ollama o plantilla local es adicional y trata las reglas; no debe confundirse con el modelo ENIF ni con el experimento UCI opcional.
4. Abrir **Historial**, comprobar los escenarios guardados y entrar a un detalle para registrar una revisión ficticia. **Dashboard** resume los registros; **Documentos** consulta las guías locales. Nada de este recorrido requiere Azure; las explicaciones generativas sí requieren el servicio Ollama local disponible.

## Documentación esencial

| Documento | Contenido |
|---|---|
| [PRD](nexocredit/docs/producto/PRD_NEXOCREDIT.md) · [MVP/MoSCoW](nexocredit/docs/producto/MVP_NEXOCREDIT.md) | Requisitos, alcance y prioridades |
| [Arquitectura y datos](nexocredit/docs/desarrollo/ARQUITECTURA_Y_DATOS.md) | Componentes, API y persistencia |
| [Operación](nexocredit/docs/manuales/OPERACION.md) · [Soporte](nexocredit/docs/manuales/MANTENIMIENTO_Y_SOPORTE.md) | Uso, respaldo y mantenimiento |
| [QA](nexocredit/docs/calidad/QA.md) · [Evidencias fechadas](nexocredit/docs/evidencias/README.md) | Pruebas, resultados y límites |
| [Estado de tecnologías](nexocredit/REQUISITOS_TECNOLOGICOS.md) · [Índice ampliado](nexocredit/docs/README.md) | Integraciones y documentación complementaria |
| [Modelo mexicano ENIF](nexocredit/inteligencia_artificial/prediccion_mexico/README.md) | Fuente pública, variables, entrenamiento, métricas y límites |
| [Piloto empresarial](nexocredit/docs/desarrollo/PILOTO_EMPRESARIAL.md) | Comparación rigurosa, controles en sombra y contrato de datos futuros |

Python, FastAPI, React, PostgreSQL, Docker, Power BI, GitHub Actions, Azure OpenAI, Azure Machine Learning, Azure AI Search, Microsoft Entra ID, APIs financieras y Scrum permanecen en el alcance. Las integraciones Azure/Entra conservan adaptadores, campos de keys y evidencias históricas; usarlas requiere configuración, recursos y suscripción vigentes. Las alternativas locales no certifican conectividad cloud ni sustituyen las tecnologías obligatorias. [Configuración Azure conservada](nexocredit/docs/manuales/AZURE_IMPLEMENTADO_Y_CONFIGURACION.md).

## Procedencia e historial de desarrollo

Este repositorio académico empezó como una **copia depurada con historial independiente** el 14/10/2026. Sus primeros commits no representan todo el proceso anterior. El repositorio de desarrollo original es [MikiJMA/EmpresaPluri](https://github.com/MikiJMA/EmpresaPluri); su acceso, si fuera necesario para revisar el historial, está sujeto a autorización del propietario. No se ha concedido acceso ni publicado su base de datos o configuración privada. A partir de esta entrega se registran mejoras mediante commits pequeños con mensajes descriptivos; las evidencias anteriores conservan sus fechas.

## Uso de IA

Se utilizó **Codex** como apoyo para implementar y depurar código, preparar pruebas automatizadas, organizar archivos y redactar documentación. Esta asistencia no equivale a validación humana, aceptación del asesor, autoría de datos de entrenamiento o ejecución de ceremonias Scrum. Los resultados comprobados se distinguen de las propuestas y los pendientes en QA y evidencias.

Las llaves van únicamente en archivos privados del servidor. No compartir `.env`, contraseñas, bases, respaldos ni capturas privadas. Los artefactos PDF/capturas generados para la entrega no forman parte del código fuente. [Límites completos de la demo](nexocredit/docs/entrega/ENTREGA_DEMO.md).
