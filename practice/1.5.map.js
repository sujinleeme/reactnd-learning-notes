/* Using .map()
 *
 * Using the musicData array and .map():
 *   - return a string for each item in the array in the following format
 *     <album-name> by <artist> sold <sales> copies
 *   - store the returned data in a new albumSalesStrings variable
 *
 * Note:
 *   - do not delete the musicData variable
 *   - do not alter any of the musicData content
 *   - do not format the sales number, leave it as a long string of digits
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

const getDataValArr = (obj) => {
    let result = [];
    var arr = obj.map((e, i) => {
        val = [e.name, e.artist, e.sales];
        result.push(val);
    });
    return result;
};


const albumSalesStrings = (obj) => {
    const words = ['by', 'sold' ,'copies'];
    let result = [];
    var arr = obj.map((e, i) => {
        var c = e.map((k, j) => [k, words[j]].join(' '));
        result.push(c.join(' '));
    });
    return result;
}


const newMusicStringData = albumSalesStrings(getDataValArr(musicData));
selectedMusic = newMusicStringData[0]
console.log(selectedMusic); // 25 by Adele sold 1731000 copies
