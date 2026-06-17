const perfil = { 
    nombre: "Victoria",
    edad: 18,
    carrera: "Diseño",
    hobby: "Bateria",
    presentarse: function () {
        return "Hola soy " + this.nombre + ", tengo " + this.edad + " y estudio " + this.carrera;
    }
}

console.log(perfil.presentarse())