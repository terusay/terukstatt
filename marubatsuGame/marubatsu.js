//let asd = ["abc", "fgh"]
//console.log(asd.length)
let nanmoku = 3
let nokorimasu = nanmoku * nanmoku
let counter = 0
let player = 0
let screen = [
  [{"value": 0, "id": "00"},{"value": 0, "id": "01"},{"value": 0, "id": "02"}],
  [{"value": 0, "id": "10"},{"value": 0, "id": "11"},{"value": 0, "id": "12"}],
  [{"value": 0, "id": "20"},{"value": 0, "id": "21"},{"value": 0, "id": "22"}]
]
//marubatsuを押したときに、入れた順番と、誰が、どのマスに入力したのかの情報を、
//historyに追加する。
//ここでの追加するとは、
//DoOverButtonを
let Histories = []
for(var m = 0; m < 9; m++){
  Histories.push({"player": 0, "id": "00", "msg":[]})
}
console.log(Histories[0])
//let m = 1
//let n = 2
//console.log(screen[m][n])
//let screen2 ={"00":0, "01":1, "02":2 }
//console.log(screen2["02"])
initialize()
//console.log(screen[m][n])

const MMM = (m,n) => {
 //console.log(screen[m][n].value)
 //ガード句
 if(screen[m][n].value != 0){return} 
 if(player == 0){return} 
 
 let turnedPlayer = player
 let resultMsg = ""
  
 if(player == 1){
   //document.getElementById(screen[m][n].id).value = "○"
   screen[m][n].value = 1
   player = 2
   resultMsg="バツの番です"
 }
  else if(player == 2){
   //document.getElementById(screen[m][n].id).value = "×"
   screen[m][n].value = 2
   player = 1
   resultMsg="マルの番です"
 }
  let res = check(m,n)
  if(res.turn <= 0){return} 
  
  //console.log(res)
  
  Histories[res.turn - 1].player = turnedPlayer
  Histories[res.turn - 1].id = String(m) + String(n)
  
  
  //console.log(Histories)
  
 
  
  if(res.result == 1){
    player = 0
    resultMsg="マルの勝利！"
  }
  else if(res.result == 2){
    player = 0
    resultMsg="バツの勝利！"
  }
  else if(res.nokorimasu == 0){
    player = 0
    resultMsg="引き分けです"
  }
  
  Histories[res.turn - 1].msg[0] = resultMsg  
   //表示します
  display(Histories , res.turn - 1)
  
  
}

//ゲームが始まる前をplayer == 0、
//スタートボタンを押したら、ゲームが始まり、player == 1、
//まるばつボタンを押したとき、player == 0であれば、ガード
//player == 1であれば、○が入力され、player = 2となる。
//player == 2であれば、×が入力され、player = 1となる。
//勝負がついたときは、勝ったplayerの数値が負になる。
//
//まるが勝ったときは、まるの勝利！、と表示する。
//バツが勝ったときは、バツの勝利！、と表示する。
//まるをかいたあと、ばつをかく
//ばつをかいたあと、まるをかく
//カウントする変数を用意して、その値を０とする→１回目のボタンが押される→関数が呼ばれる
//→counterの値が偶数ならば、まるをかく 

const StartButton = () =>{
  initialize()
  Histories[0].msg[0]="マルの番です"
  Histories[0].player = 0
  display(Histories , 0)
  player = 1
  
}

const EndButton = () =>{
  if(player == 0){return}
  Histories[0].msg[0]="引き分けです"
  display(Histories , 0)
  player = 0
}

//DoOverButtonを押す時の条件
//DoOverButtonを押すと、一個前の状態にもどる

const DoOverButton = () =>{
  //if(player == 0){return}
  if(nokorimasu == nanmoku * nanmoku){return}
  nokorimasu += 1
  let turn = nanmoku * nanmoku - nokorimasu
  
  console.log(turn)
  
  let m = Math.floor(Number(Histories[turn].id)/10)
  let n = Number(Histories[turn].id)%10
  screen[m][n].value = 0
  player = Histories[turn].player 
  Histories[turn].player = 0
  Histories[turn].msg = []
  if(turn == 0){
    player = 1
    Histories[turn].msg[0] = "マルの番です"
  }
  console.log(Histories)
  display(Histories , turn) 
  //console.log(Histories[turn])
  //console.log(m)
  //console.log(n)
  
}

function initialize(){
  document.getElementById("00").value = ""
  document.getElementById("01").value = ""
  document.getElementById("02").value = ""
  document.getElementById("10").value = ""
  document.getElementById("11").value = ""
  document.getElementById("12").value = ""
  document.getElementById("20").value = ""
  document.getElementById("21").value = ""
  document.getElementById("22").value = ""
  for(var m = 0; m < 3; m++){
    for(var n = 0; n < 3; n++){
      screen[m][n].value = 0
    }
  }
  document.getElementById("result").innerHTML="スタートボタンを押すとゲームが始まります。"
  player = 0
  nokorimasu = nanmoku * nanmoku
}

//勝負がついたら勝ったplayerの番号が負になる、勝負がついていなければあと何マス置けるかを返す
//勝敗がついていない状態で（引き分けなど）ゲームが終わったら0
//nokorimasu == 0 引き分けとする
function check(m,n){
  nokorimasu = nokorimasu - 1
  let ret = {"nokorimasu" : nokorimasu, "result" : 0 ,"turn" : nanmoku * nanmoku - nokorimasu}
  //ガード節
  if(screen[m][n].value == 0){ return ret }
  let ren = 0
  ren = up(ren,m,n)//上に連続していた数を返す
  if(ren <= nanmoku - 2){
    ren = down(ren,m,n)//下に連続していた数を返す
  }
  if(ren == nanmoku - 1){
    ret.result = screen[m][n].value
    return ret
  }
  
  ren = 0
  ren = left(ren,m,n)//左に連続していた数を返す
  if(ren <= nanmoku - 2){
    ren = right(ren,m,n)//右に連続していた数を返す
  }
  if(ren == nanmoku - 1){
    ret.result = screen[m][n].value
    return ret
  }
  
  ren = 0
  ren = upleft(ren,m,n)//左上に連続していた数を返す
  if(ren <= nanmoku - 2){
    ren = downright(ren,m,n)//右下に連続していた数を返す
  }
  if(ren == nanmoku - 1){
    ret.result = screen[m][n].value
    return ret
  }
  
  ren = 0
  ren = upright(ren,m,n)//右上に連続していた数を返す
  if(ren <= nanmoku - 2){
    ren = downleft(ren,m,n)//左下に連続していた数を返す
  }
  if(ren == nanmoku - 1){
    ret.result = screen[m][n].value
    return ret
  } 
  return ret
}

//上に連続していた数を返す
function up(ren,m,n){
  //ガード節（無限ループしないために必要）
  if(m-1 < 0){ return ren }
  if(screen[m-1][n].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = up(ren,m-1,n)
  return ren
}

//下に連続していた数を返す
function down(ren,m,n){
  //ガード節
  if(m+1 >= 3){ return ren }
  if(screen[m+1][n].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = down(ren,m+1,n)
  return ren
}

//左に連続していた数を返す
function left(ren,m,n){
  //ガード節（無限ループしないために必要）
  if(n-1 < 0){ return ren }
  if(screen[m][n-1].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = left(ren,m,n-1)
  return ren
}

//右に連続していた数を返す
function right(ren,m,n){
  //ガード節
  if(n+1 >= 3){ return ren }
  if(screen[m][n+1].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = right(ren,m,n+1)
  return ren
}

//左上に連続していた数を返す
function upleft(ren,m,n){
  //ガード節（無限ループしないために必要）
  if(m-1 < 0 || n-1 < 0){ return ren }
  if(screen[m-1][n-1].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = upleft(ren,m-1,n-1)
  return ren
}

//右下に連続していた数を返す
function downright(ren,m,n){
  //ガード節
  if(m+1 >= 3 || n+1 >=3){ return ren }
  if(screen[m+1][n+1].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = downright(ren,m+1,n+1)
  return ren
}

//右上に連続していた数を返す
function upright(ren,m,n){
  //ガード節（無限ループしないために必要）
  if(m-1 < 0 || n+1 >= 3){ return ren }
  if(screen[m-1][n+1].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = upright(ren,m-1,n+1)
  return ren
}

//左下に連続していた数を返す
function downleft(ren,m,n){
  //ガード節
  if(m+1 >= 3 || n-1 < 0){ return ren }
  if(screen[m+1][n-1].value != screen[m][n].value){ return ren }
  
  ren += 1
  ren = downleft(ren,m+1,n-1)
  return ren
}
//document.getElementById("result").innerHTML="マルの番です"
function display(data, number){
  //console.log("display: "+String(number))
  //console.log(data)
  //console.log("...")
  
  let length = nanmoku * nanmoku
  for(var i = 0; i < number + 1; i++){
    let mark = ""
    if(data[i].player == 1){
      mark = "○"
    }
    else if(data[i].player == 2){
      mark = "×"
    }
    //console.log(i, data[i], mark)

    document.getElementById(data[i].id).value = mark
    if(data[i].msg.length > 0){
      document.getElementById("result").innerHTML= data[i].msg[0]
    }
    
  }
}
//次は勝負がついたのに、待ったができるようにする！
//terukstatt
