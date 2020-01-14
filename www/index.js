function sendJSON(){ 
    jQuery.support.cors = true;
    let result = document.querySelector('.result'); 
    let nome = document.querySelector('#nome'); 
    let descricao = document.querySelector('#descricao'); 
    let preco = document.querySelector('#preco'); 
       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:8080/produto/add"; 

    // open a connection 
    xhr.open("POST", url, true); 


    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); 

    // Create a state change callback 
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            // Print received data from server 
            result.innerHTML = this.responseText; 

        } 
    }; 

    // Converting JSON data to string 
    var data = JSON.stringify({ "id":"100", "nome": nome.value, "descricao": descricao.value, "preco": preco.value }); 

    console.log(data);
    // Sending data with the request 
    xhr.send(data); 
} 


