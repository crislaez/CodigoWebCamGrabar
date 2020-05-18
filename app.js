'use strict'

function cargar(){
    let video = document.querySelector('#video');
    let bGravar = document.querySelector('#bGravar');
    let bParar = document.querySelector('#bParar');    
    let bDescargar = document.querySelector('#bDescargar');
    //creamos un array donde guardaremos los datos del video/audio
    let array = [];
    let mediaReacorder;
    bDescargar.style.display = 'none';
    bParar.disabled = true;

    //cuando clickamos en el boton grabar
    bGravar.addEventListener('click',function(){        
        alert('Iniciada la gravacion');
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
        .then(funcionGravar)
        .catch(err => {
            console.log(err.message)
        });
        //hacemos el boton para disabled false para poder parar la gravacion
        bParar.disabled = false;
    });    

    //cuando pinchamos en el boton parar
    bParar.addEventListener('click',function(){   
        alert('Parada gravacion');
        //paramos la gravacion
        mediaReacorder.stop();
        //no le pongo block poruqe alñ estar en una etiqueta a y ponerle block, se pondra abajo
        bDescargar.style.display = '';
    });

    //funcion que recibe lo grabado que esta dentro del then
    function funcionGravar(stream){
        //a la varaible video, le asignamos al src lo que esta recibiendo, es decir video y audio
        video.srcObject = stream;

        //varaible para chrome;
        let options = {mimeType: 'video/webm;codecs=h264'};
        //si el navegador no lo soporta...
        if(!MediaRecorder.isTypeSupported('video/webm;codecs=h264')){
            //variable con valor para firefox
            options = {mimeType: 'video/webm;codecs=vp8'}
        }

        mediaReacorder = new MediaRecorder(stream,);        
        //inicia la grabacion
        mediaReacorder.start();

        mediaReacorder.on = function(event){
            //lo guaerdamos en el array
            array.push(event.data);
        }

        //evento qeu salta cuando para
        mediaReacorder.onstop = function(event){
            let blob = new Blob(array, {type: 'video/webm'});
            //limpoarmos el array
            array = [];
            //al enlace le damos un href y un atribute download
            bDescargar.href = window.URL.createObjectURL(blob);
            bDescargar.download ='video_record.webm';
        };

    };

};



