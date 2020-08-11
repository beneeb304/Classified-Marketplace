const listView = document.querySelector('#lstItems')
const slcTitle = document.querySelector('#slcTitle')
const slcDescription = document.querySelector('#slcDescription')
const slcName = document.querySelector('#slcName')
const slcCategory = document.querySelector('#slcCategory')
const slcPrice = document.querySelector('#slcPrice')
const slcLocation = document.querySelector('#slcLocation')
const slcContact = document.querySelector('#slcContact')
const slcId = document.querySelector('#slcId')
const slcCardListing = document.querySelector('#slcCardListing')
const slcCardId = document.querySelector('#slcCardId')
const inputForm = document.querySelector('form')

const getAllItems = ()=>{
   
    clearList(listView)
    
    fetch('/items').then((response) =>{
        response.json().then((data)=>{
            if (data.error){
                const tmpItem=document.createElement("button")
                tmpItem.innerHTML = "Error loading data. Please try again"
                tmpItem.classList.add("list-group-item")
                listView.appendChild(tmpItem) 
            }   
            else{
                for (let i=0;i<data.length;i++){
                    const tmpItem=document.createElement("button")
                    tmpItem.innerHTML = '<button type=button class="list-group-item list-group-item-action">'+data[i].title+'</button>'
                    tmpItem.addEventListener('click',()=>{showEntry(data[i]._id)})
                    tmpItem.classList.add("list-group-item")
                    listView.appendChild(tmpItem) 
                    slcId.innerHTML = 'Your item is up for sale! The ID of your listing is ' + data[i]._id + '. Keep this id confidential for when you want to remove the listing.'
                }
            }
        })
    })
}

const clearList=(listView)=>{
    while (listView.firstChild)
    listView.removeChild(listView.firstChild)
}

const showEntry=(id)=>{
    slcCardListing.classList.remove('d-none')

    fetch('/items/'+id).then((response) =>{
        response.json().then((data)=>{
            if (data.error){
                slcTitle.innerHTML = "Error loading data. Please try again"
            }   
            else{
                slcTitle.innerHTML = data.title
                slcDescription.innerHTML = data.description
                slcName.innerHTML='Seller : ' + data.name
                slcCategory.innerHTML = 'Selling in : ' + data.category
                slcPrice.innerHTML = 'Selling for $' + data.price
                slcLocation.innerHTML = 'Location : ' + data.latitude + ', ' + data.longitude
                slcContact.innerHTML = 'Contact : ' + data.contact
            }
        })
    })
}

inputForm.addEventListener('submit',(e)=>{
    slcCardId.classList.remove('d-none')
    
    e.preventDefault()
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    const name = document.querySelector('#name');
    const category = document.querySelector('#category');
    const price = document.querySelector('#price');
    const lat = document.querySelector('#lat');
    const lon = document.querySelector('#lat');
    const contact = document.querySelector('#contact')

    const post_request_object={
        "title": title.value,
        "description": description.value,
        "name": name.value,
        "category": category.value,
        "price": price.value,
        "latitude": lat.value, 
        "longitude":  lon.value,
        "contact": contact.value
    }

    fetch('/items/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(post_request_object),
    })
    .then(response => response.json())
    .then(data => {
        getAllItems()
    })
    .catch((error) => {
        console.error('Error:', error);
    });

})

function deleteItem() {

    let removeID = document.getElementById('removeID').value;

    // console.log(removeID)

    document.getElementById('removeButton').innerHTML = removeID

    fetch('/items/' + removeID, {
        method: 'DELETE',
        // headers: {'Content-Type': 'application/json',},
        // body: removeID,
    })
    .then(response => response.json())
    .then(data => {
        console.log('happened')
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

slcCardListing.classList.add('d-none')
slcCardId.classList.add('d-none')
getAllItems()