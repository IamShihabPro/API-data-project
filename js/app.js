const showFetch =()=>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    // console.log(url)
    fetch(url)
    .then(res=> res.json())
    .then(data=> showAllData(data.data.tools.slice(0,6)))
}

const showAllData = (data)=>{
  sortByDate(data)
    // console.log(data)
    const container = document.getElementById('card-data')
    container.innerHTML=''

    data.forEach(singleData =>{
        // console.log(singleData.published_in)

        const {features, image, name, published_in, id } = singleData

        // console.log(features)

        const div = document.createElement('div')
        div.classList.add('col','col-lg-4', 'col-sm-12', 'col-md-6' ,'my-2', 'gap-3')

        let featureData = ''
          features.forEach(feature =>{
            // console.log(feature)
            featureData += `<li> ${feature} </li>`
          })

     
        // feature()
        
        div.innerHTML=`
            
                <div class="card border-light shadow p-3 mb-5 bg-body rounded" style="width: 22rem; height:30rem;">
                    <img src="${image ? image : 'no images'}" class="card-img-top" alt="..." style="width: 20rem; height:24rem;">
                    <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    
                    <p class="card-text"></p>
                    <ol>
                    ${featureData}
                    </ol>
                    
                    <hr>
                    <h5 class="card-title">${name}</h5>

                    <div class="d-flex justify-content-between">
                        <h6 class=""> <span> <i class="fa-solid fa-calendar-days"></i> </span> ${published_in} </h6>
                        <button type="button"   onclick="showDetails('${id}')"  class="btn btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right"></i></button>
                        
                    </div>
                    
                    </div>
                </div>
        `;
        container.appendChild(div)
        
    })
    
}


const sortByDate = (data)=>{
  document.getElementById('date-sort').addEventListener('click', ()=>{
    // console.log('cliked btn')
    const sortData = data.sort(
      (a,b)=> new Date (b.published_in).getTime() - new Date(a.published_in).getTime()
    )
    showAllData(sortData)
  })
}


// See all data 
const showAllDataTogether= ()=>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    // console.log(url)
    fetch(url)
    .then(res=> res.json())
    .then(data=> showAllData(data.data.tools))

    
}

// safe code

// <div class="row row-cols-4 row-cols-lg-3 g-2 g-lg-3 mt-2 ">
//        <div class="  mt-5 gap-1">  ${loadPrice ? loadPrice :'Free of cost'} </div>



// see modal data
const showDetails = (id)=>{
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
    // console.log(url)

    fetch(url)
    .then(res => res.json())
    .then(data => singleModalDetails(data.data))
    
}

const singleModalDetails = (data)=>{
    // console.log(data)

    let {tool_name, pricing, integrations, input_output_examples, image_link , description, features} = data

   
  //  features data load
    const feature = Object.values(features)
    // console.log(feature)

    let featureDataLoad = ''
    for(i of feature){
      // console.log(i.feature_name)
      featureDataLoad += `<li> ${i.feature_name ? i.feature_name : 'No data' } </li>`
    }

    // integration data load

    let integrationLoad = ''
    integrations.forEach(integrate =>{
      // console.log(integrate)
      integrationLoad +=  `<li> ${integrate ? integrate : 'No data'} </li>`
    })


    // pricing load data

    let loadPrice = ''
    pricing.forEach(prices =>{
      // console.log(prices)
      

      // let price = Object.values(prices)
      // console.log(price)


      // for(let pri of price){
      //   console.log( prices[pri])

      //   loadPrice += `
      //        <div class="col ">
      //              <div class=" p-2 d-flex  bg-light">${prices[pri] ? prices[pri] : 'free of cost'}</div>
      //         </div> `
      // }

      // <img src="${image_link[0] ? image_link[0] : 'No images found'}" class="img-fluid" alt=" "></img>


      let price = Object.values(prices)
      // console.log(price)
      // let price2 = price[0] + price[1]
      // console.log(price2)

      price.forEach(i =>{
        // console.log(i)
        loadPrice += `
               <div class="col d-flex">
                     <div class=" p-2 d-flex  bg-light">${i}</div>
                </div> `

      })


    })

    let inputOutput1 = ''

    console.log(input_output_examples[0])
    input_output_examples.forEach(value =>{
      // console.log(value)

      let value2 = Object.values(value)
      // console.log(value2)

      value2.forEach(i =>{
        inputOutput1 += `<h5> ${i} </h5>`
      })


    })



  
    document.getElementById('detailsModalLabel').innerText = tool_name

    document.getElementById('modal-body').innerHTML = `
    
    <div class="px-4" >
                  <div class="row gx-5">
                    <div class="col">
                     <div class="p-3"> <h5>${description} </h5> </div>

                     <div class="row row-cols-4 row-cols-lg-3 g-2 g-lg-3 mt-2">
                          <div class="col ">
                            <div class="p-2 border bg-danger text-light text-center" style="height:6rem;">
                            
                            ${pricing[0].price ? pricing[0].price : 'free of cost'}
                            ${pricing[0].plan ?pricing[0].plan : 'free of cost' }
                            
                            </div>
                          </div>
                          <div class="col">
                            <div class="p-2 border bg-success text-light text-center" style="height:6rem;">
                            ${pricing[1].price}
                            ${pricing[1].plan}
                            
                            </div>
                          </div>
                          <div class="col">
                            <div class="p-2 border bg-primary text-light text-center" style="height:6rem;">
                            <p> ${pricing[2].price}
                            ${pricing[2].plan}</p>
                            
                            </div>
                          </div>
                      </div>

                      <div class="row gx-5 mt-3 d-flex">
                          <div class="col">
                           <div class="p-3  d-flex bg-light text-center">
                            <ol>${featureDataLoad}</ol>
                            <ol>${integrationLoad}</ol>
                           </div>
                          </div>
                          <div class="col">
                            <div class="p-3  bg-light">
                              
                            </div>
                          </div>
                        </div>

                    </div>
                    <div class="col">
                      <div id="details-logo" class="p-3 border bg-light">
                      <img src="${image_link[0] ? image_link[0] : 'No images found'}" class="img-fluid" alt=" "></img>
                      </div>
                        <div class="mt-3 text-center">
                        <h4>${input_output_examples[0].input}</h4>
                        <p>${input_output_examples[0].output}</p>
                        </div>
                    </div>
                  </div>
                </div>

    `

}

showFetch()

