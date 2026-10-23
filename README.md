# NexoCredit · G19X-TESOEM-JJVR-174-ACADEMIC

[![Validación NexoCredit](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml/badge.svg)](https://github.com/MikiJMA/G19X-TESOEM-JJVR-174-ACADEMIC/actions/workflows/ci.yml)

NexoCredit es un sistema local de análisis de escenarios de riesgo crediticio. Integra React, FastAPI, PostgreSQL, Docker, una comparación por reglas y un modelo experimental ENIF mostrado como segunda opinión, además de historial, revisión humana, pagos ficticios e indicadores financieros.

## Instalación

Requiere Docker Desktop e Internet en la primera construcción. Desde `nexocredit/`, en Windows con PowerShell, ejecuta cada comando por separado:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion local
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion usuario
```

Después abre [http://localhost:8080/](http://localhost:8080/). La cuenta se crea en el último paso. La guía completa, incluido el equivalente con Docker Compose directo y la configuración privada, está en [LEEME_PRIMERO.md](LEEME_PRIMERO.md).

## Recorrido para el revisor — 4 pasos

1. Abre **Evaluaciones** y captura RFC ficticio `AAAA010101AA1`, ingresos `30000`, gastos `10000`, deuda `0`, pagos `0`, atraso `0` y score `900`.
2. Activa el perfil ENIF e indica: ingreso laboral `12000`, periodo **Mes**, ingreso **Fijo**, presupuesto **Sí**, gastos cubiertos **Sí**, ahorros **Tres meses a menos de seis meses** y **Tarjeta bancaria**. Evalúa y consulta el resultado del modelo mexicano junto con la comparación por reglas.
3. Cambia únicamente el score a `200` y evalúa de nuevo. La comparación por reglas cambia; el resultado ENIF se conserva porque utiliza variables distintas del perfil.
4. Revisa **Historial**, abre el detalle y consulta **Documentos**. Dashboard, créditos/pagos e indicadores están disponibles desde el menú.

## Documentación

| Documento | Contenido |
|---|---|
| [PRD](nexocredit/docs/producto/PRD_NEXOCREDIT.md) · [MVP/MoSCoW](nexocredit/docs/producto/MVP_NEXOCREDIT.md) | Requisitos y prioridades |
| [Arquitectura y datos](nexocredit/docs/desarrollo/ARQUITECTURA_Y_DATOS.md) | Componentes, API y persistencia |
| [Modelo ENIF](nexocredit/inteligencia_artificial/prediccion_mexico/README.md) | Variables, entrenamiento, AUC y límites |
| [Operación](nexocredit/docs/manuales/OPERACION.md) · [QA](nexocredit/docs/calidad/QA.md) | Uso y resultados de pruebas |
| [Alcance de entrega](nexocredit/docs/entrega/ENTREGA_DEMO.md) | Condiciones, seguridad, procedencia y uso de IA |
| [Tecnologías](nexocredit/REQUISITOS_TECNOLOGICOS.md) | Estado de las tecnologías solicitadas |
