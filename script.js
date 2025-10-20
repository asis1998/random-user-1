const apiEP= "https://randomuser.me/api?results=5";
let userList =[]


const slider = document.getElementById("mySlider");
slider.addEventListener("change",(e)=>{
    console.log(e.target.value);
    const {value}=e.target;
    const label = document.getElementById("label");
    if (value > 70){
        label.textContent="";
        displayAppScreen()
;
    } else {
        label.textContent="slide to Unlock";
    }
});

const displayAppScreen =()=>{
    document.querySelector(".homescreen").remove();
    document.querySelector(".appScreen").style.display = "block";
};
const displayContactScreen =()=>{
    document.querySelector(".appScreen").remove();
    document.querySelector(".contactListScreen").style.display = "block";
    fetchUsers(apiEP);
   
};

const fetchUsers=async (url)=>{
    //fetch the user 

    //promise method\
//     fetch(url)
//     .then((response)=>{
//        return response.json()
//     })
//     .then((data)=>{
//         console.log(data);
//     }).catch((error)=>{
// console.log(error)
//     })

    //async await

   const response= await fetch(url);
   const data=await response.json();
    userList=data.results;
   
console.log(userList); 

// hide spinner 
document.querySelector(".showSpinner").style.display= "none";
displayContactList(userList);
};


// display contact list 

const displayContactList=(userList)=>{
    document.getElementById("list").style.display = "block"



let str = "";

  userList.map((item,i)=>{
str += ` <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" 
      type="button" 
      data-bs-toggle="collapse"
       data-bs-target="#collapse${i}" 
       aria-expanded="false" 
       aria-controls="collapse${i}">
       <img src="${item.picture.thumbnail}" alt="" width="50px" class="rounded-circle">
       <div class="ms-2">
        <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
        <small>${item.location.street.number}  ${item.location.street.name} ${item.location.city} </small>
       </div>
      </button>
    </h2>
    <div id="collapse${i}" 
    class="accordion-collapse collapse" 
    data-bs-parent="#accordionExample">
      <div class="accordion-body d-flex flex-column align-items-center">
             <img src="${item.picture.large}" alt="" width="150px" class="rounded-circle">
        <div>
            <div class="fw-bolder">

                <i class="bi bi-person-circle"></i>
               ${item.name.title} ${item.name.first} ${item.name.last}
            </div>
            <div>
                <a href="tel:${item.phone}">
                     <i class="bi bi-phone-fill" ></i>
               ${item.phone}
                </a>
               
            </div>
            <div>
                <a href="mailto:${item.email}">
                       <i class="bi bi-envelope"></i>
                ${item.email}
                </a>
             
            </div>
            <div>
                <a href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.country}" target="_blank">
                    <i class="bi bi-globe-americas-fill"></i>
                  ${item.location.street.number}  ${item.location.street.name} ${item.location.city}
                </a>
            </div>
        </div>

      </div>
    </div>
  </div>`
  })


  document.getElementById("userAccordion").innerHTML = str;
  userCount(userList);
  
}

// search contact 

document.getElementById("search").addEventListener("keyup",(e)=>{
const {value}= e.target;
// console.log(value);
const filteredUser = userList.filter((item)=>{
    const name = (item.name.first +" " + item.name.last).toLowerCase();

    return name.includes(value.toLowerCase());
});
displayContactList(filteredUser);
})

const userCount = (e)=>{
let users=e.length;
document.getElementById("userCount").innerText = users;

}





