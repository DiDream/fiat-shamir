'use strict'
var PRIME_NUMBERS = [2,3,5,7,11,13,17,19,23];
var N = 100;
Number.prototype.isOdd= function(){
    return this%2 != 0;
}
String.prototype.toNumber = function(){
    return Number(this);
}
function fastExponentiation(base, b, m){ //  base=> base de exponent, b=> exponente, m=> modulo

    var x = 1;
    var y = base%m;
    // var logs = [];
    // logs.push({y,b,x})
    while(b>0 && y>1){

        if(b.isOdd()){
            x = (x*y)% m;
            b--;
            // logs.push({y:'',b,x})
        }else {
            y= (y*y)%m;
            b/=2;
            // logs.push({y,b,x:''})
        }

    }
    // return {logs, value: x};
    return x;
}
function mcd(a,b){ //Solo para numeros enteros positivos
    if(a<1 || b<1) return false;
    while(a != b){
        if(a > b) a-=b;
        else b-=a;
    }
    return a;
}
Number.prototype.isCoprimeOf = function(number){
    return mcd(this, number) == 1 ;
}
Number.prototype.coprimeNumbers = function() {
    var coprimes = [1];
    for(var i=2; i<this; i++){
        if(this.isCoprimeOf(i)) coprimes.push(i);
    }
    return coprimes;
}
Number.prototype.isPrime = function(){
    if(this===1) return true;

    for(var i=0; i<PRIME_NUMBERS.length; i++){
        //== el numero es primo STOP
        //% == 0 no es primo STOP
        //% != 0 no es divisible ++
        if(this==PRIME_NUMBERS[i]) return true;

        if(this%PRIME_NUMBERS[i] == 0) return false;
    }
    var minusOne = this-1;
    var exp= Math.floor( (minusOne)/2 );
    var maybe = false;
    for(var i=0; i<N ; i++){
        var a = Math.floor(Math.random()* minusOne + 1);

        var r = fastExponentiation(a,exp,this);

        if(r == minusOne) maybe=true;
        else{
            if(r!=1) return false
        }
    }

    return maybe;
    // maybe == true si ha habido algun r == this-1 (-1)
    // maybe == false si todos todos los r's han sido UNOS
}
// A REALIZAR
// $('form').on('change','input',function(){
//     $('.selected').removeClass('selected');
//     $('input[type="submit"]').addClass('')
//     // $( '.' + $(this).attr('id') ).addClass('selected');
// });

function iterationHTML(a){
    var res = '';
    for(var i=0; i<a; i++){

        res += `<table class="iteration center" id="${i}-iteration">
          <tr>
            <td>
              <div class="content">
                <div class="text-over">Compromiso secreto de A</div>
                <div class="center-v">0 <
                  <input type="number" placeholder="x" class="x-input" min="1" max="${n-1 || ''}" required>
                  < <span class="n-value">N</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="content">
                <div class="text-over">Testigo: A envia a B</div>
                <div class="center-v">
                  <div class="value" id="a${i}-value">a</div>= x² % N
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="content">
                <div class="text-over">Reto: B envía a A</div>
                <div class="option-2 relative">
                  <input class="e-input" id="e${i}-0" name="e${i}-input" type="radio" checked value="0" required="true">
                  <label for="e${i}-0">e = 0</label>
                </div>
                <div class="option-2 relative">
                  <input class="e-input" id="e${i}-1" name="e${i}-input" value="1" type="radio">
                  <label for="e${i}-1">e = 1</label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="content">
                <div class="text-over">Respuesta: A envia a B</div>
                <div class="option-2 e${i}-0">
                    <div class="equation left">
                        <span class="y-value">y</span> = x % N
                    </div>
                </div>
                <div class="option-2 e${i}-1">
                    <div class="equation right">
                        <span class="y-value">y</span> = (x * s) % N
                    </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="content verification">
                <div class="text-over">Verificacion de lo recibido</div>
                <div class="option-2 e${i}-0">
                    <div class="equation left">y² % N = a % N</div>
                </div>
                <div class="option-2 e${i}-1">
                    <div class="equation right">
                        y² % N = (a * v) % N
                    </div>
                </div>
              </div>
            </td>
          </tr>
        </table>`;
    }
    $('#iterations').html(res);
};
(function(){
    iterationHTML($('#i-input').val());
})();
var p,q,n;
$('#p-input,#q-input').on('input',function(){
    
    if(!$(this).val().toNumber().isPrime()) {
        $(this)[0].setCustomValidity('Inserta un numero primo');
        return false;
    }else {
        $(this)[0].setCustomValidity('');
    }
    if($('#p-input').val()!='' && $('#q-input').val()!=''){
        p = $('#p-input').val().toNumber();
        q = $('#q-input').val().toNumber();
        n = p*q;
        // $('.n-value').text(n);
        $('#s-input').attr({"max":n-1});
        $('.x-input').attr({"max":n-1});
    }else {
        n = 0;
    }
    // }else {
    //     $('.n-value').text('N');
    // }

});
$('#s-input').on('input',function(){
    if($(this).val().toNumber().isCoprimeOf(n)){
        $(this)[0].setCustomValidity('');
    }else{
        $(this)[0].setCustomValidity(`Inserta un numero coprimo de ${n}`);
        return false;
    }
});
function renderize(values){
    var {p,q,n,v,s,it} = values; //object destructuring
    $('#n-value').text(`N=${n}`);
    $('#v-value').text(`V=${v}`);
    for(var i=0; i<it.length; i++){
        var e = it[i].e;
        $(`.e${i}-${e}`).addClass('selected')
                        .find('.y-value')
                            .addClass('value')
                            .text(`y=${it[i].y}`);
        $(`#a${i}-value`).text(`a=${it[i].a}`);

        $('.verification .selected .equation').addClass(it[i].isValid? 'valid': 'not-valid');
    }
}
function reset(){
    $('.selected').removeClass('selected')
                    .find('.value')
                        .removeClass('value');
    $('.equation').removeClass('valid not-valid');
};
function main(e){
    e.preventDefault();
    reset();
    p = $('#p-input').val().toNumber();
    q = $('#q-input').val().toNumber();
    n = p*q;
    var s = $('#s-input').val().toNumber();
    var it = new Array($('#i-input').val().toNumber());
    for(var i=0; i<it.length; i++){
        var iteration = $(`#${i}-iteration`);
        it[i] = {
            x: iteration.find('.x-input').val().toNumber(),
            e: iteration.find('.e-input:checked').val().toNumber()
        }
    }
    var r = fiatShamir({p,q,n,s,it});
    console.log(r);
    renderize(r);
}

// values => {p: ,q: ,n: ,s: ,it:[{x: , e: }...]} Todos los valores tipo Number
function fiatShamir(values){
    var {p,q,n,s,it} = values; //object destructuring
    var v = (s ** 2)% n;
    values['v'] = v;
    for(var i=0; i<it.length; i++){
        var iter = it[i];
        iter['a'] = (iter.x ** 2) %n;
        if(iter.e == 0){
            iter['y'] = iter.x % n;
            iter['c'] = {
                m2: iter.a % n
            }
        }else{
            iter['y'] =(iter.x * s) % n;
            iter['c'] = {
                m2: (iter.a * v) % n
            }
        }
        // c=> comprobacion
        // m1 => miembro 1 de ecuacion
        // m2 => miembro 2 de ecuacion

        iter.c['m1'] = (iter.y ** 2) % n;
        iter['isValid'] = iter.c.m1 == iter.c.m2;
    }
    return values;
}
