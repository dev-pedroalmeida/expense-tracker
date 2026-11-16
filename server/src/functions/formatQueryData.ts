const formatInsertQueryData = (data: Object) => {
  const fields = Object.keys(data).map((field) => field);
  const values = Object.keys(data).map((field, index) => "$" + (index + 1));
  const params = Object.values(data);

  return {
    fields,
    values,
    params,
  };
};

const formatUpdateQueryData = (data: Object) => {
  const fields = Object.keys(data).map(
    (field, index) => field + " = $" + (index + 1),
  );
  const params = Object.values(data);

  return {
    fields,
    params,
  };
};

export { formatUpdateQueryData, formatInsertQueryData };
