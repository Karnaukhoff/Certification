const baseURL = `https://api.github.com/search/users`

export async function getUsers({search}) {
    const response = await fetch(`${baseURL}?q=${search}&per_page=100`);
    if (!response.ok) {
        response.json().then((response) => console.log(response.message))
        return
    }
    const data = await response.json();
    return data;
  }
  export async function sortUsersDesc({search}) {
    const response = await fetch(`${baseURL}?q=${search}&per_page=100&sort=repositories&order=desc`);
    if (!response.ok) {
        response.json().then((response) => console.log(response.message))
        return
    }
    const data = await response.json();
    return data;
  }
  export async function sortUsersAsc({search}) {
    const response = await fetch(`${baseURL}?q=${search}&per_page=100&sort=repositories&order=asc`);
    if (!response.ok) {
        response.json().then((response) => console.log(response.message))
        return
    }
    const data = await response.json();
    return data;
  }
  export async function getCountOfRepositories({url}){
    const response = await fetch(`${url}`);
    if (!response.ok) {
        response.json().then((response) => console.log(response.message))
        return
    }
    const data = await response.json();
    return data;
  }