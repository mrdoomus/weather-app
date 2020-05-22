## Getting Started

Make sure you have installed node and npm, at least v.6.

1. Clone or fork this repository to your local machine.

```
$git clone https://github.com/mrdoomus/weather-app.git
```

2. Enter the root folder

```
$cd weather-app
```

3. Install modules in frontend and backend

```
$npm install
```

## Available Scripts

In the 'frontend' directory, you can run:

```
$npm start
```
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.

In the 'backend' directory, you can run:

```
$npm run dev
```
Runs the server in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the console.

The server will reload if you make edits.<br />
You will also see any lint errors in the console.

```
$npm start
```

### Mandatory Features

- [x] Entrada de texto donde puede ingresar el nombre de una ciudad.
- [x] La ciudad muestra su clima actual.
- [x] La ciudad muestra las condiciones meteorológicas minuto a minuto para la próxima hora,
- [x] La ciudad muestra las condiciones climáticas hora por hora para los próximos dos días
- [x] La ciudad muestra las condiciones climáticas día a día para la próxima semana
- [x] En ningún caso el frontend se debe conectar directamente con los servicios externos.
- [X] En el backend se debe guardar en una base datos (la que prefiera) un log con la ciudad escrita, la ip desde la cual se hace la solicitud y la respuesta del servicio externo.

## Built With

- [ReactJS](https://es.reactjs.org/) - Javascript library for frontend.
- [NodeJS](https://es.redux.js.org/) - React state manager.

## Authors

- **Camilo Villegas** - [mrdoomus](https://github.com/mrdoomus)