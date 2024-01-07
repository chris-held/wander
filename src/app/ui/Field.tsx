type Props = React.HTMLProps<HTMLInputElement> & {
  label?: string;
};

const Field = ({ label, id, ...rest }: Props) => {
  return (
    <div className="mb-5 flex justify-between items-center">
      <label
        htmlFor={id}
        className="block mb-2 w-1/4 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        className="mx-2 w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      />
    </div>
  );
};

export default Field;
