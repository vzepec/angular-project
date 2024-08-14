
# Banco de películas

El proyecto es de un banco de películas utilizando dos  [APIs de IMDB](https://rapidapi.com/DataCrawler/api/imdb188) (Rapidapi) para mostrar informacion mediante cards como: 

* Imagen
* Titulo
* Año de estreno

El proyecto permite buscar, eliminar y editar la informacion de las películas.


## Requerimientos

 - [Angular 14](https://angular.dev/installation)
 - [NodeJs LTS](https://nodejs.org/en/download/prebuilt-installer/current)


## Instalación y Ejecución

Primero se debe clonar el proyecto mediante:

```bash
  git clone https://github.com/vzepec/angular-project.git
```

Luego se deben instalar las dependencias del proyecto, para esto, es necesario ubicarse dentro del directorio raíz del proyecto y ejecutar:

```bash
  npm install
```

Finalmente se puede levantar el proyecto mediante:

```bash
  ng serve
```
## Tests

Se pueden ejecutar los test unitarios mediante el siguiente comando 

```bash
  ng test
```
Se correrán 24 test en total, se testeó cada uno de los componentes.

Reporte de Covertura
---
Para el reporte se utiliza karma y se puede generar con el siguiente comando

```bash
  ng test --code-coverage
```
Una vez terminado el proceso, se puede revisar el reporte en `/coverage/index.html`# Imágenes de Referencia

![Proyecto](https://i.imgur.com/olrFB76.png)

&nbsp;  
&nbsp;  


![Reporte](https://i.imgur.com/1WHoroz.png)

