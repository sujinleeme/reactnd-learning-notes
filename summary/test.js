/* Combining .filter() and .reduce()
 *
 * Using the musicData array, filter(), and reduce():
 *   - Filter the musicData array down to just the albums that have a
 *     combined artist + name string length of less than 25 characters
 *     (for example, looking at the first album it would be "Adele25" which
 *     has a length of 7, so it should be included)
 *   - Then, on the array returned from filter(), call reduce()
 *   - The value returned reduce() returns the total number of sales
 *   - Store that returned number in a new totalAlbumSales variable
 *
 * Note:
 *   - You can chain the operations!
 *   - Do not delete the musicData variable
 *   - Do not alter any of the musicData content
 *   - Do not format the sales number; leave it as a long string of digits
 */

const musicData = [
    { artist: 'Adele', name: '25', sales: 1731000 },
    { artist: 'Drake', name: 'Views', sales: 1608000 },
    { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
    { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
    { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
    { artist: 'Original Broadway Cast Recording', name: 'Hamilton: An American Musical', sales: 820000 },
    { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
    { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
    { artist: 'Rihanna', name: 'Anti', sales: 603000 },
    { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
];


let totalAlbumSales = musicData.filter((album) =>
    album.artist.length + album.name.length <= 25
).reduce((sum, current) => {
    return sum + current.sales
}, 0)

console.log(totalAlbumSales)


/* Popular Ice Cream Totals Quiz
 *
 * Using the data array and .reduce():
 *   - Return an object where each property is the name of an ice cream flavor
 *     and each value is an integer that's the total count of that flavor
 *   - Store the returned data in a new iceCreamTotals variable
 *
 * Notes:
 *   - Do not delete the data variable
 *   - Do not alter any of the data content
 */

const data = [
    { name: 'Tyler', favoriteIceCreams: ['Strawberry', 'Vanilla', 'Chocolate', 'Cookies & Cream'] },
    { name: 'Richard', favoriteIceCreams: ['Cookies & Cream', 'Mint Chocolate Chip', 'Chocolate', 'Vanilla'] },
    { name: 'Amanda', favoriteIceCreams: ['Chocolate', 'Rocky Road', 'Pistachio', 'Banana'] },
    { name: 'Andrew', favoriteIceCreams: ['Vanilla', 'Chocolate', 'Mint Chocolate Chip'] },
    { name: 'David', favoriteIceCreams: ['Vanilla', 'French Vanilla', 'Vanilla Bean', 'Strawberry'] },
    { name: 'Karl', favoriteIceCreams: ['Strawberry', 'Chocolate', 'Mint Chocolate Chip'] }
];


const flavors = data.reduce((total, current) => {
    return total.concat(current.favoriteIceCreams)
}, [])

const reducer = (arr, index) => {
    console.log(arr, index)
    arr[index] = (arr[index] || 0) + 1
    return arr
}

const iceCreamTotals = flavors.reduce(reducer, {})

console.log(iceCreamTotals)
