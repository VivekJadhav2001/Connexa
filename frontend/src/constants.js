export const timeAgo =(date)=>{
        const now = new Date()
        const postDate = new Date(date)

        const diffInSeconds = Math.floor((now - postDate) / 1000)

        if (diffInSeconds < 60) {
            return `${diffInSeconds}s ago`
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60)

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`
        }

        const diffInHours = Math.floor(diffInMinutes / 24)

        if (diffInHours < 24) {
            return `${diffInHours}h ago`
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
    }

export const BATCHES = [
  "OBH-1",
  "OBH-2",
  "OBH-3",
  "OBH-4",
  "OBH-5",
];

export const CENTERS=[
    "Pune",
    "Hyderabad",
    "Noida",
    "Bangalore",
    "Chennai"
]

export const COURSES = [
    "MERN",
    "JAVA",
    "DA",
    "DS"
]



export const getJoinedDate = (strDate) => {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const [year, month] = strDate.split("T")[0].split("-");

  return `${months[Number(month) - 1]} ${year}`;
};