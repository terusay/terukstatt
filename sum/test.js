//window.addEventListener("load", function()
//{
 const showMessage = () => {
      const textbox = document.getElementById("input-message");
      const inputValue = Number(textbox.value);
      let output;
      if(inputValue<1)
      {
        output ="１以上の数を入力してください。"
      }
      else
      {
      //テキストボックスの値を使って、出力するメッセージを生成する
        output = inputValue*(inputValue+1)/2;
      }  
      //出力用のp要素にメッセージを表示
      document.getElementById("output-message").innerHTML = output;
    }
//})
	
