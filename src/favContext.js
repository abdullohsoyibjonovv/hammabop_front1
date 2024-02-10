import { createContext } from "react"
import { useLocalStorage } from '@uidotdev/usehooks'
import Favourites from "./pages/Favourites";

const FavContext = createContext()


const FavContextPravider = ({ children }) => {
    const [fav, saveFav] = useLocalStorage("fav", []);
    const handleAddtoFav = (el) => {
        const isExists = (Favourites.find((itm) => itm._id === el._id));


        if (isExists) {
            saveFav(fav.filter((itm) => itm._id !== el._id));
            return;
        }
        saveFav([...fav, el]);
    }
    return (
        <>
            <FavContext.Provider
                value={{
                    handleAddtoFav,
                    fav,
                }}
            >

                {children}
            </FavContext.Provider>
        </>
    )
}
export { FavContext, FavContextPravider }