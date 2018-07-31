const truncate = (str, length) => str.length > length ? str.substring(0, length) : str;

export default truncate;