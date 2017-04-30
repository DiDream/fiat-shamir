'use strict'
var PRIME_NUMBERS = [2,3,5,7,11,13,17,19,23];
var N = 100;
Number.prototype.isOdd= function(){
    return this%2 != 0;
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
function mcd(a,b){
    while(a != b){
        if(a > b) a-=b;
        else b-=a;
    }
    return a;
}
Number.prototype.isCoprime = function(number){
    return mcd(this, number) == 1 ;
}
Number.prototype.coprimeNumbers = function() {
    var coprimes = [1];
    for(var i=2; i<this; i++){
        if(this.isCoprime(i)) coprimes.push(i);
    }
    return coprimes;
}
Number.prototype.isPrime = function(){
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
function iterations(a){
    var res = '';
    for(var i=0; i<a; i++){
        res += `
        <table class="center iteration" id="${i}-iteration">
          <tr>
            <td>Compromiso secreto</td>
            <td>
              <input type="text" placeholder="x" class="x-input">
            </td>
          </tr>
          <tr>
            <td>Testigo: A envia a B</td>
            <td>
              <div class="box">
                <div class="box" class="a-value">a</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Reto: B envia a A</td>
            <td>
              <input type="text" placeholder="e" class="e-input">
            </td>
          </tr>
          <tr>
            <td>Respuesta: A envia a B</td>
            <td>
              <div class="box">
                <div class="box" class="y-value">y</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">verificacion</td>
          </tr>
        </table>`
    }
    $('#iterations').html(res);
}
function fiatShamir(){
    var p = $('#p-input');
    var q = $('#q-input');
    var s = $('#s-input');
    var i = $('#i-input');
}
