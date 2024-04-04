const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)

const favoriteBlogs = (blogs) => blogs.reduce((max, blog) => {
    if (!max.length || blog.likes > max[0].likes) return [blog]
    else if (blog.likes === max[0].likes) max.push(blog)
    return max.map(item => ({title: item.title, author: item.author, likes: item.likes}))
}, []);

const mostBLogs = (blogs) => {
    if (!blogs.length) return {}

    const authorCountsMap = blogs.reduce((counts, {author}) => {
        counts.set(author, (counts.get(author) || 0) + 1)
        return counts
    }, new Map())

    const [authorWithMaxBlogs, maxBlogCount] = Array
        .from(authorCountsMap.entries()).reduce((max, current) => max[1] > current[1] ? max : current)

    return {author: authorWithMaxBlogs, count: maxBlogCount}
}

const mostLikes = (blogs) => {
    if (!blogs.length) return {}

    const likesCountsMap = blogs.reduce((counts, {author,likes}) => {
        counts.set(author, (counts.get(author) || 0) + likes)
        return counts
    },new Map())

    const [authorWithMostLikes, totalLikes] = Array
        .from(likesCountsMap.entries()).reduce((max,current) => max[1] > current[1] ? max : current)

    return {author: authorWithMostLikes, likes:totalLikes}
}

module.exports = {dummy, totalLikes, favoriteBlogs, mostBLogs, mostLikes}