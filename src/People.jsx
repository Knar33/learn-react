import {useState, useEffect} from 'react'

export default function People() {
    const [people, setPeople] = useState([]);

    //by making this function async so it doesn't block executing
    const getPeople = async () => {
        //fetch immediately returns a promise, not the data. 

        //await calls .then when the promise is returned without blocking execution
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)

        //we can simplify these arrow functions by removing () {} and return because it has only one instruction and one argument
        //.then(response => response.json())
        //.then(result => console.log(result))
    };

    useEffect(() => {
        getPeople();
    }, []);

    return <div>
        <h2>People</h2>
        <ul>
            {
                //we need to use ID instead of the array key
                people.map((person) => {
                //`<li>${person.name}</li>` would be a string literal (would print the li and wouldn't process more reactive stuff)
                return <li key={person.id}>{person.name}</li>
                })
            }
        </ul>
    </div>
}