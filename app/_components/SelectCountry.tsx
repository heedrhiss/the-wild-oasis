import { getCountries } from '@/app/_lib/data-service';

type SelectProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};
type CountryProps = {
  name: string;
  flag: string;
};

async function SelectCountry({ defaultCountry, name, id, className }:SelectProps) {
  const countries = await getCountries();
  const flag =
    countries.find((country:CountryProps) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c:CountryProps) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
