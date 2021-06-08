const weatherForm = document.querySelector("form");
console.log(weatherForm)
const search = document.querySelector("input");
console.log(search)
  
  

weatherForm.addEventListener("submit",(e)=>{
      
      e.preventDefault();
      const location = search.value;

      fetch("http://localhost:3500/weathers?address="+location)
       .then(response =>response.json())
       .then((data)=>{
         if(!data){
          return "Data are not here"
         }
         console.log(data)
        }).catch(error =>{
           console.log("Oups....problem with url");
        })


})