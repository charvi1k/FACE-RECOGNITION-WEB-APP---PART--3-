Webcam.set({
    width:350,
    height:350,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("webcam");

Webcam.attach( '#webcam' );

function takesnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });

}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NIN98A70y/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!!!");
}

function identifysnapshot(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}