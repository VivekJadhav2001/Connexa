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