import { useRef, useEffect, useState } from 'react'

//we can set a default value for color like this color='darkOrchid'
export default function Clicker({keyName, color='darkOrchid', increment}) 
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0))

    //useRef gives you a reference to the SPECIFIC dom element. You need to match is with a tag in the gsx (our button)
    const buttonRef = useRef();
    //If you try to access buttonRef.current, it will be undefined on the first render because the GSX has not been processed

    //this runs once AFTER the first render (after gsx is processed and is ready) because of the []. If we put nothing in [] it runs everytime, and if we specify dependencies it only updates if any of them changed
    useEffect(() => {
        //can access the button ref here because the useEffect runs after the first render
        buttonRef.current.className = 'prettyButton'

        //this runs once when the component is destroyed
        return () => {
            localStorage.removeItem(keyName);
        };
    }, [])

    //this runs every time a render happens IF the count variable has changed
    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [ count ])

    const buttonClick = () => {
        setCount(count + 1)
        increment();
    }

    //all the code above here runs every time the component is rendered
    return <div>
        <div>Click Count: { count }</div>
        {/* style has to be passed in as an array even if we aren't sending it dynamic values. 
        Properties with dashes like background-color get the - removed and go camelCase 
        if you assign the same ref to multiple tags it will only reference the last tag*/}
        <button ref={buttonRef} onClick={buttonClick} style={{color: color, backgroundColor: "black"}}>Click me</button>
        <button></button>
    </div>
}