import React from "react"
import "./Discs.css"

export const SuggestionList = ([ filteredDiscs ]) => {
        return (
            <div className="suggestion__wrapper">
                <ul className="suggestions">
                    {console.log(filteredDiscs)}
                    {
                        filteredDiscs?.map(disc => {
                            return <li className="suggestion" 
                                       key={disc.id} 
                                       id={disc.id} 
                                       onClick={handleDiscClick}>
                                    {disc.name}
                                </li>
                        })
                    }
                </ul>
            </div>
        )
}