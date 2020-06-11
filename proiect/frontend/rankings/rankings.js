const artefactTable = document.getElementById('table-artefacts')
const userTable = document.getElementById('table-users')

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
      const response = await fetch(`http://localhost:8081/api/users/all-users`, {
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
function openRanking(evt, ranking) {
    var i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(ranking).style.display = "block";
    evt.currentTarget.className += " active";
  }
  function openRankingfirst(evt, ranking){
    document.getElementById(ranking).style.display = "block";
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
    openRankingfirst(event, 'Artefact')
    var rankings = await getClasamet()
    let artefacts = await getArtefacts()
    let userDetails = await getUsersDetails()
    // console.log(rankings)
    for( let elem in rankings.items)
    {
      // console.log(rankings.items[elem][0])
      // console.log(artefacts)
      let infoArtefact = artefacts.find(elemt => elemt._id === rankings.items[elem][0])
      // console.log(infoArtefact)
      artefactTable.innerHTML = `
        ${artefactTable.innerHTML}
        <tr class="table__row">
        <td class="table__content" data-heading="Artefact">${infoArtefact.name}</td>
        <td class="table__content" data-heading="Aprecieri">${rankings.items[elem][1]}</td>
        </tr>`
    }
    console.log(rankings.itemsUser)
    for( let elem in rankings.itemsUser)
    {
      let infouser = userDetails.find(elemt => elemt._id === rankings.itemsUser[elem][0])
      console.log(infouser)
      userTable.innerHTML = `
        ${userTable.innerHTML}
        <tr class="table__row">
        <td class="table__content" data-heading="Useri">${infouser.firstName} ${infouser.lastName}</td>
        <td class="table__content" data-heading="Likes">${rankings.items[elem][1]}</td>
        </tr>`
    }
  })
