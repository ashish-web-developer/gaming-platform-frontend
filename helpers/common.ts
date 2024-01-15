function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
  }
}

function readableFormatDate(dateString: string) {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  };

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
}

function getTimeDifference(dateTimeString: string) {
  // Parse the input string to a Date object
  const inputDate = new Date(dateTimeString);

  // Current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - inputDate.getTime();

  // Convert milliseconds to seconds, minutes, and hours
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  // Determine the appropriate time description
  if (seconds < 60) {
    return `${seconds} sec`;
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours <= 24) {
    return `today`;
  } else if (hours > 24 && hours <= 48) {
    return "yesterday";
  } else {
    return "";
  }
}

export { readableFormatDate, shuffleArray, getTimeDifference };
