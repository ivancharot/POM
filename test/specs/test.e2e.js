const IndexPage = require('../pageobjects/pages/index.page');

describe('Carousel Index page test', () => {
    describe('Arrow controls test', () => {
        before('Open the page', async () => {
            await IndexPage.open();
        });

        it('move to the next and previous slides by clicking on the arrow in the carousel', 
    async () => {
            const imageBefore = await IndexPage.currentImageSrc()
            await IndexPage.arrowClick('right');
            const imageAfter = await IndexPage.currentImageSrc()
            expect(await imageBefore).not.toEqual(await imageAfter)
            });

        it('Circle moving', async () => {
            const moveFullImageList = [...Array(await IndexPage.crslImages.length)].map(el => el = 'left')
            const imageBefore = await IndexPage.currentImageSrc()
            for (let direction of moveFullImageList) {
                await IndexPage.arrowClick(direction)
            }
            const imageAfter = await IndexPage.currentImageSrc()
            expect(await imageBefore).toEqual(await imageAfter)
        })
        }
    )}
)

