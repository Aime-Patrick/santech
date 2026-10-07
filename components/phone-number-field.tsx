type PhoneNumberFieldProps = {
  label?: string;
  required?: boolean;
  countryName?: string;
  numberName?: string;
  placeholder?: string;
  labelClassName: string;
  inputClassName: string;
  selectClassName: string;
};

const countryCodes = ["+250", "+223", "+254", "+255", "+256", "+234", "+27", "+44", "+1"];

export function PhoneNumberField({
  label = "Phone number",
  required = false,
  countryName = "phoneCountryCode",
  numberName = "phoneNumber",
  placeholder = "7xx xxx xxx",
  labelClassName,
  inputClassName,
  selectClassName,
}: PhoneNumberFieldProps) {
  return (
    <label className={labelClassName}>
      {label}
      <span className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2">
        <select required={required} name={countryName} defaultValue="+250" className={selectClassName} aria-label="Phone country code">
          {countryCodes.map((code) => <option key={code}>{code}</option>)}
        </select>
        <input required={required} type="tel" name={numberName} pattern="[0-9\s().-]{7,}" title="Enter a valid phone number" placeholder={placeholder} className={inputClassName} />
      </span>
    </label>
  );
}
