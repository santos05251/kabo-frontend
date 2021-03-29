export default function DogSelector({ dogs, setDog, dogIndex }) {
  return (
    <div>
      { dogs.length > 1 &&
        <div className="flex">
          <span className="mr-2 text-base font-messina">Select your doggo</span>
          <select
            onChange={e => setDog(e.target.value)}
            className="rounded-md cursor-pointer overflow-hidden flex w-28 mb-7 border border-gray-200 bg-white p-1">
            { dogs.map((dog, i) => (
              <option
                key={i}
                value={i}
                className="inline-flex cursor-pointer justify-center items-center"
              >
                { dog.name }
              </option>
            ))}
          </select>
        </div>
      }
    </div>
  )
}
