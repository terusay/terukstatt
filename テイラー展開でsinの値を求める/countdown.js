const Calc = () => { 
  let deg = Number(document.getElementById("inp-mess1").value);
  let n = Number(document.getElementById("inp-mess2").value);
  
  let rad = Math.PI*deg/180.0
  
  
  
  function factorialize(k) {
    var j = 1;
    for(var t = 1; t <= k; t++){
      j *= t;
    }
    return j;
  }
  
  let total = 0
  
  for(let i = 0; i < n; i++){
    
   
    total += ((-1) ** i)*(rad ** (2*i+1)) / factorialize(2*i+1)
  
  }
  console.log(deg)  
  console.log(n)

  
 
    
  //let res = values[0] + values[1] + values[2] + values[3] + values[4] 
   
 //初期値を定義する→　res += 1　（res = res+1）
  //res += values[0]
  //res += values[1]
  //res += values[2]
  //res += values[3]
  //res += values[4]

  console.log(total)
 
	let res = document.getElementById("result");
  res.innerHTML = total
 
}
