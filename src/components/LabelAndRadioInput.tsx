type LabelAndRadioInputProps = {
  id: string,
  value: string,
  checked: boolean,
  handleClickReview: (arg: React.ChangeEvent<HTMLInputElement>) => void,
};

function LabelAndRadioInput({
  id,
  value,
  checked,
  handleClickReview,
}: LabelAndRadioInputProps) {
  return (
    <label htmlFor={ id }>
      <input
        data-testid={ id }
        id={ id }
        name="rating"
        type="radio"
        value={ value }
        checked={ checked }
        onChange={ handleClickReview }
      />
      { value }
    </label>
  );
}

export default LabelAndRadioInput;
