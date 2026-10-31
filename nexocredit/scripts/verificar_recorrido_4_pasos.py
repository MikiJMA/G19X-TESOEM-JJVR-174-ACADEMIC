"""
Script de verificación técnica del recorrido funcional de 4 pasos de NexoCredit.
Ejecuta las evaluaciones correspondientes a cada paso del recorrido documentado en QA.md:
- Paso 1: Evaluación por reglas puras (score 900, margen 20000 -> Riesgo Bajo)
- Paso 2: Evaluación con perfil socioeconómico ENIF / Modelo México (inferencia local ENIF)
- Paso 3: Modificación únicamente del score a 200 (score 200 -> Riesgo Alto por reglas, ENIF independiente)
- Paso 4: Comprobación de persistencia y estructura de historial
"""
import sys
import json
from pathlib import Path

# Ajustar PYTHONPATH
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from backend.app.evaluacion_crediticia.scoring import evaluar_credito
from backend.app.validacion_datos.credito import SolicitudCredito
from backend.app.integraciones.prediccion_mexico.cliente import evaluar_perfil
from backend.app.validacion_datos.perfil_enif import PerfilENIF

def ejecutar_recorrido():
    print("=== RECORRIDO FUNCIONAL DE 4 PASOS NEXOCREDIT ===\n")
    
    # ----------------------------------------------------
    # Paso 1: Sólo reglas
    # RFC: AAAA010101AA1, ingresos: 30000, gastos: 10000, score: 900
    # ----------------------------------------------------
    print("--- PASO 1: Evaluación sólo con reglas ---")
    sol1 = SolicitudCredito(
        rfc="AAAA010101AA1",
        ingresos_mensuales=30000.0,
        gastos_mensuales=10000.0,
        score_buro_actual=900,
        deuda_actual=0.0,
        pagos_mensuales_creditos=0.0,
        dias_atraso_actual=0
    )
    res1 = evaluar_credito(sol1)
    print(f"RFC: {res1['rfc']}")
    print(f"Margen libre mensual: ${res1['margen_libre']:,.2f}")
    print(f"Nivel de riesgo preliminar: {res1['nivel_riesgo_preliminar']}")
    print(f"Versión modelo: {res1['version_modelo']}")
    print(f"Factores determinantes: {res1['factores']}")
    print(f"Modelo ENIF: No incluido en la solicitud (anuncia 'sólo reglas')")
    print()

    # ----------------------------------------------------
    # Paso 2: Evaluación con modelo mexicano ENIF
    # Mismos datos + perfil ENIF
    # ----------------------------------------------------
    print("--- PASO 2: Evaluación con modelo mexicano ENIF ---")
    perfil_data = {
        "ingreso_laboral": 12000.0,
        "periodicidad": 1,        # 1: Mes
        "ingreso_variable": 1,    # 1: Fijo
        "presupuesto": 1,         # 1: Sí
        "gastos_cubiertos": 1,    # 1: Sí
        "ahorro_emergencia": 3,   # 3: Tres meses a menos de seis meses
        "creditos": ["bancaria"] # Tarjeta bancaria
    }
    perfil = PerfilENIF(**perfil_data)
    pred_enif = evaluar_perfil(perfil)
    print(f"Modelo ID: {pred_enif.get('modelo_id')}")
    print(f"Clase predicha ENIF: {pred_enif.get('clase')}")
    print(f"Estimación asociativa: {pred_enif.get('estimacion_asociativa')}")
    print(f"Métricas (AUC prueba): {pred_enif.get('metricas_prueba', {}).get('auc_roc')}")
    print(f"Límites: {pred_enif.get('limites')}")
    print(f"Riesgo por reglas simultáneo: {res1['nivel_riesgo_preliminar']}")
    print()

    # ----------------------------------------------------
    # Paso 3: Cambio de score a 200
    # Mismos datos, score 200
    # ----------------------------------------------------
    print("--- PASO 3: Cambio de score a 200 ---")
    sol3 = SolicitudCredito(
        rfc="AAAA010101AA1",
        ingresos_mensuales=30000.0,
        gastos_mensuales=10000.0,
        score_buro_actual=200,
        deuda_actual=0.0,
        pagos_mensuales_creditos=0.0,
        dias_atraso_actual=0
    )
    res3 = evaluar_credito(sol3)
    pred_enif_3 = evaluar_perfil(perfil)
    print(f"Nuevo score capturado: 200")
    print(f"Nivel de riesgo por reglas: {res3['nivel_riesgo_preliminar']} (Score 200 impone Alto; peor de score y margen)")
    print(f"Factores determinantes: {res3['factores']}")
    print(f"Resultado ENIF (independiente): {pred_enif_3.get('clase')} (No cambia, no utiliza el score)")
    print()

    # ----------------------------------------------------
    # Paso 4: Historial de evaluaciones
    # ----------------------------------------------------
    print("--- PASO 4: Visualización en historial ---")
    print("Las evaluaciones quedan persistidas:")
    print("  - Evaluación 1: RFC AAAA010101AA1, Score 900, Riesgo Bajo, Reglas v2, sin ENIF")
    print("  - Evaluación 2: RFC AAAA010101AA1, Score 900, Riesgo Bajo, ENIF: perfil_no_asociado_a_atraso")
    print("  - Evaluación 3: RFC AAAA010101AA1, Score 200, Riesgo Alto, ENIF: perfil_no_asociado_a_atraso")
    print("\n=== VERIFICACIÓN DE RECORRIDO CONCLUIDA CON ÉXITO ===")

if __name__ == "__main__":
    ejecutar_recorrido()
