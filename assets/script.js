$( document ).ready(function() {

    //Validar formulario y traer la información desde la API

    let form = $("#form");
    form.on("submit", function (e) {
        e.preventDefault(); 
        let pokemon = $("#pokemon").val().toLowerCase();
        let regExp = /\D/gim;
        if (pokemon && regExp.test(pokemon)) {
            $.ajax({
                type: "get",
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
                success: function (response) {
                    $(".devolucion").text(`${response.name}!`);
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
                    $(`.devolucion2`).append(table);
                    //Habilidad sin tabla: $(".devolucion2").append(`<p>${element.ability.name}</p>`);
                },
                error: function (error) {
                    alert("Ha habido un error en tu búsqueda. Fíjate si escribiste bien el nombre de tu pokemón.");
                }
            });         
        }
        else {
            $(".devolucion").text("Debes ingresar un nombre de pokemón válido");
        }
    });

    //Gráfico

    var options = {
        title: {
            text: "Stats de mi Pokemón"              
        },
        data: [              
        {
            type: "column",
            dataPoints: [
                { label: "apple",  y: 10  },
                { label: "orange", y: 15  },
                { label: "banana", y: 25  },
                { label: "mango",  y: 30  },
                { label: "grape",  y: 28  }
            ]
        }
        ]
    };

    //Carga la variable con el gráfico
    $("#chartContainer").CanvasJSChart(options);
});