# wanikani-leeches-to-anki-sentence
The motivation for this repository comes after countless hours reviewing leeches and finding the only solution that helped me to squash them is learning the item with context. WaniKani sentences are great to provide context. All the leeched items I reviewed using this technique are no more leeches.

Gets all your leeches from WaniKani and creates an Anki exportable file with the troublesome item plus WaniKani sentences related to it. It only works with vocabulary items, as they are the only ones that have sentences.

# Installation guide

Requirements are `Node.js` and `npm` installed. I'm using `yarn` for managing dependencies but you can use whatever system you want. Some technical knowledge is required as well.

1. Clone the repo.
2. Run `yarn install` or `npm install`.
3. Get your API V2 key from WaniKani's settings page.
4. Start a review session (we need this to get a cookie to call the internal API to retrieve sentences).
5. Do a wrong review, get the item details, go to the `console > network > item detailes call > request > Cookie` and get the `_wanikanisession` parameter and value.
6. Add your api token and wanikani session value into the `user-data.js` file.
7. Run `node user-data.js` et voila!

頑張ってください！
