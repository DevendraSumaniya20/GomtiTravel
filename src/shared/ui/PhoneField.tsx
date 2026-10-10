type PhoneFieldProps = {
  label?: string
}

/** A required Indian mobile number, submitted as `phone`. */
export function PhoneField({ label = 'Mobile number' }: PhoneFieldProps) {
  return (
    <label>
      {label}
      <input
        name="phone"
        type="tel"
        inputMode="numeric"
        pattern="[6-9][0-9]{9}"
        title="10 digit mobile number"
        autoComplete="tel-national"
        placeholder="10 digits"
        required
      />
    </label>
  )
}
