import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

// customer hook for fetching the breed list depends on the animal
// tha animal is given as a parameter and the breed list is dynamically settled by the animal type
export default function useBreedList(animal) {
    const results = useQuery(["breeds", animal], fetchBreedList)

    return [results?.data?.breeds ?? [], results.status]; // if there are no results, return an empty array
}