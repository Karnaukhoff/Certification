const baseURL = `https://api.github.com/search/users`

export async function getUsers({search, page}) {
    const response = await fetch(`${baseURL}?q=${search}&per_page=100&page=${page}`);
    if (!response.ok) {
        response.json().then((response) => console.log(response.message))
        return
    }
    const data = await response.json();
    return data;
  }
  export async function sortUsersDesc({search, page}) {
    const response = await fetch(`${baseURL}?q=${search}&per_page=100&page=${page}&sort=repositories&order=desc`);
    if (!response.ok) {
        response.json().then((response) => console.log(response.message))
        return
    }
    const data = await response.json();
    return data;
  }
  export async function sortUsersAsc({search, page}) {
    const response = await fetch(`${baseURL}?q=${search}&per_page=100&page=${page}&sort=repositories&order=asc`);
    if (!response.ok) {
        response.json().then((response) => console.log(response.message))
        return
    }
    const data = await response.json();
    return data;
  }