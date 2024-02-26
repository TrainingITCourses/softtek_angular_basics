# Softtek Angular Basics

> Laboratorio para [curso de Angular Basics para Softtek](https://cursos.trainingit.es/course/view.php?id=1452) impartido por [Alberto Basalo](https://albertobasalo.dev) para TrainingIT.

## Requisitos para el laboratorio

Comprobar [versión de Node.js](https://angular.io/guide/versions) y npm.

```bash
# Check Node.js and npm versions
node -v
npm -v
```

> [!NOTE]
> La aplicación de ejemplo estará en la carpeta [ActivityBookings](./ActivityBookings)

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

```bash
# clone lab from github
git clone https://github.com/AlbertoBasalo/ng-lab.git
# install and run
cd ng-lab/ActivityBookings
npm install
# start Angular server
npm start
# start a fake API server
npm run api:seed
```

## Replicar desde cero

Instalar **Angular CLI** y generar aplicación de ejemplo.

```bash
# install Angular CLI
npm i -g @angular/cli@latest
# create new Angular project
ng new ActivityBookings --inline-style --inline-template --prefix=lab --ssr --style=css
# Or run with npx and options with aliases (- instead of --)
npx ng new ActivityBookings -s -t -p=lab --ssr --style=css
```

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
