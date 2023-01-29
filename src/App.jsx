import {useMemo, useState} from 'react'
import Clicker from './Clicker.jsx'
import People from './People.jsx'

//I can use {children, clickerCount} because the property names match, otherwise have to specify {children: child, clickerCount: count}
export default function App({children, clickersCount}) {
    //true is default value. Destructure the prop and setter that useState returns
    //useState preserves our variables after the function is run (js normally disposes them) and lets us hook into them
    const [hasClicker, setHasClicker] = useState(true);
    const [count, setCount] = useState(0);

    const toggleClickerClick = () => {
        setHasClicker(!hasClicker)
    }

    const increment = () => {
        //count is always resolved at runtime from the current variable value (not computed and stored/used for all future function calls)
        setCount(count + 1);
    }

    //...spreads out the array into a new one. 
    //This is a janky thing but basically Array(clickersCount) would make an empty array so we spread it into a new array
    const tempArray = [...Array(clickersCount)]
    tempArray.map((value, index) => {

    })

    //useMemo is a sort of cache. It will only update the colors variable the first time + whenever the dependency array has changed ie [hasClicker]
    //Usually used for complex calculations that take a while to run, we don't want to run them every render
    const colors = useMemo(() => {
            //const is block scope so this is fine
            const colors = []

            for (let i = 0; i < clickersCount; i++) {
                //the tick marks let us inject js statements inline using ${}
                colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
            }

            return colors;
    }, [hasClicker]);
    
    //jsx can only return 1 top line element so we need <>
    return <>
        {/* 
        anything that's not normal markup needs to go in {} and will be resolved as js, like this comment 
        This will dump out multiple children tags as html
        */}
        {children}

        <div>Total count: {count}</div>
        
        <button onClick={toggleClickerClick}>{hasClicker ? "Hide" : "Show"} Clicker</button>
        
        {/* && returns the second condition result */}
        {hasClicker && <>
            {/* We can't use loops inside our jsx return so we need to use Map to iterate through and perform the arrow function to each object in the array 
            We need to add another { here because we're back into jsx syntax (inside a { inside more jsx)*/}
            {[...Array(clickersCount)].map((value, index) => {
                {/* we need to give each clicker a unique index and we pass a bunch of props to the clicker component 
                We also need a return here (if it was just one line we could omit curlies and return)*/}
                return <Clicker key={index} increment={increment} keyName={`count${index}`} color={colors[index]} />
            })}
        </>}

        <People />
    </>
    }