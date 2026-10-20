# Mis Cuentas: puesta en marcha

## A. Solo en el teléfono (sin servidor)
Sube la carpeta completa a Netlify Drop (app.netlify.com/drop). Listo.

## B. Con nube, varios dispositivos y recuperación de contraseña por correo (Supabase, gratis)
Los nombres de los menús de Supabase pueden cambiar un poco con el tiempo.

1. Crea una cuenta en supabase.com y un proyecto nuevo (New project).
2. SQL Editor > New query: pega el contenido de `supabase.sql` y pulsa Run.
3. Project Settings > API: copia "Project URL" y la clave "anon public". Pégalas en `config.js`.
4. Authentication > Sign In / Providers > Email: desactiva "Confirm email".
5. Authentication > Emails > SMTP Settings: activa "Custom SMTP" con un servicio de correo (Brevo o Resend tienen plan gratis). Sin esto, los correos solo llegan a los miembros de tu equipo de Supabase y con un límite muy bajo.
6. Authentication > Emails > Templates > "Reset password": cambia el cuerpo por:

   <h2>Tu código para recuperar la contraseña</h2>
   <p>Tu código es: <b>{{ .Token }}</b></p>
   <p>Si no lo pediste, ignora este correo.</p>

7. Vuelve a subir la carpeta completa a Netlify.

## Cómo funciona sin internet
- Todo se guarda primero en el teléfono. Registrar ingresos y gastos, ver gráficas y entrar a la app funciona con o sin conexión.
- Con la nube activa, los cambios hechos sin internet se suben solos cuando vuelve la conexión.
- Crear la cuenta, entrar por primera vez en un teléfono nuevo y recuperar la contraseña sí necesitan internet.
- Si dos teléfonos editan lo mismo sin conexión, se queda el cambio más reciente.

## C. Entrar con Google (opcional, necesita el paso B)
1. En console.cloud.google.com crea un proyecto y configura la pantalla de consentimiento (nombre de la app y tu correo).
2. APIs y servicios > Credenciales > Crear credenciales > ID de cliente de OAuth > Aplicación web. En "URI de redireccionamiento autorizados" pega: `https://TU-PROYECTO.supabase.co/auth/v1/callback` (la ves en Supabase, en Authentication > Sign In / Providers > Google). Copia el ID de cliente y el secreto.
3. En Supabase, Authentication > Sign In / Providers > Google: actívalo y pega el ID de cliente y el secreto.
4. En Supabase, Authentication > URL Configuration: pon el enlace de tu sitio en Netlify en "Site URL" y también en "Redirect URLs".
5. En `config.js` cambia `google:false` por `google:true` y vuelve a subir la carpeta.
Mientras la pantalla de consentimiento de Google esté en modo de prueba, solo podrán entrar los correos que agregues como usuarios de prueba. Para abrirla a cualquier persona, publícala desde la misma consola.
Entrar con Google necesita internet. Después de entrar, la app sigue funcionando sin conexión.

## D. Correo de soporte
En `config.js` escribe tu correo en `soporte`. Lo usan los botones "Contacte con el equipo de soporte" y "Valore la aplicación".
