# Guía paso a paso: GitHub y Firebase para HabitFlow

Esta guía sirve aunque nunca hayan usado GitHub ni Firebase. Son dos partes independientes, así que pueden hacerlas en cualquier orden o repartirlas entre el equipo.

- **Parte 1 · GitHub:** guarda el código y compila el archivo `.apk` que se instala en el celular. Toma unos 15 minutos.
- **Parte 2 · Firebase:** maneja el inicio de sesión (correo y contraseña) y la base de datos en la nube. Toma unos 15 minutos.

Al terminar me mandan por el chat **dos cosas**: el nombre del repositorio (Parte 1, paso 6) y el bloque `firebaseConfig` (Parte 2, paso 4). Yo hago el resto.

---

## Parte 1 · GitHub

### Paso 1. Crear la cuenta de GitHub
Si ya tienen cuenta, pasen al paso 2.

1. Entren a **https://github.com/signup** desde el computador.
2. Escriban su correo, una contraseña y un nombre de usuario (por ejemplo `juancleves`). **Anoten el nombre de usuario**: lo van a necesitar.
3. Resuelvan la verificación ("no soy un robot").
4. GitHub les manda un código al correo. Cópienlo en la página.
5. Si pregunta por el plan, elijan **Free** (gratis).

### Paso 2. Crear el repositorio (la carpeta del proyecto en GitHub)
1. Con la sesión iniciada, entren a **https://github.com/new**.
2. Llenen el formulario así:
   - **Owner:** su usuario (ya viene elegido).
   - **Repository name:** `habitflow`
   - **Description:** `App de hábitos - Requerimientos de Software CUN` (opcional).
   - **Public** o **Private:** cualquiera funciona. Con *Public* el profe puede ver el código sin invitación.
   - **No** marquen "Add a README file", ni ".gitignore", ni "license". El repositorio tiene que quedar **vacío**.
3. Toquen el botón verde **Create repository**.
4. Queda una página con instrucciones en inglés. No hay que hacer nada ahí.

### Paso 3. Conectar GitHub con Claude
Esto me da permiso de subir el código a ese repositorio, y solo a ese.

1. Abran **https://claude.ai/connect-github** con la misma cuenta de Claude del proyecto.
2. Toquen **Connect** (o **Conectar**). Se abre GitHub.
3. Si GitHub pide iniciar sesión, háganlo.
4. Aparece "Authorize Claude". Toquen **Authorize**.

### Paso 4. Instalar la app de Claude en el repositorio
Normalmente aparece justo después del paso 3. Si no aparece, entren a **https://github.com/apps/claude/installations/select_target**.

1. Elijan su cuenta (su nombre de usuario).
2. En "Repository access" marquen **Only select repositories**.
3. En la lista "Select repositories" busquen y elijan **habitflow**.
4. Toquen **Install** (o **Save** si ya estaba instalada).

### Paso 5. Agregar el repositorio al proyecto de Claude
1. En este proyecto de Claude abran la configuración del proyecto ([Project settings](#project-settings/resources)), en la sección de recursos o repositorios.
2. Agreguen el repositorio `su-usuario/habitflow`.
3. Si no aparece en la lista, esperen un minuto y recarguen. Si sigue sin aparecer, repitan el paso 4 y revisen que hayan marcado *habitflow*.

### Paso 6. Avisarme
Escriban en el chat el nombre completo del repositorio, por ejemplo: `juancleves/habitflow`.

Yo subo el código y GitHub empieza a compilar solo.

### Paso 7. Descargar el .apk (cuando yo les avise que subí el código)
1. Entren a `https://github.com/su-usuario/habitflow`.
2. Toquen la pestaña **Actions**, arriba.
3. Si GitHub pregunta "Workflows aren't being run on this repository", toquen **I understand my workflows, go ahead and enable them**.
4. Toquen la ejecución más reciente llamada **Compilar APK**. Si tiene un círculo amarillo, sigue compilando (tarda unos 5 minutos). Si tiene un chulo verde, ya terminó.
5. Bajen hasta **Artifacts** y toquen **habitflow-apk**. Se descarga un `.zip`.
6. Descomprímanlo. Adentro está `app-debug.apk`.

### Paso 8. Instalar en el celular Android
1. Pasen `app-debug.apk` al celular (por WhatsApp a ustedes mismos, Google Drive o cable USB).
2. En el celular, toquen el archivo.
3. Android va a decir que no permite instalar apps de este origen. Toquen **Configuración**, activen **Permitir de esta fuente** y vuelvan atrás.
4. Toquen **Instalar**. Si aparece Play Protect, toquen **Instalar de todas formas**. Pasa porque la app no viene de la Play Store; es normal en apps de prueba.
5. Abran **HabitFlow** desde el menú de apps. La primera vez que creen un hábito con recordatorio, la app pide permiso de notificaciones: toquen **Permitir**.

> **Plan B si algo falla con Claude y GitHub:** en la página del repositorio toquen **uploading an existing file**, arrastren el **contenido** de la carpeta `habitflow-android` (no la carpeta en sí) y toquen **Commit changes**. La compilación arranca igual. Ojo: la carpeta `.github` a veces no se sube al arrastrar porque está oculta. Si en *Actions* no aparece nada, avísenme.

---

## Parte 2 · Firebase

Firebase es un servicio gratuito de Google. Con el plan gratis (Spark) no piden tarjeta de crédito.

### Paso 1. Crear el proyecto
1. Entren a **https://console.firebase.google.com** con una cuenta de Google (Gmail). Usen una que el equipo pueda compartir o que no se vaya a perder.
2. Toquen **Crear un proyecto** (o **Comenzar con un proyecto de Firebase**).
3. Nombre del proyecto: `habitflow`. Si el nombre está ocupado, Firebase le agrega letras al final; no pasa nada.
4. Acepten las condiciones y toquen **Continuar**.
5. **Google Analytics:** desactívenlo (no lo necesitamos) y toquen **Crear proyecto**.
6. Esperen unos segundos y toquen **Continuar**.

### Paso 2. Activar el inicio de sesión con correo y contraseña
1. En el menú de la izquierda: **Compilación** (o **Build**) → **Authentication**.
2. Toquen **Comenzar** (o **Get started**).
3. En la pestaña **Método de acceso** (o **Sign-in method**), elijan **Correo electrónico/contraseña**.
4. Activen el **primer** interruptor ("Correo electrónico/contraseña"). El segundo ("Vínculo de correo electrónico") déjenlo apagado.
5. Toquen **Guardar**.

### Paso 3. Crear la base de datos (Firestore)
1. En el menú de la izquierda: **Compilación** → **Firestore Database**.
2. Toquen **Crear base de datos**.
3. **Ubicación:** elijan una de Estados Unidos, por ejemplo `nam5 (United States)` o `us-east1`. **Esta opción no se puede cambiar después.**
4. Elijan **Comenzar en modo de producción** y toquen **Crear**.
5. Cuando cargue, vayan a la pestaña **Reglas** (o **Rules**).
6. Borren todo el texto que hay y peguen exactamente esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cada usuario solo puede leer y escribir su propio progreso
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

7. Toquen **Publicar**.

Estas reglas son las que protegen los datos: nadie puede ver ni tocar el progreso de otra persona. Además sirven de evidencia para el RNF de seguridad y la regla RN-05.

### Paso 4. Registrar la app y copiar el `firebaseConfig`
1. Vuelvan a la página principal del proyecto: toquen **Descripción general del proyecto** (o **Project overview**), arriba a la izquierda.
2. Toquen el ícono **`</>`** (Web). Aunque la app sea de Android, se registra como Web porque usa el mismo código.
3. Apodo de la app: `habitflow-app`. **No** marquen "Firebase Hosting". Toquen **Registrar app**.
4. Aparece un bloque de código. Copien **solo** la parte que empieza con `const firebaseConfig = {` y termina con `};`. Se ve así (con sus propios valores):

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "habitflow-xxxx.firebaseapp.com",
  projectId: "habitflow-xxxx",
  storageBucket: "habitflow-xxxx.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

5. Péguenlo en el chat del proyecto. **No es una contraseña**: Firebase lo diseñó para ir dentro de las apps, y la seguridad la dan las reglas del paso 3.
6. Toquen **Ir a la consola**.

### Paso 5. (Opcional) Dar acceso al resto del equipo
1. Toquen el engranaje ⚙ junto a "Descripción general del proyecto" → **Usuarios y permisos**.
2. **Agregar miembro**, escriban el correo del compañero y elijan el rol **Editor**.

---

## Qué hago yo cuando me manden las dos cosas
1. Cambio el inicio de sesión de la app para que use Firebase Authentication. Cada cuenta es un usuario real de Firebase y se puede ver en *Authentication → Users*.
2. Guardo el progreso de cada persona en `users/<id del usuario>` dentro de Firestore, protegido por las reglas del paso 3.
3. Mantengo todo lo que ya funciona: modo sin conexión, animaciones, notificaciones y la tabla de mediciones (incluidas la latencia de sincronización y la de inicio de sesión).
4. Subo el código a GitHub, espero a que compile y les paso el enlace del `.apk`.

## Problemas comunes
| Qué pasa | Qué hacer |
|---|---|
| En Actions sale una X roja | Avísenme. Reviso el error y subo la corrección. |
| "App no instalada" en el celular | Desinstalen la versión anterior de HabitFlow e instalen de nuevo. |
| No llegan las notificaciones | Ajustes del celular → Apps → HabitFlow → Notificaciones → activarlas. En Xiaomi, Samsung o Huawei, pongan también **Batería → Sin restricciones**. |
| No aparece el repositorio en Claude | Repitan la Parte 1, paso 4, y revisen que *habitflow* esté marcado. |
| Firebase pide tarjeta | Están en el plan Blaze. Usen el plan **Spark** (gratis); no se necesita nada más. |
