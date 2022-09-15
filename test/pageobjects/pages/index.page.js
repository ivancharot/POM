
const Page = require('../page');

class IndexPage extends Page {

    get menuItems() {
        return $$('//*[@id="div-main-nav"]/div/ul/li')
    }

    get crslArrowControls() {
        return $$('//*[@id="carousel-example-generic"]/a')
    }

    get crslDotControls() {
        return $$('//*[@id="carousel-example-generic"]/ol/li')
    }

    get crslImages() {
        return $$('//*[@class="slide-image"]')
    }

    get findOutMoreBTN() {
        return $('#button-find-out-more')
    }


    async currentCrslImage() {
        const imgState = await this.crslImages.map((el) => el.isDisplayed())
        return await this.crslImages[imgState.findIndex(el=>el===true)]
    }

    async currentImageSrc() {
        const currentImage = await this.currentCrslImage()
        return await currentImage.getAttribute('src')
    }

    async clickLeftArrow() {
        await this.crslArrowControls[0].click()
        return await this.currentCrslImage()
    }

    async clickRightArrow() {
        await this.crslArrowControls[1].click()
        return await this.currentCrslImage()
    }
    
    async arrowClick(arrow) {
        let current = await this.currentCrslImage();
        await arrow == 'left' ? this.clickLeftArrow() :this.clickRightArrow();
        await browser.waitUntil(async function (){
            return (await current.isDisplayed()===false)
           });
        current = await this.currentCrslImage()
        return await current.getAttribute('src');
    }

    open() {
        return super.open('')
    }
}

module.exports = new IndexPage();