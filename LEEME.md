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
Cambiar `habitflow-app/app.html` y correr `python3 build.py --android` en esa carpeta (escribe `www/index.html`). Al subir a `main`, GitHub compila un APK nuevo.

## Firebase (cuentas y nube)
- Proyecto Firebase: `habitflow-f169e`. La configuración está en `src/firebase.js`.
- `www/firebase.js` es el SDK de Firebase empaquetado dentro de la app (no depende de internet para cargar). Si se cambia `src/firebase.js`: `npm install` y `npm run build:firebase`.
- **Inicio de sesión:** Firebase Authentication con correo y contraseña. Las cuentas se ven en la consola, en *Authentication → Users*. "¿Olvidaste tu contraseña?" manda un correo de recuperación.
- **Progreso:** documento `users/<uid>` en Firestore (campos `name`, `email`, `habitos`, `updatedAt` y `data` con todo el progreso). Las reglas solo dejan leer y escribir el propio documento.
- **Sin conexión:** todo se guarda primero en el celular y se envía a Firestore al volver la red. La latencia de envío (RNF-02) y la de inicio de sesión (RNF-08) quedan en Perfil → Mediciones.
- "Eliminar mi cuenta" borra el documento y el usuario. Si Firebase pide un inicio de sesión reciente, la app borra el progreso, cierra sesión y pide entrar otra vez para terminar.

## Notificaciones
Incluidas: se programan por cada hábito con recordatorio y suenan con la app cerrada.
