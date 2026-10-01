# HabitFlow para Android (Capacitor)

Proyecto de app Android que empaqueta la misma app de `habitflow-app/` (se copia en `www/`).

## Compilar el .apk
**Opción A · GitHub (recomendada):** subir esta carpeta a un repositorio. El flujo `.github/workflows/apk.yml` compila solo; el .apk queda en *Actions → la ejecución → Artifacts → habitflow-apk*.

**Opción B · Android Studio:**
1. Instalar Node.js 22 y Android Studio.
2. En esta carpeta: `npm install` y luego `npx cap sync android`.
3. `npx cap open android` → en Android Studio: *Build → Build App Bundle(s)/APK(s) → Build APK(s)*.
4. El archivo sale en `android/app/build/outputs/apk/debug/app-debug.apk`. Se pasa al celular y se instala (hay que permitir "instalar apps de origen desconocido").

## Actualizar la app
Cambiar `habitflow-app/app.html`, correr `python3 build.py` allí, copiar `index.html` a `www/` y luego `npx cap sync android`.

## Pendiente
- Conectar Firebase (inicio de sesión y base de datos) cuando el equipo comparta el `firebaseConfig`. Mientras tanto, dentro del .apk las cuentas se guardan en el celular.
- Notificaciones del sistema: ya incluidas (se programan por cada hábito con recordatorio y suenan con la app cerrada).
