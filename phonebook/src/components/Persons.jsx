const Persons = ({ filteredPersons, deletePerson }) => {
    return (
        <ul>

        {filteredPersons.map(person => 

        <li key={person.id}> 
        {person.name} {person.number} 
        <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>)}

      </ul>
    );
};

export default Persons;