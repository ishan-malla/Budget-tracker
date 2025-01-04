type CurrencyProps = {
  size: string;
};

const Currency = ({ size }: CurrencyProps) => {
  // const currncyComponent = () => {};
  return (
    <span className={`text-${size} self-start p-0.5 font-bold text-gray-400`}>
      $
    </span>
  );
};
export default Currency;
