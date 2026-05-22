interface Props {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}

export function SliderField({ label, value, min, max, onChange }: Props) {
  return (
    <div className="generator-form__slider">
      <div className="generator-form__slider-header">
        <span className="generator-form__slider-label">{label}</span>
        <span className="generator-form__slider-value">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}
