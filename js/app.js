const mainCardsContainer = document.getElementById('main-cards-container')
const titleCardsContainer = document.getElementById('title-card-container')
const markCount = document.getElementById('mark-count')
const latestCardContainer = document.getElementById('latest-card-container')

const loadMainCardsData = async() =>{
    
        loader(true)
      
      
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json();
    const posts = data.posts

   
    

    mainCardsContainer.innerHTML = '';
    // console.log(posts);
    posts.forEach(post => {
    //    console.log(post) 
    displayData(post)

    
    
});

messageBtn()


}


const displayData = (post)=>{
    setTimeout(() => {
        loader()
      }, 2000);
      


    const div = document.createElement('div')
    
    div.innerHTML = `
    <div class="lg:col-span-2 bg-[#797DFC0A] p-5 lg:p-10 rounded-3xl flex gap-6">
                        <div class="w-12 h-12 relative">
                            <div class="status w-3 h-3 rounded-full absolute left-10 bottom-10"></div>
                            <img class="rounded-xl w-full h-full" src="${post.image}" alt="">
                        </div>
                        <div class="space-y-3 flex-1">
                            <div class="flex gap-3 text-sm font-inter">
                                <p># ${post.category}</p>
                                <p>Author : <span>${post.author.name}</span></p>
                            </div>
                            <h6 class="font-mulish text-xl font-bold">${post.title}</h6>
                            <p class="border-b-2 border-dashed font-inter pb-3">${post.description}</p>
                            <div class="flex justify-between items-center mt-5 gap-4">
                                <div class="flex items-center gap-4 text-sm lg:text-base">
                                    <div class="lg:flex items-center gap-1 lg:gap-3">
                                        <img src="./images/tabler-icon-message-2.svg" alt="">
                                        <p class="font-inter">${post.comment_count}</p>
                                    </div>
                                    <div class="lg:flex items-center gap-1 lg:gap-3">
                                        <img src="./images/tabler-icon-eye.svg" alt="">
                                        <p class="font-inter">${post.view_count}</p>
                                    </div>
                                    <div class="lg:flex items-center gap-1 lg:gap-3">
                                        <img src="./images/tabler-icon-clock-hour-9.svg" alt="">
                                        <p class="font-inter">${post.posted_time} min</p>
                                    </div>
    
                                </div>
                                <button class="message-btn btn btn-circle"><img class="rounded-full" src="./images/email 1.png" alt=""></button>
                            </div>
                        </div>
                    </div>
    `
    mainCardsContainer.appendChild(div);
    
    
}




const loadCategoryData = async(category)=>{
  
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    const data = await res.json()
    // console.log(data.posts)
    const post = data.posts
    mainCardsContainer.innerHTML = '';
    post.forEach(item => {
        // console.log(item)
        displayData(item)
        messageBtn()       
    })

}



const search = () =>{
    const inputFieldText = document.getElementById('input-field').value
    console.log(inputFieldText)
    loadCategoryData(inputFieldText)
}





const messageBtn = ()=> {
    const messageBtn = document.querySelectorAll('.message-btn')
let markCountSum = 0

for(const btn of messageBtn){
    btn.addEventListener('click', function(e){
        const title = e.target.parentNode.parentNode.parentNode.childNodes[3].innerText;
        const view = e.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[3].innerText
        markCountSum = markCountSum + 1
        const div = document.createElement('div')
        div.innerHTML =`
        <div class="flex justify-between text-sm bg-white rounded-2xl p-4">
                            <p class="text-wrap text-[#12132D] font-semibold">${title}</p>
                            <div class="md:flex items-center"><img class="w-7 h-7" src="./images/tabler-icon-eye.svg" alt=""><p>${view}</p></div>
                        </div>
        
        `
        titleCardsContainer.appendChild(div);
        markCount.innerText = markCountSum
    })
}
}


const loader = (isLoading) =>{
    const loader = document.querySelectorAll('.loader')
    for(const i of loader){

        if(isLoading){
            i.classList.remove('hidden')
        }else{
            i.classList.add('hidden')
        }
    }
}


// latest posts

const latestPostsLoad = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json()
    data.forEach(item => {
        console.log(item)

        const div = document.createElement('div')

        div.innerHTML = `
        <div class="border p-6 rounded-3xl space-y-5">
                    <img class="rounded-2xl w-full" src="${item.cover_image}" alt="">
                   <div class="flex gap-3">
                        <img src="./images/333333.png" alt="">
                        <p class="text-[#12132D99]">${item.author?.posted_date ||' No publish date'}</p>
                   </div>
                   <p class="text-lg font-bold">${item.title}</p>
                   <p class="text-[#12132D99]">${item.description}</p>
                   <div class="flex gap-3">
                        <div class="w-10 h-10">
                            <img class="w-full h-full rounded-full" src="${item.profile_image}" alt="">
                        </div>
                        <div>
                            <p class="font-bold">${item.author.name}</p>
                             <p class="text-sm">${item.author?.designation || 'Unknown'}</p>
                        </div>
                   </div>
                </div>
        
        `
        
        latestCardContainer.appendChild(div)

    })
}

latestPostsLoad()






// loadCategoryData()

loadMainCardsData()