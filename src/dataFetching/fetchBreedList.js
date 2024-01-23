async function fetchBreedList({ queryKey }) {
    const animal = queryKey[1]; // the query key for a breed is the animal

    if (!animal) return [];

    // the breed list will be fetched depends on the animal type
    const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );

    if (!res.ok) {
        throw new Error(`breeds ${animal} fetch not ok`);
    }

    return res.json();
}

export default fetchBreedList;