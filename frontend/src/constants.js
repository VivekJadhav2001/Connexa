export const timeAgo = (date) => {
  const now = new Date();
  const postDate = new Date(date);

  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 24);

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  return postDate.toLocaleDateString("en-IN");
};

export const Roles = ["Student", "Professional", "Instructor"];

export const BATCHES = ["OBH-1", "OBH-2", "OBH-3", "OBH-4", "OBH-5"];

export const CENTERS = ["Pune", "Hyderabad", "Noida", "Bangalore", "Chennai"];

export const COURSES = ["MERN", "JAVA", "DA", "DS"];

export const GENDER = ["male", "female", "others"];
export const getJoinedDate = (strDate) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month] = strDate.split("T")[0].split("-");

  return `${months[Number(month) - 1]} ${year}`;
};

const COMMON_FIELDS = [
  {
    name: "email",
    placeholder: "connex@gmail.com",
  },
  {
    name: "password",
    placeholder: "••••••••",
    type: "password",
  },
];

const NAME_FIELDS = [
  {
    name: "firstName",
    placeholder: "Connex",
    maxWidth: "185px",
  },
  {
    name: "lastName",
    placeholder: "Community",
    maxWidth: "185px",
  },
];

const STUDENT_FIELDS = [
  {
    name: "gender",
    type: "select",
    placeholder: "Select Gender",
    options: GENDER,
  },
  {
    name: "batch",
    type: "select",
    placeholder: "Select Batch",
    options: BATCHES,
  },
  {
    name: "courseType",
    type: "select",
    placeholder: "Select Course",
    options: COURSES,
  },
  {
    name: "centerLocation",
    type: "select",
    placeholder: "Select Center *",
    options: CENTERS,
  },
];

const PROFESSIONAL_FIELDS = [
  {
    name: "organisationName",
    placeholder: "Organisation Name*",
  },
  {
    name: "currentRole",
    placeholder: "Current Role*",
  },
];

export { COMMON_FIELDS, NAME_FIELDS, STUDENT_FIELDS, PROFESSIONAL_FIELDS };
