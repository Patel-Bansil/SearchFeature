let userContainer = document.querySelector(".userContainer");
let searchInput = document.querySelector(".searchInput");

let users = [];

async function fetchUsers() {

  try {
    let res = await fetch("https://randomuser.me/api/?results=10"); // 10 random users
    let data = await res.json();

    users = data.results.map((obj) => ({
      profileUrl: obj.picture.medium,
      name: `${obj.name.first} ${obj.name.last}`,
      email: obj.email,
    }));

    renderUsers(users);
  } catch (err) {
    userContainer.innerHTML = "<p>Error loading users.</p>";
  }
}

function renderUsers(arr) {
  userContainer.innerHTML = "";
  arr.map(function (obj) {
    let { profileUrl, name, email } = obj;

    let elem = document.createElement("div");
    elem.className = "userItem";
    elem.innerHTML = `
                <div class="userImg">
                    <img src="${profileUrl}" alt="">
                </div>
                <div class="userContant">
                    <h3>${name}</h3>
                    <p>${email}</p>
                </div>`;

    userContainer.append(elem);
  });
}
renderUsers(users);

function handleUserSearch(e) {
  let searchValue = e.target.value;
  let filteredValue = users.filter((obj) => {
    return (
      obj.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      obj.email.toLowerCase().includes(searchValue.toLowerCase())
    );
  });
  renderUsers(filteredValue);
}

searchInput.addEventListener("input", handleUserSearch);

fetchUsers();
