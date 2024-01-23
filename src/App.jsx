import { Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, lazy, Suspense } from "react";
import AdoptedPetContext from "./dataFetching/AdoptedPetContext";


// caching the queries, for performance purpose
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            suspense: true,
        },
    },
});

// waiting to load these component until it's needed
const Details = lazy(() => import("./components/Details"));
const SearchParams = lazy(() => import("./components/SearchParams"));

const App = () => {
    const adoptedPet = useState(null);
    return (
        <div>
                <AdoptedPetContext.Provider value={adoptedPet}>
                    <QueryClientProvider client={queryClient}>
                        <Suspense
                            fallback={
                                <div className="loading-pane">
                                    <h2 className="loader">🌀</h2>
                                </div>
                            }
                        >
                            <header>
                                <Link to="/">Adopt Me!</Link>
                            </header>
                            <Routes>
                                <Route path="/details/:id" element={<Details />} />
                                <Route path="/" element={<SearchParams />} />
                            </Routes>
                        </Suspense>
                    </QueryClientProvider>
                </AdoptedPetContext.Provider>
        </div>
    );
};

export default App;