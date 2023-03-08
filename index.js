const loadData=async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res= await fetch(url);
    const data= await res.json();
    displayPhone(data.data,dataLimit);
}
const displayPhone=(phones,dataLimit)=>{
    const phoneContainer=document.getElementById("phone-container");
    phoneContainer.innerText="";
    // show all button is here start
    const showAll=document.getElementById("show-all");
    if (dataLimit && phones.length>10) {
        phones=phones.slice(0,10);
        showAll.classList.remove("d-none")
        
    } 
    else {
        showAll.classList.add("d-none")
        
    }
    // search to no found phone
    const noPhone=document.getElementById('no-found-message');
 if (phones.length===0) {
    noPhone.classList.remove("d-none")
    
 } else {
    noPhone.classList.add("d-none")
    
 }
    phones.forEach(phone => {
        const divBody=document.createElement("div");
        divBody.classList.add("col")
        divBody.innerHTML=`
        <div class="col">
        <div class="card">
          <img src="${phone.image}" class="card-img-top w-50" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
        `
        phoneContainer.appendChild(divBody)
    });
    toggleSpinner(false)
}
const processSearch=dataLimit=>{
    toggleSpinner(true)
    const searchField=document.getElementById("search-field");
    const searchText=searchField.value;
    // toggle spinner
    // search something
    loadData(searchText,dataLimit)

}
// button search
document.getElementById("search-button").addEventListener("click",function(){
    processSearch(10);
})
document.getElementById("search-field").addEventListener("keypress",function(event){
    if(event.key==='Enter'){
        processSearch(10)
    }
})
// show all button
document.getElementById("button-show-all").addEventListener("click",function(){
    processSearch()
})
const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove("d-none")
        
    }
     else {
        loaderSection.classList.add("d-none")
        
    }
}
loadData();