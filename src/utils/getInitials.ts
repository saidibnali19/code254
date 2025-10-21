export const getInitials = (name: string) => {
  return name
    .split(" ") // Split the name into an array of words
    .map((word) => word.charAt(0).toUpperCase()) // Get the first letter and convert to uppercase
    .join(""); // Join the letters into a single string
};
