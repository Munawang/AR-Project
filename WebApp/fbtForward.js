//FBT Apartment Zone
document.getElementById('imgfbt00').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt00').id);
} , false);

document.getElementById('imgfbt01').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt01').id);
} , false);

document.getElementById('imgfbt02').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt02').id);
} , false);

document.getElementById('imgfbt03').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt03').id);
} , false);

document.getElementById('imgfbt04').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt04').id);
} , false);

document.getElementById('imgfbt05').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt05').id);
} , false);

document.getElementById('imgfbt06').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt06').id);
} , false);

document.getElementById('imgfbt07').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt07').id);
} , false);

document.getElementById('imgfbt08').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt08').id);
} , false);

document.getElementById('imgfbt09').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt09').id);
} , false);

document.getElementById('imgfbt10').addEventListener('click' , function(){
    forwardFunction(document.getElementById('imgfbt10').id);
} , false);

function forwardFunction(val){
    localStorage.name = val;
    window.location = "showInfo.html"
} 
