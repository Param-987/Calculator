var str = "",paro = new Array,operator = ['+','-','*','/'],erase = false;

function exp(char){
  if(!str && operator.includes(char)) return;
  if(char.toString().match(/[0-9π]/)  && str.match(/[)π]$/))  str = str.concat('*')
  if(char ==='.' && str.match(/[.]\d*$/)) return
  if(char === 'err' && erase) {str=''; erase = false} // to remove all character after press =
  if(erase) return // after equal button press , first remove the output
  if(char === '('){ paro.push('('); 
  if(str.match(/[0-9]$/)) str = str.concat('*');
}// to get record of  ()
else if(char ===')' && (paro.length === 0 || str.match(/[()]$/))) return   // did take ) as input if corresponding ( didnot sustain
else if(char === ')') paro.pop() ;   // erase ( to match )


if(operator.includes(char) && operator.includes(str.charAt(str.length-1))) str = str.slice(0,str.length-1);  // one operator at a time
  if(char === 'err') str = str.slice(0,str.length-1);  // erase a character
  else str = str.concat(char);  // add a charcter to string
  document.querySelector('.input').innerHTML = str;
}

function Ans(){
    str = str.concat('?');
    if(str.match(/\dπ/)) str = str.replace('π','*3.14')
    str = str.replace(/π/g,'3.14')
    var x=0,stack = new Array;
    while(str[x]!='?'){
              
              if(str[x] === '(') stack.push(x);
              else if(str[x] === ')'){ var res = evaluate(str.slice(stack[stack.length-1]+1,x)); 
                  res = res.toString()
              str = str.slice(0,stack[stack.length-1]).concat(res,str.slice(x+1))
              x =  Number(stack[stack.length-1])-1;
              stack.pop()
      }
      x++;
      }
    str = (evaluate(str.slice(0,str.length-1))).toString();
    if(str == 'NaN') document.querySelector('.input').innerHTML ='Error'
    else document.querySelector('.input').innerHTML = str ;
    erase = true;
    
}


function evaluate(str) {
  str = str.replace(/-/g,'+-')
  var arr1 = str.match(/[^()+*/]*/g)
  var arr2 = str.match(/[()*+/]/g);
  var arr1 = arr1.filter((num)=> num !='')
  var num = arr1.map((num) => Number(num));
  var res = new Array();
  res.push(num[0]);
  for (x in arr2) {
    x = Number(x);
    if(arr2[x] === '-') { res.push('+'); res.push(-1*num[x + 1]); }
    else if(arr2[x] === '/') { res.push('*'); res.push(1/num[x + 1]); }
    else { res.push(arr2[x]); res.push(num[x + 1]); }
  }
  var len = res.length;
  for (var x = 0; x < len; x++) {
    // multiplication
    if (res[x] === "*") {
      res[x - 1] = res[x - 1] * res[x + 1];
      res.splice(x, 2);
      x--;
    }
  }
  len = res.length;
  var result = 0;
  for (var x = 0; x < len; x++) {
    if (res[x] !== "+") {
      result += res[x];
    }
  }
  return result;
}

// function validati



document.addEventListener('keypress',(e)=>{
  var c= e.charCode;
  var a = [40,41,42,43,45,47,46,37,33];

  if( (c >= 48 && c <= 57) || a.includes(c)){ exp(String.fromCharCode(c))
  }
  if(c == 13 && str) Ans();
},false)