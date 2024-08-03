# E-actividad 2.1 - Sistema de Planificación Académica UVM.
<p>Se debe desarrollar el sistema diseñado en la actividad 1.1 utilizando programación en javascript y algún framework (se recomienda vue.js).
Asegúrese de que el programa cumpla con todas las historias de usuario identificadas y propuestas en la actividad anterior.</p>
<br>
<h2> Integrantes: </h2>
<ul>
<li><i>Miguel Omaña. C.I 30.111.323</i></li>
<li><i>Yeriagny Chirinos. C.I 30.302.447</i></li>
<li><i>Richard Siverio. C.I 30.116.733</i></li>
<li><i>Rosangel Betancourt. C.I 30.536.182</i></li>
</ul>
<br>
<h2>Introducción</h2>
<p>
Esta actividad tiene como objetivo principal mostrar la funcionalidad del sistema realizado en el informe de la Unidad 1. El cuál se basa en un sistema donde los docentes y directores puedan establecer su planificación, eventos, y otras tareas utilizando un calendario. 
<br>
</p>
<h2>Tecnologías y Herramientas empleadas </h2>
<p>
Este sitio web se compone de <b><i>Vue, CSS, Mysql para la base de datos, Node.JS y JWT</i></b>.
Ahora, para su edición y creación, se empleó la herramienta <b><i>Visual Studio Code</i></b>, el cual es un editor de código fuente desarrollado por Microsoft. Para compartir nuestro proyecto, empleamos la herramienta <b><i>GitHub</i></b> la cual ofrece un servicio de hosting de repositorios almacenados en la nube.

</p>
<br>
<h2>¿Qué contiene el proyecto?</h2>
<p>
El proyecto consta de las carpetas y archivos: <b><i>src, package.json, readme.md y el webpack.config.js</i></b>.  
A su vez, en la carpeta src se encuentran <b><i>las imágenes, los componentes, la configuración de la base de datos, los controladores, el modelo de tabla de la base de datos y las rutas.</i></b>
</p>
<br>
<h2>Instalación y Arranque del sitio Web</h2>
<p>Como lo anteriormente dicho, para trabajar con el código se empleó la herramienta GitHub. Ahora para descargar todo el código, se debe realizar lo siguiente:</p>
<ol>
<li>
Entrar al repositorio a través del link: “https://github.com/Ovmiguel16/Sistema-de-Planificaci-n-Acad-mica-UVM", luego presionando <i>"Code"</i> donde se debe dirigir a <i>"Download ZIP"</i>, y se empezará a descargar el archivo comprimido. Se descomprime la carpeta, y se abre en <i>"Visual Studio Code"</i> con esto se abrirán todos los archivos del sitio web dentro del computador y así poder trabajar en él.
</li>
<li>
Una vez descargado el proyecto, se debe posicionar en la carpeta que contiene el proyecto y colocar en la terminal el comando: <i>"npm i"</i>, para así poder instalar las dependencias del Node.js.
</li>
<li>
Posteriormente, se coloca <i>"cd Backend"</i>, para posicionarse en la carpeta Backend y luego colocar el comando: <i>"node server.js"</i>, lo cual enciende el backend y conecta a la base de datos; asegurarse de tener encendido el XAMPP con el Apache y el MySQL.
</li>
<li>
Luego, se abre otra terminal para el frontend y se ejecuta el comando <i>"npm run serve"</i> para correrlo. Debe aparecer un enlace al puerto donde se encuentra el proyecto.
</li>
<li>
Para poder ingresar se deben colocar los datos: <i>"juan.perez@ejemplo.com y clave: password123"</i>; los cuales son el usuario de rol director por defecto que va a permitir ingresar al sistema. Una vez dentro se puede registrar más usuarios.
</li>
</ol>
<br>
<h2>Ejecución de Testing con Cypress</h2>
<p>Para verificar la funcionalidad del sistema a través de pruebas automatizadas, se utiliza Cypress, una herramienta de testing end-to-end. A continuación, se detallan los pasos para ejecutar los tests:</p>
<ol>
<li>
<h4>Configuración de Cypress:</h4>
<p>Después de la instalación, puedes abrir Cypress por primera vez usando el siguiente comando:</p>
<pre><code>npx cypress open</code></pre>
<li>
<h4>Preparación de Archivos de Test:</h4>
<p>Encuentra los siguientes archivos de test en la carpeta correcta dentro del directorio <code>cypress/e2e</code>. 
<ul>
<li><code>navigation_and_api.cy.js</code></li>
<li><code>modal_navigation.cy.js</code></li>
<li><code>form_validation.cy.js</code></li>
</ul>
</li>
<li>
<h4>Configuración de Fixtures:</h4>
<p>Los datos de prueba (fixtures) estan ubicados en la carpeta <code>cypress/fixtures</code>. 
</li>
<li>
<h4>Ejecutar los Tests:</h4>
<p>Para ejecutar los tests, abre Cypress utilizando:</p>
<pre><code>npx cypress open</code></pre>
<p>En la interfaz de usuario de Cypress, selecciona el archivo de test que deseas ejecutar para comenzar con la prueba automatizada. Alternativamente, puedes ejecutar todos los tests desde la línea de comandos con:</p>
<pre><code>npx cypress run</code></pre>
<p>Este comando ejecutará todos los tests en modo headless (sin interfaz gráfica).</p>
</li>
<li>
<h4>Revisar Resultados:</h4>
<p>Revisa los resultados de los tests en la interfaz de Cypress o en la terminal. Los tests exitosos indicarán que el sistema está funcionando correctamente, mientras que los fallidos proporcionarán detalles sobre los errores para su corrección.</p>
</li>
</ol>
<h2>Link del video en Youtube</h2>
<p>https://youtu.be/P_hRifaMNiI?si=yPK_CGDMgjYkRuLV</p>
<h2>FIN</h2>