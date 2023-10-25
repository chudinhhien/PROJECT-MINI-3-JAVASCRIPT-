export const fetchApi = async (url) => {
    const respone = await fetch(url);
    const result = await respone.json();
    return result;
}