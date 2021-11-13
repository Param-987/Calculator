var str = "",paro = new Array,operator = ['+','-','*','/'],op2 =['+','*','/','!','%'] ,erase = false;

function exp(char){
  if(str =='NaN' && char !='rem') return;
  if(char === '√') {
    if(str.match(/[0-9π!]$/)) str = str.concat('*');
    str = str.concat('√'); char = '('
  }
  if(char =='%'){
    if(str.match(/[^0-9π)]$/))  return;
    
    
  }
 
  str = validation(char);
  if(!str && op2.includes(char)) return ;
  if(char.toString().match(/[0-9π]/)  && str.match(/[)π]$/))  str = str.concat('*') // ensure 5π and )5 is written as 5*π and )*5
  if(char ==='.' && str.match(/[.]\d*$/)) return
  if(char === '('){ paro.push('(');  // to get record of  ()
  if(str.match(/[0-9π!]$/)) str = str.concat('*');  // to ensure 4( is written as 4*(
  
}
else if(char ===')' && (paro.length === 0 || str.match(/[(]$/))) return   // did take ) as input if corresponding ( didnot sustain
else if(char === ')') paro.pop() ;   // erase ( to match )


if(operator.includes(char) && operator.includes(str.charAt(str.length-1))) str = str.slice(0,str.length-1);  // one operator at a time
  if(char === 'err') str = str.slice(0,str.length-1);  // erase a character
  else if( char ==='rem') str ="";
  else str = str.concat(char);  // add a charcter to string
  document.querySelector('.input').innerHTML = str;
}

function Ans(){
    
    if(str.match(/!/)) str = fact(str); 
    if(str.match(/√/)) str= sqrt(str);
    str = str.replace(/\^/g,'**');
    str = str.replace(/%/g,'/100');
    if(str.match(/\dπ/)) str = str.replace('π',`*${Math.PI}`)
    str = str.replace(/π/g,Math.PI.toString())
    try{
      eval(str)
      
    }catch(e){
      str ='NaN'
    }
    if(str!='NaN'){
      str = eval(str);
      str = str.toString();
    }
    if(str == 'NaN' || !str) document.querySelector('.input').innerHTML ='Error'
    else document.querySelector('.input').innerHTML = str ;
   
}
function validation(char){
  if(str.match(/[!%]$/) && char >=0 && char <= 9) str =  str.concat('*') // ensure !9 should be !*9
  return str;
}

function sqrt(str){

  while(str.match(/√/)){
    var a = str.indexOf('√'),b;
    var st = new Array();

    for(b=a+1;b<str.length;b++){
      if(str[b]=='(') st.push('(');
      else if(str[b]==')') st.pop();

      if(st.length==0) break;
    }
    str= `${str.slice(0,a)}${str.slice(a+1,b)}**0.5${str.slice(b)}`;
  }
  return str;
}

function fact(str){
  while(str.match(/\d*!/)){
    var a = str.match(/\d*!/);
    a=Number(a[0].slice(0,a[0].length-1));
    var res= 1;
    while(a>0){
      res*=a;
      a--;
    }
    str = str.replace(/\d*!/,`${res}`);
  }
  return str;
}

document.addEventListener('keydown',(e)=>{
if(e.code ==='Backspace') exp('err');
})

document.addEventListener('keypress',(e)=>{
  var c= e.charCode;
  var a = [40,41,42,43,45,47,46,37,33];

  if( (c >= 48 && c <= 57) || a.includes(c)){ exp(String.fromCharCode(c))
  }
  if(c == 13 && str) Ans();
},false)



// ensure there must be a operator or there should be no string  before ( 
// - pe work krna h 
