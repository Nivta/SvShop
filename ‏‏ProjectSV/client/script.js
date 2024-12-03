
async function routePage(pathFetch,Obeject,stringError)
{
    try{
        const result = await fetch(pathFetch ,{
            method :"POST",
            body : JSON.stringify(Obeject),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const data = await result.json();
        const route = data.route;
        window.location.href = route;
       
    }catch (err){alert (stringError+err)}  
}
function toLoginPage(){
   
    const email= document.getElementById("email").value
    const password= document.getElementById("password").value
    
    userDetails = 
    {
        email :  email,
        password: password,   
    }
    routePage("/",userDetails,"Incorrect details")

}
 function toSignUp()
{
    const user=document.getElementById("username").value
    const email= document.getElementById("email").value
    const password= document.getElementById("password").value
    
    userDetails = 
    {
        user:user,
        email : email,
        password: password,   
    }
    routePage("/signup",userDetails,"Does not meet the requirements")
}
let sum=0;
let cnt=0;
let arrSum=[]
function sumProduct(price)
 {
   sum+=price
   cnt++
   console.log(sum,cnt)
   localStorage.setItem("totalProducts",cnt);
   localStorage.setItem("totalPrice",sum);
}

function createDiv(product) {
    const productdiv = document.getElementById("content");
    
    
    // יצירת כפתור
    const myButton = document.createElement("button");
    myButton.textContent = "Click me";
    
    // הוספת מאזין ללחיצה
    myButton.addEventListener("click", function() {
        sumProduct(product.price);
    });
    
    // הוספת תכונות אם יש צורך
    myButton.setAttribute("name", "clickProduct");
    
    // יצירת div חדש
    const myDiv = document.createElement("div");
    myDiv.textContent = "Product name: " + product.name + " ||| " + "Product price: " + product.price;
    
    // הוספת כפתור ל-div
    myDiv.appendChild(myButton);
    
    // הוספת div ל-content
    productdiv.appendChild(myDiv);
}


 async function getProducts()
 {
    try{
    const result = await fetch('/products')
    const data = await result.json()
    data.forEach((product) => 
    {
        createDiv(product)   
    });
}catch(err){console.log("error"+err)};
 }
async function selectProduct()
{
    const productdiv = document.getElementById("content");
    productdiv.innerHTML=""
    const filter= document.getElementById("select").value
    try{
        const result= await fetch('/products')
        const data = await result.json();
        
        if(filter==="byPrice")
        {
            const sortProducts=data.sort((a,b)=>a.price-b.price)
            sortProducts.forEach((product)=>{ createDiv(product)})
        
        }
        else
        {
            const sortProducts=data.sort((a,b)=>{
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            sortProducts.forEach((product)=>{ createDiv(product)})
        }

    }catch(err){console.log("error"+err)
    }
}

function convertButtonToLink(buttonId, url) 
{
    
    const button = document.getElementById(buttonId); 
    const link = document.createElement('a');
    link.href = url;
    link.textContent = button.textContent;
    link.className = button.className; // לשמור על הסטיילים
    button.parentNode.replaceChild(link, button);
   
}
function  printPrice() {
    const cnt = localStorage.getItem("totalProducts")
    const sum = localStorage.getItem("totalPrice")
    const totalProducts = document.getElementById("totalProducts");
    const totalPrice = document.getElementById("totalPrice");
    totalProducts.innerHTML += cnt;
    totalPrice.innerHTML += sum;
}





 

