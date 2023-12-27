const PersonForm = ({ newPerson, handleInputChange, addPerson }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input name="name" value={newPerson.name} onChange={handleInputChange} />
        </div>
        <div>
          number: <input name="number" value={newPerson.number} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };

export default PersonForm;