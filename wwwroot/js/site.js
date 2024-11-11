let interval = null;     // Intervalo do cronômetro
let paused = false;      // Estado de pausa
let totalSeconds = 0;    // Total em segundos
let statusCustom = true; // Permissão para customizar

$(document).ready(function () {
    $('.bg-color-crud').hide();
    $(".box-msg").hide();
    listPreFood();
});

function maskFormatTimer() {
    const input = document.getElementById('timerInput');
    let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Se houver mais de 2 dígitos, insere o ":" após os primeiros dois dígitos
    if (valor.length > 2) {
        valor = `${valor.slice(0, 2)}:${valor.slice(2, 4)}`;  // Insere ':' após os 2 primeiros dígitos
    }

    // Limita o valor ao formato MM:SS
    input.value = valor;
}

function startTimer() {
    const input = document.getElementById('timerInput');

    // Se o cronômetro já estiver pausado, retoma a contagem
    if (paused) {
        interval = setInterval(updateTimer, 1000);
        paused = false;
        return;
    }

    // Se o cronômetro já estiver rodando, ignora o comando de iniciar
    if (interval) return;

    // Captura o valor do input e valida o formato MM:SS
    let timeParts = input.value.split(":");
    if (timeParts.length !== 2) {
        msgReturn("Por favor, insira o tempo no formato MM:SS");
        return;
    }

    // Converte minutos e segundos para total de segundos
    let minutes = parseInt(timeParts[0], 10);
    let seconds = parseInt(timeParts[1], 10);
    if (isNaN(minutes) || isNaN(seconds)) {
        msgReturn("Insira um valor válido de tempo!");
        return;
    }

    // Verifica se o tempo total ultrapassa 2 minutos (120 segundos)

    totalSecondsVer = minutes * 60 + seconds;
    if (totalSecondsVer > 120 && statusCustom == true) {
        msgReturn("Tempo máximo permitido é de 2 minutos!");
        $('#timerInput').val('02:00');
        return;
    } else if (totalSecondsVer < 1 && statusCustom === true) {
        msgReturn("O tempo mínimo permitido é de 1 segundo!");
        $('#timerInput').val('00:01');
        return;
    }

    // Define o total de segundos para o cronômetro
    totalSeconds = minutes * 60 + seconds;

    // Inicia a contagem regressiva
    interval = setInterval(updateTimer, 1000);

}

function updateTimer() {
    const input = document.getElementById('timerInput');

    // Calcula minutos e segundos restantes
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    // Formata o tempo para MM:SS e exibe no input
    input.value = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    // Verifica se o tempo chegou a 0
    if (totalSeconds <= 0) {
        clearInterval(interval);
        interval = null;
        statusCustom = true;
        msgReturn("Aquecimento Concluido");

    } else {
        totalSeconds--;
    }
}

function pauseOrStopTimer() {
    const input = document.getElementById('timerInput');
    if (interval && !paused) {
        // Pausa o cronômetro
        clearInterval(interval);
        interval = null;
        paused = true;
    } else if (paused) {
        // Para e zera o cronômetro se estiver pausado
        totalSeconds = 0;
        input.value = "";
        paused = false;
        statusCustom = true;
    } else {
        // Zera o cronômetro se ele não estiver rodando
        input.value = "";
        totalSeconds = 0;
        statusCustom = true;
    }
}

function insertValue(num) {
    var input = $('#timerInput').val();

    if (interval) return;
    if (input.length > 4) {
        return;
    }
    var valueCurrent = $('#timerInput').val();
    if (valueCurrent.length == 2) {
        var updateValue = valueCurrent + ":" + num
    } else {
        var updateValue = valueCurrent + num
    }
    $('#timerInput').val(updateValue);
}

function choosePreFood(time, power, desc) {
    if (interval) return;

    let minutos = String(time).padStart(2, '0');
    let segundos = '00';

    time = `${minutos}:${segundos}`;
    $('#timerInput').val(time);
    $('.box-view-desc-food').text(desc);
    $('.view-power input[type="radio"]').prop('checked', false);
    $(`#option${power}`).prop('checked', true);

    statusCustom = false;
}

function checkPermission(event) {
    if (interval) return;
    if (!statusCustom) {
        event.preventDefault(); // Impede a troca se statusCustom for falso
        msgReturn("Alimentos pré definidos não podem ser alterados!");
    }
}

function fastStart() {
    if (statusCustom) {

        var input = $('#timerInput').val();
        const inputVer = document.getElementById('timerInput');

        // Captura o valor do input e valida o formato MM:SS
        let timeParts = inputVer.value.split(":");
        let minutes = parseInt(timeParts[0], 10);
        let seconds = parseInt(timeParts[1], 10);
        // Verifica se o tempo total ultrapassa 2 minutos (120 segundos)

        totalSecondsVer = minutes * 60 + seconds;
        if (totalSecondsVer > 91 && statusCustom == true) {
            msgReturn("Tempo máximo permitido é de 2 minutos!");

            $('#timerInput').val('02:00');
            return;
        }


        if (input == "" || input == '00:00') {
            $('#timerInput').val('00:30');
            totalSeconds = 30;
        } else {
            totalSeconds += 30;
        }

        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        input.value = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        $(`#option10`).prop('checked', true);
        startTimer();
    } else {
        msgReturn('Alimentos pré definidos não podem ser alterados!');
    }

}

function msgReturn(msg) {

    $('#msg_text_rs').text(msg);

    $('html, body').animate({
        scrollTop: $('.ct-msg').offset().top
    }, 1000);


    $(".box-msg").fadeIn('slow');

    setTimeout(function () {
        $(".box-msg").fadeOut('slow');
    }, 3500);


}

function closeModalCrud() {
    $('#nome_programa').val("");
    $('#nome_alimento').val("");
    $('#tempo').val("");
    $('#potencia').val('10');
    $('#descricao').val("");
    $('#id_programa').val("");

    $('.bg-color-crud').hide();
}

function openModalCrud() {
    $('.bg-color-crud').show();
}

function validateInclude() {
    var programa = $('#nome_programa').val();
    var alimento = $('#nome_alimento').val();
    var tempo = $('#tempo').val();
    var potencia = $('#potencia').val();
    var descricao = $('#descricao').val();

    if (programa == "" || programa == null || programa == undefined) {
        alert("Nome do programa é obrigatório");
        $('#nome_programa').focus();
        return false;
    }

    if (alimento == "" || alimento == null || alimento == undefined) {
        alert("Nome do alimento é obrigatório");
        $('#nome_alimento').focus();
        return false;
    }

    if (tempo == "" || tempo == null || tempo == undefined) {
        alert("Tempo é obrigatório");
        $('#tempo').focus();
        return false;
    }

    if (tempo == 0 || tempo == "0") {
        alert("O tempo minimo é 1 minuto");
        $('#tempo').focus();
        return false;
    }

    if (tempo > 20) {
        alert("O tempo maximo é 20 minuto");
        $('#tempo').focus();
        return false;
    }

    if (potencia == "" || potencia == null || potencia == undefined) {
        alert("Potencia é obrigatório");
        $('#potencia').focus();
        return false;
    }

    if (descricao == "" || descricao == null || descricao == undefined) {
        alert("Descricao é obrigatório");
        $('#descricao').focus();
        return false;
    }

    return true;
}

function includePreFood() {

    var programa = $('#nome_programa').val();
    var alimento = $('#nome_alimento').val();
    var tempo = $('#tempo').val();
    var potencia = $('#potencia').val();
    var descricao = $('#descricao').val();

    if (validateInclude()) {
        $.ajax({
            url: '/Home/Adicionar',
            type: 'POST',
            data: {
                PROGRAMA: programa,
                ALIMENTO: alimento,
                TEMPO: tempo,
                POTENCIA: potencia,
                DESCRICAO: descricao
            },
            success: function (response) {
                console.log('Sucesso');
                closeModalCrud();
                listarPreFood();
                alert('Sucesso');

            },
            error: function (xhr, status, error) {

                console.error('Erro na requisição AJAX:', error);
            }
        });
    }




}

function deletePreFood(idFood) {
    debugger
    $.ajax({
        url: '/Home/Excluir',
        type: 'POST',
        data: { ID: idFood },
        success: function (response) {
            console.log('Sucesso');
            msgReturn("Programa excluido com sucesso!");
            listarPreFood();
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });

}

function listPreFood() {
    $.ajax({
        url: '/Home/Listar',
        type: 'POST',
        data: {},
        success: function (response) {
            var foodsCt = $('.list-food-ready');
            foodsCt.find('.custom-food').remove();

            var foods = response;
            if (foods.length > 0) {
                for (var i = 0; i < foods.length; i++) {

                    var food = foods[i];

                    var ID = food.id;
                    var PROGRAMA = food.programa;
                    var ALIMENTO = food.alimento;
                    var TEMPO = food.tempo;
                    var POTENCIA = food.potencia;
                    var DESCRICAO = food.descricao;

                    var foodDiv = $('<div class="iten-food custom-food" onclick="choosePreFood("", "", "")">' +
                        '<div class= "view-time-food">' +
                        '<h1 id="time_food_">' + TEMPO + '</h1>' +
                        '<h2 id="desc_time_">Minutos</h2>' +
                        '</div>' +
                        '<div class="view-data-food">' +
                        '<div id="name_program_"><b>Programa:</b> ' + PROGRAMA + '</div>' +
                        '<div id="name_food_"><b>Alimento:</b> ' + ALIMENTO + '</div>' +
                        '<div id="power_food_"><b>Potência:</b> ' + POTENCIA + '</div>' +
                        '<div class="desc_food" id="desc_food_">' +
                        '<b>Instruções:</b> ' + DESCRICAO + ' ' +
                        '</div>' +
                        '</div>' +
                        '<div class="btns-crud-food">' +
                        '<i class="bi bi-pencil-square" onclick="fillAlter(\'' + ID + '\', \'' + PROGRAMA + '\', \'' + ALIMENTO + '\' , \'' + TEMPO + '\', \'' + POTENCIA + '\', \'' + DESCRICAO + '\');"></i>' +
                        '<i class="bi bi-trash-fill" onclick="deletePreFood(\'' + ID + '\')"></i>' +
                        '</div>' +
                        '</div > ');
                    foodsCt.append(foodDiv);
                }

            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX:', error);
        }
    });
}

function updatePreFood() {

    var idFood = $('#id_programa').val();
    var programa = $('#nome_programa').val();
    var alimento = $('#nome_alimento').val();
    var tempo = $('#tempo').val();
    var potencia = $('#potencia').val();
    var descricao = $('#descricao').val();

    if (validateInclude()) {
        $.ajax({
            url: '/Home/Alterar',
            type: 'POST',
            data: {
                ID: idFood,
                PROGRAMA: programa,
                ALIMENTO: alimento,
                TEMPO: tempo,
                POTENCIA: potencia,
                DESCRICAO: descricao
            },
            success: function (response) {
                closeModalCrud();
                listarPreFood();
                console.log('Sucesso');
                msgReturn("Programa alterado com sucesso!");

            },
            error: function (xhr, status, error) {

                console.error('Erro na requisição AJAX:', error);
            }
        });
    }




}

function fillAlter(id, programa, alimento, tempo, potencia, descricao) {
    
    const potencia_p = parseInt(potencia);
    const tempo_t = parseInt(tempo);

    openModalCrud();
    $('#id_programa').val(id);
    $('#nome_programa').val(programa);
    $('#nome_alimento').val(alimento);
    $('#tempo').val(tempo_t);
    $('#potencia').val(potencia_p);
    $('#descricao').val(descricao);
}


function chooseCrud() {
    debugger

    var id = $('#id_programa').val();
    if (id == "" || id == null || id == undefined) {
        includePreFood();
    } else {
        updatePreFood();
    }
}
