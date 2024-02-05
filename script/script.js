const form=document.querySelector("#addProduct");
let datas=[];
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const {title,price,count}=event.target;
    const data={
        title: title.value,
        price: price.value,
        count: count.value
    }
    datas.push(data);
    console.log(datas)
    console.log(event.target.title.value);
    console.log(event.target.price.value);
    console.log(event.target.count.value);
    rerender();
    event.target.reset();
})

function createProductCart(title,price,count){
const container=document.createElement("div");
const titleNode=document.createElement("p");
const priceNode=document.createElement("p");
const countNode=document.createElement("p");
const resultNode=document.createElement("p");
const btnNode=document.createElement("button");
const btnNodePlus=document.createElement("button");
const btnNodeMinus=document.createElement("button");


container.setAttribute("class","product_cart");
container.style.borderColor =count==0? "#c0392b":"#16a085";

btnNode.innerText="Удалить";
countNode.innerText= count == 0 ?  `Количевство товара : Вы не указали количевство `:`Количевство товара : ${count} `;
titleNode.innerText=`Имя товара: ${title}`;
priceNode.innerText=`Цена за еденицу товара: ${price}`;
resultNode.innerText=`Итоговая сумма за товар ${price*count} евро`;
btnNodePlus.innerText="+";
btnNodeMinus.innerText="-";
btnNodePlus.addEventListener("click",()=>{
    count++;
    resultNode.innerText=`Итоговая сумма за товар ${price*count} евро`;
    countNode.innerText= count == 0 ?  `Количевство товара : Вы не указали количевство `:`Количевство товара : ${count} `;
    container.style.borderColor =count==0? "#c0392b":"#16a085";
})
btnNodeMinus.addEventListener("click",()=>{
    count--;
    if(count>=0){
    countNode.innerText= count == 0 ?  `Количевство товара : Вы не указали количевство `:`Количевство товара : ${count} `;
    container.style.borderColor =count==0? "#c0392b":"#16a085";
    resultNode.innerText=`Итоговая сумма за товар ${price*count} евро`;}
    else{count==0}
})

container.append(titleNode,priceNode,countNode,btnNodePlus,btnNodeMinus,resultNode,btnNode);
btnNode.addEventListener("click", ()=>{
remove(title);
})
return container;
}

function rerender(){
    const cart=document.querySelector("#cart")
    cart.innerText="";
    if(datas.length==0){
        const nicht=document.createElement("p");
        nicht.classList.add("kein");
        nicht.innerText="Товаров нет";
        cart.append(nicht);
        return cart;}
    else{
    datas.forEach(({title,price,count})=>cart.append(createProductCart(title,price,count)))
    return cart;
    }
    
}

function remove(title){
    const newProductsArray=datas.filter((product)=>product.title!==title);
    datas=newProductsArray;
    rerender();
}