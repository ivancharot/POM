const IndexPage = require('../pageobjects/pages/index.page');

describe('Index page test', () => {
    before('Open the page', async () => {
        await IndexPage.open();
    });

    describe('Arrow controls test', () => {

        it('Verify that the user is able to click the "<" button from the slide bar',
        async () => {
            expect(await IndexPage.crslArrowControls[0].isClickable()).toEqual(true)
        });

        it('Verify that the user is able to click the ">" button from the slide bar',
        async () => {
            expect(await IndexPage.crslArrowControls[1].isClickable()).toEqual(true)
        });

        it('Verify that if the user clicks on the “>” icon button then the next image slide should be displayed', 
        async () => {
            const imageSrcArray = await IndexPage.crslImages.map(el => el.getAttribute('src'))
            const imageBefore = await IndexPage.currentImageSrc()
            await IndexPage.arrowClick('>');
            const imageAfter = await IndexPage.currentImageSrc()
            expect(await imageAfter).toEqual(await imageSrcArray[imageSrcArray.findIndex(el=>el==imageBefore)+1]) //need to be fixed
            });

        it('Verify that if the user clicks on the “<” icon button then the previous image slide should be displayed', 
        async () => {
            const imageSrcArray = await IndexPage.crslImages.map(el => el.getAttribute('src'))
            const imageBefore = await IndexPage.currentImageSrc()
            await IndexPage.arrowClick('<');
            const imageAfter = await IndexPage.currentImageSrc()
            expect(await imageAfter).toEqual(await imageSrcArray[imageSrcArray.findIndex(el=>el==imageBefore)-1]) //need to be fixed
            });

        it('Verify if the user is able to move slides in loop way', async () => {
            const moveFullImageList = [...Array(await IndexPage.crslImages.length)].map(el => el = '<')
            const imageBefore = await IndexPage.currentImageSrc()
            for (let direction of moveFullImageList) {
                await IndexPage.arrowClick(direction)
                }
            const imageAfter = await IndexPage.currentImageSrc()
            expect(await imageBefore).toEqual(await imageAfter)
                })
            })
    
    describe('Dot indicators/controls test', () => {

        it('Verify if dots are clickable', async () => {
            const clickable = await IndexPage.crslDotControls.filter(el => el.isClickable())
            expect(await clickable.length).toEqual(await IndexPage.crslDotControls.length)
        })

        it('Verify if sum of dots is the same like the sum of images', async () => {
            expect(await IndexPage.crslDotControls.length).toEqual(await IndexPage.crslImages.length)
        })

        it('Verify that if the user clicks on dot then the user should be navigated to the relevant slide image', async () => {
            const activeDotsList = await IndexPage.dotIsActiveList()
            const dotIndex = await activeDotsList.findIndex(el => el==false)
            const startImage = await IndexPage.currentCrslImage()
            await IndexPage.crslDotControls[dotIndex].click()
            await browser.waitUntil(async function (){
                return (await startImage.isDisplayed()===false)
               });
            const imageIndex = await IndexPage.crslImages.map(el => el.isDisplayed()).findIndex(el => el==true)
            expect(await dotIndex).toEqual(await imageIndex)
        })
    })

    describe('menu btns test', () => {
        it('Verify if btns are clickable', async () => {
            expect(await IndexPage.menuItems.filter(el => el.isClickable()).length)
                    .toEqual(await IndexPage.menuItems.length)
        })

        it('"Our Products" btn test', async () => {
            await IndexPage.clickMenuButton('Our Products')
            const btnUrl = await browser.getUrl()
            expect(btnUrl).toEqual('https://webdriveruniversity.com/Page-Object-Model/products.html')
            await browser.back();
        })

        it('"Contact Us" btn test', async () => {
            await IndexPage.clickMenuButton('Contact Us')
            const btnUrl = await browser.getUrl()
            expect(btnUrl).toEqual('https://webdriveruniversity.com/Contact-Us/contactus.html')
            await browser.pause(500);
            await browser.back();
        })

        it('"Home" btn test', async () => {
            await IndexPage.clickMenuButton('Home')
            const btnUrl = await browser.getUrl()
            expect(btnUrl).toEqual('https://webdriveruniversity.com/Page-Object-Model/index.html')
            await browser.pause(500);
        })
    })



    }
)

