// Envía el aviso "Hay una actualización" a todos los celulares suscritos al tema "actualizaciones"
// (Firebase Cloud Messaging, API HTTP v1). Lo ejecuta GitHub Actions después de publicar el Release.
// Necesita el secreto FCM_SERVICE_ACCOUNT (JSON de la cuenta de servicio de Firebase). Sin él, no hace nada.
const crypto = require("crypto");
const raw = process.env.FCM_SERVICE_ACCOUNT;
if (!raw) { console.log("Sin FCM_SERVICE_ACCOUNT: no se envía el aviso push."); process.exit(0); }
let sa;
try { sa = JSON.parse(raw); } catch { console.error("FCM_SERVICE_ACCOUNT no es un JSON válido."); process.exit(1); }
if (!sa.private_key || !sa.client_email || !sa.project_id) {
  // Solo se muestran los nombres de los campos, nunca sus valores
  console.error("FCM_SERVICE_ACCOUNT no es la llave de una cuenta de servicio (falta private_key, client_email o project_id). Campos encontrados: " + Object.keys(sa).join(", "));
  process.exit(1);
}
const build = process.env.BUILD;
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const now = Math.floor(Date.now() / 1000);
const unsigned = b64({ alg: "RS256", typ: "JWT" }) + "." + b64({
  iss: sa.client_email, scope: "https://www.googleapis.com/auth/firebase.messaging",
  aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600
});
const jwt = unsigned + "." + crypto.createSign("RSA-SHA256").update(unsigned).sign(sa.private_key).toString("base64url");
(async () => {
  const tok = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt })
  }).then(r => r.json());
  if (!tok.access_token) { console.error("No se obtuvo el token de Google:", tok.error || tok); process.exit(1); }
  const message = {
    topic: "actualizaciones",
    notification: { title: "Hay una actualización de HabitFlow", body: `La versión 1.0.${build} está lista. Toca para actualizar; tu progreso se conserva.` },
    android: { priority: "HIGH", notification: { channel_id: "actualizaciones", icon: "ic_stat_icon", color: "#2E6A4D" } },
    data: { build: String(build), url: `https://github.com/kevinsanchez007/habitflow/releases/download/v1.0.${build}/habitflow.apk` }
  };
  const r = await fetch(`https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`, {
    method: "POST", headers: { authorization: "Bearer " + tok.access_token, "content-type": "application/json" },
    body: JSON.stringify({ message })
  });
  console.log("Firebase Cloud Messaging respondió", r.status, await r.text());
  if (!r.ok) process.exit(1);
})();
