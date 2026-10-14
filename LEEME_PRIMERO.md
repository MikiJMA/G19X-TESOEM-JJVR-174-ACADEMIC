# LEEME PRIMERO — NexoCredit, entrega local

Esta copia contiene código y documentación pública depurada, no una base de datos,
cuentas, secretos, imágenes Docker, dependencias instaladas, datasets UCI o modelos
Ollama. No es un instalador offline/autocontenido ni una aplicación ya publicada.
Los hashes verifican integridad respecto del manifiesto; no son firma digital ni
certifican ausencia de secretos pegados accidentalmente en archivos públicos.

## Estructura y revisión antes de ejecutar

Extrae el ZIP sin aplanar carpetas. Dentro de NexoCredit/ están .github/,
NexoCredit.code-workspace y empresa - copia/, la raíz activa del proyecto. Así se
conservan los working-directory de CI. El JSON del manifiesto se entrega junto
al ZIP e incluye rutas, tamaños y SHA-256 del contenido copiado y del ZIP; el
Git SHA es referencia histórica, no prueba de un árbol limpio o de CI nueva.

Revisa primero empresa - copia/README.md, REQUISITOS_TECNOLOGICOS.md y
docs/entrega/ENTREGA_DEMO.md. Las evidencias están fechadas: no garantizan
conectividad actual, suscripción vigente, crédito real o aceptación formal.
Los datos de identificación del plan se redactaron sólo en la copia; el archivo
docs/estadia/ALUMNO.md es un marcador, no la ficha privada original.

## Instalación inicial en Windows: primero construir con Docker

1. Instala/abre Docker Desktop y espera su motor. Esta secuencia es para un
   equipo sin una instalación NexoCredit existente, con puertos locales libres.
   Una carpeta nueva NO crea por sí sola un proyecto/volumen Docker independiente:
   Compose conserva el nombre plurione-docker. Si ya existe, no ejecutes esta
   copia como instalación nueva ni borres su volumen o .env; conserva el entorno
   original y consulta el manual de operación antes de cambiarlo.
   La primera construcción necesita Internet para imágenes y dependencias.
   No desactives TLS, autenticación o antivirus para corregir descargas.
2. Abre PowerShell en NexoCredit/empresa - copia/ y ejecuta:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\docker.ps1 iniciar
```

El lanzador crea un .env privado con contraseñas aleatorias nuevas y construye
la aplicación. No copies .env.example encima del archivo privado generado.
No se incluyen datos, usuarios, contraseñas o llaves de la computadora original.

3. Después de construir, activa los proveedores y acceso locales:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion local
```

4. Para explicaciones generativas, instala/abre Ollama y utiliza un modelo que
   quepa en la memoria del equipo. El modo local propone llama3.1:8b: si no está
   instalado, descargarlo es una operación adicional con Internet y espacio.
   No se ejecuta ni descarga nada por extraer este paquete.
   Sin modelo, puedes editar exclusivamente EXPLICACIONES_PROVEEDOR=local en
   infraestructura/contenedores_docker/.env y volver a aplicar el backend con
   operacion/aplicacion/Actualizar NexoCredit.cmd. Esa opción es una **plantilla
   de reglas, NO IA generativa**. DOCUMENTOS_PROVEEDOR=local y ML_PROVEEDOR=local
   mantienen las guías y el modelo numérico scikit-learn incluido.
5. Crea tu cuenta propia; no existe una contraseña predeterminada:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\modo-local.ps1 -Accion usuario
```

La consola pide usuario, nombre y contraseña oculta. No compartas la contraseña.
Abre http://localhost:8080/ y entra con esa cuenta. El laboratorio scikit-learn es
UCI/NTD independiente: no modifica el score capturado o reglas-demo-v2 en MXN.
Ollama explica; no es el modelo predictivo del laboratorio.

## Credenciales y límites de esta copia

Azure OpenAI/ML/Search y Microsoft Entra conservan adaptadores y campos de keys
en .env.example, pero **no incluye credenciales**. Azure requiere recursos,
configuración y suscripción vigentes; no hay fallback cloud automático. La guía
v2 está preparada localmente pero pendiente de carga/verificación en Azure
Search. Banxico/otros proveedores y Entra requieren su configuración e Internet.
Los datos locales no constituyen historial Buró o identidad SAT verificada.

Sólo los nuevos escenarios usan reglas-demo-v2; los registros anteriores no se
recalculan. Los resúmenes monetarios redondean pesos, no borran centavos de los
cálculos. La IA, las revisiones y los pagos ficticios no autorizan crédito real.

Power BI requiere Desktop y una conexión nueva de lectura limitada: no se
incluyen PBIX/ABF, cachés o credenciales. Las definiciones PBIP/TMDL son fuente,
no una garantía de actualización o resultado en un equipo nuevo. Entrenar UCI
requiere obtener los datos autorizados por separado; no incluye sus CSV/pickle.

Revisa la documentación de respaldo/soporte antes de operar datos. No publiques
la aplicación, abras puertos o compartas .env, dumps, tokens y capturas privadas.
No se acredita capacitación, horas, Scrum, aceptación o firma por esta entrega.
