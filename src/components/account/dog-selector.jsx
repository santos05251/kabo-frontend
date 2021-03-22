export default function DogSelector({ dogs, setDog, dogIndex }) {
  const dogDivs = dogs.map((dog, i) => (
    <option key={i}
      // onClick={() => setDog(i)}
      value={i}
      className={`inline-flex cursor-pointer justify-center items-center`}
    >
      {dog.name}
    </option>
  ))
  return (
    <div className="flex">
      <span className="mr-2">Select your doggo</span>
      <select
        onChange={e => setDog(e.target.value)}
        className="rounded overflow-hidden flex w-28 mb-7 border border-gray-200">
        {dogDivs}
      </select>
    </div>
  )
}
