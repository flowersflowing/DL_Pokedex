$( document ).ready(function() {

    //Validar formulario y traer la información desde la API

    let form = $("#form");
    form.on("submit", function (e) {
        e.preventDefault();
        nombre();

    });

    //Función de validación de nombre de pokemon, petición a la API con devolución de gráfico.
    function nombre() {
            let pokemon = $("#pokemon").val().toLowerCase();
            let regExp = /\D/gim;
            if (pokemon && regExp.test(pokemon)) {
                $.ajax({
                    type: "get",
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
                    success: function (response) {
                        $(".devolucion").text(`${response.name}!`);
                        $(".devolucion2").html(`<img src="${response.sprites.front_default}" style="width:30%"> <img src="${response.sprites.back_default}">`);
                        let abilities = response.abilities;
                        let table = `
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Ability</th>
                                    </tr>
                                </thead>
                                <tbody>
                            `;
                        abilities.forEach(element => {
                            table += `
                                    <tr>
                                        <td>${element.ability.name}</td>
                                    </tr>
                            `;
                        });
                        table += `
                                </tbody>
                            </table>                        
                        `;
                        $(`.devolucion3`).html(table);
                        //Habilidad sin tabla: $(".devolucion2").append(`<p>${element.ability.name}</p>`);                    
                        //Llamar al gráfico
                        graph(response);
                    },
                    error: function (error) {
                        alert("Ha habido un error en tu búsqueda. Fíjate si escribiste bien el nombre de tu pokemón.");
                    }
                });         
            }
            else {
                $(".devolucion").text("Debes ingresar un nombre de pokemón válido");
            }
    };

    //Función de selección de tipo de pokemón
    // function tipo() {
        
    // }

    //Función para el gráfico
    function graph (pok) {
        let datos = [];

        pok.stats.forEach(element => {
            datos.push({
                label: element.stat.name, 
                y: element.base_stat
            });
        });

        var options = {
            title: {
                text: "Stats de mi Pokemón"              
            },
            data: [
                {
                type: "column",
                dataPoints: datos                    
                }
            ]
        };     
        //Carga la variable con el gráfico   
        $("#chartContainer").CanvasJSChart(options);    
    };

});