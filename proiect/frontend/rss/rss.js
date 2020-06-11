const mata = document.getElementById('rssStart')


const getArtefacts = async () => {
  try {
      const response = await fetch(`http://localhost:8081/api/artefacts/get-artefacts`, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
          }
      })
      const json = await response.json()
      return json
  } catch (err) {
      console.log(err)
  }
}
const getUsersDetails = async () => {
  try {
      const response = await fetch(`http://localhost:8081/api/users/user-details-clasament`, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
          }
      })
      const json = await response.json()
      return json
  } catch (err) {
      console.log(err)
  }
}


  const getClasamet = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/rankings`, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
          }
      })
      const json = await response.json()
      return json
  } catch (err) {
      console.log(err)
  }
  }
  window.addEventListener('DOMContentLoaded',async (event) =>{
    var rankings = await getClasamet()
    let artefacts = await getArtefacts()
    let userDetails = await getUsersDetails()
    mata.append(`<xml version="1.0" encoding="UTF-8">`)
    mata.innerHTML = `${mata.innerHTML} <br>`
    mata.append(`<rss version="2.0">`)
    mata.innerHTML = `${mata.innerHTML} <br>`
    mata.append(`<channel >`)
    mata.innerHTML = `${mata.innerHTML} <br>`
    for( let elem in rankings.items)
    {
      let infoArtefact = artefacts.find(elemt => elemt._id === rankings.items[elem][0])
      {
          if(infoArtefact != null)
         { mata.append ( `
        <item>`)
        mata.innerHTML = `${mata.innerHTML} <br>`
        mata.append(`<title> ${infoArtefact.name} </title>`) 
        mata.innerHTML = `${mata.innerHTML} <br>`
        mata.append(`<description>${rankings.items[elem][1]}</description>`)
        mata.innerHTML = `${mata.innerHTML} <br>`
        mata.append(`<link>http://localhost:8081/view-artefacts/${infoArtefact._id}</link>`) 
        mata.innerHTML = `${mata.innerHTML} <br>`
        mata.append(`</item>`)
        mata.innerHTML = `${mata.innerHTML} <br>`
    }}
    }
    mata.append(`</ channel >`)
    mata.innerHTML = `${mata.innerHTML} <br>`
    mata.append(`</ rss>`)
    // console.log(rankings.itemsUser)
    // for( let elem in rankings.itemsUser)
    // {
    //   let infouser = userDetails.find(elemt => elemt._id === rankings.itemsUser[elem][0])
    //   console.log(infouser)
    //   userTable.innerHTML = `
    //     ${userTable.innerHTML}
    //     <tr class="table__row">
    //     <td class="table__content" data-heading="Useri">${infouser.firstName} ${infouser.lastName}</td>
    //     <td class="table__content" data-heading="Likes">${rankings.items[elem][1]}</td>
    //     </tr>`
    }
  //}
  )