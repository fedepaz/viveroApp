# AgriManage - Guía de Instalación Detallada

¡Bienvenido a AgriManage! Este documento es una guía completa diseñada para ayudarle a instalar y ejecutar esta aplicación en su computadora personal. Está pensado para usuarios que no son programadores, por lo que cada paso se explica en detalle.

---

### Introducción: ¿Qué va a instalar y por qué?

Antes de empezar, es importante que entienda qué está a punto de descargar e instalar. La transparencia es clave, y queremos que se sienta 100% seguro.

- **¿Qué es este proyecto?** AgriManage es una aplicación de software. El "código fuente" de la aplicación (las instrucciones que la hacen funcionar) está guardado en un lugar llamado **repositorio**. Si está leyendo esto en una página web como GitHub, ¡ya se encuentra en el repositorio del proyecto!

- **¿Por qué necesito descargar algo?** Para que la aplicación se ejecute en su propia computadora (y no en internet), necesita tener una copia de esas instrucciones. Lo que va a descargar es simplemente un conjunto de archivos de texto y carpetas. **No es un programa ejecutable (.exe) y el tamaño de la descarga es muy pequeño.**

- **¿Son seguras las herramientas que voy a instalar (Node.js y pnpm)?** ¡Sí! Son herramientas estándar y mundialmente reconocidas en la industria del desarrollo de software. Millones de programadores las usan cada día. Las descargaremos desde sus páginas oficiales, lo que garantiza que son seguras y no contienen virus.

---

## ✅ Paso 1: Obtener el Código Fuente

El primer paso es descargar los archivos de la aplicación en su computadora.

1.  **Descargue el archivo ZIP**: En esta página, busque un botón verde que dice **"< > Code"**. Haga clic en él y, en el menú que aparece, seleccione **"Download ZIP"**.

2.  **Descomprima el archivo**:

    - En su carpeta de "Descargas", encontrará un archivo llamado `viveroApp-main.zip` (o un nombre similar).
    - Haga clic derecho sobre el archivo y seleccione **"Extraer todo..."**.
    - Esto creará una carpeta llamada `viveroApp-main`. Esta carpeta es su copia local del proyecto.

3.  **¿Qué hay dentro de la carpeta?** Verá varias subcarpetas como `apps`, `docs`, `packages`, y archivos como `package.json`. Esta es la estructura del proyecto. No necesita modificar nada, pero es bueno saber que todo el "código" vive aquí. Para ejecutar la aplicación, siempre trabajaremos desde la carpeta principal, es decir, `viveroApp-main`.

---

## ✅ Paso 2: Instalar el Entorno de Ejecución (Node.js)

**¿Qué es Node.js?** Piense en el código de la aplicación como una receta escrita en un idioma especial (JavaScript). Node.js es el "chef" o "traductor" que su computadora necesita para leer esa receta y ejecutar los pasos para que la aplicación funcione. Es un entorno de ejecución, un programa que entiende el lenguaje de la aplicación.

1.  **Vaya a la página de descarga**: [Haga clic aquí para ir a la página oficial de Node.js](https://nodejs.org/es/download).
2.  **Descargue el instalador de Windows**: Busque el logo de Windows y haga clic en el botón que dice **"Instalador de Windows (.msi)"**. Se recomienda la versión **LTS**, que significa "Soporte a Largo Plazo" y es la más estable.
3.  **Instale Node.js**: Una vez descargado, haga doble clic en el archivo. Se abrirá el instalador. Simplemente haga clic en **"Next"** en todas las pantallas, aceptando la configuración por defecto, hasta que la instalación finalice.

> #### Una breve historia para su tranquilidad
>
> Node.js fue creado en 2009 por Ryan Dahl. Su objetivo era solucionar un problema común: los servidores web de la época eran lentos porque solo podían hacer una cosa a la vez. Node.js fue diseñado para poder manejar miles de conexiones simultáneamente de forma muy eficiente.
>
> Gracias a esta eficiencia, se ha vuelto inmensamente popular y es utilizado por algunas de las empresas más grandes del mundo, como **Netflix, Uber, PayPal, LinkedIn y Walmart**. Instalar Node.js es un paso estándar y seguro para ejecutar software moderno.

---

## ✅ Paso 3: Instalar el Gestor de Paquetes (pnpm)

**¿Qué es un gestor de paquetes?** Imagine que construye con Legos. En lugar de fabricar cada ladrillo, usted los toma de cajas que ya existen. En software, estas "cajas de ladrillos" se llaman **paquetes**. Un gestor de paquetes es una herramienta que descarga y organiza automáticamente todos los paquetes que nuestra aplicación necesita.

> #### ¿Por qué `pnpm`? ¿Hay otros?
>
> Sí, hay varios gestores de paquetes. Los más comunes son:
>
> - **`npm`**: El original, viene incluido con Node.js.
> - **`yarn`**: Creado por Facebook para ser más rápido y fiable que las versiones antiguas de `npm`.
> - **`pnpm`**: La opción que hemos elegido. Su principal ventaja es que es **extremadamente eficiente con el espacio en disco**. Si tiene 10 proyectos que usan el mismo "ladrillo", `pnpm` lo guarda una sola vez en su computadora, en lugar de 10 veces. Esto lo hace muy rápido y ligero.
>
> Aunque recomendamos usar `pnpm` para seguir esta guía, el proyecto está configurado de forma estándar, por lo que un usuario avanzado podría usar `npm` o `yarn` si lo prefiriera.

1.  **Abra el Símbolo del sistema (Command Prompt)**:

    - Presione la tecla de **Windows** en su teclado, escriba `cmd` y haga clic en la aplicación **"Símbolo del sistema"**.
    - Se abrirá una ventana negra con texto. Esta es la terminal.

2.  **Instale pnpm con el siguiente comando**:

    - Copie y pegue este comando en la terminal:

    ```bash
    npm install -g pnpm
    ```

    - Presione **Enter**.

    - **¿Qué hace este comando?**
      - `npm`: Es el "Node Package Manager", una herramienta que se instaló con Node.js.
      - `install`: Le dice a `npm` que quiere instalar algo.
      - `-g`: Significa "global". Le dice que instale la herramienta para que esté disponible en toda su computadora.
      - `pnpm`: Es el nombre de la herramienta que queremos instalar.

---

## ✅ Paso 4: Instalar los Componentes de la Aplicación

Ahora usaremos `pnpm` para descargar todas las "piezas" que AgriManage necesita.

1.  **Navegue a la carpeta del proyecto en la terminal**:

    - En la misma ventana negra, mueva la ubicación a la carpeta `viveroApp-main` que descomprimió.
    - Copie y pegue el siguiente comando. **Nota**: Si descomprimió la carpeta en un lugar diferente a `Documentos`, deberá cambiar la ruta.

    ```bash
    cd %USERPROFILE%\Documents\viveroApp-main
    ```

    - Presione **Enter**.

2.  **Instale las dependencias del proyecto**:
    - Ahora que la terminal está "viendo" la carpeta correcta, copie y pegue este comando:
    ```bash
    pnpm install
    ```
    - Presione **Enter**.
    - **¿Qué hace este comando?** `pnpm` leerá un archivo llamado `package.json` (la "lista de compras" de nuestra aplicación), descargará de internet todos los componentes necesarios y los organizará de forma eficiente en su computadora.

---

## ✅ Paso 5: ¡Ejecutar la Aplicación!

¡Este es el último paso! Vamos a iniciar la aplicación.

1.  **Inicie el servidor de desarrollo**:

    - En la misma terminal, copie y pegue el siguiente comando:

    ```bash
    pnpm dev
    ```

    - Presione **Enter**.
    - **¿Qué hace este comando?** Inicia un "servidor de desarrollo local". Esto significa que la aplicación se está ejecutando en su computadora, pero no es visible para nadie más en internet.

2.  **Abra la aplicación en su navegador**:
    - Después de ejecutar el comando, verá que en la terminal aparecen varios textos. Espere hasta que vea un mensaje similar a este:
    ```
    ✓ Compiled successfully
    - Local:   http://localhost:XXXX
    ```
    - **Mantenga presionada la tecla `Ctrl` en su teclado y, sin soltarla, haga clic con el mouse directamente en el enlace que aparece en la terminal** (el que empieza con `http://`).
    - Esto abrirá la aplicación automáticamente en su navegador web.
    - **Importante**: No cierre la ventana negra de la terminal mientras esté usando la aplicación, ya que es el motor que la mantiene funcionando.

---

¡Felicidades! Ha instalado y ejecutado AgriManage correctamente. Si tiene algún problema, no dude en pedir ayuda.
